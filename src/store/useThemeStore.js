import create from 'zustand';
import { persist } from 'zustand/middleware';
import { THEMES, applyTheme } from '../utils/themes';

export const useThemeStore = create(
  persist(
    (set) => ({
      currentTheme: 'lavender',
      
      setTheme: (themeName) => {
        const theme = THEMES[themeName];
        if (theme) {
          applyTheme(theme);
          set({ currentTheme: themeName });
        }
      },
      
      getThemeObject: () => {
        const state = useThemeStore.getState();
        return THEMES[state.currentTheme];
      },
    }),
    {
      name: 'study-app-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(THEMES[state.currentTheme]);
        }
      },
    }
  )
);
