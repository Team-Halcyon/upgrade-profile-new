import { createUser, getUserByEmail,updateUserPassword } from '../models/user.model.js';
import { hashPassword,comparePassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(password);
    const userId = await createUser(fullName, email, hashedPassword);

    return res.status(201).json({ success: true, userId });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    return res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    const hashed = await hashPassword(newPassword);
    const updated = await updateUserPassword(email, hashed);

    if (updated) {
      return res.status(200).json({ success: true, message: 'Password updated successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Password update failed' });
    }
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
