// Slide5.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

const interactions: Interaction[] = [
  { 
    id: 'dd-properties-learning', 
    conceptId: 'dd-properties', 
    conceptName: 'DD Properties', 
    type: 'learning', 
    description: 'Comparison of multiple paths to demonstrate Distance >= Displacement.' 
  },
  { 
    id: 'dd-properties-quiz', 
    conceptId: 'dd-properties-quiz', 
    conceptName: 'DD properties quiz', 
    type: 'learning', 
    description: 'Quiz on the inequality properties of motion.' 
  }
];

const quizQuestions = [
  {
    question: 'Which of the following statements is mathematically true for any moving object?',
    options: ['Distance < Displacement', 'Distance = Displacement always', 'Distance ≥ |Displacement|', 'Displacement > Distance'],
    correctIndex: 2,
    explanation: 'The path length (Distance) must be at least as long as the straight line connecting start and end (Displacement). It can be longer, but never shorter.'
  },
  {
    question: 'When are Distance and the magnitude of Displacement exactly equal?',
    options: ['When moving in a circle', 'When moving in a straight line without turning back', 'When the object is stationary', 'When moving at constant speed'],
    correctIndex: 1,
    explanation: 'If the motion is in a single direction along a straight line, the path length equals the straight-line distance.'
  }
];

// --- ANIMATION COMPONENT (The Path Lab) ---

type PathType = 'straight' | 'curved' | 'zigzag';

const PathPropertyLab = () => {
  const [selectedPath, setSelectedPath] = useState<PathType>('straight');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // We simulate the metrics using animation state
  // Distance values are arbitrary units relative to the SVG viewbox
  const PATH_METRICS = {
    straight: { dist: 80, disp: 80 },
    curved:   { dist: 110, disp: 80 },
    zigzag:   { dist: 150, disp: 80 }
  };

  // Animation Variants for the Drone/Dot
  const pathVariants = {
    straight: { 
        offsetDistance: "100%", 
        transition: { duration: 2, ease: "linear" } 
    },
    curved: { 
        offsetDistance: "100%", 
        transition: { duration: 2.5, ease: "linear" } 
    },
    zigzag: { 
        offsetDistance: "100%", 
        transition: { duration: 3, ease: "linear" } 
    },
    reset: {
        offsetDistance: "0%",
        transition: { duration: 0 }
    }
  };

  const handlePlay = () => {
    setIsPlaying(false);
    // Small timeout to reset animation frame if needed
    setTimeout(() => setIsPlaying(true), 50);
  };

  // SVG Path Strings (Viewbox 0 0 100 60)
  const svgPaths = {
    straight: "M 10 30 L 90 30",
    curved: "M 10 30 Q 50 -10 90 30",
    zigzag: "M 10 30 L 30 10 L 50 50 L 70 10 L 90 30"
  };

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {/* 1. The Flight Zone */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-inner relative mb-6">
        <div className="text-xs font-bold text-slate-400 absolute top-2 left-2 uppercase">Flight Path Simulator</div>
        
        <div className="relative w-full h-40 mt-4">
            <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                {/* Start/End Markers */}
                <circle cx="10" cy="30" r="3" className="fill-green-500" />
                <text x="10" y="45" textAnchor="middle" className="text-[6px] fill-slate-500 font-bold">START (A)</text>
                
                <circle cx="90" cy="30" r="3" className="fill-red-500" />
                <text x="90" y="45" textAnchor="middle" className="text-[6px] fill-slate-500 font-bold">END (B)</text>

                {/* The Path Trace (Ghost) */}
                <path 
                    d={svgPaths[selectedPath]} 
                    fill="none" 
                    stroke="currentColor" 
                    className="text-slate-300 dark:text-slate-700" 
                    strokeWidth="1" 
                    strokeDasharray="2,1"
                />

                {/* The Displacement Vector (Always Straight) */}
                {isPlaying && (
                    <motion.line
                        x1="10" y1="30" x2="90" y2="30"
                        initial={{ pathLength: 0, opacity: 0.5 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 0.5 }} // Deliberately constant speed to contrast
                        stroke="blue"
                        strokeWidth="0.5"
                        className="stroke-blue-500/50"
                    />
                )}

                {/* The Moving Object */}
                {/* We use CSS offset-path for complex movement along SVG path */}
                <motion.g
                    style={{ offsetPath: `path("${svgPaths[selectedPath]}")` }}
                    variants={pathVariants}
                    initial="reset"
                    animate={isPlaying ? selectedPath : "reset"}
                >
                    <circle r="3" fill="orange" />
                    <text y="-5" textAnchor="middle" className="text-[4px] fill-orange-600 font-bold">DRONE</text>
                </motion.g>
            </svg>
        </div>
      </div>

      {/* 2. Comparison Metrics */}
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
          {/* Distance Counter */}
          <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-700 relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase">Distance (Path)</h4>
                <div className="text-xl font-mono font-bold text-slate-800 dark:text-white mt-1">
                    {isPlaying ? (
                        <motion.span 
                            initial={{ opacity: 0.5 }} 
                            animate={{ opacity: 1 }}
                        >
                            ~{PATH_METRICS[selectedPath].dist} m
                        </motion.span>
                    ) : "0 m"}
                </div>
             </div>
             {/* Animated Bar bg */}
             {isPlaying && (
                 <motion.div 
                    className="absolute top-0 left-0 h-full bg-orange-200/50 dark:bg-orange-500/20 z-0"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={pathVariants[selectedPath].transition}
                 />
             )}
          </div>

          {/* Displacement Counter */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700 relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase">Displacement (Net)</h4>
                <div className="text-xl font-mono font-bold text-slate-800 dark:text-white mt-1">
                    {isPlaying ? (
                        <motion.span>
                            {PATH_METRICS[selectedPath].disp} m
                        </motion.span>
                    ) : "0 m"}
                </div>
             </div>
              {/* Fixed Bar bg - Displacement is constant for A->B */}
             {isPlaying && (
                 <motion.div 
                    className="absolute top-0 left-0 h-full bg-blue-200/50 dark:bg-blue-500/20 z-0"
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }} // Scales relative to max distance roughly
                    transition={{ duration: 2 }} // Always takes same time to show vector concept
                 />
             )}
          </div>
      </div>

      {/* 3. Controls */}
      <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-500 mb-3 uppercase text-center">Select a Route to travel from A to B</p>
          
          <div className="flex gap-2 mb-4">
              <button 
                onClick={() => { setSelectedPath('straight'); setIsPlaying(false); }}
                className={`flex-1 py-2 text-xs font-bold rounded border ${selectedPath === 'straight' ? 'bg-slate-200 border-slate-400 dark:bg-slate-600' : 'bg-white border-slate-200 dark:bg-slate-700 dark:border-slate-600'}`}
              >
                  Straight Line
              </button>
              <button 
                onClick={() => { setSelectedPath('curved'); setIsPlaying(false); }}
                className={`flex-1 py-2 text-xs font-bold rounded border ${selectedPath === 'curved' ? 'bg-slate-200 border-slate-400 dark:bg-slate-600' : 'bg-white border-slate-200 dark:bg-slate-700 dark:border-slate-600'}`}
              >
                  Curved Arc
              </button>
              <button 
                onClick={() => { setSelectedPath('zigzag'); setIsPlaying(false); }}
                className={`flex-1 py-2 text-xs font-bold rounded border ${selectedPath === 'zigzag' ? 'bg-slate-200 border-slate-400 dark:bg-slate-600' : 'bg-white border-slate-200 dark:bg-slate-700 dark:border-slate-600'}`}
              >
                  Zig-Zag
              </button>
          </div>

          <button 
            onClick={handlePlay}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-md transition-colors flex items-center justify-center gap-2"
          >
             🚀 Launch Drone
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
        interactionId: 'dd-properties-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Properties: Distance vs. Displacement</h2>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p className="text-lg">
              Comparing the two concepts reveals a fundamental inequality in physics.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2 uppercase text-sm">The Golden Rule</h3>
                <div className="text-center text-xl font-mono font-bold bg-white dark:bg-slate-800 p-3 rounded border border-purple-100 dark:border-purple-800">
                    <InlineMath math="\text{Distance} \ge |\text{Displacement}|" />
                </div>
                <p className="text-sm mt-3 italic">
                    "The path you take (Distance) is always equal to or longer than the shortcut (Displacement)."
                </p>
            </div>

            <ul className="space-y-3">
                <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <span><strong>Distance:</strong> Additive. Every step counts. Depends on the path.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span><strong>Displacement:</strong> Path independent. Depends ONLY on start and end points.</span>
                </li>
            </ul>
          </div>
        </div>
        
        {/* Right Panel: Interactive Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden min-h-[500px]">
            
            <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🧪 Path Laboratory
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
                     <PathPropertyLab />
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
      slideId="distance-displacement-properties"
      slideTitle="Distance and displacement properties"
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