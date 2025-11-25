import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

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

  return (
    <SlideComponentWrapper
      slideId="scaling-unit-vectors"
      slideTitle="Worked example: Scaling unit vectors"
      moduleId="vectors-prerequisite"
      submoduleId="unit-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        <div className="w-full p-4 sm:p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Constructing a Vector</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                How do we create a vector with a specific length <InlineMath>k</InlineMath> in a specific direction?
                <br/>Simple: Take the <strong>unit vector</strong> for that direction and multiply it by <InlineMath>k</InlineMath>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: Graph */}
              <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
                
                {/* Visual Legend */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded text-xs shadow-sm border border-orange-200">
                         <span className="w-8 h-1 bg-orange-500 rounded"></span>
                         <span className="font-bold text-slate-600">Unit Vector (Len = 1)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded text-xs shadow-sm border border-blue-200">
                         <span className="w-8 h-1 bg-blue-600 rounded"></span>
                         <span className="font-bold text-slate-600">Scaled Vector (Len = {targetMag})</span>
                    </div>
                </div>

                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <pattern id="grid-scale" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                      <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                    </pattern>
                    <marker id="head-u-scale" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#F97316" /></marker>
                    <marker id="head-v-scale" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-scale)" className="text-slate-400" />
                  
                  {/* Axes */}
                  <line x1={CENTER} y1="0" x2={CENTER} y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
                  <line x1="0" y1={CENTER} x2="400" y2={CENTER} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

                  <g transform={`translate(${CENTER}, ${CENTER})`}>
                    
                    {/* Unit Circle */}
                    <circle cx="0" cy="0" r={GRID} fill="none" stroke="#F97316" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                    
                    {/* Direction Ray (Guide) */}
                    <line 
                        x1="0" y1="0" 
                        x2={Math.cos(rad) * 200} y2={-Math.sin(rad) * 200} 
                        stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" 
                    />

                    {/* Angle Arc */}
                    <path 
                        d={`M ${GRID/2} 0 A ${GRID/2} ${GRID/2} 0 ${angle > 180 ? 1 : 0} 0 ${Math.cos(rad)*GRID/2} ${-Math.sin(rad)*GRID/2}`}
                        fill="none" stroke="#64748b" strokeWidth="1"
                    />
                    <text x={GRID/2 + 5} y={-5} fontSize="10" fill="#64748b">{angle}°</text>

                    {/* Unit Vector (Orange) */}
                    <line 
                        x1="0" y1="0" 
                        x2={uX * GRID} y2={-uY * GRID} 
                        stroke="#F97316" strokeWidth="4" markerEnd="url(#head-u-scale)" 
                    />

                    {/* Scaled Vector (Blue) */}
                    <motion.line 
                        initial={false}
                        animate={{ x2: vX * GRID, y2: -vY * GRID }}
                        stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-v-scale)" 
                    />

                    {/* Label at tip */}
                    <motion.g animate={{ x: vX * GRID, y: -vY * GRID }}>
                        <text x="10" y="0" dominantBaseline="middle" fill="#3B82F6" fontWeight="bold" fontSize="14">
                            <InlineMath>\vec{v}</InlineMath>
                        </text>
                    </motion.g>

                  </g>
                </svg>

                {/* Angle Dial Control Overlay (Optional Visual) */}
                <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center">
                    <div 
                        className="w-full h-full rounded-full cursor-pointer"
                        style={{ transform: `rotate(${-angle}deg)` }} // Rotate opposite for visual feel
                        // In a real app, adding a circular drag handler here is great UX
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-slate-400 origin-bottom"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="absolute text-xs font-bold text-slate-500 pointer-events-none">{angle}°</div>
                </div>

              </div>

              {/* RIGHT: Controls & Logic */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Inputs */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 border-b pb-2">Set Parameters</h3>
                    
                    {/* Magnitude Slider */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-blue-600">Target Magnitude (<InlineMath>k</InlineMath>)</span>
                            <span className="font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 rounded">{targetMag.toFixed(1)}</span>
                        </div>
                        <input 
                            type="range" min="0.5" max="5.0" step="0.5" value={targetMag}
                            onChange={(e) => setTargetMag(parseFloat(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    {/* Angle Slider */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-600 dark:text-slate-300">Direction (Angle)</span>
                            <span className="font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 rounded">{angle}°</span>
                        </div>
                        <input 
                            type="range" min="0" max="360" step="15" value={angle}
                            onChange={(e) => setAngle(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
                        />
                    </div>
                </div>

                {/* Calculation breakdown */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                    
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase">1. Find Unit Vector (<InlineMath>\hat{u}</InlineMath>)</h4>
                    <div className="font-mono text-sm bg-white dark:bg-slate-800 p-2 rounded border border-orange-200 dark:border-slate-700 text-orange-700 dark:text-orange-300">
                        <BlockMath>{`\\hat{u} = \\langle \\cos(${angle}^\\circ), \\sin(${angle}^\\circ) \\rangle`}</BlockMath>
                        <div className="text-center mt-1 text-xs text-slate-400">
                            ≈ ({uX.toFixed(2)}, {uY.toFixed(2)})
                        </div>
                    </div>

                    <div className="flex justify-center text-slate-400 text-xl">⬇</div>

                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase">2. Scale by <InlineMath>k</InlineMath></h4>
                    <div className="font-mono text-sm bg-white dark:bg-slate-800 p-2 rounded border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-300">
                        <BlockMath>{`\\vec{v} = ${targetMag} \\cdot \\hat{u}`}</BlockMath>
                        <div className="text-center mt-1 pt-1 border-t border-slate-100 dark:border-slate-700 font-bold">
                            = <InlineMath>{`\\langle ${vX.toFixed(2)}, ${vY.toFixed(2)} \\rangle`}</InlineMath>
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