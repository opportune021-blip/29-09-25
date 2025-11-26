import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toRad = (deg: number) => (deg * Math.PI) / 180;

export default function ScalingUnitVectorsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State
  const [angle, setAngle] = useState(60); // Direction in degrees
  const [targetMag, setTargetMag] = useState(5); // Desired length 'k'

  // Config
  const GRID = 40; 
  const CENTER = 200;

  // Calculations
  const rad = toRad(angle);
  
  // 1. Find Unit Vector (Direction)
  const uX = Math.cos(rad);
  const uY = Math.sin(rad);
  
  // 2. Scale to Target (Result)
  const vX = targetMag * uX;
  const vY = targetMag * uY;

  const slideInteraction: Interaction = {
    id: 'scaling-unit-vector-explore',
    conceptId: 'scaling-unit-vectors',
    conceptName: 'Scaling Unit Vectors',
    type: 'learning',
    description: 'Creating a vector with specific magnitude and direction.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & STEPS (40%)         */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Constructing a Vector</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                How do we create a vector with a specific length <InlineMath>{"k"}</InlineMath> in a specific direction?
                <br/>
                <span className="text-blue-600 dark:text-blue-400 font-bold">Simple:</span> Take the unit vector for that direction and multiply it by <InlineMath>{"k"}</InlineMath>.
            </p>
        </div>

        {/* Scrollable Steps */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Step 1 */}
            <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">1. Find Unit Vector (<InlineMath>{"\\hat{u}"}</InlineMath>) </h3>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        Use sine and cosine to find the coordinates of length 1 at <InlineMath>{`${angle}^\\circ`}</InlineMath>.
                    </p>
                    <div className="font-mono text-sm text-orange-600 dark:text-orange-400 bg-white dark:bg-slate-800 p-2 rounded border border-orange-100 dark:border-slate-700 text-center">
                        <BlockMath>{`\\hat{u} = \\langle \\cos(${angle}^\\circ), \\sin(${angle}^\\circ) \\rangle`}</BlockMath>
                        <div className="mt-1 font-bold text-slate-800 dark:text-slate-200">
                            ≈ <InlineMath>{`\\langle ${uX.toFixed(2)}, ${uY.toFixed(2)} \\rangle`}</InlineMath>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center text-slate-300 dark:text-slate-600">
                ⬇
            </div>

            {/* Step 2 */}
            <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">2. Scale by <InlineMath>{"k"}</InlineMath></h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        Multiply the unit vector by the target magnitude <strong>{targetMag}</strong>.
                    </p>
                    <div className="font-mono text-sm text-blue-600 dark:text-blue-300 bg-white dark:bg-slate-800 p-2 rounded border border-blue-100 dark:border-slate-700 text-center">
                        <BlockMath>{`\\vec{v} = ${targetMag} \\cdot \\hat{u}`}</BlockMath>
                        <div className="mt-1 font-bold text-slate-800 dark:text-slate-200">
                            = <InlineMath>{`\\langle ${vX.toFixed(2)}, ${vY.toFixed(2)} \\rangle`}</InlineMath>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: VISUALS & CONTROLS (60%)    */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* TOP RIGHT: GRAPH */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[350px]">
            
            {/* Legend */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded text-xs shadow-sm border border-orange-500/30">
                     <span className="w-6 h-1 bg-orange-500 rounded"></span>
                     <span className="font-bold text-orange-100">Unit Vector (Len = 1)</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded text-xs shadow-sm border border-blue-500/30">
                     <span className="w-6 h-1 bg-blue-500 rounded"></span>
                     <span className="font-bold text-blue-100">Scaled Vector (Len = {targetMag})</span>
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-scale" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeWidth="1"/>
                </pattern>
                <marker id="head-u-scale" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#F97316" /></marker>
                <marker id="head-v-scale" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-scale)" />
              
              {/* Axes */}
              <line x1={CENTER} y1="0" x2={CENTER} y2="400" stroke="#64748b" strokeWidth="2" />
              <line x1="0" y1={CENTER} x2="400" y2={CENTER} stroke="#64748b" strokeWidth="2" />

              <g transform={`translate(${CENTER}, ${CENTER})`}>
                
                {/* Unit Circle Guide */}
                <circle cx="0" cy="0" r={GRID} fill="none" stroke="#F97316" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
                
                {/* Angle Arc */}
                <path 
                    d={`M ${GRID/2} 0 A ${GRID/2} ${GRID/2} 0 ${angle > 180 ? 1 : 0} 0 ${Math.cos(rad)*GRID/2} ${-Math.sin(rad)*GRID/2}`}
                    fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.5"
                />
                <text x={GRID/2 + 5} y={-5} fontSize="10" fill="#94a3b8">{angle}°</text>

                {/* Unit Vector (Orange) */}
                <line 
                    x1="0" y1="0" 
                    x2={uX * GRID} y2={-uY * GRID} 
                    stroke="#F97316" strokeWidth="4" markerEnd="url(#head-u-scale)" 
                />

                {/* Scaled Vector (Blue - Animated) */}
                <motion.line 
                    animate={{ x2: vX * GRID, y2: -vY * GRID }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    x1="0" y1="0" 
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-v-scale)" 
                />

                {/* Tip Label */}
                <motion.g animate={{ x: vX * GRID, y: -vY * GRID }}>
                    <text x="15" y="5" fill="#3B82F6" fontWeight="bold" fontSize="14" style={{ textShadow: '0 2px 4px black' }}>
                        <InlineMath>{"\\vec{v}"}</InlineMath>
                    </text>
                </motion.g>

              </g>
            </svg>

            {/* Angle Control (Visual) */}
            <div className="absolute bottom-4 right-4 w-20 h-20 bg-slate-800/50 rounded-full border border-slate-600 flex items-center justify-center pointer-events-none">
                <div 
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ transform: `rotate(${-angle}deg)` }}
                >
                    <div className="w-[1px] h-1/2 bg-blue-500 origin-bottom translate-y-[-50%]"></div>
                </div>
                <div className="absolute text-[10px] font-mono text-slate-400">{angle}°</div>
            </div>

        </div>

        {/* BOTTOM RIGHT: CONTROLS */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm uppercase tracking-wide">Set Parameters</h3>
            
            <div className="space-y-6">
                {/* Magnitude Slider */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-blue-600 text-sm">Target Magnitude (<InlineMath>{"k"}</InlineMath>)</span>
                        <span className="font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 rounded text-sm">{targetMag.toFixed(1)}</span>
                    </div>
                    <input 
                        type="range" min="0.5" max="5.0" step="0.5" value={targetMag}
                        onChange={(e) => setTargetMag(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                {/* Direction Slider */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-600 dark:text-slate-300 text-sm">Direction (Angle)</span>
                        <span className="font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 rounded text-sm">{angle}°</span>
                    </div>
                    <input 
                        type="range" min="0" max="360" step="15" value={angle}
                        onChange={(e) => setAngle(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
                    />
                </div>
            </div>
        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="scaling-unit-vectors"
      slideTitle="Worked example: Scaling unit vectors"
      moduleId="vectors-prerequisite"
      submoduleId="unit-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}