import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiogeochemicalCyclesSlide3() {
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
      id: 'nitrogen-cycle-quiz',
      conceptId: 'nitrogen-cycle-fundamentals',
      conceptName: 'Nitrogen Cycle Quiz',
      type: 'judging',
      description: 'Testing understanding of the nitrogen cycle'
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
      id: 'nitrogen-fixation-question',
      question: 'Why is "nitrogen fixation" by bacteria so important for life?',
      options: [
        'It releases oxygen into the atmosphere',
        'It converts unusable N₂ gas into a usable form (like ammonia)',
        'It breaks down dead organisms',
        'It converts light energy into chemical energy'
      ],
      correctAnswer: 'It converts unusable N₂ gas into a usable form (like ammonia)',
      explanation: 'Correct! Most organisms cannot use the N₂ gas in the atmosphere. Nitrogen-fixing bacteria convert it into a form that plants can absorb.'
    },
    {
      id: 'denitrification-question',
      question: 'Which process *returns* nitrogen gas (N₂) back to the atmosphere, completing the cycle?',
      options: [
        'Nitrification',
        'Denitrification',
        'Assimilation',
        'Ammonification'
      ],
      correctAnswer: 'Denitrification',
      explanation: 'Correct! Denitrifying bacteria take nitrates from the soil and convert them back into N₂ gas, which returns to the atmosphere.'
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
      interactionId: `nitrogen-cycle-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'nitrogen-cycle-fundamentals',
      conceptName: 'Nitrogen Cycle Quiz',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
        
        {/* Left Column: Article Content */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Article: The Nitrogen Cycle
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Nitrogen is essential for building proteins and nucleic acids (DNA/RNA). See how it moves through the environment.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">The Nitrogen Problem</h2>
            <p className="text-lg leading-relaxed">
              Our atmosphere is 78% nitrogen gas (N₂), but most organisms cannot use it in this form. The N₂ molecule is "locked" by a strong triple bond.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              To be used by life, this N₂ must be "fixed"—converted into a usable form like ammonia (NH₃). This entire cycle is driven almost completely by **bacteria**.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Key Processes of the Cycle</h2>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Nitrogen Fixation:</strong> Special bacteria convert N₂ gas into ammonia (NH₃).</li>
              <li><strong>Nitrification:</strong> Other bacteria convert ammonia (NH₃) into nitrites (NO₂⁻) and then nitrates (NO₃⁻).</li>
              <li><strong>Assimilation:</strong> Plants absorb nitrates (NO₃⁻) from the soil to make proteins and DNA. Animals get nitrogen by eating plants.</li>
              <li><strong>Ammonification:</strong> Decomposers (bacteria/fungi) break down dead organisms and waste, returning nitrogen to the soil as ammonia (NH₃).</li>
              <li><strong>Denitrification:</strong> Different bacteria convert nitrates (NO₃⁻) back into N₂ gas, which returns to the atmosphere.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Image & Quiz */}
        <div className="space-y-8">
          {/* Image Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Nitrogen Cycle</h3>
            <div className="flex justify-center">
              <img 
                src="https://www.frontiersin.org/files/Articles/386862/frym-07-00041-HTML-r1/image_m/figure-3.jpg"
                alt="Diagram of the Nitrogen Cycle"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The nitrogen cycle shows how nitrogen moves between the atmosphere, soil, and living organisms, driven primarily by bacteria.
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
                  {score === questions.length ? 'Excellent! You know your nitrogen.' : 'Great job! 👏'}
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
      slideId="nitrogen-cycle-article" // Renamed ID
      slideTitle="The nitrogen cycle"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biogeochemical-cycles"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}