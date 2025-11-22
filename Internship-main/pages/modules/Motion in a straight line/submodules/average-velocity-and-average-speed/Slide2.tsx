// Slide2.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'calc-avg-vel-learning',
    conceptId: 'calc-avg-vel',
    conceptName: 'Calculating average velocity',
    type: 'learning',
    description: 'Interactive calculator comparing Average Speed vs Average Velocity.'
  },
  {
    id: 'calc-avg-vel-quiz',
    conceptId: 'calc-avg-vel-quiz',
    conceptName: 'Average velocity quiz',
    type: 'learning',
    description: 'Quiz on average speed and velocity calculations.'
  }
];

const quizQuestions = [
  {
    question: 'Average speed is calculated using:',
    options: ['Total Displacement / Time', 'Total Distance / Time', 'Final Velocity / 2', 'Acceleration × Time'],
    correctIndex: 1,
    explanation: 'Average Speed is a scalar quantity derived from the Total Path Length (Distance) divided by time.'
  },
  {
    question: 'If you run 100m forward and 100m backward in 20 seconds, what is your Average Velocity?',
    options: ['10 m/s', '5 m/s', '0 m/s', '20 m/s'],
    correctIndex: 2,
    explanation: 'Your displacement is 0 (you returned to start). Therefore, Average Velocity = 0 / 20 = 0 m/s.'
  }
];

// --- ANIMATION COMPONENT (The Explorer) ---

const SpeedVelocitySim = () => {
  // State
  const [forwardDist, setForwardDist] = useState(30); // m
  const [backwardDist, setBackwardDist] = useState(10); // m
  const [time, setTime] = useState(10); // s

  // Calculations
  const totalDistance = forwardDist + backwardDist;
  const displacement = forwardDist - backwardDist;
  
  const avgSpeed = totalDistance / time;
  const avgVelocity = displacement / time;

  // Visual Scaling (Max track width = 50m)
  const SCALE = 100 / 50; 

  return (
    <div className="flex flex-col items-center w-full h-full">
      
      {/* 1. The Visualization Track */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-inner relative mb-6">
        <div className="text-xs font-bold text-slate-400 absolute top-2 left-2 uppercase">Top Down View</div>
        
        {/* The Road */}
        <div className="relative w-full h-16 mt-4 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
            {/* Grid Lines every 10m */}
            {[0, 10, 20, 30, 40, 50].map(m => (
                <div key={m} className="absolute top-0 bottom-0 border-r border-slate-300 dark:border-slate-600 text-[8px] text-slate-400 pt-1 pr-1" style={{ left: `${m * SCALE}%` }}>
                    {m}m
                </div>
            ))}

            {/* Path 1: Forward (Green) */}
            <motion.div 
                className="absolute top-4 h-2 bg-green-500 rounded-full opacity-60"
                style={{ left: '0%' }}
                animate={{ width: `${forwardDist * SCALE}%` }}
            />
            
            {/* Path 2: Backward (Red) */}
            <motion.div 
                className="absolute top-8 h-2 bg-red-500 rounded-full opacity-60"
                style={{ left: `${(forwardDist - backwardDist) * SCALE}%` }}
                animate={{ width: `${backwardDist * SCALE}%` }}
            />

            {/* Character Position (Final Displacement) */}
            <motion.div 
                className="absolute top-1/2 -translate-y-1/2 text-2xl"
                animate={{ left: `${displacement * SCALE}%`, x: '-50%' }}
            >
                📍
            </motion.div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 justify-center mt-2 text-[10px]">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Forward Path</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Return Path</div>
            <div className="flex items-center gap-1">📍 Final Position</div>
        </div>
      </div>

      {/* 2. Results Dashboard */}
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
          {/* Avg Speed Card */}
          <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
              <h4 className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase mb-1">Average Speed</h4>
              <div className="text-xs text-slate-500 mb-2">Total Distance / Time</div>
              <div className="font-mono text-sm">
                <InlineMath math={`\\frac{${forwardDist} + ${backwardDist}}{${time}} = `} />
                <span className="text-xl font-bold ml-1">{avgSpeed.toFixed(1)} m/s</span>
              </div>
          </div>

          {/* Avg Velocity Card */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase mb-1">Average Velocity</h4>
              <div className="text-xs text-slate-500 mb-2">Displacement / Time</div>
              <div className="font-mono text-sm">
                <InlineMath math={`\\frac{${forwardDist} - ${backwardDist}}{${time}} = `} />
                <span className="text-xl font-bold ml-1">{avgVelocity.toFixed(1)} m/s</span>
              </div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
          <div>
              <label className="flex justify-between text-xs font-bold text-green-600 mb-1">
                  <span>Forward Distance</span>
                  <span>{forwardDist} m</span>
              </label>
              <input 
                  type="range" min="0" max="50" 
                  value={forwardDist} 
                  onChange={(e) => {
                      const val = Number(e.target.value);
                      setForwardDist(val);
                      if (backwardDist > val) setBackwardDist(val); // Clamp backward
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
          </div>

          <div>
              <label className="flex justify-between text-xs font-bold text-red-600 mb-1">
                  <span>Backward Distance (Return)</span>
                  <span>{backwardDist} m</span>
              </label>
              <input 
                  type="range" min="0" max={forwardDist} 
                  value={backwardDist} 
                  onChange={(e) => setBackwardDist(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
          </div>

          <div>
              <label className="flex justify-between text-xs font-bold text-purple-600 mb-1">
                  <span>Time Taken</span>
                  <span>{time} s</span>
              </label>
              <input 
                  type="range" min="1" max="60" 
                  value={time} 
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
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
        interactionId: 'calc-avg-vel-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Calculating Speed & Velocity</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              Because Distance and Displacement are different, Speed and Velocity are calculated differently.
            </p>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-400">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Average Speed (Scalar)</h4>
                    <p className="text-sm mb-2">How much ground was covered per unit time.</p>
                    <div className="text-center py-2 bg-white dark:bg-slate-800 rounded border border-orange-200 dark:border-orange-800">
                        <InlineMath math="v_{avg} = \frac{\text{Total Distance}}{\text{Total Time}}" />
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Average Velocity (Vector)</h4>
                    <p className="text-sm mb-2">Change in position per unit time.</p>
                    <div className="text-center py-2 bg-white dark:bg-slate-800 rounded border border-blue-200 dark:border-blue-800">
                        <InlineMath math="\vec{v}_{avg} = \frac{\text{Displacement}}{\text{Total Time}}" />
                    </div>
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
                    🧮 Interactive Calculator
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
                     <SpeedVelocitySim />
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
      slideId="average-velocity-calculation"
      slideTitle="Calculating average velocity"
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