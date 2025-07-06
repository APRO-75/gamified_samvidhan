import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { constitutionalQuizzes, getRandomQuestions, calculateScore, calculatePoints } from '../data/quizData';

function Quiz() {
  const { currentUser } = useAuth();
  const { addPoints, updateQuizStats } = useProgress();
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStats, setQuizStats] = useState({
    totalQuizzesTaken: 0,
    averageScore: 0,
    highestScore: 0,
    totalPoints: 0
  });
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);

  useEffect(() => {
    if (activeQuiz && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && activeQuiz) {
      finishQuiz();
    }
  }, [activeQuiz, timeLeft]);

  const startQuiz = (quizType) => {
    const quizQuestions = getRandomQuestions(quizType === 'daily' ? 'dailyQuiz' : 'fundamentalRightsQuiz');
    setQuestions(quizQuestions);
    setActiveQuiz({
      type: quizType,
      timeLimit: quizType === 'daily' ? 600 : 900, // 10 or 15 minutes
      points: quizType === 'daily' ? 100 : 150
    });
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(quizType === 'daily' ? 600 : 900);
    setShowExplanation(false);
    setLastAnswerCorrect(null);
  };

  const handleAnswer = (answerIndex) => {
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    setLastAnswerCorrect(isCorrect);
    setShowExplanation(true);
    setAnswers([...answers, answerIndex]);

    // Show explanation for 2 seconds before moving to next question
    setTimeout(() => {
      setShowExplanation(false);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setLastAnswerCorrect(null);
      } else {
        finishQuiz();
      }
    }, 2000);
  };

  const finishQuiz = () => {
    const score = calculateScore(answers, questions);
    const earnedPoints = calculatePoints(score, timeLeft, activeQuiz.timeLimit);
    
    // Update quiz stats
    setQuizStats(prevStats => {
      const newTotalQuizzes = prevStats.totalQuizzesTaken + 1;
      const newAverageScore = Math.round(
        ((prevStats.averageScore * prevStats.totalQuizzesTaken) + score) / newTotalQuizzes
      );
      return {
        totalQuizzesTaken: newTotalQuizzes,
        averageScore: newAverageScore,
        highestScore: Math.max(prevStats.highestScore, score),
        totalPoints: prevStats.totalPoints + earnedPoints
      };
    });

    // Update progress context
    addPoints(earnedPoints);
    updateQuizStats(score, earnedPoints);
    
    setActiveQuiz(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Challenge</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{quizStats.totalQuizzesTaken}</p>
              <p className="text-sm text-gray-600">Quizzes Taken</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{quizStats.averageScore}%</p>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{quizStats.highestScore}%</p>
              <p className="text-sm text-gray-600">Highest Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{Math.round(quizStats.totalPoints)}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
          </div>
        </div>

        {activeQuiz ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Timer and Progress */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-semibold">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="text-lg font-semibold">
                Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">
                {questions[currentQuestion].question}
              </h3>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-3 rounded-lg border-2 transition ${
                      showExplanation
                        ? index === questions[currentQuestion].correctAnswer
                          ? 'bg-green-50 border-green-500'
                          : index === answers[currentQuestion]
                          ? 'bg-red-50 border-red-500'
                          : 'border-gray-200'
                        : 'border-gray-200 hover:border-indigo-500 hover:bg-indigo-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {/* Explanation */}
              {showExplanation && (
                <div className={`mt-4 p-4 rounded-lg ${
                  lastAnswerCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  <p className="font-medium">
                    {lastAnswerCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="mt-1">{questions[currentQuestion].explanation}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Daily Constitutional Quiz</h3>
              <p className="text-gray-600 mb-4">
                Time: 10 minutes • Points: 100
              </p>
              <button
                onClick={() => startQuiz('daily')}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Start Quiz
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Fundamental Rights Challenge</h3>
              <p className="text-gray-600 mb-4">
                Time: 15 minutes • Points: 150
              </p>
              <button
                onClick={() => startQuiz('fundamentalRights')}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Start Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz; 