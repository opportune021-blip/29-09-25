import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface AdditionScenario {
  id: string;
  val1: string;
  val2: string;
  val1Decimals: number;
  val2Decimals: number;
  operation: '+' | '-';
}

const scenarios: AdditionScenario[] = [
  {
    id: 'ex1',
    val1: "12.52",   // 2 decimal places
    val2: "349.1",   // 1 decimal place (Limiting)
    val1Decimals: 2,
    val2Decimals: 1,
    operation: '+'
  },
  {
    id: 'ex2',
    val1: "5.2",     // 1 decimal place
    val2: "7.843",   // 3 decimal places
    val1Decimals: 1,
    val2Decimals: 3,
    operation: '+'
  },
  {
    id: 'ex3',
    val1: "85.45",   // 2 decimal places
    val2: "2.5",     // 1 decimal place (Limiting)
    val1Decimals: 2,
    val2Decimals: 1,
    operation: '-'
  }
];

export default function AdditionSigFigsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showCutoff, setShowCutoff] = useState(false);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'sig-figs-add-rule', 
      conceptId: 'sig-figs-addition', 
      conceptName: 'Addition/Subtraction Rule', 
      type: 'learning', 
      description: 'Applying the decimal place rule to addition and subtraction.' 
    }
  ];

  const current = scenarios[scenarioIndex];
  
  // Logic
  const num1 = parseFloat(current.val1);
  const num2 = parseFloat(current.val2);
  const rawResult = current.operation === '+' ? num1 + num2 : num1 - num2;
  
  // Find limiting decimal place
  const limitDecimals = Math.min(current.val1Decimals, current.val2Decimals);
  
  // Rounding
  const roundedResultStr = rawResult.toFixed(limitDecimals);

  const nextScenario = () => {
    setShowCutoff(false);
    setTimeout(() => {
        setScenarioIndex((prev) => (prev + 1) % scenarios.length);
    }, 300);
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The "Stacking" Rule 🧱</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Addition and Subtraction follow a different rule than multiplication. Here, we care about <strong>precision</strong> (decimal places), not the total number of digits.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-400 dark:border-purple-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Rule</h4>
              <p>
                The result is rounded to the same number of <strong>decimal places</strong> as the number with the <strong>fewest</strong> decimal places.
              </p>
            </div>

            <div className="space-y-2 text-base">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Why?</h4>
                <p>
                    Imagine stacking bricks. If one brick is shorter (less precise), the whole wall cannot be perfectly smooth beyond that point.
                </p>
            </div>
            
             <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 text-sm">
                <strong>Tip:</strong> Always stack the numbers vertically to find the "Cutoff Line".
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Stack */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Vertical Analyzer</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Align the numbers. Drop the "Cutoff Line" to see where the precision ends.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* The Math Stack */}
                <div className="relative font-mono text-4xl sm:text-5xl text-slate-800 dark:text-slate-100 leading-relaxed text-right pr-8">
                    
                    {/* The Cutoff Line (Animated) */}
                    <AnimatePresence>
                        {showCutoff && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: '120%', opacity: 1 }}
                                className="absolute top-[-10%] border-r-2 border-red-500 border-dashed z-10"
                                style={{ 
                                    right: `${(Math.max(current.val1Decimals, current.val2Decimals) - limitDecimals) * 0.6 + 0.8}em` 
                                    // Heuristic positioning based on font size
                                }}
                            >
                                <div className="absolute -top-6 -right-12 text-xs font-sans bg-red-100 text-red-800 px-2 py-1 rounded whitespace-nowrap">
                                    Stop Here!
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Number 1 */}
                    <div className="relative">
                        {current.val1}
                        {/* Visualizing empty space if it has fewer decimals */}
                         {current.val1Decimals < current.val2Decimals && (
                            <span className="opacity-20 text-slate-400">
                                {'0'.repeat(current.val2Decimals - current.val1Decimals).replace(/0/g, '?')}
                            </span>
                        )}
                    </div>

                    {/* Operator & Number 2 */}
                    <div className="relative border-b-4 border-slate-800 dark:border-slate-200">
                        <span className="absolute -left-8">{current.operation}</span>
                        {current.val2}
                        {current.val2Decimals < current.val1Decimals && (
                            <span className="opacity-20 text-slate-400">
                                {'0'.repeat(current.val1Decimals - current.val2Decimals).replace(/0/g, '?')}
                            </span>
                        )}
                    </div>

                    {/* Raw Result (Initially hidden or faded) */}
                    <div className={`mt-2 transition-opacity duration-300 ${showCutoff ? 'opacity-40 blur-[1px]' : 'opacity-0'}`}>
                        {rawResult}
                    </div>
                </div>

                {/* Final Result Card */}
                <AnimatePresence>
                    {showCutoff && (
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-full max-w-xs bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-4 text-center"
                        >
                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Rounded Result</div>
                            <div className="text-3xl font-bold text-green-700 dark:text-green-400 font-mono">
                                {roundedResultStr}
                            </div>
                            <div className="mt-1 text-xs text-green-600">
                                Limited to {limitDecimals} decimal place{limitDecimals !== 1 && 's'}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Controls */}
                <div className="flex gap-4 mt-4">
                    {!showCutoff ? (
                        <button 
                            onClick={() => setShowCutoff(true)}
                            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold shadow-lg transition-all active:scale-95"
                        >
                            Drop Cutoff Line ✂️
                        </button>
                    ) : (
                        <button 
                            onClick={nextScenario}
                            className="px-8 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg font-bold shadow transition-all"
                        >
                            Next Example ⏭️
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="addition-subtraction-sig-figs"
      slideTitle="Addition and subtraction with significant figures"
      moduleId="units-and-measurement"
      submoduleId="significant-figures"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}