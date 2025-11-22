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
    id: 'freefall-review-learning',
    conceptId: 'freefall-review',
    conceptName: 'Freefall Review',
    type: 'learning',
    description: 'Interactive dashboard verifying all freefall formulas simultaneously.'
  },
  {
    id: 'freefall-review-quiz',
    conceptId: 'freefall-review-quiz',
    conceptName: 'Freefall Review Quiz',
    type: 'learning',
    description: 'Final check on freefall kinematic relations.'
  }
];

const quizQuestions = [
  {
    question: 'Which of these formulas is INCORRECT for an object dropped from rest (u=0)?',
    options: ['v = gt', 's = ½gt²', 'v² = 2gs', 's = vt'],
    correctIndex: 3,
    explanation: 'The formula s = vt is for constant velocity. In freefall, velocity is changing, so we must use s = ½gt² (or s = v_avg * t).'
  },
  {
    question: 'If you drop a feather and a hammer on the Moon (no air resistance), which hits the ground first?',
    options: ['The hammer (heavier)', 'The feather (lighter)', 'They hit at the same time', 'Neither falls'],
    correctIndex: 2,
    explanation: 'Gravity acts on all mass equally (a = g). Without air resistance, mass does not appear in the kinematic equations, so they fall together.'
  }
];

// --- ANIMATION COMPONENT (The Data Recorder) ---

const FreefallDataRecorder = () => {
  // Constants
  const G_EARTH = 9.8;
  const G_MOON = 1.6;
  const HEIGHT = 100; // meters

  // State
  const [planet, setPlanet] = useState<'earth' | 'moon'>('earth');
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  
  const g = planet === 'earth' ? G_EARTH : G_MOON;
  
  // Physics State
  const velocity = g * time;
  const distance = 0.5 * g * time * time;
  
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      
      setTime(prev => {
        const newTime = prev + deltaTime;
        // Check ground hit
        const currentDist = 0.5 * g * newTime * newTime;
        if (currentDist >= HEIGHT) {
          setIsPlaying(false);
          // Solve for exact impact time t = sqrt(2h/g) to snap to end
          return Math.sqrt(2 * HEIGHT / g);
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
  }, [isPlaying, g]);

  const reset = () => {
    setIsPlaying(false);
    setTime(0);
  };

  const togglePlanet = () => {
    reset();
    setPlanet(prev => prev === 'earth' ? 'moon' : 'earth');
  };

  // Visuals
  const getTopPercent = (d: number) => (d / HEIGHT) * 100;

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Visual Drop */}
      <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-inner relative mb-6 h-64 overflow-hidden flex">
        {/* Background */}
        <div className={`absolute inset-0 opacity-20 ${planet === 'earth' ? 'bg-blue-500' : 'bg-slate-500'}`}></div>
        <div className="absolute top-2 right-2 text-[10px] uppercase font-bold text-white/50">
            {planet.toUpperCase()} (g = {g} m/s²)
        </div>

        {/* Ruler */}
        <div className="h-full w-12 border-r border-white/20 relative mr-4">
            {[0, 25, 50, 75, 100].map(m => (
                <div key={m} className="absolute right-0 w-2 border-t border-white/30 text-[8px] text-white/50 pr-3 text-right" style={{ top: `${(m/HEIGHT)*100}%` }}>
                    {m}m
                </div>
            ))}
        </div>

        {/* The Ball */}
        <div className="flex-1 relative h-full border-b-4 border-green-500">
            <motion.div 
                className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full shadow-lg z-10 ${planet === 'earth' ? 'bg-blue-400' : 'bg-gray-300'}`}
                style={{ top: `${getTopPercent(distance)}%`, marginTop: '-12px' }}
            >
                {/* Velocity Vector */}
                <div 
                    className="absolute top-full left-1/2 w-1 bg-red-500/80 -translate-x-1/2"
                    style={{ height: `${Math.min(velocity * 2, 80)}px` }}
                />
            </motion.div>
            
            {/* Trail */}
            <div 
                className="absolute top-0 left-1/2 w-0.5 bg-white/20 -translate-x-1/2"
                style={{ height: `${getTopPercent(distance)}%` }}
            />
        </div>
      </div>

      {/* 2. The Formula Dashboard */}
      <div className="w-full grid grid-cols-1 gap-2 mb-4">
          
          {/* Velocity Row */}
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Final Velocity</span>
                  <span className="text-sm font-mono text-slate-600 dark:text-slate-300">
                      <InlineMath math="v = gt" />
                  </span>
              </div>
              <div className="text-right">
                  <span className="text-sm font-mono text-slate-400">{g} × {time.toFixed(2)} = </span>
                  <span className="text-xl font-mono font-bold text-red-500 ml-1">{velocity.toFixed(1)} m/s</span>
              </div>
          </div>

          {/* Distance Row */}
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Displacement</span>
                  <span className="text-sm font-mono text-slate-600 dark:text-slate-300">
                      <InlineMath math="s = \frac{1}{2}gt^2" />
                  </span>
              </div>
              <div className="text-right">
                  <span className="text-sm font-mono text-slate-400">0.5 × {g} × {time.toFixed(2)}² = </span>
                  <span className="text-xl font-mono font-bold text-blue-500 ml-1">{distance.toFixed(1)} m</span>
              </div>
          </div>

      </div>

      {/* 3. Controls */}
      <div className="flex gap-3 w-full">
          <button 
            onClick={togglePlanet}
            className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-bold text-xs transition-colors"
          >
             Change Planet ({planet === 'earth' ? 'Earth' : 'Moon'})
          </button>
          <button 
            onClick={() => { reset(); setIsPlaying(true); }}
            disabled={isPlaying}
            className={`flex-[2] py-3 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${isPlaying ? 'bg-slate-400' : 'bg-green-600 hover:bg-green-500'}`}
          >
             {isPlaying ? 'Falling...' : '▶️ Run Experiment'}
          </button>
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
        interactionId: 'freefall-review-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review: Objects in Freefall</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              Remember, freefall is just a special case of constant acceleration where <InlineMath math="a = g" />.
            </p>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 border-b border-slate-300 dark:border-slate-600 pb-2">The "Big 3" Equations (Dropped)</h4>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">1. Velocity from Time</span>
                        <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded font-mono text-sm border border-slate-200 dark:border-slate-600"><InlineMath math="v = gt" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">2. Distance from Time</span>
                        <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded font-mono text-sm border border-slate-200 dark:border-slate-600"><InlineMath math="s = \frac{1}{2}gt^2" /></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">3. Velocity from Distance</span>
                        <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded font-mono text-sm border border-slate-200 dark:border-slate-600"><InlineMath math="v^2 = 2gs" /></span>
                    </div>
                </div>
            </div>

            <p className="text-sm italic text-slate-500">
                *Note: These simplified forms assume <InlineMath math="u=0" /> (starting from rest). If thrown, use the full kinematic equations.
            </p>
          </div>
        </div>
        
        {/* Right Panel: Interactive Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 border-b-2 border-slate-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📊 Data Recorder
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 border-b-2 border-slate-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Final Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                     <FreefallDataRecorder />
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
                                                if (selectedOption === idx) btnClass += "bg-slate-200 border-slate-500 text-slate-900 dark:bg-slate-700 dark:text-slate-200";
                                                else btnClass += "bg-white border-slate-200 hover:border-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600";
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
      slideId="freefall-review"
      slideTitle="Freefall Review"
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