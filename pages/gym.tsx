"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';
import BlurIn from '../components/blur-animation/BlurIn';
import Layout from '../components/layout/layout';
import GymActivityGraph from '../components/gym-graph/GymActivityGraph';
import GymLogger from '../components/gym-graph/GymLogger';
import { useGymData } from '../utils/useGymData';
import { auth } from '../utils/supabase';

export default function Gym() {
  const { data, logActivity, deleteActivity, getActivityForDate, hasUserLoggedDate, isLoaded, user, isAuthenticated, refreshData } = useGymData();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  console.log('data', data);

  const handleLogActivity = (date: string, attended: boolean) => {
    logActivity(date, attended);
    setSelectedDate(date);
  };

  const handleDeleteActivity = (date: string) => {
    deleteActivity(date);
    setSelectedDate(date);
  };

  const existingDataForSelectedDate = getActivityForDate(selectedDate);

  const handleSignOut = async () => {
    await auth.signOut();
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

  return (
    <Layout>
      <div className='main-grid'>
        <article className='color-text'>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className='color-sub'>
              Gym
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600 truncate max-w-[200px] sm:max-w-none">
                    Welcome, {user?.email}
                  </span>
                  <button
                    onClick={() => router.push('/gym/profile')}
                    className="px-3 py-1 text-sm border border-(--sand-9) rounded-md shadow-xs text-(--sand-12) bg-(--sand-2) hover:bg-(--sand-3) focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-(--sand-9) transition-colors whitespace-nowrap"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1 text-sm border border-(--sand-9) rounded-md shadow-xs text-(--sand-1) bg-(--sand-12) hover:bg-(--sand-11) focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-(--sand-9) transition-colors whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => router.push('/gym/login')}
                  className="px-3 py-1 text-sm border border-(--sand-9) rounded-md shadow-xs text-(--sand-1) bg-(--sand-12) hover:bg-(--sand-11) focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-(--sand-9) transition-colors whitespace-nowrap"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          <BlurIn>
            <p className='mb-8 color-sub'>
              Track gym attendance over the past 7 months.
              Each square is split by color to show who attended that day.
              Hover over any day to see the full list, and check the legend below to see each person's color!
            </p>
          </BlurIn>

          <BlurIn>
            <GymActivityGraph
              data={data}
            />
          </BlurIn>

          {isAuthenticated && (
            <BlurIn>
              <GymLogger
                onLogActivity={handleLogActivity}
                onDeleteActivity={handleDeleteActivity}
                hasUserLoggedDate={hasUserLoggedDate}
                existingData={existingDataForSelectedDate}
              />
            </BlurIn>
          )}
        </article>
      </div>
    </Layout>
  );
}
