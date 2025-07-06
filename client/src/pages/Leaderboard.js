import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { extractUsername, capitalizeFirstLetter } from '../utils/userUtils';

function Leaderboard() {
  const { currentUser } = useAuth();
  const { userProgress, formatTime } = useProgress();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Create a query for top 10 users
        const leaderboardRef = collection(db, 'leaderboard');
        const leaderboardQuery = query(
          leaderboardRef,
          orderBy('totalPoints', 'desc'),
          limit(10)
        );

        // Set up real-time listener
        const unsubscribe = onSnapshot(leaderboardQuery, async (snapshot) => {
          const data = [];
          let currentUserFound = false;

          snapshot.forEach((doc) => {
            const userData = doc.data();
            if (doc.id === currentUser?.uid) {
              currentUserFound = true;
            }
            data.push({
              id: doc.id,
              ...userData,
              isCurrentUser: doc.id === currentUser?.uid
            });
          });

          // If current user exists but not in top 10, fetch their data
          if (currentUser && !currentUserFound) {
            try {
              const userDocRef = doc(db, 'leaderboard', currentUser.uid);
              const userDocSnap = await getDoc(userDocRef);
              
              if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                data.push({
                  id: currentUser.uid,
                  ...userData,
                  isCurrentUser: true
                });
              }
            } catch (error) {
              console.error('Error fetching current user data:', error);
            }
          }

          // Sort data by total points after adding current user
          data.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
          setLeaderboardData(data);
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error setting up leaderboard listener:', error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentUser]);

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `${index + 1}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          <p className="text-lg text-gray-600">Compare your progress with other learners</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modules</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quizzes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Spent</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((user, index) => (
                  <tr 
                    key={user.id}
                    className={`${
                      user.isCurrentUser ? 'bg-indigo-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-lg">
                      {getRankBadge(index)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${user.isCurrentUser ? 'text-indigo-600' : 'text-gray-900'}`}>
                            {user.name || capitalizeFirstLetter(extractUsername(user.email))}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(user.totalPoints || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.modulesCompleted || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.quizzesTaken || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{user.averageScore || 0}%</span>
                        <div className="ml-2 w-16 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${user.averageScore || 0}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTime(user.totalTimeSpent || 0)}
                    </td>
                  </tr>
                ))}
                {leaderboardData.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No data available yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard; 