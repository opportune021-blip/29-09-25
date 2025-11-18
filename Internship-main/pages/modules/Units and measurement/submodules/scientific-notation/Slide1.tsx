import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function NotationExampleSmallSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Current position of the decimal point (0 = start)
  const [decimalMoves, setDecimalMoves] = useState(0);
  const targetMoves = 10;
  const isComplete = decimalMoves === targetMoves;

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'sci-notation-small', 
      conceptId: 'scientific-notation-negative', 
      conceptName: 'Scientific Notation (Small Numbers)', 
      type: 'learning', // FIX 1: Changed 'practice' to 'learning' to match defined types
      description: 'Practice converting a small decimal number to scientific notation.' 
    }
  ];

  // Visual Logic
  const zeros = "000000000";
  const digits = "3457";
  
  // Construct the visual number based on decimal moves
  const renderNumber = () => {
    const fullString = "0" + zeros + digits; 
    const beforeDecimal = fullString.slice(0, 1 + decimalMoves);
    const afterDecimal = fullString.slice(1 + decimalMoves);

    return (
      <div className="text-3xl sm:text-4xl font-mono tracking-widest text-slate-700 dark:text-slate-300 break-all flex flex-wrap justify-center items-baseline">
        {beforeDecimal.split('').map((char, i) => (
           <span key={`pre-${i}`} className={i === 0 && decimalMoves > 0 ? "opacity-30" : ""}>{char}</span>
        ))}
        
        {/* The Floating Decimal Point */}
        <motion.div 
            layoutId="decimal-point"
            className="mx-1 w-3 h-3 bg-blue-600 rounded-full inline-block"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />

        {afterDecimal.split('').map((char, i) => (
           <span key={`post-${i}`}>{char}</span>
        ))}
      </div>
    );
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Taming Tiny Numbers 🐜</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Writing <code>0.0000000003457</code> is prone to error. Is that 8 zeros? 9 zeros? It's hard to tell at a glance.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Rule ($N \times 10^n$)</h4>
              <ol className="list-decimal pl-5 space-y-2">
                  <li>Move the decimal point to the <strong>right</strong> until you have one non-zero digit to its left.</li>
                  <li>Count how many times you moved ($n$).</li>
                  <li>Because you moved right (making the number bigger), the exponent is <strong>negative</strong> ($-n$).</li>
              </ol>
            </div>

            <div className="p-4 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-center">
                <p className="text-sm text-slate-500 mb-2">Goal: Convert to Standard Form</p>
                <BlockMath>{`a \\times 10^b`}</BlockMath>
                {/* FIX 2: Used math prop to avoid JSX parsing error with '<' symbol */}
                <p className="text-sm">Where <InlineMath math="1 \le a < 10" /></p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The Decimal Hopper</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
                Click the arrow to hop the decimal point until the number looks correct (3.457).
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* The Number Display */}
                <div className="w-full bg-slate-100 dark:bg-slate-900 p-8 rounded-xl shadow-inner min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden">
                    
                    {/* Original Ghost Number (for reference) */}
                    <div className="absolute top-2 left-2 text-xs font-mono text-slate-400 opacity-50">
                        Original: 0.0000000003457
                    </div>

                    {renderNumber()}

                    {/* Exponent Counter */}
                    {decimalMoves > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 flex items-center gap-2"
                        >
                            <span className="text-sm font-bold text-slate-500 uppercase">Jumps Right:</span>
                            <span className="text-2xl font-bold text-red-500">{decimalMoves}</span>
                        </motion.div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setDecimalMoves(0)}
                            className="px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
                        >
                            Reset
                        </button>

                        <button
                            onClick={() => !isComplete && setDecimalMoves(p => p + 1)}
                            disabled={isComplete}
                            className={`px-6 py-3 rounded-lg font-bold text-white shadow-lg flex items-center gap-2 transition-all
                                ${isComplete 
                                    ? 'bg-green-500 cursor-default' 
                                    : 'bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95'
                                }`}
                        >
                            {isComplete ? (
                                <span>Target Reached! 🎉</span>
                            ) : (
                                <>
                                    <span>Hop Right ➡️</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Final Result Card */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full bg-green-50 dark:bg-green-900/20 border-2 border-green-400 rounded-xl p-6 text-center"
                        >
                            <p className="text-green-800 dark:text-green-200 font-medium mb-2">Final Scientific Notation</p>
                            <div className="text-4xl font-bold text-slate-800 dark:text-white">
                                <InlineMath>{`3.457 \\times 10^{-10}`}</InlineMath>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">
                                (Negative because the original number was less than 1)
                            </p>
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
      slideId="notation-example-small"
      slideTitle="Scientific notation example: Small"
      moduleId="units-and-measurement"
      submoduleId="scientific-notation"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}