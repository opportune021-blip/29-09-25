import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- DATA ---

interface Question {
  id: number;
  text: string | React.ReactNode;
  options: { label: string | React.ReactNode; isCorrect: boolean }[];
  explanation: string | React.ReactNode;
}

const questions: Question[] = [
  {
    id: 1,
    text: (
      <span>
        Calculate the direction angle <InlineMath>{"\\theta"}</InlineMath> for the vector <InlineMath>{"\\vec{v} = \\langle 1, 1 \\rangle"}</InlineMath>.
      </span>
    ),
    options: [
      { label: "30°", isCorrect: false },
      { label: "45°", isCorrect: true },
      { label: "60°", isCorrect: false },
      { label: "90°", isCorrect: false }
    ],
    explanation: (
      <span>
        <InlineMath>{"\\tan^{-1}(1/1) = \\tan^{-1}(1) = 45^\\circ"}</InlineMath>. Since both components are positive (Quadrant I), no adjustment is needed.
      </span>
    )
  },
  {
    id: 2,
    text: (
      <span>
        If a vector has components <InlineMath>{"x = -5"}</InlineMath> and <InlineMath>{"y = 5"}</InlineMath>, which quadrant is it in?
      </span>
    ),
    options: [
      { label: "Quadrant I (+, +)", isCorrect: false },
      { label: "Quadrant II (-, +)", isCorrect: true },
      { label: "Quadrant III (-, -)", isCorrect: false },
      { label: "Quadrant IV (+, -)", isCorrect: false }
    ],
    explanation: "Negative x and positive y places the vector in the Second Quadrant (top-left)."
  },
  {
    id: 3,
    text: (
      <span>
        When finding the direction of a vector in <strong>Quadrant III</strong> (e.g., <InlineMath>{"\\langle -2, -2 \\rangle"}</InlineMath>), what adjustment must be made to the calculator's result?
      </span>
    ),
    options: [
      { label: "Subtract 90°", isCorrect: false },
      { label: "Add 180°", isCorrect: true },
      { label: "Add 360°", isCorrect: false },
      { label: "No adjustment needed", isCorrect: false }
    ],
    explanation: "Calculators treat (-)/(-) as positive, giving a Q1 angle. You must add 180° to rotate it to the opposite side (Q3)."
  },
  {
    id: 4,
    text: (
      <span>
        A vector has magnitude 10 and direction 270°. What are its components?
      </span>
    ),
    options: [
      { label: <InlineMath>{"\\langle 0, 10 \\rangle"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"\\langle -10, 0 \\rangle"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"\\langle 0, -10 \\rangle"}</InlineMath>, isCorrect: true },
      { label: <InlineMath>{"\\langle 10, -10 \\rangle"}</InlineMath>, isCorrect: false }
    ],
    explanation: "270° points straight down (negative y-axis). So x is 0 and y is -10."
  }
];

export default function VectorFormsReviewSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Quiz State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentIdx];

  const slideInteraction: Interaction = {
    id: 'vector-forms-review-quiz',
    conceptId: 'vector-forms-review',
    conceptName: 'Vector Forms Review',
    type: 'learning', 
    description: 'Review of finding direction angles and quadrants.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null) return;
    setIsAnswered(true);
    if (question.options[selectedOpt].isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(curr => curr + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      handleInteractionComplete({
        interactionId: 'vector-forms-review-quiz',
        value: Math.round((score + (question.options[selectedOpt!].isCorrect ? 1 : 0)) / questions.length * 100).toString(),
        timestamp: Date.now()
      });
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setIsComplete(false);
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY (40%)                 */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Direction & Quadrants</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Key concepts for finding vector direction.
            </p>
        </div>

        {/* Scrollable Theory */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Formula Card */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">Direction Formula</h3>
                <div className="text-lg font-mono text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 p-3 rounded border border-blue-100 dark:border-slate-700 shadow-sm">
                    <BlockMath>{"\\theta = \\tan^{-1}\\left(\\frac{y}{x}\\right)"}</BlockMath>
                </div>
            </div>

            {/* Quadrant Rules */}
            <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">Quadrant Adjustments</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3">
                    <li className="flex gap-2">
                        <span className="font-bold text-green-600 w-6">Q1:</span>
                        <span>No adjustment needed.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="font-bold text-orange-600 w-6">Q2:</span>
                        <span>Add 180° to the calculator result.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="font-bold text-purple-600 w-6">Q3:</span>
                        <span>Add 180° to rotate to the correct quadrant.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="font-bold text-blue-600 w-6">Q4:</span>
                        <span>Add 360° to get a positive angle.</span>
                    </li>
                </ul>
            </div>

            {/* Tip */}
            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-200 dark:border-amber-800 flex gap-3">
                <span className="text-xl">💡</span>
                <div className="text-sm text-amber-900 dark:text-amber-100">
                    <strong>Sketch It!</strong> Always draw a quick sketch of the vector to verify which quadrant it lands in before trusting the calculator.
                </div>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: QUIZ (60%)                  */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col h-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-inner">
        
        <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Quiz</span>
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

                    <div className="grid grid-cols-1 gap-3 mb-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                        {question.options.map((opt, idx) => {
                             let btnClass = "w-full p-4 rounded-xl border-2 text-left transition-all text-base flex justify-between items-center group ";
                                    
                            if (isAnswered) {
                                if (opt.isCorrect) btnClass += "bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-200";
                                else if (idx === selectedOpt) btnClass += "bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-200";
                                else btnClass += "opacity-50 border-slate-200 dark:border-slate-700";
                            } else {
                                if (idx === selectedOpt) btnClass += "bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200";
                                else btnClass += "bg-white border-slate-200 hover:border-blue-300 dark:bg-slate-800 dark:border-slate-700";
                            }

                            return (
                                <button 
                                    key={idx}
                                    onClick={() => handleSelect(idx)}
                                    disabled={isAnswered}
                                    className={btnClass}
                                >
                                    <span>{opt.label}</span>
                                    {isAnswered && opt.isCorrect && <span>✅</span>}
                                    {isAnswered && idx === selectedOpt && !opt.isCorrect && <span>❌</span>}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                        {!isAnswered ? (
                             <button 
                                onClick={handleSubmit}
                                disabled={selectedOpt === null}
                                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none hover:bg-blue-500 transition-all"
                            >
                                Submit Answer
                            </button>
                        ) : (
                            <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800">
                                <div className="text-sm text-blue-800 dark:text-blue-200 flex-1 mr-4">
                                    <strong className="block mb-1">Explanation:</strong>
                                    {question.explanation}
                                </div>
                                <button 
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                                >
                                    {currentIdx < questions.length - 1 ? "Next ➜" : "Finish"}
                                </button>
                            </div>
                        )}
                    </div>

                </motion.div>
            ) : (
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex-grow flex flex-col items-center justify-center text-center"
                >
                    <div className="text-6xl mb-4">
                         {score === questions.length ? '🎉' : score > questions.length/2 ? '👍' : '📐'}
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Quiz Complete!</h2>
                    <p className="text-slate-500 mb-8 text-lg">
                        You scored <strong className="text-blue-600">{score}</strong> out of {questions.length}.
                        <br/>Excellent work reviewing vector forms!
                    </p>
                    <button 
                        onClick={handleRetry}
                        className="px-8 py-3 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors shadow-lg"
                    >
                        Retry Quiz
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="vector-forms-review"
      slideTitle="Vector forms review"
      moduleId="vectors-prerequisite"
      submoduleId="magnitude-and-direction-form"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}