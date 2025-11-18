import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

interface RuleExample {
  id: string;
  numberStr: string;
  sigFigCount: number;
  ruleTitle: string;
  explanation: string;
  // Maps indices of the string to their status: 'sig' (significant), 'insig' (insignificant), 'neutral' (decimal point)
  digitStatus: ('sig' | 'insig' | 'neutral')[]; 
}

// Pre-defined examples covering all rules
const rulesData: RuleExample[] = [
  {
    id: 'non-zero',
    numberStr: "4892",
    sigFigCount: 4,
    ruleTitle: "1. Non-Zero Digits",
    explanation: "All non-zero digits are ALWAYS significant.",
    digitStatus: ['sig', 'sig', 'sig', 'sig']
  },
  {
    id: 'captive',
    numberStr: "5007",
    sigFigCount: 4,
    ruleTitle: "2. Captive Zeros",
    explanation: "Zeros between two non-zero digits are significant. They are 'trapped'.",
    digitStatus: ['sig', 'sig', 'sig', 'sig']
  },
  {
    id: 'leading',
    numberStr: "0.0052",
    sigFigCount: 2,
    ruleTitle: "3. Leading Zeros",
    explanation: "Zeros to the left of the first non-zero digit are NEVER significant. They just locate the decimal point.",
    digitStatus: ['insig', 'neutral', 'insig', 'insig', 'sig', 'sig']
  },
  {
    id: 'trailing-decimal',
    numberStr: "2.400",
    sigFigCount: 4,
    ruleTitle: "4. Trailing (with Decimal)",
    explanation: "Trailing zeros are significant IF the number contains a decimal point. They indicate precision.",
    digitStatus: ['sig', 'neutral', 'sig', 'sig', 'sig']
  },
  {
    id: 'trailing-no-decimal',
    numberStr: "3500",
    sigFigCount: 2,
    ruleTitle: "5. Trailing (No Decimal)",
    explanation: "Trailing zeros without a decimal point are generally NOT significant.",
    digitStatus: ['sig', 'sig', 'insig', 'insig']
  }
];

export default function RulesOfSigFigsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedRuleIndex, setSelectedRuleIndex] = useState(0);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'sig-figs-rules', 
      conceptId: 'sig-figs-rules-breakdown', 
      conceptName: 'Rules of Significant Figures', 
      type: 'learning', 
      description: 'Exploring the specific rules for zeros in significant figures.' 
    }
  ];

  const currentRule = rulesData[selectedRuleIndex];

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: The Rule Selector */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Rules of the Game 📜</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The only tricky part is the <strong>Zero</strong>. Does it count? Click a rule to investigate.
          </p>
          
          <div className="space-y-3 flex-grow">
            {rulesData.map((rule, index) => (
                <button
                    key={rule.id}
                    onClick={() => setSelectedRuleIndex(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all border-l-4 flex justify-between items-center
                        ${selectedRuleIndex === index 
                            ? 'bg-blue-50 border-blue-500 shadow-md dark:bg-blue-900/30 dark:border-blue-400' 
                            : 'bg-slate-50 border-transparent hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700'
                        }`}
                >
                    <div>
                        <span className={`font-bold block ${selectedRuleIndex === index ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'}`}>
                            {rule.ruleTitle}
                        </span>
                    </div>
                    {selectedRuleIndex === index && (
                        <motion.span layoutId="arrow" className="text-blue-500">👉</motion.span>
                    )}
                </button>
            ))}
          </div>
        </div>
        
        {/* Right Panel: The Analyzer */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Sig Fig Analyzer</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
                Green digits are significant. Grey/Red digits are placeholders.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* The Number Display */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentRule.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-baseline gap-1 bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-inner"
                    >
                        {currentRule.numberStr.split('').map((char, i) => {
                            const status = currentRule.digitStatus[i];
                            let colorClass = "text-slate-800 dark:text-slate-200";
                            let bgClass = "bg-transparent";
                            let label = null;

                            if (status === 'sig') {
                                colorClass = "text-green-600 dark:text-green-400 font-bold";
                                bgClass = "bg-green-100 dark:bg-green-900/30";
                                label = "Count";
                            } else if (status === 'insig') {
                                colorClass = "text-red-400 dark:text-red-500 opacity-50";
                                label = "Don't Count";
                            } else {
                                // Decimal point
                                colorClass = "text-slate-400";
                            }

                            return (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <span className={`text-5xl sm:text-7xl font-mono rounded px-1 transition-colors ${colorClass} ${bgClass}`}>
                                        {char}
                                    </span>
                                    {status !== 'neutral' && (
                                        <motion.span 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                            className={`text-[10px] uppercase font-bold tracking-wider ${status === 'sig' ? 'text-green-600' : 'text-red-400'}`}
                                        >
                                            {status === 'sig' ? '✔' : '✘'}
                                        </motion.span>
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* Explanation Card */}
                <div className="w-full bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                    <div className="text-sm font-bold text-slate-500 uppercase mb-2">Total Sig Figs:</div>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                        {currentRule.sigFigCount}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                        {currentRule.explanation}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="rules-of-sig-figs"
      slideTitle="Rules of significant figures"
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