import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

function Dashboard() {
  const { 
    userProgress, 
    activities,
    totalPoints,
    badgesEarned,
    quizzesCompleted,
    chaptersCompleted 
  } = useProgress();

  const { t } = useTranslation();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'quiz_completed':
        return '📝';
      case 'module_completed':
        return '📚';
      case 'badge_earned':
        return '🏆';
      case 'points_earned':
        return '⭐';
      case 'trivia_played':
        return '🎮';
      default:
        return '📌';
    }
  };

  const getActivityMessage = (activity) => {
    switch (activity.type) {
      case 'quiz_completed':
        return t('recentActivity.activities.quiz', { title: activity.title, score: activity.score });
      case 'module_completed':
        return t('recentActivity.activities.module', { title: activity.title });
      case 'badge_earned':
        return t('recentActivity.activities.badge', { badgeName: activity.badgeName });
      case 'points_earned':
        return t('recentActivity.activities.points', { points: activity.points, source: activity.source });
      case 'trivia_played':
        return t('recentActivity.activities.trivia', { gameTitle: activity.gameTitle, result: activity.result });
      default:
        return activity.message || t('recentActivity.noActivity');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        {/* Welcome Section */}
        <div className="bg-indigo-600 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {t('welcome.back')}, {userProgress.email}!
              </h1>
              <p className="text-indigo-100 mt-1">
                {t('welcome.continue')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">{t('progress.title')}</p>
              <p className="text-3xl font-bold text-indigo-600">
                {Math.round((chaptersCompleted / 7) * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/learn" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-2xl mb-2">📚</div>
            <h3 className="text-lg font-semibold">{t('quickActions.continueLearning.title')}</h3>
            <p className="text-gray-600">{t('quickActions.continueLearning.description')}</p>
          </Link>

          <Link to="/quiz" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-2xl mb-2">❓</div>
            <h3 className="text-lg font-semibold">{t('quickActions.dailyQuiz.title')}</h3>
            <p className="text-gray-600">{t('quickActions.dailyQuiz.description')}</p>
          </Link>

          <Link to="/trivia" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="text-2xl mb-2">🎮</div>
            <h3 className="text-lg font-semibold">{t('quickActions.playTrivia.title')}</h3>
            <p className="text-gray-600">{t('quickActions.playTrivia.description')}</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievements Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{t('achievements.title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-indigo-600">{badgesEarned}</p>
                <p className="text-gray-600">{t('progress.badges')}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-indigo-600">{totalPoints}</p>
                <p className="text-gray-600">{t('progress.points')}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-indigo-600">{quizzesCompleted}</p>
                <p className="text-gray-600">{t('progress.quizzes')}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-indigo-600">{chaptersCompleted}</p>
                <p className="text-gray-600">{t('progress.chapters')}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{t('recentActivity.title')}</h2>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {getActivityMessage(activity)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="text-gray-500 text-center py-4">{t('recentActivity.noActivity')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 