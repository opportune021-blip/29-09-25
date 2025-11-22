import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- 1. DATA & CONFIG ---

const interactions: Interaction[] = [
  {
    id: 'pos-time-learning',
    conceptId: 'pos-time',
    conceptName: 'Position-Time Graphs',
    type: 'learning',
    description: 'Understanding x–t graphs.'
  },
  {
    id: 'pos-time-quiz',
    conceptId: 'pos-time-quiz',
    conceptName: 'Position-Time Quiz',
    type: 'learning',
    description: 'Quiz on x–t graphs.'
  }
];

const quizQuestions = [
  {
    question: 'On a position-time graph, a horizontal line represents:',
    options: ['Constant positive velocity', 'Constant negative velocity', 'Zero velocity (Rest)', 'Infinite acceleration'],
    correctIndex: 2,
    explanation: 'A horizontal line means position (x) is not changing as time passes. Therefore, velocity is zero.'
  },
  {
    question: 'Which graph shape indicates constant non-zero velocity?',
    options: ['A straight diagonal line', 'A horizontal line', 'A curved parabola', 'A vertical line'],
    correctIndex: 0,
    explanation: 'A straight diagonal line has a constant slope. Since slope = velocity, the velocity is constant.'
  },
  {
    question: 'A steeper slope on an x-t graph indicates:',
    options: ['Lower speed', 'Higher speed', 'Reversing direction', 'No movement'],
    correctIndex: 1,
    explanation: 'The magnitude of the slope represents speed. Steeper slope = faster change in position = higher speed.'
  }
];

// --- 2. ANIMATION COMPONENT (Live Graphing Lab) ---

type MotionType = 'rest' | 'forward' | 'backward' | 'accel';

const GraphingLab = () => {
  // State
  const [motionType, setMotionType] = useState<MotionType>('forward');
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [pathPoints, setPathPoints] = useState<string>(""); // SVG Path command
  
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const duration = 5; // seconds

  // --- PHYSICS ENGINES ---
  const getPosition = (t: number, type: MotionType): number => {
    // t is 0 to 5
    switch (type) {
      case 'rest': return 50; // Stay at 50m
      case 'forward': return 10 + (t / duration) * 80; // 10m to 90m
      case 'backward': return 90 - (t / duration) * 80; // 90m to 10m
      case 'accel': return 10 + (t / duration) ** 2 * 80; // Parabolic curve
    }
  };

  const pos = getPosition(time, motionType);

  // --- ANIMATION LOOP ---
  const animate = (timestamp: number) => {
    if (lastTimeRef.current === undefined) {
      lastTimeRef.current = timestamp;
    }
    
    const dt = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    setTime(prevTime => {
      const newTime = prevTime + dt;
      
      if (newTime >= duration) {
        setIsPlaying(false);
        return duration;
      }

      // ADD POINT TO GRAPH TRAIL
      // Map time (0-5) to X (0-300px)
      // Map pos (0-100) to Y (150-0px) -- SVG Y is inverted
      const svgX = (newTime / duration) * 300;
      const currentPos = getPosition(newTime, motionType);
      const svgY = 150 - (currentPos / 100) * 150;
      
      setPathPoints(prev => prev + ` L ${svgX} ${svgY}`);
      
      return newTime;
    });
    
    if (isPlaying) requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isPlaying]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
    // Initial Move To command
    const startY = 150 - (getPosition(0, motionType) / 100) * 150;
    setPathPoints(`M 0 ${startY}`);
  };

  // Reset graph when mode changes
  useEffect(() => {
    handleReset();
  }, [motionType]);


  return (
    <div className="flex flex-col h-full w-full gap-4">
      
      {/* 1. CONTROLS (Motion Selector) */}
      <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-2 overflow-x-auto">
        {[
          { id: 'rest', label: '⏸ Rest', color: 'bg-slate-100 text-slate-600' },
          { id: 'forward', label: '↗ Const (+)', color: 'bg-green-50 text-green-700' },
          { id: 'backward', label: '↘ Const (-)', color: 'bg-red-50 text-red-700' },
          { id: 'accel', label: '⤴ Accel', color: 'bg-purple-50 text-purple-700' }
        ].map((m) => (
            <button
                key={m.id}
                onClick={() => setMotionType(m.id as MotionType)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${motionType === m.id ? 'border-blue-500 ring-1 ring-blue-500 ' + m.color : 'border-transparent hover:bg-slate-50'}`}
            >
                {m.label}
            </button>
        ))}
      </div>

      {/* 2. REAL WORLD VIEW */}
      <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 relative h-24 overflow-hidden">
        <div className="absolute top-2 left-2 text-[9px] font-bold text-slate-400 uppercase">Physical World</div>
        
        {/* Road */}
        <div className="absolute top-1/2 left-4 right-4 h-6 border-b-2 border-slate-300 dark:border-slate-600"></div>
        
        {/* Car */}
        <motion.div 
            className="absolute top-1/2 -mt-5 text-3xl transition-transform will-change-transform"
            style={{ left: `${pos}%` }} // 0-100% Position
        >
            🏎️
        </motion.div>
      </div>

      {/* 3. GRAPH VIEW (Live Plotter) */}
      <div className="flex-grow bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 relative flex flex-col">
        <div className="absolute top-2 left-2 text-[9px] font-bold text-blue-600 uppercase">Live Graph (x vs t)</div>
        
        {/* Axes Labels */}
        <div className="absolute bottom-2 right-2 text-xs font-bold text-slate-400">Time (t) →</div>
        <div className="absolute top-2 left-2 mt-4 text-xs font-bold text-slate-400">Pos (x) ↑</div>

        <div className="flex-grow relative w-full h-full">
            <svg viewBox="0 0 300 150" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="150" x2="300" y2="150" stroke="#94a3b8" strokeWidth="2" /> {/* X Axis */}
                <line x1="0" y1="0" x2="0" y2="150" stroke="#94a3b8" strokeWidth="2" />   {/* Y Axis */}
                
                {/* Ghost Path (The Future prediction - optional, keeping hidden for 'live' feel, or dashed) */}
                {/* <path d={...} stroke="#e2e8f0" strokeWidth="2" fill="none" strokeDasharray="4"/> */}

                {/* LIVE PATH */}
                <path 
                    d={pathPoints} 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
                
                {/* Current Point Head */}
                <circle 
                    cx={(time/duration)*300} 
                    cy={150 - (pos/100)*150} 
                    r="4" 
                    fill="#3b82f6" 
                    stroke="white" 
                    strokeWidth="2"
                />
            </svg>
        </div>

        {/* Play Controls */}
        <div className="mt-2 flex gap-2">
             <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 py-2 rounded text-white font-bold text-sm ${isPlaying ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-500'}`}
             >
                {isPlaying ? '⏸ Pause' : time >= duration ? 'Finished' : '▶ Start Plotting'}
             </button>
             <button onClick={handleReset} className="px-3 bg-slate-200 rounded text-slate-600 hover:bg-slate-300">↺</button>
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---

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
        interactionId: 'pos-time-quiz',
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
      slideId="position-vs-time"
      slideTitle="Position vs Time Graphs"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={localInteractions}
    >
      <div className="w-full p-4 sm:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT: THEORY */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Interpreting x-t Graphs 

[Image of position time graph tangent]
</h2>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                A <strong>Position-Time Graph</strong> tells a story of where an object is at every moment. The most important rule is:
                <br/><br/>
                <span className="block text-center text-lg font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 p-2 rounded border border-blue-200 dark:border-blue-800">
                    Slope = Velocity
                </span>
            </p>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center bg-slate-100 font-bold text-slate-500">━</div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Horizontal Line</h4>
                        <p className="text-xs text-slate-500">Slope is 0. Velocity is 0. Object is at <span className="text-red-500 font-bold">Rest</span>.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center bg-green-100 font-bold text-green-600">↗</div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Straight Diagonal</h4>
                        <p className="text-xs text-slate-500">Slope is constant. Object has <span className="text-green-600 font-bold">Constant Velocity</span>.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center bg-purple-100 font-bold text-purple-600">⤴</div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Curved Line</h4>
                        <p className="text-xs text-slate-500">Slope is changing (getting steeper). Object is <span className="text-purple-600 font-bold">Accelerating</span>.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT: LAB & QUIZ */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full min-h-[500px] flex flex-col overflow-hidden">
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button onClick={() => setViewMode('explore')} className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50'}`}>
                    📈 Graph Lab
                </button>
                <button onClick={() => setViewMode('quiz')} className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50'}`}>
                    📝 Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
                        <GraphingLab />
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