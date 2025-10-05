import React, { useState } from 'react';
import { auth } from '../../utils/supabase';

interface AuthFormProps {
  onAuthSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await auth.signUp(email, password);
        if (error) throw error;
        setError('Check your email for the confirmation link!');
      } else {
        const { error } = await auth.signIn(email, password);
        if (error) throw error;
        onAuthSuccess?.();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      const { error } = await auth.signInWithOAuth(provider);
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-(--sand-3) rounded-lg shadow-md border border-(--sand-6)">
      <h2 className="text-2xl font-bold text-center mb-6 text-(--sand-12)">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-(--sand-11)">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-(--sand-6) rounded-md shadow-xs focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500 bg-(--sand-2) text-(--sand-12)"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-(--sand-11)">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-(--sand-6) rounded-md shadow-xs focus:outline-hidden focus:ring-indigo-500 focus:border-indigo-500 bg-(--sand-2) text-(--sand-12)"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-(--sand-9) rounded-md shadow-md text-sm font-semibold text-(--sand-1) bg-(--sand-12) hover:bg-(--sand-11) focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-(--sand-9) disabled:opacity-50 transition-colors"
        >
          {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>

        <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-(--sand-6)" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-(--sand-3) text-(--sand-11)">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => handleOAuthSignIn('google')}
            disabled={loading}
            className="w-full inline-flex justify-center py-2 px-4 border border-(--sand-6) rounded-md shadow-xs bg-(--sand-2) text-sm font-medium text-(--sand-11) hover:bg-(--sand-4) disabled:opacity-50"
          >
            Google
          </button>
          <button
            onClick={() => handleOAuthSignIn('github')}
            disabled={loading}
            className="w-full inline-flex justify-center py-2 px-4 border border-(--sand-6) rounded-md shadow-xs bg-(--sand-2) text-sm font-medium text-(--sand-11) hover:bg-(--sand-4) disabled:opacity-50"
          >
            GitHub
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-(--sand-11) hover:text-(--sand-12) text-sm underline hover:no-underline transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
