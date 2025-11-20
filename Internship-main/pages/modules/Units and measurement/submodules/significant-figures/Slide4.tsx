import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "What is the rule for significant figures when adding or subtracting?",
    options: ["Keep the fewest significant figures", "Keep the fewest decimal places", "Keep the most decimal places", "Round to the nearest integer"],
    correctIndex: 1, // Fewest decimal places
    explanation: "Addition and subtraction precision is limited by the least precise decimal place (the 'cutoff line')."
  },
  {
    question: "Calculate: 5.1 + 12.35. How should the answer be reported?",
    options: ["17.45", "17.5", "17", "17.4"],
    correctIndex: 1, // 17.5
    explanation: "5.1 has 1 decimal place. 12.35 has 2. The result must be rounded to 1 decimal place (17.45 rounds to 17.5)."
  },
  {
    question: "Calculate: 100 - 0.1 (where 100 has no decimal point).",
    options: ["99.9", "100", "99", "90"],
    correctIndex: 1, // 100
    explanation: "100 has its last significant figure in the hundreds place (uncertainty ±1 or ±100 depending on context, but usually implies low precision). 0.1 is negligible compared to the uncertainty of 100."
  }
];

// --- DATA STRUCTURES ---

interface AdditionScenario {
  id: string;
  val1: string;
  val2: string;
  val1Decimals: number;
  val2Decimals: number;
  operation: '+' | '-';
}

const scenarios: AdditionScenario[] = [
  {
    id: 'ex1',
    val1: "12.52",   // 2 decimal places
    val2: "349.1",   // 1 decimal place (Limiting)
    val1Decimals: 2,
    val2Decimals: 1,
    operation: '+'
  },
  {
    id: 'ex2',
    val1: "5.2",     // 1 decimal place
    val2: "7.843",   // 3 decimal places
    val1Decimals: 1,
    val2Decimals: 3,
    operation: '+'
  },
  {
    id: 'ex3',
    val1: "85.45",   // 2 decimal places
    val2: "2.5",     // 1 decimal place (Limiting)
    val1Decimals: 2,
    val2Decimals: 1,
    operation: '-'
  }
];

// --- MAIN COMPONENT ---

export default function AdditionSigFigsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showCutoff, setShowCutoff] = useState(false);

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'sig-figs-add-rule', 
      conceptId: 'sig-figs-addition', 
      conceptName: 'Addition/Subtraction Rule', 
      type: 'learning', 
      description: 'Applying the decimal place rule to addition and subtraction.' 
    },
    {
      id: 'sig-figs-add-quiz',
      conceptId: 'sig-figs-add-quiz',
      conceptName: 'Addition Rule Quiz',
      type: 'learning', 
      description: 'Quick check on addition rules.'
    }
  ];

  const current = scenarios[scenarioIndex];
  const num1 = parseFloat(current.val1);
  const num2 = parseFloat(current.val2);
  const rawResult = current.operation === '+' ? num1 + num2 : num1 - num2;
  const limitDecimals = Math.min(current.val1Decimals, current.val2Decimals);
  const roundedResultStr = rawResult.toFixed(limitDecimals);
  
  const currentQuestion = quizQuestions[currentQIndex];

  const nextScenario = () => {
    setShowCutoff(false);
    setTimeout(() => {
        setScenarioIndex((prev) => (prev + 1) % scenarios.length);
    }, 300);
  };

  // --- QUIZ LOGIC HANDLERS ---
  const handleOptionClick = (index: number) => {
    if (showExplanation) return; 
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    setShowExplanation(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 1 : 0);
      handleInteractionComplete({
        interactionId: 'sig-figs-add-quiz',
        value: finalScore.toString(),
        timestamp: Date.now()
      });
    }
  };

  const resetQuiz = () => {
    setQuizCompleted(false);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The "Stacking" Rule</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Addition and Subtraction follow a different rule than multiplication. Here, we care about <strong>precision</strong> (decimal places), not the total number of digits.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-400 dark:border-purple-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Rule</h4>
              <p>
                The result is rounded to the same number of <strong>decimal places</strong> as the number with the <strong>fewest</strong> decimal places.
              </p>
            </div>

            <div className="space-y-2 text-base">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Why?</h4>
                <p>
                    Imagine stacking bricks. If one brick is shorter (less precise), the whole wall cannot be perfectly smooth beyond that point.
                </p>
            </div>
            
             <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 text-sm">
                <strong>Tip:</strong> Always stack the numbers vertically to find the "Cutoff Line".
            </div>
          </div>
        </div>
        
        {/* Right Panel: Tabs for Visualization OR Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden">
            
             {/* Tab Navigation */}
             <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🧱 Stack Analyzer
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Rule Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <div className="text-center">
                             <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Vertical Analyzer</h3>
                             <p className="text-slate-600 dark:text-slate-400">
                                Align the numbers. Drop the "Cutoff Line" to see where the precision ends.
                            </p>
                        </div>

                        {/* The Math Stack */}
                        <div className="relative font-mono text-4xl sm:text-5xl text-slate-800 dark:text-slate-100 leading-relaxed text-right pr-8">
                            
                            {/* The Cutoff Line (Animated) */}
                            <AnimatePresence>
                                {showCutoff && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: '120%', opacity: 1 }}
                                        className="absolute top-[-10%] border-r-2 border-red-500 border-dashed z-10"
                                        style={{ 
                                            right: `${(Math.max(current.val1Decimals, current.val2Decimals) - limitDecimals) * 0.6 + 0.8}em` 
                                        }}
                                    >
                                        <div className="absolute -top-6 -right-12 text-xs font-sans bg-red-100 text-red-800 px-2 py-1 rounded whitespace-nowrap">
                                            Stop Here!
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Number 1 */}
                            <div className="relative">
                                {current.val1}
                                {current.val1Decimals < current.val2Decimals && (
                                    <span className="opacity-20 text-slate-400">
                                        {'0'.repeat(current.val2Decimals - current.val1Decimals).replace(/0/g, '?')}
                                    </span>
                                )}
                            </div>

                            {/* Operator & Number 2 */}
                            <div className="relative border-b-4 border-slate-800 dark:border-slate-200">
                                <span className="absolute -left-8">{current.operation}</span>
                                {current.val2}
                                {current.val2Decimals < current.val1Decimals && (
                                    <span className="opacity-20 text-slate-400">
                                        {'0'.repeat(current.val1Decimals - current.val2Decimals).replace(/0/g, '?')}
                                    </span>
                                )}
                            </div>

                            {/* Raw Result (Initially hidden or faded) */}
                            <div className={`mt-2 transition-opacity duration-300 ${showCutoff ? 'opacity-40 blur-[1px]' : 'opacity-0'}`}>
                                {rawResult}
                            </div>
                        </div>

                        {/* Final Result Card */}
                        <AnimatePresence>
                            {showCutoff && (
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="w-full max-w-xs bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-4 text-center"
                                >
                                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Rounded Result</div>
                                    <div className="text-3xl font-bold text-green-700 dark:text-green-400 font-mono">
                                        {roundedResultStr}
                                    </div>
                                    <div className="mt-1 text-xs text-green-600">
                                        Limited to {limitDecimals} decimal place{limitDecimals !== 1 && 's'}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="flex gap-4 mt-4">
                            {!showCutoff ? (
                                <button 
                                    onClick={() => setShowCutoff(true)}
                                    className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold shadow-lg transition-all active:scale-95"
                                >
                                    Drop Cutoff Line ✂️
                                </button>
                            ) : (
                                <button 
                                    onClick={nextScenario}
                                    className="px-8 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg font-bold shadow transition-all"
                                >
                                    Next Example ⏭️
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    // --- QUIZ MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center">
                         <AnimatePresence mode="wait">
                            {!quizCompleted ? (
                                <motion.div 
                                    key="question-card"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full max-w-md"
                                >
                                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                        <span>Question {currentQIndex + 1} of {quizQuestions.length}</span>
                                        <span>Score: {score}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">
                                        {currentQuestion.question}
                                    </h3>

                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option, idx) => {
                                            let btnClass = "w-full p-4 rounded-lg text-left border-2 transition-all ";
                                            if (showExplanation) {
                                                if (idx === currentQuestion.correctIndex) btnClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-200";
                                                else if (idx === selectedOption) btnClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-200";
                                                else btnClass += "border-slate-200 dark:border-slate-700 opacity-50";
                                            } else {
                                                if (selectedOption === idx) btnClass += "bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
                                                else btnClass += "bg-white border-slate-200 hover:border-blue-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600";
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionClick(idx)}
                                                    disabled={showExplanation}
                                                    className={btnClass}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">{option}</span>
                                                        {showExplanation && idx === currentQuestion.correctIndex && <span>✅</span>}
                                                        {showExplanation && idx === selectedOption && idx !== currentQuestion.correctIndex && <span>❌</span>}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {showExplanation && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-slate-100 dark:bg-slate-700 rounded text-sm text-slate-600 dark:text-slate-300">
                                            <strong>Explanation:</strong> {currentQuestion.explanation}
                                        </motion.div>
                                    )}

                                    <div className="mt-6">
                                        {!showExplanation ? (
                                            <button
                                                onClick={handleSubmitAnswer}
                                                disabled={selectedOption === null}
                                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-blue-500 transition-colors"
                                            >
                                                Submit Answer
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleNextQuestion}
                                                className="w-full py-3 bg-slate-800 text-white dark:bg-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition-opacity"
                                            >
                                                {currentQIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="results"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="text-6xl mb-4">🏆</div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Quiz Complete!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                        You scored {score} out of {quizQuestions.length}
                                    </p>
                                    <button 
                                        onClick={resetQuiz}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-colors"
                                    >
                                        Retry Quiz
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="addition-subtraction-sig-figs"
      slideTitle="Addition and subtraction with significant figures"
      moduleId="units-and-measurement"
      submoduleId="significant-figures"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}