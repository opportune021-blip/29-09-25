// Slide1.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'freefall-disp-vel-learning',
    conceptId: 'freefall-disp-vel',
    conceptName: 'Projectile Displacement & Velocity',
    type: 'learning',
    description: 'Simulation of an object in freefall demonstrating acceleration due to gravity.'
  },
  {
    id: 'freefall-disp-vel-quiz',
    conceptId: 'freefall-disp-vel-quiz',
    conceptName: 'Freefall Quiz',
    type: 'learning',
    description: 'Quiz on displacement and velocity in freefall.'
  }
];

const quizQuestions = [
  {
    question: 'In freefall (ignoring air resistance), what is the value of acceleration?',
    options: ['0 m/s²', '9.8 m/s² downward', 'Increasing with time', 'Depends on mass'],
    correctIndex: 1,
    explanation: 'The only force acting is gravity, which causes a constant acceleration of g ≈ 9.8 m/s² downwards.'
  },
  {
    question: 'As an object falls freely, what happens to its velocity?',
    options: ['Remains constant', 'Decreases linearly', 'Increases linearly', 'Increases exponentially'],
    correctIndex: 2,
    explanation: 'Velocity increases by 9.8 m/s every second (v = u + gt). This is a linear relationship.'
  }
];

// --- ANIMATION COMPONENT (The Freefall Lab) ---

const FreefallLab = () => {
  // Physics Constants
  const GRAVITY = 9.8; // m/s^2
  const INITIAL_HEIGHT = 100; // meters

  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [position, setPosition] = useState(INITIAL_HEIGHT); // Current Y (meters)
  const [velocity, setVelocity] = useState(0); // Current V (m/s)
  const [traces, setTraces] = useState<number[]>([]); // Store Y positions for ghost trail

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const lastTraceTime = useRef<number>(0);

  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // seconds
      
      // Update Physics
      // v = u + gt
      const newVel = velocity + (GRAVITY * deltaTime);
      
      // s = ut + 0.5gt^2 (Change in position)
      // New Pos = Old Pos - (Distance traveled in this frame)
      // Approximated frame step: dy = v * dt
      const newPos = position - (newVel * deltaTime);

      if (newPos <= 0) {
        // Hit ground
        setPosition(0);
        setVelocity(newVel);
        setIsPlaying(false);
        return;
      }

      // Add ghost trace every 1 second (simulated time)
      const newTotalTime = time + deltaTime;
      if (Math.floor(newTotalTime) > Math.floor(time)) {
          setTraces(prev => [...prev, newPos]);
      }

      setTime(newTotalTime);
      setVelocity(newVel);
      setPosition(newPos);
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
  }, [isPlaying, velocity, position, time]);

  const handleDrop = () => {
    handleReset();
    setTimeout(() => setIsPlaying(true), 100);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
    setPosition(INITIAL_HEIGHT);
    setVelocity(0);
    setTraces([]);
    lastTraceTime.current = 0;
  };

  // Visual Scaling
  // 100m height maps to 100% of container height
  const getBottomPercent = (y: number) => {
      return (y / INITIAL_HEIGHT) * 100;
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Drop Zone */}
      <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner relative mb-6 h-64 overflow-hidden">
        {/* Height Markers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-slate-300 dark:border-slate-700 flex flex-col justify-between py-2">
            {[100, 75, 50, 25, 0].map(h => (
                <div key={h} className="text-[9px] text-slate-400 text-right pr-1 relative">
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-px bg-slate-400"></span>
                    {h}m
                </div>
            ))}
        </div>

        {/* Ghost Traces (History) */}
        {traces.map((y, i) => (
            <div 
                key={i}
                className="absolute left-1/2 w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 opacity-50"
                style={{ 
                    bottom: `${getBottomPercent(y)}%`, 
                    transform: 'translate(-50%, 50%)' 
                }}
            >
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 whitespace-nowrap">t={i+1}s</span>
            </div>
        ))}

        {/* The Falling Object */}
        <motion.div 
            className="absolute left-1/2 text-2xl z-10"
            style={{ 
                bottom: `${getBottomPercent(position)}%`, 
                transform: 'translate(-50%, 50%)' 
            }}
        >
            🟡
            {/* Velocity Vector */}
            <div 
                className="absolute top-full left-1/2 w-1 bg-red-500 origin-top -translate-x-1/2"
                style={{ height: `${velocity * 1.5}px` }} // Scale vector visually
            >
                {/* Arrowhead */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[6px] border-t-red-500"></div>
            </div>
        </motion.div>

        {/* Ground */}
        <div className="absolute bottom-0 w-full h-2 bg-slate-400 dark:bg-slate-600"></div>
      </div>

      {/* 2. Telemetry Dashboard */}
      <div className="grid grid-cols-3 gap-2 w-full mb-6">
          <div className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Time</div>
              <div className="text-lg font-mono text-slate-700 dark:text-slate-200">{time.toFixed(2)}s</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Velocity</div>
              <div className="text-lg font-mono text-red-500">{velocity.toFixed(1)} m/s</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Height</div>
              <div className="text-lg font-mono text-blue-500">{position.toFixed(1)} m</div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="flex gap-4 w-full">
          <button 
            onClick={handleDrop}
            disabled={isPlaying || position <= 0}
            className={`flex-1 py-3 rounded-lg font-bold text-white shadow-md transition-all flex justify-center items-center gap-2 ${isPlaying || position <= 0 ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
             ⬇️ Drop Ball
          </button>
          <button 
            onClick={handleReset}
            className="px-6 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-200 font-bold transition-colors"
          >
             🔄 Reset
          </button>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide1() {
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
        interactionId: 'freefall-disp-vel-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Projectile Displacement & Velocity</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              <strong>Freefall</strong> is a specific type of motion where the <em>only</em> force acting on an object is gravity.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase tracking-wide">Gravity's Role</h4>
              <p className="text-sm">
                  Gravity causes a constant downward acceleration. Near Earth's surface, this value is:
              </p>
              <div className="text-center text-xl font-mono font-bold text-blue-700 dark:text-blue-300 mt-2">
                  g ≈ 9.8 m/s²
              </div>
            </div>

            <div className="space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-white border-b pb-1">Key Equations (Dropped from Rest)</h4>
                
                <div className="flex items-start gap-3">
                    <span className="p-2 bg-slate-100 dark:bg-slate-700 rounded font-mono text-sm"><InlineMath math="v = gt" /></span>
                    <p className="text-sm mt-1"><strong>Velocity</strong> increases linearly with time.</p>
                </div>

                <div className="flex items-start gap-3">
                    <span className="p-2 bg-slate-100 dark:bg-slate-700 rounded font-mono text-sm"><InlineMath math="s = \frac{1}{2}gt^2" /></span>
                    <p className="text-sm mt-1"><strong>Displacement</strong> increases quadratically (it speeds up!).</p>
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
                    🟡 Freefall Lab
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
                     <FreefallLab />
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
      slideId="freefall-disp-vel"
      slideTitle="Projectile displacement and velocity"
      moduleId="motion-in-a-straight-line"
      submoduleId="objects-in-freefall"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}