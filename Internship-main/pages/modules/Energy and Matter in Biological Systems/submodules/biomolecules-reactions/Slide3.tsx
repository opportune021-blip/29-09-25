import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiomoleculesSlide3() {
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
      id: 'proteins-quiz',
      conceptId: 'proteins-fundamentals',
      conceptName: 'Proteins Quiz',
      type: 'judging',
      description: 'Testing understanding of protein monomers and functions'
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
      id: 'protein-monomer-question',
      question: 'What is the monomer (the single building block) of a protein?',
      options: [
        'Monosaccharide',
        'Nucleotide',
        'Amino Acid',
        'Fatty Acid'
      ],
      correctAnswer: 'Amino Acid',
      explanation: 'Correct! Amino acids are the building blocks that join together in long chains, called polypeptides, which then fold into functional proteins.'
    },
    {
      id: 'protein-function-question',
      question: 'Which of the following is a primary function of proteins?',
      options: [
        'Acting as enzymes to speed up reactions',
        'Providing quick-access energy',
        'Long-term energy storage',
        'Storing genetic information'
      ],
      correctAnswer: 'Acting as enzymes to speed up reactions',
      explanation: 'Correct! Proteins are the "workhorses" of the cell. One of their most critical jobs is to act as enzymes, which build up or break down other molecules.'
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
      interactionId: `proteins-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proteins-fundamentals',
      conceptName: 'Proteins Quiz',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What are Proteins? 🥩</h2>
            <p className="text-lg leading-relaxed">
              Proteins are the most diverse and functional biomolecules. They are made of **Carbon, Hydrogen, Oxygen, and Nitrogen (CHON)**. Their shape is critical to their function.
            </p>
            <ul className="mt-4 space-y-2 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">✓</span>
                <span><strong>Monomer:</strong> The building block is an **Amino Acid**. There are 20 different types.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">✓</span>
                <span><strong>Bond:</strong> Amino acids are linked by **Peptide Bonds**.</span>
              </li>
               <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">✓</span>
                <span><strong>Polymer:</strong> A long chain of amino acids is a **Polypeptide**, which folds into a 3D protein.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The "Workhorses" of the Cell</h3>
            <p className="text-lg leading-relaxed">
              Proteins perform nearly all tasks in a cell. Their job is determined by their unique folded shape.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700 space-y-3">
              <p className="text-lg">
                <span><strong>Key Functions:</strong></span>
                <ul className="list-disc list-inside ml-4">
                  <li><strong>Enzymes:</strong> (e.g., Lactase) Speed up chemical reactions.</li>
                  <li><strong>Structure:</strong> (e.g., Keratin) Form hair, nails, and skin.</li>
                  <li><strong>Transport:</strong> (e.g., Hemoglobin) Move substances like oxygen.</li>
                  <li><strong>Defense:</strong> (e.g., Antibodies) Fight diseases.</li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">From Amino Acid to Protein</h3>
            <div className="flex justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Peptide_bond_formation.png"
                alt="Diagram showing peptide bond formation between two amino acids"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Amino acids (monomers) join via peptide bonds (losing water, a dehydration reaction) to form a polypeptide chain.
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
                  {score === questions.length ? 'Excellent! You know your proteins!' : 'Great job! 👏'}
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
      slideId="introduction-to-proteins"
      slideTitle="Introduction to proteins and amino acids"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biomolecules-reactions"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}