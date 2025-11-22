// Slide5.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'acc-review-learning',
    conceptId: 'acc-review',
    conceptName: 'Acceleration Review',
    type: 'learning',
    description: 'Interactive summary of acceleration concepts.'
  },
  {
    id: 'acc-review-quiz',
    conceptId: 'acc-review-quiz',
    conceptName: 'Acceleration Review Quiz',
    type: 'learning',
    description: 'Final quiz for acceleration.'
  }
];

const quizQuestions = [
  {
    question: 'If acceleration is zero, velocity is:',
    options: ['Increasing', 'Decreasing', 'Constant', 'Zero always'],
    correctIndex: 2,
    explanation: 'Zero acceleration means there is no change in velocity, so velocity remains constant.'
  },
  {
    question: 'Which graph represents negative acceleration (slowing down)?',
    options: [
      'v-t graph with upward slope',
      'v-t graph with downward slope',
      'a-t graph above the x-axis',
      'None of the above'
    ],
    correctIndex: 1,
    explanation: 'A downward slope on a velocity-time graph indicates decreasing velocity, which is negative acceleration.'
  }
];

// --- ANIMATION COMPONENT (The Master Simulator) ---

const MasterReviewSim = () => {
  // Physics State
  const [mode, setMode] = useState<'pos' | 'zero' | 'neg'>('zero');
  const [velocity, setVelocity] = useState(20); // Initial speed
  const [position, setPosition] = useState(0);
  
  // Refs for loop
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // Constants
  const MAX_SPEED = 80;
  const MIN_SPEED = 0;

  const getAccelValue = () => {
    switch (mode) {
      case 'pos': return 10;
      case 'zero': return 0;
      case 'neg': return -10;
    }
  };

  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      const accel = getAccelValue();

      // Update Velocity
      let newVel = velocity + (accel * deltaTime * 2); // Speed multiplier for visuals
      newVel = Math.max(MIN_SPEED, Math.min(MAX_SPEED, newVel)); // Clamp

      // Update Position
      const newPos = position + (newVel * deltaTime * 1.5);
      
      setVelocity(newVel);
      setPosition(newPos > 100 ? 0 : newPos); // Wrap
    }
    lastTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [velocity, position, mode]);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      
      {/* 1. Visual Scene (Car) */}
      <div className="relative w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden border-b-4 border-slate-400">
         <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-500 uppercase">Live Motion</div>
         
         {/* Road */}
         <div className="absolute top-1/2 w-full border-t-2 border-dashed border-slate-400/50"></div>
         
         {/* Car */}
         <motion.div 
            className="absolute top-1/2 -mt-5 text-4xl"
            style={{ left: `${position}%` }}
         >
            🏎️
            {/* Velocity Vector (Blue) */}
            <div className="absolute top-1/2 left-full h-1 bg-blue-500 rounded origin-left transition-all" style={{ width: `${velocity}px` }}></div>
            {/* Accel Vector (Red) */}
            {mode !== 'zero' && (
                 <div 
                    className={`absolute -bottom-2 left-1/2 h-1 bg-red-500 rounded origin-left transition-all`} 
                    style={{ 
                        width: '30px',
                        transform: mode === 'neg' ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                 ></div>
            )}
         </motion.div>

         {/* Stats Overlay */}
         <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 p-2 rounded text-xs font-mono backdrop-blur-sm">
            <div>v: {velocity.toFixed(0)}</div>
            <div>a: {getAccelValue()}</div>
         </div>
      </div>

      {/* 2. Linked Graphs */}
      <div className="grid grid-cols-2 gap-4 h-32">
          {/* v-t Graph */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-2 relative overflow-hidden">
             <span className="text-[10px] text-slate-400 font-bold absolute top-1 left-2">Velocity vs Time</span>
             <div className="w-full h-full flex items-center justify-center pt-4">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible stroke-2 stroke-blue-500 fill-none">
                   {/* Simplified representation of current slope */}
                   {mode === 'pos' && <path d="M 0,50 L 100,0" />}
                   {mode === 'zero' && <path d="M 0,25 L 100,25" />}
                   {mode === 'neg' && <path d="M 0,0 L 100,50" />}
                   {/* Axes */}
                   <line x1="0" y1="0" x2="0" y2="50" className="stroke-slate-300 stroke-1" />
                   <line x1="0" y1="50" x2="100" y2="50" className="stroke-slate-300 stroke-1" />
                </svg>
             </div>
          </div>

          {/* a-t Graph */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-2 relative overflow-hidden">
             <span className="text-[10px] text-slate-400 font-bold absolute top-1 left-2">Accel vs Time</span>
             <div className="w-full h-full flex items-center justify-center pt-4">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible fill-purple-500/50 stroke-purple-500 stroke-1">
                   {/* Simplified representation of area */}
                   {mode === 'pos' && <rect x="0" y="0" width="100" height="20" />}
                   {mode === 'zero' && <line x1="0" y1="25" x2="100" y2="25" className="stroke-2" />} 
                   {/* Note: visually putting zero in middle for neg/pos comparison */}
                   {mode === 'neg' && <rect x="0" y="30" width="100" height="20" />}
                   
                   <line x1="0" y1="0" x2="0" y2="50" className="stroke-slate-300 stroke-1 fill-none" />
                   <line x1="0" y1="25" x2="100" y2="25" className="stroke-slate-300 stroke-1 stroke-dashed fill-none" /> 
                </svg>
             </div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="flex gap-2 mt-auto">
          <button 
            onClick={() => setMode('pos')}
            className={`flex-1 py-3 rounded-lg font-bold text-xs sm:text-sm transition-all border-b-4 ${mode === 'pos' ? 'bg-green-100 text-green-700 border-green-500' : 'bg-slate-100 border-slate-300 hover:bg-green-50'}`}
          >
            Positive Accel <br/><span className="text-[10px] font-normal">(Speed Up)</span>
          </button>
          <button 
            onClick={() => setMode('zero')}
            className={`flex-1 py-3 rounded-lg font-bold text-xs sm:text-sm transition-all border-b-4 ${mode === 'zero' ? 'bg-blue-100 text-blue-700 border-blue-500' : 'bg-slate-100 border-slate-300 hover:bg-blue-50'}`}
          >
            Zero Accel <br/><span className="text-[10px] font-normal">(Cruise)</span>
          </button>
          <button 
            onClick={() => setMode('neg')}
            className={`flex-1 py-3 rounded-lg font-bold text-xs sm:text-sm transition-all border-b-4 ${mode === 'neg' ? 'bg-red-100 text-red-700 border-red-500' : 'bg-slate-100 border-slate-300 hover:bg-red-50'}`}
          >
            Negative Accel <br/><span className="text-[10px] font-normal">(Slow Down)</span>
          </button>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide5() {
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
        interactionId: 'acc-review-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Summary: Acceleration</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              We have learned that acceleration is the <strong>rate of change of velocity</strong>. Let's review the core connections:
            </p>

            <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-2xl">🚀</div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Positive Acceleration</h4>
                        <p className="text-sm">Velocity increases. Slope of v-t graph is positive.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl">🚗</div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Zero Acceleration</h4>
                        <p className="text-sm">Constant velocity. Slope of v-t graph is zero.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="text-2xl">🛑</div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Negative Acceleration</h4>
                        <p className="text-sm">Velocity decreases. Slope of v-t graph is negative.</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-center font-mono text-sm">
                    <InlineMath math="a = \frac{\Delta v}{t}" /> &nbsp; and &nbsp; <InlineMath math="\text{Area under a-t} = \Delta v" />
                </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 border-b-2 border-slate-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🎛️ Master Simulator
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
                     <MasterReviewSim />
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
      slideId="acceleration-review"
      slideTitle="Acceleration review"
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