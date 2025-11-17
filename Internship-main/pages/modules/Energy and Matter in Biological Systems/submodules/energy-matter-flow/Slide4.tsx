import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function EnergyFlowSlide4() {
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
      id: 'energy-loss-quiz',
      conceptId: 'energy-loss-trophic-levels',
      conceptName: 'Energy Loss Quiz',
      type: 'judging',
      description: 'Testing understanding of the 10% rule'
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
      id: '10-percent-rule-question',
      question: 'On average, how much energy is transferred from one trophic level to the next?',
      options: [
        '100%',
        '50%',
        '10%',
        '1%'
      ],
      correctAnswer: '10%',
      explanation: 'Correct! Only about 10% of the energy is stored and passed on. The other 90% is lost as heat or used for metabolic processes.'
    },
    {
      id: 'energy-loss-reason-question',
      question: 'What is the *main* reason so much energy is lost between trophic levels?',
      options: [
        'Organisms are bad at catching prey',
        'Energy is destroyed by predators',
        'Energy is lost as metabolic heat',
        'Energy is converted into matter'
      ],
      correctAnswer: 'Energy is lost as metabolic heat',
      explanation: 'Correct! The vast majority of energy (around 90%) is used for the organism\'s own life processes (moving, breathing, keeping warm) and is lost as heat.'
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
      interactionId: `energy-loss-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'energy-loss-trophic-levels',
      conceptName: 'Energy Loss Quiz',
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
              Trophic Levels and Energy Loss
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Why are there fewer predators than prey? It all comes down to energy.
            </p>
          </div>

          {/* Section 1: Trophic Levels */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">What is a Trophic Level?</h2>
            <p className="text-lg leading-relaxed">
              A <strong>trophic level</strong> is the position an organism holds in a food chain. It's a "feeding level."
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Trophic Level 1: Producers</strong> (e.g., Plants, Algae) - Create their own food.</li>
              <li><strong>Trophic Level 2: Primary Consumers</strong> (e.g., Rabbits, Grasshoppers) - Herbivores that eat producers.</li>
              <li><strong>Trophic Level 3: Secondary Consumers</strong> (e.g., Foxes, Frogs) - Carnivores/omnivores that eat primary consumers.</li>
              <li><strong>Trophic Level 4: Tertiary Consumers</strong> (e.g., Hawks, Lions) - Carnivores/omnivores that eat secondary consumers.</li>
            </ul>
          </div>

          {/* Section 2: The 10% Rule */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-red-600 dark:text-red-400">Why Energy is Lost</h2>
            <p className="text-lg leading-relaxed">
              When an organism is eaten, not all of its energy is passed to the predator. Most of it is lost!
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Metabolic Processes:</strong> The organism used most of its energy just to stay alive (moving, breathing, keeping warm). This is lost as <strong>heat</strong>.</li>
              <li><strong>Not Eaten:</strong> Not all parts of an organism are eaten (e.g., bones, roots).</li>
              <li><strong>Waste:</strong> Not all eaten parts are digested (lost as feces).</li>
            </ul>
            <p className="text-xl leading-relaxed font-semibold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg mt-4">
              This is known as the <strong>"10% Rule"</strong>: On average, only about <strong>10%</strong> of the energy from one trophic level is stored in the next trophic level.
            </p>
          </div>
        </div>

        {/* Right Column: Image & Quiz */}
        <div className="space-y-8">
          {/* Image Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Energy Pyramid</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.britannica.com/00/95200-004-3B810E62.jpg"
                alt="An energy pyramid showing the 10% rule"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              An energy pyramid shows how energy decreases at each level.
            </p>
            <ul className="mt-4 text-lg text-center">
              <li><strong>Producers:</strong> 100% Energy</li>
              <li><strong>Primary Consumers:</strong> 10% Energy</li>
              <li><strong>Secondary Consumers:</strong> 1% Energy</li>
              <li><strong>Tertiary Consumers:</strong> 0.1% Energy</li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              This massive energy loss is why food chains are rarely longer than 4-5 levels.
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
                  {score === questions.length ? '10/10! You\'re an energy expert.' : 'Great job! 👏'}
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
      slideId="trophic-levels-energy-loss"
      slideTitle="Trophic levels and energy loss"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="energy-matter-flow"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}