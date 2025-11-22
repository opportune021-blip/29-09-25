// Slide3.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'avg-vel-example-learning',
    conceptId: 'avg-vel-example',
    conceptName: 'Average velocity example',
    type: 'learning',
    description: 'Visualizing a multi-stage journey to calculate net velocity.'
  },
  {
    id: 'avg-vel-example-quiz',
    conceptId: 'avg-vel-example-quiz',
    conceptName: 'Example quiz',
    type: 'learning',
    description: 'Quiz based on vector addition examples.'
  }
];

const quizQuestions = [
  {
    question: 'A car travels 30 km East, then turns around and travels 10 km West. The total time is 1 hour. What is the Average Velocity?',
    options: ['20 km/h East', '40 km/h East', '30 km/h West', '20 km/h West'],
    correctIndex: 0,
    explanation: 'Displacement = 30 (East) - 10 (West) = +20 km. Time = 1 hr. Velocity = 20 km / 1 hr = 20 km/h East.'
  },
  {
    question: 'In the same scenario (30 km East, 10 km West, 1 hr), what is the Average Speed?',
    options: ['20 km/h', '40 km/h', '30 km/h', '0 km/h'],
    correctIndex: 1,
    explanation: 'Total Distance = 30 + 10 = 40 km. Speed = Distance / Time = 40 / 1 = 40 km/h.'
  }
];

// --- ANIMATION COMPONENT (The Solver) ---

const ProblemSolverSim = () => {
  // Scenario: Run 40m East, then 10m West.
  const [step, setStep] = useState(0); // 0: Start, 1: Leg 1, 2: Leg 2, 3: Result
  
  // Animation Variants
  const runnerVariants = {
    start: { left: '10%' },      // 0m
    leg1: { left: '90%' },       // 40m mark (visual scale)
    leg2: { left: '70%' }        // 30m mark (40 - 10)
  };

  const handleNext = () => {
    if (step < 3) setStep(prev => prev + 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      
      {/* 1. The Visual Track */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-inner relative mb-6 min-h-[200px]">
        <div className="text-xs font-bold text-slate-400 absolute top-2 left-2 uppercase">Scenario Visualization</div>

        {/* The Track */}
        <div className="relative w-full h-24 mt-8 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center">
            {/* Distance Markers */}
            {[0, 10, 20, 30, 40].map((m, i) => (
                <div key={m} className="absolute h-full border-r border-slate-300 dark:border-slate-600 text-[9px] text-slate-400 pt-1 pr-1" style={{ left: `${10 + (i * 20)}%` }}>
                    {m}m
                </div>
            ))}

            {/* Path 1 Arrow (East) */}
            <AnimatePresence>
                {step >= 1 && (
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '80%' }} // 10% to 90%
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-6 left-[10%] h-1 bg-green-500 z-10"
                    >
                         <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-green-600 bg-green-100 px-1 rounded">Leg 1: +40m</span>
                         <div className="absolute right-0 top-[-3px] border-l-[6px] border-l-green-500 border-y-[4px] border-y-transparent"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Path 2 Arrow (West) */}
            <AnimatePresence>
                {step >= 2 && (
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '20%' }} // 90% back to 70%
                        transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                        className="absolute top-10 right-[10%] h-1 bg-red-500 z-10 origin-right"
                    >
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-red-600 bg-red-100 px-1 rounded">Leg 2: -10m</span>
                        <div className="absolute left-0 top-[-3px] border-r-[6px] border-r-red-500 border-y-[4px] border-y-transparent"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Runner */}
            <motion.div 
                className="absolute text-3xl z-20 -mt-2"
                variants={runnerVariants}
                initial="start"
                animate={step === 0 ? 'start' : step === 1 ? 'leg1' : 'leg2'}
                transition={{ duration: step === 1 ? 1.5 : 1, ease: "easeInOut" }}
            >
                🏃
            </motion.div>

            {/* Result Displacement Vector */}
            <AnimatePresence>
                {step === 3 && (
                    <motion.div 
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        className="absolute bottom-2 left-[10%] w-[60%] h-2 border-b-2 border-blue-500 border-dashed flex items-end justify-center origin-left"
                    >
                         <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 rounded mb-1">Net Displacement: 30m</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* 2. The Math Logic Board */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 border-b pb-2">Calculations (Total Time: 10s)</h4>
          
          <div className="grid grid-cols-2 gap-6">
             {/* Speed Calc */}
             <div className={`transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="text-xs font-bold text-orange-600 uppercase mb-1">Avg Speed (Scalar)</div>
                <div className="text-sm font-mono space-y-1 text-slate-600 dark:text-slate-400">
                    <div>d = <span className="text-green-600">40</span> + <span className="text-red-600">10</span> = 50m</div>
                    {step === 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <InlineMath math="\text{Speed} = \frac{50}{10} = 5 \text{ m/s}" />
                        </motion.div>
                    )}
                </div>
             </div>

             {/* Velocity Calc */}
             <div className={`transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="text-xs font-bold text-blue-600 uppercase mb-1">Avg Velocity (Vector)</div>
                <div className="text-sm font-mono space-y-1 text-slate-600 dark:text-slate-400">
                    <div>x = <span className="text-green-600">+40</span> <span className="text-red-600">- 10</span> = +30m</div>
                    {step === 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <InlineMath math="\vec{v} = \frac{+30}{10} = +3 \text{ m/s}" />
                        </motion.div>
                    )}
                </div>
             </div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="flex gap-4 w-full">
         {step < 3 ? (
             <button 
                onClick={handleNext}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-md transition-all flex justify-center items-center gap-2"
             >
                {step === 0 ? "Start: Run East" : step === 1 ? "Next: Turn West" : "Show Calculation"} ➡️
             </button>
         ) : (
             <button 
                onClick={handleReset}
                className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold shadow-md transition-all"
             >
                🔄 Replay Example
             </button>
         )}
      </div>

    </div>
  );
};

// --- MAIN COMPONENT ---

export default function Slide3() {
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
        interactionId: 'avg-vel-example-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Worked Example: Multi-Stage Motion</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2 uppercase text-xs tracking-wide">The Problem</h3>
                <p className="text-lg italic text-slate-700 dark:text-slate-300">
                    "A runner travels 40m East, then turns around and travels 10m West. The total time taken is 10 seconds."
                </p>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-white border-b pb-1">Step-by-Step Solution</h4>
                
                <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <div>
                        <strong className="text-sm">Find Total Distance</strong>
                        <p className="text-sm">Add all path lengths regardless of direction.</p>
                        <div className="mt-1 font-mono text-xs bg-slate-100 dark:bg-slate-700 p-1 rounded inline-block">40 + 10 = 50m</div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <div>
                        <strong className="text-sm">Find Net Displacement</strong>
                        <p className="text-sm">Use signs! East is positive (+), West is negative (-).</p>
                        <div className="mt-1 font-mono text-xs bg-slate-100 dark:bg-slate-700 p-1 rounded inline-block">+40 - 10 = +30m</div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <div>
                        <strong className="text-sm">Apply Formulas</strong>
                        <p className="text-sm">Divide by time (10s) to get Speed and Velocity.</p>
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
                    ▶️ Visual Solver
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Practice Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                     <ProblemSolverSim />
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
      slideId="avg-velocity-example"
      slideTitle="Average velocity example"
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