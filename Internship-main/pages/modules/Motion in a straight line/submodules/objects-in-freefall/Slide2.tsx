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
    id: 'freefall-height-time-learning',
    conceptId: 'freefall-height-time',
    conceptName: 'Height from Time',
    type: 'learning',
    description: 'Interactive calculator showing the quadratic relationship between time and fall distance.'
  },
  {
    id: 'freefall-height-time-quiz',
    conceptId: 'freefall-height-time-quiz',
    conceptName: 'Height Quiz',
    type: 'learning',
    description: 'Quiz on calculating fall distance.'
  }
];

const quizQuestions = [
  {
    question: 'If an object is dropped from rest (u=0), how far does it fall in 3 seconds? (Assume g ≈ 10 m/s²)',
    options: ['30 m', '45 m', '90 m', '15 m'],
    correctIndex: 1,
    explanation: 's = ½gt² = 0.5 × 10 × (3)² = 5 × 9 = 45 meters.'
  },
  {
    question: 'Why does the distance covered in each successive second increase?',
    options: ['Gravity increases', 'Mass increases', 'Velocity increases', 'Air resistance decreases'],
    correctIndex: 2,
    explanation: 'Gravity is constant, but velocity keeps increasing (v = gt). A faster object covers more ground in the same amount of time.'
  }
];

// --- ANIMATION COMPONENT (The Cliff Calculator) ---

const HeightCalculatorSim = () => {
  const [time, setTime] = useState(0); // Seconds
  
  // Physics Constants
  const G = 9.8;
  const MAX_TIME = 5; // Max slider value
  const MAX_DIST = 0.5 * G * MAX_TIME * MAX_TIME; // Max distance for scaling (~122.5m)

  // Calculation
  const distance = 0.5 * G * time * time;

  // Visual Scaling
  const getTopPercent = (dist: number) => {
    return (dist / MAX_DIST) * 100;
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Cliff Visualization */}
      <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner relative mb-6 h-80 overflow-hidden flex">
        
        {/* The Cliff Edge (Left) */}
        <div className="w-1/4 h-full bg-slate-300 dark:bg-slate-800 border-r border-slate-400 dark:border-slate-600 relative">
            <div className="absolute top-0 right-0 w-full h-8 bg-green-500/20 border-b border-green-500/50"></div>
            <div className="absolute top-2 right-2 text-xs font-bold text-slate-500">Start (0m)</div>
        </div>

        {/* The Drop Zone (Right) */}
        <div className="flex-1 relative h-full">
            {/* Reference Lines (Every 1 second mark) */}
            {[1, 2, 3, 4, 5].map(t => {
                const d = 0.5 * G * t * t;
                return (
                    <div 
                        key={t} 
                        className="absolute w-full border-t border-dashed border-slate-300 dark:border-slate-700 text-[9px] text-slate-400 pl-2"
                        style={{ top: `${getTopPercent(d)}%` }}
                    >
                        t={t}s ({d.toFixed(1)}m)
                    </div>
                );
            })}

            {/* The Falling Object */}
            <motion.div 
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl z-10"
                animate={{ top: `${getTopPercent(distance)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                🪨
                {/* Velocity Vector */}
                {time > 0 && (
                    <div 
                        className="absolute top-1/2 left-1/2 w-1 bg-blue-500 -translate-x-1/2 origin-top opacity-70"
                        style={{ height: `${(G * time) * 1.5}px` }} // Scale vector visual
                    />
                )}
            </motion.div>

            {/* Measurement Bracket */}
            <div className="absolute right-4 top-0 border-r-2 border-slate-400 h-full opacity-50"></div>
            <motion.div 
                className="absolute right-4 top-0 border-r-4 border-red-500"
                animate={{ height: `${getTopPercent(distance)}%` }}
            />
            <motion.div 
                className="absolute right-6 text-red-500 font-bold font-mono text-sm"
                animate={{ top: `${getTopPercent(distance)}%` }}
                style={{ translateY: '-50%' }}
            >
                {distance.toFixed(1)}m
            </motion.div>
        </div>
      </div>

      {/* 2. Controls & Math */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          
          {/* Formula Display */}
          <div className="flex justify-center items-center gap-4 mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="text-sm font-mono text-slate-500 dark:text-slate-400">
                  <InlineMath math="s = \frac{1}{2}gt^2" />
              </div>
              <div className="text-xl font-mono font-bold text-slate-800 dark:text-slate-100">
                  = 0.5 × 9.8 × ({time})²
              </div>
              <div className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">
                  = {distance.toFixed(2)} m
              </div>
          </div>

          {/* Time Slider */}
          <div>
              <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                  <span>Time Elapsed (t)</span>
                  <span className="text-lg text-blue-600 dark:text-blue-400">{time} s</span>
              </label>
              <input 
                  type="range" 
                  min="0" 
                  max="5" 
                  step="0.1"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0s (Top)</span>
                  <span>1s</span>
                  <span>2s</span>
                  <span>3s</span>
                  <span>4s</span>
                  <span>5s (Bottom)</span>
              </div>
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
        interactionId: 'freefall-height-time-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Calculating Height in Freefall</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              When an object is dropped (initial velocity <InlineMath math="u=0" />), the formula for displacement simplifies beautifully.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500 text-center">
              <div className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300">
                   <InlineMath math="s = \frac{1}{2}gt^2" />
              </div>
              <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
                  Distance falls increases with the square of time.
              </p>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase tracking-wide">Quadratic Growth</h4>
                <ul className="list-disc ml-5 text-sm space-y-2">
                    <li><strong>1 second:</strong> Falls ~5 m</li>
                    <li><strong>2 seconds:</strong> Falls ~20 m (4x deeper!)</li>
                    <li><strong>3 seconds:</strong> Falls ~45 m (9x deeper!)</li>
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
                    📏 Drop Calculator
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
                     <HeightCalculatorSim />
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
      slideId="freefall-height-time"
      slideTitle="Projectile height given time"
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