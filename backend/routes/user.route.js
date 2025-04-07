import express from 'express';
import { signUp,signIn,forgotPassword } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/forgotPassword', forgotPassword);


export default router;
