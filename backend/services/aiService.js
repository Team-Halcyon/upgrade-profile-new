import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Check if Gemini API key is set
if (!process.env.GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. AI features may not work correctly.');
}

// Configure the model
const geminiProModel = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Extract structured information from CV text
 * @param {string} cvText - The text extracted from a CV
 * @returns {Promise<Object>} Structured CV data
 */
export const extractCVData = async (cvText) => {
  try {
    const prompt = `Extract the following information from the provided CV text and return it in a structured JSON format:
    - fullName: The person's full name
    - email: Email address
    - phone: Phone number
    - location: Current location/address
    - jobTitle: Current or most recent job title
    - linkedIn: LinkedIn profile URL (if available)
    - github: GitHub profile URL (if available)
    - website: Personal website or portfolio URL (if available)
    - summary: A brief professional summary from the CV or generate one based on the content
    - skills: An array of technical skills mentioned in the CV
    - softSkills: An array of soft skills mentioned in the CV
    - experiences: An array of work experiences, each with:
      - company: Company name
      - title: Job title
      - location: Job location
      - startDate: Start date in YYYY-MM format 
      - endDate: End date in YYYY-MM format, or "Present" if current
      - description: Job description
    - education: An array of education entries, each with:
      - institution: Institution name
      - degree: Degree obtained
      - fieldOfStudy: Field of study
      - location: Institution location
      - startDate: Start date in YYYY-MM format
      - endDate: End date in YYYY-MM format
      - description: Additional information about the education
      
    CV Text:
    ${cvText}
    
    Return only the JSON without any additional text.`;
    
    const result = await geminiProModel.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Extract JSON from response text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to extract JSON from response');
    }
  } catch (error) {
    console.error('Error extracting CV data:', error.message);
    // Return a basic structure with error information
    return {
      error: true,
      message: error.message,
      fullName: '',
      email: '',
      phone: '',
      // Include other empty fields to prevent frontend errors
    };
  }
};

/**
 * Generate a professional summary from CV data
 * @param {Object} cvData - Structured CV data
 * @returns {Promise<string>} Generated professional summary
 */
export const generateProfessionalSummary = async (cvData) => {
  try {
    const prompt = `You are a professional resume writer. Create a compelling and concise professional summary for a resume based on the provided CV data. The summary should be 3-4 sentences and highlight key strengths, experience level, and career achievements.
    
    CV Data:
    ${JSON.stringify(cvData)}`;
    
    const result = await geminiProModel.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating professional summary:', error.message);
    // Return a generic summary if the AI service fails
    return "Experienced professional with a proven track record in the industry. Skilled in various technologies and methodologies. Committed to delivering high-quality results and continuous improvement.";
  }
};

/**
 * Extract job description data and match it with candidate's CV
 * @param {string} jobDescription - The text of the job description
 * @param {Object} cvData - Structured CV data
 * @returns {Promise<Object>} Analysis of job match and recommended improvements
 */
export const analyzeJobMatch = async (jobDescription, cvData) => {
  try {
    const prompt = `You are a career advisor that helps match candidates to job opportunities. Analyze the job description and the candidate's CV data to provide:
    1. A match percentage (0-100)
    2. Key matching skills
    3. Missing skills that the candidate should highlight or develop
    4. Suggestions for tailoring the CV to this specific job
    Return the analysis in JSON format.
    
    Job Description:
    ${jobDescription}
    
    CV Data:
    ${JSON.stringify(cvData)}`;
    
    const result = await geminiProModel.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Extract JSON from response text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to extract JSON from response');
    }
  } catch (error) {
    console.error('Error analyzing job match:', error.message);
    return {
      matchPercentage: 0,
      matchingSkills: [],
      missingSkills: [],
      suggestions: ["Unable to analyze job match due to an error."]
    };
  }
};

/**
 * Extract data from a LinkedIn profile HTML
 * @param {string} linkedInProfileHtml - The HTML content of a LinkedIn profile
 * @returns {Promise<Object>} Structured LinkedIn profile data
 */
export const extractLinkedInData = async (linkedInProfileHtml) => {
  try {
    const prompt = `You are a LinkedIn profile parsing assistant. Extract structured data from the provided LinkedIn profile HTML content and return it in JSON format with the following structure:
    - fullName: The person's full name
    - headline: Professional headline
    - location: Location
    - about: About section content
    - experiences: Array of work experiences
    - education: Array of education entries
    - skills: Array of skills
    - certifications: Array of certifications
    - projects: Array of projects
    
    LinkedIn Profile HTML:
    ${linkedInProfileHtml.substring(0, 25000)} // Limit input size
    
    Return only the JSON without any additional text.`;
    
    const result = await geminiProModel.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Extract JSON from response text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Failed to extract JSON from response');
    }
  } catch (error) {
    console.error('Error extracting LinkedIn data:', error.message);
    return {
      error: true,
      message: error.message
    };
  }
};