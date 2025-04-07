import multer from 'multer'
import { uploadUserCV } from '../models/userCV.model.js'
import pool from '../config/db.js'

// Multer config to read files into memory
const storage = multer.memoryStorage()
const upload = multer({ storage }).single('cv')

export const uploadCV = (req, res) => {
  upload(req, res, async (err) => {
    if (err || !req.file) {
      return res.status(400).json({ message: 'File upload failed or missing file.' })
    }

    const { email } = req.body  // Expecting email in form-data along with file

    try {
      // Get user ID based on email
      const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email])
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found with provided email.' })
      }

      const user_id = rows[0].id
      const { buffer } = req.file  // Extract file content

      // Store file content in DB
      const insertedId = await uploadUserCV(user_id, buffer)

      return res.status(201).json({ message: 'File uploaded and saved to DB', cvId: insertedId })
    } catch (error) {
      console.error("Error uploading CV:", error)
      return res.status(500).json({ message: 'Server error while saving file to DB' })
    }
  })
}
