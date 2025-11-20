import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "Why do astronomers wait 6 months between parallax observations?",
    options: ["To let the Earth rotate", "To maximize the basis (2 AU)", "Because stars only appear in winter", "To calibrate the telescope"],
    correctIndex: 1, // Maximize basis
    explanation: "Waiting 6 months allows Earth to move to the opposite side of the Sun, creating the widest possible baseline (2 AU)."
  },
  {
    question: "What is the baseline distance used for measuring stellar parallax from Earth?",
    options: ["The diameter of Earth (12,742 km)", "The distance to the Moon", "The diameter of Earth's orbit (2 AU)", "1 Light Year"],
    correctIndex: 2, // 2 AU
    explanation: "The baseline is the diameter of Earth's orbit around the Sun, which is approximately 300 million km or 2 AU."
  },
  {
    question: "Which stars show the largest parallax shift?",
    options: ["Nearby stars", "Distant stars", "All stars show the same shift", "Stars in other galaxies"],
    correctIndex: 0, // Nearby stars
    explanation: "Just like the thumb experiment, closer objects appear to shift more against the background than distant ones."
  }
];

// --- MAIN COMPONENT ---

export default function ParallaxObservingStarsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [orbitalAngle, setOrbitalAngle] = useState(0);

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
      id: 'stellar-parallax-concept', 
      conceptId: 'stellar-parallax-basis', 
      conceptName: 'Stellar Parallax Basis', 
      type: 'learning', 
      description: 'Understanding how Earth\'s orbit provides the baseline for measuring stellar distance.' 
    },
    {
      id: 'stellar-parallax-quiz',
      conceptId: 'stellar-parallax-quiz',
      conceptName: 'Stellar Parallax Quiz',
      type: 'learning', 
      description: 'Quick check on stellar parallax concepts.'
    }
  ];

  // Visualization Math
  const orbitRadius = 80;
  const sunX = 150;
  const sunY = 300;
  
  // Earth Position calculations
  const rads = (orbitalAngle * Math.PI) / 180;
  const earthX = sunX - orbitRadius * Math.cos(rads); 
  const earthY = sunY - orbitRadius * Math.sin(rads) * 0.3; 

  // View from Earth Calculation
  const maxShift = 40;
  const apparentShift = -Math.cos(rads) * maxShift;

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
        interactionId: 'stellar-parallax-quiz',
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Using Earth's Orbit as "Eyes" </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Our eyes are only a few cm apart. To measure stars, we need a basis (b) that is millions of kilometers wide.
            </p>
            

[Image of Earth orbit parallax diagram]


            <div className="bg-slate-50 dark:bg-slate-700/50 border-l-4 border-indigo-500 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Method</h4>
              <ul className="list-decimal pl-5 space-y-2">
                  <li>Observe a nearby star from Earth (Position A).</li>
                  <li>Wait <strong>6 months</strong> for Earth to reach the opposite side of the Sun (Position B).</li>
                  <li>Observe the star again.</li>
              </ul>
            </div>

            <div className="space-y-2 text-sm bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
    <p>
        <strong>The Basis (<InlineMath math="b" />):</strong> The diameter of Earth's orbit is roughly <InlineMath math="3 \times 10^{11}" /> m.
    </p>
    <p>This is equal to <strong>2 Astronomical Units (AU)</strong>.</p>
</div>
          </div>
        </div>
        
        {/* Right Panel: Tabs for Visualization OR Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden">
            
             {/* Tab Navigation */}
             <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🔭 Simulation
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Quick Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col gap-6">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Simulating the 6-Month Orbit</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Drag the slider to move Earth 6 months through its orbit. Watch the "Telescope View".
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                            {/* 1. Top Down Solar System View */}
                            <div className="relative h-64 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-900 overflow-hidden">
                                <div className="absolute top-2 left-2 text-xs text-slate-400 font-mono">Top-Down Map</div>
                                
                                <svg className="w-full h-full" viewBox="0 0 300 400">
                                    {/* Background Stars (Fixed) */}
                                    <circle cx="50" cy="20" r="1" fill="white" opacity="0.5" />
                                    <circle cx="250" cy="30" r="1" fill="white" opacity="0.5" />
                                    <circle cx="150" cy="10" r="1" fill="white" opacity="0.5" />

                                    {/* Distant Background Line */}
                                    <line x1="20" y1="20" x2="280" y2="20" stroke="white" strokeWidth="1" strokeDasharray="2" opacity="0.3" />

                                    {/* The Sun */}
                                    <circle cx={sunX} cy={sunY} r="15" fill="#f59e0b" className="shadow-lg shadow-yellow-500/50" />
                                    
                                    {/* Earth's Orbit Path */}
                                    <ellipse cx={sunX} cy={sunY} rx={orbitRadius} ry={orbitRadius * 0.3} fill="none" stroke="#334155" strokeDasharray="4" />

                                    {/* Nearby Star (Target) */}
                                    <path d="M150,90 L153,100 L163,100 L155,108 L158,118 L150,112 L142,118 L145,108 L137,100 L147,100 Z" fill="#ef4444" />
                                    <text x="165" y="105" fill="#ef4444" fontSize="10" fontWeight="bold">Nearby Star</text>

                                    {/* The Earth */}
                                    <circle cx={earthX} cy={earthY} r="6" fill="#3b82f6" />

                                    {/* Line of Sight */}
                                    <line 
                                        x1={earthX} y1={earthY} 
                                        x2="150" y2="100" 
                                        stroke="#3b82f6" 
                                        strokeWidth="1" 
                                        strokeOpacity="0.6"
                                    />
                                    {/* Projected Line to Background (Visual aid) */}
                                    <line 
                                        x1="150" y1="100" 
                                        x2={150 + (150 - earthX) * 0.8} y2="20" 
                                        stroke="#ef4444" 
                                        strokeWidth="1" 
                                        strokeDasharray="2" 
                                        strokeOpacity="0.4"
                                    />
                                </svg>
                            </div>

                            {/* 2. Telescope View (What we actually see) */}
                            <div className="relative h-64 border-4 border-slate-700 rounded-full bg-black flex items-center justify-center overflow-hidden shadow-inner">
                                <div className="absolute top-4 text-xs text-slate-500 font-mono bg-black/50 px-2 rounded">Telescope View</div>
                                
                                {/* Fixed Background Stars */}
                                <div className="absolute inset-0 w-full h-full">
                                    <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-50"></div>
                                    <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-50"></div>
                                    <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full opacity-30"></div>
                                </div>

                                {/* The Nearby Star (Shifting) */}
                                <motion.div 
                                    className="relative z-10"
                                    animate={{ x: apparentShift }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className="w-4 h-4 bg-red-500 rounded-full blur-[2px]"></div>
                                    <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                                </motion.div>

                                {/* Crosshairs */}
                                <div className="absolute w-full h-px bg-green-500/30"></div>
                                <div className="absolute h-full w-px bg-green-500/30"></div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-sm font-bold ${orbitalAngle < 20 ? 'text-blue-600' : 'text-slate-400'}`}>Jan (Pos A)</span>
                                <span className="text-xs font-mono text-slate-500">Earth's Orbit</span>
                                <span className={`text-sm font-bold ${orbitalAngle > 160 ? 'text-blue-600' : 'text-slate-400'}`}>July (Pos B)</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="180"
                                step="1"
                                value={orbitalAngle}
                                onChange={(e) => setOrbitalAngle(Number(e.target.value))}
                                className="w-full h-2 bg-gradient-to-r from-blue-400 via-slate-300 to-blue-400 rounded-lg appearance-none cursor-pointer"
                            />
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
      slideId="parallax-observing-stars"
      slideTitle="Parallax in observing stars"
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