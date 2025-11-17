import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function PhotosynthesisSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'photosynthesis-article-quiz',
      conceptId: 'photosynthesis-overview',
      conceptName: 'Photosynthesis Overview Quiz',
      type: 'judging',
      description: 'Testing understanding of photosynthesis overview'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'autotroph-question',
      question: 'Organisms that make their own food using light energy are called:',
      options: [
        'Heterotrophs',
        'Photoautotrophs',
        'Decomposers',
        'Consumers'
      ],
      correctAnswer: 'Photoautotrophs',
      explanation: 'Correct! Photoautotrophs (like plants) use light (photo) to make their own (auto) food (troph).'
    },
    {
      id: 'products-question',
      question: 'What are the main *products* of the overall photosynthesis equation?',
      options: [
        'Carbon Dioxide and Water',
        'Glucose and Oxygen',
        'ATP and NADPH',
        'Light and Chlorophyll'
      ],
      correctAnswer: 'Glucose and Oxygen',
      explanation: 'Correct! The process produces glucose (C₆H₁₂O₆) to store energy and releases oxygen (O₂) as a byproduct.'
    }
  ];
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;

    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    handleInteractionComplete({
      interactionId: `photosynthesis-article-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'photosynthesis-overview',
      conceptName: 'Photosynthesis Overview Quiz',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: {
        type: 'mcq',
        question: current.question,
        options: current.options
      }
    });
  };

  const handleNextQuestion = () => {
    const newAnswered = [...questionsAnswered];
    newAnswered[currentQuestionIndex] = true;
    setQuestionsAnswered(newAnswered);

    setSelectedAnswer('');
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };


  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto p-8">
        
        {/* Left Column: Article Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Photosynthesis: Energy & Life
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Photosynthesis converts light energy into the chemical energy that fuels nearly all life on Earth.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">Autotrophs vs. Heterotrophs</h2>
            <p className="text-lg leading-relaxed">
              Organisms get energy in two main ways:
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Heterotrophs:</strong> Get food by consuming other organisms (e.g., animals, fungi).</li>
              <li><strong>Autotrophs:</strong> Make their own food. Plants, algae, and some bacteria are **photoautotrophs**, which produce food using photosynthesis.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">The Overall Equation</h2>
            <p className="text-lg leading-relaxed">
              We can describe the entire process with one chemical equation. This is an endothermic process, meaning it stores energy in the bonds of the products.
            </p>
            <div className="text-center p-4 my-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <p className="text-xl md:text-2xl font-mono text-slate-800 dark:text-slate-100">
                6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂
              </p>
              <p className="text-lg md:text-xl font-mono mt-2 text-slate-600 dark:text-slate-300">
                (Carbon Dioxide + Water + Light → Glucose + Oxygen)
              </p>
            </div>
            <p className="text-lg leading-relaxed">
              The plant takes in carbon dioxide from the air and water from the soil, and uses light energy to create glucose (its food) and oxygen (as a waste product).
            </p>
          </div>
        </div>

        {/* Right Column: Images & Quiz */}
        <div className="space-y-8">
          {/* NEW: Photosynthesis Location - Mesophyll Cells */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              In plants, photosynthesis takes place in chloroplasts
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              In most plants, photosynthesis occurs in the leaves, specifically in cells of the middle layer of leaf tissue called mesophyll cells. Each mesophyll cell contains chloroplasts, which are specialized organelles that carry out photosynthesis.
            </p>
            <div className="flex justify-center mt-4">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/7b8ba9eeeec3426a1958c52c809a1b3e661a9acd.png"
                alt="Cross-section of a leaf showing mesophyll cells and chloroplasts"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* NEW: Inside the Chloroplast - Thylakoids, Stroma, Chlorophyll */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Inside the Chloroplast
            </h3>
            <p className="text-lg leading-relaxed mb-4">
              Within each chloroplast are disc-like structures called thylakoids, which are organized into stacks known as grana (singular: granum). The membrane of each thylakoid contains green-colored pigment molecules called chlorophylls that absorb light. The fluid-filled space around the grana is called the stroma. Different chemical reactions happen in the different parts of the chloroplast.
            </p>
            <div className="flex justify-center mt-4">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/6528c4ef0f2fe4d1259edf60ed14202f394f5c8d.png"
                alt="Diagram of a chloroplast showing thylakoids, grana, and stroma"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* QUIZ SECTION */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            <div className="flex space-x-2 mb-6">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500'
                      : questionsAnswered[index]
                      ? 'bg-green-500'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    const disabled = showFeedback;
                    const selected = selectedAnswer === option;
                    const correct = option === questions[currentQuestionIndex].correctAnswer;
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-300'
                    } ${disabled ? 'cursor-default' : 'cursor-pointer'}`;

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleQuizAnswer(option)}
                        disabled={disabled}
                        className={className}
                        whileHover={!disabled ? { scale: 1.02 } : {}}
                        whileTap={!disabled ? { scale: 0.98 } : {}}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mt-4 p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                          : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                      }`}
                    >
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                        {questions[currentQuestionIndex].explanation}
                      </div>
                      <motion.button
                        onClick={handleNextQuestion}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'Excellent! You\'ve got the basics down.' : 'Keep reviewing the structures! 👏'}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="photosynthesis-intro-article"
      slideTitle="An introduction to photosynthesis"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="photosynthesis"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}