import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "What is the rule for significant figures when multiplying or dividing?",
    options: ["Keep the fewest decimal places", "Keep the fewest total significant figures", "Keep the most significant figures", "Round to the nearest whole number"],
    correctIndex: 1, // Fewest total sig figs
    explanation: "The result cannot be more precise than the least precise measurement. We look at the total count of sig figs, not decimal places."
  },
  {
    question: "Calculate: 4.5 × 2.00. How should the answer be reported?",
    options: ["9", "9.0", "9.00", "9.000"],
    correctIndex: 1, // 9.0 (2 sig figs)
    explanation: "4.5 has 2 sig figs. 2.00 has 3 sig figs. The result must be limited to the fewest: 2 sig figs (9.0)."
  },
  {
    question: "Calculate: 10.0 / 3.0. What is the correct result?",
    options: ["3.333...", "3.33", "3.3", "3"],
    correctIndex: 2, // 3.3 (2 sig figs)
    explanation: "3.0 has 2 sig figs (the zero counts). 10.0 has 3. The result is limited to 2 sig figs: 3.3."
  }
];

// --- DATA STRUCTURES ---

interface CalculationScenario {
  id: string;
  label: string;
  val1: number;
  val1Str: string;
  val1SigFigs: number;
  operation: '×' | '÷';
  val2: number;
  val2Str: string;
  val2SigFigs: number;
  rawResult: number;
}

const scenarios: CalculationScenario[] = [
  {
    id: 'area',
    label: 'Calculating Area',
    val1: 12.25,
    val1Str: "12.25", // 4 sig figs
    val1SigFigs: 4,
    operation: '×',
    val2: 4.2,
    val2Str: "4.2",   // 2 sig figs
    val2SigFigs: 2,
    rawResult: 51.45
  },
  {
    id: 'density',
    label: 'Calculating Density',
    val1: 25.5,
    val1Str: "25.5", // 3 sig figs (Mass)
    val1SigFigs: 3,
    operation: '÷',
    val2: 5.0,
    val2Str: "5.0",  // 2 sig figs (Volume)
    val2SigFigs: 2,
    rawResult: 5.1
  },
  {
    id: 'force',
    label: 'Calculating Force',
    val1: 6.115,
    val1Str: "6.115", // 4 sig figs (Mass)
    val1SigFigs: 4,
    operation: '×',
    val2: 2.05,
    val2Str: "2.05",  // 3 sig figs (Accel)
    val2SigFigs: 3,
    rawResult: 12.53575
  }
];

// --- MAIN COMPONENT ---

export default function MultiplyingSigFigsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showRounded, setShowRounded] = useState(false);

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
      id: 'sig-figs-mult-rule', 
      conceptId: 'sig-figs-multiplication', 
      conceptName: 'Multiplication/Division Rule', 
      type: 'learning', 
      description: 'Applying the weakest link rule to multiplication and division.' 
    },
    {
      id: 'sig-figs-mult-quiz',
      conceptId: 'sig-figs-mult-quiz',
      conceptName: 'Multiplication Rule Quiz',
      type: 'learning', 
      description: 'Quick check on calculation rules.'
    }
  ];

  const current = scenarios[scenarioIndex];
  const minSigFigs = Math.min(current.val1SigFigs, current.val2SigFigs);
  const roundedResultStr = current.rawResult.toPrecision(minSigFigs);
  const currentQuestion = quizQuestions[currentQIndex];

  const nextScenario = () => {
    setShowRounded(false);
    setScenarioIndex((prev) => (prev + 1) % scenarios.length);
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
        interactionId: 'sig-figs-mult-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Weakest Link Rule </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              When Multiplying or Dividing, the rule is simple but strict:
            </p>

            

            <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-400 dark:border-indigo-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Rule</h4>
              <p>
                The result cannot have more significant figures than the measurement with the <strong>fewest</strong> significant figures.
              </p>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                <p className="text-sm font-bold text-slate-500 uppercase mb-2">Example</p>
                <div className="flex items-center gap-4 font-mono text-lg">
                    <div className="text-center">
                        <div>2.5</div>
                        <div className="text-xs text-red-500 font-bold">(2 sig figs)</div>
                    </div>
                    <div>×</div>
                    <div className="text-center">
                        <div>3.42</div>
                        <div className="text-xs text-green-500">(3 sig figs)</div>
                    </div>
                    <div>=</div>
                    <div className="text-center p-1 bg-indigo-100 dark:bg-indigo-900 rounded">
                        <div>8.6</div>
                        <div className="text-xs text-indigo-500 font-bold">(Limit to 2)</div>
                    </div>
                </div>
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
                    🧮 Calculator
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
                    <div className="flex-grow flex flex-col items-center justify-center gap-6">
                        
                        {/* Scenario Label */}
                        <div className="px-4 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm font-bold text-slate-500">
                            {current.label}
                        </div>

                        {/* Input Display */}
                        <div className="flex items-center gap-2 sm:gap-4 text-2xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100">
                            <div className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${minSigFigs === current.val1SigFigs ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-transparent'}`}>
                                <span>{current.val1Str}</span>
                                <span className="text-xs sm:text-sm font-normal text-slate-500 mt-1">{current.val1SigFigs} s.f.</span>
                            </div>
                            
                            <div className="text-slate-400">{current.operation}</div>
                            
                            <div className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${minSigFigs === current.val2SigFigs ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-transparent'}`}>
                                <span>{current.val2Str}</span>
                                <span className="text-xs sm:text-sm font-normal text-slate-500 mt-1">{current.val2SigFigs} s.f.</span>
                            </div>
                        </div>

                        {/* Action Arrow */}
                        <div className="text-3xl text-slate-300">⬇️</div>

                        {/* Result Area */}
                        <div className="w-full max-w-md bg-slate-900 rounded-xl p-6 text-center shadow-inner relative overflow-hidden">
                            
                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">Calculator Output</div>
                            
                            {/* Raw Result */}
                            <div className={`text-3xl font-mono transition-all duration-500 ${showRounded ? 'text-slate-600 blur-[1px] scale-90' : 'text-white scale-100'}`}>
                                {current.rawResult}
                            </div>

                            {/* Rounded Result Overlay */}
                            <AnimatePresence>
                                {showRounded && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 1.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm"
                                    >
                                        <div className="text-4xl font-bold text-green-400 font-mono">
                                            {roundedResultStr}
                                        </div>
                                        <div className="mt-2 text-xs text-green-500 font-bold border border-green-500/50 px-2 py-1 rounded">
                                            Rounded to {minSigFigs} s.f.
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-4 mt-4">
                            {!showRounded ? (
                                <button 
                                    onClick={() => setShowRounded(true)}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg transition-all active:scale-95"
                                >
                                    Apply Rule
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
                        
                        {/* Feedback Message */}
                        {showRounded && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-slate-500 text-center max-w-xs"
                            >
                                Restricted by the value with <strong>{minSigFigs}</strong> sig figs.
                            </motion.p>
                        )}
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
      slideId="multiplying-dividing-sig-figs"
      slideTitle="Multiplying and dividing with significant figures"
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