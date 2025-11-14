import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function PhotosynthesisSlide1() {
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
      id: 'photosynthesis-intro-quiz',
      conceptId: 'photosynthesis-fundamentals',
      conceptName: 'Photosynthesis Intro Quiz',
      type: 'judging',
      description: 'Testing understanding of photosynthesis inputs and location'
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
      id: 'photosynthesis-inputs-question',
      question: 'What are the main *reactants* (inputs) for photosynthesis?',
      options: [
        'Glucose and Oxygen',
        'Carbon Dioxide, Water, and Light Energy',
        'ATP and NADPH',
        'Oxygen and Water'
      ],
      correctAnswer: 'Carbon Dioxide, Water, and Light Energy',
      explanation: 'Correct! Photosynthesis uses light energy to convert carbon dioxide and water into glucose and oxygen.'
    },
    {
      id: 'photosynthesis-location-question',
      question: 'What is the name of the green organelle where photosynthesis occurs in a plant cell?',
      options: [
        'Mitochondrion',
        'Nucleus',
        'Chloroplast',
        'Ribosome'
      ],
      correctAnswer: 'Chloroplast',
      explanation: 'Correct! The chloroplast contains the chlorophyll pigment and is the specific site of photosynthesis.'
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
      interactionId: `photosynthesis-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'photosynthesis-fundamentals',
      conceptName: 'Photosynthesis Intro Quiz',
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
      {/* Updated to 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-8">
        
        {/* Left Column: Article Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Photosynthesis: An Introduction
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              This is the fundamental process that powers most life on Earth by converting light energy into chemical energy.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">What is Photosynthesis?</h2>
            <p className="text-lg leading-relaxed">
              Photosynthesis is the process used by **autotrophs** (organisms that make their own food, like plants and algae) to convert light energy into chemical energy, stored in the bonds of glucose (a sugar).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              This "food" (glucose) is the foundation of almost every food chain on the planet. Organisms that cannot make their own food (like humans) are called **heterotrophs** and must eat autotrophs or other heterotrophs to get energy.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Where Does It Happen?</h2>
            <p className="text-lg leading-relaxed">
              The entire process takes place inside a specialized organelle called the **chloroplast**, which is found in plant and algal cells.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li>Chloroplasts contain a green pigment called **chlorophyll**.</li>
              <li>It is this pigment's job to absorb the sunlight (light energy) that powers the entire reaction.</li>
              <li>This is why plants are green—chlorophyll reflects green light and absorbs red and blue light.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Key Details, Image, & Quiz */}
        <div className="space-y-8">
          {/* Image Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Photosynthesis Inputs & Outputs</h3>
            <div className="flex justify-center">
              <img 
                src="https://www.science-sparks.com/wp-content/uploads/2020/04/Photosynthesis-Diagram-1024x759.jpg"
                alt="Diagram of photosynthesis showing inputs and outputs"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* Key Details Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Core Concepts</h2>
            
            <div className="space-y-4">
              {/* The Equation */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">The Overall Equation</h3>
                <div className="text-center p-2 mt-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <p className="text-sm md:text-base font-mono text-slate-800 dark:text-slate-100">
                    6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂
                  </p>
                  <p className="text-sm font-mono text-slate-600 dark:text-slate-300">
                    (Carbon Dioxide + Water + Light → Glucose + Oxygen)
                  </p>
                </div>
              </div>

              {/* The Two Stages - BOLDING REMOVED */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">The Two Stages</h3>
                <ul className="mt-2 space-y-1 text-base list-disc list-inside">
                  <li>Light-Dependent Reactions: Uses light and H₂O to charge energy carriers (ATP & NADPH).</li>
                  <li>Calvin Cycle (Light-Independent): Uses that energy and CO₂ to build sugar (glucose).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* NEW QUIZ SECTION */}
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
                  {score === questions.length ? 'Excellent! You\'re a photosynthesis pro!' : 'Great job! 👏'}
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
      slideId="photosynthesis-intro-article" // Renamed ID to be more accurate
      slideTitle="Photosynthesis"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="photosynthesis"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}