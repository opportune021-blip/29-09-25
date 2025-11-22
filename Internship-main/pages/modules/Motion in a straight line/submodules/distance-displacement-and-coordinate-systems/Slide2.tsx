// Slide2.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  { 
    id: 'distance-displacement-1d-learning', 
    conceptId: 'distance-displacement-1d', 
    conceptName: 'Distance & Displacement 1D', 
    type: 'learning', 
    description: 'Interactive lab for calculating 1D displacement.' 
  },
  { 
    id: 'distance-displacement-1d-quiz', 
    conceptId: 'distance-displacement-1d-quiz', 
    conceptName: '1D quiz', 
    type: 'learning', 
    description: 'Quiz on 1D position changes.' 
  }
];

const quizQuestions = [
  {
    question: 'An object moves from x = 2 m to x = -3 m. What is its displacement?',
    options: ['5 m', '-5 m', '-1 m', '1 m'],
    correctIndex: 1,
    explanation: 'Displacement = Final - Initial. (-3) - (2) = -5 m.'
  },
  {
    question: 'In 1D motion, if the displacement is negative, the object moved:',
    options: ['To the right (Positive direction)', 'To the left (Negative direction)', 'Upwards', 'It did not move'],
    correctIndex: 1,
    explanation: 'A negative sign in 1D motion typically indicates motion in the negative direction (left or down).'
  }
];

// --- ANIMATION COMPONENT (The Lab) ---

const OneDimensionalMotionLab = () => {
  // State
  const [startPos, setStartPos] = useState(2);
  const [endPos, setEndPos] = useState(-3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Visual Scaling
  const MIN_POS = -6;
  const MAX_POS = 6;
  const RANGE = MAX_POS - MIN_POS;

  const getPercent = (val: number) => {
    return ((val - MIN_POS) / RANGE) * 100;
  };

  const handleSimulate = () => {
    setIsAnimating(true);
    setShowResult(false);
    
    // Simple timeout to sequence the animation states
    setTimeout(() => {
      setShowResult(true);
      setIsAnimating(false);
    }, 1500);
  };

  const displacement = endPos - startPos;
  const distance = Math.abs(displacement);

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Coordinate System Visual */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-inner relative mb-6">
        <div className="text-xs font-bold text-slate-400 absolute top-2 left-2 uppercase">1D Axis (Meters)</div>

        <div className="relative w-full h-24 mt-8">
            {/* The Axis Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-300 dark:bg-slate-600 rounded"></div>

            {/* Ticks */}
            {Array.from({ length: RANGE + 1 }, (_, i) => i + MIN_POS).map(val => (
                <div 
                    key={val} 
                    className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{ left: `${getPercent(val)}%`, transform: 'translateX(-50%) translateY(-50%)' }}
                >
                    <div className={`w-0.5 ${val === 0 ? 'h-6 bg-slate-800 dark:bg-slate-200' : 'h-3 bg-slate-400'}`}></div>
                    <span className={`mt-5 text-[10px] font-mono ${val === 0 ? 'font-bold text-slate-800 dark:text-white' : 'text-slate-400'}`}>{val}</span>
                </div>
            ))}

            {/* Start Flag */}
            <motion.div 
                className="absolute top-1/2 -translate-y-6 flex flex-col items-center z-10"
                style={{ left: `${getPercent(startPos)}%`, x: '-50%' }}
                animate={{ opacity: isAnimating ? 0.5 : 1 }}
            >
                <span className="text-xs font-bold text-green-600 bg-green-100 px-1 rounded mb-1">Start ({startPos})</span>
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow"></div>
            </motion.div>

            {/* End Flag */}
            <motion.div 
                className="absolute top-1/2 translate-y-3 flex flex-col-reverse items-center z-10"
                style={{ left: `${getPercent(endPos)}%`, x: '-50%' }}
            >
                <span className="text-xs font-bold text-red-600 bg-red-100 px-1 rounded mt-1">End ({endPos})</span>
                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow"></div>
            </motion.div>

            {/* The Object / Character */}
            <motion.div 
                className="absolute top-1/2 -translate-y-1/2 text-2xl z-20"
                initial={{ left: `${getPercent(startPos)}%` }}
                animate={{ 
                    left: isAnimating || showResult ? `${getPercent(endPos)}%` : `${getPercent(startPos)}%`
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ x: '-50%', y: '-50%' }}
            >
                🏎️
            </motion.div>

            {/* Displacement Arrow (Shows up during animation) */}
            <AnimatePresence>
                {(isAnimating || showResult) && (
                    <motion.div 
                        className="absolute h-1 bg-blue-500 z-10"
                        style={{ top: '48%' }}
                        initial={{ 
                            left: `${getPercent(startPos)}%`, 
                            width: 0 
                        }}
                        animate={{ 
                            left: displacement > 0 ? `${getPercent(startPos)}%` : `${getPercent(endPos)}%`,
                            width: `${Math.abs(getPercent(endPos) - getPercent(startPos))}%`
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        {/* Arrowhead */}
                        <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[4px] border-y-transparent ${displacement > 0 ? 'right-0 border-l-[6px] border-l-blue-500' : 'left-0 border-r-[6px] border-r-blue-500'}`}></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* 2. Controls & Results */}
      <div className="w-full grid grid-cols-1 gap-4">
        
        {/* Inputs */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-green-600 mb-1">Initial Position (<InlineMath math="x_i"/>)</label>
                <input 
                    type="number" 
                    min={MIN_POS} max={MAX_POS}
                    value={startPos}
                    onChange={(e) => { setStartPos(Number(e.target.value)); setShowResult(false); }}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 font-mono"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-red-600 mb-1">Final Position (<InlineMath math="x_f"/>)</label>
                <input 
                    type="number" 
                    min={MIN_POS} max={MAX_POS}
                    value={endPos}
                    onChange={(e) => { setEndPos(Number(e.target.value)); setShowResult(false); }}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 font-mono"
                />
            </div>
        </div>

        {/* Action */}
        <button 
            onClick={handleSimulate}
            disabled={isAnimating}
            className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all ${isAnimating ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-500'}`}
        >
            {isAnimating ? 'Moving...' : '▶️ Calculate Displacement'}
        </button>

        {/* Results Board */}
        <AnimatePresence>
            {showResult && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Calculation:</span>
                        <span className="text-xs bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded font-mono">
                            <InlineMath math="\Delta x = x_f - x_i" />
                        </span>
                    </div>
                    <div className="text-center text-xl font-mono font-bold text-slate-800 dark:text-white">
                        {endPos} - ({startPos}) = <span className={displacement >= 0 ? 'text-green-600' : 'text-red-600'}>{displacement} m</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-300 dark:border-slate-700 text-xs text-slate-500 flex justify-between">
                        <span>Total Distance: {distance} m</span>
                        <span>Direction: {displacement > 0 ? 'Right ➡️' : displacement < 0 ? '⬅️ Left' : 'None'}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

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
        interactionId: 'distance-displacement-1d-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Distance & Displacement in 1D</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              In one dimension (like a straight line), we use a <strong>Coordinate System</strong>. We choose an origin (0) and a positive direction.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase tracking-wide">The Formula</h4>
              <div className="flex justify-center items-center bg-white dark:bg-slate-800 p-3 rounded border border-blue-100 dark:border-blue-800 mb-2">
                  <InlineMath math="\Delta x = x_{final} - x_{initial}" />
              </div>
              <ul className="list-disc ml-5 text-sm space-y-1">
                  <li><InlineMath math="x_{final}" /> = Ending position</li>
                  <li><InlineMath math="x_{initial}" /> = Starting position</li>
                  <li><InlineMath math="\Delta x" /> = Displacement (Change in position)</li>
              </ul>
            </div>

            <div className="space-y-2">
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">Sign Conventions:</p>
                <div className="grid grid-cols-2 gap-2 text-center text-sm">
                    <div className="bg-green-100 text-green-800 p-2 rounded">
                        <strong>Positive (+)</strong><br/>Moving Right / Up
                    </div>
                    <div className="bg-red-100 text-red-800 p-2 rounded">
                        <strong>Negative (-)</strong><br/>Moving Left / Down
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
                    📏 1D Lab
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
                     <OneDimensionalMotionLab />
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
      slideId="distance-displacement-1d"
      slideTitle="Distance and displacement in one dimension"
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