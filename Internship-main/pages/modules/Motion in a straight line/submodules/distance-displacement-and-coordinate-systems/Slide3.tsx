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
    id: 'position-time-learning', 
    conceptId: 'position-time', 
    conceptName: 'Position-time graphs', 
    type: 'learning', 
    description: 'Interactive plotter relating motion to graph slope.' 
  },
  { 
    id: 'position-time-quiz', 
    conceptId: 'position-time-quiz', 
    conceptName: 'position-time quiz', 
    type: 'learning', 
    description: 'Quiz on interpreting x-t graphs.' 
  }
];

const quizQuestions = [
  {
    question: 'On a Position-Time (x-t) graph, a steeper slope indicates:',
    options: ['Lower Velocity', 'Higher Velocity', 'Zero Velocity', 'Negative Displacement'],
    correctIndex: 1,
    explanation: 'Slope = Velocity. A steeper line means position is changing rapidly, i.e., higher velocity.'
  },
  {
    question: 'A horizontal line on a position-time graph means:',
    options: ['Constant positive velocity', 'Constant negative velocity', 'The object is at rest (v=0)', 'Infinite acceleration'],
    correctIndex: 2,
    explanation: 'A horizontal line means position is not changing over time, so the object is stationary.'
  }
];

// --- ANIMATION COMPONENT (The Graph Plotter) ---

const XTGraphLab = () => {
  // Configuration
  const MAX_TIME = 10; // seconds
  const MAX_POS = 50;  // meters (up/down)

  // State
  const [velocity, setVelocity] = useState(0); // current velocity input
  const [time, setTime] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
  const [pathData, setPathData] = useState<{t: number, x: number}[]>([{t: 0, x: 0}]);
  const [isPlaying, setIsPlaying] = useState(false);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // Animation Loop
  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // seconds
      
      // Check if we hit end of graph
      if (time >= MAX_TIME) {
        setIsPlaying(false);
        return;
      }

      // Update Logic
      const newTime = time + deltaTime;
      const newPos = currentPos + (velocity * deltaTime * 5); // *5 is visual scaling

      // Clamp Position to graph bounds
      const clampedPos = Math.max(-MAX_POS, Math.min(MAX_POS, newPos));

      setTime(newTime);
      setCurrentPos(clampedPos);
      setPathData(prev => [...prev, { t: newTime, x: clampedPos }]);
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
  }, [isPlaying, velocity, currentPos, time]);

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
    setCurrentPos(0);
    setVelocity(0);
    setPathData([{t: 0, x: 0}]);
  };

  const togglePlay = () => {
    if (time >= MAX_TIME) handleReset(); // Auto reset if full
    setIsPlaying(!isPlaying);
  };

  // --- SVG Converters ---
  // Map Time (0-10) to SVG X (0-100)
  // Map Pos (-50 to 50) to SVG Y (100 to 0)
  const getSvgX = (t: number) => (t / MAX_TIME) * 100;
  const getSvgY = (x: number) => 50 - (x / MAX_POS) * 50;

  // Create Polyline String
  const polylinePoints = pathData
    .map(p => `${getSvgX(p.t)},${getSvgY(p.x)}`)
    .join(' ');

  // Color based on current velocity
  const getSlopeColor = () => {
    if (velocity > 0) return 'text-green-600 dark:text-green-400';
    if (velocity < 0) return 'text-red-600 dark:text-red-400';
    return 'text-blue-600 dark:text-blue-400';
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      
      {/* 1. The Graph */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4 shadow-sm relative h-48">
        <h4 className="absolute top-2 left-4 text-xs font-bold text-slate-400 uppercase">Position (x) vs Time (t)</h4>
        
        {/* Y-Axis Label */}
        <div className="absolute -left-4 top-1/2 -rotate-90 text-[10px] text-slate-500 font-bold">Position (m)</div>
        
        <div className="relative w-full h-full pl-6 pb-4">
           <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid */}
              <line x1="0" y1="50" x2="100" y2="50" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.5" /> {/* X-Axis (0) */}
              <line x1="0" y1="0" x2="0" y2="100" className="stroke-slate-300 dark:stroke-slate-600" strokeWidth="0.5" />   {/* Y-Axis */}

              {/* The Plotted Line */}
              <polyline 
                points={polylinePoints} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="text-blue-500 transition-colors duration-300"
                vectorEffect="non-scaling-stroke"
              />

              {/* The Leading Dot */}
              <circle 
                cx={getSvgX(time)} 
                cy={getSvgY(currentPos)} 
                r="1.5" 
                className="fill-red-500" 
              />
           </svg>
           {/* X-Axis Label */}
           <div className="absolute bottom-0 left-1/2 text-[10px] text-slate-500 font-bold">Time (s)</div>
        </div>
      </div>

      {/* 2. The Motion Track (Visualization of Real Space) */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-lg p-2 mb-4 border border-slate-200 dark:border-slate-700 relative h-16 overflow-hidden">
          <div className="absolute top-1 text-[9px] text-slate-400 font-bold uppercase left-2">Real World View</div>
          
          {/* Track Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-400/50"></div>
          
          {/* Center Mark */}
          <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-slate-400 -translate-y-1/2"></div>

          {/* The Object */}
          <motion.div 
            className="absolute top-1/2 text-2xl"
            style={{ 
                left: `${50 + (currentPos)}%`, // Map -50..50 to 0..100% roughly
                transform: 'translate(-50%, -60%)' 
            }}
          >
             🚗
          </motion.div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-3">
               <span className="text-xs font-bold text-slate-500">Set Velocity (Slope):</span>
               <span className={`text-sm font-mono font-bold ${getSlopeColor()}`}>
                   {velocity > 0 ? '+' : ''}{velocity} m/s
               </span>
          </div>

          {/* Velocity Presets */}
          <div className="grid grid-cols-5 gap-1 mb-4">
              <button onClick={() => setVelocity(-4)} className={`p-2 rounded text-[10px] font-bold ${velocity === -4 ? 'bg-red-500 text-white' : 'bg-white dark:bg-slate-700 hover:bg-red-100'}`}> Fast Back </button>
              <button onClick={() => setVelocity(-2)} className={`p-2 rounded text-[10px] font-bold ${velocity === -2 ? 'bg-red-400 text-white' : 'bg-white dark:bg-slate-700 hover:bg-red-50'}`}> Slow Back </button>
              <button onClick={() => setVelocity(0)}  className={`p-2 rounded text-[10px] font-bold ${velocity === 0 ? 'bg-blue-500 text-white' : 'bg-white dark:bg-slate-700 hover:bg-blue-50'}`}> Stop </button>
              <button onClick={() => setVelocity(2)}  className={`p-2 rounded text-[10px] font-bold ${velocity === 2 ? 'bg-green-400 text-white' : 'bg-white dark:bg-slate-700 hover:bg-green-50'}`}> Slow Fwd </button>
              <button onClick={() => setVelocity(4)}  className={`p-2 rounded text-[10px] font-bold ${velocity === 4 ? 'bg-green-500 text-white' : 'bg-white dark:bg-slate-700 hover:bg-green-100'}`}> Fast Fwd </button>
          </div>

          {/* Play/Reset */}
          <div className="flex gap-2">
              <button 
                onClick={togglePlay}
                className={`flex-1 py-2 rounded-lg font-bold text-white text-sm shadow-sm transition-all ${isPlaying ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                  {isPlaying ? '⏸ Pause' : (time > 0 ? '▶ Resume' : '▶ Start Plotting')}
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
        interactionId: 'position-time-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Position-Time Graphs 

[Image of acceleration time graph]
</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              An <strong>x-t graph</strong> tells us where an object is at any given time. The shape of the line tells us about the object's velocity.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase tracking-wide">The Golden Rule</h4>
              <div className="text-xl font-mono font-bold text-blue-700 dark:text-blue-300 text-center my-2">
                   Slope = Velocity
              </div>
              <div className="flex justify-center">
                  <InlineMath math="\text{Slope} = \frac{\Delta x}{\Delta t} = v" />
              </div>
            </div>

            <div className="space-y-2 text-sm">
                <p className="font-bold text-slate-800 dark:text-slate-200">Interpreting the Slope:</p>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Steep Slope:</strong> Fast Velocity (Covering lots of meters quickly).</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                        <span><strong>Gentle Slope:</strong> Slow Velocity.</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span><strong>Flat Line:</strong> Zero Velocity (The object is stopped).</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span><strong>Downward Slope:</strong> Negative Velocity (Moving backwards).</span>
                    </li>
                </ul>
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
                    📈 Graph Plotter
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
                     <XTGraphLab />
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
      slideId="position-time-graphs"
      slideTitle="Position-time graphs"
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