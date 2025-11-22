// Slide3.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  {
    id: 'freefall-impact-velocity-learning',
    conceptId: 'freefall-impact-velocity',
    conceptName: 'Impact Velocity',
    type: 'learning',
    description: 'Simulator calculating impact velocity based on drop height.'
  },
  {
    id: 'freefall-impact-velocity-quiz',
    conceptId: 'freefall-impact-velocity-quiz',
    conceptName: 'Impact Velocity Quiz',
    type: 'learning',
    description: 'Quiz on the relationship between height and final speed.'
  }
];

const quizQuestions = [
  {
    question: 'If an object is dropped from height h, its impact velocity (v) is given by:',
    options: ['v = gh', 'v = 2gh', 'v = √(2gh)', 'v = ½gh²'],
    correctIndex: 2,
    explanation: 'From kinematic equation v² = u² + 2as: v² = 0 + 2gh, so v = √(2gh).'
  },
  {
    question: 'To double the impact velocity, how much higher must you drop the object?',
    options: ['2 times higher', '4 times higher', 'sqrt(2) times higher', 'It stays the same'],
    correctIndex: 1,
    explanation: 'Since v ∝ √h, to get 2v, you need √(4h). Therefore, height must be quadrupled.'
  }
];

// --- ANIMATION COMPONENT (Impact Simulator) ---

const ImpactSim = () => {
  // Constants
  const G = 9.8;
  const MAX_HEIGHT = 100; // Meters

  // State
  const [dropHeight, setDropHeight] = useState(20); // Meters
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(dropHeight);
  const [currentVelocity, setCurrentVelocity] = useState(0);
  const [impactOccurred, setImpactOccurred] = useState(false);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // Reset simulation when slider changes
  useEffect(() => {
    if (!isPlaying) {
      setCurrentHeight(dropHeight);
      setCurrentVelocity(0);
      setImpactOccurred(false);
    }
  }, [dropHeight, isPlaying]);

  const animate = (timestamp: number) => {
    if (lastTimeRef.current !== undefined && isPlaying) {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // seconds
      
      // Calculate new state
      // v = u + gt
      const newVel = currentVelocity + (G * deltaTime);
      
      // dy = v * dt
      const dy = newVel * deltaTime;
      const newH = currentHeight - dy;

      if (newH <= 0) {
        // Impact!
        setCurrentHeight(0);
        // Calculate exact theoretical impact velocity for display
        const finalV = Math.sqrt(2 * G * dropHeight);
        setCurrentVelocity(finalV);
        setImpactOccurred(true);
        setIsPlaying(false);
        return;
      }

      setCurrentVelocity(newVel);
      setCurrentHeight(newH);
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
  }, [isPlaying, currentVelocity, currentHeight]);

  const handleDrop = () => {
    setImpactOccurred(false);
    setCurrentHeight(dropHeight);
    setCurrentVelocity(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setImpactOccurred(false);
    setCurrentHeight(dropHeight);
    setCurrentVelocity(0);
  };

  // Visual Helpers
  const getTopPercent = (h: number) => {
      // Map 0..100m to 100%..0% (CSS top)
      // 100m is top (0%), 0m is bottom (100%)
      return 100 - (h / MAX_HEIGHT) * 100;
  };

  // Calculate gauge rotation (0 to 50 m/s maps to -90deg to 90deg)
  const gaugeAngle = Math.min(currentVelocity, 50) * (180 / 50) - 90;

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Drop Zone */}
      <div className="w-full bg-sky-50 dark:bg-slate-900 rounded-xl border-4 border-slate-300 dark:border-slate-700 shadow-inner relative mb-6 h-64 overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 20%' }}>
        </div>

        {/* Height Markers */}
        <div className="absolute left-0 h-full flex flex-col justify-between py-2 text-[9px] text-slate-400 pl-1 font-mono">
            <span>100m</span>
            <span>75m</span>
            <span>50m</span>
            <span>25m</span>
            <span>0m</span>
        </div>

        {/* The Ball */}
        <motion.div 
            className="absolute left-1/2 -translate-x-1/2 text-3xl z-20"
            style={{ top: `${getTopPercent(currentHeight)}%`, marginTop: '-1rem' }}
        >
            {impactOccurred ? '💥' : '🏐'}
        </motion.div>

        {/* Start Height Line */}
        {!isPlaying && !impactOccurred && (
            <div 
                className="absolute left-0 w-full border-t border-dashed border-slate-400 flex justify-end pr-2 items-center"
                style={{ top: `${getTopPercent(dropHeight)}%` }}
            >
                <span className="bg-slate-200 dark:bg-slate-800 text-[10px] px-1 rounded text-slate-600 dark:text-slate-300">h = {dropHeight}m</span>
            </div>
        )}

        {/* Ground */}
        <div className="absolute bottom-0 w-full h-2 bg-green-600/50"></div>
      </div>

      {/* 2. Speedometer & Stats */}
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
          
          {/* Speedometer */}
          <div className="bg-slate-800 rounded-xl p-2 flex flex-col items-center justify-center shadow-lg border border-slate-600 relative overflow-hidden">
              <div className="text-[9px] text-slate-400 uppercase font-bold mb-4 z-10">Speedometer</div>
              
              {/* Gauge Arc */}
              <div className="w-24 h-12 overflow-hidden relative z-10">
                  <div className="w-24 h-24 rounded-full border-8 border-slate-600 border-t-green-500 border-r-yellow-500 border-b-red-500 absolute top-0 left-0" style={{ transform: 'rotate(-45deg)' }}></div>
              </div>
              
              {/* Needle */}
              <motion.div 
                  className="absolute bottom-4 w-1 h-12 bg-red-500 origin-bottom rounded-full z-20"
                  animate={{ rotate: gaugeAngle }}
                  style={{ bottom: '1.5rem' }}
              />
              
              {/* Value */}
              <div className="text-xl font-mono font-bold text-white mt-1 z-10">
                  {currentVelocity.toFixed(1)} <span className="text-xs text-slate-400">m/s</span>
              </div>
          </div>

          {/* Stats Panel */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 flex flex-col justify-center gap-2">
              <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Drop Height</div>
                  <div className="text-lg font-mono text-blue-600 dark:text-blue-400 font-bold">{dropHeight} m</div>
              </div>
              <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Calculated <InlineMath math="\sqrt{2gh}" /></div>
                  <div className="text-lg font-mono text-green-600 dark:text-green-400 font-bold">
                      {Math.sqrt(2 * G * dropHeight).toFixed(1)} m/s
                  </div>
              </div>
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="mb-4">
              <label className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                  <span>Set Height (h)</span>
                  <span>{dropHeight} m</span>
              </label>
              <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="5"
                  value={dropHeight}
                  onChange={(e) => setDropHeight(Number(e.target.value))}
                  disabled={isPlaying}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
          </div>

          <div className="flex gap-2">
              <button 
                onClick={handleDrop}
                disabled={isPlaying}
                className={`flex-1 py-3 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${isPlaying ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                 {impactOccurred ? '⬇️ Drop Again' : '⬇️ Drop'}
              </button>
              {isPlaying && (
                  <button 
                    onClick={handleReset}
                    className="px-4 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg font-bold"
                  >
                      Stop
                  </button>
              )}
          </div>
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
        interactionId: 'freefall-impact-velocity-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Impact Velocity</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              How fast will an object be moving just before it hits the ground? This depends <strong>only</strong> on the height it fell from.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500 text-center">
              <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-sm uppercase tracking-wide">The Formula</h4>
              <div className="text-2xl font-mono font-bold text-green-700 dark:text-green-300">
                   <InlineMath math="v = \sqrt{2gh}" />
              </div>
              <p className="text-xs mt-3 text-slate-500 dark:text-slate-400">
                  Derived from <InlineMath math="v^2 = u^2 + 2as" /> where <InlineMath math="u=0" /> and <InlineMath math="s=h" />.
              </p>
            </div>

            <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">Physics Fact:</h4>
                <p className="text-sm">
                    Notice that <strong>mass</strong> is missing from the formula! A heavy bowling ball and a marble dropped from the same height will hit the ground at the exact same speed (ignoring air resistance).
                </p>
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
                    💥 Impact Lab
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
                     <ImpactSim />
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
      slideId="freefall-impact-velocity"
      slideTitle="Impact velocity from height"
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