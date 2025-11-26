import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- QUIZ DATA ---
const questions = [
  {
    id: 1,
    text: (<span>If <InlineMath>{"\\vec{v} = \\langle 3, -4 \\rangle"}</InlineMath>, what is its magnitude <InlineMath>{"|\\vec{v}|"}</InlineMath>?</span>),
    options: ["1", "5", "7", "25"],
    correctIndex: 1,
    explanation: "\\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5"
  },
  {
    id: 2,
    text: "Which method is used to add vectors geometrically?",
    options: ["Tip-to-Tip", "Tail-to-Tail", "Head-to-Tail", "Length Addition"],
    correctIndex: 2,
    explanation: "Place the tail of the second vector at the head (tip) of the first vector."
  },
  {
    id: 3,
    text: (<span>Calculate <InlineMath>{"\\vec{R} = \\langle 2, 1 \\rangle + \\langle -1, 3 \\rangle"}</InlineMath></span>),
    options: [
      <InlineMath>{"\\langle 1, 4 \\rangle"}</InlineMath>,
      <InlineMath>{"\\langle 3, 4 \\rangle"}</InlineMath>,
      <InlineMath>{"\\langle 1, 2 \\rangle"}</InlineMath>,
      <InlineMath>{"\\langle 2, 3 \\rangle"}</InlineMath>
    ],
    correctIndex: 0,
    explanation: "Add components: x = 2 + (-1) = 1, y = 1 + 3 = 4."
  },
  {
    id: 4,
    text: "What happens to a vector if you multiply it by -2?",
    options: ["Doubles length, same direction", "Halves length, same direction", "Doubles length, flips direction", "Halves length, flips direction"],
    correctIndex: 2,
    explanation: "The '2' doubles the length (magnitude). The negative sign reverses the direction."
  }
];

export default function OpsReviewSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Quiz State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentIdx];

  const slideInteraction: Interaction = {
    id: 'vector-ops-review-quiz',
    conceptId: 'vector-review',
    conceptName: 'Vector Operations Review',
    type: 'learning',
    description: 'Comprehensive review of vector basics.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOpt(index);
    setIsAnswered(true);
    if (index === question.correctIndex) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(c => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      handleInteractionComplete({
        interactionId: 'vector-ops-review-quiz',
        value: 'completed',
        timestamp: Date.now()
      });
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsComplete(false);
    setIsAnswered(false);
    setSelectedOpt(null);
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: CHEAT SHEET (40%)            */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Concept Cheat Sheet</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Key formulas and rules for vectors.
            </p>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* 1. Magnitude & Direction */}
            <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">1. Magnitude & Direction 
 
</h3>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-bold text-blue-600">Length:</span>
                        <InlineMath>{"|\\vec{v}| = \\sqrt{x^2 + y^2}"}</InlineMath>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-blue-600">Angle:</span>
                        <InlineMath>{"\\theta = \\tan^{-1}(y/x)"}</InlineMath>
                    </div>
                    <div className="mt-2 text-xs text-orange-600 italic border-t border-slate-200 dark:border-slate-700 pt-1">
                        *Check quadrant! Add 180° if x is negative.
                    </div>
                </div>
            </div>

            {/* 2. Components */}
            <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">2. Components</h3>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-mono text-center">
                    <BlockMath>{"x = r \\cos \\theta, \\quad y = r \\sin \\theta"}</BlockMath>
                </div>
            </div>

            {/* 3. Addition */}
            <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">3. Vector Addition</h3>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                    <p className="mb-2 text-slate-600 dark:text-slate-400">Add components column-wise:</p>
                    <div className="font-mono text-center font-bold text-emerald-600">
                        <InlineMath>{"\\vec{R} = \\langle x_1+x_2, \\; y_1+y_2 \\rangle"}</InlineMath>
                    </div>
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
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Review Quiz</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Score: {score}/{questions.length}</span>
                    <div className="flex gap-1">
                        {questions.map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i < currentIdx ? 'bg-blue-500' : i === currentIdx ? 'bg-blue-200 animate-pulse' : 'bg-slate-300'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!isComplete ? (
                    <motion.div
                        key={currentIdx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-grow flex flex-col"
                    >
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-4 text-center">
                            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">
                                {question.text}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {question.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={isAnswered}
                                    className={`p-4 rounded-xl text-base font-bold transition-all ${
                                        isAnswered 
                                            ? idx === question.correctIndex 
                                                ? "bg-green-500 text-white shadow-lg scale-105"
                                                : idx === selectedOpt 
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
                                    <InlineMath>{typeof question.explanation === 'string' ? question.explanation : ''}</InlineMath>
                                    {/* Handle ReactNode explanation if needed, simplified here for types */}
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
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">All Done!</h2>
                        <p className="text-slate-500 mb-8">You scored {score} out of {questions.length}.</p>
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

        {/* 2. Summary / Key Points */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>📝</span> Quick Summary
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>To find <strong>Magnitude</strong>, use the Pythagorean Theorem. It is always positive.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>To <strong>Add Vectors</strong> geometrically, use the Head-to-Tail method.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>To <strong>Subtract</strong>, flip the second vector and add it.</span>
                </li>
            </ul>
        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ops-review"
      slideTitle="Vector operations review"
      moduleId="vectors-prerequisite"
      submoduleId="combined-vector-operations"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}