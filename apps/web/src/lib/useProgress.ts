import { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { COURSES } from './courses';

export const useProgress = () => {
  const [progress, setProgress] = useState<Record<string, UserProgress>>({});

  useEffect(() => {
    const saved = localStorage.getItem('courseProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: Record<string, UserProgress>) => {
    setProgress(newProgress);
    localStorage.setItem('courseProgress', JSON.stringify(newProgress));
  };

  const getProgress = (courseId: string): UserProgress => {
    return progress[courseId] || { completedModules: [], quizScores: {}, canMint: false };
  };

  const completeModule = (courseId: string, moduleId: string) => {
    const current = getProgress(courseId);
    if (!current.completedModules.includes(moduleId)) {
      const updated = {
        ...current,
        completedModules: [...current.completedModules, moduleId],
      };
      
      const course = COURSES.find(c => c.id === courseId);
      if (course && updated.completedModules.length === course.modules.length) {
         // Check if all quizzes also passed
         const allQuizzesPassed = course.modules.every(m => 
            !m.quiz || (updated.quizScores[m.id] || 0) >= m.quiz.passingScore
         );
         updated.canMint = allQuizzesPassed;
      }

      saveProgress({ ...progress, [courseId]: updated });
    }
  };

  const saveQuizScore = (courseId: string, moduleId: string, score: number) => {
    const current = getProgress(courseId);
    const updated = {
      ...current,
      quizScores: { ...current.quizScores, [moduleId]: score },
    };

    const course = COURSES.find(c => c.id === courseId);
    if (course && updated.completedModules.length === course.modules.length) {
       const allQuizzesPassed = course.modules.every(m => 
          !m.quiz || (updated.quizScores[m.id] || 0) >= m.quiz.passingScore
       );
       updated.canMint = allQuizzesPassed;
    }

    saveProgress({ ...progress, [courseId]: updated });
  };

  return { getProgress, completeModule, saveQuizScore };
};
