import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function PhotosynthesisSlide2() {
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
      id: 'photosynthesis-stages-quiz',
      conceptId: 'photosynthesis-stages',
      conceptName: 'Photosynthesis Stages Quiz',
      type: 'judging',
      description: 'Testing understanding of the two stages of photosynthesis'
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
      id: 'light-reactions-products-question',
      question: 'What are the key products of the Light-Dependent Reactions, which are then used to power the Calvin Cycle?',
      options: [
        'ATP and NADPH',
        'Glucose and Oxygen',
        'Carbon Dioxide and Water',
        'ADP and NADP+'
      ],
      correctAnswer: 'ATP and NADPH',
      explanation: 'Correct! The light reactions capture light energy and store it in the chemical bonds of ATP and NADPH.'
    },
    {
      id: 'calvin-cycle-location-input-question',
      question: 'Where does the Calvin Cycle take place, and what molecule does it "fix" from the atmosphere?',
      options: [
        'In the thylakoid; it fixes Oxygen (O₂)',
        'In the stroma; it fixes Carbon Dioxide (CO₂)',
        'In the stroma; it fixes Water (H₂O)',
        'In the thylakoid; it fixes Carbon Dioxide (CO₂)'
      ],
      correctAnswer: 'In the stroma; it fixes Carbon Dioxide (CO₂)',
      explanation: 'Correct! The Calvin Cycle occurs in the stroma and uses CO₂ from the air to build sugars.'
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
      interactionId: `photosynthesis-stages-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'photosynthesis-stages',
      conceptName: 'Photosynthesis Stages Quiz',
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
      {/* Changed to 2-column grid and wider max-width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-8">
        
        {/* Left Column: Detailed Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Breaking Down the Stages
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Photosynthesis isn't one single step. It's two complex processes working together inside the chloroplast.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">1. The Light-Dependent Reactions</h2>
            <p className="text-lg leading-relaxed">
              This is the "photo" part of photosynthesis. Its job is to capture light energy and store it in temporary energy-carrier molecules.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Where:</strong> Thylakoid membranes (the green "pancakes" inside the chloroplast).</li>
              <li><strong>Inputs:</strong> Light, Water (H₂O).</li>
              <li><strong>Outputs:</strong> Oxygen (O₂ - as a waste product), ATP, and NADPH.</li>
              <li><strong>Result:</strong> Light energy is converted into chemical energy (ATP and NADPH) for the next stage.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">2. The Calvin Cycle (Light-Independent)</h2>
            <p className="text-lg leading-relaxed">
              This is the "synthesis" part. It uses the chemical energy from the first stage to build sugar.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Where:</strong> Stroma (the fluid-filled space *around* the thylakoids).</li>
              <li><strong>Inputs:</strong> Carbon Dioxide (CO₂), ATP, and NADPH (from the light reactions).</li>
              <li><strong>Outputs:</strong> G3P (a simple sugar that forms glucose), ADP, and NADP+.</li>
              <li><strong>Result:</strong> Carbon from the air (CO₂) is "fixed" into a sugar (glucose).</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Image, Summary, & Quiz */}
        <div className="space-y-8">
          {/* IMAGE CARD */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Process of Photosynthesis</h3>
            <div className="flex justify-center">
              <img 
                src="https://blogcdn.aakash.ac.in/wordpress_media/2022/03/Process-of-photosynthesis.jpg"
                alt="Detailed diagram of photosynthesis process in a chloroplast"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              This diagram shows the two stages: the Light-Dependent Reactions (in the thylakoids) and the Calvin Cycle (in the stroma).
            </p>
          </div>

          {/* "At a Glance" Summary Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">At a Glance</h2>
            <p className="text-lg leading-relaxed mb-4">
              Both stages occur in the chloroplast:
            </p>
            <ul className="space-y-3 text-lg list-disc list-inside">
              <li>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Light Reactions:</span><br />
                Uses light and water. Releases oxygen. Creates ATP and NADPH.
              </li>
              <li>
                <span className="font-semibold text-blue-600 dark:text-blue-400">Calvin Cycle:</span><br />
                Uses CO₂, ATP, and NADPH. Creates sugar (glucose).
              </li>
            </ul>
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
                  {score === questions.length ? 'Perfect! You know the stages inside-out!' : 'Great job! 👏'}
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
      slideId="photosynthesis-stages"
      slideTitle="Breaking down photosynthesis stages"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="photosynthesis"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}