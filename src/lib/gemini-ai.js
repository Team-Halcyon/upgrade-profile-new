import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = "AIzaSyBPnEYeMChz8bkJIBFSGdc4Fjk-FBVLYIk"
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function enhanceResumeSummary(jobTitle, currentSummary) {
  try {
    const prompt = currentSummary
      ? `Enhance the following professional summary for a ${jobTitle} position to make it more impactful, professional, and ATS-friendly. Focus on quantifiable achievements and industry-relevant skills: "${currentSummary}"`
      : `Generate a professional, impactful summary for a ${jobTitle} position. Include relevant skills, experience level, and career goals. Make it ATS-friendly with industry-specific keywords.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error enhancing resume summary:", error)
    return (
      currentSummary ||
      "Professional with experience in the industry, seeking to leverage skills and expertise to drive results."
    )
  }
}

export async function enhanceJobDescription(jobTitle, company, description) {
  try {
    const prompt = description
      ? `Enhance the following job description for a ${jobTitle} position at ${company} to make it more impactful, professional, and ATS-friendly. Focus on quantifiable achievements and use bullet points: "${description}"`
      : `Generate professional bullet points for a ${jobTitle} position at ${company}. Include responsibilities, achievements, and skills. Make it ATS-friendly with industry-specific keywords.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error enhancing job description:", error)
    return (
      description ||
      "• Responsible for key initiatives\n• Collaborated with cross-functional teams\n• Improved processes and workflows"
    )
  }
}

export async function optimizeForJobDescription(resumeContent, jobDescription) {
  try {
    const prompt = `Optimize the following resume content to better match this job description. Add relevant keywords, adjust phrasing, and highlight matching skills and experiences. Make it ATS-friendly.
    
    Resume Content:
    ${resumeContent}
    
    Job Description:
    ${jobDescription}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error optimizing for job description:", error)
    return resumeContent
  }
}

export async function extractResumeData(resumeText) {
  try {
    const prompt = `You are an expert resume parser with the ability to accurately extract structured information from resumes.
    
    Parse the following resume text and extract ALL available information into a structured JSON format with these exact keys:
    - personalInfo: {fullName, jobTitle, email, phone, location, linkedin, website, github}
    - summary: a concise professional summary
    - experience: [{jobTitle, company, location, startDate, endDate, current, description, employmentType}]
    - education: [{degree, institution, location, startDate, endDate, current, description}]
    - skills: [array of skill strings - be comprehensive and include ALL technical and soft skills mentioned]
    - certifications: [{name, issuer, date}]
    - languages: [{language, proficiency}]
    - projects: [{name, description, url}]
    
    Pay special attention to:
    1. Extract ALL dates in YYYY-MM format when possible
    2. For current positions/education, set current: true
    3. Include ALL skills mentioned, even those embedded in experience descriptions
    4. Parse phone numbers in standard format with country code when available
    5. Extract URLs from text for linkedin, github, website fields
    6. Never leave fields as null - use empty strings or arrays instead
    
    Resume Text:
    ${resumeText}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Try to extract JSON from various formats the model might return it in
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                      text.match(/```\n([\s\S]*?)\n```/) || 
                      text.match(/\{[\s\S]*\}/)
    
    const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text

    try {
      // Clean up any markdown artifacts
      const cleanedJson = jsonString.replace(/^```(json)?|```$/g, '').trim()
      const parsedData = JSON.parse(cleanedJson)
      
      // Process and normalize the data
      return normalizeResumeData(parsedData)
    } catch (parseError) {
      console.error("Error parsing JSON from AI response:", parseError)
      console.log("Raw response:", text)
      console.log("Attempted to parse:", jsonString)
      return getEmptyResumeObject()
    }
  } catch (error) {
    console.error("Error extracting resume data:", error)
    return getEmptyResumeObject()
  }
}

// Normalize and clean the extracted data to ensure consistent formatting
function normalizeResumeData(data) {
  // Default empty data structure
  const emptyData = getEmptyResumeObject()
  
  // Ensure all expected sections exist
  const normalizedData = {
    ...emptyData,
    ...data,
    personalInfo: {
      ...emptyData.personalInfo,
      ...(data.personalInfo || {})
    }
  }
  
  // Format experience data
  if (Array.isArray(normalizedData.experience)) {
    normalizedData.experience = normalizedData.experience.map(exp => ({
      jobTitle: exp.jobTitle || '',
      company: exp.company || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      current: !!exp.current,
      description: exp.description || '',
      employmentType: exp.employmentType || ''
    }))
  }
  
  // Format education data
  if (Array.isArray(normalizedData.education)) {
    normalizedData.education = normalizedData.education.map(edu => ({
      degree: edu.degree || '',
      institution: edu.institution || '',
      location: edu.location || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      current: !!edu.current,
      description: edu.description || ''
    }))
  }
  
  return normalizedData
}

export async function atsOptimizeResume(resumeData, jobDescription) {
  try {
    const prompt = `You are an expert ATS (Applicant Tracking System) optimization assistant.
    
    Below is a resume data object and a job description. Your task is to:
    1. Analyze the job description for key skills, requirements, and keywords
    2. Compare them with the resume content
    3. Return an optimized version of the resume with:
       - Skills reordered to prioritize those matching the job description
       - Experience bullet points enhanced to highlight relevant achievements
       - Summary rewritten to better align with the job requirements
       - Additional relevant keywords naturally incorporated
    
    IMPORTANT: 
    - Keep the same data structure in your response
    - Maintain professional tone and factual accuracy
    - Don't invent new experiences, just optimize existing ones
    - Focus on making content ATS-friendly while remaining truthful
    
    Resume Data:
    ${JSON.stringify(resumeData, null, 2)}
    
    Job Description:
    ${jobDescription}
    
    Return the optimized resume data as a valid JSON object with the same structure.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Try to extract JSON from various formats the model might return it in
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                      text.match(/```\n([\s\S]*?)\n```/) || 
                      text.match(/\{[\s\S]*\}/)
    
    const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text

    try {
      // Clean up any markdown artifacts
      const cleanedJson = jsonString.replace(/^```(json)?|```$/g, '').trim()
      return JSON.parse(cleanedJson)
    } catch (parseError) {
      console.error("Error parsing JSON from AI response:", parseError)
      console.log("Raw response:", text)
      console.log("Attempted to parse:", jsonString)
      return resumeData // Return original data if parsing fails
    }
  } catch (error) {
    console.error("Error optimizing resume for ATS:", error)
    return resumeData // Return original data if API call fails
  }
}

function getEmptyResumeObject() {
  return {
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      github: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: [],
    projects: [],
  }
}
