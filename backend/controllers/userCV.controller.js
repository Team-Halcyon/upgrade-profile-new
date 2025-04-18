import multer from 'multer'
import { uploadUserCV } from '../models/userCV.model.js'
import pool from '../config/db.js'
import jwt from 'jsonwebtoken'

// Multer config to read files into memory
const storage = multer.memoryStorage()
const upload = multer({ storage }).single('cv')

export const uploadCV = (req, res) => {
  upload(req, res, async (err) => {
    if (err || !req.file) {
      return res.status(400).json({ message: 'File upload failed or missing file.' })
    }

    try {
      // Extract token from Authorization header
      const token = req.headers.authorization?.split(" ")[1]
      if (!token) {
        return res.status(401).json({ message: 'Missing or invalid token' })
      }

      // Decode token to get the user's email
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const email = decoded.email

      if (!email) {
        return res.status(400).json({ message: 'Email not found in token' })
      }

      // Get user ID based on email
      const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email])
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found with provided email.' })
      }

      const user_id = rows[0].id
      const { buffer } = req.file

      // Store file content in DB
      const insertedId = await uploadUserCV(user_id, buffer)

      return res.status(201).json({ message: 'File uploaded and saved to DB', cvId: insertedId })
    } catch (error) {
      console.error("Error uploading CV:", error)
      return res.status(500).json({ message: 'Server error while saving file to DB' })
    }
  })
}
