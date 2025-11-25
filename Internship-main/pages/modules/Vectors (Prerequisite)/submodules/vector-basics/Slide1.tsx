import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const quizQuestions = [
  {
    question: "Which of the following is a Vector quantity?",
    options: ["Temperature", "Mass", "Velocity", "Time"],
    correctIndex: 2, // Velocity
    explanation: "Velocity has both magnitude (speed) and direction. Temperature, Mass, and Time are scalars (magnitude only)."
  },
  {
    question: "If a car moves at 50 m/s North, '50 m/s' represents its...",
    options: ["Velocity", "Speed", "Displacement", "Direction"],
    correctIndex: 1, // Speed
    explanation: "50 m/s is just the magnitude. This is the Speed. '50 m/s North' would be the Velocity."
  },
  {
    question: "Can a scalar quantity be negative?",
    options: ["Yes, like Temperature", "No, never", "Only in space", "Yes, like Speed"],
    correctIndex: 0, 
    explanation: "Scalars can be negative (e.g., -10°C). However, the negative sign indicates a value on a scale, not a physical direction in space like a vector."
  }
];

// --- MAIN COMPONENT ---

export default function IntroVectorsScalarsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [speed, setSpeed] = useState(50); // Magnitude
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = East (Right), -1 = West (Left)

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
      id: 'vectors-scalars-explore', 
      conceptId: 'vectors-vs-scalars', 
      conceptName: 'Vectors vs Scalars', 
      type: 'learning', 
      description: 'Visualizing the difference between speed (scalar) and velocity (vector).' 
    },
    {
      id: 'vectors-scalars-quiz',
      conceptId: 'vectors-basics-quiz',
      conceptName: 'Vector Basics Quiz',
      type: 'learning', 
      description: 'Differentiating between scalar and vector quantities.'
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
        interactionId: 'vectors-scalars-quiz',
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

  // --- VISUALIZATION HELPERS ---
  // Calculates arrow length based on speed (max width 200px approx)
  const arrowLength = (speed / 100) * 120; 

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Vectors vs. Scalars</h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              In physics, we classify physical quantities into two main categories based on the information they carry.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-bold text-orange-700 dark:text-orange-300 mb-1">1. Scalars</h3>
                <p className="text-sm">
                  Quantities that have <strong>only magnitude</strong> (size/amount). <br/>
                  <em>Examples: Mass, Time, Temperature, Speed.</em>
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-1">2. Vectors</h3>
                <p className="text-sm">
                  Quantities that have <strong>both magnitude AND direction</strong>. <br/>
                  <em>Examples: Force, Velocity, Displacement.</em>
                </p>
              </div>
            </div>

            <p>
              <strong>Why does it matter?</strong> <br/>
              Walking 5 meters (Scalar) is different from walking 5 meters <em>East</em> (Vector). One tells you how far you walked, the other tells you where you ended up.
            </p>
          </div>
        </div>
        
        {/* Right Panel: Interactive Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🚗 Visualize It
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Take Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center gap-6">
                        <div className="w-full text-center">
                            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Speed vs. Velocity</h3>
                            <p className="text-sm text-slate-500">Adjust the car's motion to see the difference.</p>
                        </div>

                        {/* SVG VISUALIZATION CONTAINER */}
                        <div className="relative w-full h-64 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-center overflow-hidden">
                            {/* Grid Background */}
                            <svg className="absolute inset-0 w-full h-full opacity-20" width="100%" height="100%">
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>

                            {/* Main Scene SVG */}
                            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                                    </marker>
                                </defs>
                                
                                {/* Ground Line */}
                                <line x1="20" y1="150" x2="380" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

                                {/* The Car Group */}
                                <g transform={`translate(200, 130)`}>
                                    {/* Car Body */}
                                    <rect x="-30" y="-20" width="60" height="30" rx="5" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
                                    <text x="0" y="0" textAnchor="middle" fontSize="20" dominantBaseline="middle">🚗</text>
                                    
                                    {/* Velocity Vector Arrow */}
                                    <motion.line 
                                        x1="0" y1="-25"
                                        animate={{ 
                                            x2: direction * arrowLength 
                                        }}
                                        y2="-25"
                                        stroke="#3B82F6" 
                                        strokeWidth="4" 
                                        markerEnd="url(#arrowhead)"
                                    />
                                    
                                    {/* Velocity Label (Vector) */}
                                    <text x="0" y="-45" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="bold">
                                        <tspan>v = {direction === 1 ? '+' : '-'}{speed} m/s</tspan>
                                    </text>
                                </g>
                            </svg>
                        </div>

                        {/* Controls */}
                        <div className="w-full grid grid-cols-2 gap-4">
                            {/* Scalar Control */}
                            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                                <div className="text-orange-600 font-bold mb-2 flex items-center gap-2">
                                    <span>Scalar (Speed)</span>
                                </div>
                                <div className="text-3xl font-mono font-bold text-slate-800 dark:text-white mb-2">
                                    {speed} <span className="text-sm text-slate-500">m/s</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={speed}
                                    onChange={(e) => setSpeed(Number(e.target.value))}
                                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                />
                                <p className="text-xs text-slate-500 mt-2">Changes magnitude only.</p>
                            </div>

                            {/* Vector Control */}
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="text-blue-600 font-bold mb-2 flex items-center gap-2">
                                    <span>Vector (Velocity)</span>
                                </div>
                                <div className="text-3xl font-mono font-bold text-slate-800 dark:text-white mb-2">
                                    {direction === 1 ? '+' : '-'}{speed} <span className="text-sm text-slate-500">m/s</span>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setDirection(-1)}
                                        className={`flex-1 py-1 rounded text-sm font-bold ${direction === -1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-blue-300 text-blue-600'}`}
                                    >
                                        ⬅ West
                                    </button>
                                    <button 
                                        onClick={() => setDirection(1)}
                                        className={`flex-1 py-1 rounded text-sm font-bold ${direction === 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-blue-300 text-blue-600'}`}
                                    >
                                        East ➡
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Includes direction (+/-).</p>
                            </div>
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
      slideId="intro-vectors-scalars"
      slideTitle="Intro to vectors and scalars"
      moduleId="vectors-prerequisite"
      submoduleId="vector-basics"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}