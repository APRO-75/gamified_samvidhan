export const RANKS = {
  WOOD: {
    name: 'Wood',
    minPoints: 0,
    color: '#8B4513',
    image: '🪵'
  },
  COPPER: {
    name: 'Copper',
    minPoints: 100,
    color: '#B87333',
    image: '🥉'
  },
  BRONZE: {
    name: 'Bronze',
    minPoints: 250,
    color: '#CD7F32',
    image: '🥉'
  },
  SILVER: {
    name: 'Silver',
    minPoints: 500,
    color: '#C0C0C0',
    image: '🥈'
  },
  GOLD: {
    name: 'Gold',
    minPoints: 1000,
    color: '#FFD700',
    image: '🥇'
  },
  PLATINUM: {
    name: 'Platinum',
    minPoints: 2000,
    color: '#E5E4E2',
    image: '👑'
  },
  DIAMOND: {
    name: 'Diamond',
    minPoints: 5000,
    color: '#B9F2FF',
    image: '💎'
  }
};

export const ACHIEVEMENTS = {
  FIRST_STEPS: {
    id: 'FIRST_STEPS',
    name: 'First Steps',
    description: 'Complete your first module',
    image: '🎯',
    rarity: 'Common',
    points: 50
  },
  QUICK_LEARNER: {
    id: 'QUICK_LEARNER',
    name: 'Quick Learner',
    description: 'Complete 3 modules',
    image: '📚',
    rarity: 'Common',
    points: 100
  },
  KNOWLEDGE_SEEKER: {
    id: 'KNOWLEDGE_SEEKER',
    name: 'Knowledge Seeker',
    description: 'Complete all modules',
    image: '🎓',
    rarity: 'Rare',
    points: 500
  },
  PERFECT_SCORE: {
    id: 'PERFECT_SCORE',
    name: 'Perfect Score',
    description: 'Get 100% on a quiz',
    image: '⭐',
    rarity: 'Rare',
    points: 200
  },
  QUIZ_MASTER: {
    id: 'QUIZ_MASTER',
    name: 'Quiz Master',
    description: 'Complete 5 quizzes with an average score of 90% or higher',
    image: '🏆',
    rarity: 'Epic',
    points: 300
  },
  CONSTITUTION_MASTER: {
    id: 'CONSTITUTION_MASTER',
    name: 'Constitution Master',
    description: 'Complete all modules and achieve a perfect score on all quizzes',
    image: '👑',
    rarity: 'Legendary',
    points: 1000
  }
};

export const NOTIFICATIONS = {
  RANK_UP: 'RANK_UP',
  ACHIEVEMENT_UNLOCKED: 'ACHIEVEMENT_UNLOCKED'
}; 