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
        If <InlineMath>{"\\vec{v} = \\langle 3, -4 \\rangle"}</InlineMath>, what is its magnitude <InlineMath>{"|\\vec{v}|"}</InlineMath>?
      </span>
    ),
    options: [
      { label: "1", isCorrect: false },
      { label: "5", isCorrect: true },
      { label: "7", isCorrect: false },
      { label: "25", isCorrect: false }
    ],
    explanation: (
      <span>
        Magnitude is <InlineMath>{"\\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5"}</InlineMath>. Remember, magnitude is always positive!
      </span>
    )
  },
  {
    id: 2,
    text: "To graphically add vector B to vector A (A + B), where do you place the tail of B?",
    options: [
      { label: "At the tail of A", isCorrect: false },
      { label: "At the origin (0,0)", isCorrect: false },
      { label: "At the head (tip) of A", isCorrect: true },
      { label: "Anywhere on the graph", isCorrect: false }
    ],
    explanation: "This is the 'Head-to-Tail' method. You start the second vector exactly where the first one ended."
  },
  {
    id: 3,
    text: (
      <span>
        Given <InlineMath>{"\\vec{u} = \\langle 1, 2 \\rangle"}</InlineMath> and <InlineMath>{"\\vec{v} = \\langle 3, 1 \\rangle"}</InlineMath>, calculate <InlineMath>{"2\\vec{u} - \\vec{v}"}</InlineMath>.
      </span>
    ),
    options: [
      { label: <InlineMath>{"\\langle -1, 3 \\rangle"}</InlineMath>, isCorrect: true },
      { label: <InlineMath>{"\\langle 5, 5 \\rangle"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"\\langle -2, 1 \\rangle"}</InlineMath>, isCorrect: false },
      { label: <InlineMath>{"\\langle 2, 3 \\rangle"}</InlineMath>, isCorrect: false }
    ],
    explanation: (
      <div className="text-left">
        First, scale <InlineMath>{"\\vec{u}"}</InlineMath>: <InlineMath>{"2\\langle 1, 2 \\rangle = \\langle 2, 4 \\rangle"}</InlineMath>.<br/>
        Then subtract <InlineMath>{"\\vec{v}"}</InlineMath>: <InlineMath>{"\\langle 2-3, 4-1 \\rangle = \\langle -1, 3 \\rangle"}</InlineMath>.
      </div>
    )
  },
  {
    id: 4,
    text: "Multiplying a vector by a scalar k = -3 will:",
    options: [
      { label: "Shrink it by 3 and keep direction", isCorrect: false },
      { label: "Stretch it by 3 and keep direction", isCorrect: false },
      { label: "Shrink it by 3 and reverse direction", isCorrect: false },
      { label: "Stretch it by 3 and reverse direction", isCorrect: true }
    ],
    explanation: "The magnitude scales by |k| = |-3| = 3 (stretch). The negative sign reverses the direction."
  },
  {
    id: 5,
    text: (
      <span>
        If you walk 10m North and then 10m South, what is your <strong>displacement</strong>?
      </span>
    ),
    options: [
      { label: "20m", isCorrect: false },
      { label: "10m North", isCorrect: false },
      { label: "0 vector", isCorrect: true },
      { label: "Cannot be determined", isCorrect: false }
    ],
    explanation: "Displacement is the net change in position. Since you returned to the start, the displacement vector has a magnitude of 0."
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
    type: 'learning', // Changed from 'quiz' to 'learning'
    description: 'Comprehensive review of vector basics, arithmetic, and properties.'
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
        interactionId: 'vector-ops-review-quiz',
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
                    {score === questions.length ? '🏆' : score > questions.length/2 ? '😎' : '💪'}
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Quiz Complete!</h2>
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