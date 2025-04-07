import pool from '../config/db.js'

export const uploadUserCV = async (user_id, fileBuffer) => {
  const [result] = await pool.query(
    "INSERT INTO user_cvs (user_id, file_data) VALUES (?, ?)",
    [user_id, fileBuffer]
  )
  return result.insertId
}
