import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiomoleculesSlide4() {
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
      id: 'nucleic-acids-quiz',
      conceptId: 'nucleic-acids-fundamentals',
      conceptName: 'Nucleic Acids Quiz',
      type: 'judging',
      description: 'Testing understanding of nucleic acid monomers and function'
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
      id: 'nucleic-acid-monomer-question',
      question: 'What is the monomer (the single building block) of a nucleic acid?',
      options: [
        'Amino Acid',
        'Nucleotide',
        'Monosaccharide',
        'Fatty Acid'
      ],
      correctAnswer: 'Nucleotide',
      explanation: 'Correct! A nucleotide (made of a sugar, a phosphate group, and a nitrogenous base) is the monomer that builds polymers like DNA and RNA.'
    },
    {
      id: 'nucleic-acid-function-question',
      question: 'What is the primary function of nucleic acids like DNA?',
      options: [
        'Storing and transmitting genetic information',
        'Speeding up chemical reactions',
        'Providing a quick source of usable energy',
        'Forming the cell membrane'
      ],
      correctAnswer: 'Storing and transmitting genetic information',
      explanation: 'Correct! DNA (Deoxyribonucleic Acid) carries the "blueprint" or genetic instructions for building and running an organism.'
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
      interactionId: `nucleic-acids-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'nucleic-acids-fundamentals',
      conceptName: 'Nucleic Acids Quiz',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What are Nucleic Acids? 🧬</h2>
            <p className="text-lg leading-relaxed">
              Nucleic acids are the information molecules of the cell. They are made of Carbon, Hydrogen, Oxygen, Nitrogen, and Phosphorus (CHONP).
            </p>
            {/* UPDATED LIST BELOW */}
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li>
                <span><strong>Monomer:</strong> The building block is a Nucleotide.</span>
              </li>
              <li>
                <span>Each nucleotide has 3 parts: a sugar, a phosphate group, and a nitrogenous base (A, T, C, G, or U).</span>
              </li>
               <li>
                <span><strong>Polymer:</strong> A Polynucleotide chain (e.g., DNA, RNA).</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The "Blueprints" of Life</h3>
            <p className="text-lg leading-relaxed">
              Nucleic acids store and transmit the hereditary information needed to build proteins.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700 space-y-3">
              <p className="text-lg">
                <span><strong>Key Examples:</strong></span>
                <ul className="list-disc list-inside ml-4">
                  <li><strong>DNA (Deoxyribonucleic Acid):</strong> The permanent "master blueprint" that stores genetic information. It is double-stranded (a double helix).</li>
                  <li><strong>RNA (Ribonucleic Acid):</strong> A temporary "working copy" used to build proteins based on the DNA instructions. It is typically single-stranded.</li>
                  <li><strong>ATP (Adenosine Triphosphate):</strong> A modified nucleotide used as the main energy currency of the cell.</li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Structure of Nucleic Acids</h3>
            <div className="flex justify-center">
              {/* UPDATED IMAGE SRC AND ALT */}
              <img 
                src="https://sciencenotes.org/wp-content/uploads/2023/02/Nucleic-Acids.png"
                alt="Diagram of nucleic acids including DNA, RNA, and a nucleotide"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Nucleic acids (like DNA and RNA) are polymers made of nucleotide monomers.
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
                  {score === questions.length ? 'Outstanding! You\'re a DNA expert!' : 'Great job! 👏'}
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
      slideId="introduction-to-nucleic-acids"
      slideTitle="Introduction to nucleic acids and nucleotides"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biomolecules-reactions"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}