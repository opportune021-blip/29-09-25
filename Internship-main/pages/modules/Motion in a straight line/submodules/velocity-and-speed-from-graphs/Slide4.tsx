import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- 1. DATA & CONFIG ---

const interactions: Interaction[] = [
  {
    id: 'area-vt-learning',
    conceptId: 'area-vt',
    conceptName: 'Area under V–T graph',
    type: 'learning',
    description: 'Understanding why distance = area under velocity graph.'
  },
  {
    id: 'area-vt-quiz',
    conceptId: 'area-vt-quiz',
    conceptName: 'V–T Area Quiz',
    type: 'learning',
    description: 'Quiz on V–T area concept.'
  }
];

const quizQuestions = [
  {
    question: 'The area under a Velocity-Time graph represents:',
    options: ['Acceleration', 'Force', 'Displacement', 'Speed'],
    correctIndex: 2,
    explanation: 'Velocity × Time = Displacement. Since Area = Height (v) × Width (t), the area represents displacement.'
  },
  {
    question: 'For an object moving with constant velocity, the shape of the area under the V-T graph is a:',
    options: ['Triangle', 'Rectangle', 'Parabola', 'Circle'],
    correctIndex: 1,
    explanation: 'Constant velocity is a horizontal line. The area under it forms a rectangle (Height v, Width t).'
  },
  {
    question: 'If the velocity increases linearly (constant acceleration), the area shape is a:',
    options: ['Rectangle', 'Triangle', 'Square', 'Ellipse'],
    correctIndex: 1,
    explanation: 'Linear velocity starts at 0 and goes up diagonally. The area under this diagonal line forms a triangle.'
  }
];

// --- 2. ANIMATION COMPONENT (Area Lab) ---

type VelocityMode = 'constant' | 'accelerating';

const AreaGraphLab = () => {
  const [mode, setMode] = useState<VelocityMode>('constant');
  const [t, setT] = useState(5); // Time (0-10s)
  
  // --- PHYSICS ENGINE ---
  // Max limits for visualization
  const maxTime = 10; 
  const maxVel = 10; 
  
  // Mode Configs
  const constVelocity = 6; // m/s
  const accelRate = 1;     // m/s^2 (so at t=10, v=10)

  // Current Values
  const v_current = mode === 'constant' ? constVelocity : accelRate * t;
  
  // Area Calculation (Displacement)
  const displacement = mode === 'constant' 
    ? constVelocity * t  // Rectangle Area: w * h
    : 0.5 * t * v_current; // Triangle Area: 0.5 * b * h

  // SVG Scales (300x200)
  const svgW = 300;
  const svgH = 200;
  
  const mapX = (val: number) => (val / maxTime) * svgW;
  const mapY = (val: number) => svgH - (val / maxVel) * svgH;

  // Graph Points
  const startY = mapY(mode === 'constant' ? constVelocity : 0);
  const endX = mapX(t);
  const endY = mapY(v_current);
  const zeroY = mapY(0);

  // Shaded Path Definition
  let areaPath = "";
  if (mode === 'constant') {
    // Rectangle
    areaPath = `M 0 ${zeroY} L 0 ${startY} L ${endX} ${startY} L ${endX} ${zeroY} Z`;
  } else {
    // Triangle
    areaPath = `M 0 ${zeroY} L ${endX} ${endY} L ${endX} ${zeroY} Z`;
  }

  return (
    <div className="flex flex-col h-full w-full gap-4">
      
      {/* 1. SIMULATION VIEW (Car moving based on Area) */}
      <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 relative h-24 overflow-hidden">
        <div className="absolute top-2 left-2 text-[9px] font-bold text-slate-400 uppercase">Displacement = {displacement.toFixed(1)}m</div>
        
        {/* Ruler */}
        <div className="absolute bottom-0 left-0 right-0 h-6 border-t border-slate-300 dark:border-slate-600 flex justify-between px-2 text-[9px] text-slate-400">
            <span>0m</span><span>25m</span><span>50m</span><span>75m</span><span>100m</span>
        </div>

        {/* Car */}
        <motion.div 
            className="absolute bottom-6 text-3xl transition-transform will-change-transform"
            // Max displacement possible is 60m (const) or 50m (accel). Map roughly to % width
            style={{ left: `${(displacement / 60) * 90}%` }}
        >
            🚚
        </motion.div>
      </div>

      {/* 2. GRAPH VIEW (The Area) */}
      <div className="flex-grow bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 relative flex flex-col">
        <div className="absolute top-2 left-2 text-[9px] font-bold text-blue-600 uppercase">Velocity vs Time</div>
        
        {/* Axes Labels */}
        <div className="absolute bottom-2 right-2 text-xs font-bold text-slate-400">Time (s)</div>
        <div className="absolute top-2 left-2 mt-4 text-xs font-bold text-slate-400">Vel (m/s)</div>

        <div className="flex-grow relative w-full h-full flex items-center justify-center">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full overflow-visible">
                {/* Grid */}
                <line x1="0" y1={svgH} x2={svgW} y2={svgH} stroke="#94a3b8" strokeWidth="2" />
                <line x1="0" y1="0" x2="0" y2={svgH} stroke="#94a3b8" strokeWidth="2" />

                {/* The Line Function */}
                {mode === 'constant' ? (
                    <line x1="0" y1={startY} x2={svgW} y2={startY} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
                ) : (
                    <line x1="0" y1={svgH} x2={svgW} y2={0} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
                )}

                {/* THE SHADED AREA (Key Concept) */}
                <motion.path 
                    d={areaPath} 
                    fill="rgba(59, 130, 246, 0.2)" 
                    stroke="#3b82f6" 
                    strokeWidth="2"
                    initial={false}
                    animate={{ d: areaPath }}
                />
                
                {/* Current Point Marker */}
                <circle cx={endX} cy={endY} r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
                
                {/* Dashed Drop Lines */}
                <line x1={endX} y1={endY} x2={endX} y2={svgH} stroke="#3b82f6" strokeWidth="1" strokeDasharray="2" />
                
                {/* Math Label centered in area */}
                <foreignObject x={endX/2 - 40} y={svgH - 50} width="80" height="40">
                    <div className="text-center text-xs font-bold text-blue-600 bg-white/80 rounded px-1">
                        Area = {displacement.toFixed(0)}
                    </div>
                </foreignObject>
            </svg>
        </div>

        {/* Controls */}
        <div className="mt-4 space-y-4">
             {/* Mode Toggle */}
             <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                <button 
                    onClick={() => setMode('constant')}
                    className={`flex-1 py-1 text-xs font-bold rounded ${mode === 'constant' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}
                >
                    Constant Velocity
                </button>
                <button 
                    onClick={() => setMode('accelerating')}
                    className={`flex-1 py-1 text-xs font-bold rounded ${mode === 'accelerating' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}
                >
                    Constant Accel
                </button>
             </div>

             {/* Time Slider */}
             <div className="flex items-center gap-3">
                <span className="text-xs font-bold w-12">t = {t}s</span>
                <input 
                    type="range" min="0" max="10" step="0.1"
                    value={t} onChange={(e) => setT(parseFloat(e.target.value))}
                    className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
             </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---

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

  // Quiz Handlers
  const currentQuestion = quizQuestions[currentQIndex];
  const handleOptionClick = (index: number) => { if (!showExplanation) setSelectedOption(index); };
  const handleSubmitAnswer = () => {
    setShowExplanation(true);
    if (selectedOption === currentQuestion.correctIndex) setScore(prev => prev + 1);
  };
  const handleNextQuestion = () => {
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      handleInteractionComplete({
        interactionId: 'area-vt-quiz',
        value: (score + (selectedOption === currentQuestion.correctIndex ? 1 : 0)).toString(),
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

  return (
    <SlideComponentWrapper
      slideId="distance-under-velocity-graph"
      slideTitle="Area Under Velocity-Time Graph"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={localInteractions}
    >
      <div className="w-full p-4 sm:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT: THEORY */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Why Area = Displacement 
 
</h2>
            
            <div className="text-slate-600 dark:text-slate-400 space-y-4">
                <p>
                    We know the formula: <InlineMath math="Displacement = Velocity \times Time" />.
                </p>
                <p>
                    On a graph where the vertical axis is <strong>Velocity</strong> and horizontal is <strong>Time</strong>, this multiplication (<InlineMath math="v \times t" />) looks exactly like calculating the area of a rectangle (<InlineMath math="Height \times Width" />).
                </p>

                <div className="grid grid-cols-1 gap-3 mt-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-100 dark:border-blue-800">
                        <h4 className="font-bold text-sm text-blue-700 dark:text-blue-300 uppercase mb-1">Rectangle (Constant V)</h4>
                        <p className="text-xs"><InlineMath math="Area = v \times t" /></p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-100 dark:border-purple-800">
                        <h4 className="font-bold text-sm text-purple-700 dark:text-purple-300 uppercase mb-1">Triangle (Constant Accel)</h4>
                        <p className="text-xs"><InlineMath math="Area = \frac{1}{2} \times base \times height = \frac{1}{2} \times t \times v" /></p>
                    </div>
                </div>
                
                <p className="text-sm italic text-slate-500 mt-4">
                    *This rule works for any shape! Even curved lines use integration (sum of tiny rectangles) to find the total area.
                </p>
            </div>
        </div>

        {/* RIGHT: LAB & QUIZ */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full min-h-[500px] flex flex-col overflow-hidden">
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button onClick={() => setViewMode('explore')} className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50'}`}>
                    📐 Area Lab
                </button>
                <button onClick={() => setViewMode('quiz')} className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50'}`}>
                    📝 Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
                        <AreaGraphLab />
                    </TrackedInteraction>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center w-full">
                        <AnimatePresence mode="wait">
                            {!quizCompleted ? (
                                <motion.div 
                                    key="question"
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="w-full"
                                >
                                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-4 uppercase">
                                        <span>Question {currentQIndex + 1}/{quizQuestions.length}</span>
                                        <span>Score: {score}</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">{currentQuestion.question}</h3>
                                    <div className="space-y-2">
                                        {currentQuestion.options.map((opt, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => handleOptionClick(idx)}
                                                disabled={showExplanation}
                                                className={`w-full p-3 rounded text-left border transition-colors ${showExplanation ? (idx === currentQuestion.correctIndex ? 'bg-green-100 border-green-500' : idx === selectedOption ? 'bg-red-100 border-red-500' : 'opacity-50') : (selectedOption === idx ? 'bg-blue-100 border-blue-500' : 'hover:bg-slate-50 border-slate-200')}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                    {showExplanation && (
                                        <div className="mt-4 p-3 bg-slate-100 text-sm text-slate-600 rounded dark:bg-slate-700 dark:text-slate-300">
                                            <strong>Explanation:</strong> {currentQuestion.explanation}
                                        </div>
                                    )}
                                    <div className="mt-6">
                                        <button onClick={showExplanation ? handleNextQuestion : handleSubmitAnswer} disabled={selectedOption === null} className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-500 disabled:opacity-50">
                                            {showExplanation ? (currentQIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish') : 'Check Answer'}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="results" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                                    <div className="text-5xl mb-2">🎯</div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Quiz Complete</h3>
                                    <p className="mb-4 text-slate-600">Score: {score} / {quizQuestions.length}</p>
                                    <button onClick={resetQuiz} className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold">Retry</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
}