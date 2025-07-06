import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

const chapters = [
  {
    id: 1,
    title: 'Preamble to the Constitution',
    content: 'The Preamble presents the principles of the Constitution and the vision of its makers. It serves as a key to understanding the Constitution and reflects the spirit and ideals of the Constitution.',
    videoUrl: 'https://youtu.be/8ePMJe_4XFg?si=fbCe8xC2tBBFzW3I',
    videoId: '8ePMJe_4XFg',
    duration: '15 mins',
    progress: 0
  },
  {
    id: 2,
    title: 'Basic Structure of Constitution',
    content: 'The basic structure doctrine protects the fundamental aspects of our Constitution. It includes principles like democracy, federalism, secularism, and separation of powers.',
    videoUrl: 'https://youtu.be/yVp5QZQzYH0?si=QaEVW83g8CYzG-vy',
    videoId: 'yVp5QZQzYH0',
    duration: '20 mins',
    progress: 0
  },
  {
    id: 3,
    title: 'Fundamental Rights',
    content: 'Fundamental Rights are the basic human rights enshrined in the Constitution. These include Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.',
    videoUrl: 'https://youtu.be/pvbcJ7SkG8w?si=vEkHmvDzhD-bPkQ_',
    videoId: 'pvbcJ7SkG8w',
    duration: '15 mins',
    progress: 0
  },
  {
    id: 4,
    title: 'Fundamental Duties',
    content: 'Fundamental Duties are the moral obligations of all citizens. They include respecting the Constitution, promoting harmony, protecting the environment, and striving for excellence.',
    videoUrl: 'https://youtu.be/JSX78UoYPwM?si=LytMU1G0O7aEwS92',
    videoId: 'JSX78UoYPwM',
    duration: '15 mins',
    progress: 0
  },
  {
    id: 5,
    title: 'Directive Principles of State Policy',
    content: 'The Directive Principles of State Policy are guidelines for the government to ensure social and economic democracy. They aim to establish a welfare state and promote social justice through various socio-economic policies and principles.',
    videoUrl: 'https://www.youtube.com/live/hqrxMqU8H9s?si=zo-5X2nADz0JHSMA',
    videoId: 'hqrxMqU8H9s',
    duration: '35 mins',
    progress: 0
  },
  {
    id: 6,
    title: 'Governance Structure',
    content: 'The governance structure defines the distribution of powers between the Union and States, and establishes the framework for the Executive, Legislature, and Judiciary.',
    videoUrl: 'https://youtu.be/pdPEG-n1ns0?si=l3uEYOkjvHwNn8Rh',
    videoId: 'pdPEG-n1ns0',
    duration: '20 mins',
    progress: 0
  },
  {
    id: 7,
    title: 'Constitutional Amendments',
    content: 'The process of amending the Constitution and major amendments that have shaped our democracy. This includes the procedure, types of amendments, and significant changes made over time.',
    videoUrl: 'https://www.youtube.com/live/8QBlmcaRWC0?si=-81pG-1XV-xCJtLa',
    videoId: '8QBlmcaRWC0',
    duration: '1 hour 35 mins',
    progress: 0
  }
];

function LearningModule() {
  const { currentUser } = useAuth();
  const { userProgress, updateModulesCompleted, addPoints, addActivity, updateTimeSpent } = useProgress();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isLearning, setIsLearning] = useState(false);
  const [sessionTimeSpent, setSessionTimeSpent] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(chapters.map(chapter => ({
    ...chapter,
    progress: 0
  })));

  useEffect(() => {
    let timer;
    if (isLearning) {
      timer = setInterval(() => {
        setSessionTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
        // When clearing interval, update total time spent
        if (sessionTimeSpent > 0) {
          updateTimeSpent(sessionTimeSpent);
          addActivity({
            type: 'learning_time',
            timeSpent: sessionTimeSpent,
            timestamp: new Date()
          });
        }
      }
    };
  }, [isLearning]);

  useEffect(() => {
    // Load saved progress from ProgressContext when component mounts
    const savedProgress = userProgress?.completedModules || [];
    setChapterProgress(prev => prev.map(chapter => ({
      ...chapter,
      progress: savedProgress.includes(chapter.id) ? 100 : 0
    })));
  }, [userProgress?.completedModules]);

  const handleChapterClick = (chapter) => {
    // If switching chapters while learning, save the time spent
    if (isLearning && sessionTimeSpent > 0) {
      updateTimeSpent(sessionTimeSpent);
      addActivity({
        type: 'learning_time',
        timeSpent: sessionTimeSpent,
        timestamp: new Date()
      });
    }
    setSelectedChapter(chapter);
    setIsLearning(false);
    setSessionTimeSpent(0);
  };

  const handleVideoClick = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  const startLearning = () => {
    if (!selectedChapter) return;
    setIsLearning(true);
    // Open the video automatically when starting
    window.open(selectedChapter.videoUrl, '_blank');
    addActivity({
      type: 'module_started',
      title: selectedChapter.title,
      timestamp: new Date()
    });
  };

  const completeChapter = () => {
    if (!selectedChapter) return;
    
    // Save the time spent before completing
    if (sessionTimeSpent > 0) {
      updateTimeSpent(sessionTimeSpent);
      addActivity({
        type: 'learning_time',
        timeSpent: sessionTimeSpent,
        timestamp: new Date()
      });
    }
    
    // Update chapter progress locally
    const updatedProgress = chapterProgress.map(chapter => 
      chapter.id === selectedChapter.id 
        ? { ...chapter, progress: 100 } 
        : chapter
    );
    setChapterProgress(updatedProgress);

    // Update modules completed in ProgressContext
    const completedCount = updatedProgress.filter(chapter => chapter.progress === 100).length;
    updateModulesCompleted(completedCount);
    
    // Add points for completion
    addPoints(100);

    // Add completion activity
    addActivity({
      type: 'module_completed',
      title: selectedChapter.title,
      timestamp: new Date()
    });

    // Reset learning state
    setIsLearning(false);
    setSessionTimeSpent(0);

    // Move to next chapter if available
    const nextChapter = chapters.find(chapter => chapter.id === selectedChapter.id + 1);
    if (nextChapter) {
      setSelectedChapter(nextChapter);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Module</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Overall Progress: {Math.round((chapterProgress.filter(c => c.progress === 100).length / chapters.length) * 100)}%
            </p>
            <div className="flex space-x-4">
              <p className="text-gray-600">Session Time: {formatTime(sessionTimeSpent)}</p>
              <p className="text-gray-600">Total Time: {formatTime(userProgress.totalTimeSpent || 0)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapter List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Learning Path</h2>
              <div className="space-y-2">
                {chapterProgress.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterClick(chapter)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedChapter?.id === chapter.id
                        ? 'bg-indigo-50 border-2 border-indigo-500'
                        : chapter.progress === 100
                        ? 'bg-green-50 border-2 border-green-500'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {chapter.progress === 100 && (
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className={`font-medium ${chapter.progress === 100 ? 'text-green-700' : ''}`}>
                          {chapter.title}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        chapter.progress === 100
                          ? 'bg-green-100 text-green-800'
                          : chapter.progress > 0
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {chapter.progress}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Duration: {chapter.duration}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chapter Content */}
          <div className="lg:col-span-2">
            {selectedChapter ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedChapter.title}</h2>
                <div 
                  className="relative aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => handleVideoClick(selectedChapter.videoUrl)}
                >
                  {/* YouTube Thumbnail */}
                  <img 
                    src={`https://img.youtube.com/vi/${selectedChapter.videoId}/maxresdefault.jpg`}
                    alt={`${selectedChapter.title} thumbnail`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none mb-6">
                  <p>{selectedChapter.content}</p>
                </div>
                <div className="flex space-x-4">
                  {!isLearning ? (
                    <button 
                      onClick={startLearning}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Start Learning
                    </button>
                  ) : (
                    <button 
                      onClick={completeChapter}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Complete Chapter
                    </button>
                  )}
                  {chapterProgress.find(c => c.id === selectedChapter.id)?.progress === 100 && (
                    <button 
                      onClick={() => window.location.href = '/quiz'}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Take Quiz
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
                <p className="text-gray-500">Select a chapter to start learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningModule; 