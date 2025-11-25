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
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Scalar Multiplication (Component Form)</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Multiplying a vector by a number (called a <strong>scalar</strong>) scales each component by that number.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Graph Visualization */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
            
            <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-slate-800/90 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-slate-400 opacity-50"></span>
                    <span className="text-slate-500">Original <InlineMath>{`\\vec{v}`}</InlineMath></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">Result <InlineMath>{`k\\vec{v}`}</InlineMath></span>
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-scalar" width={GRID_SCALE} height={GRID_SCALE} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID_SCALE} 0 L 0 0 0 ${GRID_SCALE}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="arrow-base" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
                <marker id="arrow-scaled" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#2563EB" />
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-scalar)" className="text-slate-400" />
              
              {/* Axes */}
              <line x1={CENTER} y1="0" x2={CENTER} y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              <line x1="0" y1={CENTER} x2="400" y2={CENTER} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

              <g transform={`translate(${CENTER}, ${CENTER})`}>
                
                {/* Original Vector (Ghost) - Only show if scalar is different */}
                {scalar !== 1 && (
                    <line 
                    x1="0" y1="0" 
                    x2={baseVector.x * GRID_SCALE} 
                    y2={-baseVector.y * GRID_SCALE} 
                    stroke="#94a3b8" 
                    strokeWidth="4" 
                    strokeOpacity="0.5"
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
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  x1="0" y1="0" 
                  stroke="#2563EB" 
                  strokeWidth="4" 
                  markerEnd="url(#arrow-scaled)" 
                />

                {/* Label for Result */}
                <motion.text 
                    animate={{
                        x: scaledVector.x * GRID_SCALE,
                        y: -scaledVector.y * GRID_SCALE - 15
                    }}
                    textAnchor="middle" 
                    className="text-sm font-bold fill-blue-600 dark:fill-blue-400 pointer-events-none"
                    style={{ textShadow: '0px 0px 4px rgba(255,255,255,0.8)' }}
                >
                    {`(${scaledVector.x.toFixed(1)}, ${scaledVector.y.toFixed(1)})`}
                </motion.text>
              </g>
            </svg>
          </div>

          {/* RIGHT: Controls & Math */}
          <div className="flex flex-col h-full gap-6">
            
            {/* Controls */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <label className="block mb-4">
                    <div className="flex justify-between items-center mb-2">
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
                </label>

                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700 text-center">
                    <span className="text-sm font-bold text-slate-500 uppercase">Effect</span>
                    <div className="font-bold text-slate-800 dark:text-slate-100 mt-1">
                        {getEffectDescription(scalar)}
                    </div>
                </div>
            </div>

            {/* Algebraic Logic */}
            <div className="flex-grow bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Algebraic Rule</h3>
                
                <div className="space-y-6">
                    <BlockMath>{`k \\cdot \\langle x, y \\rangle = \\langle k \\cdot x, k \\cdot y \\rangle`}</BlockMath>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-blue-200 dark:border-blue-900 shadow-sm">
                        <div className="text-xs text-slate-400 uppercase font-bold mb-2">Calculation</div>
                        <div className="flex items-center justify-center gap-2 text-lg md:text-xl">
                            <span className="font-bold text-blue-600">{scalar}</span>
                            <span>•</span>
                            <span className="font-mono text-slate-600 dark:text-slate-300">
                                <InlineMath>{`\\langle ${baseVector.x}, ${baseVector.y} \\rangle`}</InlineMath>
                            </span>
                            <span>=</span>
                            <span className="font-mono font-bold text-slate-800 dark:text-white">
                                <InlineMath>{`\\langle ${scaledVector.x}, ${scaledVector.y} \\rangle`}</InlineMath>
                            </span>
                        </div>
                        <div className="mt-2 text-center text-sm text-slate-500">
                            ( <span className="text-blue-500">{scalar}</span> × {baseVector.x} , <span className="text-blue-500">{scalar}</span> × {baseVector.y} )
                        </div>
                    </div>
                </div>
            </div>

            {/* Base Vector Toggle (Optional, usually fixed for clarity, but giving user choice is nice) */}
            <div className="flex justify-center gap-2">
                <button 
                    onClick={() => setBaseVector({x: 2, y: 1})}
                    className={`px-3 py-1 text-xs rounded-full border ${baseVector.x === 2 ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}
                >
                    Vector A (2, 1)
                </button>
                <button 
                    onClick={() => setBaseVector({x: -1, y: 2})}
                    className={`px-3 py-1 text-xs rounded-full border ${baseVector.x === -1 ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}
                >
                    Vector B (-1, 2)
                </button>
            </div>

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