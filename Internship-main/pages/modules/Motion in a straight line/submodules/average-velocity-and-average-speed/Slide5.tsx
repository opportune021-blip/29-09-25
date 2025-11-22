// Slide5.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'avg-vel-review-learning',
    conceptId: 'avg-vel-review',
    conceptName: 'Average velocity review',
    type: 'learning',
    description: 'Interactive comparison of accumulated distance vs net displacement.'
  },
  {
    id: 'avg-vel-review-quiz',
    conceptId: 'avg-vel-review-quiz',
    conceptName: 'Final quiz',
    type: 'learning',
    description: 'Review quiz for average speed & velocity.'
  }
];

const quizQuestions = [
  {
    question: 'Speed is a scalar quantity, which means it is always:',
    options: ['Positive (or zero)', 'Negative', 'Dependent on direction', 'A vector'],
    correctIndex: 0,
    explanation: 'Speed depends on distance, which is always non-negative. It does not have a direction.'
  },
  {
    question: 'If an object travels in a circle and returns to its starting point, its Average Velocity is:',
    options: ['Maximum', 'Equal to Speed', 'Zero', 'Infinite'],
    correctIndex: 2,
    explanation: 'Since the final position is the same as the starting position, Displacement is 0. Therefore, Velocity = 0 / time = 0.'
  }
];

// --- ANIMATION COMPONENT (The Comparator) ---

const ReviewComparator = () => {
  const [position, setPosition] = useState(0); // -5 to 5
  const [totalDistance, setTotalDistance] = useState(0);
  
  const STEP_SIZE = 1;
  const SCALE_FACTOR = 10; // For visual width %

  const move = (dir: number) => {
    if (position + dir > 5 || position + dir < -5) return; // Bounds check
    
    setPosition(prev => prev + dir);
    setTotalDistance(prev => prev + 1); // Distance always adds 1 regardless of direction
  };

  const reset = () => {
    setPosition(0);
    setTotalDistance(0);
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Motion Track */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-inner relative mb-6">
        <div className="text-xs font-bold text-slate-400 absolute top-2 left-2 uppercase">Motion Track</div>
        
        {/* Track Lines */}
        <div className="relative w-full h-16 mt-6 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex items-center justify-center">
            {/* Center Marker */}
            <div className="absolute w-0.5 h-full bg-slate-400/50"></div>
            
            {/* The Character */}
            <motion.div 
                className="text-3xl relative z-10"
                animate={{ x: position * 30 }} // Moving 30px per step visually
            >
                🏃
                {/* Position Label */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold bg-slate-800 text-white px-1 rounded">
                    {position}m
                </div>
            </motion.div>
        </div>
        
        {/* Grid labels */}
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-4">
            <span>-5m</span>
            <span>0m</span>
            <span>+5m</span>
        </div>
      </div>

      {/* 2. The Dual Gauges (The Core Comparison) */}
      <div className="w-full grid grid-cols-1 gap-4 mb-6">
          
          {/* DISTANCE GAUGE (Accumulator) */}
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase">Total Distance (Scalar)</h4>
                  <span className="font-mono font-bold text-orange-600">{totalDistance} m</span>
              </div>
              {/* Bar Container */}
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden relative">
                  {/* Segments logic: just show total width growing */}
                  <motion.div 
                      className="h-full bg-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(totalDistance * 5, 100)}%` }} // Caps at 20 steps visually
                  />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Only grows. Never shrinks. Ignores direction.</p>
          </div>

          {/* DISPLACEMENT GAUGE (Vector) */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Displacement (Vector)</h4>
                  <span className="font-mono font-bold text-blue-600">{position > 0 ? '+' : ''}{position} m</span>
              </div>
              {/* Bar Container (Centered 0) */}
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden relative flex items-center justify-center">
                  <div className="absolute w-0.5 h-full bg-slate-400 z-10"></div> {/* Zero line */}
                  <motion.div 
                      className="h-full bg-blue-500 absolute"
                      initial={{ width: 0 }}
                      animate={{ 
                          width: `${Math.abs(position * 10)}%`, // 10% width per step
                          left: position < 0 ? `calc(50% - ${Math.abs(position * 10)}%)` : '50%',
                      }} 
                  />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Can cancel out. Depends on final position relative to start.</p>
          </div>

      </div>

      {/* 3. Controls */}
      <div className="flex gap-3 w-full">
          <button 
            onClick={() => move(-1)}
            className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-bold shadow-sm active:scale-95 transition-transform"
          >
             ⬅️ Move Left
          </button>
          <button 
            onClick={reset}
            className="px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 rounded-lg font-bold transition-colors"
          >
             🔄
          </button>
          <button 
            onClick={() => move(1)}
            className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-bold shadow-sm active:scale-95 transition-transform"
          >
             Move Right ➡️
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
        interactionId: 'avg-vel-review-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Review: Speed vs. Velocity</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              Understanding the difference between these two is crucial for mastering Kinematics.
            </p>

            <div className="space-y-4">
                {/* Speed Card */}
                <div className="flex gap-4 items-start p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                    <div className="text-3xl">⏱️</div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">Average Speed</h3>
                        <div className="text-xs font-bold text-orange-600 uppercase mb-1">Scalar</div>
                        <p className="text-sm mb-2">Based on the <strong>Total Path</strong> traveled.</p>
                        <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded border border-orange-200 inline-block text-sm font-mono">
                            <InlineMath math="\text{Speed} = \frac{\text{Distance}}{\text{Time}}" />
                        </div>
                    </div>
                </div>

                {/* Velocity Card */}
                <div className="flex gap-4 items-start p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="text-3xl">🧭</div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-slate-100">Average Velocity</h3>
                        <div className="text-xs font-bold text-blue-600 uppercase mb-1">Vector</div>
                        <p className="text-sm mb-2">Based on the <strong>Net Change</strong> in position.</p>
                        <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded border border-blue-200 inline-block text-sm font-mono">
                            <InlineMath math="\text{Velocity} = \frac{\text{Displacement}}{\text{Time}}" />
                        </div>
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
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200 border-b-2 border-slate-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    ⚖️ Scalar vs Vector
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
                     <ReviewComparator />
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
      slideId="average-velocity-review"
      slideTitle="Average velocity and speed review"
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