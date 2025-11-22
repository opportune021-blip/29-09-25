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
    id: 'kf-avg-vel-learning',
    conceptId: 'kf-avg-vel',
    conceptName: 'Average Velocity (Constant Acceleration)',
    type: 'learning',
    description: 'Simulation comparing accelerating motion vs average velocity motion.'
  },
  {
    id: 'kf-avg-vel-quiz',
    conceptId: 'kf-avg-vel-quiz',
    conceptName: 'Average Velocity Quiz',
    type: 'learning',
    description: 'Quiz on the average velocity formula.'
  }
];

const quizQuestions = [
  {
    question: 'For an object moving with constant acceleration, the Average Velocity is:',
    options: [
      '(u + v) / 2',
      'u × v',
      'v - u',
      '(v - u) / t'
    ],
    correctIndex: 0,
    explanation: 'Since velocity changes linearly, the average is exactly the midpoint between initial (u) and final (v) velocity.'
  },
  {
    question: 'A car accelerates from 10 m/s to 30 m/s uniformly. What is its average velocity?',
    options: ['15 m/s', '20 m/s', '25 m/s', '40 m/s'],
    correctIndex: 1,
    explanation: 'v_avg = (10 + 30) / 2 = 40 / 2 = 20 m/s.'
  }
];

// --- ANIMATION COMPONENT (The Race) ---

const AvgVelocityRace = () => {
  // State
  const [u, setU] = useState(0);   // Initial velocity
  const [v, setV] = useState(20);  // Final velocity
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  
  const DURATION = 3000; // 3 seconds for the race

  // Derived values
  const avgVel = (u + v) / 2;
  
  // We normalize distance so the race always fits the screen.
  // Let's say the track length is 100 "units".
  // The positions will be calculated relative to this.

  const animate = (time: number) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current;
      
      setProgress(prev => {
        const newProgress = prev + (deltaTime / DURATION);
        if (newProgress >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return newProgress;
      });
    }
    lastTimeRef.current = time;
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

  const handlePlay = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  // --- PHYSICS CALCULATIONS FOR POSITIONS ---
  // We treat 'progress' as time 't' going from 0 to 1.
  // Distance covered by Avg Car at t=1 is "D".
  // Pos_Avg(t) = t * D
  
  // For Accel Car:
  // x(t) = u*t + 0.5*a*t^2
  // We need to scale this so x(1) also equals D.
  // We know x(1) = u(1) + 0.5(v-u)(1)^2 = u + 0.5v - 0.5u = 0.5u + 0.5v = AvgVel.
  // So mathematically they define the same endpoint if we stick to proportional units.
  
  // Visual Position (0% to 90%)
  const TRACK_WIDTH = 90; 
  
  // Car 1 (Accelerating): x = ut + 1/2at^2
  // Scaled to match track width at t=1
  const posAccelCar = ((u * progress + 0.5 * (v - u) * progress * progress) / avgVel) * TRACK_WIDTH;
  
  // Car 2 (Constant): x = vt
  const posAvgCar = (progress) * TRACK_WIDTH;

  // Safety check for div by zero if u=v=0
  const safePosAccel = isNaN(posAccelCar) ? 0 : posAccelCar;
  const safePosAvg = isNaN(posAvgCar) ? 0 : posAvgCar;

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Race Track */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner relative mb-6">
        <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Simulation</div>
        <div className="absolute top-2 right-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {progress >= 1 ? "FINISHED" : isPlaying ? "RACING..." : "READY"}
        </div>

        {/* Track Container */}
        <div className="flex flex-col gap-6 mt-8 relative">
            {/* Finish Line */}
            <div className="absolute top-0 bottom-0 right-[10%] w-1 bg-slate-300 dark:bg-slate-600 border-l border-dashed border-slate-400 z-0">
                <span className="absolute -top-4 -left-2 text-[9px] text-slate-400">FINISH</span>
            </div>

            {/* Lane 1: Accelerating */}
            <div className="relative h-12 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center overflow-visible">
                <div className="absolute left-2 top-1 text-[9px] font-bold text-blue-600 z-10">Actual Motion (Accelerating)</div>
                
                <motion.div 
                    className="absolute text-2xl z-20"
                    style={{ left: `${safePosAccel}%` }}
                >
                    🏎️
                    <div className="absolute -bottom-3 left-0 text-[8px] bg-blue-100 text-blue-700 px-1 rounded whitespace-nowrap">
                        v = {(u + (v - u) * progress).toFixed(1)}
                    </div>
                </motion.div>
            </div>

            {/* Lane 2: Average */}
            <div className="relative h-12 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center overflow-visible border-l-4 border-purple-500">
                <div className="absolute left-2 top-1 text-[9px] font-bold text-purple-600 z-10">Average Velocity (Constant)</div>
                
                <motion.div 
                    className="absolute text-2xl z-20 opacity-70 grayscale"
                    style={{ left: `${safePosAvg}%` }}
                >
                    🚙
                    <div className="absolute -bottom-3 left-0 text-[8px] bg-purple-100 text-purple-700 px-1 rounded whitespace-nowrap">
                        v = {avgVel.toFixed(1)}
                    </div>
                </motion.div>
            </div>
        </div>
      </div>

      {/* 2. Calculation Board */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 w-full mb-4 flex justify-around items-center">
          <div className="text-center">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Initial (u)</div>
              <div className="font-mono text-lg text-blue-600 font-bold">{u} m/s</div>
          </div>
          <div className="text-2xl text-slate-300">+</div>
          <div className="text-center">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Final (v)</div>
              <div className="font-mono text-lg text-blue-600 font-bold">{v} m/s</div>
          </div>
          <div className="text-2xl text-slate-300">÷ 2 =</div>
          <div className="text-center bg-purple-50 dark:bg-purple-900/30 px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="text-[10px] uppercase text-purple-600 dark:text-purple-300 font-bold">Average (<InlineMath math="v_{avg}"/>)</div>
              <div className="font-mono text-xl text-purple-700 dark:text-purple-200 font-bold">{avgVel.toFixed(1)} m/s</div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Initial Velocity (u)
                  </label>
                  <input 
                      type="range" min="0" max="30" step="1"
                      value={u} onChange={(e) => { setU(Number(e.target.value)); setProgress(0); setIsPlaying(false); }}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
              </div>
              <div>
                  <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Final Velocity (v)
                  </label>
                  <input 
                      type="range" min={u} max="50" step="1"
                      value={v} onChange={(e) => { setV(Number(e.target.value)); setProgress(0); setIsPlaying(false); }}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
              </div>
          </div>

          <button 
            onClick={handlePlay}
            disabled={isPlaying}
            className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${isPlaying ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-500'}`}
          >
             {isPlaying ? 'Racing...' : '🏁 Start Race'}
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
        interactionId: 'kf-avg-vel-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Average Velocity (Constant Acceleration)</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              When acceleration is <strong>constant</strong> (velocity changes steadily), finding the average velocity is simple.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 text-center">
              <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">The Formula</h4>
              <div className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300">
                   <InlineMath math="v_{avg} = \frac{u + v}{2}" />
              </div>
              <p className="text-sm mt-3 text-slate-500 dark:text-slate-400">
                  Where <InlineMath math="u" /> is initial velocity and <InlineMath math="v" /> is final velocity.
              </p>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">Why does this work?</h4>
                <p className="text-sm">
                    Because velocity increases linearly, the "middle" speed perfectly balances the slow start and the fast finish. The object covers the same distance as if it had traveled at this average speed the entire time.
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
                    🏁 Race Simulator
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
                     <AvgVelocityRace />
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
      slideId="kf-average-velocity"
      slideTitle="Average velocity for constant acceleration"
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