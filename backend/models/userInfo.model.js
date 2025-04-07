import pool from '../config/db.js';


export const storeUserInfo = async (full_name, email, location, website, job_title, phone_num, linked_in, github) => {
    const query = "SELECT id FROM users WHERE email = ?";
    
    try {
        const [rows] = await pool.query(query, [email]);  // Use 'pool.query' instead of 'db.query'
        console.log("User Found:", rows);  // Log the rows for debugging
        // Check if user exists
        if (rows.length === 0) {
            console.log("User not found with the email:", email);
            return null;  // Return null if no user found
        }

        const id = rows[0].id;  // Extract the id

        // Insert into user_info table
        const [result] = await pool.query(
            "INSERT INTO user_info (id, full_name,email, location, website, job_title, phone_num, linked_in, github) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?)", 
            [id, full_name,email, location, website, job_title, phone_num, linked_in, github]
        );
        //console.log("Insert Result:", result);  // Log the result for debugging

        // Check if the insertion was successful by checking insertId
        if (result && result.insertId) {
            return result.insertId;  // Return the inserted row's ID in user_info
        } else {
            console.log("Failed to get insertId from result:", result);
            return null;  // Return null if insertId is not available
        }

        //return result.insertId;  // Return the ID of the inserted record in user_info
    } catch (err) {
        console.log("Database error:", err);
        throw err;  // Rethrow error to handle it elsewhere
    }
};
