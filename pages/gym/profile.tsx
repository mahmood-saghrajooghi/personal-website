"use client";

import { useState } from 'react';
import BlurIn from '../../components/blur-animation/BlurIn';
import Layout from '../../components/layout/layout';
import AuthForm from '../../components/auth/AuthForm';
import ProfileSettings from '../../components/profile/ProfileSettings';
import { useGymData } from '../../utils/useGymData';
import { auth } from '../../utils/supabase';
import { useRouter } from 'next/router';

export default function Profile() {
  const { isLoaded, user, isAuthenticated, refreshData } = useGymData();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/gym');
  };

  // Show loading state
  if (!isLoaded) {
    return (
      <Layout>
        <div className='main-grid'>
          <article className='color-text'>
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            </div>
          </article>
        </div>
      </Layout>
    );
  }

  // Show auth form if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className='main-grid'>
          <article className='color-text'>
            <AuthForm />
          </article>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='main-grid'>
        <article className='color-text'>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className='color-sub'>
              Profile Settings
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <span className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none">
                {user?.email}
              </span>
              <button
                onClick={() => router.push('/gym')}
                className="px-3 py-1 text-sm border border-(--sand-9) rounded-md shadow-xs text-(--sand-12) bg-(--sand-2) hover:bg-(--sand-3) focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-(--sand-9) transition-colors whitespace-nowrap"
              >
                Back to Gym
              </button>
              <button
                onClick={handleSignOut}
                className="px-3 py-1 text-sm border border-(--sand-9) rounded-md shadow-xs text-(--sand-1) bg-(--sand-12) hover:bg-(--sand-11) focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-(--sand-9) transition-colors whitespace-nowrap"
              >
                Sign Out
              </button>
            </div>
          </div>

          <BlurIn>
            <p className='mb-8 color-sub'>
              Update your profile settings. Your username will be displayed in the gym activity graph.
            </p>
          </BlurIn>

          {user && (
            <BlurIn>
              <ProfileSettings userId={user.id} onProfileUpdate={refreshData} />
            </BlurIn>
          )}
        </article>
      </div>
    </Layout>
  );
}
