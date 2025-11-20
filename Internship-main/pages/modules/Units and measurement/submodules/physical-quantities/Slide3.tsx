import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "What is the formula for Solid Angle (Ω)?",
    options: ["Area / Radius", "Area / Radius²", "Radius / Area", "Area × Radius"],
    correctIndex: 1, // Area / r^2
    explanation: "Solid angle is defined as the ratio of the surface area (A) to the square of the radius (r²)."
  },
  {
    question: "What is the total solid angle of a full sphere?",
    options: ["2π sr", "4π sr", "360 sr", "π sr"],
    correctIndex: 1, // 4pi
    explanation: "A full sphere has a surface area of 4πr². Dividing by r² gives 4π steradians."
  },
  {
    question: "When the surface area (A) equals the square of the radius (r²), the solid angle is:",
    options: ["1 Degree", "1 Radian", "1 Steradian", "4π Steradians"],
    correctIndex: 2, // 1 Steradian
    explanation: "When A = r², the ratio A/r² is exactly 1. This is the definition of 1 Steradian."
  }
];

// --- MAIN COMPONENT ---

export default function AngularMeasure2Slide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [area, setArea] = useState(50); 
  const radius = 10; // conceptual radius
  
  // Calculate Solid Angle (Omega)
  const solidAngle = area / (radius * radius);

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
      id: 'solid-angle-concept', 
      conceptId: 'solid-angle-steradian', 
      conceptName: 'Solid Angle', 
      type: 'learning', 
      description: 'Understanding solid angle and the steradian unit.' 
    },
    {
      id: 'solid-angle-quiz',
      conceptId: 'solid-angle-quiz',
      conceptName: 'Solid Angle Quiz',
      type: 'learning', 
      description: 'Quick check on solid angle concepts.'
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
        interactionId: 'solid-angle-quiz',
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
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col ">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            The Solid Angle (Ω) 
          </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Just as a circle has a 2D angle (plane angle), a sphere has a 3D angle known as the <strong>Solid Angle</strong>. It measures the "amount of sky" an object covers from a specific point.
            </p>

            

[Image of solid angle diagram sphere]


            <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-400 dark:border-indigo-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Formula</h4>
              <p>
                Solid Angle is the ratio of the area on the sphere's surface to the square of the radius:
              </p>
              <BlockMath>{`\\Omega = \\frac{\\text{Area } (A)}{r^2}`}</BlockMath>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">The Steradian (sr)</h4>
                <p>
                    The unit of solid angle is the <strong>Steradian</strong>. 
                    One steradian is the solid angle subtended by an area equal to the square of the radius (<InlineMath>{'A = r^2'}</InlineMath>).
                </p>
            </div>
            
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm">
                <p><strong>Total Sphere:</strong> Just as a circle is <InlineMath>{'2\\pi'}</InlineMath> radians, a full sphere is <InlineMath>{'4\\pi'}</InlineMath> steradians (<InlineMath>\approx 12.57</InlineMath> sr).</p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Tabs for Visualization OR Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden">
            
             {/* Tab Navigation */}
             <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🧊 Visualizer
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Quick Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Visualizing 3D Angles</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                            Imagine looking at a cone projecting from the center of a sphere. Increase the surface area to see the solid angle grow.
                        </p>
                        
                        {/* Conceptual 3D Visualization (Using CSS/SVG) */}
                        <div className="relative w-64 h-64 flex items-center justify-center perspective-1000">
                            {/* The Sphere Wireframe */}
                            <div className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 shadow-inner opacity-50"></div>
                            
                            {/* The Cone / Sector Representation */}
                            <motion.div 
                                className="relative z-10 bg-indigo-500/30 border-2 border-indigo-500 rounded-full flex items-center justify-center backdrop-blur-sm"
                                animate={{ 
                                    width: Math.sqrt(area) * 20, 
                                    height: Math.sqrt(area) * 20 
                                }}
                                transition={{ type: 'spring', stiffness: 100 }}
                            >
                                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Area A</div>
                            </motion.div>
                            
                            {/* Radius Indicators (Visual only) */}
                            <div className="absolute w-full h-px bg-slate-300 rotate-45 -z-10"></div>
                            <div className="absolute w-full h-px bg-slate-300 -rotate-45 -z-10"></div>
                        </div>

                        {/* Live Calculation Box */}
                        <div className="grid grid-cols-3 gap-4 w-full text-center">
                            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                                <div className="text-xs text-slate-500 uppercase font-bold">Area (A)</div>
                                <div className="text-xl font-mono text-indigo-500">{area.toFixed(0)}</div>
                            </div>
                            <div className="flex items-center justify-center text-slate-400 font-bold">÷</div>
                            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                                <div className="text-xs text-slate-500 uppercase font-bold">Radius² (<InlineMath>r^2</InlineMath>)</div>
                                <div className="text-xl font-mono text-slate-500">100</div>
                            </div>
                        </div>

                        <div className="w-full p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg text-center">
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Solid Angle (<InlineMath>\Omega</InlineMath>)</div>
                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                {solidAngle.toFixed(2)} sr
                            </div>
                            {Math.abs(solidAngle - 1) < 0.1 && (
                                <div className="text-xs text-green-600 font-bold mt-1 animate-pulse">
                                    ≈ 1 Steradian! (Area ≈ r²)
                                </div>
                            )}
                        </div>

                        {/* Slider Control */}
                        <div className="w-full px-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Increase Surface Area
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="400"
                                step="5"
                                value={area}
                                onChange={(e) => setArea(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
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
                                                if (selectedOption === idx) btnClass += "bg-indigo-100 border-indigo-500 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200";
                                                else btnClass += "bg-white border-slate-200 hover:border-indigo-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600";
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
                                                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-indigo-500 transition-colors"
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
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-500 transition-colors"
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
      slideId="angular-measure-2"
      slideTitle="Angular Measure 2"
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