import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

// Fetch gym data from Supabase
const fetchGymData = async (): Promise<ActivityData[]> => {
  const { data: entries, error } = await supabase
    .rpc('get_gym_entries_with_usernames');

  if (error) {
    console.error('Error loading gym data:', error);
    throw error;
  }

  return transformToActivityData(entries || []);
};

// Fetch current user
const fetchCurrentUser = async () => {
  try {
    return await auth.getCurrentUser();
  } catch (error) {
    console.error('Error checking user authentication:', error);
    return null;
  }
};

// Check if user has logged a specific date
const checkUserLoggedDate = async (userId: string, date: string): Promise<boolean> => {
  if (!userId) return false;

  try {
    const { data: entries, error } = await supabase
      .from('gym_entries')
      .select('*')
      .eq('user_id', userId)
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

export const useGymData = () => {
  const queryClient = useQueryClient();

  // Query for current user
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: Infinity, // User data doesn't change often
  });

  // Query for gym data - fetch for everyone (public data)
  const { data: gymData = [], isLoading: isGymDataLoading } = useQuery({
    queryKey: ['gymData'],
    queryFn: fetchGymData,
  });

  // Set up auth state change listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        queryClient.setQueryData(['currentUser'], session?.user ?? null);
        // Always refresh gym data on auth state change
        queryClient.invalidateQueries({ queryKey: ['gymData'] });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  // Mutation for logging activity
  const logActivityMutation = useMutation({
    mutationFn: async ({ date, attended }: { date: string; attended: boolean }) => {
      if (!user) {
        throw new Error('User not authenticated');
      }

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
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch gym data
      queryClient.invalidateQueries({ queryKey: ['gymData'] });
    },
    onError: (error) => {
      console.error('Error logging activity:', error);
    }
  });

  // Mutation for deleting activity
  const deleteActivityMutation = useMutation({
    mutationFn: async (date: string) => {
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('gym_entries')
        .delete()
        .eq('user_id', user.id)
        .eq('date', date);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch gym data
      queryClient.invalidateQueries({ queryKey: ['gymData'] });
    },
    onError: (error) => {
      console.error('Error deleting activity:', error);
    }
  });

  const logActivity = (date: string, attended: boolean) => {
    logActivityMutation.mutate({ date, attended });
  };

  const deleteActivity = (date: string) => {
    deleteActivityMutation.mutate(date);
  };

  const getActivityForDate = (date: string): boolean => {
    const entry = gymData.find((entry) => entry.date === date);
    return entry?.attended ?? false;
  };

  const hasUserLoggedDate = async (date: string): Promise<boolean> => {
    if (!user) return false;
    return checkUserLoggedDate(user.id, date);
  };

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['gymData'] });
  };

  const isLoaded = !isUserLoading;

  return {
    data: gymData,
    logActivity,
    deleteActivity,
    getActivityForDate,
    hasUserLoggedDate,
    isLoaded,
    user,
    isAuthenticated: !!user,
    refreshData,
    isLoading: isUserLoading || isGymDataLoading,
    isMutating: logActivityMutation.isPending || deleteActivityMutation.isPending,
  };
};

