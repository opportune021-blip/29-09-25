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
    id: 'v-t-learning',
    conceptId: 'v-t-graphs',
    conceptName: 'Velocity-Time Graphs',
    type: 'learning',
    description: 'Understanding velocity-time graph behaviour.'
  },
  {
    id: 'v-t-quiz',
    conceptId: 'v-t-quiz',
    conceptName: 'Velocity-Time Quiz',
    type: 'learning',
    description: 'Quiz on velocity-time graphs.'
  }
];

const quizQuestions = [
  {
    question: 'The slope of a Velocity-Time graph represents:',
    options: ['Velocity', 'Acceleration', 'Displacement', 'Jerk'],
    correctIndex: 1,
    explanation: 'Slope = Change in Y / Change in X = Velocity / Time = Acceleration.'
  },
  {
    question: 'A horizontal flat line on a v-t graph indicates:',
    options: ['The object is at rest', 'Constant Velocity (Zero Acceleration)', 'Increasing Acceleration', 'Moving backwards'],
    correctIndex: 1,
    explanation: 'A horizontal line means velocity is not changing over time, so acceleration is zero.'
  }
];

// --- ANIMATION COMPONENT (The Explore Section) ---

type GraphMode = 'accelerating' | 'constant' | 'decelerating';

const VTGraphExplorer = () => {
  const [mode, setMode] = useState<GraphMode>('accelerating');
  const [time, setTime] = useState(0); // 0 to 100 (percentage of duration)
  const [carPos, setCarPos] = useState(0); // 0 to 100 (percentage of track)
  const [isPlaying, setIsPlaying] = useState(false);
  
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const DURATION = 5000; // 5 seconds for full graph traversal

  // Physics/Graph Logic
  const getVelocityAtTime = (tPercent: number) => {
    // Returns velocity (0 to 1 normalized)
    const t = tPercent / 100;
    switch (mode) {
      case 'accelerating': return t; // Linear increase (Slope +)
      case 'constant': return 0.5; // Constant (Slope 0)
      case 'decelerating': return 1 - t; // Linear decrease (Slope -)
      default: return 0;
    }
  };

  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = timestamp - lastTimeRef.current;
      
      setTime((prevTime) => {
        const newTime = prevTime + (deltaTime / DURATION) * 100;
        
        if (newTime >= 100) {
          setIsPlaying(false);
          return 100;
        }
        
        // Update Car Position based on velocity integration (simplified)
        // We treat 'time' state as the master clock
        // v = getVelocityAtTime(newTime)
        // dx = v * dt
        // This is a visual approximation
        const currentV = getVelocityAtTime(newTime);
        setCarPos(prevPos => {
            const newPos = prevPos + (currentV * (deltaTime / 20)); // Scaling factor
            return newPos > 100 ? 0 : newPos; // Loop track if needed, or just clamp
        });

        return newTime;
      });
    }
    lastTimeRef.current = timestamp;
    if (isPlaying) {
        requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const reset = () => {
    setIsPlaying(false);
    setTime(0);
    setCarPos(0);
  };

  const switchMode = (newMode: GraphMode) => {
    setMode(newMode);
    reset();
  };

  // SVG Paths for the graph line
  const getPathDefinition = () => {
    switch (mode) {
      case 'accelerating': return "M 0,100 L 100,0";   // Bottom-left to Top-right
      case 'constant':     return "M 0,50 L 100,50";   // Horizontal middle
      case 'decelerating': return "M 0,0 L 100,100";   // Top-left to Bottom-right
    }
  };

  const getModeColor = () => {
    switch (mode) {
      case 'accelerating': return 'text-green-500 stroke-green-500 bg-green-500';
      case 'constant': return 'text-blue-500 stroke-blue-500 bg-blue-500';
      case 'decelerating': return 'text-red-500 stroke-red-500 bg-red-500';
    }
  };

  // Calculate current dot position on graph
  const graphY = 100 - (getVelocityAtTime(time) * 100);

  return (
    <div className="flex flex-col items-center w-full h-full">
      
      {/* 1. The Graph Visualization */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4 shadow-sm relative h-64">
        <h4 className="absolute top-2 left-4 text-xs font-bold text-slate-400 uppercase">Velocity vs Time</h4>
        
        {/* Graph Area */}
        <div className="relative h-full w-full pl-8 pb-8">
           {/* Y-Axis Label */}
           <div className="absolute -left-6 top-1/2 -rotate-90 text-xs text-slate-500 font-bold">Velocity (v)</div>
           {/* X-Axis Label */}
           <div className="absolute bottom-2 left-1/2 text-xs text-slate-500 font-bold">Time (t)</div>

           <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="0" y2="100" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
              <line x1="0" y1="100" x2="100" y2="100" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
              
              {/* The Data Line */}
              <path 
                d={getPathDefinition()} 
                className={`fill-none stroke-2 ${getModeColor().split(' ')[1]}`}
                vectorEffect="non-scaling-stroke"
              />

              {/* The Moving Dot & Crosshairs */}
              <circle cx={time} cy={graphY} r="2" className="fill-slate-800 dark:fill-white" />
              <line x1={time} y1={graphY} x2={time} y2="100" className="stroke-slate-400 stroke-dashed" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1={graphY} x2={time} y2={graphY} className="stroke-slate-400 stroke-dashed" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
           </svg>
        </div>
      </div>

      {/* 2. The Car Simulation */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-24 rounded-lg mb-4 relative overflow-hidden border-b-4 border-slate-400">
         <div className="absolute top-2 right-2 text-[10px] text-slate-500">SIMULATION</div>
         
         {/* Road Stripes */}
         <div className="absolute top-1/2 w-full border-t-2 border-dashed border-slate-400/50"></div>

         {/* Car */}
         <motion.div 
           className="absolute top-1/2 -mt-4 text-3xl"
           style={{ left: `${Math.min(carPos, 90)}%` }} // Clamp visually
         >
           🏎️
           {/* Velocity Vector Arrow */}
           <div 
             className={`h-1 rounded absolute top-1/2 left-full origin-left transition-all duration-75 ${getModeColor().split(' ')[2]}`}
             style={{ width: `${getVelocityAtTime(time) * 40}px` }}
           ></div>
         </motion.div>
      </div>

      {/* 3. Controls */}
      <div className="w-full flex flex-col gap-4">
         {/* Mode Selector */}
         <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
            {(['accelerating', 'constant', 'decelerating'] as GraphMode[]).map((m) => (
               <button
                 key={m}
                 onClick={() => switchMode(m)}
                 className={`flex-1 py-2 text-xs sm:text-sm font-bold capitalize rounded-md transition-all ${mode === m ? 'bg-white dark:bg-slate-600 shadow text-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 {m}
               </button>
            ))}
         </div>

         {/* Play/Reset */}
         <div className="flex gap-2">
            <button 
               onClick={() => isPlaying ? setIsPlaying(false) : setIsPlaying(true)}
               className={`flex-1 py-2 rounded-lg font-bold text-white transition-colors ${isPlaying ? 'bg-slate-500' : 'bg-blue-600 hover:bg-blue-500'}`}
            >
               {isPlaying ? '⏸ Pause' : (time >= 100 ? '↺ Replay' : '▶ Play')}
            </button>
            <button 
               onClick={reset}
               className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg font-bold hover:bg-slate-300 transition-colors"
            >
               Reset
            </button>
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
        interactionId: 'v-t-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Velocity vs. Time Graphs </h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              A <strong>v-t graph</strong> tells us how fast an object is moving at any given moment. The most important feature is the <strong>slope</strong>.
            </p>

            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase">Slope Rules</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                        <span className="text-green-500 text-xl font-bold">↗</span>
                        <div>
                            <strong className="text-slate-800 dark:text-slate-200">Positive Slope</strong>
                            <p className="text-sm">Velocity is increasing. The object is <span className="text-green-600 font-bold">Accelerating</span>.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 text-xl font-bold">→</span>
                        <div>
                            <strong className="text-slate-800 dark:text-slate-200">Flat Line (Slope = 0)</strong>
                            <p className="text-sm">Velocity is not changing. <span className="text-blue-600 font-bold">Zero Acceleration</span> (Constant Speed).</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-500 text-xl font-bold">↘</span>
                        <div>
                            <strong className="text-slate-800 dark:text-slate-200">Negative Slope</strong>
                            <p className="text-sm">Velocity is decreasing. The object is <span className="text-red-600 font-bold">Decelerating</span>.</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg text-center">
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                    <InlineMath math="\text{Slope} = \frac{\Delta v}{\Delta t} = \text{Acceleration (a)}" />
                </span>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[550px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📈 Graph Lab
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
                     <VTGraphExplorer />
                ) : (
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
      slideId="velocity-vs-time"
      slideTitle="Velocity vs time graphs"
      moduleId="motion-in-a-straight-line"
      submoduleId="acceleration"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}