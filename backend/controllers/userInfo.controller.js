import { storeUserInfo} from '../models/userInfo.model.js';


export const createUserInfo = async (req, res) => {
    const { full_name, email, location, website, job_title, phone_num, linked_in, github } = req.body;

    if (!full_name || !email || !location || !website || !job_title || !phone_num || !linked_in || !github) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await storeUserInfo(full_name, email, location, website, job_title, phone_num, linked_in, github);
        //console.log("Result from storeUserInfo:", result);  // Log the result for debugging
        if (!result) {
            return res.status(404).json({ message: 'User not found or failed to insert user info' });
        }

        return res.status(201).json({ message: 'User info created successfully', userInfoId: result });
    } catch (error) {
        console.error("Error in createUserInfo:", error);
        return res.status(500).json({ message: 'Server error, please try again later' });
    }
};
