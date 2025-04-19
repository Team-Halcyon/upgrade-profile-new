import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = "AIzaSyBPnEYeMChz8bkJIBFSGdc4Fjk-FBVLYIk"
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function enhanceResumeSummary(jobTitle, currentSummary) {
  try {
    const prompt = currentSummary
      ? `Transform this professional summary for a ${jobTitle} position into a concise, powerful statement. Add quantifiable achievements, industry-specific keywords, and compelling language. Make it ATS-optimized. Use HTML-style bold formatting for key phrases by wrapping important terms with **asterisks** like this. Example: "**Experienced software engineer** with expertise in...": "${currentSummary}"`
      : `Create a precise, powerful professional summary for a ${jobTitle}. Include specific, measurable achievements, core competencies, and industry-standard terminology. The summary must be exactly 3-4 sentences, ATS-optimized, and focused on career highlights. Use HTML-style bold formatting for key phrases by wrapping important terms with **asterisks** like this. Example: "**Experienced software engineer** with expertise in..."`

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
      ? `Rewrite this job description for a ${jobTitle} position at ${company} into powerful, achievement-focused bullet points. Use action verbs, include metrics, and incorporate industry-specific language. Each bullet must demonstrate concrete impact and be ATS-optimized. Use **asterisks** to bold important skills, metrics, and key achievements. Example: "• Implemented **machine learning algorithms** that improved accuracy by **45%**": "${description}"`
      : `Create 5-7 powerful bullet points for a ${jobTitle} position at ${company}. Each bullet must: 1) Start with a strong action verb, 2) Include one measurable metric/achievement, 3) Demonstrate a specific job-relevant skill, and 4) Incorporate industry terminology. Use **asterisks** to bold important skills, metrics, and key achievements. Example: "• Implemented **machine learning algorithms** that improved accuracy by **45%**"`

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
    const prompt = `Transform this resume content to perfectly align with the job description. Integrate exact keyword matches, restructure content to emphasize relevant experience, and reformat achievements to highlight direct qualification matches. The output must maintain the original format but be fully optimized for ATS systems.
    
    Resume Content:
    ${resumeContent}
    
    Job Description:
    ${jobDescription}
    
    Provide only the optimized resume content without explanations or suggestions.`

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
    const prompt = `Extract precise, structured resume information from the text below. Format as JSON with these exact fields:
    - personalInfo: {fullName, jobTitle, email, phone, location, linkedin, website, github}
    - summary: a single concise professional summary paragraph
    - experience: [{jobTitle, company, location, startDate, endDate, current, description, employmentType}]
    - education: [{degree, institution, location, startDate, endDate, current, description}]
    - skills: [comprehensive array of ALL technical and soft skills]
    - certifications: [{name, issuer, date}]
    - languages: [{language, proficiency}]
    - projects: [{name, description, url}]
    
    Requirements:
    1. Format ALL dates as YYYY-MM
    2. Mark current positions as current: true
    3. Extract ALL skills including those in experience descriptions
    4. Format phone with country code
    5. Extract complete URLs
    6. Use empty strings instead of null
    
    Resume Text:
    ${resumeText}
    
    Return ONLY valid, properly formatted JSON without explanations.`

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
    const prompt = `Transform this resume data to precisely match the job description requirements. Follow these steps:
    
    1. Extract all key requirements, skills, and terminology from the job description
    2. Reorder skills to place the most relevant ones first
    3. Rewrite experience descriptions to highlight direct qualification matches
    4. Rewrite summary to directly address the job requirements
    5. Add critical industry keywords where appropriate
    
    Rules:
    - Maintain the exact JSON structure
    - Keep factual information accurate
    - Focus on emphasizing relevant existing experience
    - Optimize for ATS keyword matching
    
    Resume Data:
    ${JSON.stringify(resumeData, null, 2)}
    
    Job Description:
    ${jobDescription}
    
    Return ONLY the optimized resume data as valid JSON.`

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
