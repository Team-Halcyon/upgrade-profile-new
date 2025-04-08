// frontend/lib/api/userApi.js

// API services for interacting with the backend

// Set the base URL for API calls with fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

console.log('API Base URL:', API_BASE_URL); // For debugging purposes

/**
 * Upload a CV file to the server
 * @param {File} file - The CV file to upload
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Response with parsed CV data
 */
export const uploadCV = async (file, email) => {
  try {
    const formData = new FormData();
    formData.append('cv', file);
    formData.append('email', email);

    console.log('Uploading CV to:', `${API_BASE_URL}/user/uploadCV`);

    const response = await fetch(`${API_BASE_URL}/user/uploadCV`, {
      method: 'POST',
      body: formData,
      // Important: Don't set Content-Type header when sending FormData
      // The browser will set the correct boundary string
    });

    if (!response.ok) {
      // Try to parse error message if available
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      } catch (parseError) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading CV:', error);
    throw error;
  }
};

/**
 * Process LinkedIn profile data
 * @param {string} profileHtml - The HTML content from LinkedIn profile
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Response with parsed LinkedIn data
 */
export const processLinkedInProfile = async (profileHtml, email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/processLinkedInProfile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profileHtml, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to process LinkedIn profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing LinkedIn profile:', error);
    throw error;
  }
};

/**
 * Analyze a job description against the user's CV
 * @param {string} jobDescription - The job description text
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Response with job match analysis
 */
export const analyzeJobDescription = async (jobDescription, email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/analyzeJobDescription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobDescription, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to analyze job description');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing job description:', error);
    throw error;
  }
};

/**
 * Get available CV templates
 * @returns {Promise<Object>} Response with template data
 */
export const getCvTemplates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/cvTemplates`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get CV templates');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting CV templates:', error);
    throw error;
  }
};

/**
 * Generate a CV using a selected template
 * @param {string} email - User's email address
 * @param {number} templateId - The template ID to use
 * @param {Object} cvData - The CV data to use for generation
 * @returns {Promise<Object>} Response with generated CV data
 */
export const generateCV = async (email, templateId, cvData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/generateCV`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, templateId, cvData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate CV');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating CV:', error);
    throw error;
  }
};

/**
 * Get user's CV data based on their email
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Response with parsed CV data
 */
export const getParsedCVByEmail = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/parsedCV/${email}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get CV data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting CV data:', error);
    throw error;
  }
};

/**
 * Store user info in the database
 * @param {Object} userInfo - User information to store
 * @returns {Promise<Object>} Response from the server
 */
export const storeUserInfo = async (userInfo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/storeUserInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to store user info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error storing user info:', error);
    throw error;
  }
};

/**
 * Get a previously generated CV by ID
 * @param {string} email - User's email address
 * @param {number} cvId - ID of the generated CV
 * @returns {Promise<Object>} Response with the generated CV HTML
 */
export const getGeneratedCV = async (email, cvId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/generatedCV/${email}/${cvId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get generated CV');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting generated CV:', error);
    throw error;
  }
};
