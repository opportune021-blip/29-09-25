import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function CellularRespirationSlide2() {
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
      id: 'cellular-respiration-stages-quiz',
      conceptId: 'cellular-respiration-stages',
      conceptName: 'Cellular Respiration Stages Quiz',
      type: 'judging',
      description: 'Testing understanding of the stages of cellular respiration'
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
      id: 'location-question',
      question: 'Where in the cell does the Citric Acid Cycle (Krebs Cycle) take place?',
      options: [
        'In the cytosol (cytoplasm)',
        'In the fluid space (matrix) of the mitochondria',
        'In the inner membrane (cristae) of the mitochondria',
        'In the thylakoids of the chloroplast'
      ],
      correctAnswer: 'In the fluid space (matrix) of the mitochondria',
      explanation: 'Correct! Glycolysis occurs in the cytosol, but the Citric Acid Cycle takes place in the mitochondrial matrix.'
    },
    {
      id: 'equations-question',
      question: 'What is the relationship between the chemical equations for photosynthesis and cellular respiration?',
      options: [
        'They are identical',
        'They are opposites (reactants of one are products of the other)',
        'They are unrelated',
        'Cellular respiration is a simplified version of photosynthesis'
      ],
      correctAnswer: 'They are opposites (reactants of one are products of the other)',
      explanation: 'Correct! Photosynthesis builds glucose (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂), while respiration breaks it down (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O).'
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
      interactionId: `cellular-respiration-stages-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'cellular-respiration-stages',
      conceptName: 'Cellular Respiration Stages Quiz',
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
      {/* Changed to 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto p-8">
        
        {/* Left Column: Article Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              The Stages of Cellular Respiration
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Cellular respiration involves many steps, which can be divided into three main stages.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">Cellular respiration involves three major stages</h2>
            <ul className="mt-4 space-y-4 text-lg">
              <li>
                <strong>1. Glycolysis:</strong> Takes place in a cell's cytosol. During glycolysis, glucose is broken down into another molecule called pyruvic acid. As glucose is broken down, energy is released and stored in molecules of ATP and NADH.
              </li>
              <li>
                <strong>2. The Citric Acid Cycle (Krebs Cycle):</strong> Takes place in the fluid space (matrix) of a cell's mitochondria. During the citric acid cycle, pyruvic acid (from glycolysis) is broken down through a series of chemical reactions to eventually produce carbon dioxide, ATP, NADH, and FADH₂.
              </li>
              <li>
                <strong>3. The Electron Transport Chain (ETC):</strong> Takes place in the inner membranes (cristae) of a cell's mitochondria. NADH and FADH₂ molecules from glycolysis and the citric acid cycle transport electrons to the ETC, where they are used to synthesize (make) ATP molecules. At the end of this process, oxygen combines with electrons from the ETC and hydrogen atoms to produce water.
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Comparing Photosynthesis and Cellular Respiration</h2>
            <p className="text-lg leading-relaxed">
              The chemical equations that describe photosynthesis and cellular respiration are opposites: the reactants in one are the products of the other.
            </p>
            
            <h3 className="text-lg font-semibold mt-4 text-emerald-500">Photosynthesis:</h3>
            <div className="text-center p-2 my-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <p className="text-xl font-mono text-slate-800 dark:text-slate-100">
                6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂
              </p>
            </div>

            <h3 className="text-lg font-semibold mt-4 text-blue-500">Cellular Respiration:</h3>
            <div className="text-center p-2 my-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <p className="text-xl font-mono text-slate-800 dark:text-slate-100">
                C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP
              </p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              Photosynthetic organisms remove carbon dioxide and release oxygen. Organisms then carry out cellular respiration, removing oxygen and releasing carbon dioxide back. This continual cycling allows for life on Earth to exist as we know it!
            </p>
          </div>
        </div>

        {/* Right Column: Images & Quiz */}
        <div className="space-y-8">
          {/* Image Card 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Stage 1: Glycolysis</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/144e59c68c4f65be9825f30280dd4c7712f22887.png"
                alt="Diagram of Glycolysis"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Occurs in the cytosol; breaks glucose into pyruvic acid.
            </p>
          </div>
          
          {/* Image Card 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Stage 2: Citric Acid Cycle</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/8c9fcb84d41e42ef085cd2f745f6a865359fa275.png"
                alt="Diagram of the Citric Acid Cycle"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Occurs in the mitochondrial matrix; releases CO₂ and generates energy carriers.
            </p>
          </div>

          {/* Image Card 3 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Stage 3: Electron Transport Chain</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/5c32006df6aaf014f8756488bb6ee5879da3e8d2.png"
                alt="Diagram of the Electron Transport Chain"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Occurs in the inner membrane; uses oxygen to produce large amounts of ATP.
            </p>
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
                  {score === questions.length ? 'Fantastic! You know your respiration stages!' : 'Great job! 👏'}
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
      slideId="intro-to-cellular-respiration"
      slideTitle="An introduction to cellular respiration"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="cellular-respiration"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}