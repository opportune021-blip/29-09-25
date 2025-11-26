import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- QUIZ DATA ---
const reviewQuestions = [
  {
    id: 1,
    question: (<span>Find the x-component: magnitude <InlineMath>10</InlineMath> at <InlineMath>60^\circ</InlineMath>.</span>),
    options: ["5.0", "8.66", "10.0", "0.5"],
    correctIndex: 0,
    explanation: "x = 10 \\cos(60^\\circ) = 10(0.5) = 5.0"
  },
  {
    id: 2,
    question: (<span>Find the magnitude of <InlineMath>{"\\vec{v} = \\langle -5, 12 \\rangle"}</InlineMath></span>),
    options: ["7", "17", "13", "-13"],
    correctIndex: 2,
    explanation: "\\sqrt{(-5)^2 + 12^2} = \\sqrt{25+144} = \\sqrt{169} = 13"
  },
  {
    id: 3,
    question: (<span>Which quadrant is <InlineMath>{"\\vec{u} = \\langle -3, -4 \\rangle"}</InlineMath> in?</span>),
    options: ["Q1 (+, +)", "Q2 (-, +)", "Q3 (-, -)", "Q4 (+, -)"],
    correctIndex: 2,
    explanation: "Both x and y are negative, which places the vector in Quadrant 3 (Bottom Left)."
  },
  {
    id: 4,
    question: (<span>Calculate the direction of <InlineMath>{"\\langle 1, 1 \\rangle"}</InlineMath>.</span>),
    options: ["30°", "45°", "60°", "90°"],
    correctIndex: 1,
    explanation: "\\tan^{-1}(1/1) = 45^\\circ. Since it's Q1, no adjustment is needed."
  }
];

export default function ConversionReviewSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Quiz State
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const slideInteraction: Interaction = {
    id: 'conversion-review-quiz',
    conceptId: 'vector-conversion-review',
    conceptName: 'Conversion Review',
    type: 'learning',
    description: 'Review quiz on converting between vector forms.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === reviewQuestions[currentQ].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < reviewQuestions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
      handleInteractionComplete({
        interactionId: 'conversion-review-quiz',
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
      {/* LEFT COLUMN: THEORY (45%)                 */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Conversion Review</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Switching between <span className="text-blue-600 font-bold">Components</span> and <span className="text-purple-600 font-bold">Polar</span> forms.
            </p>
        </div>

        {/* Scrollable Theory */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* To Components */}
            <div className="relative pl-4 border-l-4 border-blue-500">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">
                    1. Mag & Dir <span className="text-slate-400">→</span> Components
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm font-mono text-blue-800 dark:text-blue-200">
                    <div><InlineMath>x = r \cos(\theta)</InlineMath></div>
                    <div className="mt-1"><InlineMath>y = r \sin(\theta)</InlineMath></div>
                </div>
            </div>

            {/* To Polar */}
            <div className="relative pl-4 border-l-4 border-purple-500">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">
                    2. Components <span className="text-slate-400">→</span> Mag & Dir
                </h3>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-sm font-mono text-purple-800 dark:text-purple-200">
                    <div><InlineMath>{"|\\vec{v}| = \\sqrt{x^2 + y^2}"}</InlineMath></div>
                    <div className="mt-1"><InlineMath>{"\\theta = \\tan^{-1}(y/x)"}</InlineMath></div>
                </div>
            </div>

            {/* The "Gotcha" */}
            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-bold text-amber-800 dark:text-amber-200 text-xs uppercase tracking-wide mb-1 flex items-center gap-2">
                    <span>⚠️</span> The Golden Rule
                </h4>
                <p className="text-xs text-amber-900 dark:text-amber-100 leading-relaxed">
                    Calculators are blind to Quadrants 2 and 3. Always check the signs of <InlineMath>(x, y)</InlineMath> to see if you need to add <InlineMath>180^\circ</InlineMath>.
                </p>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: QUIZ & KEY POINTS (55%)     */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-4 h-full">
        
        {/* 1. Quiz Container */}
        <div className="flex-grow bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-inner flex flex-col">
            
            <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Review Quiz</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Score: {score}/{reviewQuestions.length}</span>
                    <div className="flex gap-1">
                        {reviewQuestions.map((_, i) => (
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
                                {reviewQuestions[currentQ].question}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {reviewQuestions[currentQ].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={isAnswered}
                                    className={`p-4 rounded-xl text-base font-bold transition-all ${
                                        isAnswered 
                                            ? idx === reviewQuestions[currentQ].correctIndex 
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
                                    <InlineMath>{reviewQuestions[currentQ].explanation}</InlineMath>
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
                        <p className="text-slate-500 mb-8">You scored {score} out of {reviewQuestions.length}.</p>
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

        {/* 2. Key Points Summary */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🗝️</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Final Takeaways</span>
                </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
                <div>
                    • <strong>Mag is Length:</strong> Always positive.
                </div>
                <div>
                    • <strong>Signs Matter:</strong> Check <InlineMath>(x, y)</InlineMath> signs.
                </div>
            </div>
        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="conversion-review"
      slideTitle="Converting between vector components and magnitude & direction review"
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