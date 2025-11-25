import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- DATA & HELPERS ---

// Pythagorean triples for "nice" initial numbers
const TRIPLES = [
  { x: 3, y: 4 }, { x: -3, y: 4 }, { x: 4, y: -3 },
  { x: 5, y: 12 }, { x: -5, y: -12 },
  { x: 6, y: 8 }, { x: 8, y: 15 }, { x: -8, y: 15 }
];

const getRandomProblem = (isAdvanced: boolean) => {
  if (!isAdvanced) {
    // Return a random triple
    return TRIPLES[Math.floor(Math.random() * TRIPLES.length)];
  } else {
    // Random integers between -10 and 10
    return {
      x: Math.floor(Math.random() * 20) - 10 || 5, // Avoid 0
      y: Math.floor(Math.random() * 20) - 10 || 5
    };
  }
};

export default function MagnitudeFromComponentsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Game State
  const [problem, setProblem] = useState(TRIPLES[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [streak, setStreak] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  // Calculations
  const actualMagnitude = Math.sqrt(problem.x ** 2 + problem.y ** 2);
  const isIntegerAnswer = Number.isInteger(actualMagnitude);

  const slideInteraction: Interaction = {
    id: 'magnitude-components-practice',
    conceptId: 'magnitude-formula',
    conceptName: 'Magnitude Formula Practice',
    type: 'learning',
    description: 'Drill on calculating vector magnitude from components.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const checkAnswer = () => {
    const val = parseFloat(userAnswer);
    if (isNaN(val)) return;

    // Tolerance for decimals
    const tolerance = 0.1;
    if (Math.abs(val - actualMagnitude) < tolerance) {
      setStatus('correct');
      setStreak(s => s + 1);
      setShowSolution(true); // Show the visualization on success
      
      // Track success after a few correct answers
      if (streak >= 2) {
         handleInteractionComplete({
            interactionId: 'magnitude-components-practice',
            value: 'mastered',
            timestamp: Date.now()
         });
      }
    } else {
      setStatus('wrong');
    }
  };

  const nextProblem = () => {
    // If streak is high (>3), mix in harder numbers
    const next = getRandomProblem(streak > 3);
    // Ensure we don't get the same problem twice in a row
    if (next.x === problem.x && next.y === problem.y) {
        setProblem({ x: next.y, y: -next.x });
    } else {
        setProblem(next);
    }
    
    setUserAnswer('');
    setStatus('idle');
    setShowSolution(false);
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Calculating Magnitude</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Use the formula <InlineMath>{`|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}`}</InlineMath>
                </p>
            </div>
            <div className="text-right">
                <div className="text-xs uppercase font-bold text-slate-500">Streak</div>
                <div className="text-2xl font-bold text-blue-600">🔥 {streak}</div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* LEFT: The Problem Card */}
            <div className="flex flex-col gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                    
                    <h3 className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-6">Find the magnitude</h3>
                    
                    <div className="text-4xl md:text-5xl font-mono font-bold text-slate-800 dark:text-slate-100 mb-8">
                        <InlineMath>{`\\vec{v} = \\langle ${problem.x}, ${problem.y} \\rangle`}</InlineMath>
                    </div>

                    <div className="flex flex-col gap-4 max-w-xs mx-auto">
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => {
                                setUserAnswer(e.target.value);
                                setStatus('idle');
                            }}
                            placeholder="Enter magnitude..."
                            className={`w-full text-center text-xl p-3 rounded-xl border-2 outline-none transition-all ${
                                status === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800' :
                                status === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                                'border-slate-300 dark:border-slate-600 focus:border-blue-500'
                            }`}
                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        />
                        
                        {status === 'idle' || status === 'wrong' ? (
                            <button
                                onClick={checkAnswer}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/30"
                            >
                                Check Answer
                            </button>
                        ) : (
                            <button
                                onClick={nextProblem}
                                className="w-full py-3 bg-slate-800 hover:bg-slate-700 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold transition-colors shadow-lg"
                            >
                                Next Problem ➜
                            </button>
                        )}
                    </div>
                    
                    {/* Status Feedback */}
                    <div className="h-8 mt-4">
                        {status === 'wrong' && (
                            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 font-bold">
                                Not quite. Try calculating <InlineMath>{`\\sqrt{${problem.x}^2 + ${problem.y}^2}`}</InlineMath>
                            </motion.span>
                        )}
                        {status === 'correct' && (
                            <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-green-600 font-bold flex items-center justify-center gap-2">
                                Correct! {isIntegerAnswer ? "It's a perfect integer." : "Good decimal approximation."}
                            </motion.span>
                        )}
                    </div>

                </div>
            </div>

            {/* RIGHT: Visual Proof (Reveals on Answer) */}
            <div className="relative min-h-[300px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {showSolution ? (
                        <motion.div
                            key="solution"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
                        >
                            <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-4 border-b pb-2">Why?</h4>
                            
                            {/* Step-by-step Math */}
                            <div className="space-y-4 text-lg">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold">1</span>
                                    <span>Square the components:</span>
                                </div>
                                <div className="pl-12 font-mono text-slate-600 dark:text-slate-400">
                                    <BlockMath>{`(${problem.x})^2 + (${problem.y})^2 = ${problem.x**2} + ${problem.y**2}`}</BlockMath>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold">2</span>
                                    <span>Add them up:</span>
                                </div>
                                <div className="pl-12 font-mono text-slate-600 dark:text-slate-400">
                                    <BlockMath>{`${problem.x**2} + ${problem.y**2} = ${problem.x**2 + problem.y**2}`}</BlockMath>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold">3</span>
                                    <span>Take the square root:</span>
                                </div>
                                <div className="pl-12 font-mono font-bold text-blue-600">
                                    <BlockMath>{`\\sqrt{${problem.x**2 + problem.y**2}} = ${actualMagnitude.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}</BlockMath>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-slate-400"
                        >
                            <div className="text-6xl mb-4 opacity-20">📐</div>
                            <p>Solve the problem to see the step-by-step breakdown.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="mag-from-components"
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