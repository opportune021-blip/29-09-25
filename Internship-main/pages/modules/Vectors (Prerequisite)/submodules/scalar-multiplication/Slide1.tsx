import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function ScalarMultComponentSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State
  const [scalar, setScalar] = useState(2); // The 'k' value
  const [baseVector, setBaseVector] = useState({ x: 2, y: 1 }); // The 'v' vector

  // Grid Config
  const GRID_SCALE = 40; // Pixels per unit
  const CENTER = 200; // SVG Center

  // Calculations
  const scaledVector = {
    x: baseVector.x * scalar,
    y: baseVector.y * scalar
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = {
    id: 'scalar-mult-component-explore',
    conceptId: 'scalar-multiplication-algebra',
    conceptName: 'Scalar Multiplication (Algebra)',
    type: 'learning',
    description: 'Interactive visualization of multiplying a vector components by a scalar.'
  };

  // Helper to determine effect description
  const getEffectDescription = (k: number) => {
    if (k === 1) return "No Change (Identity)";
    if (k === -1) return "Direction Flip Only";
    if (k === 0) return "Zero Vector";
    
    let desc = "";
    if (Math.abs(k) > 1) desc += "Stretches";
    else desc += "Shrinks";
    
    if (k < 0) desc += " & Flips Direction";
    
    return desc;
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & MATH (40%)          */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Scalar Multiplication</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Scaling vectors in component form.
            </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Definition */}
            <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Multiplying a vector by a number (called a <strong>scalar</strong>) distributes that number to every component inside the vector.
                </p>
            </div>

            {/* Algebraic Rule */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <div className="text-xs font-bold uppercase text-slate-400 mb-2">The Algebraic Rule</div>
                <BlockMath>{`k \\cdot \\langle x, y \\rangle = \\langle k \\cdot x, \\; k \\cdot y \\rangle`}</BlockMath>
            </div>

            {/* Step-by-Step Breakdown */}
            <div>
                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-3">Live Calculation</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                     <div className="flex flex-col gap-2 font-mono text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">Input:</span>
                            <span className="text-blue-600 font-bold">{scalar}</span>
                            <span>×</span>
                            <span><InlineMath>{`\\langle ${baseVector.x}, ${baseVector.y} \\rangle`}</InlineMath></span>
                        </div>
                        <div className="h-px bg-blue-200 dark:bg-blue-800 w-full my-1"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">X-Comp:</span>
                            <span>{scalar} × {baseVector.x}</span>
                            <span>=</span>
                            <span className="font-bold">{scaledVector.x}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">Y-Comp:</span>
                            <span>{scalar} × {baseVector.y}</span>
                            <span>=</span>
                            <span className="font-bold">{scaledVector.y}</span>
                        </div>
                        <div className="h-px bg-blue-200 dark:bg-blue-800 w-full my-1"></div>
                        <div className="flex items-center gap-2 text-lg">
                            <span className="text-slate-500">Result:</span>
                            <span className="font-bold text-blue-700 dark:text-blue-300"><InlineMath>{`\\langle ${scaledVector.x}, ${scaledVector.y} \\rangle`}</InlineMath></span>
                        </div>
                     </div>
                </div>
            </div>

            {/* Effects Legend */}
            <div className="space-y-2 text-xs text-slate-500">
                <div className="font-bold uppercase tracking-wide mb-1">Geometric Effects</div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span><strong>|k| &gt; 1</strong>: Stretches the vector</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span><strong>0 &lt; |k| &lt; 1</strong>: Shrinks the vector</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span><strong>k &lt; 0</strong>: Reverses direction</span>
                </div>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: ANIMATION & CONTROLS (60%)  */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
         
         {/* TOP: GRAPH VISUALIZATION */}
         <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[350px]">
            
            {/* Grid */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-scalar" width={GRID_SCALE} height={GRID_SCALE} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID_SCALE} 0 L 0 0 0 ${GRID_SCALE}`} fill="none" stroke="#334155" strokeWidth="1"/>
                </pattern>
                <marker id="arrow-base" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                </marker>
                <marker id="arrow-scaled" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-scalar)" />
              
              {/* Axes */}
              <line x1={CENTER} y1="0" x2={CENTER} y2="400" stroke="#475569" strokeWidth="2" />
              <line x1="0" y1={CENTER} x2="400" y2={CENTER} stroke="#475569" strokeWidth="2" />

              <g transform={`translate(${CENTER}, ${CENTER})`}>
                
                {/* Original Vector (Ghost) */}
                {scalar !== 1 && (
                    <line 
                    x1="0" y1="0" 
                    x2={baseVector.x * GRID_SCALE} 
                    y2={-baseVector.y * GRID_SCALE} 
                    stroke="#64748b" 
                    strokeWidth="4" 
                    strokeOpacity="0.4"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrow-base)" 
                    />
                )}

                {/* Scaled Vector (Animated) */}
                <motion.line 
                  initial={false}
                  animate={{
                    x2: scaledVector.x * GRID_SCALE,
                    y2: -scaledVector.y * GRID_SCALE
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  x1="0" y1="0" 
                  stroke="#3B82F6" 
                  strokeWidth="4" 
                  markerEnd="url(#arrow-scaled)" 
                />

                {/* Label */}
                <motion.text 
                    animate={{
                        x: scaledVector.x * GRID_SCALE,
                        y: -scaledVector.y * GRID_SCALE - 15
                    }}
                    textAnchor="middle" 
                    className="text-sm font-bold fill-white pointer-events-none"
                    style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}
                >
                    {`(${scaledVector.x.toFixed(1)}, ${scaledVector.y.toFixed(1)})`}
                </motion.text>
              </g>
            </svg>

            <div className="absolute top-4 left-4 z-10 bg-slate-800/90 px-3 py-2 rounded-lg border border-slate-700 text-xs shadow-sm">
               <div className="flex items-center gap-2 mb-1">
                   <span className="w-2 h-2 rounded-full bg-slate-500 opacity-50"></span>
                   <span className="text-slate-400">Original</span>
               </div>
               <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                   <span className="font-bold text-blue-400">Scaled</span>
               </div>
            </div>
         </div>

         {/* BOTTOM: CONTROLS */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
             <div className="flex flex-col sm:flex-row gap-8 items-center">
                 
                 <div className="flex-grow w-full">
                     <div className="flex justify-between items-center mb-4">
                         <span className="font-bold text-slate-700 dark:text-slate-200">Scalar Value (<InlineMath>k</InlineMath>)</span>
                         <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-mono font-bold">
                             {scalar}
                         </span>
                     </div>
                     <input 
                         type="range" 
                         min="-3" 
                         max="3" 
                         step="0.5" 
                         value={scalar}
                         onChange={(e) => setScalar(parseFloat(e.target.value))}
                         className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                     />
                     <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                         <span>-3</span>
                         <span>0</span>
                         <span>3</span>
                     </div>
                 </div>

                 <div className="flex-shrink-0 w-full sm:w-auto text-center">
                     <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Effect</div>
                     <div className={`px-4 py-2 rounded-lg border font-bold text-sm min-w-[140px] ${
                        scalar < 0 ? 'bg-orange-50 border-orange-200 text-orange-700' :
                        scalar === 0 ? 'bg-slate-100 border-slate-200 text-slate-500' :
                        scalar === 1 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                        'bg-blue-50 border-blue-200 text-blue-700'
                     }`}>
                         {getEffectDescription(scalar)}
                     </div>
                 </div>

             </div>

             {/* Vector Selectors */}
             <div className="mt-6 flex justify-center gap-3 border-t border-slate-100 dark:border-slate-700 pt-4">
                 <span className="text-xs text-slate-400 self-center mr-2">Try vector:</span>
                 <button 
                     onClick={() => setBaseVector({x: 2, y: 1})}
                     className={`px-3 py-1 text-xs rounded-full border transition-all ${baseVector.x === 2 ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                 >
                     <InlineMath>{`\\langle 2, 1 \\rangle`}</InlineMath>
                 </button>
                 <button 
                     onClick={() => setBaseVector({x: -1, y: 2})}
                     className={`px-3 py-1 text-xs rounded-full border transition-all ${baseVector.x === -1 ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                 >
                     <InlineMath>{`\\langle -1, 2 \\rangle`}</InlineMath>
                 </button>
                 <button 
                     onClick={() => setBaseVector({x: 3, y: 0})}
                     className={`px-3 py-1 text-xs rounded-full border transition-all ${baseVector.x === 3 ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}
                 >
                     <InlineMath>{`\\langle 3, 0 \\rangle`}</InlineMath>
                 </button>
             </div>
         </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="scalar-mult-component"
      slideTitle="Scalar multiplication: component form"
      moduleId="vectors-prerequisite"
      submoduleId="scalar-multiplication"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}