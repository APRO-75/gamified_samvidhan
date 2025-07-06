import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

function Home() {
  const { currentUser } = useAuth();
  const { userProgress } = useProgress();

  // Render different content based on authentication status
  if (currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Welcome back, {currentUser?.email || 'User'}!
                </h1>
                <p className="text-indigo-100 mt-1">
                  Continue your journey through the Indian Constitution
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-sm text-gray-600">Your Progress</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {Math.round((userProgress.modulesCompleted / 10) * 100)}%
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Link to="/learn" className="transform transition hover:scale-105">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Continue Learning</h3>
                <p className="text-gray-600">
                  {userProgress.modulesCompleted === 0
                    ? "Start your learning journey"
                    : `Resume from Module ${userProgress.modulesCompleted + 1}`}
                </p>
              </div>
            </Link>

            <Link to="/quiz" className="transform transition hover:scale-105">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
                <div className="text-2xl mb-2">❓</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Quiz</h3>
                <p className="text-gray-600">Test your knowledge with today's challenge</p>
              </div>
            </Link>

            <Link to="/trivia" className="transform transition hover:scale-105">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
                <div className="text-2xl mb-2">🎮</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Play Trivia</h3>
                <p className="text-gray-600">Compete with others in real-time</p>
              </div>
            </Link>
          </div>

          {/* Statistics and Progress Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{userProgress.badges?.length || 0}</p>
                  <p className="text-sm text-gray-600">Badges Earned</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{userProgress.totalPoints}</p>
                  <p className="text-sm text-gray-600">Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{userProgress.quizzesTaken}</p>
                  <p className="text-sm text-gray-600">Quizzes Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{userProgress.modulesCompleted}</p>
                  <p className="text-sm text-gray-600">Chapters Completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {userProgress.recentActivities.length > 0 ? (
                  userProgress.recentActivities.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-center">
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
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No recent activity</p>
                    <p className="text-sm text-gray-400 mt-1">Start learning to see your activities here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Path</h3>
            <div className="space-y-2">
              {[
                { name: 'Preamble to the Constitution', duration: '15 mins', number: 1 },
                { name: 'Basic Structure of Constitution', duration: '20 mins', number: 2 },
                { name: 'Fundamental Rights', duration: '15 mins', number: 3 },
                { name: 'Fundamental Duties', duration: '15 mins', number: 4 },
                { name: 'Directive Principles of State Policy', duration: '35 mins', number: 5 },
                { name: 'Governance Structure', duration: '20 mins', number: 6 },
                { name: 'Constitutional Amendments', duration: '1 hour 35 mins', number: 7 }
              ].map((module, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition ${
                    index < userProgress.modulesCompleted
                      ? 'bg-green-50 border-green-500'
                      : index === userProgress.modulesCompleted
                      ? 'bg-indigo-50 border-indigo-500'
                      : 'hover:bg-gray-50 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < userProgress.modulesCompleted
                          ? 'bg-green-500 text-white'
                          : index === userProgress.modulesCompleted
                          ? 'bg-indigo-500 text-white'
                          : 'bg-gray-300 text-white'
                      }`}>
                        <span>{module.number}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{module.name}</h4>
                        <p className="text-sm text-gray-500">Duration: {module.duration}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      index < userProgress.modulesCompleted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {index < userProgress.modulesCompleted ? '100%' : '0%'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Landing page for non-authenticated users
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-5xl font-bold mb-6">Learn the Indian Constitution</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover the fundamental principles of the Indian Constitution through interactive lessons, quizzes, and games.
        </p>
        <Link
          to="/register"
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Interactive Learning</h3>
            <p className="text-gray-600">
              Engage with comprehensive lessons about the Indian Constitution, complete with multimedia content.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Daily Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge with daily quizzes and track your progress over time.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Gamified Experience</h3>
            <p className="text-gray-600">
              Earn badges, compete with friends, and make learning fun through our gamified platform.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of learners who are discovering the Indian Constitution in a fun and engaging way.
        </p>
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
}

export default Home; 