// Slide1.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'avg-vel-scalars-vectors-learning',
    conceptId: 'scalars-vectors',
    conceptName: 'Scalars & Vectors',
    type: 'learning',
    description: 'Interactive simulation showing the difference between path length (scalar) and displacement (vector).'
  },
  {
    id: 'avg-vel-scalars-vectors-quiz',
    conceptId: 'scalars-vectors-quiz',
    conceptName: 'Scalars & Vectors Quiz',
    type: 'learning',
    description: 'Quiz about scalar–vector basics.'
  }
];

const quizQuestions = [
  {
    question: 'Which of the following is a vector quantity?',
    options: ['Speed', 'Distance', 'Velocity', 'Mass'],
    correctIndex: 2,
    explanation: 'Velocity is a vector because it includes both magnitude (how fast) and direction (which way).'
  },
  {
    question: 'If you walk 5 meters forward and 5 meters backward, what is your total displacement (vector)?',
    options: ['10 meters', '0 meters', '5 meters', '-5 meters'],
    correctIndex: 1,
    explanation: 'Displacement is the straight-line vector from start to finish. Since you ended where you started, displacement is 0.'
  }
];

// --- ANIMATION COMPONENT (The Explore Section) ---

const ScalarVectorPlayground = () => {
  const [position, setPosition] = useState(0); // -10 to 10
  const [distance, setDistance] = useState(0); // Always increases
  
  // Step size in visual units
  const STEP = 2;
  const MAX_POS = 10;

  const move = (direction: 'left' | 'right') => {
    if (direction === 'left' && position > -MAX_POS) {
      setPosition(prev => prev - STEP);
      setDistance(prev => prev + STEP);
    } else if (direction === 'right' && position < MAX_POS) {
      setPosition(prev => prev + STEP);
      setDistance(prev => prev + STEP);
    }
  };

  const reset = () => {
    setPosition(0);
    setDistance(0);
  };

  // Convert position to percentage for CSS (0 at 50%)
  const posPercent = 50 + (position * 4); 

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-inner relative">
        
        {/* 1. Metric Displays */}
        <div className="grid grid-cols-2 gap-4 mb-12">
            {/* Scalar Box */}
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg border border-orange-300 dark:border-orange-700 text-center">
                <div className="text-xs font-bold text-orange-800 dark:text-orange-200 uppercase tracking-wider">Scalar (Distance)</div>
                <div className="text-2xl font-mono font-bold text-slate-800 dark:text-white">
                    {distance} <span className="text-sm text-slate-500">m</span>
                </div>
                <div className="text-[10px] text-slate-500 leading-tight mt-1">Accumulates every step. No direction.</div>
            </div>

            {/* Vector Box */}
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-300 dark:border-blue-700 text-center">
                <div className="text-xs font-bold text-blue-800 dark:text-blue-200 uppercase tracking-wider">Vector (Displacement)</div>
                <div className="text-2xl font-mono font-bold text-slate-800 dark:text-white">
                    {position > 0 ? '+' : ''}{position} <span className="text-sm text-slate-500">m</span>
                </div>
                <div className="text-[10px] text-slate-500 leading-tight mt-1">Change from start. Has sign (+/-).</div>
            </div>
        </div>

        {/* 2. The Number Line World */}
        <div className="relative w-full h-32 mt-4">
            
            {/* The Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-300 dark:bg-slate-600 rounded"></div>
            
            {/* Tick Marks */}
            {[...Array(11)].map((_, i) => {
                const tickPos = i * 10; // 0, 10, 20... 100%
                const isCenter = i === 5;
                return (
                    <div key={i} className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center" style={{ left: `${tickPos}%` }}>
                        <div className={`w-0.5 ${isCenter ? 'h-6 bg-slate-800 dark:bg-slate-200' : 'h-3 bg-slate-400'}`}></div>
                        {isCenter && <span className="mt-4 text-xs font-bold text-slate-500">0 (Origin)</span>}
                    </div>
                );
            })}

            {/* VECTOR ARROW (The Displacement) */}
            <motion.div 
                className="absolute top-1/2 h-2 bg-blue-500 rounded-full opacity-80"
                style={{ 
                    top: '45%',
                    left: '50%', 
                    originX: 0,
                }}
                animate={{ 
                    width: `${Math.abs(position * 4)}%`,
                    rotate: position < 0 ? 180 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Arrow Head */}
                {position !== 0 && (
                    <div className="absolute right-[-4px] top-[-3px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-blue-500"></div>
                )}
            </motion.div>

            {/* THE WALKER (The Character) */}
            <motion.div 
                className="absolute top-1/2 -translate-y-1/2 text-4xl"
                animate={{ left: `${posPercent}%`, x: '-50%', y: '-60%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                🚶
                <div className="text-[10px] bg-slate-800 text-white px-1 rounded absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity">
                    You
                </div>
            </motion.div>

        </div>

        {/* 3. Controls */}
        <div className="flex justify-center gap-4 mt-8">
             <button 
                onClick={() => move('left')}
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 rounded-xl font-bold shadow-sm transition-all active:scale-95"
             >
                <span>⬅️</span> Walk Left
             </button>

             <button 
                onClick={() => move('right')}
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 rounded-xl font-bold shadow-sm transition-all active:scale-95"
             >
                Walk Right <span>➡️</span>
             </button>
        </div>

        <div className="text-center mt-4">
            <button onClick={reset} className="text-xs text-slate-400 hover:text-slate-600 underline">Reset Position</button>
        </div>

      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const currentQuestion = quizQuestions[currentQIndex];

  // --- QUIZ LOGIC ---
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
        interactionId: 'scalars-vectors-quiz',
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

  // --- CONTENT ---

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Vectors and Scalars</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              In Physics, knowing "how much" isn't always enough. Sometimes we need to know "which way."
            </p>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-400">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Scalars</h4>
                    <p className="text-sm mb-2">Quantities with <strong>magnitude only</strong>.</p>
                    <ul className="text-sm list-disc ml-4">
                        <li><strong>Examples:</strong> Distance, Speed, Mass, Time.</li>
                        <li><strong>Think:</strong> "How much?" (e.g., 5 kg, 10 seconds).</li>
                    </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Vectors 

[Image of vectors]
</h4>
                    <p className="text-sm mb-2">Quantities with <strong>magnitude AND direction</strong>.</p>
                    <ul className="text-sm list-disc ml-4">
                        <li><strong>Examples:</strong> Displacement, Velocity, Force.</li>
                        <li><strong>Think:</strong> "How much and where?" (e.g., 5 m North).</li>
                        <li>On a 1D line, direction is shown by <InlineMath math="+" /> or <InlineMath math="-" /> signs.</li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🏃‍♂️ Interactive Walk
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                     <ScalarVectorPlayground />
                ) : (
                    // Quiz View
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
                                                        <span className="font-medium text-sm">{option}</span>
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
      slideId="avg-vel-scalar-vector-intro"
      slideTitle="Intro to vectors and scalars"
      moduleId="motion-in-a-straight-line"
      submoduleId="average-velocity-and-average-speed"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}