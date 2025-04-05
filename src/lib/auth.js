import { supabase } from './supabase';

/**
 * Sign in with email and password
 * @param {Object} credentials - User credentials
 * @returns {Promise<Object>} Result object with success status and user data or error message
 */
export async function signIn({ email, password, provider }) {
  try {
    if (provider) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
      return { success: true, data };
    }

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (!user.email_confirmed_at) {
      // Send a new confirmation email
      await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      return {
        success: false,
        message: 'Please confirm your email address. A new confirmation email has been sent.',
        isEmailUnconfirmed: true,
      };
    }

    return { success: true, data: { user } };
  } catch (error) {
    console.error('Sign in error:', error.message);
    if (error.message.includes('Email not confirmed')) {
      return {
        success: false,
        message: 'Please confirm your email address before signing in.',
        isEmailUnconfirmed: true,
      };
    }
    return {
      success: false,
      message: error.message || 'Failed to sign in',
    };
  }
}

/**
 * Sign up with email and password
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Result object with success status and user data or error message
 */
export async function signUp({ email, password, fullName }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    return {
      success: true,
      message: 'Please check your email for a confirmation link.',
      requiresEmailConfirmation: true,
      data,
    };
  } catch (error) {
    console.error('Sign up error:', error.message);
    return {
      success: false,
      message: error.message || 'Failed to create account',
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
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error.message);
    return {
      success: false,
      message: error.message || 'Failed to sign out',
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
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error.message);
    return {
      success: false,
      message: error.message || 'Failed to send reset password email',
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
      password: newPassword,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Update password error:', error.message);
    return {
      success: false,
      message: error.message || 'Failed to update password',
    };
  }
}

export async function resendConfirmationEmail(email) {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) throw error;

    return {
      success: true,
      message: 'Confirmation email has been resent.',
    };
  } catch (error) {
    console.error('Resend confirmation error:', error.message);
    return {
      success: false,
      message: error.message || 'Failed to resend confirmation email',
    };
  }
}