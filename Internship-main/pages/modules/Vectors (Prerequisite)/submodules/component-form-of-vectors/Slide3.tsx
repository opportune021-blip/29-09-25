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
        Resolve the vector <InlineMath>{"\\vec{v}"}</InlineMath> with magnitude <InlineMath>10</InlineMath> and direction <InlineMath>{"60^\\circ"}</InlineMath> (standard position).
      </span>
    ),
    options: [
      { label: <InlineMath>{"\\langle 5, 8.66 \\rangle"}</InlineMath>, isCorrect: true }, // cos(60)=0.5, sin(60)=0.866
      { label: <InlineMath>{"\\langle 8.66, 5 \\rangle"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"\\langle 10, 10 \\rangle"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"\\langle 5, 5 \\rangle"}</InlineMath>, isCorrect: false }
    ],
    explanation: (
      <span>
        <InlineMath>{"v_x = 10 \\cos(60^\\circ) = 5"}</InlineMath>. <InlineMath>{"v_y = 10 \\sin(60^\\circ) \\approx 8.66"}</InlineMath>.
      </span>
    )
  },
  {
    id: 2,
    text: (
      <span>
        A vector has magnitude 20 and points <strong>30° East of North</strong>. Which expression gives its x-component?
      </span>
    ),
    options: [
      { label: <InlineMath>{"20 \\cos(30^\\circ)"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"20 \\sin(30^\\circ)"}</InlineMath>, isCorrect: true },
      { label: <InlineMath>{"20 \\tan(30^\\circ)"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"20 / \\sin(30^\\circ)"}</InlineMath>, isCorrect: false }
    ],
    explanation: (
      <span>
        "East of North" means the angle is adjacent to the vertical (y-axis). The x-component is <strong>opposite</strong> to the angle, so we use Sine. Alternatively, the standard angle is 60°, and <InlineMath>{"\\cos(60^\\circ) = \\sin(30^\\circ)"}</InlineMath>.
      </span>
    )
  },
  {
    id: 3,
    text: (
      <span>
        Find the direction angle of <InlineMath>{"\\vec{u} = \\langle -3, 3 \\rangle"}</InlineMath>.
      </span>
    ),
    options: [
      { label: "45°", isCorrect: false },
      { label: "-45°", isCorrect: false },
      { label: "135°", isCorrect: true },
      { label: "225°", isCorrect: false }
    ],
    explanation: (
      <span>
        The vector is in Quadrant II (negative x, positive y). <InlineMath>{"\\tan^{-1}(-1) = -45^\\circ"}</InlineMath>. Add 180° to get <InlineMath>{"135^\\circ"}</InlineMath>.
      </span>
    )
  },
  {
    id: 4,
    text: (
      <span>
        Which vector has the same magnitude as <InlineMath>{"\\langle 3, 4 \\rangle"}</InlineMath> but points in the opposite direction?
      </span>
    ),
    options: [
      { label: <InlineMath>{"\\langle 4, 3 \\rangle"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"\\langle 3, -4 \\rangle"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"\\langle -3, -4 \\rangle"}</InlineMath>, isCorrect: true },
      { label: <InlineMath>{"\\langle -4, -3 \\rangle"}</InlineMath>, isCorrect: false }
    ],
    explanation: "To reverse direction, multiply by scalar -1. The magnitude remains 5, but the components become <-3, -4>."
  }
];

export default function ConvertReviewSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Quiz State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentIdx];

  const slideInteraction: Interaction = {
    id: 'convert-review-quiz',
    conceptId: 'vector-conversion-quiz',
    conceptName: 'Vector Conversion Review',
    type: 'learning', // Changed from 'quiz' to 'learning' to satisfy InteractionType
    description: 'Review of converting between component and polar forms.'
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
        interactionId: 'convert-review-quiz',
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
    <div className="w-full p-4 sm:p-8 min-h-[500px] flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        
        {/* Progress Bar */}
        <div className="mb-8">
            <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
                <span>Question {isComplete ? questions.length : currentIdx + 1} of {questions.length}</span>
                <span>Score: {score}</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
                />
            </div>
        </div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
                {/* Question Area */}
                <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                        {question.text}
                    </h3>
                </div>

                {/* Options */}
                <div className="p-8 space-y-3">
                    {question.options.map((opt, idx) => {
                        let btnClass = "w-full p-4 rounded-xl border-2 text-left transition-all text-lg flex justify-between items-center group ";
                        
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

                {/* Footer / Explanation */}
                <AnimatePresence>
                    {isAnswered ? (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="bg-slate-100 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700"
                        >
                            <div className="p-6">
                                <div className="flex gap-3 mb-4">
                                    <span className="text-2xl">💡</span>
                                    <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        <strong className="block text-slate-800 dark:text-slate-100 mb-1">Explanation</strong>
                                        {question.explanation}
                                    </div>
                                </div>
                                <button 
                                    onClick={handleNext}
                                    className="w-full py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                                >
                                    {currentIdx < questions.length - 1 ? "Next Question" : "See Results"}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="p-8 pt-0">
                            <button 
                                onClick={handleSubmit}
                                disabled={selectedOpt === null}
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none hover:bg-blue-500 transition-all"
                            >
                                Submit Answer
                            </button>
                        </div>
                    )}
                </AnimatePresence>

            </motion.div>
          ) : (
            // Results Card
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-12 text-center"
            >
                <div className="text-6xl mb-6">
                    {score === questions.length ? '🌟' : score > questions.length/2 ? '👍' : '📚'}
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Review Complete!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">
                    You scored <strong className="text-blue-600">{score}</strong> out of {questions.length}
                </p>
                <button 
                    onClick={handleRetry}
                    className="px-8 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
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
      slideId="convert-review"
      slideTitle="Converting between vector components and magnitude & direction review"
      moduleId="vectors-prerequisite"
      submoduleId="component-form-of-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}