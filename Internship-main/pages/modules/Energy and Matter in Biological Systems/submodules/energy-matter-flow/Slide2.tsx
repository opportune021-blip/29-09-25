import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse }from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function EnergyFlowSlide2() {
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
      id: 'food-web-quiz',
      conceptId: 'food-webs-trophic-levels',
      conceptName: 'Food Webs & Trophic Levels Quiz',
      type: 'judging',
      description: 'Testing understanding of food webs and trophic levels'
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
      id: 'trophic-level-question',
      question: 'An organism that eats a producer (like grass) is called a:',
      options: [
        'Primary Consumer',
        'Producer',
        'Secondary Consumer',
        'Decomposer'
      ],
      correctAnswer: 'Primary Consumer',
      explanation: 'Correct! Primary consumers (herbivores) are at trophic level 2 and eat producers (trophic level 1).'
    },
    {
      id: 'food-web-question',
      question: 'Why is a food web a more realistic model than a food chain?',
      options: [
        'It shows how energy is lost at each step',
        'It only includes producers and decomposers',
        'It shows complex, interconnected feeding interactions',
        'It is always in the shape of a pyramid'
      ],
      correctAnswer: 'It shows complex, interconnected feeding interactions',
      explanation: 'Correct! Food webs show how organisms can feed on multiple trophic levels, which is more accurate than a simple linear food chain.'
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
      interactionId: `food-web-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'food-webs-trophic-levels',
      conceptName: 'Food Webs & Trophic Levels Quiz',
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
          <div>
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Food Chains, Webs, & Trophic Levels
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Energy flows in a one-way direction through an ecosystem, while matter is recycled within it.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">Producers and Consumers</h2>
            <p className="text-lg leading-relaxed">
              Organisms are categorized by how they get food:
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Producers (Autotrophs):</strong> "Self-feeders" that make their own organic food, usually from sunlight (e.g., plants, algae).</li>
              <li><strong>Consumers (Heterotrophs):</strong> "Other-feeders" that must eat other organisms for energy (e.g., herbivores, carnivores, omnivores).</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Food Chains and Trophic Levels</h2>
            <p className="text-lg leading-relaxed">
              A food chain shows a single, linear path of energy transfer. The position an organism holds is its trophic level.
            </p>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside">
              <li><strong>Level 1: Producers</strong> (e.g., plants)</li>
              <li><strong>Level 2: Primary Consumers</strong> (herbivores that eat producers)</li>
              <li><strong>Level 3: Secondary Consumers</strong> (eat primary consumers)</li>
              <li><strong>Level 4: Tertiary Consumers</strong> (eat secondary consumers)</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Food Webs</h2>
            <p className="text-lg leading-relaxed">
              In most ecosystems, the flow is more complicated than a simple chain. A food web is a network of interconnected food chains.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              It shows that many organisms feed on multiple trophic levels (e.g., a seabird might eat both primary and secondary consumers).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">Decomposers & Matter Cycling</h2>
            <p className="text-lg leading-relaxed">
              Decomposers (like fungi and bacteria) chemically break down dead organic matter.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              This is not energy flow; this is matter recycling. Decomposers return nutrients to the soil and air, where producers can use them again. Without decomposers, nutrients would be locked in dead organisms.
            </p>
          </div>
        </div>

        {/* Right Column: Images & Quiz */}
        <div className="space-y-8">
          {/* Image Card 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Example of a Food Chain</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/3b2c805b96bb2c8a8fb458f27f90d83d7ba3ae5f.jpg"
                alt="A simple food chain: Algae to Mollusk to Sculpin to Seal"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              A simple food chain shows one path of energy flow.
            </p>
          </div>
          
          {/* Image Card 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Example of a Food Web</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/5de4f1b6927fdd3bca4f3577e7eaddc152597f81.png"
                alt="An Arctic food web"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              A food web shows the complex, interconnected feeding relationships.
            </p>
          </div>

          {/* Image Card 3 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Role of Decomposers</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.kastatic.org/ka-content-images/36667e3a494df5a27a5b88124f3816d85aba62de.jpg"
                alt="A diagram showing fungi decomposing a dead animal"
                className="max-w-full h-auto rounded-lg shadow-md bg-white p-2"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Decomposers, like fungi, recycle nutrients from dead organisms.
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
                  {score === questions.length ? 'Excellent! You\'re a food web expert.' : 'Great job! 👏'}
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
      slideId="food-chains-and-webs"
      slideTitle="Food chains and food webs"
      moduleId="olympiad-bio-energy-matter"
      submoduleId="energy-matter-flow"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}