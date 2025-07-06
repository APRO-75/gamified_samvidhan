// Quiz questions data structure
export const constitutionalQuizzes = {
  dailyQuiz: {
    questions: [
      {
        id: 1,
        question: "Which article of the Indian Constitution abolishes untouchability?",
        options: ["Article 15", "Article 16", "Article 17", "Article 18"],
        correctAnswer: 2, // Article 17
        explanation: "Article 17 of the Indian Constitution abolishes untouchability and forbids its practice in any form."
      },
      {
        id: 2,
        question: "The Preamble to the Indian Constitution was amended by which Amendment?",
        options: ["24th Amendment", "42nd Amendment", "44th Amendment", "52nd Amendment"],
        correctAnswer: 1,
        explanation: "The 42nd Amendment Act of 1976 added the words 'Socialist', 'Secular', and 'Integrity' to the Preamble."
      },
      {
        id: 3,
        question: "Which of the following is NOT a Fundamental Right?",
        options: [
          "Right to Property",
          "Right to Freedom of Religion",
          "Right to Constitutional Remedies",
          "Right to Equality"
        ],
        correctAnswer: 0,
        explanation: "Right to Property was removed as a Fundamental Right by the 44th Amendment Act, 1978."
      },
      {
        id: 4,
        question: "Who is known as the chief architect of the Indian Constitution?",
        options: [
          "Jawaharlal Nehru",
          "Dr. B.R. Ambedkar",
          "Sardar Vallabhbhai Patel",
          "Rajendra Prasad"
        ],
        correctAnswer: 1,
        explanation: "Dr. B.R. Ambedkar served as the Chairman of the Constitution Drafting Committee."
      },
      {
        id: 5,
        question: "How many fundamental duties are currently included in the Indian Constitution?",
        options: ["9", "10", "11", "12"],
        correctAnswer: 2,
        explanation: "There are 11 Fundamental Duties in the Indian Constitution under Article 51A."
      }
    ]
  },
  fundamentalRightsQuiz: {
    questions: [
      {
        id: 1,
        question: "Which Article guarantees the Right to Equality before Law?",
        options: ["Article 14", "Article 15", "Article 16", "Article 17"],
        correctAnswer: 0,
        explanation: "Article 14 guarantees equality before law and equal protection of laws."
      },
      {
        id: 2,
        question: "Under which Article is the Right against Exploitation provided?",
        options: ["Article 20", "Article 21", "Article 23", "Article 24"],
        correctAnswer: 2,
        explanation: "Article 23 prohibits trafficking in human beings and forced labor."
      },
      {
        id: 3,
        question: "Which Fundamental Right is known as the 'Heart and Soul' of the Constitution?",
        options: [
          "Right to Freedom",
          "Right to Equality",
          "Right to Constitutional Remedies",
          "Right to Religion"
        ],
        correctAnswer: 2,
        explanation: "Dr. Ambedkar called the Right to Constitutional Remedies the 'Heart and Soul' of the Constitution."
      },
      {
        id: 4,
        question: "Which Article provides for the Right to Life and Personal Liberty?",
        options: ["Article 19", "Article 20", "Article 21", "Article 22"],
        correctAnswer: 2,
        explanation: "Article 21 guarantees the Right to Life and Personal Liberty."
      },
      {
        id: 5,
        question: "Freedom of Speech and Expression is guaranteed under which Article?",
        options: ["Article 19(1)(a)", "Article 19(1)(b)", "Article 19(1)(c)", "Article 19(1)(d)"],
        correctAnswer: 0,
        explanation: "Article 19(1)(a) guarantees the Freedom of Speech and Expression."
      }
    ]
  }
};

// Helper function to get random questions
export const getRandomQuestions = (quizType, count = 5) => {
  const questions = constitutionalQuizzes[quizType].questions;
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Calculate score based on correct answers
export const calculateScore = (answers, questions) => {
  const correctAnswers = answers.filter((answer, index) => 
    answer === questions[index].correctAnswer
  ).length;
  return Math.round((correctAnswers / questions.length) * 100);
};

// Calculate points based on score and time taken
export const calculatePoints = (score, timeLeft, totalTime) => {
  const timeBonus = Math.round((timeLeft / totalTime) * 50); // Up to 50 bonus points for speed
  return score + timeBonus;
}; 