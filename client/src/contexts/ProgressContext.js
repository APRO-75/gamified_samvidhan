import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { RANKS, ACHIEVEMENTS, NOTIFICATIONS } from '../constants/badges';

const ProgressContext = createContext();

export function useProgress() {
  return useContext(ProgressContext);
}

export function ProgressProvider({ children }) {
  const [userProgress, setUserProgress] = useState({
    modulesCompleted: 0,
    completedModules: [],
    quizzesTaken: 0,
    averageScore: 0,
    totalPoints: 0,
    totalTimeSpent: 0,
    badges: [],
    achievements: [],
    currentRank: RANKS.WOOD,
    recentActivities: []
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadProgress = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'progress', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProgress(docSnap.data());
          }
        } catch (error) {
          console.error('Error loading progress:', error);
        }
      }
    };
    loadProgress();
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      localStorage.setItem('userProgress', JSON.stringify(userProgress));
      syncProgressWithFirebase();
    }
  }, [userProgress]);

  const syncProgressWithFirebase = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, 'progress', user.uid);
        await setDoc(docRef, userProgress);
      } catch (error) {
        console.error('Error syncing progress:', error);
      }
    }
  };

  const resetProgress = () => {
    setUserProgress({
      modulesCompleted: 0,
      completedModules: [],
      quizzesTaken: 0,
      averageScore: 0,
      totalPoints: 0,
      totalTimeSpent: 0,
      badges: [],
      achievements: [],
      currentRank: RANKS.WOOD,
      recentActivities: []
    });
  };

  const addNotification = (type, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const checkRankProgress = (points) => {
    const ranks = Object.values(RANKS);
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (points >= ranks[i].minPoints && userProgress.currentRank.name !== ranks[i].name) {
        setUserProgress(prev => ({
          ...prev,
          currentRank: ranks[i]
        }));
        addNotification(NOTIFICATIONS.RANK_UP, `Congratulations! You've reached ${ranks[i].name} rank!`);
        break;
      }
    }
  };

  const checkAchievements = () => {
    const { modulesCompleted, quizzesTaken, averageScore, completedModules } = userProgress;
    const unlockedAchievements = [];

    // First Steps
    if (modulesCompleted >= 1 && !hasAchievement(ACHIEVEMENTS.FIRST_STEPS.id)) {
      unlockedAchievements.push(ACHIEVEMENTS.FIRST_STEPS);
    }

    // Quick Learner
    if (modulesCompleted >= 3 && !hasAchievement(ACHIEVEMENTS.QUICK_LEARNER.id)) {
      unlockedAchievements.push(ACHIEVEMENTS.QUICK_LEARNER);
    }

    // Knowledge Seeker
    if (completedModules.length === 7 && !hasAchievement(ACHIEVEMENTS.KNOWLEDGE_SEEKER.id)) {
      unlockedAchievements.push(ACHIEVEMENTS.KNOWLEDGE_SEEKER);
    }

    // Quiz Master
    if (quizzesTaken >= 5 && averageScore >= 90 && !hasAchievement(ACHIEVEMENTS.QUIZ_MASTER.id)) {
      unlockedAchievements.push(ACHIEVEMENTS.QUIZ_MASTER);
    }

    unlockedAchievements.forEach(achievement => {
      addAchievement(achievement);
    });
  };

  const hasAchievement = (achievementId) => {
    return userProgress.achievements.some(a => a.id === achievementId);
  };

  const addAchievement = (achievement) => {
    setUserProgress(prev => {
      const newPoints = prev.totalPoints + achievement.points;
      checkRankProgress(newPoints);
      
      return {
        ...prev,
        achievements: [...prev.achievements, achievement],
        totalPoints: newPoints
      };
    });
    addNotification(
      NOTIFICATIONS.ACHIEVEMENT_UNLOCKED,
      `Achievement Unlocked: ${achievement.name} (+${achievement.points} points)`
    );
  };

  const updateModulesCompleted = (moduleId) => {
    if (!userProgress.completedModules.includes(moduleId)) {
      setUserProgress(prev => ({
        ...prev,
        modulesCompleted: prev.modulesCompleted + 1,
        completedModules: [...prev.completedModules, moduleId]
      }));
      checkAchievements();
    }
  };

  const updateTimeSpent = (minutes) => {
    setUserProgress(prev => ({
      ...prev,
      totalTimeSpent: prev.totalTimeSpent + minutes
    }));
  };

  const updateQuizStats = (score) => {
    setUserProgress(prev => {
      const newQuizzesTaken = prev.quizzesTaken + 1;
      const newAverageScore = ((prev.averageScore * prev.quizzesTaken) + score) / newQuizzesTaken;
      
      if (score === 100 && !hasAchievement(ACHIEVEMENTS.PERFECT_SCORE.id)) {
        addAchievement(ACHIEVEMENTS.PERFECT_SCORE);
      }

      return {
        ...prev,
        quizzesTaken: newQuizzesTaken,
        averageScore: newAverageScore
      };
    });
    checkAchievements();
  };

  const addPoints = (points, reason) => {
    setUserProgress(prev => {
      const newPoints = prev.totalPoints + points;
      checkRankProgress(newPoints);
      return {
        ...prev,
        totalPoints: newPoints
      };
    });
    addActivity(`Earned ${points} points - ${reason}`);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const addActivity = (activity) => {
    const newActivity = {
      id: Date.now(),
      description: activity,
      timestamp: new Date()
    };
    setUserProgress(prev => ({
      ...prev,
      recentActivities: [newActivity, ...prev.recentActivities.slice(0, 9)]
    }));
  };

  const value = {
    userProgress,
    notifications,
    resetProgress,
    updateModulesCompleted,
    updateTimeSpent,
    updateQuizStats,
    addPoints,
    formatTime,
    addActivity,
    hasAchievement,
    checkAchievements
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
} 