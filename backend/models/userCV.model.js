import pool from '../config/db.js'

export const uploadUserCV = async (user_id, fileBuffer, fileName, fileType, extractedText) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO user_cvs (user_id, file_name, file_type, file_data, extracted_text) VALUES (?, ?, ?, ?, ?)",
      [user_id, fileName, fileType, fileBuffer, extractedText]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error storing CV:", error);
    throw error;
  }
};

export const getCVByUserId = async (user_id) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, file_name, file_type, extracted_text, created_at FROM user_cvs WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
      [user_id]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching CV:", error);
    throw error;
  }
};

export const getCVById = async (cv_id) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, user_id, file_name, file_type, file_data, extracted_text, created_at FROM user_cvs WHERE id = ?",
      [cv_id]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching CV by ID:", error);
    throw error;
  }
};
