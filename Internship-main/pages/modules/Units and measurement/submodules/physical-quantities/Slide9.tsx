import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "What is the approximate limit of resolution for an optical microscope?",
    options: ["10^-5 m (10 micrometers)", "10^-7 m (100 nanometers)", "10^-10 m (1 Angstrom)", "10^-15 m (1 Fermi)"],
    correctIndex: 1, // ~10^-7 m
    explanation: "Optical microscopes are limited by the wavelength of visible light, which is around 400-700 nm (10^-7 m)."
  },
  {
    question: "Which instrument is needed to resolve atoms?",
    options: ["Optical Microscope", "Electron Microscope", "Telescope", "Magnifying Glass"],
    correctIndex: 1, // Electron Microscope
    explanation: "Electron microscopes use electron beams with very short wavelengths (~1 Angstrom), allowing them to resolve individual atoms."
  },
  {
    question: "What is the size of an atomic nucleus compared to an atom?",
    options: ["About the same size", "10 times smaller", "10,000 to 100,000 times smaller", "Half the size"],
    correctIndex: 2, // 10^-14 vs 10^-10
    explanation: "The nucleus (~10^-15 to 10^-14 m) is tiny compared to the atom (~10^-10 m), roughly 100,000 times smaller."
  }
];

// --- DATA STRUCTURES ---

interface ScaleStep {
  power: number;
  label: string;
  description: string;
  size: string;
  icon: string;
  color: string;
}

const scales: ScaleStep[] = [
  { power: -5, label: 'Red Blood Cell', description: 'The scale of biological cells.', size: '10^{-5} \\text{ m}', icon: '🩸', color: 'text-red-500' },
  { power: -7, label: 'Optical Limit', description: 'The limit of visible light (~400-700nm). Viruses live here.', size: '10^{-7} \\text{ m}', icon: '🦠', color: 'text-green-500' },
  { power: -9, label: 'DNA Helix', description: 'Nanometer scale. Width of DNA strands.', size: '10^{-9} \\text{ m}', icon: '🧬', color: 'text-blue-500' },
  { power: -10, label: 'Hydrogen Atom', description: 'The Angstrom (Å) scale.', size: '10^{-10} \\text{ m}', icon: '⚛️', color: 'text-purple-500' },
  { power: -14, label: 'Atomic Nucleus', description: 'Tiny, dense center of the atom.', size: '10^{-14} \\text{ m}', icon: '🌑', color: 'text-slate-700' },
  { power: -15, label: 'Proton', description: 'The Fermi (fm) scale. Inside the nucleus.', size: '10^{-15} \\text{ m}', icon: '🔴', color: 'text-orange-500' }
];

// --- MAIN COMPONENT ---

export default function ScaleOfTheSmallSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [scaleIndex, setScaleIndex] = useState(0); 

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
      id: 'scale-of-small-concept', 
      conceptId: 'microcosm-scale', 
      conceptName: 'The Microcosm', 
      type: 'learning', 
      description: 'Understanding the microscopic ranges of length.' 
    },
    {
      id: 'microcosm-quiz',
      conceptId: 'microcosm-quiz',
      conceptName: 'Microcosm Quiz',
      type: 'learning', 
      description: 'Quick check on microscopic scales.'
    }
  ];

  const currentScale = scales[scaleIndex];
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
        interactionId: 'microcosm-quiz',
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
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Scale of the Small </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Physics isn't just about stars; it's also about the fundamental building blocks of matter. We call this the <strong>Microcosm</strong>.
            </p>

            

[Image of atom structure diagram label parts]


            <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-400 dark:border-green-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">How Small?</h4>
              <p>
                We range from a human hair (<InlineMath>{'10^{-4} \\text{ m}'}</InlineMath>) down to the proton (<InlineMath>{'10^{-15} \\text{ m}'}</InlineMath>).
              </p>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Measurement Limits</h4>
                <ul className="list-disc pl-5 space-y-2 text-base">
                    <li>
    <strong>Optical Microscopes:</strong> Use visible light. Cannot see anything smaller than the wavelength of light (<InlineMath math="\approx 10^{-7}" /> m).
</li>
                    <li>
                        <strong>Electron Microscopes:</strong> Use electron beams. Electrons act like waves with very short wavelengths (<InlineMath>\approx 1 Å</InlineMath>), allowing us to see atoms.
                    </li>
                </ul>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Tabs for Visualization OR Quiz */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col overflow-hidden">
            
             {/* Tab Navigation */}
             <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button 
                    onClick={() => setViewMode('explore')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-b-2 border-green-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    🔬 Microscope View
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-b-2 border-green-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Micro Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Zoom Into Matter</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">Drag the slider to magnify the universe.</p>
                        
                        {/* Visualization Area - Aperture View */}
                        <div className="relative w-64 h-64 flex items-center justify-center bg-black rounded-full overflow-hidden shadow-2xl border-4 border-slate-600">
                            
                            {/* Microscope Crosshairs */}
                            <div className="absolute w-full h-px bg-cyan-500/30 z-20"></div>
                            <div className="absolute h-full w-full bg-cyan-500/30 z-20" style={{ width: '1px' }}></div>
                            
                            {/* Vignette Effect */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,black_100%)] z-20 pointer-events-none"></div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentScale.label}
                                    initial={{ opacity: 0, scale: 0.1, rotate: -90 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 5, rotate: 90 }} // Zoom IN effect
                                    transition={{ duration: 0.4 }}
                                    className={`text-8xl z-10 ${currentScale.color}`}
                                >
                                    {currentScale.icon}
                                </motion.div>
                            </AnimatePresence>
                            
                            {/* Scale Bar */}
                            <div className="absolute bottom-8 w-32 h-1 bg-white/50 z-20 flex justify-between items-end">
                                <div className="w-px h-2 bg-white/50"></div>
                                <span className="text-[10px] text-white bg-black/50 px-1 rounded mb-2">
                                    <InlineMath>{currentScale.size}</InlineMath>
                                </span>
                                <div className="w-px h-2 bg-white/50"></div>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="w-full text-center space-y-2 h-24">
                            <h4 className={`text-2xl font-bold ${currentScale.color} transition-colors duration-300`}>
                                {currentScale.label}
                            </h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {currentScale.description}
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="w-full px-8">
                            <label htmlFor="scale-slider-small" className="block text-center font-mono text-sm text-slate-500 mb-2">
                                Order of Magnitude: 10^{currentScale.power}
                            </label>
                            <input
                                id="scale-slider-small"
                                type="range"
                                min="0"
                                max={scales.length - 1}
                                step="1"
                                value={scaleIndex}
                                onChange={(e) => setScaleIndex(Number(e.target.value))}
                                className="w-full h-3 bg-gradient-to-r from-red-300 via-green-300 to-purple-500 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                                style={{ direction: 'rtl' }} // Right to left to simulate zooming IN
                            />
                            <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                                <span>Cell (10^-5)</span>
                                <span>Proton (10^-15)</span>
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
                                                if (selectedOption === idx) btnClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-200";
                                                else btnClass += "bg-white border-slate-200 hover:border-green-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600";
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
                                                className="w-full py-3 bg-green-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-green-500 transition-colors"
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
                                        className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-500 transition-colors"
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
      slideId="scale-of-the-small"
      slideTitle="Scale of the small"
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