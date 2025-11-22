import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- 1. DATA & CONFIG ---

const interactions: Interaction[] = [
  {
    id: 'what-is-velocity-learning',
    conceptId: 'what-is-velocity',
    conceptName: 'What is Velocity?',
    type: 'learning',
    description: 'Definition and concept of velocity.'
  },
  {
    id: 'what-is-velocity-quiz',
    conceptId: 'what-is-velocity-quiz',
    conceptName: 'Velocity Quiz',
    type: 'learning',
    description: 'Quiz on velocity definition.'
  }
];

const quizQuestions = [
  {
    question: 'Velocity is different from speed because:',
    options: ['It has direction (Vector)', 'It is always positive', 'It does not depend on time', 'It is measured in Joules'],
    correctIndex: 0,
    explanation: 'Velocity is a vector quantity, meaning it has both magnitude (speed) and direction. Speed is just a scalar.'
  },
  {
    question: 'Calculate Velocity: A car moves from x = 10m to x = 30m in 5 seconds.',
    options: ['4 m/s', '2 m/s', '6 m/s', '20 m/s'],
    correctIndex: 0,
    explanation: 'Displacement = 30 - 10 = 20m. Time = 5s. Velocity = 20/5 = 4 m/s.'
  }
];

// --- 2. ANIMATION COMPONENT (Velocity Lab) ---

const VelocityLab = () => {
  // Inputs
  const [startPos, setStartPos] = useState(10); // meters
  const [endPos, setEndPos] = useState(90);   // meters
  const [duration, setDuration] = useState(4); // seconds

  // Animation State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  
  // Physics Calculations
  const displacement = endPos - startPos;
  const velocity = displacement / duration;

  // Current Position Logic (Linear Interpolation)
  const currentPos = startPos + (displacement * (Math.min(currentTime, duration) / duration));

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time - (currentTime * 1000);
    }
    
    const elapsed = (time - startTimeRef.current) / 1000; // in seconds

    if (elapsed >= duration) {
      setCurrentTime(duration);
      setIsPlaying(false);
      startTimeRef.current = undefined;
    } else {
      setCurrentTime(elapsed);
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      startTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isPlaying, duration]); // Recalculate if duration changes mid-play

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="flex flex-col h-full w-full gap-4">
      
      {/* VISUALIZATION AREA */}
      <div className="flex-grow bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden min-h-[200px] flex flex-col justify-center">
        <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 uppercase">Simulation</div>
        
        {/* Ruler Background */}
        <div className="absolute bottom-8 left-4 right-4 h-8 border-t border-slate-400 flex justify-between text-[10px] text-slate-500 font-mono">
          <span>0m</span><span>25m</span><span>50m</span><span>75m</span><span>100m</span>
        </div>
        <div className="absolute bottom-12 left-4 right-4 h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></div>

        {/* Markers for Start/End */}
        <div className="absolute bottom-14 w-0.5 h-6 bg-green-500/50 border-l border-dashed border-green-600" style={{ left: `${startPos}%` }}>
            <span className="absolute -top-4 -left-2 text-[9px] text-green-600 font-bold">Start</span>
        </div>
        <div className="absolute bottom-14 w-0.5 h-6 bg-red-500/50 border-l border-dashed border-red-600" style={{ left: `${endPos}%` }}>
            <span className="absolute -top-4 -left-2 text-[9px] text-red-600 font-bold">End</span>
        </div>

        {/* The Car */}
        <motion.div 
          className="absolute bottom-10 text-3xl transform -translate-x-1/2 transition-transform will-change-transform"
          style={{ left: `${currentPos}%` }}
        >
          🏎️
          {/* Velocity Vector attached to car */}
          {isPlaying && (
              <div 
                className={`absolute top-1/2 left-1/2 h-1 ${velocity >= 0 ? 'bg-blue-500 origin-left' : 'bg-blue-500 origin-left rotate-180'}`}
                style={{ width: '40px', transform: `translate(-50%, -50%) ${velocity < 0 ? 'rotate(180deg)' : ''}` }}
              >
                <div className="absolute -right-1 -top-1 w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-blue-500 border-b-[4px] border-b-transparent"></div>
              </div>
          )}
        </motion.div>

        {/* Live Data Tag */}
        <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 p-2 rounded shadow-sm border border-slate-200 dark:border-slate-700 text-xs font-mono">
            <div>t: {currentTime.toFixed(2)}s</div>
            <div>x: {currentPos.toFixed(1)}m</div>
        </div>
      </div>

      {/* MATH BOARD */}
      <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
         <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase mb-1">Equation</span>
            <span className="text-sm font-mono">
                <InlineMath math={`v = \\frac{\\Delta x}{\\Delta t} = \\frac{${endPos} - ${startPos}}{${duration}}`} />
            </span>
         </div>
         <div className="text-right">
            <span className="text-xs font-bold text-slate-500 uppercase block">Result</span>
            <span className={`text-xl font-bold ${velocity > 0 ? 'text-green-600' : velocity < 0 ? 'text-red-600' : 'text-slate-600'}`}>
                {velocity.toFixed(1)} m/s
            </span>
         </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
         {/* Sliders */}
         <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
                <label className="w-24 text-xs font-bold text-green-600">Start (x_i): {startPos}m</label>
                <input 
                    type="range" min="0" max="100" step="5"
                    value={startPos} onChange={(e) => { handleReset(); setStartPos(Number(e.target.value)); }}
                    className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
            </div>
            <div className="flex items-center gap-2">
                <label className="w-24 text-xs font-bold text-red-600">End (x_f): {endPos}m</label>
                <input 
                    type="range" min="0" max="100" step="5"
                    value={endPos} onChange={(e) => { handleReset(); setEndPos(Number(e.target.value)); }}
                    className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
            </div>
            <div className="flex items-center gap-2">
                <label className="w-24 text-xs font-bold text-blue-600">Time (t): {duration}s</label>
                <input 
                    type="range" min="1" max="10" step="0.5"
                    value={duration} onChange={(e) => { handleReset(); setDuration(Number(e.target.value)); }}
                    className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>
         </div>

         {/* Buttons */}
         <div className="flex gap-2">
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={currentTime >= duration && !isPlaying} // Disable Play if finished (must reset)
                className={`flex-1 py-2 rounded-lg font-bold text-white text-sm shadow-sm transition-all ${
                    currentTime >= duration && !isPlaying ? 'bg-slate-400 cursor-not-allowed' : 
                    isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-500'
                }`}
            >
                {isPlaying ? '⏸ Pause' : currentTime >= duration ? 'Finished' : '▶ Run Simulation'}
            </button>
            <button 
                onClick={handleReset}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 hover:bg-slate-50"
            >
                ↺ Reset
            </button>
         </div>
      </div>

    </div>
  );
};

// --- 3. MAIN COMPONENT ---

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
        interactionId: 'what-is-velocity-quiz',
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
      slideId="what-is-velocity"
      slideTitle="What is Velocity?"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={localInteractions}
    >
      <div className="w-full p-4 sm:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT: THEORY CONTENT */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Velocity Definition</h2>
            
            <div className="space-y-6 text-slate-600 dark:text-slate-400">
                <p>
                    Velocity is not just how fast you are moving, but also <strong>where</strong> you are heading. It is defined as the rate of change of displacement.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 text-center my-4">
                    <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">Formula</span>
                    <div className="text-xl font-mono text-slate-800 dark:text-slate-200 mt-2">
                        <InlineMath math="v = \frac{\Delta x}{\Delta t} = \frac{x_f - x_i}{t}" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Vector Quantity</h4>
                        <p className="text-xs">Has both magnitude (speed) and direction.</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Sign Matters</h4>
                        <p className="text-xs">(+) is forward, (-) is backward.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT: INTERACTIVE LAB & QUIZ */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full min-h-[550px] flex flex-col overflow-hidden">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                  onClick={() => setViewMode('explore')}
                  className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  🧪 Velocity Lab
                </button>
                <button 
                  onClick={() => setViewMode('quiz')}
                  className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  📝 Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
                        <VelocityLab />
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
                                    <h3 className="text-lg font-bold mb-4">{currentQuestion.question}</h3>
                                    <div className="space-y-2">
                                        {currentQuestion.options.map((opt, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => handleOptionClick(idx)}
                                                disabled={showExplanation}
                                                className={`w-full p-3 rounded text-left border transition-colors ${
                                                    showExplanation 
                                                    ? (idx === currentQuestion.correctIndex ? 'bg-green-100 border-green-500' : idx === selectedOption ? 'bg-red-100 border-red-500' : 'opacity-50') 
                                                    : (selectedOption === idx ? 'bg-blue-100 border-blue-500' : 'hover:bg-slate-50 border-slate-200')
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                    {showExplanation && (
                                        <div className="mt-4 p-3 bg-slate-100 text-sm text-slate-600 rounded">
                                            <strong>Analysis:</strong> {currentQuestion.explanation}
                                        </div>
                                    )}
                                    <div className="mt-6">
                                        <button 
                                            onClick={showExplanation ? handleNextQuestion : handleSubmitAnswer}
                                            disabled={selectedOption === null}
                                            className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-500 disabled:opacity-50"
                                        >
                                            {showExplanation ? (currentQIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish') : 'Check Answer'}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="results" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                                    <div className="text-5xl mb-2">🎯</div>
                                    <h3 className="text-xl font-bold mb-2">Quiz Complete</h3>
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