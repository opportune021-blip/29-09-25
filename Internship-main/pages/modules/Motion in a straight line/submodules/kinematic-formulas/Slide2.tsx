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
    id: 'kf-aircraft-acc-learning',
    conceptId: 'kf-aircraft-acc',
    conceptName: 'Aircraft Carrier Acceleration',
    type: 'learning',
    description: 'Simulation of a catapult launch demonstrating high acceleration.'
  },
  {
    id: 'kf-aircraft-acc-quiz',
    conceptId: 'kf-aircraft-acc-quiz',
    conceptName: 'Aircraft Acc Quiz',
    type: 'learning',
    description: 'Quiz on acceleration calculations.'
  }
];

const quizQuestions = [
  {
    question: 'An aircraft accelerates from 0 to 60 m/s in 3 seconds. What is its acceleration?',
    options: ['10 m/s²', '15 m/s²', '20 m/s²', '30 m/s²'],
    correctIndex: 2,
    explanation: 'Using a = (v - u) / t: a = (60 - 0) / 3 = 20 m/s².'
  },
  {
    question: 'Why do aircraft carriers need catapults?',
    options: [
      'To save fuel',
      'Because the runway is too short for normal takeoff',
      'To look cool',
      'To test the pilot\'s reflexes'
    ],
    correctIndex: 1,
    explanation: 'The deck is too short to reach takeoff speed using engines alone. High acceleration is needed to cover the short distance quickly.'
  }
];

// --- ANIMATION COMPONENT (The Catapult Sim) ---

const CarrierLaunchSim = () => {
  // Physics Constants
  const TARGET_SPEED = 75; // m/s (~145 knots)
  const ACCELERATION = 30; // m/s^2 (~3g)
  const RUNWAY_LENGTH = 100; // meters

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [position, setPosition] = useState(0);
  const [time, setTime] = useState(0);
  const [hasLaunched, setHasLaunched] = useState(false);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // seconds
      
      // Slow down time visually so user can see the details (0.5x speed)
      const simDelta = deltaTime * 0.5;

      if (position < RUNWAY_LENGTH && velocity < TARGET_SPEED) {
        // Update Physics: v = u + at
        const newVel = velocity + (ACCELERATION * simDelta);
        
        // Update Position: x = x + vt
        const newPos = position + (velocity * simDelta) + (0.5 * ACCELERATION * simDelta * simDelta);
        
        setVelocity(newVel);
        setPosition(newPos);
        setTime(prev => prev + simDelta);
      } else {
        // Launch Complete
        setHasLaunched(true);
        // Keep moving at constant velocity for visual effect
        setPosition(prev => prev + (TARGET_SPEED * simDelta));
        if (position > 150) setIsPlaying(false); // End visual loop
      }
    }
    lastTimeRef.current = timestamp;
    if (isPlaying && position < 150) requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isPlaying, velocity, position]);

  const handleLaunch = () => {
    handleReset();
    setTimeout(() => setIsPlaying(true), 100);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setHasLaunched(false);
    setVelocity(0);
    setPosition(0);
    setTime(0);
  };

  // Visual Scaling (100m runway = 80% of container width)
  const getLeftPercent = (meters: number) => {
      return (meters / 120) * 100; // 120m total visual range
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Flight Deck */}
      <div className="w-full bg-slate-800 rounded-xl p-1 border-4 border-slate-600 shadow-2xl relative mb-6 overflow-hidden">
        <div className="text-[10px] font-bold text-yellow-500 absolute top-2 left-4 uppercase tracking-widest z-20">USS Physics (CVN-78)</div>
        
        <div className="relative w-full h-32 bg-slate-700 mt-0 rounded-lg overflow-hidden">
            {/* Ocean Background */}
            <div className="absolute top-0 w-full h-1/2 bg-sky-900/50 z-0"></div>
            
            {/* Deck Markings */}
            <div className="absolute bottom-4 left-0 w-full h-20 border-t-2 border-white/20 z-10">
                {/* Center Line */}
                <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-yellow-400/50"></div>
                {/* Distance Markers */}
                {[0, 25, 50, 75, 100].map(m => (
                    <div key={m} className="absolute top-full -mt-2 h-2 border-l border-white/30 text-[8px] text-white/50 pl-1" style={{ left: `${getLeftPercent(m)}%` }}>
                        {m}m
                    </div>
                ))}
            </div>

            {/* The Jet */}
            <motion.div 
                className="absolute bottom-8 text-4xl z-30 origin-center"
                style={{ left: `${getLeftPercent(position)}%` }}
                animate={hasLaunched ? { y: -20, rotate: -10 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.5 }}
            >
                ✈️
                {/* Afterburner Flame */}
                {isPlaying && (
                    <motion.div 
                        className="absolute top-1/2 -left-4 w-6 h-3 bg-orange-500 rounded-full blur-sm origin-right"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                    />
                )}
            </motion.div>

            {/* Steam Effect (Catapult) */}
            {isPlaying && !hasLaunched && (
                <motion.div 
                    className="absolute bottom-8 left-0 h-4 bg-white/30 blur-md rounded-r-full z-20"
                    style={{ width: `${getLeftPercent(position)}%` }}
                />
            )}
        </div>
      </div>

      {/* 2. Telemetry Board */}
      <div className="w-full grid grid-cols-3 gap-2 mb-6">
          <div className="bg-slate-900 p-3 rounded border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase">Velocity (v)</div>
              <div className="text-xl font-mono font-bold text-green-400">{velocity.toFixed(0)} <span className="text-xs">m/s</span></div>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase">Distance (s)</div>
              <div className="text-xl font-mono font-bold text-blue-400">{position.toFixed(0)} <span className="text-xs">m</span></div>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase">G-Force</div>
              <div className="text-xl font-mono font-bold text-red-400">{(isPlaying && !hasLaunched ? ACCELERATION/9.8 : 0).toFixed(1)} <span className="text-xs">g</span></div>
          </div>
      </div>

      {/* 3. Formula & Controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center gap-4">
          <div className="text-sm font-mono text-slate-600 dark:text-slate-300 hidden sm:block">
              <InlineMath math="v = u + at \Rightarrow 75 = 0 + 30(2.5)" />
          </div>

          <div className="flex gap-2 flex-1 justify-end">
             <button 
                onClick={handleLaunch}
                disabled={isPlaying}
                className={`px-6 py-2 rounded-lg font-bold text-white shadow-md transition-all ${isPlaying ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-500'}`}
             >
                🚀 LAUNCH
             </button>
             <button 
                onClick={handleReset}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg font-bold transition-colors text-slate-700 dark:text-slate-300"
             >
                Reset
             </button>
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
        interactionId: 'kf-aircraft-acc-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Acceleration on Aircraft Carriers</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              An aircraft carrier deck is only about 100 meters long. A normal jet runway is 2,000 meters. How do they take off?
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase tracking-wide">The Physics Problem</h4>
              <ul className="list-disc ml-5 text-sm space-y-1">
                  <li><strong>Initial Velocity (<InlineMath math="u" />):</strong> 0 m/s</li>
                  <li><strong>Final Velocity (<InlineMath math="v" />):</strong> ~75 m/s (to generate lift)</li>
                  <li><strong>Distance (<InlineMath math="s" />):</strong> ~100 m</li>
              </ul>
            </div>

            <p>
                To achieve this change in velocity over such a short distance, we need enormous <strong>acceleration</strong>.
            </p>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg text-center">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">The Formula</div>
                <div className="text-xl font-mono font-bold text-slate-800 dark:text-white">
                    <InlineMath math="a = \frac{v - u}{t}" />
                </div>
                <div className="text-xs mt-2 text-slate-500">
                    This requires steam or electromagnetic catapults to push the plane with ~3g of force!
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
                    ⚓ Catapult Sim
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
                     <CarrierLaunchSim />
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
      slideId="kf-aircraft-acc"
      slideTitle="Aircraft Carrier Acceleration"
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