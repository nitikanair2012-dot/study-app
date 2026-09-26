import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useStudyStore = create(
  persist(
    (set, get) => ({
      // Subjects and questions
      subjects: [],
      questions: {},
      
      // Current session
      currentSubject: null,
      currentSession: null,
      sessionQuestions: [],
      currentQuestionIndex: 0,
      sessionAnswers: [],
      
      // User progress
      userProgress: {},
      streak: 0,
      lastStudyDate: null,
      
      // Actions
      addSubject: (subject) =>
        set((state) => ({
          subjects: [...state.subjects, { id: Date.now(), ...subject }],
        })),
      
      addQuestions: (subjectId, newQuestions) =>
        set((state) => ({
          questions: {
            ...state.questions,
            [subjectId]: newQuestions,
          },
        })),
      
      startSession: (subjectId) => {
        const state = get();
        const allQuestions = state.questions[subjectId] || [];
        set({
          currentSubject: subjectId,
          currentSession: { subjectId, startTime: Date.now(), type: 'study' },
          sessionQuestions: allQuestions,
          currentQuestionIndex: 0,
          sessionAnswers: [],
        });
      },
      
      submitAnswer: (answer, isCorrect) =>
        set((state) => ({
          sessionAnswers: [
            ...state.sessionAnswers,
            {
              questionId: state.sessionQuestions[state.currentQuestionIndex].id,
              answer,
              isCorrect,
              timestamp: Date.now(),
            },
          ],
        })),
      
      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        })),
      
      endSession: () => {
        const state = get();
        const correct = state.sessionAnswers.filter((a) => a.isCorrect).length;
        const total = state.sessionAnswers.length;
        const score = (correct / total) * 100;
        
        set({
          currentSession: {
            ...state.currentSession,
            endTime: Date.now(),
            score,
            correct,
            total,
          },
        });
      },
      
      resetSession: () =>
        set({
          currentSubject: null,
          currentSession: null,
          sessionQuestions: [],
          currentQuestionIndex: 0,
          sessionAnswers: [],
        }),
    }),
    {
      name: 'study-app-store',
    }
  )
);
