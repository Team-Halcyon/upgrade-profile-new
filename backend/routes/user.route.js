import express from 'express';
import { signUp,signIn,forgotPassword } from '../controllers/user.controller.js';
import { createUserInfo} from '../controllers/userInfo.controller.js';
import { uploadCV   } from '../controllers/userCV.controller.js';


const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/forgotPassword', forgotPassword);

router.post('/storeUserInfo', createUserInfo);

router.post('/uploadCV', uploadCV);

export default router;
