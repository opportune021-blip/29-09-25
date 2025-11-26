import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function SubtractEndToEndSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State
  const vecA = { x: 4, y: 1 };
  const vecB = { x: 1, y: 3 };
  
  // 'AtoB' means arrow points from A's head to B's head (Wrong for A-B)
  // 'BtoA' means arrow points from B's head to A's head (Correct for A-B)
  const [guessDirection, setGuessDirection] = useState<'none' | 'AtoB' | 'BtoA'>('none');
  const [showValidation, setShowValidation] = useState(false);

  // Config
  const GRID = 40;
  const ORIGIN = { x: 150, y: 250 };

  const slideInteraction: Interaction = {
    id: 'subtract-tail-to-tail',
    conceptId: 'vector-subtraction-tail-to-tail',
    conceptName: 'Tail-to-Tail Subtraction',
    type: 'learning',
    description: 'Visualizing the tail-to-tail shortcut for vector subtraction.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const handleGuess = (dir: 'AtoB' | 'BtoA') => {
    setGuessDirection(dir);
    setShowValidation(true);
    
    const isCorrect = dir === 'BtoA';
    
    if (isCorrect) {
        handleInteractionComplete({
            interactionId: 'subtract-tail-to-tail',
            value: 'correct',
            timestamp: Date.now()
        });
    }
  };

  const reset = () => {
    setGuessDirection('none');
    setShowValidation(false);
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY (40%)                 */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">The "Tail-to-Tail" Shortcut</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                A faster way to visualize subtraction.
            </p>
        </div>

        {/* Scrollable Theory */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Concept */}
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                    Instead of flipping the second vector, you can place both vectors <strong>tail-to-tail</strong> at the same origin. 
                    The difference vector connects their heads.
                </p>
            </div>

            {/* The "Aha!" Mnemonic */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-2">The Golden Rule</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                    For <InlineMath>{"\\vec{a} - \\vec{b}"}</InlineMath>, the arrow points <strong>towards the positive vector</strong>.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded font-mono text-center text-xs border border-indigo-200 dark:border-indigo-700 text-slate-600 dark:text-slate-300">
                    "Destination minus Origin"
                    <br/>
                    (End) - (Start)
                </div>
            </div>

            {/* Verification Logic (Shows when correct) */}
            {showValidation && guessDirection === 'BtoA' && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800"
                >
                    <h4 className="font-bold text-green-800 dark:text-green-200 text-sm mb-2">Verification</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                        Check the path: Start at origin, go along <InlineMath>{"\\vec{b}"}</InlineMath>, then add the difference vector. You end up at <InlineMath>{"\\vec{a}"}</InlineMath>.
                    </p>
                    <div className="font-mono text-center text-xs font-bold text-green-700 dark:text-green-300">
                        <InlineMath>{"\\vec{b} + (\\vec{a} - \\vec{b}) = \\vec{a}"}</InlineMath>
                    </div>
                </motion.div>
            )}

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: INTERACTIVE QUIZ (60%)      */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* TOP RIGHT: VISUALIZATION */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[350px]">
            
            {/* Goal Overlay */}
            <div className="absolute top-4 left-4 bg-slate-800/90 px-3 py-2 rounded-lg border border-slate-600 text-sm shadow-lg z-10">
                <div className="font-bold text-slate-200 mb-1">Goal: <InlineMath>{"\\vec{a} - \\vec{b}"}</InlineMath></div>
                <div className="text-[10px] text-slate-400">Connect heads to solve.</div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-sub" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeWidth="1"/>
                </pattern>
                <marker id="head-a-sub" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                <marker id="head-b-sub" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#9333EA" /></marker>
                <marker id="head-res-correct" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
                <marker id="head-res-wrong" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-sub)" />
              
              <g transform={`translate(${ORIGIN.x}, ${ORIGIN.y})`}>
                
                {/* Vector A */}
                <line 
                    x1="0" y1="0" 
                    x2={vecA.x * GRID} y2={-vecA.y * GRID} 
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-a-sub)" 
                />
                <text x={vecA.x * GRID + 10} y={-vecA.y * GRID} fill="#3B82F6" fontWeight="bold" fontSize="16"><InlineMath>{"\\vec{a}"}</InlineMath></text>

                {/* Vector B (Tail-to-Tail) */}
                <line 
                    x1="0" y1="0" 
                    x2={vecB.x * GRID} y2={-vecB.y * GRID} 
                    stroke="#9333EA" strokeWidth="4" markerEnd="url(#head-b-sub)" 
                />
                <text x={vecB.x * GRID - 25} y={-vecB.y * GRID - 5} fill="#9333EA" fontWeight="bold" fontSize="16"><InlineMath>{"\\vec{b}"}</InlineMath></text>

                {/* The Resultant Guess */}
                {guessDirection !== 'none' && (
                    <motion.line 
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        // A to B: Start at A head, end at B head
                        x1={guessDirection === 'AtoB' ? vecA.x * GRID : vecB.x * GRID}
                        y1={guessDirection === 'AtoB' ? -vecA.y * GRID : -vecB.y * GRID}
                        x2={guessDirection === 'AtoB' ? vecB.x * GRID : vecA.x * GRID}
                        y2={guessDirection === 'AtoB' ? -vecB.y * GRID : -vecA.y * GRID}
                        
                        stroke={guessDirection === 'BtoA' ? "#10B981" : "#EF4444"} 
                        strokeWidth="5" 
                        strokeDasharray={guessDirection === 'BtoA' ? "0" : "5,5"}
                        markerEnd={`url(#head-res-${guessDirection === 'BtoA' ? 'correct' : 'wrong'})`} 
                    />
                )}
              </g>
            </svg>
            
            {/* Overlay Buttons for Choice */}
            {guessDirection === 'none' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex gap-4 pointer-events-auto">
                        <button 
                            onClick={() => handleGuess('AtoB')}
                            className="bg-white hover:bg-slate-100 text-slate-800 px-4 py-2 rounded-lg shadow-xl border-2 border-slate-200 font-bold text-xs transform hover:scale-105 transition-all"
                        >
                            Draw <InlineMath>{"\\vec{a} \\to \\vec{b}"}</InlineMath>
                        </button>
                        <button 
                            onClick={() => handleGuess('BtoA')}
                            className="bg-white hover:bg-slate-100 text-slate-800 px-4 py-2 rounded-lg shadow-xl border-2 border-slate-200 font-bold text-xs transform hover:scale-105 transition-all"
                        >
                            Draw <InlineMath>{"\\vec{b} \\to \\vec{a}"}</InlineMath>
                        </button>
                    </div>
                </div>
            )}

        </div>

        {/* BOTTOM RIGHT: FEEDBACK */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm min-h-[150px] flex flex-col justify-center items-center text-center">
            {!showValidation ? (
                <>
                    <div className="text-3xl mb-2">🤔</div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">Which way does the difference vector point?</p>
                    <p className="text-xs text-slate-400 mt-1">Make a choice on the diagram to verify.</p>
                </>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {guessDirection === 'BtoA' ? (
                        <>
                            <div className="text-3xl mb-2">✅</div>
                            <h3 className="text-lg font-bold text-green-600 mb-1">Correct!</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                <InlineMath>{"\\vec{a} - \\vec{b}"}</InlineMath> points from the head of <strong>B</strong> to the head of <strong>A</strong>.
                            </p>
                            <button 
                                onClick={reset}
                                className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline"
                            >
                                Reset & Try Again
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="text-3xl mb-2">❌</div>
                            <h3 className="text-lg font-bold text-red-500 mb-1">Oops!</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                                That actually represents <InlineMath>{"\\vec{b} - \\vec{a}"}</InlineMath>.
                            </p>
                            <button 
                                onClick={reset}
                                className="px-6 py-2 bg-slate-800 text-white rounded-full text-sm font-bold hover:bg-slate-700 shadow-lg"
                            >
                                Try Again
                            </button>
                        </>
                    )}
                </motion.div>
            )}
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="sub-end-to-end"
      slideTitle="Subtracting vectors end-to-end"
      moduleId="vectors-prerequisite"
      submoduleId="vector-addition-and-subtraction"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}