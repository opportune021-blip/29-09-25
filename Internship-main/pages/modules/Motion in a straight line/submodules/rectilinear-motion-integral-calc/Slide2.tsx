// Slide2.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'integral-example-learning',
    conceptId: 'integral-example',
    conceptName: 'Integral Example',
    type: 'learning',
    description: 'Interactive solver for the integral of v(t) = 4t.'
  },
  {
    id: 'integral-example-quiz',
    conceptId: 'integral-example-quiz',
    conceptName: 'Integral Example Quiz',
    type: 'learning',
    description: 'Quiz on calculating displacement via integration.'
  }
];

const quizQuestions = [
  {
    question: 'Calculate the displacement for v(t) = 3t² from t=0 to t=2.',
    options: ['4 m', '6 m', '8 m', '12 m'],
    correctIndex: 2,
    explanation: 's = ∫ 3t² dt = [t³]. Evaluated from 0 to 2: 2³ - 0³ = 8 m.'
  },
  {
    question: 'Geometrically, the integral ∫ 4t dt represents the area of which shape on a v-t graph?',
    options: ['A rectangle', 'A triangle', 'A parabola', 'A circle'],
    correctIndex: 1,
    explanation: 'v = 4t is a straight line passing through the origin. The area under it forms a triangle.'
  }
];

// --- ANIMATION COMPONENT (The Solver) ---

const IntegrationSolver = () => {
  const [tLimit, setTLimit] = useState(3); // The upper limit of integration (0 to 5)
  
  // Function: v = 4t
  const getV = (t: number) => 4 * t;
  
  // Integral: s = 2t^2
  const getS = (t: number) => 2 * t * t;

  // Graph Dimensions
  const MAX_T = 5;
  const MAX_V = 20; // 4 * 5 = 20
  const WIDTH = 250;
  const HEIGHT = 150;
  const PADDING = 30;

  // Coordinate mapping
  const scaleX = (val: number) => PADDING + (val / MAX_T) * WIDTH;
  const scaleY = (val: number) => (HEIGHT + PADDING) - (val / MAX_V) * HEIGHT;

  // Points for the shape
  const pOrigin = { x: scaleX(0), y: scaleY(0) };
  const pTop = { x: scaleX(tLimit), y: scaleY(getV(tLimit)) };
  const pBottom = { x: scaleX(tLimit), y: scaleY(0) };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Graph Visualization */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative mb-4 p-4">
        <div className="absolute top-2 left-4 text-xs font-bold text-slate-400 uppercase">Graph: v(t) = 4t</div>
        
        <div className="flex justify-center">
            <svg width={WIDTH + PADDING * 2} height={HEIGHT + PADDING * 2} className="overflow-visible">
                {/* Axes */}
                <line x1={scaleX(0)} y1={scaleY(0)} x2={scaleX(MAX_T)} y2={scaleY(0)} className="stroke-slate-300 dark:stroke-slate-600 stroke-2" />
                <line x1={scaleX(0)} y1={scaleY(0)} x2={scaleX(0)} y2={scaleY(MAX_V)} className="stroke-slate-300 dark:stroke-slate-600 stroke-2" />
                
                {/* Labels */}
                <text x={scaleX(MAX_T)} y={scaleY(0) + 15} className="text-[10px] fill-slate-500 font-bold" textAnchor="end">Time (s)</text>
                <text x={scaleX(0) - 10} y={scaleY(MAX_V)} className="text-[10px] fill-slate-500 font-bold" transform={`rotate(-90, ${scaleX(0)-10}, ${scaleY(MAX_V)})`}>Velocity (m/s)</text>

                {/* The Line Function */}
                <line 
                    x1={scaleX(0)} y1={scaleY(0)} 
                    x2={scaleX(MAX_T)} y2={scaleY(4 * MAX_T)} 
                    className="stroke-slate-300 dark:stroke-slate-700 stroke-1 dashed" 
                    strokeDasharray="4"
                />

                {/* The Integrated Area (Triangle) */}
                <motion.path 
                    d={`M ${pOrigin.x} ${pOrigin.y} L ${pTop.x} ${pTop.y} L ${pBottom.x} ${pBottom.y} Z`}
                    className="fill-blue-500/30 stroke-blue-500"
                    strokeWidth="2"
                />

                {/* Measurements */}
                <line x1={pBottom.x} y1={pBottom.y} x2={pTop.x} y2={pTop.y} className="stroke-blue-600 stroke-2" />
                <text x={pTop.x + 5} y={(pTop.y + pBottom.y) / 2} className="text-[10px] fill-blue-600 font-bold">v={getV(tLimit).toFixed(1)}</text>
                
                <text x={(scaleX(0) + pBottom.x) / 2} y={pBottom.y + 12} className="text-[10px] fill-slate-500 font-bold">t={tLimit}</text>

            </svg>
        </div>
      </div>

      {/* 2. The Calculus Calculation Board */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
          <div className="text-xs font-bold text-slate-400 uppercase mb-2 text-center">Step-by-Step Integration</div>
          
          <div className="space-y-2 font-mono text-sm sm:text-base text-slate-700 dark:text-slate-300">
              
              {/* Step 1: Setup */}
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-1">
                  <span>1. Setup Integral:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                      <InlineMath math={`s = \\int_{0}^{${tLimit}} 4t \\, dt`} />
                  </span>
              </div>

              {/* Step 2: Power Rule */}
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-1">
                  <span>2. Power Rule:</span>
                  <span>
                      <InlineMath math="\left[ \frac{4t^2}{2} \right]_{0}^{t}" /> = <InlineMath math="[2t^2]" />
                  </span>
              </div>

              {/* Step 3: Evaluation */}
              <div className="flex justify-between items-center bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  <span className="font-bold">3. Final Answer:</span>
                  <span className="font-bold text-lg text-blue-700 dark:text-blue-300">
                      2({tLimit})² = {getS(tLimit).toFixed(1)} m
                  </span>
              </div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="flex justify-between text-xs font-bold text-slate-500 mb-2">
              <span>Set Upper Limit (Time t)</span>
              <span className="text-blue-600">{tLimit} s</span>
          </label>
          <input 
              type="range" min="0" max="5" step="0.5"
              value={tLimit} 
              onChange={(e) => setTLimit(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0s</span>
              <span>Example (3s)</span>
              <span>5s</span>
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
        interactionId: 'integral-example-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Worked Example: Velocity to Displacement [Image of area under velocity time graph]</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2 uppercase text-xs tracking-wide">The Problem</h3>
                <p className="text-lg italic text-slate-700 dark:text-slate-300">
                    "An object's velocity is given by <InlineMath math="v(t) = 4t" />. Find the displacement from <InlineMath math="t=0" /> to <InlineMath math="t=3" /> seconds."
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-white border-b pb-1">The Solution</h4>
                
                <div className="flex gap-3 items-start">
                    <span className="font-mono text-blue-600 font-bold">1.</span>
                    <div className="text-sm">
                        Set up the definite integral:
                        <div className="my-2"><InlineMath math="s = \int_{0}^{3} 4t \, dt" /></div>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <span className="font-mono text-blue-600 font-bold">2.</span>
                    <div className="text-sm">
                        Apply the Power Rule (<InlineMath math="\int t^n dt = \frac{t^{n+1}}{n+1}" />):
                        <div className="my-2"><InlineMath math="s = [ \frac{4t^2}{2} ]_{0}^{3} = [ 2t^2 ]_{0}^{3}" /></div>
                    </div>
                </div>

                <div className="flex gap-3 items-start">
                    <span className="font-mono text-blue-600 font-bold">3.</span>
                    <div className="text-sm">
                        Evaluate limits:
                        <div className="my-2"><InlineMath math="s = 2(3)^2 - 2(0)^2 = 18 \text{ m}" /></div>
                    </div>
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
                    🧮 Interactive Solver
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Practice Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                     <IntegrationSolver />
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
      slideId="velocity-to-displacement"
      slideTitle="Worked Example: Velocity to Displacement"
      moduleId="motion-in-a-straight-line"
      submoduleId="rectilinear-motion-integral-calc"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}