import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "When converting a number smaller than 1 (like 0.004) to scientific notation, the exponent will be:",
    options: ["Positive (+)", "Negative (-)", "Zero (0)", "It depends on the digits"],
    correctIndex: 1, // Negative
    explanation: "Numbers less than 1 require moving the decimal to the right, which corresponds to a negative exponent."
  },
  {
    question: "What is the scientific notation for 0.00052?",
    options: ["5.2 × 10^3", "5.2 × 10^-3", "5.2 × 10^-4", "52 × 10^-5"],
    correctIndex: 2, // 5.2 x 10^-4
    explanation: "Move the decimal 4 places to the right to get 5.2. So the exponent is -4."
  },
  {
    question: "In the expression a × 10^n, what is the rule for 'a'?",
    options: ["a must be less than 1", "a can be any number", "1 ≤ a < 10", "a must be an integer"],
    correctIndex: 2, // 1 <= a < 10
    explanation: "The coefficient 'a' must be at least 1 and less than 10."
  }
];

// --- MAIN COMPONENT ---

export default function NotationExampleSmallSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [decimalMoves, setDecimalMoves] = useState(0);
  const targetMoves = 10;
  const isComplete = decimalMoves === targetMoves;

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
      id: 'sci-notation-small', 
      conceptId: 'scientific-notation-negative', 
      conceptName: 'Scientific Notation (Small Numbers)', 
      type: 'learning', 
      description: 'Practice converting a small decimal number to scientific notation.' 
    },
    {
      id: 'sci-notation-small-quiz',
      conceptId: 'sci-notation-small-quiz',
      conceptName: 'Small Notation Quiz',
      type: 'learning', 
      description: 'Quick check on small number notation.'
    }
  ];

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
        interactionId: 'sci-notation-small-quiz',
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

  // --- VISUALIZATION LOGIC ---
  const zeros = "000000000";
  const digits = "3457";
  
  const renderNumber = () => {
    const fullString = "0" + zeros + digits; 
    const beforeDecimal = fullString.slice(0, 1 + decimalMoves);
    const afterDecimal = fullString.slice(1 + decimalMoves);

    return (
      <div className="text-3xl sm:text-4xl font-mono tracking-widest text-slate-700 dark:text-slate-300 break-all flex flex-wrap justify-center items-baseline">
        {beforeDecimal.split('').map((char, i) => (
           <span key={`pre-${i}`} className={i === 0 && decimalMoves > 0 ? "opacity-30" : ""}>{char}</span>
        ))}
        
        {/* The Floating Decimal Point */}
        <motion.div 
            layoutId="decimal-point"
            className="mx-1 w-3 h-3 bg-blue-600 rounded-full inline-block"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />

        {afterDecimal.split('').map((char, i) => (
           <span key={`post-${i}`}>{char}</span>
        ))}
      </div>
    );
  };

  const slideContent = (
<div className="w-full p-4 sm:p-8">
        <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col ">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Taming Tiny Numbers </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Writing <code>0.0000000003457</code> is prone to error. Is that 8 zeros? 9 zeros? It's hard to tell at a glance.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
<h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
    The Rule (<InlineMath math="N \times 10^n" />)
</h4>
             <ol className="list-decimal pl-5 space-y-2">
    <li>Move the decimal point to the <strong>right</strong> until you have one non-zero digit to its left.</li>
    <li>Count how many times you moved (<InlineMath math="n" />).</li>
    <li>Because you moved right (making the number bigger), the exponent is <strong>negative</strong> (<InlineMath math="-n" />).</li>
</ol>
            </div>

            <div className="p-4 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-center">
                <p className="text-sm text-slate-500 mb-2">Goal: Convert to Standard Form</p>
                <BlockMath>{`a \\times 10^b`}</BlockMath>
                <p className="text-sm">Where <InlineMath math="1 \le a < 10" /></p>
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
                    🔢 Decimal Hopper
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Notation Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The Decimal Hopper</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 text-center">
                            Click the arrow to hop the decimal point until the number looks correct (3.457).
                        </p>
                        
                        {/* The Number Display */}
                        <div className="w-full bg-slate-100 dark:bg-slate-900 p-8 rounded-xl shadow-inner min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden">
                            
                            {/* Original Ghost Number (for reference) */}
                            <div className="absolute top-2 left-2 text-xs font-mono text-slate-400 opacity-50">
                                Original: 0.0000000003457
                            </div>

                            {renderNumber()}

                            {/* Exponent Counter */}
                            {decimalMoves > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 flex items-center gap-2"
                                >
                                    <span className="text-sm font-bold text-slate-500 uppercase">Jumps Right:</span>
                                    <span className="text-2xl font-bold text-red-500">{decimalMoves}</span>
                                </motion.div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col items-center gap-4 w-full">
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setDecimalMoves(0)}
                                    className="px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
                                >
                                    Reset
                                </button>

                                <button
                                    onClick={() => !isComplete && setDecimalMoves(p => p + 1)}
                                    disabled={isComplete}
                                    className={`px-6 py-3 rounded-lg font-bold text-white shadow-lg flex items-center gap-2 transition-all
                                        ${isComplete 
                                            ? 'bg-green-500 cursor-default' 
                                            : 'bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95'
                                        }`}
                                >
                                    {isComplete ? (
                                        <span>Target Reached! 🎉</span>
                                    ) : (
                                        <>
                                            <span>Hop Right ➡️</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Final Result Card */}
                        <AnimatePresence>
                            {isComplete && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full bg-green-50 dark:bg-green-900/20 border-2 border-green-400 rounded-xl p-6 text-center"
                                >
                                    <p className="text-green-800 dark:text-green-200 font-medium mb-2">Final Scientific Notation</p>
                                    <div className="text-4xl font-bold text-slate-800 dark:text-white">
                                        <InlineMath>{`3.457 \\times 10^{-10}`}</InlineMath>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-2">
                                        (Negative because the original number was less than 1)
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
      slideId="notation-example-small"
      slideTitle="Scientific notation example: Small"
      moduleId="units-and-measurement"
      submoduleId="scientific-notation"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}