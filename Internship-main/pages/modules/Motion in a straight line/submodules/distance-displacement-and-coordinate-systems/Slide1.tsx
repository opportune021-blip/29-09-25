import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  { 
    id: 'distance-displacement-learning', 
    conceptId: 'distance-displacement', 
    conceptName: 'Distance & Displacement', 
    type: 'learning', 
    description: 'Interactive number line demonstrating scalar vs vector motion.' 
  },
  { 
    id: 'distance-displacement-quiz', 
    conceptId: 'distance-displacement-quiz', 
    conceptName: 'DD Quiz', 
    type: 'learning', 
    description: 'Quiz for distance & displacement concepts.' 
  }
];

const quizQuestions = [
  {
    question: 'Which of the following is a vector quantity?',
    options: ['Distance', 'Speed', 'Displacement', 'Mass'],
    correctIndex: 2,
    explanation: 'Displacement is a vector because it has both magnitude (length) and direction. Distance is a scalar (magnitude only).'
  },
  {
    question: 'If an object moves 5 m East, then 3 m West, what are the distance and displacement?',
    options: ['8 m, 2 m East', '8 m, 2 m West', '2 m, 8 m East', '8 m, 2 m East (signed)'],
    correctIndex: 0,
    explanation: 'Distance = 5 + 3 = 8 m (Total path). Displacement = 5 - 3 = +2 m (Final position relative to start).'
  }
];

// --- ANIMATION COMPONENT (The Explorer) ---

const DistanceSim = () => {
  // State
  const [position, setPosition] = useState(0); // Current position on number line
  const [distance, setDistance] = useState(0); // Total accumulated steps

  // Constants
  const MIN_POS = -5;
  const MAX_POS = 5;
  const STEP_SIZE = 1;

  const move = (direction: number) => {
    const newPos = position + direction;
    if (newPos >= MIN_POS && newPos <= MAX_POS) {
      setPosition(newPos);
      setDistance(prev => prev + Math.abs(direction)); // Distance always adds up
    }
  };

  const reset = () => {
    setPosition(0);
    setDistance(0);
  };

  // Helper to convert units to % for CSS
  const getLeftPercent = (val: number) => {
    // Map -5...5 to 0...100
    const range = MAX_POS - MIN_POS;
    return ((val - MIN_POS) / range) * 100;
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Simulator Visual */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-inner relative mb-8">
        <div className="text-xs font-bold text-slate-400 absolute top-2 left-2 uppercase">1D Coordinate System</div>

        {/* The Track */}
        <div className="relative w-full h-20 mt-8 flex items-center">
            {/* Base Line */}
            <div className="absolute w-full h-1 bg-slate-300 dark:bg-slate-600 rounded"></div>

            {/* Ticks and Numbers */}
            {Array.from({ length: 11 }, (_, i) => i - 5).map(val => (
                <div 
                    key={val} 
                    className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{ left: `${getLeftPercent(val)}%`, transform: 'translateX(-50%) translateY(-50%)' }}
                >
                    <div className={`w-0.5 ${val === 0 ? 'h-5 bg-slate-800 dark:bg-slate-300' : 'h-3 bg-slate-400'}`}></div>
                    <span className={`mt-4 text-[10px] font-mono ${val === 0 ? 'font-bold text-slate-800 dark:text-white' : 'text-slate-400'}`}>{val}</span>
                </div>
            ))}

            {/* Start Marker */}
            <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-full border-2 border-white dark:border-slate-800 z-0"
                style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
                title="Start Point"
            ></div>

            {/* DISPLACEMENT ARROW (Vector) */}
            {position !== 0 && (
                <motion.div 
                    className="absolute h-1 bg-blue-500 z-10"
                    style={{ top: '45%' }}
                    initial={{ width: 0, left: '50%' }}
                    animate={{ 
                        width: `${Math.abs(getLeftPercent(position) - 50)}%`,
                        left: position > 0 ? '50%' : `${getLeftPercent(position)}%`
                    }}
                >
                     {/* Arrow Head */}
                     <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[4px] border-y-transparent ${position > 0 ? 'right-0 border-l-[6px] border-l-blue-500' : 'left-0 border-r-[6px] border-r-blue-500'}`}></div>
                     {/* Label */}
                     <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-blue-600 bg-blue-100 px-1 rounded whitespace-nowrap">
                        {position > 0 ? '+' : ''}{position} m
                     </span>
                </motion.div>
            )}

            {/* THE CHARACTER */}
            <motion.div 
                className="absolute top-1/2 text-3xl z-20 cursor-grab active:cursor-grabbing"
                style={{ transform: 'translate(-50%, -50%)' }}
                animate={{ left: `${getLeftPercent(position)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                🚶
            </motion.div>
        </div>
      </div>

      {/* 2. Stats Display (Comparison) */}
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
          
          {/* Distance (Scalar) */}
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800 text-center">
              <div className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">Distance (Scalar)</div>
              <div className="text-2xl font-mono font-bold text-slate-800 dark:text-slate-100">
                  {distance} <span className="text-sm text-slate-500">m</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Total steps taken.</p>
          </div>

          {/* Displacement (Vector) */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Displacement (Vector)</div>
              <div className="text-2xl font-mono font-bold text-slate-800 dark:text-slate-100">
                  {position > 0 ? '+' : ''}{position} <span className="text-sm text-slate-500">m</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Final pos - Initial pos.</p>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="flex gap-3 w-full">
          <button 
            onClick={() => move(-1)}
            className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 rounded-xl font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          >
             ⬅️ Move West (-1)
          </button>
          
          <button 
            onClick={reset}
            className="px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl text-slate-600 dark:text-slate-300 font-bold transition-colors"
            title="Reset Position"
          >
             🔄
          </button>

          <button 
            onClick={() => move(1)}
            className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 rounded-xl font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          >
             Move East (+1) ➡️
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
        interactionId: 'distance-displacement-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Distance & Displacement</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              When an object moves, we can describe its motion in two ways. One tells us "how much ground was covered," and the other tells us "how far out of place it is."
            </p>

            <div className="space-y-4">
                {/* Distance Card */}
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">1. Distance</h3>
                    <p className="text-sm mb-2 mt-1">The total length of the path traveled.</p>
                    <ul className="list-disc ml-4 text-sm">
                        <li><strong>Scalar:</strong> Magnitude only.</li>
                        <li><strong>Always Positive:</strong> Cannot be negative.</li>
                        <li>Think: "Odometer on a car."</li>
                    </ul>
                </div>

                {/* Displacement Card */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">2. Displacement 

[Image of vectors]
</h3>
                    <p className="text-sm mb-2 mt-1">The change in position from start to end.</p>
                    <ul className="list-disc ml-4 text-sm">
                        <li><strong>Vector:</strong> Magnitude AND Direction.</li>
                        <li><strong>Can be Negative:</strong> Depends on direction.</li>
                        <li><InlineMath math="\Delta x = x_{final} - x_{initial}" /></li>
                    </ul>
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
                    🧪 Simulation
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
                     <DistanceSim />
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
      slideId="distance-displacement-intro"
      slideTitle="Distance and displacement introduction"
      moduleId="motion-in-a-straight-line"
      submoduleId="distance-displacement-and-coordinate-systems"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={interactions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}