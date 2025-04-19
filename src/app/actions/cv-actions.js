"use server"

import {
  enhanceResumeSummary,
  enhanceJobDescription,
  optimizeForJobDescription,
  extractResumeData,
  atsOptimizeResume,
} from "@/lib/gemini-ai"
import { revalidatePath } from "next/cache"

// In-memory storage for demo purposes
let resumeData = {
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
  languages: [],
  certifications: [],
  projects: [],
}

export async function savePersonalInfo(data) {
  try {
    resumeData.personalInfo = data
    revalidatePath("/cv-generation/create-cv/summary")
    return { success: true }
  } catch (error) {
    console.error("Error saving personal info:", error)
    return { success: false, error: "Failed to save personal information" }
  }
}

export async function saveSummary(summary) {
  try {
    resumeData.summary = summary
    revalidatePath("/cv-generation/create-cv/experience")
    return { success: true }
  } catch (error) {
    console.error("Error saving summary:", error)
    return { success: false, error: "Failed to save summary" }
  }
}

export async function saveExperience(experiences) {
  try {
    resumeData.experience = experiences
    revalidatePath("/cv-generation/create-cv/education")
    return { success: true }
  } catch (error) {
    console.error("Error saving experience:", error)
    return { success: false, error: "Failed to save experience" }
  }
}

export async function saveEducation(education) {
  try {
    resumeData.education = education
    revalidatePath("/cv-generation/create-cv/skills")
    return { success: true }
  } catch (error) {
    console.error("Error saving education:", error)
    return { success: false, error: "Failed to save education" }
  }
}

export async function saveSkills(skills) {
  try {
    resumeData.skills = skills
    revalidatePath("/cv-generation/create-cv/additional")
    return { success: true }
  } catch (error) {
    console.error("Error saving skills:", error)
    return { success: false, error: "Failed to save skills" }
  }
}

export async function saveAdditionalInfo(data) {
  try {
    if (data.languages) resumeData.languages = data.languages
    if (data.certifications) resumeData.certifications = data.certifications
    if (data.projects) resumeData.projects = data.projects
    revalidatePath("/cv-generation/cv-templates")
    return { success: true }
  } catch (error) {
    console.error("Error saving additional info:", error)
    return { success: false, error: "Failed to save additional information" }
  }
}

export async function saveSelectedTemplate(templateId) {
  try {
    resumeData.selectedTemplate = templateId
    revalidatePath("/cv-generation/preview-cv")
    return { success: true }
  } catch (error) {
    console.error("Error saving template selection:", error)
    return { success: false, error: "Failed to save template selection" }
  }
}

export async function getResumeData() {
  return resumeData
}

export async function enhanceSummaryWithAI(jobTitle, currentSummary) {
  try {
    const enhancedSummary = await enhanceResumeSummary(jobTitle, currentSummary)
    return { success: true, summary: enhancedSummary }
  } catch (error) {
    console.error("Error enhancing summary with AI:", error)
    return { success: false, error: "Failed to enhance summary with AI" }
  }
}

export async function enhanceExperienceWithAI(jobTitle, company, description) {
  try {
    const enhancedDescription = await enhanceJobDescription(jobTitle, company, description)
    return { success: true, description: enhancedDescription }
  } catch (error) {
    console.error("Error enhancing experience with AI:", error)
    return { success: false, error: "Failed to enhance experience with AI" }
  }
}

export async function optimizeResumeForJob(jobDescription) {
  try {
    // Use our specialized ATS optimization function to optimize the entire resume
    const optimizedResumeData = await atsOptimizeResume(resumeData, jobDescription)
    
    // Update the resume data with the optimized version
    resumeData = optimizedResumeData
    
    // Revalidate all paths that might need updating
    revalidatePath("/cv-generation/create-cv")
    revalidatePath("/cv-generation/create-cv/summary")
    revalidatePath("/cv-generation/create-cv/experience")
    revalidatePath("/cv-generation/create-cv/education")
    revalidatePath("/cv-generation/create-cv/skills")
    revalidatePath("/cv-generation/create-cv/additional")
    revalidatePath("/cv-generation/preview-cv")
    
    return { 
      success: true, 
      message: "Resume optimized for job description. Your resume has been enhanced with relevant keywords and formatting for ATS compatibility."
    }
  } catch (error) {
    console.error("Error optimizing resume for job:", error)
    return { success: false, error: "Failed to optimize resume for job description" }
  }
}

export async function parseUploadedCV(text) {
  try {
    console.log("Starting CV parsing process...");
    // Extract structured data from the CV text using our enhanced Gemini AI function
    const extractedData = await extractResumeData(text);
    console.log("CV data extraction complete");
    
    // Update all sections of the resume data with the extracted information
    resumeData = {
      personalInfo: extractedData.personalInfo || resumeData.personalInfo,
      summary: extractedData.summary || resumeData.summary,
      experience: extractedData.experience || resumeData.experience,
      education: extractedData.education || resumeData.education,
      skills: extractedData.skills || resumeData.skills,
      languages: extractedData.languages || resumeData.languages,
      certifications: extractedData.certifications || resumeData.certifications,
      projects: extractedData.projects || resumeData.projects,
    };
    
    // Revalidate all paths to ensure the data is available across the entire CV creation flow
    revalidatePath("/cv-generation/create-cv");
    revalidatePath("/cv-generation/create-cv/summary");
    revalidatePath("/cv-generation/create-cv/experience");
    revalidatePath("/cv-generation/create-cv/education");
    revalidatePath("/cv-generation/create-cv/skills");
    revalidatePath("/cv-generation/create-cv/additional");
    
    return { 
      success: true, 
      data: extractedData,
      message: "CV parsed successfully. All information has been extracted and pre-filled in the forms."
    };
  } catch (error) {
    console.error("Error parsing uploaded CV:", error);
    return { 
      success: false, 
      error: "Failed to parse uploaded CV. Please try again or enter your information manually." 
    };
  }
}
