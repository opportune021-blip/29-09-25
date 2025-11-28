import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'position-vector-learning',
    conceptId: 'position-vector',
    conceptName: 'Position Vectors',
    type: 'learning',
    description: 'Interactive visualization of position vectors in a Cartesian plane.'
  },
  {
    id: 'position-vector-quiz',
    conceptId: 'position-vector-quiz',
    conceptName: 'Position Vector Quiz',
    type: 'learning',
    description: 'Quiz on defining position vectors and coordinates.'
  }
];

const quizQuestions = [
  {
    question: 'A position vector starts at the ______ and ends at the ______.',
    options: [
      'Particle, Origin',
      'Origin, Particle',
      'X-axis, Y-axis',
      'Y-axis, X-axis'
    ],
    correctIndex: 1,
    explanation: 'By definition, a position vector always originates from the Origin (0,0) and points to the location of the particle.'
  },
  {
    question: 'If a particle is at coordinates (3, 4), what is its position vector?',
    options: [
      '3i + 4j',
      '4i + 3j',
      '3i - 4j',
      '7k',
    ],
    correctIndex: 0,
    explanation: 'The x-coordinate (3) corresponds to the i-hat component, and the y-coordinate (4) corresponds to the j-hat component.'
  }
];

// --- INTERACTIVE COMPONENT ---

const PositionVectorPlayground = () => {
  const [xVal, setXVal] = useState(4);
  const [yVal, setYVal] = useState(3);

  // Calculate angle for the arrow rotation
  // Math.atan2(y, x) returns radians. Convert to degrees.
  // Note: In CSS rotation, 0deg is usually right (positive x).
  // Depending on how the arrow div is drawn, we might need adjustment.
  // Assuming arrow points Right by default.
  // Y in CSS (top-down) is opposite to Cartesian Y (bottom-up).
  // We handle this by using `bottom` for positioning, so Cartesian Y logic works.
  const angle = Math.atan2(yVal, xVal) * (180 / Math.PI);
  const magnitude = Math.sqrt(xVal * xVal + yVal * yVal);

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner">
        
        {/* Graph Container */}
        <div className="relative w-full aspect-square max-w-[400px] bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 mb-6 mx-auto overflow-hidden shadow-sm">
          
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20" 
               style={{
                 backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', 
                 backgroundSize: '10% 10%',
                 backgroundPosition: 'center'
               }}>
          </div>

          {/* Axes */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-800 dark:bg-slate-400"></div> {/* Y Axis */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-800 dark:bg-slate-400"></div> {/* X Axis */}

          {/* Origin Label */}
          <div className="absolute top-[52%] left-[52%] text-[10px] text-slate-500 font-mono">O(0,0)</div>

          {/* The Vector Visuals */}
          <div className="absolute inset-0 pointer-events-none">
            {/* We map Cartesian (-10 to 10) to Percentage (0% to 100%) */}
            {/* Center is 50%, 50% */}
            {/* Scale: 1 unit = 5% */}
            
            {/* Position of point P */}
            <motion.div 
              className="absolute w-4 h-4 bg-blue-600 rounded-full z-20 shadow-md border-2 border-white"
              animate={{
                left: `${50 + (xVal * 5)}%`,
                bottom: `${50 + (yVal * 5)}%`
              }}
              style={{ transform: 'translate(-50%, 50%)' }} // Center the dot
            />

            {/* The Position Vector Arrow (Line) */}
            {/* We use SVG for clean lines connecting origin to point */}
            <svg className="absolute inset-0 w-full h-full z-10 overflow-visible">
               <line 
                 x1="50%" 
                 y1="50%" 
                 x2={`${50 + (xVal * 5)}%`} 
                 y2={`${50 - (yVal * 5)}%`} // SVG Y is down, so we subtract
                 stroke="#2563eb" 
                 strokeWidth="3"
                 markerEnd="url(#arrowhead)"
               />
               <defs>
                 <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                   <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb" />
                 </marker>
               </defs>
            </svg>

            {/* Component Dashed Lines */}
            <motion.div 
              className="absolute border-l-2 border-dashed border-red-400 opacity-60"
              animate={{
                left: `${50 + (xVal * 5)}%`,
                height: `${Math.abs(yVal * 5)}%`,
                bottom: yVal >= 0 ? '50%' : `${50 + (yVal * 5)}%`
              }}
              style={{ width: 0 }}
            />
            <motion.div 
              className="absolute border-b-2 border-dashed border-green-400 opacity-60"
              animate={{
                bottom: `${50 + (yVal * 5)}%`,
                width: `${Math.abs(xVal * 5)}%`,
                left: xVal >= 0 ? '50%' : `${50 + (xVal * 5)}%`
              }}
              style={{ height: 0 }}
            />
          </div>

          {/* Labels for Point P */}
          <motion.div
             className="absolute bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-xs font-bold shadow text-blue-600 border border-blue-100 dark:border-slate-700"
             animate={{
                left: `${50 + (xVal * 5)}%`,
                bottom: `${50 + (yVal * 5) + 5}%` // Float slightly above
             }}
             style={{ transform: 'translateX(-50%)' }}
          >
             P({xVal}, {yVal})
          </motion.div>

        </div>

        {/* Controls */}
        <div className="w-full max-w-[400px] mx-auto space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            {/* X Control */}
            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
               <label className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Coordinate x</span>
                  <span className="text-red-500">{xVal}</span>
               </label>
               <input 
                 type="range" min="-8" max="8" step="1"
                 value={xVal} onChange={(e) => setXVal(parseInt(e.target.value))}
                 className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
               />
            </div>

            {/* Y Control */}
            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
               <label className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Coordinate y</span>
                  <span className="text-green-500">{yVal}</span>
               </label>
               <input 
                 type="range" min="-8" max="8" step="1"
                 value={yVal} onChange={(e) => setYVal(parseInt(e.target.value))}
                 className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-500"
               />
            </div>
          </div>

          {/* Result Display */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
             <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-semibold uppercase tracking-wider">Vector Notation</p>
             <div className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                <InlineMath math={`\\vec{r} = ${xVal}\\hat{i} ${yVal >= 0 ? '+' : ''} ${yVal}\\hat{j}`} />
             </div>
             <p className="text-xs text-slate-400 mt-2">
               Magnitude: <InlineMath math={`|\\vec{r}| = \\sqrt{${xVal}^2 + ${yVal}^2} \\approx ${magnitude.toFixed(1)}`} />
             </p>
          </div>

        </div>

      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide2() {
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
        interactionId: 'position-vector-quiz',
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

  // --- CONTENT RENDERING ---

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Position Vectors</h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            
            <p>
              To describe the motion of an object in a plane, we first need to define its location. We do this using a <strong>Position Vector</strong>.
            </p>

            <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-base text-slate-700 dark:text-slate-300 mb-2 font-bold">
                 Definition:
              </p>
              <p className="text-sm mb-3">
                 A vector drawn from the origin <InlineMath math="O(0,0)" /> to the position of the particle <InlineMath math="P(x,y)" /> at any given instant.
              </p>
              <div className="text-center bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-600">
                 <BlockMath math="\vec{r} = x\hat{i} + y\hat{j}" />
              </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-bold text-slate-800 dark:text-white text-base">Key Components:</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold mt-1">x</span>
                        <span className="text-sm">The horizontal coordinate. Associated with the unit vector <InlineMath math="\hat{i}" />.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold mt-1">y</span>
                        <span className="text-sm">The vertical coordinate. Associated with the unit vector <InlineMath math="\hat{j}" />.</span>
                    </li>
                </ul>
            </div>

            <p className="text-sm italic text-slate-500 border-t border-slate-200 pt-4 mt-2">
               Note: As the particle moves, x and y become functions of time: <InlineMath math="\vec{r}(t) = x(t)\hat{i} + y(t)\hat{j}" />.
            </p>

          </div>
        </div>
        
        {/* Right Panel: Interactive */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📍 Visualize
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
                    <div className="flex-grow flex flex-col items-center justify-center h-full">
                         <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive Position Vector</h3>
                         <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Adjust x and y coordinates to move point P.</p>
                         <PositionVectorPlayground />
                    </div>
                ) : (
                    // Quiz Layout
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
}