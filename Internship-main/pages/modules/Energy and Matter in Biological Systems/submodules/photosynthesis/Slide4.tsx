import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function PhotosynthesisSlide4() {
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
      id: 'photosynthesis-env-quiz',
      conceptId: 'photosynthesis-environment',
      conceptName: 'Photosynthesis & Environment Quiz',
      type: 'judging',
      description: 'Testing understanding of photosynthesis environmental impact'
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
      id: 'producers-question',
      question: 'Organisms that create their own food using light, forming the base of a food web, are called:',
      options: [
        'Producers (Autotrophs)',
        'Consumers (Heterotrophs)',
        'Decomposers',
        'Scavengers'
      ],
      correctAnswer: 'Producers (Autotrophs)',
      explanation: 'Correct! Producers, or autotrophs, like plants, are the foundation of ecosystems because they create their own food.'
    },
    {
      id: 'atmosphere-impact-question',
      question: 'Besides creating food, what is a major environmental impact of photosynthesis?',
      options: [
        'It releases CO₂ into the atmosphere',
        'It consumes oxygen and releases CO₂',
        'It consumes CO₂ and releases oxygen',
        'It creates nitrogen in the soil'
      ],
      correctAnswer: 'It consumes CO₂ and releases oxygen',
      explanation: 'Correct! Photosynthesis takes CO₂ (a greenhouse gas) out of the air and releases the oxygen (O₂) that many organisms need to breathe.'
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
      interactionId: `photosynthesis-env-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'photosynthesis-environment',
      conceptName: 'Photosynthesis & Environment Quiz',
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
              Photosynthesis and the Environment 🌍
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              This single process is the foundation for nearly all ecosystems on Earth.
            </p>
          </div>

          {/* Section 1: The Base of Food Chains */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">The Planet's "Producers"</h2>
            <p className="text-lg leading-relaxed">
              Organisms that perform photosynthesis, like plants, are called autotrophs or producers. They are the only organisms that can create their own food (glucose) from inorganic sources.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              All other organisms, including humans, are heterotrophs or consumers. We must get our energy by eating other organisms.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li>A cow (herbivore) eats grass, getting energy that the grass made through photosynthesis.</li>
              <li>A human (omnivore) eats a salad (producer) or a steak (consumer that ate a producer).</li>
              <li>This flow of energy, which begins with photosynthesis, is the basis for all food webs.</li>
            </ul>
          </div>

          {/* Section 2: Shaping the Atmosphere */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Making the Air We Breathe</h2>
            <p className="text-lg leading-relaxed">
              Photosynthesis also plays two critical roles in regulating Earth's atmosphere:
            </p>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="font-bold text-lg">1. Oxygen Production:</span> The oxygen (O₂) released as a byproduct is essential for aerobic respiration the process most living things, including us, use to get energy from food.
              </li>
              <li className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="font-bold text-lg">2. Carbon Sequestration:</span> By taking carbon dioxide (CO₂) out of the atmosphere, photosynthesis helps regulate the climate. CO₂ is a greenhouse gas, and plants act as a massive "carbon sink."
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Image & Quiz */}
        <div className="space-y-8">
          {/* Image Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">A Global Impact</h3>
            <div className="flex justify-center">
              <img 
                src="https://wetlandinfo.des.qld.gov.au/resources/static/images/ecology/pocesses/photosynthesis.png"
                alt="Diagram illustrating the global impact of photosynthesis"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Photosynthesis converts sunlight into chemical energy, releases oxygen, and forms the base of the food web.
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
                  {score === questions.length ? 'Perfect! You see the big picture.' : 'Great job! 👏'}
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
      slideId="photosynthesis-and-environment"
      slideTitle="Photosynthesis and the environment"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="photosynthesis"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}