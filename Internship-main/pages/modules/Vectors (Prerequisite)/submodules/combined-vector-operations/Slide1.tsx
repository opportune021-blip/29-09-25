import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function CombinedOpsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Coefficients (scalars) for Linear Combination c1*a + c2*b
  const [c1, setC1] = useState(2);
  const [c2, setC2] = useState(1);
  
  // Base Vectors (Fixed for clarity)
  const vecA = { x: 2, y: 1 };
  const vecB = { x: 1, y: -2 };

  // Config
  const GRID = 30;
  const CENTER_X = 200;
  const CENTER_Y = 250;

  // Calculations
  const scaledA = { x: vecA.x * c1, y: vecA.y * c1 };
  const scaledB = { x: vecB.x * c2, y: vecB.y * c2 };
  
  const result = {
    x: scaledA.x + scaledB.x,
    y: scaledA.y + scaledB.y
  };

  const slideInteraction: Interaction = {
    id: 'linear-combination-explore',
    conceptId: 'linear-combinations',
    conceptName: 'Linear Combinations',
    type: 'learning',
    description: 'Interactive visualization of c1*a + c2*b.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: CONTROLS & THEORY (50%)      */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col gap-6 h-full">
        
        {/* Header & Controls Panel */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex-grow">
            
            {/* Header */}
            <div className="mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Linear Combinations</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                    We can combine scalar multiplication and addition to create any new vector. 
                    The general form is <InlineMath>{"c_1 \\vec{a} + c_2 \\vec{b}"}</InlineMath>.
                </p>
            </div>
            
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm uppercase tracking-wide">Set Coefficients</h3>
            
            {/* C1 Control */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-blue-600 text-sm">Scalar <InlineMath>{"c_1"}</InlineMath> (for <InlineMath>{"\\vec{a}"}</InlineMath>)</span>
                    <span className="font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 rounded text-sm">{c1}</span>
                </div>
                <input 
                    type="range" min="-3" max="3" step="0.5" value={c1}
                    onChange={(e) => setC1(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>

            {/* C2 Control */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-purple-600 text-sm">Scalar <InlineMath>{"c_2"}</InlineMath> (for <InlineMath>{"\\vec{b}"}</InlineMath>)</span>
                    <span className="font-mono bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 rounded text-sm">{c2}</span>
                </div>
                <input 
                    type="range" min="-3" max="3" step="0.5" value={c2}
                    onChange={(e) => setC2(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
            </div>
        </div>

        {/* Math Calculation Panel */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-center font-mono text-lg mb-4 text-slate-800 dark:text-slate-200">
                <InlineMath>{`${c1}\\vec{a} + ${c2 > 0 ? '+' : ''}${c2}\\vec{b} = \\vec{R}`}</InlineMath>
            </div>
            
            <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-slate-500">x-comp:</span>
                    <span className="text-slate-700 dark:text-slate-300">{c1}({vecA.x}) + {c2}({vecB.x}) = <strong className="text-emerald-600 dark:text-emerald-400">{result.x}</strong></span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">y-comp:</span>
                    <span className="text-slate-700 dark:text-slate-300">{c1}({vecA.y}) + {c2}({vecB.y}) = <strong className="text-emerald-600 dark:text-emerald-400">{result.y}</strong></span>
                </div>
            </div>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-4 gap-2">
            <button onClick={() => { setC1(1); setC2(1); }} className="px-2 py-2 text-[10px] sm:text-xs font-bold bg-white dark:bg-slate-700 border dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded transition-colors text-slate-600 dark:text-slate-200 truncate">
                Sum (1,1)
            </button>
            <button onClick={() => { setC1(1); setC2(-1); }} className="px-2 py-2 text-[10px] sm:text-xs font-bold bg-white dark:bg-slate-700 border dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded transition-colors text-slate-600 dark:text-slate-200 truncate">
                Sub (1,-1)
            </button>
            <button onClick={() => { setC1(2); setC2(1); }} className="px-2 py-2 text-[10px] sm:text-xs font-bold bg-white dark:bg-slate-700 border dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded transition-colors text-slate-600 dark:text-slate-200 truncate">
                Mixed (2,1)
            </button>
            <button onClick={() => { setC1(0); setC2(0); }} className="px-2 py-2 text-[10px] sm:text-xs font-bold bg-white dark:bg-slate-700 border dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded transition-colors text-slate-600 dark:text-slate-200 truncate">
                Zero (0,0)
            </button>
        </div>

      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: ANIMATION/GRAPH (50%)       */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden relative min-h-[400px]">
        
        {/* Legend Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
            <div className="text-xs bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-slate-500 dark:text-slate-400 shadow-sm border border-slate-200 dark:border-slate-700">
                <span className="text-blue-600 dark:text-blue-400 font-bold">Blue:</span> <InlineMath>{"c_1 \\vec{a}"}</InlineMath>
            </div>
            <div className="text-xs bg-white/90 dark:bg-slate-900/90 px-2 py-1 rounded text-slate-500 dark:text-slate-400 shadow-sm border border-slate-200 dark:border-slate-700">
                <span className="text-purple-600 dark:text-purple-400 font-bold">Purple:</span> <InlineMath>{"c_2 \\vec{b}"}</InlineMath>
            </div>
        </div>

        {/* The Graph */}
        <div className="flex-grow bg-slate-50 dark:bg-slate-950 relative overflow-hidden select-none shadow-inner flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 500 500">
                <defs>
                <pattern id="grid-comb" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                    <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="head-a-c" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6" /></marker>
                <marker id="head-b-c" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#A855F7" /></marker>
                <marker id="head-res-c" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-comb)" className="text-slate-400 dark:text-slate-600" />
                
                {/* Axes */}
                <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="500" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-600" />
                <line x1="0" y1={CENTER_Y} x2="500" y2={CENTER_Y} stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-600" />

                <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {/* Ghost Base Vectors (Unit scaling) */}
                <line x1="0" y1="0" x2={vecA.x * GRID} y2={-vecA.y * GRID} stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="4,4" markerEnd="url(#head-a-c)" />
                <line x1="0" y1="0" x2={vecB.x * GRID} y2={-vecB.y * GRID} stroke="#A855F7" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="4,4" markerEnd="url(#head-b-c)" />

                {/* Scaled Component A */}
                {c1 !== 0 && (
                    <motion.line 
                        initial={false}
                        animate={{ x2: scaledA.x * GRID, y2: -scaledA.y * GRID }}
                        stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-a-c)" 
                    />
                )}
                
                {/* Scaled Component B (Placed at head of A for Tip-to-Tail) */}
                {c2 !== 0 && (
                    <motion.line 
                        initial={false}
                        animate={{ 
                            x1: scaledA.x * GRID, 
                            y1: -scaledA.y * GRID,
                            x2: (scaledA.x + scaledB.x) * GRID, 
                            y2: -(scaledA.y + scaledB.y) * GRID 
                        }}
                        stroke="#A855F7" strokeWidth="4" markerEnd="url(#head-b-c)" 
                    />
                )}

                {/* Resultant */}
                <motion.line 
                    initial={false}
                    animate={{ x2: result.x * GRID, y2: -result.y * GRID }}
                    stroke="#10B981" strokeWidth="5" markerEnd="url(#head-res-c)" 
                />

                {/* Labels */}
                <motion.text 
                    animate={{ x: scaledA.x * GRID / 2, y: -scaledA.y * GRID / 2 - 10 }} 
                    fill="#3B82F6" fontWeight="bold" fontSize="12"
                >
                    {c1}a
                </motion.text>
                    <motion.text 
                    animate={{ x: scaledA.x * GRID + scaledB.x * GRID / 2, y: -scaledA.y * GRID - scaledB.y * GRID / 2 - 10 }} 
                    fill="#A855F7" fontWeight="bold" fontSize="12"
                >
                    {c2}b
                </motion.text>

                </g>
            </svg>
        </div>
      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="combined-ops"
      slideTitle="Combined vector operations"
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