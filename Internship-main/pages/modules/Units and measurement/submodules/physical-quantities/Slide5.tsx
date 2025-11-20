import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "What is the relationship between Parallax Angle (θ) and Distance (D)?",
    options: ["Directly proportional (θ ∝ D)", "Inversely proportional (θ ∝ 1/D)", "Exponential (θ ∝ D²)", "Unrelated"],
    correctIndex: 1, // Inverse
    explanation: "As the distance increases, the angle gets smaller. D = b / θ."
  },
  {
    question: "If the distance to a star doubles, what happens to its parallax angle?",
    options: ["It doubles", "It stays the same", "It is halved", "It quadruples"],
    correctIndex: 2, // Halved
    explanation: "Since θ = b/D, if D becomes 2D, then θ becomes θ/2."
  },
  {
    question: "Why is it difficult to measure the parallax of very distant stars?",
    options: ["The angle becomes too small to measure", "The stars are too bright", "The basis 'b' shrinks", "The Earth stops moving"],
    correctIndex: 0, // Angle too small
    explanation: "For very large distances, θ becomes incredibly tiny, often smaller than the blurring caused by the atmosphere."
  }
];

// --- MAIN COMPONENT ---

export default function ParallaxDistanceSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [distance, setDistance] = useState(200);
  const basis = 100; // Fixed basis width (b)
  const thetaRad = basis / distance;
  const thetaDeg = thetaRad * (180 / Math.PI);

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
      id: 'parallax-formula', 
      conceptId: 'parallax-math', 
      conceptName: 'Parallax Formula', 
      type: 'learning', 
      description: 'Deriving the relationship D = b/theta.' 
    },
    {
      id: 'parallax-math-quiz',
      conceptId: 'parallax-math-quiz',
      conceptName: 'Parallax Math Quiz',
      type: 'learning', 
      description: 'Quick check on the math of parallax.'
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
        interactionId: 'parallax-math-quiz',
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
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col ">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Calculating the Distance </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
           <p>
  By measuring the basis (<InlineMath math="b" />) and the parallax angle (<InlineMath math="\theta" />), we can calculate the unknown distance (<InlineMath math="D" />) to a faraway object.
</p>
            

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Math</h4>
              <p>
                Because the star is very far away, the distance D is very large compared to b. This forms a very long, thin wedge.
              </p>
              <p className="mt-2">
                 We treat the basis b as an arc of a circle of radius D. From <InlineMath>{'\\theta = \\text{Arc}/\\text{Radius}'}</InlineMath>:
              </p>
              <BlockMath>{`\\theta = \\frac{b}{D}`}</BlockMath>
              <p>Rearranging to find Distance:</p>
              <BlockMath>{`D = \\frac{b}{\\theta}`}</BlockMath>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm border border-yellow-200">
<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm border border-yellow-200">
    <strong>Crucial Concept:</strong> As Distance (<InlineMath math="D" />) increases, the Angle (<InlineMath math="\theta" />) becomes smaller. This is why distant stars are so hard to measure!
</div>
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
                    📐 Geometry Demo
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Math Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-4">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The Geometry of Parallax</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                            Increase the distance to see how the angle shrinks.
                        </p>
                        
                        {/* SVG Geometry */}
                        <div className="relative w-full h-[400px] border-b border-slate-200 dark:border-slate-700 flex justify-center items-end pb-8">
                            <svg width="300" height="400" viewBox="0 0 300 400" className="overflow-visible">
                                {/* Definitions */}
                                <defs>
                                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                        <path d="M0,0 L10,5 L0,10" fill="#94a3b8" />
                                    </marker>
                                </defs>

                                {/* Observer Points (Basis) */}
                                <circle cx="100" cy="350" r="4" fill="#3b82f6" />
                                <text x="100" y="370" textAnchor="middle" className="text-xs fill-slate-500 font-bold">A</text>
                                
                                <circle cx="200" cy="350" r="4" fill="#3b82f6" />
                                <text x="200" y="370" textAnchor="middle" className="text-xs fill-slate-500 font-bold">B</text>

                                {/* Basis Line (b) */}
                                <line x1="100" y1="350" x2="200" y2="350" stroke="#3b82f6" strokeWidth="2" />
                                <text x="150" y="370" textAnchor="middle" className="text-sm fill-blue-600 font-bold">b</text>

                                {/* The Distant Object (S) */}
                                <motion.g 
                                    animate={{ y: 350 - distance }} // Move up as distance increases
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                >
                                    {/* Star Icon */}
                                    <path d="M150,-10 L153,-3 L160,-3 L155,2 L157,9 L150,5 L143,9 L145,2 L140,-3 L147,-3 Z" fill="#eab308" />
                                    <text x="150" y="-20" textAnchor="middle" className="text-xs fill-slate-500 font-bold">S (Star)</text>
                                    
                                    {/* Angle Arc */}
                                    <path 
                                        d={`M 140,20 Q 150,25 160,20`} // Simple curve representing angle
                                        fill="none" 
                                        stroke="#ef4444" 
                                        strokeWidth="2"
                                        opacity={distance > 300 ? 0.3 : 1} // Fade out if too small
                                    />
                                    <text x="150" y="40" textAnchor="middle" className="text-xs fill-red-500 font-bold">θ</text>
                                </motion.g>

                                {/* Lines of Sight */}
                                <motion.line 
                                    x1="100" y1="350" 
                                    x2="150" 
                                    y2={350 - distance} 
                                    stroke="#94a3b8" 
                                    strokeWidth="1" 
                                    strokeDasharray="4"
                                />
                                <motion.line 
                                    x1="200" y1="350" 
                                    x2="150" 
                                    y2={350 - distance} 
                                    stroke="#94a3b8" 
                                    strokeWidth="1" 
                                    strokeDasharray="4"
                                />

                                {/* Distance Label (D) */}
                                <motion.g animate={{ y: (350 - distance/2) }}>
                                    <text x="210" y="0" className="text-xs fill-slate-400 font-mono">D</text>
                                    <line x1="150" y1="0" x2="200" y2="0" stroke="#cbd5e1" strokeWidth="1" />
                                </motion.g>
                            </svg>
                        </div>

                        {/* Live Data */}
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                                <div className="text-xs text-slate-500">Distance (D)</div>
                                <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{distance} m</div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center border border-red-100 dark:border-red-800">
                                <div className="text-xs text-red-500">Parallax Angle (<InlineMath>\theta</InlineMath>)</div>
                                <div className="text-xl font-bold text-red-600 dark:text-red-400">{thetaRad.toFixed(3)} rad</div>
                                <div className="text-xs text-red-400">({thetaDeg.toFixed(1)}°)</div>
                            </div>
                        </div>

                        {/* Slider */}
                        <div className="w-full px-4">
                            <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <span>Closer</span>
                                <span>Move Star Away</span>
                            </label>
                            <input
                                type="range"
                                min="100"
                                max="400"
                                step="1"
                                value={distance}
                                onChange={(e) => setDistance(Number(e.target.value))}
                                className="w-full h-2 bg-gradient-to-r from-slate-300 to-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
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
      slideId="parallax-distance"
      slideTitle="Parallax: distance"
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