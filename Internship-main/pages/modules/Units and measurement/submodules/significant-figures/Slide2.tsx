import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "How many significant figures are in the number 0.0052?",
    options: ["2", "3", "4", "5"],
    correctIndex: 0, // 2 (5 and 2)
    explanation: "Leading zeros (0.00...) never count. Only the non-zero digits (5 and 2) are significant."
  },
  {
    question: "How many significant figures are in 4005?",
    options: ["1", "2", "3", "4"],
    correctIndex: 3, // 4
    explanation: "Zeros between non-zero digits (captive zeros) are always significant."
  },
  {
    question: "How many significant figures are in 2.50?",
    options: ["2", "3", "1", "It depends"],
    correctIndex: 1, // 3
    explanation: "Trailing zeros count IF there is a decimal point. 2.50 has 3 significant figures."
  }
];

// --- DATA STRUCTURES ---

interface RuleExample {
  id: string;
  numberStr: string;
  sigFigCount: number;
  ruleTitle: string;
  explanation: string;
  digitStatus: ('sig' | 'insig' | 'neutral')[]; 
}

const rulesData: RuleExample[] = [
  {
    id: 'non-zero',
    numberStr: "4892",
    sigFigCount: 4,
    ruleTitle: "1. Non-Zero Digits",
    explanation: "All non-zero digits are ALWAYS significant.",
    digitStatus: ['sig', 'sig', 'sig', 'sig']
  },
  {
    id: 'captive',
    numberStr: "5007",
    sigFigCount: 4,
    ruleTitle: "2. Captive Zeros",
    explanation: "Zeros between two non-zero digits are significant. They are 'trapped'.",
    digitStatus: ['sig', 'sig', 'sig', 'sig']
  },
  {
    id: 'leading',
    numberStr: "0.0052",
    sigFigCount: 2,
    ruleTitle: "3. Leading Zeros",
    explanation: "Zeros to the left of the first non-zero digit are NEVER significant. They just locate the decimal point.",
    digitStatus: ['insig', 'neutral', 'insig', 'insig', 'sig', 'sig']
  },
  {
    id: 'trailing-decimal',
    numberStr: "2.400",
    sigFigCount: 4,
    ruleTitle: "4. Trailing (with Decimal)",
    explanation: "Trailing zeros are significant IF the number contains a decimal point. They indicate precision.",
    digitStatus: ['sig', 'neutral', 'sig', 'sig', 'sig']
  },
  {
    id: 'trailing-no-decimal',
    numberStr: "3500",
    sigFigCount: 2,
    ruleTitle: "5. Trailing (No Decimal)",
    explanation: "Trailing zeros without a decimal point are generally NOT significant.",
    digitStatus: ['sig', 'sig', 'insig', 'insig']
  }
];

// --- MAIN COMPONENT ---

export default function RulesOfSigFigsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(0);

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
      id: 'sig-figs-rules', 
      conceptId: 'sig-figs-rules-breakdown', 
      conceptName: 'Rules of Significant Figures', 
      type: 'learning', 
      description: 'Exploring the specific rules for zeros in significant figures.' 
    },
    {
      id: 'sig-figs-rules-quiz',
      conceptId: 'sig-figs-rules-quiz',
      conceptName: 'Sig Fig Rules Quiz',
      type: 'learning', 
      description: 'Quick check on identifying significant figures.'
    }
  ];

  const currentRule = rulesData[selectedRuleIndex];
  const currentQuestion = quizQuestions[currentQIndex];

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
        interactionId: 'sig-figs-rules-quiz',
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: The Rule Selector */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Rules of the Game </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The only tricky part is the <strong>Zero</strong>. Does it count? Click a rule to investigate.
          </p>
          
          <div className="space-y-3 flex-grow">
            {rulesData.map((rule, index) => (
                <button
                    key={rule.id}
                    onClick={() => setSelectedRuleIndex(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all border-l-4 flex justify-between items-center
                        ${selectedRuleIndex === index 
                            ? 'bg-blue-50 border-blue-500 shadow-md dark:bg-blue-900/30 dark:border-blue-400' 
                            : 'bg-slate-50 border-transparent hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700'
                        }`}
                >
                    <div>
                        <span className={`font-bold block ${selectedRuleIndex === index ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'}`}>
                            {rule.ruleTitle}
                        </span>
                    </div>
                    {selectedRuleIndex === index && (
                        <motion.span layoutId="arrow" className="text-blue-500">👉</motion.span>
                    )}
                </button>
            ))}
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
                    🔍 Analyzer
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Rules Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Sig Fig Analyzer</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Green digits are significant. Grey/Red digits are placeholders.
                            </p>
                        </div>
                        
                        {/* The Number Display */}
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentRule.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-baseline gap-1 bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-inner"
                            >
                                {currentRule.numberStr.split('').map((char, i) => {
                                    const status = currentRule.digitStatus[i];
                                    let colorClass = "text-slate-800 dark:text-slate-200";
                                    let bgClass = "bg-transparent";
                                    let label = null;

                                    if (status === 'sig') {
                                        colorClass = "text-green-600 dark:text-green-400 font-bold";
                                        bgClass = "bg-green-100 dark:bg-green-900/30";
                                        label = "Count";
                                    } else if (status === 'insig') {
                                        colorClass = "text-red-400 dark:text-red-500 opacity-50";
                                        label = "Don't Count";
                                    } else {
                                        // Decimal point
                                        colorClass = "text-slate-400";
                                    }

                                    return (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <span className={`text-5xl sm:text-7xl font-mono rounded px-1 transition-colors ${colorClass} ${bgClass}`}>
                                                {char}
                                            </span>
                                            {status !== 'neutral' && (
                                                <motion.span 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                                    className={`text-[10px] uppercase font-bold tracking-wider ${status === 'sig' ? 'text-green-600' : 'text-red-400'}`}
                                                >
                                                    {status === 'sig' ? '✔' : '✘'}
                                                </motion.span>
                                            )}
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>

                        {/* Explanation Card */}
                        <div className="w-full bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                            <div className="text-sm font-bold text-slate-500 uppercase mb-2">Total Sig Figs:</div>
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                                {currentRule.sigFigCount}
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 font-medium">
                                {currentRule.explanation}
                            </p>
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
      slideId="rules-of-sig-figs"
      slideTitle="Rules of significant figures"
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