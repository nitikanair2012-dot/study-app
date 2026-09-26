import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useNotificationStore = create(
  persist(
    (set, get) => ({
      // Reminders
      reminders: {},
      dailyReminderEnabled: false,
      reminderTime: '09:00',
      notificationsEnabled: false,
      
      // Study history for calendar
      studyHistory: {}, // { '2026-09-02': { date, score, correct, total } }
      
      // Actions
      requestNotificationPermission: async () => {
        if (!('Notification' in window)) {
          console.log('Notifications not supported');
          return false;
        }
        
        if (Notification.permission === 'granted') {
          set({ notificationsEnabled: true });
          return true;
        }
        
        if (Notification.permission !== 'denied') {
          try {
            const permission = await Notification.requestPermission();
            const enabled = permission === 'granted';
            set({ notificationsEnabled: enabled });
            return enabled;
          } catch (error) {
            console.error('Notification permission error:', error);
            return false;
          }
        }
        
        return false;
      },
      
      sendNotification: (title, options = {}) => {
        const state = get();
        if (state.notificationsEnabled && 'Notification' in window) {
          new Notification(title, {
            ...options,
          });
        }
      },
      
      setDailyReminder: (enabled, time = '09:00') => {
        set({ 
          dailyReminderEnabled: enabled,
          reminderTime: time,
        });
        
        if (enabled) {
          get().scheduleReminder();
        }
      },
      
      scheduleReminder: () => {
        const state = get();
        if (!state.dailyReminderEnabled) return;
        
        const checkReminder = () => {
          const now = new Date();
          const [hours, minutes] = state.reminderTime.split(':');
          const reminderDate = new Date();
          reminderDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          // If we've passed the reminder time today, schedule for tomorrow
          if (now > reminderDate) {
            reminderDate.setDate(reminderDate.getDate() + 1);
          }
          
          const timeUntilReminder = reminderDate - now;
          
          setTimeout(() => {
            state.sendNotification('Ready to study?', {
              body: 'Time for your daily study session!',
              tag: 'daily-reminder',
            });
            
            // Reschedule for tomorrow
            setTimeout(checkReminder, 1000);
          }, timeUntilReminder);
        };
        
        checkReminder();
      },
      
      recordStudySession: (date, score, correct, total) => {
        const dateStr = date instanceof Date 
          ? date.toISOString().split('T')[0]
          : date;
        
        set((state) => ({
          studyHistory: {
            ...state.studyHistory,
            [dateStr]: {
              date: dateStr,
              score,
              correct,
              total,
              timestamp: Date.now(),
            },
          },
        }));
      },
      
      getStudyHistoryForMonth: (date = new Date()) => {
        const state = get();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        return Object.values(state.studyHistory).filter((entry) => {
          const [entryYear, entryMonth] = entry.date.split('-');
          return parseInt(entryYear) === year && parseInt(entryMonth) === month;
        });
      },
      
      getStreak: () => {
        const state = get();
        const history = Object.values(state.studyHistory)
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (history.length === 0) return 0;
        
        let streak = 1;
        const today = new Date();
        let currentDate = new Date(today);
        
        for (let i = 0; i < history.length; i++) {
          const historyDate = new Date(history[i].date);
          const expectedDate = new Date(currentDate);
          expectedDate.setDate(expectedDate.getDate() - (i === 0 ? 0 : 1));
          
          if (
            historyDate.toISOString().split('T')[0] ===
            expectedDate.toISOString().split('T')[0]
          ) {
            if (i > 0) streak++;
          } else {
            break;
          }
        }
        
        return streak;
      },
    }),
    {
      name: 'study-app-notifications',
    }
  )
);
