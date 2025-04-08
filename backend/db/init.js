import pool from '../config/db.js';

// Function to initialize all required database tables
export const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');
    
    // Create users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table checked/created.');
    
    // Create user_info table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        location VARCHAR(100),
        website VARCHAR(255),
        job_title VARCHAR(100),
        phone_num VARCHAR(20),
        linked_in VARCHAR(255),
        github VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('User info table checked/created.');
    
    // Create user_cvs table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_cvs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        file_name VARCHAR(255),
        file_type VARCHAR(50),
        file_data LONGBLOB,
        extracted_text LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('User CVs table checked/created.');
    
    // Create cv_skills table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cv_skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        skill_name VARCHAR(100) NOT NULL,
        skill_level INT,
        skill_type ENUM('technical', 'soft') DEFAULT 'technical',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('CV skills table checked/created.');
    
    // Create cv_experiences table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cv_experiences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        company_name VARCHAR(100) NOT NULL,
        job_title VARCHAR(100) NOT NULL,
        location VARCHAR(100),
        start_date DATE,
        end_date DATE,
        is_current BOOLEAN DEFAULT FALSE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('CV experiences table checked/created.');
    
    // Create cv_educations table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cv_educations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        institution VARCHAR(100) NOT NULL,
        degree VARCHAR(100),
        field_of_study VARCHAR(100),
        location VARCHAR(100),
        start_date DATE,
        end_date DATE,
        is_current BOOLEAN DEFAULT FALSE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('CV educations table checked/created.');
    
    // Create cv_templates table if not exists
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
    console.log('CV templates table checked/created.');
    
    // Create user_generated_cvs table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_generated_cvs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        template_id INT NOT NULL,
        cv_html LONGTEXT,
        cv_pdf LONGBLOB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (template_id) REFERENCES cv_templates(id)
      )
    `);
    console.log('User generated CVs table checked/created.');

    // Create user_summaries table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_summaries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        summary TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('User summaries table checked/created.');
    
    console.log('Database initialization completed successfully.');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export default initializeDatabase;