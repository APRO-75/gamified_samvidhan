import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { extractUsername, capitalizeFirstLetter } from '../utils/userUtils';
import { avatarsList, avatarComponents } from '../components/Avatars';

function Profile() {
  const { currentUser } = useAuth();
  const { userProgress, resetProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [selectedAvatarId, setSelectedAvatarId] = useState(1);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatarId(avatarId);
    setShowAvatarSelector(false);
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const username = capitalizeFirstLetter(extractUsername(currentUser?.email || ''));
  const SelectedAvatar = avatarComponents[selectedAvatarId];

  const AvatarSelector = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Choose Your Avatar</h2>
          <button 
            onClick={() => setShowAvatarSelector(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {avatarsList.map((avatar) => {
            const AvatarComponent = avatar.component;
            return (
              <div 
                key={avatar.id}
                className={`relative cursor-pointer rounded-lg p-2 hover:bg-gray-100 transition
                  ${selectedAvatarId === avatar.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleAvatarSelect(avatar.id)}
              >
                <AvatarComponent />
                <p className="text-center text-sm mt-1">{avatar.name}</p>
                {avatar.style === 'animated' && (
                  <span className="absolute top-1 right-1 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    Animated
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-blue-500 rounded-lg shadow-lg p-6 text-white mb-6">
          <div className="flex items-center space-x-4">
            <div 
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden cursor-pointer group relative"
              onClick={() => setShowAvatarSelector(true)}
            >
              <SelectedAvatar />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-all text-sm">
                  Change
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{username}</h1>
              <p className="text-blue-100">
                Member since {formatDate(currentUser?.metadata?.creationTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500">
                {userProgress.modulesCompleted}
              </div>
              <div className="text-gray-600">Modules Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500">
                {userProgress.quizzesTaken}
              </div>
              <div className="text-gray-600">Quizzes Taken</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500">
                {userProgress.averageScore}%
              </div>
              <div className="text-gray-600">Average Score</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Badges Earned</h2>
          {userProgress.badges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userProgress.badges.map((badge, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl">{badge.emoji}</span>
                  </div>
                  <div className="font-medium text-gray-900">{badge.name}</div>
                  <div className="text-sm text-gray-500">{badge.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No badges earned yet. Start learning to earn badges!</p>
          )}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          {userProgress.recentActivities.length > 0 ? (
            <div className="space-y-4">
              {userProgress.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center border-b pb-4 last:border-b-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    {activity.type === 'quiz_completed' && '📝'}
                    {activity.type === 'module_completed' && '📚'}
                    {activity.type === 'badge_earned' && '🏆'}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {activity.type === 'quiz_completed' && `Completed Quiz: ${activity.title}`}
                      {activity.type === 'module_completed' && `Completed ${activity.title}`}
                      {activity.type === 'badge_earned' && `Earned Badge: ${activity.title}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activities. Start learning to see your progress!</p>
          )}
        </div>

        {/* Reset Progress */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Reset Progress</h2>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Reset All Progress
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-700">Are you sure you want to reset all your progress? This action cannot be undone.</p>
              <div className="flex space-x-4">
                <button
                  onClick={handleReset}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {showAvatarSelector && <AvatarSelector />}
      </div>
    </div>
  );
}

export default Profile; 