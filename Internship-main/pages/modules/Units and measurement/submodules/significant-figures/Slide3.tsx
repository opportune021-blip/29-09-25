import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface CalculationScenario {
  id: string;
  label: string;
  val1: number;
  val1Str: string;
  val1SigFigs: number;
  operation: '×' | '÷';
  val2: number;
  val2Str: string;
  val2SigFigs: number;
  rawResult: number;
}

const scenarios: CalculationScenario[] = [
  {
    id: 'area',
    label: 'Calculating Area',
    val1: 12.25,
    val1Str: "12.25", // 4 sig figs
    val1SigFigs: 4,
    operation: '×',
    val2: 4.2,
    val2Str: "4.2",   // 2 sig figs
    val2SigFigs: 2,
    rawResult: 51.45
  },
  {
    id: 'density',
    label: 'Calculating Density',
    val1: 25.5,
    val1Str: "25.5", // 3 sig figs (Mass)
    val1SigFigs: 3,
    operation: '÷',
    val2: 5.0,
    val2Str: "5.0",  // 2 sig figs (Volume)
    val2SigFigs: 2,
    rawResult: 5.1
  },
  {
    id: 'force',
    label: 'Calculating Force',
    val1: 6.115,
    val1Str: "6.115", // 4 sig figs (Mass)
    val1SigFigs: 4,
    operation: '×',
    val2: 2.05,
    val2Str: "2.05",  // 3 sig figs (Accel)
    val2SigFigs: 3,
    rawResult: 12.53575
  }
];

export default function MultiplyingSigFigsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showRounded, setShowRounded] = useState(false);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'sig-figs-mult-rule', 
      conceptId: 'sig-figs-multiplication', 
      conceptName: 'Multiplication/Division Rule', 
      type: 'learning', 
      description: 'Applying the weakest link rule to multiplication and division.' 
    }
  ];

  const current = scenarios[scenarioIndex];
  
  // Determine the "Weakest Link" (Minimum Sig Figs)
  const minSigFigs = Math.min(current.val1SigFigs, current.val2SigFigs);
  
  // Format the rounded result
  // Note: toPrecision handles sig figs automatically in JS
  const roundedResultStr = current.rawResult.toPrecision(minSigFigs);

  const nextScenario = () => {
    setShowRounded(false);
    setScenarioIndex((prev) => (prev + 1) % scenarios.length);
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Weakest Link Rule 🔗</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              When Multiplying or Dividing, the rule is simple but strict:
            </p>

            

            <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-400 dark:border-indigo-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Rule</h4>
              <p>
                The result cannot have more significant figures than the measurement with the <strong>fewest</strong> significant figures.
              </p>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                <p className="text-sm font-bold text-slate-500 uppercase mb-2">Example</p>
                <div className="flex items-center gap-4 font-mono text-lg">
                    <div className="text-center">
                        <div>2.5</div>
                        <div className="text-xs text-red-500 font-bold">(2 sig figs)</div>
                    </div>
                    <div>×</div>
                    <div className="text-center">
                        <div>3.42</div>
                        <div className="text-xs text-green-500">(3 sig figs)</div>
                    </div>
                    <div>=</div>
                    <div className="text-center p-1 bg-indigo-100 dark:bg-indigo-900 rounded">
                        <div>8.6</div>
                        <div className="text-xs text-indigo-500 font-bold">(Limit to 2)</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Calculator */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Sig Fig Calculator</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Observe the measurements. Determine which one limits the precision of the result.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-6">
                
                {/* Scenario Label */}
                <div className="px-4 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm font-bold text-slate-500">
                    {current.label}
                </div>

                {/* Input Display */}
                <div className="flex items-center gap-2 sm:gap-4 text-2xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100">
                    <div className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${minSigFigs === current.val1SigFigs ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-transparent'}`}>
                        <span>{current.val1Str}</span>
                        <span className="text-xs sm:text-sm font-normal text-slate-500 mt-1">{current.val1SigFigs} s.f.</span>
                    </div>
                    
                    <div className="text-slate-400">{current.operation}</div>
                    
                    <div className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${minSigFigs === current.val2SigFigs ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-transparent'}`}>
                        <span>{current.val2Str}</span>
                        <span className="text-xs sm:text-sm font-normal text-slate-500 mt-1">{current.val2SigFigs} s.f.</span>
                    </div>
                </div>

                {/* Action Arrow */}
                <div className="text-3xl text-slate-300">⬇️</div>

                {/* Result Area */}
                <div className="w-full max-w-md bg-slate-900 rounded-xl p-6 text-center shadow-inner relative overflow-hidden">
                    
                    <div className="text-xs text-slate-500 uppercase font-bold mb-2">Calculator Output</div>
                    
                    {/* Raw Result */}
                    <div className={`text-3xl font-mono transition-all duration-500 ${showRounded ? 'text-slate-600 blur-[1px] scale-90' : 'text-white scale-100'}`}>
                        {current.rawResult}
                    </div>

                    {/* Rounded Result Overlay */}
                    <AnimatePresence>
                        {showRounded && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 1.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm"
                            >
                                <div className="text-4xl font-bold text-green-400 font-mono">
                                    {roundedResultStr}
                                </div>
                                <div className="mt-2 text-xs text-green-500 font-bold border border-green-500/50 px-2 py-1 rounded">
                                    Rounded to {minSigFigs} s.f.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex gap-4 mt-4">
                    {!showRounded ? (
                        <button 
                            onClick={() => setShowRounded(true)}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg transition-all active:scale-95"
                        >
                            Apply Rule
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
                
                {/* Feedback Message */}
                {showRounded && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-slate-500 text-center max-w-xs"
                    >
                        Restricted by the value with <strong>{minSigFigs}</strong> sig figs.
                    </motion.p>
                )}
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="multiplying-dividing-sig-figs"
      slideTitle="Multiplying and dividing with significant figures"
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