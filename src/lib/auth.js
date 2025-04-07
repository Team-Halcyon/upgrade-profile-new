// lib/auth.js

// 🚀 Sign up
export async function signUp(formData) {
  try {
    const res = await fetch('http://localhost:4000/api/user/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      }),
    });

    return await res.json();
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, message: 'Network error during sign up' };
  }
}

// 🔐 Sign in
export async function signIn(credentials) {
  try {
    const res = await fetch('http://localhost:4000/api/user/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    return await res.json();
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, message: 'Network error during sign in' };
  }
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
