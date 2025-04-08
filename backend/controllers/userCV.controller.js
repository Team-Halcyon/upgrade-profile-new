import multer from 'multer'
import { uploadUserCV, getCVByUserId, getCVById } from '../models/userCV.model.js'
import pool from '../config/db.js'
import { extractTextFromDocument } from '../utils/documentProcessor.js'
import { extractCVData } from '../services/aiService.js'

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    console.log('Received file:', file.originalname, 'Type:', file.mimetype);
    
    // Accept only PDF, DOCX, and TXT files
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'text/plain') {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed.'))
    }
  }
}).single('cv')

export const uploadCV = (req, res) => {
  console.log('CV upload request received');
  
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ success: false, message: `File upload error: ${err.message}` })
    } else if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ success: false, message: err.message })
    }

    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ success: false, message: 'No file uploaded.' })
    }

    console.log('File received:', req.file.originalname);
    const { email } = req.body  // Expecting email in form-data along with file
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' })
    }

    try {
      // Check if user exists, if not create a new user
      let userId;
      const [existingUsers] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
      
      if (existingUsers.length === 0) {
        console.log(`Creating new user for email: ${email}`);
        // Create a new user if not exists
        const [newUser] = await pool.query(
          "INSERT INTO users (email, password) VALUES (?, ?)", 
          [email, 'temporary_password'] // Use a secure method to generate passwords in production
        );
        userId = newUser.insertId;
      } else {
        userId = existingUsers[0].id;
      }
      
      const { buffer, originalname, mimetype } = req.file  // Extract file info

      // Extract text from the uploaded document
      console.log('Extracting text from document...');
      const extractedText = await extractTextFromDocument(buffer, mimetype);
      console.log(`Extracted text length: ${extractedText.length} characters`);
      
      // Store file content and extracted text in DB
      const insertedId = await uploadUserCV(userId, buffer, originalname, mimetype, extractedText);
      console.log(`CV stored in database with ID: ${insertedId}`);

      // Parse the CV text using AI to extract structured data
      console.log('Processing CV with AI...');
      let parsedCVData = {};
      try {
        parsedCVData = await extractCVData(extractedText);
        console.log('AI processing complete');
      } catch (aiError) {
        console.error("Error parsing CV with AI:", aiError);
        // Continue with the flow even if AI parsing fails
      }

      return res.status(201).json({ 
        success: true, 
        message: 'File uploaded and processed successfully', 
        cvId: insertedId,
        parsedData: parsedCVData
      })
    } catch (error) {
      console.error("Error uploading CV:", error);
      return res.status(500).json({ success: false, message: `Server error while processing file: ${error.message}` })
    }
  })
}

// Get parsed CV data by user email
export const getParsedCVByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Get user ID based on email
    const [userRows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (userRows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found with provided email.' });
    }

    const user_id = userRows[0].id;
    
    // Get the most recent CV
    const cv = await getCVByUserId(user_id);
    if (!cv) {
      return res.status(404).json({ success: false, message: 'No CV found for this user.' });
    }

    // If we have extracted text, parse it with AI
    if (cv.extracted_text) {
      try {
        const parsedData = await extractCVData(cv.extracted_text);
        return res.status(200).json({ 
          success: true, 
          cvId: cv.id,
          fileName: cv.file_name,
          uploadDate: cv.created_at,
          parsedData 
        });
      } catch (aiError) {
        console.error("Error parsing CV with AI:", aiError);
        return res.status(500).json({ success: false, message: 'Error parsing CV with AI' });
      }
    } else {
      return res.status(400).json({ success: false, message: 'No text could be extracted from the CV' });
    }
  } catch (error) {
    console.error("Error fetching parsed CV:", error);
    return res.status(500).json({ success: false, message: 'Server error while fetching CV data' });
  }
};
