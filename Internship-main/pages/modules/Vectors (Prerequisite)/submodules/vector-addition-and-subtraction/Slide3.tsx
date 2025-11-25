import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function SubtractEndToEndSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State
  // We use fixed vectors for A and B to keep the geometric demonstration clear
  const vecA = { x: 4, y: 1 };
  const vecB = { x: 1, y: 3 };
  
  // The user guesses the direction of the Resultant in Tail-to-Tail mode
  // 'AtoB' means arrow points from A's head to B's head
  // 'BtoA' means arrow points from B's head to A's head
  const [guessDirection, setGuessDirection] = useState<'none' | 'AtoB' | 'BtoA'>('none');
  const [showValidation, setShowValidation] = useState(false);

  // Config
  const GRID = 40;
  const ORIGIN = { x: 150, y: 250 };

  // Calculations
  const resX = vecA.x - vecB.x;
  const resY = vecA.y - vecB.y;

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
    
    // Correct answer for A - B is pointing from B to A
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
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            The "Tail-to-Tail" Shortcut
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Another way to find <InlineMath>\vec{R} = \vec{a} - \vec{b}</InlineMath> is to place both tails together. 
            The difference vector connects the two heads... but which way does it point?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* LEFT: Interactive Visualization */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
            
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 px-3 py-2 rounded shadow text-sm z-10">
                <div className="font-bold text-slate-700 dark:text-slate-200 mb-1">Goal: <InlineMath>\vec{a} - \vec{b}</InlineMath></div>
                <div className="text-xs text-slate-500">Connect the heads to find the difference.</div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-sub" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="head-a-sub" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                <marker id="head-b-sub" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#9333EA" /></marker>
                <marker id="head-res-correct" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
                <marker id="head-res-wrong" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-sub)" className="text-slate-400" />
              
              <g transform={`translate(${ORIGIN.x}, ${ORIGIN.y})`}>
                
                {/* Vector A */}
                <line 
                    x1="0" y1="0" 
                    x2={vecA.x * GRID} y2={-vecA.y * GRID} 
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-a-sub)" 
                />
                <text x={vecA.x * GRID + 10} y={-vecA.y * GRID} fill="#3B82F6" fontWeight="bold"><InlineMath>\vec{a}</InlineMath></text>

                {/* Vector B (Tail-to-Tail) */}
                <line 
                    x1="0" y1="0" 
                    x2={vecB.x * GRID} y2={-vecB.y * GRID} 
                    stroke="#9333EA" strokeWidth="4" markerEnd="url(#head-b-sub)" 
                />
                <text x={vecB.x * GRID - 20} y={-vecB.y * GRID - 10} fill="#9333EA" fontWeight="bold"><InlineMath>\vec{b}</InlineMath></text>

                {/* The Resultant Guess */}
                {guessDirection !== 'none' && (
                    <motion.line 
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        // A to B: Start at A head, end at B head
                        x1={guessDirection === 'AtoB' ? vecA.x * GRID : vecB.x * GRID}
                        y1={guessDirection === 'AtoB' ? -vecA.y * GRID : -vecB.y * GRID}
                        x2={guessDirection === 'AtoB' ? vecB.x * GRID : vecA.x * GRID}
                        y2={guessDirection === 'AtoB' ? -vecB.y * GRID : -vecA.y * GRID}
                        
                        stroke={guessDirection === 'BtoA' ? "#10B981" : "#EF4444"} 
                        strokeWidth="4" 
                        strokeDasharray={guessDirection === 'BtoA' ? "0" : "5,5"}
                        markerEnd={`url(#head-res-${guessDirection === 'BtoA' ? 'correct' : 'wrong'})`} 
                    />
                )}
              </g>
            </svg>
            
            {/* Overlay Buttons for Choice */}
            {guessDirection === 'none' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-4">
                        <button 
                            onClick={() => handleGuess('AtoB')}
                            className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded shadow-lg border border-slate-200 font-bold transform hover:scale-105 transition-all"
                        >
                            Draw from <InlineMath>\vec{a}</InlineMath> to <InlineMath>\vec{b}</InlineMath>
                        </button>
                        <button 
                            onClick={() => handleGuess('BtoA')}
                            className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded shadow-lg border border-slate-200 font-bold transform hover:scale-105 transition-all"
                        >
                            Draw from <InlineMath>\vec{b}</InlineMath> to <InlineMath>\vec{a}</InlineMath>
                        </button>
                    </div>
                </div>
            )}

          </div>

          {/* RIGHT: Explanation */}
          <div className="flex flex-col gap-6">
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm min-h-[200px] flex flex-col justify-center">
                {!showValidation ? (
                    <div className="text-center text-slate-500">
                        <div className="text-4xl mb-4">🤔</div>
                        <p>Which vector represents <InlineMath>\vec{a} - \vec{b}</InlineMath>?</p>
                        <p className="text-sm mt-2">Make a choice on the diagram to verify.</p>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        {guessDirection === 'BtoA' ? (
                            <>
                                <div className="text-4xl mb-4">✅</div>
                                <h3 className="text-xl font-bold text-green-600 mb-2">Correct!</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    <InlineMath>\vec{a} - \vec{b}</InlineMath> points from the head of <strong>B</strong> to the head of <strong>A</strong>.
                                </p>
                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm text-green-800 dark:text-green-200 font-mono">
                                    Tip: "Subtracted ends at Start, Subtractor ends at Tail" ... or just remember <strong>"Destination minus Origin"</strong>. 
                                    <br/>The arrow points TO the positive vector.
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-4xl mb-4">❌</div>
                                <h3 className="text-xl font-bold text-red-500 mb-2">Oops!</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    That vector actually represents <InlineMath>\vec{b} - \vec{a}</InlineMath>.
                                </p>
                                <button 
                                    onClick={reset}
                                    className="px-6 py-2 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700"
                                >
                                    Try Again
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Step by Step Logic */}
            {showValidation && guessDirection === 'BtoA' && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-blue-50 dark:bg-slate-900/30 p-6 rounded-xl border border-blue-100 dark:border-slate-700"
                >
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Verification</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        We can verify this by checking the path. Start at the origin, go along <InlineMath>\vec{b}</InlineMath>, then add our difference vector <InlineMath>(\vec{a}-\vec{b})</InlineMath>. We should end up at <InlineMath>\vec{a}</InlineMath>.
                    </p>
                    <div className="font-mono text-center bg-white dark:bg-slate-800 p-3 rounded border border-blue-200 dark:border-slate-600">
                        <BlockMath>{`\\vec{b} + (\\vec{a} - \\vec{b}) = \\vec{a}`}</BlockMath>
                    </div>
                </motion.div>
            )}

            {/* Reset Button (only if correct to allow replay) */}
            {guessDirection === 'BtoA' && (
                 <button 
                 onClick={reset}
                 className="self-center text-sm text-slate-400 hover:text-slate-600 underline"
             >
                 Reset Visualization
             </button>
            )}

          </div>

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