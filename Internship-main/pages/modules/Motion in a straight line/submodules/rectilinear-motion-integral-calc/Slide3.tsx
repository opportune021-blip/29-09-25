// Slide3.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'rectilinear-integral-review-learning',
    conceptId: 'rectilinear-integral-review',
    conceptName: 'Integral Motion Review',
    type: 'learning',
    description: 'Interactive dashboard connecting a(t), v(t), and s(t) graphs via calculus.'
  },
  {
    id: 'rectilinear-integral-review-quiz',
    conceptId: 'rectilinear-integral-review-quiz',
    conceptName: 'Integral Review Quiz',
    type: 'learning',
    description: 'Quiz on the relationships between kinematic quantities using calculus.'
  }
];

const quizQuestions = [
  {
    question: 'If you integrate the acceleration function a(t) with respect to time, what do you get?',
    options: ['Position s(t)', 'Velocity v(t)', 'Jerk j(t)', 'Force F(t)'],
    correctIndex: 1,
    explanation: 'Acceleration is the derivative of velocity, so the integral of acceleration is velocity: v = ∫ a dt.'
  },
  {
    question: 'Geometrically, the displacement between t=0 and t=5 is equal to:',
    options: [
      'The slope of the position graph at t=5',
      'The height of the velocity graph at t=5',
      'The area under the velocity-time graph from t=0 to t=5',
      'The slope of the acceleration graph'
    ],
    correctIndex: 2,
    explanation: 'The definite integral ∫ v dt corresponds to the area under the curve, which represents displacement.'
  }
];

// --- ANIMATION COMPONENT (The Calculus Stack) ---

type MotionScenario = 'const_v' | 'const_a' | 'variable';

const CalculusMotionStack = () => {
  // State
  const [scenario, setScenario] = useState<MotionScenario>('const_a');
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Constants
  const MAX_T = 10;
  const GRAPH_WIDTH = 220;
  const GRAPH_HEIGHT = 60;
  const PADDING = 10;

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // --- PHYSICS ENGINES ---
  // Returns { a, v, s } at time t for the current scenario
  const getPhysics = (t: number) => {
    switch (scenario) {
      case 'const_v': // Constant Velocity
        return { a: 0, v: 3, s: 3 * t };
      case 'const_a': // Constant Acceleration
        return { a: 1, v: t, s: 0.5 * t * t };
      case 'variable': // Variable Accel (Ramp up then down)
        // a(t) = 2 - 0.4t
        // v(t) = 2t - 0.2t^2
        // s(t) = t^2 - (0.2/3)t^3
        return { 
            a: 2 - 0.4 * t, 
            v: 2 * t - 0.2 * t * t, 
            s: t * t - (0.2 / 3) * t * t * t 
        };
      default: return { a: 0, v: 0, s: 0 };
    }
  };

  // Scales
  // Pre-calculate max values for scaling
  const getMaxValues = () => {
      switch(scenario) {
          case 'const_v': return { maxA: 2, maxV: 5, maxS: 35 };
          case 'const_a': return { maxA: 2, maxV: 12, maxS: 60 };
          case 'variable': return { maxA: 3, maxV: 6, maxS: 40 };
          default: return { maxA: 1, maxV: 1, maxS: 1 };
      }
  };
  const { maxA, maxV, maxS } = getMaxValues();

  // Helper to map to SVG coordinates
  const toSvg = (val: number, maxVal: number, isBipolar = false) => {
      // if bipolar (like acceleration), 0 is in middle
      if (isBipolar) {
          return (GRAPH_HEIGHT / 2) - (val / maxVal) * (GRAPH_HEIGHT / 2);
      }
      return GRAPH_HEIGHT - (val / maxVal) * GRAPH_HEIGHT;
  };
  const toX = (t: number) => (t / MAX_T) * GRAPH_WIDTH;

  // Animation Loop
  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      setTime(prev => {
        const newTime = prev + deltaTime;
        if (newTime >= MAX_T) {
          setIsPlaying(false);
          return MAX_T;
        }
        return newTime;
      });
    }
    lastTimeRef.current = timestamp;
    if (isPlaying) requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
        requestRef.current = requestAnimationFrame(animate);
    } else {
        lastTimeRef.current = undefined;
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isPlaying]);

  const handleScenarioChange = (s: MotionScenario) => {
      setScenario(s);
      setTime(0);
      setIsPlaying(true);
  };

  // --- PATH GENERATION ---
  const generatePath = (type: 'a' | 'v' | 's', currentLimit: number) => {
      let path = `M 0 ${type === 'a' ? GRAPH_HEIGHT/2 : GRAPH_HEIGHT} `;
      const step = 0.2;
      for(let t=0; t<=currentLimit; t+=step) {
          const vals = getPhysics(t);
          const y = toSvg(vals[type as keyof typeof vals], type === 'a' ? maxA : type === 'v' ? maxV : maxS, type === 'a');
          path += `L ${toX(t)} ${y} `;
      }
      // For Area shading (only if needed)
      if (type === 'v') {
          path += `L ${toX(currentLimit)} ${GRAPH_HEIGHT} L 0 ${GRAPH_HEIGHT} Z`;
      }
      return path;
  };

  // Generate full background curves
  const fullPathA = generatePath('a', MAX_T); 
  
  // Velocity is special: we want to show the AREA filling up
  const areaPathV = generatePath('v', time); // Polygon for area
  // We also need the line itself for the full preview
  let linePathV = `M 0 ${GRAPH_HEIGHT} `;
  for(let t=0; t<=MAX_T; t+=0.2) {
      const vals = getPhysics(t);
      linePathV += `L ${toX(t)} ${toSvg(vals.v, maxV)} `;
  }

  let linePathS = `M 0 ${GRAPH_HEIGHT} `;
  for(let t=0; t<=MAX_T; t+=0.2) {
      const vals = getPhysics(t);
      linePathS += `L ${toX(t)} ${toSvg(vals.s, maxS)} `;
  }

  const currentVals = getPhysics(time);

  return (
    <div className="flex flex-col items-center w-full h-full">
      
      {/* 1. The Graphs Stack */}
      <div className="w-full grid grid-cols-1 gap-1 mb-4">
          
          {/* Acceleration Graph */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-2 relative h-20">
              <div className="absolute top-1 left-2 text-[9px] font-bold text-orange-500 uppercase">Acceleration a(t)</div>
              <div className="absolute top-1 right-2 text-[9px] font-mono text-orange-500">{currentVals.a.toFixed(2)} m/s²</div>
              <svg width="100%" height="100%" viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`} preserveAspectRatio="none" className="overflow-visible">
                  <line x1="0" y1={GRAPH_HEIGHT/2} x2={GRAPH_WIDTH} y2={GRAPH_HEIGHT/2} className="stroke-slate-200 dark:stroke-slate-700 stroke-1" />
                  {/* The Line */}
                  <path d={fullPathA} fill="none" stroke="orange" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  {/* Scan Line */}
                  <line x1={toX(time)} y1="0" x2={toX(time)} y2={GRAPH_HEIGHT} className="stroke-slate-400 stroke-1 dashed" strokeDasharray="2" />
                  {/* Dot */}
                  <circle cx={toX(time)} cy={toSvg(currentVals.a, maxA, true)} r="3" className="fill-orange-600" />
              </svg>
          </div>

          {/* Arrow indicating integration */}
          <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-full p-1 border border-white dark:border-slate-600">
                  <span className="text-[10px] font-bold text-slate-500">∫ dt</span>
              </div>
          </div>

          {/* Velocity Graph */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-2 relative h-20">
              <div className="absolute top-1 left-2 text-[9px] font-bold text-blue-500 uppercase">Velocity v(t)</div>
              <div className="absolute top-1 right-2 text-[9px] font-mono text-blue-500">{currentVals.v.toFixed(2)} m/s</div>
              <svg width="100%" height="100%" viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`} preserveAspectRatio="none" className="overflow-visible">
                  {/* Background Guide */}
                  <path d={linePathV} fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  {/* The Filled Area */}
                  <path d={areaPathV} className="fill-blue-500/30 stroke-blue-500" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  {/* Scan Line */}
                  <line x1={toX(time)} y1="0" x2={toX(time)} y2={GRAPH_HEIGHT} className="stroke-slate-400 stroke-1 dashed" strokeDasharray="2" />
                  <circle cx={toX(time)} cy={toSvg(currentVals.v, maxV)} r="3" className="fill-blue-600" />
              </svg>
          </div>

          {/* Arrow indicating integration */}
          <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-full p-1 border border-white dark:border-slate-600">
                  <span className="text-[10px] font-bold text-slate-500">∫ dt</span>
              </div>
          </div>

          {/* Position Graph */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-2 relative h-20">
              <div className="absolute top-1 left-2 text-[9px] font-bold text-green-500 uppercase">Position s(t)</div>
              <div className="absolute top-1 right-2 text-[9px] font-mono text-green-500">{currentVals.s.toFixed(2)} m</div>
              <svg width="100%" height="100%" viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`} preserveAspectRatio="none" className="overflow-visible">
                  <path d={linePathS} fill="none" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  {/* Only draw line up to current time */}
                  <path 
                    d={linePathS.split(' ').slice(0, Math.floor(time/0.2) + 2).join(' ')} // Rough slicing for effect
                    fill="none" stroke="green" strokeWidth="2" vectorEffect="non-scaling-stroke" 
                  />
                  <line x1={toX(time)} y1="0" x2={toX(time)} y2={GRAPH_HEIGHT} className="stroke-slate-400 stroke-1 dashed" strokeDasharray="2" />
                  <circle cx={toX(time)} cy={toSvg(currentVals.s, maxS)} r="3" className="fill-green-600" />
              </svg>
          </div>

      </div>

      {/* 2. Controls */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
          
          <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
              <span>Select Scenario:</span>
          </div>
          <div className="flex gap-2 mb-4">
              <button onClick={() => handleScenarioChange('const_v')} className={`flex-1 py-1 text-[10px] rounded border ${scenario === 'const_v' ? 'bg-white dark:bg-slate-600 border-blue-500 text-blue-600' : 'border-slate-300 text-slate-500'}`}>Const Vel</button>
              <button onClick={() => handleScenarioChange('const_a')} className={`flex-1 py-1 text-[10px] rounded border ${scenario === 'const_a' ? 'bg-white dark:bg-slate-600 border-blue-500 text-blue-600' : 'border-slate-300 text-slate-500'}`}>Const Accel</button>
              <button onClick={() => handleScenarioChange('variable')} className={`flex-1 py-1 text-[10px] rounded border ${scenario === 'variable' ? 'bg-white dark:bg-slate-600 border-blue-500 text-blue-600' : 'border-slate-300 text-slate-500'}`}>Variable</button>
          </div>

          <div className="flex items-center gap-2">
              <button 
                onClick={() => { if(time >= MAX_T) setTime(0); setIsPlaying(!isPlaying); }}
                className={`flex-1 py-2 rounded-lg font-bold text-white text-xs shadow-sm transition-all ${isPlaying ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                  {isPlaying ? '⏸ Pause' : '▶ Run Simulation'}
              </button>
              <input 
                  type="range" min="0" max={MAX_T} step="0.1"
                  value={time} 
                  onChange={(e) => { setTime(Number(e.target.value)); setIsPlaying(false); }}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
          </div>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide3() {
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
        interactionId: 'rectilinear-integral-review-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review: Calculus in Kinematics 

[Image of calculus kinematics formulas]
</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              Calculus provides the bridge between Position, Velocity, and Acceleration.
            </p>

            <div className="space-y-4">
                {/* Integration Card */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide mb-2">Integration (Area Under Curve)</h3>
                    <p className="text-sm mb-2">Moving "Up" the chain:</p>
                    <ul className="list-none text-sm space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">a(t)</span> 
                            <span>→</span>
                            <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">v(t)</span>
                            <span>: <InlineMath math="v = \int a \, dt" /></span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">v(t)</span> 
                            <span>→</span>
                            <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">s(t)</span>
                            <span>: <InlineMath math="s = \int v \, dt" /></span>
                        </li>
                    </ul>
                </div>

                {/* Differentiation Card */}
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide mb-2">Differentiation (Slope)</h3>
                    <p className="text-sm mb-2">Moving "Down" the chain:</p>
                    <ul className="list-none text-sm space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">s(t)</span> 
                            <span>→</span>
                            <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">v(t)</span>
                            <span>: <InlineMath math="v = \frac{ds}{dt}" /></span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">v(t)</span> 
                            <span>→</span>
                            <span className="font-mono bg-white dark:bg-slate-800 px-1 rounded border">a(t)</span>
                            <span>: <InlineMath math="a = \frac{dv}{dt}" /></span>
                        </li>
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
                    ∫ Calculus Stack
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Final Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                     <CalculusMotionStack />
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
      slideId="rectilinear-motion-review"
      slideTitle="Rectilinear motion (integral calc) review"
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