import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Check if environment variables are properly configured
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables:');
  console.error('SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
  console.error('SUPABASE_ANON_KEY:', supabaseKey ? '✓ Set' : '✗ Missing');
  console.error('Please create a .env.local file with your Supabase credentials.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// Auth helper functions
export const auth = {
  // Sign up with email/password
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },

  // Sign in with email/password
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  // Sign in with OAuth provider
  signInWithOAuth: async (provider: 'google' | 'github' | 'discord') => {
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  },

  // Sign out
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Current user:', user);
    return user;
  },

  // Get current user ID
  getCurrentUserId: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id;
  }
  };