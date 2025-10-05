import { useState, useEffect } from 'react';
import { supabase, auth } from './supabase';

export interface ActivityData {
  date: string;
  attended: boolean;
  users?: string[]; // usernames of users who attended
}

export interface GymEntry {
  id: string;
  user_id: string;
  date: string;
  attended: boolean;
  created_at: string;
  updated_at: string;
  username?: string;
}

export const useGymData = () => {
  const [data, setData] = useState<ActivityData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Transform Supabase entries to ActivityData format
  // Group by date and collect usernames for each date
  const transformToActivityData = (entries: GymEntry[]): ActivityData[] => {
    const dateMap = new Map<string, { attended: boolean; users: string[] }>();
    
    entries.forEach(entry => {
      if (!dateMap.has(entry.date)) {
        dateMap.set(entry.date, { attended: false, users: [] });
      }
      
      const dateData = dateMap.get(entry.date)!;
      
      // If anyone attended on this date, mark it as attended
      if (entry.attended) {
        dateData.attended = true;
        if (entry.username) {
          dateData.users.push(entry.username);
        }
      }
    });
    
    return Array.from(dateMap.entries()).map(([date, { attended, users }]) => ({
      date,
      attended,
      users
    }));
  };

  // Load gym data from Supabase - now loads ALL users' data
  const loadGymData = async (userId: string) => {
    try {
      // Call the database function to get all gym entries with usernames
      const { data: entries, error } = await supabase
        .rpc('get_gym_entries_with_usernames');

      if (error) {
        console.error('Error loading gym data:', error);
        return;
      }

      // Transform Supabase data to ActivityData format
      const transformedData = transformToActivityData(entries || []);
      setData(transformedData);
    } catch (error) {
      console.error('Error loading gym data:', error);
    }
    setIsLoaded(true);
  };

  // Check authentication status
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
        // Load gym data if user is authenticated
        if (currentUser) {
          await loadGymData(currentUser.id);
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        setUser(null);
      } finally {
        // Always set loaded to true after attempting to check user
        setIsLoaded(true);
      }
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadGymData(session.user.id);
        } else {
          setData([]);
        }
      }
    );

    // Set a timeout to ensure loading doesn't persist indefinitely
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 5000); // 5 second timeout

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const logActivity = async (date: string, attended: boolean) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      // Upsert entry for the current user
      const entry = {
        user_id: user.id,
        date,
        attended
      };

      const { error } = await supabase
        .from('gym_entries')
        .upsert(entry, { 
          onConflict: 'user_id,date',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error logging activity:', error);
        return;
      }
      // Reload data to reflect changes
      await loadGymData(user.id);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  const getActivityForDate = (date: string): boolean => {
    const entry = data.find((entry) => entry.date === date);
    return entry?.attended ?? false;
  };

  const deleteActivity = async (date: string) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    try {
      const { error } = await supabase
        .from('gym_entries')
        .delete()
        .eq('user_id', user.id)
        .eq('date', date);

      if (error) {
        console.error('Error deleting activity:', error);
        return;
      }
      // Reload data to reflect changes
      await loadGymData(user.id);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const hasUserLoggedDate = async (date: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data: entries, error } = await supabase
        .from('gym_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', date)
        .limit(1);

      if (error) {
        console.error('Error checking user log:', error);
        return false;
      }

      return entries && entries.length > 0;
    } catch (error) {
      console.error('Error checking user log:', error);
      return false;
    }
  };

  const refreshData = async () => {
    if (user) {
      await loadGymData(user.id);
    }
  };

  return {
    data,
    logActivity,
    deleteActivity,
    getActivityForDate,
    hasUserLoggedDate,
    isLoaded,
    user,
    isAuthenticated: !!user,
    refreshData
  };
};

