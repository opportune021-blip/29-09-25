import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function BiogeochemicalCyclesSlide2() {
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
      id: 'carbon-cycle-article-quiz',
      conceptId: 'carbon-cycle-article',
      conceptName: 'Carbon Cycle Article Quiz',
      type: 'judging',
      description: 'Testing understanding of carbon cycle processes and reservoirs'
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
      id: 'process-question',
      question: 'Which process moves carbon from the *biosphere* (living things) back to the *atmosphere*?',
      options: [
        'Photosynthesis',
        'Respiration',
        'Combustion',
        'Both Respiration and Combustion'
      ],
      correctAnswer: 'Both Respiration and Combustion',
      explanation: 'Correct! Respiration (by plants and animals) and Combustion (burning fossil fuels, which are old life) both release CO₂ into the atmosphere.'
    },
    {
      id: 'reservoir-question',
      question: 'Which of these is *not* considered a major carbon reservoir?',
      options: [
        'The atmosphere',
        'The biosphere (living things)',
        'The hydrosphere (oceans)',
        'The sun'
      ],
      correctAnswer: 'The sun',
      explanation: 'Correct! The sun provides the *energy* for the cycle, but it is not a *reservoir* where carbon is stored on Earth.'
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
      interactionId: `carbon-cycle-article-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'carbon-cycle-article',
      conceptName: 'Carbon Cycle Article Quiz',
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
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Article: The Carbon Cycle 🔄
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Carbon is the backbone of all biomolecules. The carbon cycle shows how this element moves between the living and non-living world.
            </p>
          </div>

          {/* Section 1: Key Processes */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">Key Processes that Move Carbon</h2>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="font-bold">1. Photosynthesis:</span> Plants and algae pull <strong>CO₂</strong> from the atmosphere to build glucose (carbon fixation). This moves carbon from the air into the biosphere.
              </li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="font-bold">2. Respiration:</span> All living organisms (plants and animals) break down glucose for energy, releasing <strong>CO₂</strong> back into the atmosphere.
              </li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="font-bold">3. Decomposition:</span> Decomposers (bacteria, fungi) break down dead organisms, releasing <strong>CO₂</strong> into the atmosphere and carbon into the soil.
              </li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="font-bold">4. Combustion:</span> The burning of fossil fuels (coal, oil, gas)—which are the ancient, compressed remains of dead organisms—releases massive amounts of <strong>CO₂</strong> into the atmosphere.
              </li>
            </ul>
          </div>

          {/* Section 2: Reservoirs */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Where is Carbon Stored? (Reservoirs)</h2>
            <p className="text-lg leading-relaxed">
              Carbon is stored in four main "spheres" on Earth:
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Atmosphere:</strong> As CO₂ gas.</li>
              <li><strong>Biosphere:</strong> In all living (and dead) organisms (plants, animals, soil).</li>
              <li><strong>Hydrosphere:</strong> Dissolved in water, especially the oceans, which are a huge carbon sink.</li>
              <li><strong>Geosphere:</strong> Trapped in rocks (like limestone) and as <strong>fossil fuels</strong> (coal, oil, gas) deep underground.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Image & Quiz */}
        <div className="space-y-8">
          {/* Image - Carbon Cycle */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Carbon Cycle Diagram</h3>
            <div className="flex justify-center">
              <img 
                src="https://www.sciencefacts.net/wp-content/uploads/2020/02/Carbon-Cycle-Diagram.jpg"
                alt="Diagram of the Carbon Cycle showing reservoirs and processes"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              This diagram shows the movement (arrows) of carbon between the different reservoirs (land, air, ocean).
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
                  {score === questions.length ? 'Fantastic! You know the Carbon Cycle.' : 'Great job! 👏'}
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
      slideId="carbon-cycle-article"
      slideTitle="The carbon cycle"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="biogeochemical-cycles"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}