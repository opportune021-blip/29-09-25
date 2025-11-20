import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "What limits the measurement of parallax for distant stars?",
    options: ["The brightness of the star", "Atmospheric blurring", "The speed of Earth's orbit", "The size of the telescope lens"],
    correctIndex: 1, // Atmospheric blurring
    explanation: "Atmospheric turbulence blurs star images, making it impossible to measure the tiny parallax angles of distant stars from the ground."
  },
  {
    question: "Why do space telescopes like Gaia provide better parallax measurements?",
    options: ["They are closer to the stars", "They have larger mirrors", "They operate above the atmosphere", "They use lasers"],
    correctIndex: 2, // Above atmosphere
    explanation: "Space telescopes are above the blurring effects of the atmosphere, allowing them to measure extremely small angles with high precision."
  },
  {
    question: "What is the approximate maximum distance for ground-based parallax measurements?",
    options: ["100 parsecs", "10,000 parsecs", "1 parsec", "The edge of the universe"],
    correctIndex: 0, // ~100 pc
    explanation: "Ground-based measurements are generally limited to stars within about 100 parsecs due to atmospheric distortion."
  }
];

// --- MAIN COMPONENT ---

export default function StellarParallaxClarificationSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State: Distance in Light Years
  const [distance, setDistance] = useState(10); 
  
  // Constant: Atmospheric Blur limit (in arcseconds)
  const blurLimit = 0.05; 
  
  // Calculate Parallax Angle (theta = 3.26 / d)
  const parallaxAngle = 3.26 / distance;
  
  // Determine if measurable
  const isMeasurable = parallaxAngle > blurLimit;

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'parallax-limitations', 
      conceptId: 'measurement-error-limit', 
      conceptName: 'Measurement Limits', 
      type: 'learning', 
      description: 'Understanding why parallax only works for nearby stars due to measurement limits.' 
    },
    {
      id: 'parallax-limits-quiz',
      conceptId: 'parallax-limits-quiz',
      conceptName: 'Parallax Limits Quiz',
      type: 'learning', 
      description: 'Quick check on measurement limitations.'
    }
  ];

  const currentQuestion = quizQuestions[currentQIndex];

  // --- QUIZ LOGIC HANDLERS ---
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
        interactionId: 'parallax-limits-quiz',
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

  const slideContent = (
<div className="w-full p-4 sm:p-8">
        <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col ">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Why Parallax Has Limits </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Parallax is perfect for "nearby" stars (within ~100 parsecs). But for distant stars, the angle <InlineMath>\theta</InlineMath> becomes too small to see.
            </p>

            

[Image of atmospheric turbulence astronomy diagram]


            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Problem: Atmosphere</h4>
              <p>
                Earth's atmosphere is like a pool of water. It makes stars "twinkle" (scintillation). This blurring is often larger than the tiny parallax shift we are trying to measure.
              </p>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">The Solution: Space Telescopes</h4>
                <p>
                    Satellites like <strong>Hipparcos</strong> and <strong>Gaia</strong> go above the atmosphere. Gaia can measure angles as small as <InlineMath>0.00001''</InlineMath> (micro-arcseconds)!
                </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Tabs for Visualization OR Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden">
            
             {/* Tab Navigation */}
             <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-b-2 border-red-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🔭 Telescope View
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-b-2 border-red-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Limits Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The "Blur" Limit</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                            Move the star further away. When the parallax shift becomes smaller than the atmospheric blur, we lose the measurement.
                        </p>

                        {/* Telescope View Simulation */}
                        <div className="relative w-64 h-64 bg-black rounded-full border-4 border-slate-600 overflow-hidden shadow-2xl">
                            <div className="absolute top-4 w-full text-center text-xs text-slate-500 font-mono">Telescope View</div>
                            
                            {/* Crosshairs */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <div className="w-full h-px bg-green-500"></div>
                                <div className="h-full w-px bg-green-500 absolute"></div>
                            </div>

                            {/* The Blur Zone (Atmosphere) */}
                            <div 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/50 bg-red-500/10"
                                style={{ width: '40px', height: '40px' }} 
                            ></div>
                            <div className="absolute bottom-10 w-full text-center text-[10px] text-red-500 font-mono">Atmospheric Blur Limit</div>

                            {/* The Star (Shifting) */}
                            <motion.div 
                                className="absolute top-1/2 left-1/2"
                                animate={{ 
                                    x: isMeasurable ? [20 * parallaxAngle, -20 * parallaxAngle, 20 * parallaxAngle] : 0
                                }}
                                transition={{ 
                                    duration: 2, // 6 months cycle simulation speed
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                {/* Twinkling Effect */}
                                <motion.div 
                                    className={`w-2 h-2 rounded-full ${isMeasurable ? 'bg-white' : 'bg-slate-500'}`}
                                    animate={{ scale: [1, 1.5, 0.8, 1.2, 1] }}
                                    transition={{ duration: 0.2, repeat: Infinity }}
                                />
                            </motion.div>
                        </div>

                        {/* Status Indicator */}
                        <div className={`w-full p-4 rounded-lg text-center border-2 ${isMeasurable ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}>
                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Measurement Status</div>
                            {isMeasurable ? (
                                <div className="text-green-600 dark:text-green-400 font-bold text-lg flex items-center justify-center gap-2">
                                    <span>✅ Shift Detected</span>
                                </div>
                            ) : (
                                <div className="text-red-600 dark:text-red-400 font-bold text-lg flex items-center justify-center gap-2">
                                    <span>⚠️ Too Far / Too Blurry</span>
                                </div>
                            )}
                            <div className="mt-2 text-xs font-mono">
                                Angle: {parallaxAngle.toFixed(3)}" vs Blur: {blurLimit}"
                            </div>
                        </div>

                        {/* Slider Control */}
                        <div className="w-full px-4">
                            <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <span>Star Distance: {distance} ly</span>
                            </label>
                            <input
                                type="range"
                                min="4" // Alpha Centauri is ~4.3 ly
                                max="100"
                                step="1"
                                value={distance}
                                onChange={(e) => setDistance(Number(e.target.value))}
                                className="w-full h-2 bg-gradient-to-r from-blue-400 to-slate-600 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>Nearby (Strong Signal)</span>
                                <span>Distant (Weak Signal)</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    // --- QUIZ MODE ---
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
                                                if (selectedOption === idx) btnClass += "bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-200";
                                                else btnClass += "bg-white border-slate-200 hover:border-red-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600";
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionClick(idx)}
                                                    disabled={showExplanation}
                                                    className={btnClass}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">{option}</span>
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
                                                className="w-full py-3 bg-red-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-red-500 transition-colors"
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
                                        className="px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-500 transition-colors"
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
      slideId="stellar-parallax-clarification"
      slideTitle="Stellar parallax clarification"
      moduleId="units-and-measurement"
      submoduleId="physical-quantities-and-measurement"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}