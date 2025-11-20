import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "What is Parallax?",
    options: ["The actual movement of a star", "An apparent shift in position due to viewing angle", "The distance between two eyes", "The speed of light"],
    correctIndex: 1, // Apparent shift
    explanation: "Parallax is the apparent shift in the position of an object when viewed from two different locations."
  },
  {
    question: "In the parallax method, what is the 'Basis' (b)?",
    options: ["The distance to the object", "The angle of observation", "The distance between the two observation points", "The background wall"],
    correctIndex: 2, // Distance between points
    explanation: "The Basis (b) is the distance between the two points of observation (e.g., the distance between your left and right eyes)."
  },
  {
    question: "If you increase the Basis (distance between eyes), what happens to the Parallax shift?",
    options: ["The shift appears larger", "The shift appears smaller", "The shift stays the same", "The object disappears"],
    correctIndex: 0, // Shift gets larger
    explanation: "A wider basis creates a larger parallax angle, making the apparent shift larger."
  }
];

// --- MAIN COMPONENT ---

export default function IntroToParallaxSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State: Observer position (-1 to 1, representing Left Eye to Right Eye)
  const [observerPos, setObserverPos] = useState(-1); 

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Visual constants for calculation
  const shiftMagnitude = 40; 
  const apparentShift = -observerPos * shiftMagnitude;

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'parallax-concept', 
      conceptId: 'parallax-definition', 
      conceptName: 'Parallax Definition', 
      type: 'learning', 
      description: 'Understanding parallax as an apparent shift in position due to a change in observation point.' 
    },
    {
      id: 'parallax-quiz',
      conceptId: 'parallax-quiz',
      conceptName: 'Parallax Quiz',
      type: 'learning', 
      description: 'Quick check on parallax definitions.'
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
        interactionId: 'parallax-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">What is Parallax?</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Have you ever held a pen in front of you and closed one eye, then the other? The pen seems to jump sideways against the background.
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-400 dark:border-green-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Definition</h4>
              <p>
                <strong>Parallax</strong> is the apparent shift in the position of an object when viewed from two different locations.
              </p>
            </div>

            <ul className="space-y-3">
                <li className="flex items-start">
                    <span className="bg-slate-200 dark:bg-slate-700 rounded px-2 py-1 text-xs font-mono mr-3 mt-1">Term</span>
                    <span><strong>Basis (b):</strong> The distance between the two points of observation (e.g., the distance between your eyes).</span>
                </li>
                <li className="flex items-start">
    <span className="bg-slate-200 dark:bg-slate-700 rounded px-2 py-1 text-xs font-mono mr-3 mt-1">Term</span>
    <span>
        <strong>Parallax Angle (<InlineMath math="\theta" />):</strong> The angle formed at the object by the two lines of sight.
    </span>
</li>
            </ul>
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
                    👀 Parallax Demo
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-b-2 border-green-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Quick Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-4">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The "Thumb" Experiment</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                            Switch between the "Left Eye" and "Right Eye" to see the parallax shift.
                        </p>

                        {/* Top Down Diagram Area */}
                        <div className="relative w-full h-64 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col items-center pt-4">
                            
                            {/* 1. Background Wall */}
                            <div className="w-4/5 h-12 bg-slate-300 dark:bg-slate-700 rounded flex items-center justify-center relative overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)' }}></div>
                                <span className="text-xs text-slate-500 font-bold z-10 bg-white/50 px-2 rounded">Background Wall</span>
                                
                                {/* The "Projected" Ghost Object (Where it appears to be) */}
                                <motion.div 
                                    className="absolute w-4 h-4 bg-red-500/30 rounded-full border-2 border-red-500 border-dashed"
                                    animate={{ x: apparentShift }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            </div>

                            {/* 2. The Object (Thumb/Pen) */}
                            <div className="mt-12 relative z-10">
                                <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg flex items-center justify-center text-white text-[10px]">Obj</div>
                                {/* Label for Theta */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-blue-600 font-bold">
                                    <InlineMath>\theta</InlineMath>
                                </div>
                            </div>

                            {/* 3. Lines of Sight */}
                            {/* Left Eye Line */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                <motion.line 
                                    x1="50%" y1="88" // Object center approx
                                    x2={observerPos === -1 ? "30%" : "70%"} // Eye position
                                    y2="240" 
                                    stroke="#3b82f6" 
                                    strokeWidth="2" 
                                    strokeDasharray="4"
                                    animate={{ x2: observerPos === -1 ? "40%" : "60%" }} 
                                />
                            </svg>

                            {/* 4. The Observer (Eyes) */}
                            <div className="absolute bottom-4 w-3/5 flex justify-between items-center px-4 border-t-2 border-slate-400 dark:border-slate-500 pt-2">
                                <div 
                                    className={`cursor-pointer flex flex-col items-center transition-opacity ${observerPos === -1 ? 'opacity-100' : 'opacity-40'}`}
                                    onClick={() => setObserverPos(-1)}
                                >
                                    <span className="text-2xl">👁️</span>
                                    <span className="text-xs font-bold">Left Eye (A)</span>
                                </div>

                                <div className="text-xs font-mono text-slate-400">
                                    Basis (b)
                                </div>

                                <div 
                                    className={`cursor-pointer flex flex-col items-center transition-opacity ${observerPos === 1 ? 'opacity-100' : 'opacity-40'}`}
                                    onClick={() => setObserverPos(1)}
                                >
                                    <span className="text-2xl">👁️</span>
                                    <span className="text-xs font-bold">Right Eye (B)</span>
                                </div>
                            </div>
                        </div>

                        {/* Explanation of Geometry */}
                        <div className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                            <p className="mb-2">
                                <strong>Observation:</strong> When you switch from Left Eye (A) to Right Eye (B), the red object <i>appears</i> to shift position on the background wall.
                            </p>
                            <p>
                                The distance between your eyes is the <strong>Basis ($b$)</strong>. The angle at the object is the <strong>Parallax Angle ($\theta$)</strong>.
                            </p>
                        </div>

                        {/* Toggle Switch (Alternative control) */}
                        <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-full p-1 cursor-pointer relative w-48 h-10" onClick={() => setObserverPos(p => p * -1)}>
                            <motion.div 
                                className="absolute w-24 h-8 bg-white dark:bg-slate-600 rounded-full shadow-sm"
                                animate={{ x: observerPos === -1 ? 0 : 90 }} // Move visual slider
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                            <span className={`w-1/2 text-center text-sm font-bold z-10 transition-colors ${observerPos === -1 ? 'text-blue-600' : 'text-slate-500'}`}>Left Eye</span>
                            <span className={`w-1/2 text-center text-sm font-bold z-10 transition-colors ${observerPos === 1 ? 'text-blue-600' : 'text-slate-500'}`}>Right Eye</span>
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
      slideId="intro-to-parallax"
      slideTitle="Intro to Parallax"
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