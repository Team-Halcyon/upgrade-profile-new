import pool from '../config/db.js';

export const createUser = async (fullName, email, passwordHash) => {
  const [result] = await pool.query(
    'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
    [fullName, email, passwordHash]
  );
  return result.insertId;
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0]; // Return single user or undefined
};
