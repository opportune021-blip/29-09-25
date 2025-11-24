import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- 1. DATA & CONFIG ---

const interactions: Interaction[] = [
  {
    id: 'vel-graphs-review-learning',
    conceptId: 'vel-graphs-review',
    conceptName: 'Velocity Graphs Review',
    type: 'learning',
    description: 'Review of graph-based motion concepts.'
  },
  {
    id: 'vel-graphs-review-quiz',
    conceptId: 'vel-graphs-review-quiz',
    conceptName: 'Graphs Review Quiz',
    type: 'learning',
    description: 'End-of-submodule quiz.'
  }
];

const quizQuestions = [
  {
    question: 'Which property of a position-time (x-t) graph gives velocity?',
    options: ['The Area under the curve', 'The y-intercept', 'The Slope', 'The curvature'],
    correctIndex: 2,
    explanation: 'Slope = Rise/Run = Δx/Δt = Velocity.'
  },
  {
    question: 'The area under a velocity-time (v-t) graph represents:',
    options: ['Acceleration', 'Displacement', 'Instantaneous Speed', 'Force'],
    correctIndex: 1,
    explanation: 'Area = Height (v) × Width (t) = Displacement.'
  },
  {
    question: 'If a v-t graph shows a horizontal line at v = 5 m/s, the x-t graph will look like:',
    options: ['A horizontal line', 'A straight diagonal line', 'A parabola', 'A vertical line'],
    correctIndex: 1,
    explanation: 'Constant velocity (horizontal on v-t) means position changes at a constant rate (diagonal on x-t).'
  }
];

// --- 2. ANIMATION COMPONENT (The "Grand Unifier" Lab) ---

type MotionMode = 'steady' | 'accelerating';

const ReviewLab = () => {
  const [mode, setMode] = useState<MotionMode>('steady');
  const [t, setT] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const duration = 5; // seconds

  // --- PHYSICS ENGINE ---
  // Calculations based on mode
  const calculatePhysics = (time: number) => {
    const maxDist = 100;
    
    if (mode === 'steady') {
        // Constant Velocity
        const v = 20; // m/s
        const x = v * time;
        return { x, v };
    } else {
        // Constant Acceleration
        const a = 8; // m/s^2
        const v = a * time;
        const x = 0.5 * a * time * time;
        return { x, v };
    }
  };

  const { x, v } = calculatePhysics(t);

  // --- ANIMATION LOOP ---
  const animate = (timestamp: number) => {
    if (lastTimeRef.current === undefined) lastTimeRef.current = timestamp;
    const dt = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    setT(prev => {
      const next = prev + dt;
      if (next >= duration) {
        setIsPlaying(false);
        return duration;
      }
      return next;
    });
    
    if (isPlaying) requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
        lastTimeRef.current = undefined;
        requestRef.current = requestAnimationFrame(animate);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isPlaying]);

  const reset = () => {
    setIsPlaying(false);
    setT(0);
  };

  useEffect(() => { reset(); }, [mode]);

  // --- SVG GENERATORS ---
  // We need to generate path strings for both graphs
  const generatePaths = () => {
     let xtPath = "M 0 100"; // Start at bottom-left (visual coordinates)
     let vtPath = "M 0 100";
     let areaPath = "M 0 100";
     
     const steps = 50;
     for(let i=0; i<=steps; i++) {
        const simTime = (i/steps) * duration;
        const phys = calculatePhysics(simTime);
        
        // Map to SVG 100x100 box
        const svgX = (simTime / duration) * 100;
        
        // Map X-T: Max pos is 100m
        const svgY_xt = 100 - (phys.x / 100) * 100;
        xtPath += ` L ${svgX} ${svgY_xt}`;

        // Map V-T: Max vel is 40 m/s (accel mode peaks at 40)
        const svgY_vt = 100 - (phys.v / 40) * 100;
        vtPath += ` L ${svgX} ${svgY_vt}`;

        // Build area polygon for current time t
        if (simTime <= t) {
            areaPath += ` L ${svgX} ${svgY_vt}`;
        }
     }
     // Close area path
     if (t > 0) {
         const currentSvgX = (t/duration) * 100;
         areaPath += ` L ${currentSvgX} 100 Z`;
     } else {
         areaPath = "M 0 100 Z";
     }

     return { xtPath, vtPath, areaPath };
  };

  const paths = generatePaths();

  return (
    <div className="flex flex-col h-full w-full gap-4">
      
      {/* 1. CONTROLS */}
      <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-lg flex text-sm font-bold">
        <button 
            onClick={() => setMode('steady')}
            className={`flex-1 py-2 rounded-md transition-all ${mode === 'steady' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
        >
            Steady Speed
        </button>
        <button 
            onClick={() => setMode('accelerating')}
            className={`flex-1 py-2 rounded-md transition-all ${mode === 'accelerating' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500'}`}
        >
            Accelerating
        </button>
      </div>

      {/* 2. SIMULATION (Shared Reality) */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 relative h-20 overflow-hidden">
        <div className="absolute top-2 left-2 text-[9px] font-bold text-slate-400 uppercase">Physical Motion</div>
        <div className="absolute bottom-2 left-2 right-2 h-1 bg-slate-200 rounded"></div>
        <motion.div 
            className="absolute bottom-1 text-2xl"
            style={{ left: `${(x / 100) * 90}%` }} // Map 0-100m to screen %
        >
            🏎️
        </motion.div>
      </div>

      {/* 3. DUAL GRAPHS (The Translator) */}
      <div className="flex-grow grid grid-cols-2 gap-4">
         
         {/* X-T Graph */}
         <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-2 relative flex flex-col">
            <div className="text-[10px] font-bold text-blue-600 uppercase mb-1 text-center">Position vs Time</div>
            <div className="flex-grow relative">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* Axes */}
                    <line x1="0" y1="100" x2="100" y2="100" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="0" y1="0" x2="0" y2="100" stroke="#cbd5e1" strokeWidth="2" />
                    
                    {/* The Curve */}
                    <path d={paths.xtPath} fill="none" stroke="#3b82f6" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                    
                    {/* Current Point */}
                    <circle cx={(t/duration)*100} cy={100 - (x/100)*100} r="3" fill="white" stroke="#3b82f6" strokeWidth="2" />
                </svg>
                <div className="absolute bottom-2 right-2 text-[10px] bg-white/80 px-1 rounded text-blue-700 font-bold">
                    Focus: SLOPE
                </div>
            </div>
         </div>

         {/* V-T Graph */}
         <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800 rounded-xl p-2 relative flex flex-col">
            <div className="text-[10px] font-bold text-purple-600 uppercase mb-1 text-center">Velocity vs Time</div>
            <div className="flex-grow relative">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* Axes */}
                    <line x1="0" y1="100" x2="100" y2="100" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="0" y1="0" x2="0" y2="100" stroke="#cbd5e1" strokeWidth="2" />

                    {/* Area Shader */}
                    <path d={paths.areaPath} fill="rgba(147, 51, 234, 0.3)" stroke="none" />

                    {/* The Line */}
                    <path d={paths.vtPath} fill="none" stroke="#9333ea" strokeWidth="3" vectorEffect="non-scaling-stroke" />

                    {/* Current Point */}
                    <circle cx={(t/duration)*100} cy={100 - (v/40)*100} r="3" fill="white" stroke="#9333ea" strokeWidth="2" />
                </svg>
                <div className="absolute bottom-2 right-2 text-[10px] bg-white/80 px-1 rounded text-purple-700 font-bold">
                    Focus: AREA
                </div>
            </div>
         </div>

      </div>

      {/* PLAYBACK */}
      <div className="flex gap-2">
         <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex-1 py-2 rounded font-bold text-white text-sm ${isPlaying ? 'bg-slate-400' : 'bg-slate-800 dark:bg-white dark:text-slate-900'}`}
         >
            {isPlaying ? 'Pause' : t >= duration ? 'Replay' : 'Play Comparison'}
         </button>
         <button onClick={reset} className="px-4 bg-slate-200 rounded hover:bg-slate-300">↺</button>
      </div>

    </div>
  );
};

// --- 3. MAIN COMPONENT ---

export default function Slide5() {
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

  // Quiz Logic
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
        interactionId: 'vel-graphs-review-quiz',
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
      slideId="velocity-graphs-review"
      slideTitle="Velocity & Graphs Review"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={localInteractions}
    >
      <div className="w-full p-4 sm:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT: SUMMARY THEORY */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Grand Summary 
 
</h2>
            
            <div className="space-y-6">
                {/* Concept 1 */}
                <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800">
                    <div className="text-3xl">📈</div>
                    <div>
                        <h3 className="font-bold text-blue-800 dark:text-blue-200">Position-Time (x-t)</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            The <strong className="text-blue-600">SLOPE</strong> tells you the Velocity.
                        </p>
                        <ul className="text-xs text-slate-500 mt-2 list-disc ml-4">
                            <li>Steep slope = Fast</li>
                            <li>Flat slope = Stopped</li>
                        </ul>
                    </div>
                </div>

                {/* Concept 2 */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800">
                    <div className="text-3xl">📐</div>
                    <div>
                        <h3 className="font-bold text-purple-800 dark:text-purple-200">Velocity-Time (v-t)</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            The <strong className="text-purple-600">AREA</strong> tells you the Displacement.
                        </p>
                        <ul className="text-xs text-slate-500 mt-2 list-disc ml-4">
                            <li>Area above axis = Moving Forward</li>
                            <li>Area below axis = Moving Backward</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT: LAB & QUIZ */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full min-h-[500px] flex flex-col overflow-hidden">
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button onClick={() => setViewMode('explore')} className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-slate-100 text-slate-900 border-b-2 border-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}>
                    🔬 Comparison Lab
                </button>
                <button onClick={() => setViewMode('quiz')} className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-slate-100 text-slate-900 border-b-2 border-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}>
                    📝 Final Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
                        <ReviewLab />
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
                                        <button onClick={showExplanation ? handleNextQuestion : handleSubmitAnswer} disabled={selectedOption === null} className="w-full py-3 bg-slate-800 text-white rounded font-bold hover:bg-slate-700 disabled:opacity-50">
                                            {showExplanation ? (currentQIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish') : 'Check Answer'}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="results" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                                    <div className="text-5xl mb-2">🏆</div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">All Done!</h3>
                                    <p className="mb-4 text-slate-600">Score: {score} / {quizQuestions.length}</p>
                                    <button onClick={resetQuiz} className="px-6 py-2 bg-slate-800 text-white rounded-full font-bold">Retry Quiz</button>
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