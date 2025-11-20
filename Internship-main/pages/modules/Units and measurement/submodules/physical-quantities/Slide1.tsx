import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- DATA STRUCTURES ---

interface ScaleStep {
  power: number;
  label: string;
  description: string;
  size: string;
  icon: string; 
}

const scales: ScaleStep[] = [
  { power: 0, label: 'Human Scale', description: 'The scale of our daily lives.', size: '10^0 \\text{ m}', icon: '🧍' },
  { power: 7, label: 'Earth', description: 'Radius of the Earth ($6.4 \\times 10^6$ m).', size: '10^7 \\text{ m}', icon: '🌍' },
  { power: 11, label: 'Astronomical Unit', description: 'Average distance from Earth to Sun.', size: '10^{11} \\text{ m}', icon: '☀️' },
  { power: 16, label: 'Light Year', description: 'Distance light travels in one year.', size: '10^{16} \\text{ m}', icon: '✨' },
  { power: 21, label: 'Milky Way Galaxy', description: 'Diameter of our galaxy.', size: '10^{21} \\text{ m}', icon: '🌌' },
  { power: 26, label: 'Observable Universe', description: 'The limit of what we can see.', size: '10^{26} \\text{ m}', icon: '🔭' }
];

const quizQuestions = [
  {
    question: "What is the approximate size of the Observable Universe?",
    options: ["10^7 m", "10^{11} m", "10^{26} m", "10^{50} m"],
    correctIndex: 2, // 10^26 m
    explanation: "The observable universe spans approximately 10^26 meters."
  },
  {
    question: "Which unit represents the distance from Earth to the Sun?",
    options: ["Light Year", "Astronomical Unit (AU)", "Parsec", "Kilometer"],
    correctIndex: 1, // AU
    explanation: "1 AU is defined as the average distance between the Earth and the Sun."
  }
];

// --- MAIN COMPONENT ---

export default function ScaleOfTheLargeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' (Visualization) or 'quiz' (Questions)
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
  
  // Two interactions: One for learning (viewing scales), one for the quiz
  const slideInteractions: Interaction[] = [
    { 
      id: 'scale-of-large-concept', 
      conceptId: 'macrocosm-scale', 
      conceptName: 'The Macrocosm', 
      type: 'learning', 
      description: 'Understanding the vast range of lengths in the physical universe.' 
    },
    {
      id: 'scale-of-large-quiz',
      conceptId: 'macrocosm-quiz',
      conceptName: 'Macrocosm Quiz',
      type: 'learning', 
      description: 'Quick check on cosmic scales.'
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
      
      // FIX: Added 'value' and 'timestamp' to match InteractionResponse type
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 1 : 0);
      handleInteractionComplete({
        interactionId: 'scale-of-large-quiz',
        value: finalScore.toString(), // Converting score to string for the 'value' field
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
        
        {/* Left Panel: Theory (Always Visible) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Scale of the Large </h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              In Physics, we deal with magnitudes that span an incredible range. Today, we look upward to the <strong>Macrocosm</strong>—the world of the very large.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Range of Lengths</h4>
              <p>
                The observable universe spans from the tiny atomic nucleus (<InlineMath>{'10^{-15} \\text{ m}'}</InlineMath>) to the edge of the universe (<InlineMath>{'10^{26} \\text{ m}'}</InlineMath>).
              </p>
            </div>

            <p>
              Because these distances are so huge, measuring them in meters is like measuring the distance between cities in millimeters. We need special units like:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Astronomical Unit (AU):</strong> Distance to the Sun.</li>
              <li><strong>Light Year (ly):</strong> Distance light travels in a year.</li>
              <li><strong>Parsec (pc):</strong> Based on the parallax angle.</li>
            </ul>
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
                    🔍 Explore Scale
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Take Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Zoom Out the Universe</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-center">Drag the slider to jump by orders of magnitude.</p>
                        
                        <div className="relative w-64 h-64 flex items-center justify-center bg-slate-900 rounded-full overflow-hidden shadow-inner border-4 border-slate-200 dark:border-slate-600">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentScale.label}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 2 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-8xl"
                                >
                                    {currentScale.icon}
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute bottom-4 px-3 py-1 bg-black/50 rounded text-white text-sm font-mono">
                                <InlineMath>{currentScale.size}</InlineMath>
                            </div>
                        </div>

                        <div className="w-full text-center space-y-2">
                            <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentScale.label}</h4>
                            <p className="text-slate-500 dark:text-slate-400 min-h-[3rem]">{currentScale.description}</p>
                        </div>

                        <div className="w-full px-8">
                            <label className="block text-center font-mono text-sm text-slate-500 mb-2">
                                10^{currentScale.power} m
                            </label>
                            <input
                                type="range"
                                min="0"
                                max={scales.length - 1}
                                step="1"
                                value={scaleIndex}
                                onChange={(e) => setScaleIndex(Number(e.target.value))}
                                className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-500 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
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
                                                        <span className="font-medium"><InlineMath>{option}</InlineMath></span>
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
      slideId="scale-of-the-large"
      slideTitle="Scale of the large"
      moduleId="units-and-measurement"
      submoduleId="physical-quantities-and-measurement"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
         {/* Only tracking the 'learning' interaction on the main content view for now */}
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}