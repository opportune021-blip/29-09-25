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
    id: 'kf-a380-distance-learning',
    conceptId: 'kf-a380-distance',
    conceptName: 'A380 Take-off Distance',
    type: 'learning',
    description: 'Interactive calculator for distance under constant acceleration.'
  },
  {
    id: 'kf-a380-distance-quiz',
    conceptId: 'kf-a380-distance-quiz',
    conceptName: 'A380 Distance Quiz',
    type: 'learning',
    description: 'Quiz on calculating take-off distance.'
  }
];

const quizQuestions = [
  {
    question: 'If an A380 starts from rest (u=0) and accelerates at 3 m/s² for 20 seconds, what is the distance covered?',
    options: ['300 m', '600 m', '900 m', '1200 m'],
    correctIndex: 1,
    explanation: 's = ut + ½at². Since u=0, s = ½(3)(20²) = ½(3)(400) = 600 meters.'
  },
  {
    question: 'Which variable has a bigger impact on distance (s): acceleration (a) or time (t)?',
    options: ['Acceleration (linear)', 'Time (squared)', 'They are equal', 'Initial velocity only'],
    correctIndex: 1,
    explanation: 'In the formula s = ut + ½at², time is squared (t²), so doubling time quadruples the distance contributed by acceleration.'
  }
];

// --- ANIMATION COMPONENT (The Runway Lab) ---

const TakeoffDistanceLab = () => {
  // Inputs
  const [accel, setAccel] = useState(2); // m/s^2
  const [time, setTime] = useState(10);  // s
  const [u, setU] = useState(0);         // Initial velocity (often 0 for takeoff)

  // State for Animation
  const [simTime, setSimTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // Calculate final values
  const finalDist = (u * time) + (0.5 * accel * time * time);
  const currentDist = (u * simTime) + (0.5 * accel * simTime * simTime);

  // Simulation Loop
  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      
      setSimTime(prev => {
        const newTime = prev + deltaTime;
        if (newTime >= time) {
          setIsPlaying(false);
          return time;
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

  const handleStart = () => {
    setSimTime(0);
    setIsPlaying(true);
  };

  // Visual Scaling
  // We want the runway to visually expand to fit the distance.
  // Let's say max visual width is 100%.
  // We fix the "Runway" size to a max logical distance, e.g., 1000m.
  const MAX_LOGICAL_DIST = 1000; 
  
  const getPercent = (d: number) => Math.min((d / MAX_LOGICAL_DIST) * 100, 100);

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Runway Visualization */}
      <div className="w-full bg-slate-800 rounded-xl p-4 border-4 border-slate-600 shadow-inner relative mb-6 overflow-hidden">
        <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Runway View</div>
        
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900 to-slate-800 opacity-50"></div>

        <div className="relative w-full h-32 mt-6 bg-slate-700 rounded-lg overflow-hidden">
            {/* Distance Markers on Runway */}
            <div className="absolute bottom-0 w-full h-16 border-t-2 border-white/20">
                {/* Dashed Center Line */}
                <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-yellow-400/50"></div>
                
                {/* Markers */}
                {[0, 200, 400, 600, 800, 1000].map(m => (
                    <div key={m} className="absolute top-full -mt-4 h-4 border-l border-white/30 text-[9px] text-white/50 pl-1" style={{ left: `${getPercent(m)}%` }}>
                        {m}m
                    </div>
                ))}
            </div>

            {/* The Plane */}
            <motion.div 
                className="absolute bottom-6 text-4xl z-20"
                style={{ 
                    left: `${getPercent(currentDist)}%`,
                    x: '-50%' 
                }}
            >
                ✈️
                {isPlaying && (
                    <motion.div 
                        className="absolute top-1/2 -left-2 w-8 h-4 bg-orange-500/50 blur-sm rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                    />
                )}
                {/* Live Distance Label */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-1 rounded backdrop-blur-sm font-mono">
                    {currentDist.toFixed(0)}m
                </div>
            </motion.div>

            {/* Target Distance Marker */}
            <div 
                className="absolute bottom-0 h-full border-l-2 border-green-500 border-dashed opacity-50"
                style={{ left: `${getPercent(finalDist)}%` }}
            >
                <span className="absolute top-2 -left-10 text-[9px] text-green-400 w-20 text-center">Target: {finalDist.toFixed(0)}m</span>
            </div>
        </div>
      </div>

      {/* 2. Telemetry Board */}
      <div className="w-full grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Formula</div>
              <div className="text-sm sm:text-base font-mono text-blue-600 dark:text-blue-400 mt-1">
                  <InlineMath math="s = ut + \frac{1}{2}at^2" />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Calculated Distance</div>
              <div className="text-xl font-mono font-bold text-green-600 dark:text-green-400">
                  {finalDist.toFixed(1)} m
              </div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          
          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                  <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                      <span>Acceleration (a)</span>
                      <span>{accel} m/s²</span>
                  </label>
                  <input 
                      type="range" min="1" max="5" step="0.5"
                      value={accel} 
                      onChange={(e) => { setAccel(Number(e.target.value)); setSimTime(0); setIsPlaying(false); }}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
              </div>
              <div>
                  <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                      <span>Time (t)</span>
                      <span>{time} s</span>
                  </label>
                  <input 
                      type="range" min="5" max="20" step="1"
                      value={time} 
                      onChange={(e) => { setTime(Number(e.target.value)); setSimTime(0); setIsPlaying(false); }}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
              </div>
          </div>

          {/* Play Button */}
          <button 
            onClick={handleStart}
            disabled={isPlaying}
            className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${isPlaying ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-500'}`}
          >
             {isPlaying ? 'Taking Off...' : '🛫 Visualize Take-off'}
          </button>
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
        interactionId: 'kf-a380-distance-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Calculating Distance (The 2nd Equation)</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              If we know an object's initial velocity, acceleration, and the time it travels, we can find exactly how far it goes.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 text-center">
              <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">Distance Formula</h4>
              <div className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300">
                   <InlineMath math="s = ut + \frac{1}{2}at^2" />
              </div>
              <div className="mt-4 text-left text-sm space-y-1 ml-4">
                  <div><InlineMath math="s" /> = Displacement (Distance)</div>
                  <div><InlineMath math="u" /> = Initial Velocity</div>
                  <div><InlineMath math="t" /> = Time</div>
                  <div><InlineMath math="a" /> = Acceleration</div>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">Application: A380 Take-off</h4>
                <p className="text-sm">
                    For a plane starting from rest (<InlineMath math="u=0" />), the formula simplifies to <InlineMath math="s = \frac{1}{2}at^2" />. This tells us that distance increases very rapidly with time (squared!).
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
                    ✈️ Runway Lab
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
                     <TakeoffDistanceLab />
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
      slideId="kf-a380-distance"
      slideTitle="A380 take-off distance"
      moduleId="motion-in-a-straight-line"
      submoduleId="kinematic-formulas"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}