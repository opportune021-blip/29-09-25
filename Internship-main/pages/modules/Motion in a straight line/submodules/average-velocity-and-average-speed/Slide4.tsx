// Slide4.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'disp-from-vel-learning',
    conceptId: 'disp-from-vel',
    conceptName: 'Displacement from velocity',
    type: 'learning',
    description: 'Interactive lab to compute displacement from velocity and time.'
  },
  {
    id: 'disp-from-vel-quiz',
    conceptId: 'disp-from-vel-quiz',
    conceptName: 'Velocity → displacement quiz',
    type: 'learning',
    description: 'Quiz on displacement from velocity.'
  }
];

const quizQuestions = [
  {
    question: 'If velocity is -5 m/s and time is 4 seconds, what is the displacement?',
    options: ['20 m', '-20 m', '9 m', '-1 m'],
    correctIndex: 1,
    explanation: 'Displacement = velocity × time. (-5 m/s) × (4 s) = -20 m (20 meters backwards).'
  },
  {
    question: 'To calculate displacement from constant velocity, we use the formula:',
    options: ['x = v / t', 'x = v + t', 'x = v × t', 'x = v - t'],
    correctIndex: 2,
    explanation: 'Displacement is the product of velocity and time.'
  }
];

// --- ANIMATION COMPONENT (The Lab) ---

const DisplacementLab = () => {
  // Inputs
  const [velocity, setVelocity] = useState(5); // m/s (-10 to 10)
  const [duration, setDuration] = useState(4); // s (1 to 10)
  
  // Simulation State
  const [currentPos, setCurrentPos] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // The Loop
  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // seconds
      
      setCurrentTime(prevTime => {
        const newTime = prevTime + deltaTime;
        
        if (newTime >= duration) {
            // Animation Complete
            setIsPlaying(false);
            setCurrentPos(velocity * duration); // Snap to exact final
            return duration;
        }

        // Update Position based on current time
        // x = v * t
        setCurrentPos(velocity * newTime);
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

  const handleRun = () => {
    setCurrentPos(0);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentPos(0);
    setCurrentTime(0);
  };

  // Visual Scaling
  // Track goes from -50m to +50m (Total 100m range)
  const MAX_RANGE = 50;
  const getLeftPercent = (meters: number) => {
      // Map -50...50 to 0...100%
      return ((meters + MAX_RANGE) / (MAX_RANGE * 2)) * 100;
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      
      {/* 1. The Simulation Track */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner relative mb-4">
        <div className="text-xs font-bold text-slate-400 absolute top-2 left-2 uppercase">Motion Track</div>
        
        <div className="relative w-full h-24 mt-6 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
            {/* Center Line (0) */}
            <div className="absolute top-0 bottom-0 left-1/2 border-r-2 border-slate-400/50 z-0"></div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500">0m</div>

            {/* Grid Markers (-40, -20, 20, 40) */}
            {[-40, -20, 20, 40].map(m => (
                 <div key={m} className="absolute top-0 bottom-0 border-r border-slate-300 dark:border-slate-600/50" style={{ left: `${getLeftPercent(m)}%` }}>
                    <span className="absolute bottom-1 right-1 text-[9px] text-slate-400">{m}</span>
                 </div>
            ))}

            {/* The Path Trace */}
            <motion.div 
                className={`absolute top-10 h-2 rounded-full opacity-50 ${velocity >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ 
                    left: velocity >= 0 ? '50%' : `${getLeftPercent(currentPos)}%`,
                    width: `${Math.abs(currentPos) * (100 / (MAX_RANGE * 2))}%` 
                }}
            />

            {/* The Object (FIXED: Used transform instead of x) */}
            <motion.div 
                className="absolute top-6 text-2xl z-10"
                style={{ 
                    left: `${getLeftPercent(currentPos)}%`, 
                    transform: 'translateX(-50%)' // Replaced 'x' with standard CSS transform
                }}
            >
                {velocity >= 0 ? '🏎️' : '🚜'} 
            </motion.div>

            {/* Live Position Label (FIXED: Used transform instead of x) */}
            <div 
                className="absolute top-2 text-[10px] font-mono font-bold bg-white/80 dark:bg-black/50 px-1 rounded backdrop-blur-sm"
                style={{ 
                    left: `${getLeftPercent(currentPos)}%`, 
                    transform: 'translateX(-50%)' // Replaced 'x' with standard CSS transform
                }}
            >
                {currentPos.toFixed(1)}m
            </div>
        </div>
      </div>

      {/* 2. Calculations Board */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4 flex justify-between items-center">
           <div className="text-left">
               <div className="text-xs font-bold text-slate-400 uppercase mb-1">Formula</div>
               <div className="text-sm font-mono text-slate-600 dark:text-slate-300">
                   <InlineMath math="x = v \times t" />
               </div>
           </div>

           <div className="text-right">
               <div className="text-xs font-bold text-slate-400 uppercase mb-1">Live Calculation</div>
               <div className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                   {velocity}m/s × {currentTime.toFixed(1)}s = {currentPos.toFixed(1)}m
               </div>
           </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full grid grid-cols-1 gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          
          <div className="grid grid-cols-2 gap-6">
            {/* Velocity Slider */}
            <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                    <span>Velocity (v)</span>
                    <span className={velocity >= 0 ? 'text-green-600' : 'text-red-600'}>{velocity} m/s</span>
                </label>
                <input 
                    type="range" min="-10" max="10" step="1"
                    value={velocity} 
                    onChange={(e) => { setVelocity(Number(e.target.value)); handleReset(); }}
                    disabled={isPlaying}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                    <span>West (-10)</span>
                    <span>Stop (0)</span>
                    <span>East (+10)</span>
                </div>
            </div>

            {/* Time Slider */}
            <div>
                <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                    <span>Time (t)</span>
                    <span>{duration} s</span>
                </label>
                <input 
                    type="range" min="1" max="10" step="0.5"
                    value={duration} 
                    onChange={(e) => { setDuration(Number(e.target.value)); handleReset(); }}
                    disabled={isPlaying}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-2">
             <button 
                onClick={handleRun}
                disabled={isPlaying || (currentTime >= duration && currentPos !== 0)}
                className={`flex-1 py-3 rounded-lg font-bold text-white transition-all shadow-md flex justify-center items-center gap-2 ${isPlaying ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-500'}`}
             >
                {isPlaying ? 'Running...' : '▶️ Calculate & Move'}
             </button>
             <button 
                onClick={handleReset}
                className="px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-bold transition-colors"
             >
                🔄 Reset
             </button>
          </div>

      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide4() {
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
        interactionId: 'disp-from-vel-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Displacement from Velocity</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              If an object moves with a <strong>constant velocity</strong>, calculating its displacement is straightforward.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700 text-center">
                <span className="text-sm uppercase text-slate-500 font-bold block mb-2">The Formula</span>
                <div className="text-xl font-mono font-bold text-slate-800 dark:text-slate-100">
                     <InlineMath math="\text{Displacement} = \text{Velocity} \times \text{Time}" />
                </div>
                <div className="mt-2 text-lg font-mono text-purple-600">
                     <InlineMath math="x = v \cdot t" />
                </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">Important Notes:</h4>
                <ul className="list-disc ml-5 space-y-2 text-sm">
                    <li><strong>Units:</strong> Ensure units match! (e.g., <InlineMath math="\text{m/s} \times \text{s} = \text{meters}" />).</li>
                    <li><strong>Direction Matters:</strong> 
                        <ul className="list-circle ml-5 mt-1 text-xs text-slate-500 dark:text-slate-300">
                            <li>Positive Velocity (<InlineMath math="+v" />) → Positive Displacement (Forward).</li>
                            <li>Negative Velocity (<InlineMath math="-v" />) → Negative Displacement (Backward).</li>
                        </ul>
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
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📉 Displacement Lab
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                     <DisplacementLab />
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
                                                if (selectedOption === idx) btnClass += "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
                                                else btnClass += "bg-white border-slate-200 hover:border-purple-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600";
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
                                        className="px-6 py-2 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-500 transition-colors"
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
      slideId="disp-from-velocity-example"
      slideTitle="Displacement from velocity"
      moduleId="motion-in-a-straight-line"
      submoduleId="average-velocity-and-average-speed"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}