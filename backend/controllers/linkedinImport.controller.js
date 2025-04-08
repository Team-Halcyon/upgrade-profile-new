import { extractLinkedInData } from '../services/aiService.js';
import pool from '../config/db.js';

// Process LinkedIn profile data
export const processLinkedInProfile = async (req, res) => {
  try {
    const { email, profileHtml } = req.body;
    
    if (!email || !profileHtml) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and LinkedIn profile HTML are required' 
      });
    }

    // Get user ID based on email
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found with provided email.' 
      });
    }
    
    const user_id = rows[0].id;
    
    // Extract structured data from LinkedIn profile HTML using AI
    const linkedInData = await extractLinkedInData(profileHtml);
    
    if (linkedInData.error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to process LinkedIn profile',
        error: linkedInData.message
      });
    }
    
    // Convert LinkedIn data to our CV data format
    const cvData = {
      fullName: linkedInData.fullName || '',
      email: email,
      phone: '',  // LinkedIn typically doesn't expose phone
      location: linkedInData.location || '',
      jobTitle: linkedInData.headline || '',
      linkedIn: '',  // User would need to provide actual profile URL
      summary: linkedInData.about || '',
      skills: linkedInData.skills || [],
      softSkills: [],  // LinkedIn doesn't typically differentiate skill types
      experiences: (linkedInData.experiences || []).map(exp => ({
        company: exp.company || '',
        title: exp.title || '',
        location: exp.location || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || 'Present',
        description: exp.description || ''
      })),
      education: (linkedInData.education || []).map(edu => ({
        institution: edu.school || '',
        degree: edu.degree || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        location: edu.location || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        description: edu.description || ''
      }))
    };

    return res.status(200).json({ 
      success: true, 
      message: 'LinkedIn profile processed successfully',
      parsedData: cvData
    });
  } catch (error) {
    console.error("Error processing LinkedIn profile:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while processing LinkedIn profile'
    });
  }
};

// Import LinkedIn URL directly (scraping approach - note: LinkedIn blocks most scraping attempts)
export const importLinkedInUrl = async (req, res) => {
  try {
    const { email, linkedinUrl } = req.body;
    
    if (!email || !linkedinUrl) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and LinkedIn URL are required' 
      });
    }
    
    // Note: LinkedIn actively blocks scraping attempts.
    // For a production app, you'd need to use their official API or a third-party service.
    return res.status(501).json({ 
      success: false, 
      message: 'Direct LinkedIn URL import is not implemented. Please paste the HTML from your profile page.' 
    });
  } catch (error) {
    console.error("Error importing LinkedIn URL:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while importing LinkedIn profile'
    });
  }
};