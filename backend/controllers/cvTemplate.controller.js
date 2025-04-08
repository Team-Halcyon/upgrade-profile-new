import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get available CV templates
export const getTemplates = async (req, res) => {
  try {
    // Create cv_templates table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cv_templates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        template_name VARCHAR(100) NOT NULL,
        template_image VARCHAR(255),
        template_html LONGTEXT,
        is_premium BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get templates from database
    const [templates] = await pool.query("SELECT id, template_name, template_image, is_premium FROM cv_templates");

    // If no templates in database, insert default templates
    if (templates.length === 0) {
      await insertDefaultTemplates();
      const [newTemplates] = await pool.query("SELECT id, template_name, template_image, is_premium FROM cv_templates");
      return res.status(200).json({ success: true, templates: newTemplates });
    }

    return res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error("Error fetching CV templates:", error);
    return res.status(500).json({ success: false, message: 'Server error while fetching templates' });
  }
};

// Generate a CV using a template
export const generateCV = async (req, res) => {
  try {
    const { email, templateId, cvData } = req.body;

    if (!email || !templateId || !cvData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, template ID, and CV data are required' 
      });
    }

    // Get user ID based on email
    const [userRows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found with provided email.' 
      });
    }
    
    const user_id = userRows[0].id;
    
    // Get the template
    const [templateRows] = await pool.query("SELECT template_html FROM cv_templates WHERE id = ?", [templateId]);
    if (templateRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Template not found' 
      });
    }
    
    const templateHtml = templateRows[0].template_html;
    
    // Replace template placeholders with CV data
    let generatedHtml = templateHtml;
    
    // Basic placeholders
    generatedHtml = generatedHtml.replace(/{{fullName}}/g, cvData.fullName || '')
                             .replace(/{{email}}/g, cvData.email || '')
                             .replace(/{{phone}}/g, cvData.phone || '')
                             .replace(/{{location}}/g, cvData.location || '')
                             .replace(/{{jobTitle}}/g, cvData.jobTitle || '')
                             .replace(/{{linkedIn}}/g, cvData.linkedIn || '')
                             .replace(/{{github}}/g, cvData.github || '')
                             .replace(/{{website}}/g, cvData.website || '')
                             .replace(/{{summary}}/g, cvData.summary || '');
    
    // Skills
    let skillsHtml = '';
    if (cvData.skills && cvData.skills.length > 0) {
      skillsHtml = cvData.skills.map(skill => `<li>${skill}</li>`).join('');
    }
    generatedHtml = generatedHtml.replace(/{{skills}}/g, skillsHtml);
    
    // Experiences
    let experiencesHtml = '';
    if (cvData.experiences && cvData.experiences.length > 0) {
      experiencesHtml = cvData.experiences.map(exp => `
        <div class="experience-item">
          <h3>${exp.title || ''} - ${exp.company || ''}</h3>
          <p class="date">${exp.startDate || ''} - ${exp.endDate || 'Present'}</p>
          <p class="location">${exp.location || ''}</p>
          <p class="description">${exp.description || ''}</p>
        </div>
      `).join('');
    }
    generatedHtml = generatedHtml.replace(/{{experiences}}/g, experiencesHtml);
    
    // Education
    let educationHtml = '';
    if (cvData.education && cvData.education.length > 0) {
      educationHtml = cvData.education.map(edu => `
        <div class="education-item">
          <h3>${edu.degree || ''} - ${edu.fieldOfStudy || ''}</h3>
          <p class="institution">${edu.institution || ''}</p>
          <p class="date">${edu.startDate || ''} - ${edu.endDate || ''}</p>
          <p class="location">${edu.location || ''}</p>
          <p class="description">${edu.description || ''}</p>
        </div>
      `).join('');
    }
    generatedHtml = generatedHtml.replace(/{{education}}/g, educationHtml);
    
    // Store the generated CV
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_generated_cvs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        template_id INT NOT NULL,
        cv_html LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (template_id) REFERENCES cv_templates(id)
      )
    `);
    
    const [result] = await pool.query(
      "INSERT INTO user_generated_cvs (user_id, template_id, cv_html) VALUES (?, ?, ?)",
      [user_id, templateId, generatedHtml]
    );
    
    return res.status(200).json({
      success: true,
      message: 'CV generated successfully',
      cvId: result.insertId,
      cvHtml: generatedHtml
    });
  } catch (error) {
    console.error("Error generating CV:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while generating CV' 
    });
  }
};

// Get user's generated CV by ID
export const getGeneratedCV = async (req, res) => {
  try {
    const { email, cvId } = req.params;
    
    // Get user ID based on email
    const [userRows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found with provided email.' 
      });
    }
    
    const user_id = userRows[0].id;
    
    // Get the generated CV
    const [cvRows] = await pool.query(
      "SELECT cv_html FROM user_generated_cvs WHERE id = ? AND user_id = ?",
      [cvId, user_id]
    );
    
    if (cvRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Generated CV not found' 
      });
    }
    
    return res.status(200).json({
      success: true,
      cvHtml: cvRows[0].cv_html
    });
  } catch (error) {
    console.error("Error fetching generated CV:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching generated CV' 
    });
  }
};

// Insert default templates into the database
const insertDefaultTemplates = async () => {
  try {
    // Simple template
    const simpleTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{fullName}} - CV</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    h1 {
      margin-bottom: 5px;
      color: #2c3e50;
    }
    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
    }
    .contact-item {
      margin: 0 10px;
    }
    .section {
      margin-bottom: 25px;
    }
    h2 {
      border-bottom: 2px solid #3498db;
      padding-bottom: 5px;
      color: #2c3e50;
    }
    .experience-item, .education-item {
      margin-bottom: 15px;
    }
    h3 {
      margin-bottom: 5px;
      color: #2c3e50;
    }
    .date, .location {
      color: #7f8c8d;
      font-style: italic;
      margin: 5px 0;
    }
    ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .skills-container {
      display: flex;
      flex-wrap: wrap;
    }
    .skills-container ul {
      width: 50%;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>{{fullName}}</h1>
    <p>{{jobTitle}}</p>
    <div class="contact-info">
      <div class="contact-item">📧 {{email}}</div>
      <div class="contact-item">📞 {{phone}}</div>
      <div class="contact-item">📍 {{location}}</div>
      {{#if linkedIn}}<div class="contact-item">LinkedIn: {{linkedIn}}</div>{{/if}}
      {{#if github}}<div class="contact-item">GitHub: {{github}}</div>{{/if}}
      {{#if website}}<div class="contact-item">Website: {{website}}</div>{{/if}}
    </div>
  </div>

  <div class="section">
    <h2>Professional Summary</h2>
    <p>{{summary}}</p>
  </div>

  <div class="section">
    <h2>Skills</h2>
    <div class="skills-container">
      <ul>
        {{skills}}
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>Experience</h2>
    {{experiences}}
  </div>

  <div class="section">
    <h2>Education</h2>
    {{education}}
  </div>
</body>
</html>
    `;

    // Modern template
    const modernTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{fullName}} - CV</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      color: #333;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #2c3e50;
      color: white;
      padding: 30px;
      text-align: center;
    }
    h1 {
      margin: 0;
      font-size: 28px;
    }
    .job-title {
      font-size: 18px;
      margin-top: 5px;
      font-weight: 300;
    }
    .contact-info {
      background-color: #34495e;
      color: white;
      padding: 10px 30px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;
    }
    .contact-item {
      margin: 5px 10px;
    }
    .main-content {
      padding: 30px;
    }
    .section {
      margin-bottom: 25px;
    }
    h2 {
      color: #2c3e50;
      border-left: 4px solid #3498db;
      padding-left: 10px;
      font-size: 20px;
    }
    .experience-item, .education-item {
      margin-bottom: 20px;
      border-left: 2px solid #ecf0f1;
      padding-left: 15px;
    }
    h3 {
      margin-bottom: 5px;
      color: #2c3e50;
    }
    .date, .location {
      color: #7f8c8d;
      font-size: 14px;
      margin: 5px 0;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 10px;
    }
    .skill-item {
      background-color: #f1f8fe;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>{{fullName}}</h1>
      <div class="job-title">{{jobTitle}}</div>
    </div>
    
    <div class="contact-info">
      <div class="contact-item">📧 {{email}}</div>
      <div class="contact-item">📞 {{phone}}</div>
      <div class="contact-item">📍 {{location}}</div>
      {{#if linkedIn}}<div class="contact-item">LinkedIn: {{linkedIn}}</div>{{/if}}
      {{#if github}}<div class="contact-item">GitHub: {{github}}</div>{{/if}}
      {{#if website}}<div class="contact-item">Website: {{website}}</div>{{/if}}
    </div>
    
    <div class="main-content">
      <div class="section">
        <h2>Professional Summary</h2>
        <p>{{summary}}</p>
      </div>
      
      <div class="section">
        <h2>Skills</h2>
        <div class="skills-grid">
          {{skills}}
        </div>
      </div>
      
      <div class="section">
        <h2>Experience</h2>
        {{experiences}}
      </div>
      
      <div class="section">
        <h2>Education</h2>
        {{education}}
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Professional template
    const professionalTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{fullName}} - CV</title>
  <style>
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .document {
      max-width: 800px;
      margin: 0 auto;
      padding: 30px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #2980b9;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }
    .name-title {
      flex-grow: 1;
    }
    h1 {
      margin: 0;
      color: #2980b9;
      font-size: 28px;
    }
    .job-title {
      font-size: 18px;
      color: #555;
      margin-top: 5px;
    }
    .contact-details {
      text-align: right;
      font-size: 14px;
      line-height: 1.7;
    }
    .section {
      margin: 25px 0;
    }
    h2 {
      color: #2980b9;
      font-size: 20px;
      margin-bottom: 15px;
      position: relative;
    }
    h2::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 50px;
      height: 2px;
      background-color: #2980b9;
    }
    .experience-item, .education-item {
      margin-bottom: 20px;
    }
    h3 {
      margin: 0;
      color: #333;
      font-weight: 600;
    }
    .subtitle {
      display: flex;
      justify-content: space-between;
      color: #555;
      font-size: 14px;
      margin: 5px 0;
    }
    .description {
      margin-top: 10px;
      text-align: justify;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    @media print, (max-width: 768px) {
      .skills-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
</head>
<body>
  <div class="document">
    <div class="header">
      <div class="name-title">
        <h1>{{fullName}}</h1>
        <div class="job-title">{{jobTitle}}</div>
      </div>
      <div class="contact-details">
        <div>{{email}}</div>
        <div>{{phone}}</div>
        <div>{{location}}</div>
        {{#if linkedIn}}<div>{{linkedIn}}</div>{{/if}}
        {{#if github}}<div>{{github}}</div>{{/if}}
        {{#if website}}<div>{{website}}</div>{{/if}}
      </div>
    </div>

    <div class="section">
      <h2>Profile</h2>
      <p>{{summary}}</p>
    </div>

    <div class="section">
      <h2>Professional Experience</h2>
      {{experiences}}
    </div>

    <div class="section">
      <h2>Education</h2>
      {{education}}
    </div>

    <div class="section">
      <h2>Skills</h2>
      <div class="skills-grid">
        {{skills}}
      </div>
    </div>
  </div>
</body>
</html>
    `;
    
    // Insert templates into the database
    await pool.query(`
      INSERT INTO cv_templates (template_name, template_image, template_html, is_premium)
      VALUES 
        ('Simple', '/templates/simple.png', ?, FALSE),
        ('Modern', '/templates/modern.png', ?, FALSE),
        ('Professional', '/templates/professional.png', ?, TRUE)
    `, [simpleTemplate, modernTemplate, professionalTemplate]);

    console.log("Default CV templates inserted successfully");
  } catch (error) {
    console.error("Error inserting default templates:", error);
    throw error;
  }
};