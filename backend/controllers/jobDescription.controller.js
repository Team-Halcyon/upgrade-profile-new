import pool from '../config/db.js';
import { analyzeJobMatch } from '../services/aiService.js';
import { getCVByUserId } from '../models/userCV.model.js';
import { extractCVData } from '../services/aiService.js';

// Process and analyze a job description against user's CV
export const analyzeJobDescription = async (req, res) => {
  try {
    const { email, jobDescription } = req.body;
    
    if (!email || !jobDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and job description are required' 
      });
    }

    // Get user ID based on email
    const [userRows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found with provided email.' 
      });
    }
    
    const user_id = userRows[0].id;
    
    // Get the user's CV data
    const cv = await getCVByUserId(user_id);
    if (!cv) {
      return res.status(404).json({ 
        success: false, 
        message: 'No CV found for this user. Please upload a CV first.' 
      });
    }

    // Parse CV text with AI
    let cvData;
    try {
      cvData = await extractCVData(cv.extracted_text);
    } catch (aiError) {
      console.error("Error parsing CV with AI:", aiError);
      return res.status(500).json({ 
        success: false, 
        message: 'Error parsing CV data. Please try again later.' 
      });
    }
    
    // Analyze job match using AI
    const jobAnalysis = await analyzeJobMatch(jobDescription, cvData);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Job description analyzed successfully',
      analysis: jobAnalysis
    });
  } catch (error) {
    console.error("Error analyzing job description:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while analyzing job description' 
    });
  }
};

// Store job description for later reference
export const storeJobDescription = async (req, res) => {
  try {
    const { email, jobTitle, companyName, jobDescription, jobUrl } = req.body;
    
    if (!email || !jobDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and job description are required' 
      });
    }

    // Get user ID based on email
    const [userRows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found with provided email.' 
      });
    }
    
    const user_id = userRows[0].id;
    
    // Create job_descriptions table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS job_descriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        job_title VARCHAR(100),
        company_name VARCHAR(100),
        job_description TEXT NOT NULL,
        job_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    
    // Store the job description
    const [result] = await pool.query(
      "INSERT INTO job_descriptions (user_id, job_title, company_name, job_description, job_url) VALUES (?, ?, ?, ?, ?)",
      [user_id, jobTitle || '', companyName || '', jobDescription, jobUrl || '']
    );
    
    return res.status(201).json({ 
      success: true, 
      message: 'Job description stored successfully',
      jobDescriptionId: result.insertId
    });
  } catch (error) {
    console.error("Error storing job description:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while storing job description' 
    });
  }
};