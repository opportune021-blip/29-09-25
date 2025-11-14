import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiomoleculesSlide2() {
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
      id: 'carbohydrates-quiz',
      conceptId: 'carbohydrates-fundamentals',
      conceptName: 'Carbohydrates Quiz',
      type: 'judging',
      description: 'Testing understanding of carbohydrate monomers and function'
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
      id: 'carbohydrate-monomer-question',
      question: 'What is the monomer (the single building block) of a complex carbohydrate?',
      options: [
        'Amino Acid',
        'Nucleotide',
        'Fatty Acid',
        'Monosaccharide'
      ],
      correctAnswer: 'Monosaccharide',
      explanation: 'Correct! Monosaccharides (like glucose) are the simple sugars that join together to form large carbohydrates (polysaccharides).'
    },
    {
      id: 'carbohydrate-function-question',
      question: 'What is the primary function of carbohydrates in living organisms?',
      options: [
        'Storing genetic information',
        'Providing long-term energy storage',
        'Providing a quick source of usable energy',
        'Building cellular structures (like muscles)'
      ],
      correctAnswer: 'Providing a quick source of usable energy',
      explanation: 'Correct! While some carbs are structural (cellulose) or storage (starch), their main role is as the body\'s primary fuel source for quick energy.'
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
      interactionId: `carbohydrates-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'carbohydrates-fundamentals',
      conceptName: 'Carbohydrates Quiz',
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
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What are Carbohydrates? 🍞</h2>
            <p className="text-lg leading-relaxed">
              Carbohydrates are one of the four main types of biomolecules. Their name, "carbo-hydrate," literally means "carbon-water" as they are composed of **Carbon, Hydrogen, and Oxygen** (often in a 1:2:1 ratio).
            </p>
            <ul className="mt-4 space-y-2 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">✓</span>
                <span><strong>Monomer:</strong> The building block is a **Monosaccharide** (e.g., Glucose, Fructose).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">✓</span>
                <span><strong>Polymer:</strong> Monomers join to form a **Polysaccharide** (e.g., Starch, Glycogen, Cellulose).</span>
              </li>
               <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">✓</span>
                <span><strong>Main Function:</strong> To provide **short-term, quick-access energy** for cellular work.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Examples of Carbohydrates</h3>
            <p className="text-lg leading-relaxed">
              Carbs range from simple sugars to complex chains.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700 space-y-3">
              <p className="text-lg">
                 <span><strong>Monosaccharides (Simple):</strong> Glucose (cell fuel), Fructose (fruit sugar).</span>
              </p>
              <p className="text-lg">
                <span><strong>Polysaccharides (Complex):</strong></span>
                <ul className="list-disc list-inside ml-4">
                  <li><strong>Starch:</strong> Energy storage in plants (e.g., potatoes, pasta).</li>
                  <li><strong>Glycogen:</strong> Energy storage in animals (stored in liver and muscles).</li>
                  <li><strong>Cellulose:</strong> Structural component in plant cell walls (fiber).</li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">From Simple to Complex</h3>
            <div className="flex justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Polysaccharide_structure_of_starch%2C_glycogen%2C_cellulose.jpg"
                alt="Diagram showing monosaccharides forming polysaccharides like starch, glycogen, and cellulose"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Simple sugar monomers (like glucose) link up to form complex polysaccharide polymers.
            </p>
          </div>

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
                  {score === questions.length ? 'Sweet! You\'re a carb expert!' : 'Great job! 👏'}
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
      slideId="introduction-to-carbohydrates"
      slideTitle="Introduction to carbohydrates"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biomolecules-reactions"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}