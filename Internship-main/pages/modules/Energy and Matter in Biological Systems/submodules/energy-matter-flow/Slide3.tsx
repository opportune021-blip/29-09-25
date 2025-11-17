import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function EnergyFlowSlide3() {
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
      id: 'trophic-pyramid-quiz',
      conceptId: 'trophic-pyramids',
      conceptName: 'Trophic Pyramids Quiz',
      type: 'judging',
      description: 'Testing understanding of trophic pyramids and energy loss'
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
      id: 'energy-loss-question',
      question: 'Why do energy pyramids get smaller at the top (fewer organisms and less biomass)?',
      options: [
        'Energy is recycled back to producers',
        'Top predators are larger in size',
        'Energy is lost (mostly as heat) at each trophic level',
        'Producers don\'t create enough energy'
      ],
      correctAnswer: 'Energy is lost (mostly as heat) at each trophic level',
      explanation: 'Correct! Only about 10% of energy is transferred from one level to the next. The rest is lost to metabolic processes (as heat), waste, etc.'
    },
    {
      id: 'trophic-cascade-question',
      question: 'What is a "trophic cascade"?',
      options: [
        'When energy flows from producers to consumers',
        'When a change at a top trophic level (like removing a predator) drastically affects the levels below',
        'The process of nutrients being recycled by decomposers',
        'Another name for the 10% energy rule'
      ],
      correctAnswer: 'When a change at a top trophic level (like removing a predator) drastically affects the levels below',
      explanation: 'Correct! A classic example is removing wolves (top predator), leading to an explosion in deer (primary consumer), which then devastates plant populations (producers).'
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
      interactionId: `trophic-pyramid-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'trophic-pyramids',
      conceptName: 'Trophic Pyramids Quiz',
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
              Trophic Pyramids & Ecosystems
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Learn what happens when one part of a food web is disrupted.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">Trophic Levels</h2>
            <p className="text-lg leading-relaxed">
              A trophic level is the position an organism occupies in a food chain.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Level 1: Producers</strong> (e.g., plants)</li>
              <li><strong>Level 2: Primary Consumers</strong> (herbivores)</li>
              <li><strong>Level 3: Secondary Consumers</strong> (carnivores/omnivores)</li>
              <li><strong>Level 4: Tertiary Consumers</strong> (eat secondary consumers)</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Energy Pyramids & The 10% Rule</h2>
            <p className="text-lg leading-relaxed">
              Energy pyramids show why energy, biomass, and population numbers decrease as you move up the pyramid.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Only about 10% of the energy from one level is transferred to the next. The other 90% is lost, mostly as metabolic heat.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Trophic Cascade</h2>
            <p className="text-lg leading-relaxed">
              A trophic cascade is what happens when changes at a top trophic level (like removing a top predator) drastically affect the populations of the levels below it.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              For example, removing wolves might lead to a surge in deer, which would then eat too many plants, devastating the producer level.
            </p>
          </div>
        </div>

        {/* Right Column: Image & Quiz */}
        <div className="space-y-8">
          {/* Image Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Energy Pyramid</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.britannica.com/92/180492-050-9389FB50/energy-pyramid-level-organisms-producers-flow-consumers.jpg"
                alt="An energy pyramid showing producers, primary, secondary, and tertiary consumers"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Energy pyramids show the flow of energy and the decrease in biomass at higher trophic levels.
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
                  {score === questions.length ? 'Perfect! You\'re at the top of the pyramid.' : 'Great job! 👏'}
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
      slideId="impact-on-trophic-pyramids"
      slideTitle="Impact of changes to trophic pyramids"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="energy-matter-flow"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}