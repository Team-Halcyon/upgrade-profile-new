import express from 'express';
import { signUp, signIn, forgotPassword } from '../controllers/user.controller.js';
import { createUserInfo } from '../controllers/userInfo.controller.js';
import { uploadCV, getParsedCVByEmail } from '../controllers/userCV.controller.js';
import { processLinkedInProfile, importLinkedInUrl } from '../controllers/linkedinImport.controller.js';
import { analyzeJobDescription, storeJobDescription } from '../controllers/jobDescription.controller.js';
import { getTemplates, generateCV, getGeneratedCV } from '../controllers/cvTemplate.controller.js';

const router = express.Router();

// Authentication routes
router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/forgotPassword', forgotPassword);

// User info routes
router.post('/storeUserInfo', createUserInfo);

// CV upload & processing routes
router.post('/uploadCV', uploadCV);
router.get('/parsedCV/:email', getParsedCVByEmail);

// LinkedIn import routes
router.post('/processLinkedInProfile', processLinkedInProfile);
router.post('/importLinkedInUrl', importLinkedInUrl);

// Job description routes
router.post('/analyzeJobDescription', analyzeJobDescription);
router.post('/storeJobDescription', storeJobDescription);

// CV template routes
router.get('/cvTemplates', getTemplates);
router.post('/generateCV', generateCV);
router.get('/generatedCV/:email/:cvId', getGeneratedCV);

export default router;
