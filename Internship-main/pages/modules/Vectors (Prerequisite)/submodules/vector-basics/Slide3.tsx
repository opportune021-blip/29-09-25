import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- QUIZ DATA ---
const quizQuestions = [
  {
    id: 1,
    question: (<span>Find the magnitude of <InlineMath>{"\\vec{v} = \\langle 3, 4 \\rangle"}</InlineMath></span>),
    options: ["5", "7", "25", "12"],
    correctIndex: 0,
    explanation: "\\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5"
  },
  {
    id: 2,
    question: (<span>Find the magnitude of <InlineMath>{"\\vec{u} = \\langle -5, 12 \\rangle"}</InlineMath></span>),
    options: ["7", "13", "17", "-13"],
    correctIndex: 1,
    explanation: "\\sqrt{(-5)^2 + 12^2} = \\sqrt{25+144} = \\sqrt{169} = 13"
  },
  {
    id: 3,
    question: (<span>Find magnitude: <InlineMath>{"\\vec{w} = \\langle 0, -8 \\rangle"}</InlineMath></span>),
    options: ["0", "-8", "8", "64"],
    correctIndex: 2,
    explanation: "\\sqrt{0^2 + (-8)^2} = \\sqrt{64} = 8. (Length is always positive!)"
  },
  {
    id: 4,
    question: (<span>Find magnitude: <InlineMath>{"\\vec{r} = \\langle 6, 8 \\rangle"}</InlineMath></span>),
    options: ["14", "100", "10", "48"],
    correctIndex: 2,
    explanation: "\\sqrt{6^2 + 8^2} = \\sqrt{36+64} = \\sqrt{100} = 10"
  }
];

export default function MagnitudeQuizSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Quiz State
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const slideInteraction: Interaction = {
    id: 'magnitude-calculation-quiz',
    conceptId: 'vector-magnitude-calculation',
    conceptName: 'Calculating Magnitude',
    type: 'learning',
    description: 'Quiz on calculating vector magnitude from components.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === quizQuestions[currentQ].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
      handleInteractionComplete({
        interactionId: 'magnitude-calculation-quiz',
        value: 'completed',
        timestamp: Date.now()
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setQuizComplete(false);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY (40%)                 */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Calculating Magnitude</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Finding the length of a vector from its components.
            </p>
        </div>

        {/* Scrollable Theory */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Formula Card */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">The Formula</h3>
                <div className="text-lg font-mono text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 p-3 rounded border border-blue-100 dark:border-slate-700 shadow-sm">
                    <BlockMath>{"|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}"}</BlockMath>
                </div>
            </div>

            {/* Pythagorean Connection */}
            <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">Pythagorean Theorem 

[Image of pythagorean theorem triangle]
</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Since the x and y components are perpendicular, they form the legs of a right triangle. The magnitude is the hypotenuse.
                </p>
                <div className="mt-4 flex justify-center opacity-80">
                    {/* Mini Triangle SVG */}
                    <svg width="120" height="80" viewBox="0 0 120 80" className="overflow-visible">
                        <path d="M10,70 L110,70 L110,10 Z" fill="none" stroke="#64748b" strokeWidth="2" />
                        <text x="60" y="78" fontSize="10" textAnchor="middle" fill="#64748b">vx</text>
                        <text x="115" y="40" fontSize="10" textAnchor="start" fill="#64748b">vy</text>
                        <text x="50" y="35" fontSize="10" textAnchor="middle" fill="#3B82F6" fontWeight="bold">|v|</text>
                    </svg>
                </div>
            </div>

            {/* Important Note */}
            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-200 dark:border-amber-800 flex gap-3">
                <span className="text-xl">💡</span>
                <div className="text-sm text-amber-900 dark:text-amber-100">
                    <strong>Always Positive:</strong> Magnitude is a length, so it can never be negative. Squaring negative components makes them positive!
                </div>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: QUIZ & KEY POINTS (60%)     */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-4 h-full">
        
        {/* 1. Quiz Container */}
        <div className="flex-grow bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-inner flex flex-col">
            
            <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Quiz</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Score: {score}/{quizQuestions.length}</span>
                    <div className="flex gap-1">
                        {quizQuestions.map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i < currentQ ? 'bg-blue-500' : i === currentQ ? 'bg-blue-200 animate-pulse' : 'bg-slate-300'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!quizComplete ? (
                    <motion.div
                        key={currentQ}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-grow flex flex-col"
                    >
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-4 text-center">
                            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                                {quizQuestions[currentQ].question}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {quizQuestions[currentQ].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={isAnswered}
                                    className={`p-4 rounded-xl text-base font-bold transition-all ${
                                        isAnswered 
                                            ? idx === quizQuestions[currentQ].correctIndex 
                                                ? "bg-green-500 text-white shadow-lg scale-105"
                                                : idx === selectedOption 
                                                    ? "bg-red-500 text-white opacity-50"
                                                    : "bg-white dark:bg-slate-800 text-slate-400 opacity-50"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 border-2 border-transparent shadow-sm"
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>

                        {isAnswered && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-auto bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 flex justify-between items-center"
                            >
                                <div className="text-sm text-blue-800 dark:text-blue-200">
                                    <span className="font-bold mr-2">Explanation:</span>
                                    <InlineMath>{quizQuestions[currentQ].explanation}</InlineMath>
                                </div>
                                <button 
                                    onClick={nextQuestion}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm"
                                >
                                    Next
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex-grow flex flex-col items-center justify-center text-center"
                    >
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Quiz Complete!</h2>
                        <p className="text-slate-500 mb-8">You scored {score} out of {quizQuestions.length}.</p>
                        <button 
                            onClick={resetQuiz}
                            className="px-8 py-3 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors"
                        >
                            Restart Quiz
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* 2. Key Points Section */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>📌</span> Key Takeaways
            </h4>
           <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2"> 
  <li className="flex items-start gap-2">
    <span className="text-blue-500 font-bold">•</span>
    <span><strong>Scalar Quantity:</strong> Magnitude is a pure number (length) with no direction.</span>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-blue-500 font-bold">•</span>
    <span>
      <strong>Distance Formula:</strong> 
      It derives directly from 
      <InlineMath>{"d = \\sqrt{\\Delta x^2 + \\Delta y^2}"}</InlineMath>.
    </span>
  </li>

  <li className="flex items-start gap-2">
    <span className="text-blue-500 font-bold">•</span>
    <span>
      <strong>Notation:</strong> 
      Written as 
      <InlineMath>{"|\\vec{v}|"}</InlineMath> 
      or 
      <InlineMath>{"||\\vec{v}||"}</InlineMath>.
    </span>
  </li>
</ul>

        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="mag-quiz"
      slideTitle="Vector magnitude from components"
      moduleId="vectors-prerequisite"
      submoduleId="magnitude-of-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}