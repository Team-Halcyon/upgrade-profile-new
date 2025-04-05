
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sign in with email and password
 * @param {Object} credentials - User credentials
 * @returns {Promise<Object>} Result object with success status and user data or error message
 */
export async function signIn({ email, password, rememberMe = false }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        // Set longer session if rememberMe is true
        expiresIn: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days vs 1 day
      }
    });

    if (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        message: error.message || 'Failed to sign in'
      };
    }

    return {
      success: true,
      user: data.user
    };
  } catch (err) {
    console.error('Unexpected error during sign in:', err);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
}

/**
 * Sign up with email and password
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Result object with success status and user data or error message
 */
export async function signUp({ fullName, email, password }) {
  try {
    // Register the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (authError) {
      console.error('Sign up auth error:', authError);
      return {
        success: false,
        message: authError.message || 'Failed to create account'
      };
    }

    // After successful registration, create a profile in the profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: fullName,
          email: email,
          created_at: new Date().toISOString()
        }
      ]);

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // User was created but profile wasn't - consider this a partial success
      return {
        success: true,
        warning: 'Account created but profile setup incomplete',
        user: authData.user
      };
    }

    return {
      success: true,
      user: authData.user
    };
  } catch (err) {
    console.error('Unexpected error during sign up:', err);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
}

/**
 * Sign out the current user
 * @returns {Promise<Object>} Result object with success status
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
      return {
        success: false,
        message: error.message || 'Failed to sign out'
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error during sign out:', err);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
}

/**
 * Get the current authenticated user
 * @returns {Promise<Object|null>} Current user or null if not authenticated
 */
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data?.user) {
      return null;
    }
    
    return data.user;
  } catch (err) {
    console.error('Error getting current user:', err);
    return null;
  }
}

/**
 * Sign in with OAuth provider
 * @param {Object} options - OAuth options
 * @param {string} options.provider - Provider name (e.g., 'google', 'facebook')
 * @returns {Promise<Object>} Result object with success status
 */
export async function signInWithOAuth({ provider }) {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error(`${provider} OAuth error:`, error);
      return {
        success: false,
        message: error.message || `Failed to sign in with ${provider}`
      };
    }

    // Note: This won't actually return as the user will be redirected
    return { success: true };
  } catch (err) {
    console.error(`Unexpected error during ${provider} sign in:`, err);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
}

/**
 * Reset password for a user
 * @param {string} email - User email
 * @returns {Promise<Object>} Result object with success status
 */
export async function resetPassword(email) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`
    });

    if (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send password reset email'
      };
    }

    return { 
      success: true,
      message: 'Password reset email sent'
    };
  } catch (err) {
    console.error('Unexpected error during password reset:', err);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
}

/**
 * Update user password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Result object with success status
 */
export async function updatePassword(newPassword) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error('Update password error:', error);
      return {
        success: false,
        message: error.message || 'Failed to update password'
      };
    }

    return { 
      success: true,
      message: 'Password updated successfully'
    };
  } catch (err) {
    console.error('Unexpected error during password update:', err);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
}