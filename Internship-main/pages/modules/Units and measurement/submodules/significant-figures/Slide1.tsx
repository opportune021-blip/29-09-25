import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function IntroToSigFigsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Which ruler are we using?
  // 'low' = 1cm markings (Low Precision)
  // 'high' = 1mm markings (High Precision)
  const [precision, setPrecision] = useState<'low' | 'high'>('low');

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'sig-figs-concept', 
      conceptId: 'sig-figs-definition', 
      conceptName: 'Concept of Significant Figures', 
      type: 'learning', 
      description: 'Understanding that significant figures represent reliable digits plus one uncertain digit.' 
    }
  ];

  // The "True" length of the object (hidden from student initially) is 4.75 cm
  // Low Precision Ruler: Marks at 4, 5. It looks like 4.7 or 4.8. We estimate 4.8.
  // High Precision Ruler: Marks at 4.7, 4.8. It looks like 4.75. We estimate 4.75.

  const reportedValue = precision === 'low' ? "4.8" : "4.75";
  const sigFigsCount = precision === 'low' ? 2 : 3;

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The "Honest" Measurement 📏</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              In math, <InlineMath>4.0</InlineMath> and <InlineMath>4.00</InlineMath> are the same. In science, they are completely different!
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Definition</h4>
              <p>
                The <strong>Significant Figures</strong> (or "sig figs") in a measured quantity include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>All digits that are known reliably.</li>
                  <li>Plus <strong>the first uncertain digit</strong> (estimated).</li>
              </ul>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Why does this matter?</h4>
                <p>
                    It tells other scientists how precise your measuring tool was. You cannot report a number more precise than your tool allows.
                </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The Precision Experiment</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Switch between the "Cheap Ruler" and the "Pro Ruler" to see how the reported number changes.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* Visualization: The Measurement */}
                <div className="relative w-full h-40 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden px-4">
                    
                    {/* The Object (Blue Bar) - Fixed physical width */}
                    <div className="absolute top-12 left-4 h-8 bg-blue-500 rounded-sm shadow-md z-10" style={{ width: '47.5%' }}></div>
                    <div className="absolute top-12 left-4 h-8 w-px bg-black/20 z-20"></div> {/* Zero line */}
                    
                    {/* The Ruler SVG */}
                    <div className="absolute top-20 left-4 w-full h-12 z-0">
                        <svg width="100%" height="100%" className="overflow-visible">
                            {/* Ruler Base Line */}
                            <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" className="text-slate-400" strokeWidth="2" />
                            
                            {/* Render Ticks based on Precision */}
                            {Array.from({ length: 11 }).map((_, i) => {
                                const xPos = `${i * 10}%`;
                                return (
                                    <g key={i}>
                                        {/* Major Ticks (cm) - Always visible */}
                                        <line x1={xPos} y1="0" x2={xPos} y2="15" stroke="currentColor" className="text-slate-600 dark:text-slate-300" strokeWidth="2" />
                                        <text x={xPos} y="30" textAnchor="middle" className="text-xs fill-slate-500 font-bold">{i}</text>
                                        
                                        {/* Minor Ticks (mm) - Only visible in HIGH precision */}
                                        {precision === 'high' && i < 10 && Array.from({ length: 9 }).map((__, j) => (
                                            <line 
                                                key={j} 
                                                x1={`${(i * 10) + (j + 1)}%`} 
                                                y1="0" 
                                                x2={`${(i * 10) + (j + 1)}%`} 
                                                y2="8" 
                                                stroke="currentColor" 
                                                className="text-slate-400" 
                                                strokeWidth="1" 
                                            />
                                        ))}
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Magnifying Glass Effect over the end */}
                    <motion.div 
                        className="absolute top-6 left-[45%] w-24 h-24 rounded-full border-4 border-slate-400 bg-white/10 backdrop-blur-sm shadow-xl flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="text-[10px] font-mono bg-white dark:bg-black px-1 rounded text-slate-500 -mt-16">Zoom</div>
                    </motion.div>
                </div>

                {/* Reported Value Card */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={precision}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-xl text-center border border-slate-200 dark:border-slate-600 w-full max-w-md"
                    >
                        <div className="text-sm text-slate-500 uppercase font-bold mb-2">
                            {precision === 'low' ? 'Low Precision Ruler (cm)' : 'High Precision Ruler (mm)'}
                        </div>
                        
                        <div className="text-5xl font-mono font-bold text-slate-800 dark:text-slate-100 flex justify-center gap-1">
                            {/* Render digits with the last one highlighted */}
                            {reportedValue.slice(0, -1)}
                            <span className="text-red-500 relative group cursor-help">
                                {reportedValue.slice(-1)}
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                                    Uncertain Digit (Estimated)
                                </span>
                            </span>
                            <span className="text-2xl text-slate-400 self-end mb-2 ml-2">cm</span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 flex justify-between items-center px-4">
                            <span className="text-slate-500 text-sm">Significant Figures:</span>
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sigFigsCount}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Toggle Control */}
                <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-lg">
                    <button
                        onClick={() => setPrecision('low')}
                        className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${precision === 'low' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Cheap Ruler (1cm)
                    </button>
                    <button
                        onClick={() => setPrecision('high')}
                        className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${precision === 'high' ? 'bg-white dark:bg-slate-600 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Pro Ruler (1mm)
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="intro-to-sig-figs"
      slideTitle="Intro to significant figures"
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