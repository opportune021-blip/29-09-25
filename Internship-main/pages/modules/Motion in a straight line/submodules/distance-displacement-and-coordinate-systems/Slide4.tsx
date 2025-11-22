// Slide4.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  { 
    id: 'worked-example-dd-learning', 
    conceptId: 'worked-example-dd', 
    conceptName: 'Worked example DD', 
    type: 'learning', 
    description: 'Interactive slope calculator for Position-Time graphs.' 
  },
  { 
    id: 'worked-example-dd-quiz', 
    conceptId: 'worked-example-dd-quiz', 
    conceptName: 'Worked example quiz', 
    type: 'learning', 
    description: 'Quiz on calculating velocity from graph data.' 
  }
];

const quizQuestions = [
  {
    question: 'From the graph, an object moves from x = 0 m at t = 0 s to x = 10 m at t = 2 s. What is the average velocity?',
    options: ['5 m/s', '2 m/s', '20 m/s', '0 m/s'],
    correctIndex: 0,
    explanation: 'Average Velocity = Change in Position / Change in Time = (10 - 0) / (2 - 0) = 5 m/s.'
  },
  {
    question: 'Geometrically, the Average Velocity between two points on a position-time graph corresponds to:',
    options: ['The area under the curve', 'The slope of the secant line connecting the points', 'The y-intercept', 'The curvature'],
    correctIndex: 1,
    explanation: 'The slope of the line connecting two points (secant line) represents Δx/Δt, which is average velocity.'
  }
];

// --- ANIMATION COMPONENT (The Solver) ---

const GraphSlopeSolver = () => {
  // State: Two time points
  const [t1, setT1] = useState(2);
  const [t2, setT2] = useState(8);

  // Function: x(t) = 0.5 * t^2 (A simple curve to show secant logic)
  const getPos = (t: number) => 0.5 * t * t;

  // Graph Constants
  const MAX_T = 10;
  const MAX_X = 50; // 0.5 * 10^2 = 50

  // Calculations
  const x1 = getPos(t1);
  const x2 = getPos(t2);
  const deltaT = t2 - t1;
  const deltaX = x2 - x1;
  const avgVel = deltaT !== 0 ? deltaX / deltaT : 0;

  // SVG Helpers
  const toSvgX = (t: number) => (t / MAX_T) * 100;
  const toSvgY = (x: number) => 100 - (x / MAX_X) * 100;

  // Generate Curve Path
  const curvePath = Array.from({ length: 51 }, (_, i) => {
    const t = (i / 50) * MAX_T;
    return `${toSvgX(t)},${toSvgY(getPos(t))}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center w-full h-full">
      
      {/* 1. The Interactive Graph */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4 shadow-sm relative h-64">
        <h4 className="absolute top-2 left-4 text-xs font-bold text-slate-400 uppercase">Position vs Time</h4>
        
        <div className="relative w-full h-full pl-8 pb-6 pt-4 pr-4">
           {/* Axis Labels */}
           <div className="absolute -left-2 top-1/2 -rotate-90 text-[10px] text-slate-500 font-bold">Position (m)</div>
           <div className="absolute bottom-0 left-1/2 text-[10px] text-slate-500 font-bold">Time (s)</div>

           <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid */}
              <line x1="0" y1="100" x2="100" y2="100" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2="100" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.5" />

              {/* The Function Curve */}
              <polyline 
                points={curvePath} 
                fill="none" 
                stroke="currentColor" 
                className="text-slate-300 dark:text-slate-700" 
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />

              {/* The Secant Line (Slope) */}
              <line 
                x1={toSvgX(t1)} y1={toSvgY(x1)} 
                x2={toSvgX(t2)} y2={toSvgY(x2)} 
                className="stroke-blue-500" 
                strokeWidth="1"
                strokeDasharray="2,1"
                vectorEffect="non-scaling-stroke"
              />

              {/* Rise and Run Indicators (The Triangle) */}
              {t1 !== t2 && (
                  <>
                    {/* Run (Delta T) */}
                    <line 
                        x1={toSvgX(t1)} y1={toSvgY(x1)} 
                        x2={toSvgX(t2)} y2={toSvgY(x1)} 
                        className="stroke-purple-500" strokeWidth="1" vectorEffect="non-scaling-stroke"
                    />
                    {/* Rise (Delta X) */}
                    <line 
                        x1={toSvgX(t2)} y1={toSvgY(x1)} 
                        x2={toSvgX(t2)} y2={toSvgY(x2)} 
                        className="stroke-green-500" strokeWidth="1" vectorEffect="non-scaling-stroke"
                    />
                  </>
              )}

              {/* Points */}
              <circle cx={toSvgX(t1)} cy={toSvgY(x1)} r="2" className="fill-purple-600 cursor-pointer" />
              <circle cx={toSvgX(t2)} cy={toSvgY(x2)} r="2" className="fill-green-600 cursor-pointer" />

           </svg>
        </div>
      </div>

      {/* 2. Calculation Dashboard */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
          <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-300 dark:divide-slate-600">
             
             {/* Delta T */}
             <div className="px-2">
                 <div className="text-[10px] uppercase font-bold text-purple-600 mb-1">Run (<InlineMath math="\Delta t" />)</div>
                 <div className="font-mono text-sm text-slate-700 dark:text-slate-300">
                    {t2}s - {t1}s
                 </div>
                 <div className="font-bold text-lg text-purple-600">{deltaT.toFixed(1)} s</div>
             </div>

             {/* Delta X */}
             <div className="px-2">
                 <div className="text-[10px] uppercase font-bold text-green-600 mb-1">Rise (<InlineMath math="\Delta x" />)</div>
                 <div className="font-mono text-sm text-slate-700 dark:text-slate-300">
                    {x2.toFixed(1)}m - {x1.toFixed(1)}m
                 </div>
                 <div className="font-bold text-lg text-green-600">{deltaX.toFixed(1)} m</div>
             </div>

             {/* Result */}
             <div className="px-2">
                 <div className="text-[10px] uppercase font-bold text-blue-600 mb-1">Avg Velocity</div>
                 <div className="font-mono text-sm text-slate-700 dark:text-slate-300">
                    Rise / Run
                 </div>
                 <div className="font-bold text-lg text-blue-600">{avgVel.toFixed(2)} m/s</div>
             </div>

          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="mb-4">
              <label className="flex justify-between text-xs font-bold text-purple-600 mb-2">
                  <span>Time Point 1 (<InlineMath math="t_1" />)</span>
                  <span>{t1} s</span>
              </label>
              <input 
                  type="range" min="0" max="10" step="0.5"
                  value={t1} 
                  onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val !== t2) setT1(val); 
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
          </div>

          <div>
              <label className="flex justify-between text-xs font-bold text-green-600 mb-2">
                  <span>Time Point 2 (<InlineMath math="t_2" />)</span>
                  <span>{t2} s</span>
              </label>
              <input 
                  type="range" min="0" max="10" step="0.5"
                  value={t2} 
                  onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val !== t1) setT2(val);
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
          </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide4() {
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
        interactionId: 'worked-example-dd-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Worked Example: Calculating Velocity from Graphs</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              To find average velocity from a position-time graph, we essentially calculate the <strong>slope</strong> of the line connecting two points.
            </p>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
              <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">The 3-Step Process</h4>
              
              <ol className="space-y-4">
                <li className="flex gap-3">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                    <div>
                        <strong className="block text-sm text-slate-800 dark:text-slate-200">Identify Points</strong>
                        <span className="text-sm">Pick two points on the graph: <InlineMath math="(t_1, x_1)" /> and <InlineMath math="(t_2, x_2)" />.</span>
                    </div>
                </li>
                <li className="flex gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                    <div>
                        <strong className="block text-sm text-slate-800 dark:text-slate-200">Calculate Differences</strong>
                        <span className="text-sm">Find the "Rise" (<InlineMath math="\Delta x = x_2 - x_1" />) and the "Run" (<InlineMath math="\Delta t = t_2 - t_1" />).</span>
                    </div>
                </li>
                <li className="flex gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                    <div>
                        <strong className="block text-sm text-slate-800 dark:text-slate-200">Divide</strong>
                        <span className="text-sm">
                             <InlineMath math="v_{avg} = \frac{\Delta x}{\Delta t}" />
                        </span>
                    </div>
                </li>
              </ol>
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
                    📐 Slope Calculator
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
                     <GraphSlopeSolver />
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
      slideId="worked-example-distance-displacement"
      slideTitle="Worked Example: Graphs"
      moduleId="motion-in-a-straight-line"
      submoduleId="distance-displacement-and-coordinate-systems"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}