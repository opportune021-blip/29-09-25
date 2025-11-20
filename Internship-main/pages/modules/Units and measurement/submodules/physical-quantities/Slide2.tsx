import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "What is the definition of a Plane Angle (theta)?",
    options: ["Arc Length / Radius", "Radius / Arc Length", "Arc Length × Radius", "Radius squared"],
    correctIndex: 0, // l/r
    explanation: "Plane angle is defined as the ratio of arc length (l) to radius (r)."
  },
  {
    question: "What is the angle in radians for a full circle (360°)?",
    options: ["π radians", "2π radians", "180 radians", "360 radians"],
    correctIndex: 1, // 2pi
    explanation: "A full circle has an arc length (circumference) of 2πr. So theta = 2πr/r = 2π."
  },
  {
    question: "If the arc length (l) is equal to the radius (r), the angle is:",
    options: ["1 Degree", "1 Radian", "π Radians", "90 Degrees"],
    correctIndex: 1, // 1 Radian
    explanation: "When l = r, the ratio l/r is exactly 1. This is the definition of 1 Radian."
  }
];

// --- MAIN COMPONENT ---

export default function AngularMeasure1Slide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [radius, setRadius] = useState(100); // arbitrary units for SVG
  const [angleDeg, setAngleDeg] = useState(57.3); // Start at approx 1 radian

  // Derived values
  const angleRad = (angleDeg * (Math.PI / 180));
  const arcLength = radius * angleRad;

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
      id: 'plane-angle-concept', 
      conceptId: 'plane-angle-radian', 
      conceptName: 'Plane Angle', 
      type: 'learning', 
      description: 'Understanding the definition of plane angle and the radian unit.' 
    },
    {
      id: 'plane-angle-quiz',
      conceptId: 'plane-angle-quiz',
      conceptName: 'Plane Angle Quiz',
      type: 'learning', 
      description: 'Quick check on the radian formula.'
    }
  ];

  // Helper to generate consistent SVG paths for both the Sector and the Arc
  const getArcData = (cx: number, cy: number, r: number, deg: number) => {
    const rad = (deg * Math.PI) / 180;
    
    // Calculate End Point
    // In SVG, Y is positive downwards. 
    // We use standard cos/sin which rotates Clockwise on screen.
    const xEnd = cx + r * Math.cos(rad); 
    const yEnd = cy + r * Math.sin(rad); 

    // Flags
    const largeArc = deg > 180 ? 1 : 0;
    const sweep = 1; // Clockwise

    // Generate the Arc Curve Command
    const arcPath = `M ${cx + r} ${cy} A ${r} ${r} 0 ${largeArc} ${sweep} ${xEnd} ${yEnd}`;
    
    // Generate the Sector Path (closes back to center)
    const sectorPath = `${arcPath} L ${cx} ${cy} Z`;

    return { arcPath, sectorPath };
  };

  const currentQuestion = quizQuestions[currentQIndex];

  // Calculate paths for current state
  const { arcPath, sectorPath } = getArcData(150, 150, radius, angleDeg);

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
        interactionId: 'plane-angle-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            The Plane Angle (&theta;) 
          </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Before we measure the distance to stars, we must understand how to measure "opening" between two lines. This is the <strong>Plane Angle</strong>.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Formula</h4>
              <p>
                Angle is defined as the ratio of arc length to radius:
              </p>
              <BlockMath>{`\\theta = \\frac{\\text{Arc Length } (l)}{\\text{Radius } (r)}`}</BlockMath>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Why Radians?</h4>
                <p>
                    Scientific formulas rely on this ratio. 
                    When <InlineMath>{'l = r'}</InlineMath>, the angle is exactly <strong>1 Radian</strong>.
                </p>
                <p className="text-sm text-slate-500 italic">
                    (1 Radian <InlineMath>{'\\approx 57.3^\\circ'}</InlineMath>)
                </p>
            </div>
            
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm">
                <p><strong>Note:</strong> <InlineMath>{'360^\\circ = 2\\pi \\text{ radians}'}</InlineMath></p>
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
                    📐 Visualizer
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
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Visualizing the Radian</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 text-center">
                            Adjust the angle to see how Arc Length (<InlineMath>l</InlineMath>) changes relative to Radius (<InlineMath>r</InlineMath>).
                        </p>

                        {/* SVG Visualization */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
                                {/* Radius Lines Background */}
                                <line x1="50" y1="150" x2="250" y2="150" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
                                <line x1="150" y1="50" x2="150" y2="250" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />

                                {/* The Sector */}
                                <motion.path 
                                    d={sectorPath}
                                    fill="rgba(59, 130, 246, 0.2)"
                                    stroke="#3b82f6"
                                    strokeWidth="2"
                                />

                                {/* Labels on the SVG */}
                                <text x={150 + radius/2} y="165" fill="currentColor" className="text-xs text-slate-500 font-mono">r</text>
                                
                                {/* Arc Length Highlight */}
                                <motion.path 
                                    d={arcPath}
                                    fill="none"
                                    stroke="#ef4444" 
                                    strokeWidth="4"
                                />
                            </svg>
                        </div>

                        {/* Live Calculation Box */}
                        <div className="grid grid-cols-3 gap-4 w-full text-center">
                            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                                <div className="text-xs text-slate-500 uppercase font-bold">Arc (l)</div>
                                <div className="text-xl font-mono text-red-500">{arcLength.toFixed(0)}</div>
                            </div>
                            <div className="flex items-center justify-center text-slate-400 font-bold">÷</div>
                            <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                                <div className="text-xs text-slate-500 uppercase font-bold">Radius (r)</div>
                                <div className="text-xl font-mono text-blue-500">{radius}</div>
                            </div>
                        </div>

                        <div className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Angle (<InlineMath>\theta</InlineMath>) in Radians</div>
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {angleRad.toFixed(2)} rad
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                                ({angleDeg.toFixed(1)}°)
                            </div>
                        </div>

                        {/* Slider Control */}
                        <div className="w-full px-4">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Change Angle
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="180"
                                step="1"
                                value={angleDeg}
                                onChange={(e) => setAngleDeg(Number(e.target.value))}
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
      slideId="angular-measure-1"
      slideTitle="Angular Measure 1"
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