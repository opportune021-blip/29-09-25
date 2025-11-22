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
    id: 'a380-learning',
    conceptId: 'a380',
    conceptName: 'A380 Take-off',
    type: 'learning',
    description: 'Understanding acceleration using real aircraft data.'
  },
  {
    id: 'a380-quiz',
    conceptId: 'a380-quiz',
    conceptName: 'A380 Quiz',
    type: 'learning',
    description: 'Quiz based on Airbus A380 acceleration.'
  }
];

const quizQuestions = [
  {
    question: 'If an A380 accelerates at 3 m/s² for 20 seconds, what is its velocity?',
    options: ['20 m/s', '40 m/s', '50 m/s', '60 m/s'],
    correctIndex: 3, // Fixed: 60 m/s is at index 3
    explanation: 'Using the formula $v = u + at$: $v = 0 + (3 \\times 20) = 60 \\text{ m/s}$.'
  },
  {
    question: 'Why do heavier planes like the A380 need longer runways?',
    options: [
      'They have better engines',
      'High mass means lower acceleration ($a=F/m$)',
      'They have larger wheels',
      'They utilize wind energy'
    ],
    correctIndex: 1,
    explanation: 'Due to Newton\'s 2nd Law ($F=ma$), a larger mass results in lower acceleration for the same engine force, requiring more time and distance to reach takeoff speed.'
  }
];

// --- ANIMATION COMPONENT (The Explore Section) ---

const TakeoffSimulation = () => {
  // Simulation Constants
  const TARGET_SPEED = 80; // m/s (approx takeoff speed for A380)
  const ACCELERATION = 2.5; // m/s^2 (realistic heavy load acceleration)

  // State
  const [isRunning, setIsRunning] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(0); // Visual percent 0-100
  const [time, setTime] = useState(0);
  const [hasTakenOff, setHasTakenOff] = useState(false);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isRunning) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // Seconds

      // Update Physics
      if (velocity < TARGET_SPEED + 10) {
        // v = u + at
        const newVelocity = velocity + (ACCELERATION * deltaTime * 5); // *5 is a time-scale multiplier for UI speed
        setVelocity(newVelocity);
        
        // Update Time Counter
        setTime(prev => prev + (deltaTime * 5));

        // Update Distance (Visual Progress)
        // Move plane across screen. Stop at 80% width to lift off.
        const newDistance = distance + (newVelocity * deltaTime * 0.5);
        
        if (newDistance < 80) {
           setDistance(newDistance);
        } else {
           // Runway End Logic
           if (velocity >= TARGET_SPEED) {
             setHasTakenOff(true);
             setDistance(85); // Lock position for takeoff anim
           } else {
             // Crash/Abort logic could go here, but keeping it simple: just loop or stop
             setDistance(80);
           }
        }
      }
    }
    lastTimeRef.current = timestamp;
    if (!hasTakenOff) {
        requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
       if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, velocity, distance, hasTakenOff]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasTakenOff(false);
    setVelocity(0);
    setDistance(0);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner relative overflow-hidden">
        
        {/* Background Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-50 dark:from-slate-800 dark:to-slate-900 z-0"></div>

        {/* Clouds (Decorative) */}
        <motion.div 
            animate={{ x: [-20, -100] }} 
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute top-4 right-10 text-4xl opacity-50"
        >☁️</motion.div>

        {/* Dashboard Overlay */}
        <div className="absolute top-4 left-4 z-20 bg-black/70 text-white p-3 rounded-lg font-mono text-xs sm:text-sm backdrop-blur-sm border border-white/20 shadow-lg">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                <span className="text-slate-400">THRUST</span>
                <span className="text-green-400 font-bold">{isRunning ? "TOGA (100%)" : "IDLE"}</span>
                
                <span className="text-slate-400">ACCEL</span>
                <span>{isRunning ? `${ACCELERATION} m/s²` : "0 m/s²"}</span>

                <span className="text-slate-400">SPEED</span>
                <span className={`${velocity >= TARGET_SPEED ? 'text-green-400' : 'text-white'}`}>
                    {velocity.toFixed(0)} <span className="text-[10px]">m/s</span>
                </span>

                <span className="text-slate-400">TIME</span>
                <span>{time.toFixed(1)} s</span>
            </div>
            <div className="mt-2 pt-2 border-t border-white/20 text-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Target V1: {TARGET_SPEED} m/s</span>
            </div>
        </div>

        {/* Simulation Area */}
        <div className="relative w-full h-48 mt-16 z-10 flex items-end">
            
            {/* The Plane */}
            <motion.div 
                className="absolute bottom-4 text-6xl sm:text-7xl origin-bottom-right z-20 will-change-transform"
                style={{ left: `${distance}%` }}
                animate={hasTakenOff ? { y: -80, rotate: -20, x: 50 } : { y: 0, rotate: 0 }}
                transition={{ duration: 2 }}
            >
                ✈️
                {/* Thrust Fire */}
                {isRunning && !hasTakenOff && (
                    <motion.div 
                        className="absolute top-1/2 -left-4 w-8 h-4 bg-orange-500 rounded-full blur-sm"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                    />
                )}
            </motion.div>

            {/* Runway */}
            <div className="w-full h-4 bg-slate-600 relative">
                {/* Stripes */}
                <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-white/50"></div>
            </div>
        </div>

        {/* Controls */}
        <div className="relative z-20 mt-4 flex gap-4 justify-center">
            {!isRunning && !hasTakenOff ? (
                <button 
                    onClick={handleStart}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                    <span>🚀</span> Initiate Take-off
                </button>
            ) : (
                <button 
                    onClick={handleReset}
                    className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                >
                    <span>🔄</span> Reset Simulation
                </button>
            )}
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
        interactionId: 'a380-quiz',
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

  // --- CONTENT ---

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Airbus A380 Take-off</h2>
          
          <div className="space-y-5 text-slate-600 dark:text-slate-400 text-lg">
            <p>
              An Airbus A380 is massive (over 500,000 kg). To get such a heavy object to fly, we need high velocity.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wide mb-2">The Physics</h4>
              <ul className="space-y-2 text-base">
                  <li><strong>Mass (<InlineMath>m</InlineMath>):</strong> Huge mass means high inertia.</li>
                  <li><strong>Force (<InlineMath>F</InlineMath>):</strong> Engines provide massive thrust, but...</li>
                  <li><strong>Acceleration (<InlineMath>a</InlineMath>):</strong> Because <InlineMath>a = F/m</InlineMath>, the acceleration is relatively low (~2 m/s²).</li>
              </ul>
            </div>

            <p>
              Because acceleration is low, the plane needs a <strong>long time</strong> to reach takeoff speed (~80 m/s). 
            </p>
            
            <div className="flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                 <InlineMath math="v = u + at \implies 80 = 0 + (2 \times 40)" />
            </div>
            <p className="text-sm text-center italic">It takes roughly 40 seconds just to lift off!</p>
          </div>
        </div>
        
        {/* Right Panel: Interactive Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🛫 Simulation
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
                     // Animation View
                    <TakeoffSimulation />
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
      slideId="a380-takeoff-time"
      slideTitle="Airbus A380 Take-off"
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