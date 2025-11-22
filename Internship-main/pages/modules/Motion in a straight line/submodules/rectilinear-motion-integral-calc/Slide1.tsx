// Slide1.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'calc-motion-integral-learning',
    conceptId: 'calc-motion-integral',
    conceptName: 'Motion with Integrals',
    type: 'learning',
    description: 'Interactive visualization showing displacement as the integral of velocity.'
  },
  {
    id: 'calc-motion-integral-quiz',
    conceptId: 'calc-motion-integral-quiz',
    conceptName: 'Integral Motion Quiz',
    type: 'learning',
    description: 'Quiz on calculus-based motion concepts.'
  }
];

const quizQuestions = [
  {
    question: 'Mathematically, displacement is defined as the integral of which quantity with respect to time?',
    options: ['Acceleration', 'Velocity', 'Position', 'Force'],
    correctIndex: 1,
    explanation: 'Displacement is the accumulation of velocity over time: s = ∫ v(t) dt.'
  },
  {
    question: 'On a velocity-time graph, what geometric feature represents the displacement?',
    options: ['The slope of the tangent', 'The y-intercept', 'The area under the curve', 'The curvature'],
    correctIndex: 2,
    explanation: 'The integral ∫ v dt corresponds geometrically to the area between the velocity curve and the time axis.'
  }
];

// --- ANIMATION COMPONENT (The Integral Visualizer) ---

const IntegralVisualizer = () => {
  // State
  const [time, setTime] = useState(0); // Current time cursor
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Constants
  const MAX_T = 10;
  
  // Physics Function: v(t) = 0.5t + 2 (Simple linear increasing velocity for clarity)
  // Or maybe a slight curve: v(t) = -0.1t^2 + 2t (Parabolic) -> Let's do Parabolic for "calculus" feel
  // v(t) = -0.4 * (t-5)^2 + 12  --> Upside down parabola peaking at t=5
  const getVelocity = (t: number) => {
     // Let's keep it simple but non-constant: v = 2 + 0.5 * t
     return 2 + 0.5 * t;
  };

  // Integral (Displacement): s(t) = 2t + 0.25t^2 (assuming s(0)=0)
  const getDisplacement = (t: number) => {
      return (2 * t) + (0.25 * t * t);
  };

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isAnimating) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      
      setTime(prev => {
        const newTime = prev + deltaTime;
        if (newTime >= MAX_T) {
          setIsAnimating(false);
          return MAX_T;
        }
        return newTime;
      });
    }
    lastTimeRef.current = timestamp;
    if (isAnimating) requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isAnimating) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isAnimating]);

  const handleReset = () => {
    setIsAnimating(false);
    setTime(0);
  };

  // SVG Calculation
  const GRAPH_WIDTH = 100;
  const GRAPH_HEIGHT = 60;
  const MAX_V = 10; // Max velocity to display

  // Generate points for the curve
  const points = [];
  for (let t = 0; t <= MAX_T; t += 0.5) {
      const x = (t / MAX_T) * GRAPH_WIDTH;
      const y = GRAPH_HEIGHT - (getVelocity(t) / MAX_V) * GRAPH_HEIGHT;
      points.push(`${x},${y}`);
  }
  const polylinePoints = points.join(' ');

  // Generate points for the shaded area
  const areaPoints = [];
  areaPoints.push(`0,${GRAPH_HEIGHT}`); // Bottom left
  for (let t = 0; t <= time; t += 0.1) {
      const x = (t / MAX_T) * GRAPH_WIDTH;
      const y = GRAPH_HEIGHT - (getVelocity(t) / MAX_V) * GRAPH_HEIGHT;
      areaPoints.push(`${x},${y}`);
  }
  // Close the shape
  areaPoints.push(`${(time / MAX_T) * GRAPH_WIDTH},${GRAPH_HEIGHT}`); // Bottom right current
  const polygonPoints = areaPoints.join(' ');

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Graph */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative mb-6 p-4 h-64">
        <div className="absolute top-2 left-4 text-xs font-bold text-slate-400 uppercase">Velocity vs Time</div>
        
        <div className="relative w-full h-full pl-8 pb-6">
           {/* Axis Labels */}
           <div className="absolute -left-4 top-1/2 -rotate-90 text-[10px] text-slate-500 font-bold">Velocity (m/s)</div>
           <div className="absolute bottom-0 left-1/2 text-[10px] text-slate-500 font-bold">Time (s)</div>

           <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`} preserveAspectRatio="none">
              {/* Grid */}
              <line x1="0" y1={GRAPH_HEIGHT} x2={GRAPH_WIDTH} y2={GRAPH_HEIGHT} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="0" y2={GRAPH_HEIGHT} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.5" />

              {/* The Curve */}
              <polyline 
                points={polylinePoints} 
                fill="none" 
                stroke="currentColor" 
                className="text-slate-400"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* The Integration Area */}
              <path 
                d={`M ${polygonPoints} Z`}
                className="fill-blue-500/30 stroke-blue-500"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Current Time Line */}
              <line 
                x1={(time / MAX_T) * GRAPH_WIDTH} 
                y1={0} 
                x2={(time / MAX_T) * GRAPH_WIDTH} 
                y2={GRAPH_HEIGHT} 
                className="stroke-red-500 stroke-dashed"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
           </svg>
        </div>
      </div>

      {/* 2. Real-time Math */}
      <div className="w-full grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-500">Current Velocity</div>
              <div className="text-lg font-mono font-bold text-slate-700 dark:text-slate-200">
                  v({time.toFixed(1)}) = {getVelocity(time).toFixed(1)}
              </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-700 text-center">
              <div className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-300">Integrated Displacement</div>
              <div className="text-xl font-mono font-bold text-blue-600 dark:text-blue-300">
                  ∫ v dt = {getDisplacement(time).toFixed(1)} m
              </div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="flex justify-between text-xs font-bold text-slate-500 mb-2">
              <span>Integrate to Time (t)</span>
              <span>{time.toFixed(1)} s</span>
          </label>
          <input 
              type="range" min="0" max={MAX_T} step="0.1"
              value={time} 
              onChange={(e) => { setTime(Number(e.target.value)); setIsAnimating(false); }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-4"
          />

          <div className="flex gap-2">
              <button 
                onClick={() => setIsAnimating(!isAnimating)}
                className={`flex-1 py-2 rounded-lg font-bold text-white text-sm shadow-sm transition-all ${isAnimating ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                  {isAnimating ? '⏸ Pause' : '▶️ Integrate'}
              </button>
              <button 
                onClick={handleReset}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg font-bold text-slate-600 dark:text-slate-300"
              >
                  🔄
              </button>
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
        interactionId: 'calc-motion-integral-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Motion with Integrals</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              When velocity is <strong>not constant</strong>, simple formulas like <InlineMath math="s = vt" /> don't work. We need Calculus.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 text-center">
              <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">The Integral Definition</h4>
              <div className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300">
                   <InlineMath math="s = \int_{t_1}^{t_2} v(t) \, dt" />
              </div>
              <p className="text-xs mt-3 text-slate-500 dark:text-slate-400">
                  "Displacement is the area under the Velocity-Time graph."
              </p>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">What does this mean?</h4>
                <p className="text-sm">
                    Imagine summing up millions of tiny rectangles where <InlineMath math="\text{width} = dt" /> (tiny time) and <InlineMath math="\text{height} = v" /> (velocity). Adding them all up gives the total distance.
                </p>
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
                    ∫ Visualizer
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
                     <IntegralVisualizer />
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
      slideId="motion-integral"
      slideTitle="Motion Problems with Integrals"
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