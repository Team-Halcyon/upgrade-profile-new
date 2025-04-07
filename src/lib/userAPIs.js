// frontend/lib/api/userApi.js

export async function submitUserInfo(formData) {
    try {
      const response = await fetch('http://localhost:4000/api/user/storeUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      return result;  // response from the backend (success or error message)
    } catch (error) {
      console.error('Error submitting user info:', error);
      return { success: false, message: 'Network error while submitting data' };
    }
  }
  