import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

// Badge definitions with their requirements and images
const BADGE_TYPES = {
  RANKS: {
    WOOD: { name: 'Wood', minPoints: 0, image: '🌳' },
    BRONZE: { name: 'Bronze', minPoints: 500, image: '🥉' },
    SILVER: { name: 'Silver', minPoints: 1000, image: '🥈' },
    GOLD: { name: 'Gold', minPoints: 2000, image: '🥇' },
    PLATINUM: { name: 'Platinum', minPoints: 3500, image: '💎' },
    DIAMOND: { name: 'Diamond', minPoints: 5000, image: '💠' },
  },
  ACHIEVEMENTS: {
    FIRST_MODULE: { name: 'First Steps', description: 'Complete your first module', image: '🎯' },
    QUICK_LEARNER: { name: 'Quick Learner', description: 'Complete 3 modules', image: '🚀' },
    KNOWLEDGE_SEEKER: { name: 'Knowledge Seeker', description: 'Complete all modules', image: '📚' },
    PERFECT_QUIZ: { name: 'Perfect Score', description: 'Get 100% in a quiz', image: '🏆' },
    DEDICATED_LEARNER: { name: 'Dedicated Learner', description: 'Spend 2 hours learning', image: '⏰' },
    CONSTITUTION_MASTER: { name: 'Constitution Master', description: 'Complete all quizzes with >90% average', image: '👑' },
  }
};

function Badges() {
  const { currentUser } = useAuth();
  const { userProgress } = useProgress();

  const calculateRank = (points) => {
    const ranks = Object.entries(BADGE_TYPES.RANKS);
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (points >= ranks[i][1].minPoints) {
        return ranks[i][1];
      }
    }
    return BADGE_TYPES.RANKS.WOOD;
  };

  const calculateAchievements = (progress) => {
    const achievements = [];
    
    // Check for module completion achievements
    if (progress.modulesCompleted >= 1) {
      achievements.push(BADGE_TYPES.ACHIEVEMENTS.FIRST_MODULE);
    }
    if (progress.modulesCompleted >= 3) {
      achievements.push(BADGE_TYPES.ACHIEVEMENTS.QUICK_LEARNER);
    }
    if (progress.modulesCompleted >= 7) {
      achievements.push(BADGE_TYPES.ACHIEVEMENTS.KNOWLEDGE_SEEKER);
    }

    // Check for quiz achievements
    if (progress.quizzesTaken > 0 && progress.averageScore === 100) {
      achievements.push(BADGE_TYPES.ACHIEVEMENTS.PERFECT_QUIZ);
    }

    // Check for time-based achievements
    if (progress.totalTimeSpent >= 7200) { // 2 hours
      achievements.push(BADGE_TYPES.ACHIEVEMENTS.DEDICATED_LEARNER);
    }

    // Check for mastery achievement
    if (progress.quizzesTaken >= 7 && progress.averageScore >= 90) {
      achievements.push(BADGE_TYPES.ACHIEVEMENTS.CONSTITUTION_MASTER);
    }

    return achievements;
  };

  const currentRank = calculateRank(userProgress.totalPoints || 0);
  const achievements = calculateAchievements(userProgress);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Achievements & Ranks</h1>
          <p className="text-lg text-gray-600">Track your progress and unlock achievements</p>
        </div>

        {/* Current Rank Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">{currentRank.image}</div>
            <h2 className="text-2xl font-bold text-gray-900">{currentRank.name} Rank</h2>
            <p className="text-gray-600 mt-2">
              {userProgress.totalPoints || 0} points
            </p>
            {Object.entries(BADGE_TYPES.RANKS).map(([key, rank], index) => (
              <div
                key={key}
                className={`inline-flex items-center mx-2 ${
                  userProgress.totalPoints >= rank.minPoints
                    ? 'text-indigo-600'
                    : 'text-gray-400'
                }`}
              >
                {index > 0 && <span className="mx-2">→</span>}
                <span>{rank.image}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(BADGE_TYPES.ACHIEVEMENTS).map(([key, badge]) => {
            const isUnlocked = achievements.includes(badge);
            return (
              <div
                key={key}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  isUnlocked ? 'border-2 border-indigo-500' : 'opacity-75'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{badge.image}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {badge.name}
                  </h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                  {isUnlocked && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-3">
                      Unlocked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Badges; 