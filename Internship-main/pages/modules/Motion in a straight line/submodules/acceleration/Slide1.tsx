import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'acceleration-intro-learning',
    conceptId: 'acceleration-intro',
    conceptName: 'Acceleration Intro',
    type: 'learning',
    description: 'Understanding the meaning of acceleration using a simulation.'
  },
  {
    id: 'acceleration-intro-quiz',
    conceptId: 'acceleration-intro-quiz',
    conceptName: 'Acceleration Quiz',
    type: 'learning',
    description: 'Quiz on basic acceleration concept.'
  }
];

const quizQuestions = [
  {
    question: 'Acceleration is defined as:',
    options: [
      'Rate of change of velocity',
      'Rate of change of distance',
      'Velocity × time',
      'Force per unit time'
    ],
    correctIndex: 0,
    explanation: 'Acceleration is the rate at which velocity changes over time ($a = \\Delta v / \\Delta t$).'
  },
  {
    question: 'If a car is moving forward but has negative acceleration, what happens?',
    options: [
      'It moves backwards immediately',
      'It slows down',
      'It speeds up',
      'It stops instantly'
    ],
    correctIndex: 1,
    explanation: 'Negative acceleration (opposing velocity) reduces the speed, causing the car to slow down.'
  }
];

// --- ANIMATION COMPONENT (The Explore Section) ---

const AccelerationPlayground = () => {
  // Physics State
  const [acceleration, setAcceleration] = useState(0); // -5 to 5
  const [velocity, setVelocity] = useState(0);
  const [position, setPosition] = useState(10); // % of container width
  const [isPaused, setIsPaused] = useState(false);

  // Refs for animation loop
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // The Physics Loop
  const updatePhysics = (time: number) => {
    if (lastTimeRef.current !== undefined && !isPaused) {
      // Calculate delta time (seconds)
      const deltaTime = (time - lastTimeRef.current) / 1000; 
      
      // v = u + at
      const newVelocity = velocity + (acceleration * deltaTime * 20); 
      
      // s = ut (simplified for this visual loop)
      let newPosition = position + (newVelocity * deltaTime * 2); 

      // Screen Wrapping Logic
      if (newPosition > 100) newPosition = -10;
      if (newPosition < -10) newPosition = 100;

      // Max Speed Clamping
      const clampedVelocity = Math.max(-80, Math.min(80, newVelocity));

      setVelocity(clampedVelocity);
      setPosition(newPosition);
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(updatePhysics);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [acceleration, velocity, position, isPaused]);

  // Handlers
  const resetSim = () => {
    setVelocity(0);
    setPosition(10);
    setAcceleration(0);
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner">
      
        {/* 1. The Road & Car */}
        <div className="relative w-full h-32 sm:h-40 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden border-b-4 border-slate-400 mb-4 group">
          {/* Road Markings */}
          <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-slate-400/50"></div>
          
          {/* The Car */}
          <motion.div 
            className="absolute top-1/2 -mt-6 text-4xl sm:text-5xl transform will-change-transform"
            style={{ left: `${position}%` }}
          >
            🏎️
            
            {/* Vector Arrow: Velocity (Blue) */}
            <div 
              className="absolute top-1/2 left-1/2 h-1 bg-blue-500 rounded origin-left transition-all duration-75 opacity-80"
              style={{ 
                width: `${Math.abs(velocity) * 2}px`, 
                transform: velocity >= 0 ? 'rotate(0deg)' : 'rotate(180deg)'
              }}
            />

            {/* Vector Arrow: Acceleration (Red) */}
            {acceleration !== 0 && (
              <div 
                className="absolute -bottom-2 left-1/2 h-1 bg-red-500 rounded origin-left transition-all duration-300"
                style={{ 
                  width: `${Math.abs(acceleration) * 8}px`, 
                  transform: acceleration >= 0 ? 'rotate(0deg)' : 'rotate(180deg)'
                }}
              />
            )}
          </motion.div>

          {/* Legend Overlay */}
          <div className="absolute top-2 right-2 text-[10px] sm:text-xs bg-white/80 dark:bg-black/50 p-2 rounded shadow backdrop-blur-sm">
             <div className="flex items-center gap-2"><span className="w-3 h-1 bg-blue-500 rounded"></span> Velocity (<InlineMath>v</InlineMath>)</div>
             <div className="flex items-center gap-2"><span className="w-3 h-1 bg-red-500 rounded"></span> Accel (<InlineMath>a</InlineMath>)</div>
          </div>
        </div>

        {/* 2. Dashboard / Controls */}
        <div className="w-full grid grid-cols-1 gap-4">
          
          {/* Slider Control */}
          <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex justify-between items-center">
              <span>Set Acceleration</span>
              <span className={`font-mono ${acceleration > 0 ? 'text-green-500' : acceleration < 0 ? 'text-red-500' : 'text-slate-500'}`}>
                {acceleration > 0 ? '+' : ''}{acceleration} m/s²
              </span>
            </label>
            
            <input 
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={acceleration}
              onChange={(e) => setAcceleration(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-red-500"
            />
            
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>Brake (-5)</span>
              <span>Coast (0)</span>
              <span>Gas (+5)</span>
            </div>
          </div>

          {/* Real-time Stats */}
          <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 uppercase font-bold">Speed</span>
                  <span className="font-mono text-md font-bold text-blue-600 dark:text-blue-400">
                      {Math.abs(velocity).toFixed(1)} m/s
                  </span>
              </div>
              
              <div className="flex gap-1">
                  <button 
                      onClick={() => setIsPaused(!isPaused)}
                      className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-xs font-bold transition-colors"
                  >
                      {isPaused ? "▶️" : "⏸️"}
                  </button>
                  <button 
                      onClick={resetSim}
                      className="flex-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 rounded-lg text-xs font-bold transition-colors"
                  >
                      🔄
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' (Visualization) or 'quiz' (Questions)
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

  // --- QUIZ LOGIC HANDLERS ---
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
        interactionId: 'acceleration-intro-quiz',
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
        
        {/* Left Panel: Theory (Always Visible) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">What is Acceleration?</h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            
             <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <p className="text-base text-slate-700 dark:text-slate-300 mb-2">
                   Acceleration measures <strong>how quickly velocity changes</strong>.
                </p>
                <div className="text-center py-2">
                    <InlineMath math="a = \frac{\Delta v}{t} = \frac{v_{final} - v_{initial}}{time}" />
                </div>
            </div>

            <div className="space-y-2 text-base">
                <p>It is a vector quantity, meaning direction matters:</p>
                <ul className="space-y-3 pl-2 mt-2">
                <li className="flex items-start gap-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold mt-1">Positive</span> 
                    <span className="text-sm"><strong>Speeding Up:</strong> When acceleration points in the same direction as velocity.</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold mt-1">Negative</span> 
                    <span className="text-sm"><strong>Slowing Down:</strong> When acceleration opposes velocity (often called deceleration).</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold mt-1">Zero</span> 
                    <span className="text-sm"><strong>Constant Velocity:</strong> No change in speed or direction.</span>
                </li>
                </ul>
            </div>

          </div>
        </div>
        
        {/* Right Panel: Tabs for Visualization OR Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🧪 Simulate
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Check Knowledge
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE (Animation) ---
                    <div className="flex-grow flex flex-col items-center justify-center h-full">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Acceleration Simulator</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Adjust the acceleration slider to see how it affects the car's velocity.</p>
                        
                        <AccelerationPlayground />
                    </div>
                ) : (
                    // --- QUIZ MODE ---
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
      slideId="what-is-acceleration"
      slideTitle="What is acceleration?"
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