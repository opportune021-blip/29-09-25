import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- QUIZ DATA ---

const quizQuestions = [
  {
    question: "Why are significant figures important in science?",
    options: ["They make the math harder", "They communicate the precision of the measuring tool", "They allow us to use more decimal places", "They are only used in chemistry"],
    correctIndex: 1, // Precision
    explanation: "Significant figures tell other scientists how precise your measurement is. You cannot be more precise than your instrument."
  },
  {
    question: "In a measurement like 4.85 cm, which digit is the 'estimated' or 'uncertain' one?",
    options: ["The 4", "The 8", "The 5", "All of them"],
    correctIndex: 2, // The 5
    explanation: "The last significant figure is always the estimated digit. The digits before it are certain."
  },
  {
    question: "Which ruler would give a measurement with more significant figures?",
    options: ["A ruler with 1 cm markings", "A ruler with 1 mm markings", "Both give the same precision", "A ruler with no markings"],
    correctIndex: 1, // 1 mm markings
    explanation: "Finer markings (mm vs cm) allow for more certain digits, resulting in more significant figures."
  }
];

// --- MAIN COMPONENT ---

export default function IntroToSigFigsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // View State: 'explore' or 'quiz'
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');

  // Visualization State
  const [precision, setPrecision] = useState<'low' | 'high'>('low');

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
      id: 'sig-figs-concept', 
      conceptId: 'sig-figs-definition', 
      conceptName: 'Concept of Significant Figures', 
      type: 'learning', 
      description: 'Understanding that significant figures represent reliable digits plus one uncertain digit.' 
    },
    {
      id: 'sig-figs-intro-quiz',
      conceptId: 'sig-figs-intro-quiz',
      conceptName: 'Precision Quiz',
      type: 'learning', 
      description: 'Quick check on precision and significant figures.'
    }
  ];

  const reportedValue = precision === 'low' ? "4.8" : "4.75";
  const sigFigsCount = precision === 'low' ? 2 : 3;
  
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
        interactionId: 'sig-figs-intro-quiz',
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The "Honest" Measurement </h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              In math, <InlineMath>4.0</InlineMath> and <InlineMath>4.00</InlineMath> are the same. In science, they are completely different!
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Definition</h4>
              <p>
                The <strong>Significant Figures</strong> (or "sig figs") in a measured quantity include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>All digits that are known reliably.</li>
                  <li>Plus <strong>the first uncertain digit</strong> (estimated).</li>
              </ul>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Why does this matter?</h4>
                <p>
                    It tells other scientists how precise your measuring tool was. You cannot report a number more precise than your tool allows.
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
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'explore' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📏 Ruler Experiment
                </button>
                <button 
                    onClick={() => setViewMode('quiz')}
                    className={`flex-1 py-3 font-bold text-sm transition-colors ${viewMode === 'quiz' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    📝 Precision Quiz
                </button>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                {viewMode === 'explore' ? (
                    // --- EXPLORE MODE ---
                    <div className="flex-grow flex flex-col items-center justify-center gap-8">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The Precision Experiment</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                            Switch between the "Cheap Ruler" and the "Pro Ruler" to see how the reported number changes.
                        </p>
                        
                        {/* Visualization: The Measurement */}
                        <div className="relative w-full h-40 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden px-4">
                            
                            {/* The Object (Blue Bar) - Fixed physical width */}
                            <div className="absolute top-12 left-4 h-8 bg-blue-500 rounded-sm shadow-md z-10" style={{ width: '47.5%' }}></div>
                            <div className="absolute top-12 left-4 h-8 w-px bg-black/20 z-20"></div> {/* Zero line */}
                            
                            {/* The Ruler SVG */}
                            <div className="absolute top-20 left-4 w-full h-12 z-0">
                                <svg width="100%" height="100%" className="overflow-visible">
                                    {/* Ruler Base Line */}
                                    <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" className="text-slate-400" strokeWidth="2" />
                                    
                                    {/* Render Ticks based on Precision */}
                                    {Array.from({ length: 11 }).map((_, i) => {
                                        const xPos = `${i * 10}%`;
                                        return (
                                            <g key={i}>
                                                {/* Major Ticks (cm) - Always visible */}
                                                <line x1={xPos} y1="0" x2={xPos} y2="15" stroke="currentColor" className="text-slate-600 dark:text-slate-300" strokeWidth="2" />
                                                <text x={xPos} y="30" textAnchor="middle" className="text-xs fill-slate-500 font-bold">{i}</text>
                                                
                                                {/* Minor Ticks (mm) - Only visible in HIGH precision */}
                                                {precision === 'high' && i < 10 && Array.from({ length: 9 }).map((__, j) => (
                                                    <line 
                                                        key={j} 
                                                        x1={`${(i * 10) + (j + 1)}%`} 
                                                        y1="0" 
                                                        x2={`${(i * 10) + (j + 1)}%`} 
                                                        y2="8" 
                                                        stroke="currentColor" 
                                                        className="text-slate-400" 
                                                        strokeWidth="1" 
                                                    />
                                                ))}
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>

                            {/* Magnifying Glass Effect over the end */}
                            <motion.div 
                                className="absolute top-6 left-[45%] w-24 h-24 rounded-full border-4 border-slate-400 bg-white/10 backdrop-blur-sm shadow-xl flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="text-[10px] font-mono bg-white dark:bg-black px-1 rounded text-slate-500 -mt-16">Zoom</div>
                            </motion.div>
                        </div>

                        {/* Reported Value Card */}
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={precision}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-xl text-center border border-slate-200 dark:border-slate-600 w-full max-w-md"
                            >
                                <div className="text-sm text-slate-500 uppercase font-bold mb-2">
                                    {precision === 'low' ? 'Low Precision Ruler (cm)' : 'High Precision Ruler (mm)'}
                                </div>
                                
                                <div className="text-5xl font-mono font-bold text-slate-800 dark:text-slate-100 flex justify-center gap-1">
                                    {/* Render digits with the last one highlighted */}
                                    {reportedValue.slice(0, -1)}
                                    <span className="text-red-500 relative group cursor-help">
                                        {reportedValue.slice(-1)}
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                                            Uncertain Digit (Estimated)
                                        </span>
                                    </span>
                                    <span className="text-2xl text-slate-400 self-end mb-2 ml-2">cm</span>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 flex justify-between items-center px-4">
                                    <span className="text-slate-500 text-sm">Significant Figures:</span>
                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sigFigsCount}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Toggle Control */}
                        <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-lg">
                            <button
                                onClick={() => setPrecision('low')}
                                className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${precision === 'low' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Cheap Ruler (1cm)
                            </button>
                            <button
                                onClick={() => setPrecision('high')}
                                className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${precision === 'high' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Pro Ruler (1mm)
                            </button>
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
      slideId="intro-to-sig-figs"
      slideTitle="Intro to significant figures"
      moduleId="units-and-measurement"
      submoduleId="significant-figures"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}