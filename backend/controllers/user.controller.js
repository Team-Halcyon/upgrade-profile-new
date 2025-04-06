import { createUser, getUserByEmail } from '../models/user.model.js';
import { hashPassword } from '../utils/hash.js';

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
