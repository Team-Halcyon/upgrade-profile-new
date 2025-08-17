// lib/auth.js
const API_BASE_URL = 'http://upgrade-profile-new-production.up.railway.app';

export async function signUp(formData) {
  try {
    if (!(formData instanceof FormData)) {
      throw new Error('Expected FormData for file upload');
    }

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      body: formData, // Let browser set multipart/form-data headers
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.detail || 'Registration failed',
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

// 🔐 Sign in
export async function signIn(credentials) {
  const formData = new URLSearchParams();
  formData.append('username', credentials.email); // not "email"
  formData.append('password', credentials.password);

  const res = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const data = await res.json();
  console.log("Login response:", data);
  if (!res.ok) {
    return {
      success: false,
      message: data.detail || 'Login failed',
    };
  }


  return {
    success: true,
    token: data.access_token,
    tokenType: data.token_type,
  };
}


// 🔁 Forgot Password
export async function forgotPassword(email) {
  try {
    const res = await fetch('http://localhost:4000/api/user/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return await res.json();
  } catch (error) {
    console.error('Forgot password error:', error);
    return { success: false, message: 'Network error during password reset' };
  }
}
