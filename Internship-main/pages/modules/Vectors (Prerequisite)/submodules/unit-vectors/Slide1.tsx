import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function UnitVectorsIntroSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Coefficients for i-hat and j-hat
  const [xVal, setXVal] = useState(3);
  const [yVal, setYVal] = useState(2);

  // Config
  const GRID = 40; // Pixels per unit
  const CENTER_X = 100;
  const CENTER_Y = 300;

  const slideInteraction: Interaction = {
    id: 'unit-vectors-intro-explore',
    conceptId: 'unit-vectors-basis',
    conceptName: 'Standard Basis Vectors',
    type: 'learning',
    description: 'Visualizing vectors as combinations of i-hat and j-hat.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  return (
    <SlideComponentWrapper
      slideId="unit-vectors-intro"
      slideTitle="Unit vectors intro"
      moduleId="vectors-prerequisite"
      submoduleId="unit-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        <div className="w-full p-4 sm:p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">The Building Blocks: <InlineMath>{"\\hat{i}"}</InlineMath> and <InlineMath>{"\\hat{j}"}</InlineMath></h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                A <strong>unit vector</strong> has a magnitude of exactly 1. We use special unit vectors to describe direction in the x and y axes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: Graph */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
                
                {/* Definition Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                    <div className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 text-orange-600 font-bold mb-1">
                            <span className="text-lg"><InlineMath>{"\\hat{i}"}</InlineMath></span>
                            <span className="text-xs uppercase text-slate-500">"i-hat"</span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                            Points Right (x-axis)<br/>
                            Length = 1
                        </div>
                    </div>
                    <div className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold mb-1">
                            <span className="text-lg"><InlineMath>{"\\hat{j}"}</InlineMath></span>
                            <span className="text-xs uppercase text-slate-500">"j-hat"</span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                            Points Up (y-axis)<br/>
                            Length = 1
                        </div>
                    </div>
                </div>

                <svg className="w-full h-full" viewBox="0 0 500 400">
                  <defs>
                    <pattern id="grid-unit" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                      <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                    </pattern>
                    <marker id="head-i" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#F97316" /></marker>
                    <marker id="head-j" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#10B981" /></marker>
                    <marker id="head-res-u" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-unit)" className="text-slate-400" />
                  
                  {/* Axes */}
                  <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
                  <line x1="0" y1={CENTER_Y} x2="500" y2={CENTER_Y} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

                  <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                    
                    {/* The Unit Vectors (Fixed at origin, usually hidden if scaled versions cover them, but let's show them ghosted) */}
                    <line x1="0" y1="0" x2={GRID} y2="0" stroke="#F97316" strokeWidth="6" opacity="0.2" markerEnd="url(#head-i)" />
                    <line x1="0" y1="0" x2="0" y2={-GRID} stroke="#10B981" strokeWidth="6" opacity="0.2" markerEnd="url(#head-j)" />

                    {/* Scaled Component Vectors */}
                    <motion.line 
                        animate={{ x2: xVal * GRID }} 
                        y2="0" x1="0" y1="0"
                        stroke="#F97316" strokeWidth="3" markerEnd="url(#head-i)"
                    />
                    <motion.line 
                        animate={{ x1: xVal * GRID, x2: xVal * GRID, y2: -yVal * GRID }} 
                        y1="0"
                        stroke="#10B981" strokeWidth="3" markerEnd="url(#head-j)"
                        strokeDasharray="4,4" // Visual style to show it's a component
                    />
                    
                    {/* Resultant Vector */}
                    <motion.line 
                        animate={{ x2: xVal * GRID, y2: -yVal * GRID }} 
                        x1="0" y1="0"
                        stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-res-u)"
                    />

                    {/* Labels */}
                    <motion.text 
                        animate={{ x: (xVal * GRID) / 2, y: 20 }} 
                        textAnchor="middle" fill="#F97316" fontWeight="bold" fontSize="14"
                    >
                        {xVal}<InlineMath>{"\\hat{i}"}</InlineMath>
                    </motion.text>

                     <motion.text 
                        animate={{ x: xVal * GRID + 20, y: -(yVal * GRID) / 2 }} 
                        dominantBaseline="middle" fill="#10B981" fontWeight="bold" fontSize="14"
                    >
                        {yVal}<InlineMath>{"\\hat{j}"}</InlineMath>
                    </motion.text>

                  </g>
                </svg>
              </div>

              {/* RIGHT: Controls & Explanation */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Definition Box */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 border-b pb-2">Unit Vector Notation</h3>
                    
                    <div className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg flex flex-col gap-2">
                             <div className="flex items-center gap-2">
                                <span className="text-orange-600 font-bold"><InlineMath>{"\\hat{i} = \\langle 1, 0 \\rangle"}</InlineMath></span>
                                <span className="text-sm text-slate-500">Unit vector in x-direction</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <span className="text-emerald-600 font-bold"><InlineMath>{"\\hat{j} = \\langle 0, 1 \\rangle"}</InlineMath></span>
                                <span className="text-sm text-slate-500">Unit vector in y-direction</span>
                             </div>
                        </div>

                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            Any vector <InlineMath>{"\\vec{v} = \\langle x, y \\rangle"}</InlineMath> can be written as:
                            <div className="my-2 text-center text-lg font-bold text-slate-800 dark:text-white">
                                <InlineMath>{"\\vec{v} = x\\hat{i} + y\\hat{j}"}</InlineMath>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Controls */}
                <div className="bg-slate-50 dark:bg-slate-900/30 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 text-sm uppercase tracking-wide">Construct a Vector</h4>
                    
                    {/* X Control */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-orange-600"><InlineMath>{"x"}</InlineMath> component</span>
                            <span className="font-mono bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 rounded">{xVal}</span>
                        </div>
                        <input 
                            type="range" min="-5" max="8" step="1" value={xVal}
                            onChange={(e) => setXVal(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                        />
                    </div>

                    {/* Y Control */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-emerald-600"><InlineMath>{"y"}</InlineMath> component</span>
                            <span className="font-mono bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-2 rounded">{yVal}</span>
                        </div>
                        <input 
                            type="range" min="-4" max="6" step="1" value={yVal}
                            onChange={(e) => setYVal(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                    </div>

                    <div className="mt-6 p-4 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900 rounded-lg shadow-sm text-center">
                        <span className="text-xs text-slate-400 uppercase font-bold">Result</span>
                        <div className="text-xl font-mono text-blue-600 font-bold mt-1">
                            <InlineMath>{`\\vec{v} = ${xVal}\\hat{i} ${yVal >= 0 ? '+' : ''} ${yVal}\\hat{j}`}</InlineMath>
                        </div>
                    </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}