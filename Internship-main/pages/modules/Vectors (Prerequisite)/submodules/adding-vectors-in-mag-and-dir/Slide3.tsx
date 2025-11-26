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
        To add two vectors given in magnitude/direction form (e.g., <InlineMath>10</InlineMath> at <InlineMath>{"30^\\circ"}</InlineMath> and <InlineMath>20</InlineMath> at <InlineMath>{"90^\\circ"}</InlineMath>), what is the <strong>first step</strong>?
      </span>
    ),
    options: [
      { label: "Add their magnitudes directly (10 + 20 = 30).", isCorrect: false },
      { label: "Average their angles.", isCorrect: false },
      { label: "Resolve both vectors into x and y components.", isCorrect: true },
      { label: "Use the Law of Cosines immediately.", isCorrect: false }
    ],
    explanation: "You cannot add polar vectors directly. You must break them into horizontal and vertical components first."
  },
  {
    id: 2,
    text: (
      <span>
        You have resolved two vectors and found their sums: <InlineMath>{"R_x = 3"}</InlineMath> and <InlineMath>{"R_y = 4"}</InlineMath>. What is the magnitude of the resultant vector <InlineMath>{"|\\vec{R}|"}</InlineMath>?
      </span>
    ),
    options: [
      { label: "7", isCorrect: false },
      { label: "1", isCorrect: false },
      { label: "5", isCorrect: true },
      { label: "12", isCorrect: false }
    ],
    explanation: (
      <span>
        Use the Pythagorean theorem: <InlineMath>{"|\\vec{R}| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5"}</InlineMath>.
      </span>
    )
  },
  {
    id: 3,
    text: (
      <span>
        If <InlineMath>{"R_x = -5"}</InlineMath> and <InlineMath>{"R_y = -5"}</InlineMath>, in which quadrant does the resultant vector lie?
      </span>
    ),
    options: [
      { label: "Quadrant I (+, +)", isCorrect: false },
      { label: "Quadrant II (-, +)", isCorrect: false },
      { label: "Quadrant III (-, -)", isCorrect: true },
      { label: "Quadrant IV (+, -)", isCorrect: false }
    ],
    explanation: "Both x and y components are negative, which corresponds to the bottom-left quadrant (Quadrant III)."
  },
  {
    id: 4,
    text: (
      <span>
        Calculate the direction angle <InlineMath>{"\\theta"}</InlineMath> for <InlineMath>{"\\vec{R} = \\langle -1, 1 \\rangle"}</InlineMath> (in Quadrant II).
      </span>
    ),
    options: [
      { label: "45°", isCorrect: false },
      { label: "135°", isCorrect: true },
      { label: "-45°", isCorrect: false },
      { label: "225°", isCorrect: false }
    ],
    explanation: (
      <span>
        The reference angle is <InlineMath>{"\\tan^{-1}(1/1) = 45^\\circ"}</InlineMath>. In Q2, the angle is <InlineMath>{"180^\\circ - 45^\\circ = 135^\\circ"}</InlineMath>.
      </span>
    )
  }
];

export default function AddMagReviewSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Quiz State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentIdx];

  const slideInteraction: Interaction = {
    id: 'add-mag-review-quiz',
    conceptId: 'vector-addition-quiz',
    conceptName: 'Vector Addition Mastery Quiz',
    type: 'learning',
    description: 'Final assessment on adding vectors using components.'
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
        interactionId: 'add-mag-review-quiz',
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
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Concept Review</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                The 3-step process for adding any vectors.
            </p>
        </div>

        {/* Scrollable Theory */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Step 1: Resolve */}
            <div className="relative pl-6 border-l-2 border-blue-500">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">1. Resolve Vectors</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Break every vector into x and y components.
                </p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                    <BlockMath>{"x = r \\cos \\theta, \\quad y = r \\sin \\theta"}</BlockMath>
                </div>
            </div>

            {/* Step 2: Add */}
            <div className="relative pl-6 border-l-2 border-purple-500">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-white"></div>
                <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-2">2. Sum Components</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Add all x's together and all y's together.
                </p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                    <BlockMath>{"R_x = \\sum x, \\quad R_y = \\sum y"}</BlockMath>
                </div>
            </div>

            {/* Step 3: Recompose */}
            <div className="relative pl-6 border-l-2 border-emerald-500">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-2">3. Recompose</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Find final Magnitude & Direction.
                </p>
                <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900 p-2 rounded">
                    <BlockMath>{"|\\vec{R}| = \\sqrt{R_x^2 + R_y^2}"}</BlockMath>
                    <BlockMath>{"\\theta = \\tan^{-1}(R_y / R_x)"}</BlockMath>
                </div>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: QUIZ (60%)                  */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col h-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-inner">
        
        <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Final Assessment</span>
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
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Module Complete!</h2>
                    <p className="text-slate-500 mb-8 text-lg">
                        You scored <strong className="text-blue-600">{score}</strong> out of {questions.length}.
                        <br/>You're ready for physics!
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
      slideId="add-mag-review"
      slideTitle="Vector addition & magnitude"
      moduleId="vectors-prerequisite"
      submoduleId="adding-vectors-in-mag-and-dir"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}