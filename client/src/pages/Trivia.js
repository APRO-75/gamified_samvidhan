import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

function Trivia() {
  const { currentUser } = useAuth();
  const { addPoints } = useProgress();
  const [triviaStats, setTriviaStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    winRate: 0,
    totalPoints: 0
  });

  const [activeGame, setActiveGame] = useState(null);
  const [gameSession, setGameSession] = useState({
    players: [],
    currentQuestion: null,
    timeRemaining: 0,
    isStarted: false
  });

  const [availableGames, setAvailableGames] = useState([
    {
      id: 1,
      title: 'Constitution Speed Round',
      players: '3/4',
      maxPlayers: 4,
      currentPlayers: ['Player2', 'Player3', 'Player4'],
      difficulty: 'Easy',
      status: 'open',
      questions: [
        { question: 'What is the first article of the Indian Constitution about?', options: ['Fundamental Rights', 'The Union and its Territory', 'Citizenship', 'The States'], correct: 1 },
        { question: 'How many fundamental rights are there in Indian Constitution?', options: ['5', '6', '7', '8'], correct: 1 }
      ]
    },
    {
      id: 2,
      title: 'Advanced Constitutional Quiz',
      players: '2/3',
      maxPlayers: 3,
      currentPlayers: ['Player5', 'Player6'],
      difficulty: 'Hard',
      status: 'in-progress',
      questions: [
        { question: 'Which article deals with the Right to Equality?', options: ['Article 14', 'Article 15', 'Article 16', 'Article 17'], correct: 0 },
        { question: 'When was the Indian Constitution adopted?', options: ['26 January 1950', '26 November 1949', '15 August 1947', '26 January 1949'], correct: 1 }
      ]
    }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'Player1', points: 0, wins: 0 },
    { id: 2, name: 'Player2', points: 0, wins: 0 },
    { id: 3, name: 'Player3', points: 0, wins: 0 }
  ]);

  const createGame = () => {
    const newGame = {
      id: availableGames.length + 1,
      title: 'New Constitutional Quiz',
      players: '1/4',
      maxPlayers: 4,
      currentPlayers: [],
      difficulty: 'Medium',
      status: 'open',
      questions: [
        { question: 'What is the basic structure doctrine?', options: ['A legal principle', 'A constitutional amendment', 'A fundamental right', 'A directive principle'], correct: 0 },
        { question: 'Who was the chairman of the drafting committee?', options: ['Dr. Rajendra Prasad', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Sardar Patel'], correct: 1 }
      ]
    };
    setAvailableGames([...availableGames, newGame]);
  };

  const joinGame = (gameId) => {
    if (!currentUser) {
      alert('Please login to join a game');
      return;
    }

    const gameToJoin = availableGames.find(game => game.id === gameId);
    if (!gameToJoin) return;

    if (gameToJoin.currentPlayers.length >= gameToJoin.maxPlayers) {
      alert('Game is full!');
      return;
    }

    if (gameToJoin.currentPlayers.includes(currentUser.email)) {
      alert('You are already in this game!');
      return;
    }

    const updatedGames = availableGames.map(game => {
      if (game.id === gameId) {
        const updatedPlayers = [...game.currentPlayers, currentUser.email];
        const newPlayerCount = `${updatedPlayers.length}/${game.maxPlayers}`;
        const newStatus = updatedPlayers.length === game.maxPlayers ? 'in-progress' : 'open';
        
        return {
          ...game,
          players: newPlayerCount,
          currentPlayers: updatedPlayers,
          status: newStatus
        };
      }
      return game;
    });

    setAvailableGames(updatedGames);
    setActiveGame(gameId);
    
    // Initialize game session
    if (gameToJoin) {
      setGameSession({
        players: [...gameToJoin.currentPlayers, currentUser.email],
        currentQuestion: 0,
        timeRemaining: 30,
        isStarted: updatedGames.find(g => g.id === gameId).status === 'in-progress'
      });
    }

    // Update stats
    setTriviaStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1
    }));
  };

  useEffect(() => {
    if (activeGame && gameSession.isStarted) {
      // Start the game countdown
      const timer = setInterval(() => {
        setGameSession(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1)
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activeGame, gameSession.isStarted]);

  const getGameStatus = (game) => {
    if (activeGame === game.id) {
      return (
        <div className="text-sm text-indigo-600">
          {gameSession.isStarted ? (
            <p>Time remaining: {gameSession.timeRemaining}s</p>
          ) : (
            <p>Waiting for players...</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Multiplayer Trivia</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{triviaStats.gamesPlayed}</p>
              <p className="text-sm text-gray-600">Games Played</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{triviaStats.gamesWon}</p>
              <p className="text-sm text-gray-600">Games Won</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{triviaStats.winRate}%</p>
              <p className="text-sm text-gray-600">Win Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{triviaStats.totalPoints}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Games */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Available Games</h2>
                <button
                  onClick={createGame}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Create Game
                </button>
              </div>
              <div className="space-y-4">
                {availableGames.map((game) => (
                  <div
                    key={game.id}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{game.title}</h3>
                        <p className="text-sm text-gray-500">
                          Players: {game.players} • Difficulty: {game.difficulty}
                        </p>
                      </div>
                      <button
                        onClick={() => joinGame(game.id)}
                        className={`px-4 py-2 rounded-lg transition ${
                          game.status === 'open'
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                        disabled={game.status !== 'open'}
                      >
                        {game.status === 'open' ? 'Join Game' : 'In Progress'}
                      </button>
                    </div>
                    {getGameStatus(game)}
                    {activeGame === game.id && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Current Players:</p>
                        <ul className="list-disc list-inside">
                          {game.currentPlayers.map((player, idx) => (
                            <li key={idx}>{player}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Leaderboard</h2>
              <div className="space-y-4">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        index === 0 ? 'bg-yellow-400' :
                        index === 1 ? 'bg-gray-300' :
                        index === 2 ? 'bg-amber-600' : 'bg-gray-200'
                      } text-white font-medium`}>
                        {index + 1}
                      </span>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-600">{player.points}</p>
                      <p className="text-sm text-gray-500">{player.wins} wins</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trivia; 