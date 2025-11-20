import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "What does the unit 'Parsec' (pc) stand for?",
    options: ["Parallel Second", "Parallax Second", "Partial Sector", "Particle Section"],
    correctIndex: 1, // Parallax Second
    explanation: "Parsec is a portmanteau of 'Parallax' and 'Second' (arcsecond)."
  },
  {
    question: "If a star has a parallax angle of 1 arcsecond, what is its distance?",
    options: ["1 Light Year", "1 AU", "1 Parsec", "10 Parsecs"],
    correctIndex: 2, // 1 Parsec
    explanation: "By definition, D (in parsecs) = 1 / θ (in arcseconds). So if θ = 1, D = 1 parsec."
  },
  {
    question: "If the measured angle is 0.5 arcseconds, how far away is the star?",
    options: ["0.5 pc", "2 pc", "5 pc", "0.2 pc"],
    correctIndex: 1, // 2 pc
    explanation: "Using the formula D = 1/θ: D = 1 / 0.5 = 2 parsecs."
  }
];

// --- MAIN COMPONENT ---

export default function StellarDistanceSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State: Parallax Angle in Arcseconds (theta)
  const [angleArcSec, setAngleArcSec] = useState(1.0);

  // Calculations
  const distanceParsecs = 1 / angleArcSec;
  const distanceLightYears = distanceParsecs * 3.26;
  
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
      id: 'parsec-definition', 
      conceptId: 'unit-parsec', 
      conceptName: 'The Parsec', 
      type: 'learning', 
      description: 'Understanding the definition of a Parsec based on parallax angle.' 
    },
    {
      id: 'parsec-quiz',
      conceptId: 'parsec-quiz',
      conceptName: 'Parsec Quiz',
      type: 'learning', 
      description: 'Quick check on parsec calculations.'
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
        interactionId: 'parsec-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Parsec (pc) </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Astronomers hate converting radians to meters constantly. Instead, they defined a convenient unit called the <strong>Parsec</strong> (Parallax Second).
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-400 dark:border-indigo-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Definition</h4>
              <p>
                One <strong>Parsec (pc)</strong> is the distance at which the radius of Earth's orbit (1 AU) subtends an angle of exactly <strong>1 second of arc</strong>.
              </p>
            </div>
            
            

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">The Magic Formula</h4>
<p>
    If you measure the angle <InlineMath math="\theta" /> in arcseconds, the math becomes incredibly simple:
</p>                <BlockMath>{`D \\text{ (pc)} = \\frac{1}{\\theta''}`}</BlockMath>
            </div>
            
            <div className="text-sm text-slate-500 mt-4">
                <strong>Note:</strong> 1 arcsecond is tiny! It's <InlineMath>1/3600</InlineMath> of a degree.
            </div>
          </div>
        </div>
        
        {/* Right Panel: Tabs for Visualization OR Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden">
            
             {/* Tab Navigation */}
             <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📐 Calculator
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Quick Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Cosmic Calculator</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
    Adjust the measured angle (<InlineMath math="\theta" />) to see how far away the star is.
</p>
                        
                        {/* Visualization of the Triangle */}
                        <div className="relative w-full h-48 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                            
                            {/* Earth Orbit Base (Left) */}
                            <div className="absolute left-10 h-32 border-l-2 border-blue-500 flex flex-col justify-center items-center">
                                <span className="absolute -left-8 text-xs font-bold text-blue-600 rotate-[-90deg]">1 AU</span>
                            </div>
                            
                            {/* Triangle visual */}
                            <svg className="absolute inset-0 w-full h-full">
                                <motion.path 
                                    d={`M 40,24 L ${40 + distanceParsecs * 20}, 96 L 40, 168`} // Scaling for visual effect
                                    fill="rgba(99, 102, 241, 0.1)"
                                    stroke="#6366f1"
                                    strokeWidth="1"
                                    // Limit the drawing so it doesn't break the SVG
                                    animate={{ d: `M 40,${96 - (angleArcSec * 40)} L 280, 96 L 40, ${96 + (angleArcSec * 40)}` }}
                                />
                                {/* Angle Label */}
                                <text x="50" y="100" className="text-[10px] fill-slate-500">θ</text>
                            </svg>

                            {/* Star Icon */}
                            <div className="absolute right-10 text-yellow-500 text-2xl">★</div>
                        </div>

                        {/* Results Dashboard */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Distance in Parsecs</div>
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    {distanceParsecs.toFixed(2)} pc
                                </div>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Distance in Light Years</div>
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                    {distanceLightYears.toFixed(2)} ly
                                </div>
                                <div className="text-xs text-slate-400 mt-1">1 pc ≈ 3.26 ly</div>
                            </div>
                        </div>

                        {/* Comparison Card */}
                        <div className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-center text-slate-600 dark:text-slate-300">
                            {angleArcSec > 0.7 ? (
                                <span>Only extremely close stars have parallax &gt; 0.7"</span>
                            ) : angleArcSec > 0.1 ? (
                                <span>Typical neighborhood stars (like Sirius)</span>
                            ) : (
                                <span>Very distant stars (Angle is tiny!)</span>
                            )}
                        </div>

                        {/* Slider Control */}
                        <div className="w-full px-4">
                            <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <span>Measured Angle: {angleArcSec.toFixed(2)}"</span>
                            </label>
                            <input
                                type="range"
                                min="0.05"
                                max="1.50"
                                step="0.01"
                                value={angleArcSec}
                                onChange={(e) => setAngleArcSec(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                <span>0.05" (Far)</span>
                                <span>1.50" (Close)</span>
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
                                                if (selectedOption === idx) btnClass += "bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
                                                else btnClass += "bg-white border-slate-200 hover:border-purple-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600";
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
                                                className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-purple-500 transition-colors"
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
                                        className="px-6 py-2 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-500 transition-colors"
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
      slideId="stellar-distance-using-parallax"
      slideTitle="Stellar distance using parallax"
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