import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useAccountStore = create(
  persist(
    (set, get) => ({
      // User profile
      user: {
        name: 'Student',
        email: 'student@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student',
        joinDate: new Date().toISOString(),
      },
      
      // Preferences
      preferences: {
        theme: 'lavender',
        notifications: true,
        dailyReminders: false,
      },
      
      // Actions
      updateProfile: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates },
        }));
      },
      
      updatePreferences: (updates) => {
        set((state) => ({
          preferences: { ...state.preferences, ...updates },
        }));
      },
      
      getProfileCompletion: () => {
        const state = get();
        const { name, email } = state.user;
        return (name && email) ? 100 : 50;
      },
    }),
    {
      name: 'study-app-account',
    }
  )
);
