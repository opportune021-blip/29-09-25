import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function ScalarMultGeometrySlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State
  const [scalar, setScalar] = useState(2); // 'k'
  const [baseMag, setBaseMag] = useState(3); // Base length units
  const [baseAngle, setBaseAngle] = useState(45); // Degrees

  // Config
  const SCALE_PX = 30; // Pixels per unit
  const CENTER = 200;

  // Derived Values
  const kMag = Math.abs(scalar);
  const newMag = baseMag * kMag;
  const isFlipped = scalar < 0;
  
  // Coordinate Calculation for SVG
  const angleRad = (baseAngle * Math.PI) / 180;
  
  // Base Vector Tip
  const baseX = baseMag * Math.cos(angleRad);
  const baseY = baseMag * Math.sin(angleRad);
  
  // Result Vector Tip (Scalar applied)
  const resultX = scalar * baseX; 
  const resultY = scalar * baseY;

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = {
    id: 'scalar-mult-mag-dir-explore',
    conceptId: 'scalar-mult-geometry',
    conceptName: 'Scalar Multiplication (Geometry)',
    type: 'learning',
    description: 'Visualizing how scalars scale magnitude and flip direction.'
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & RULES (40%)         */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Geometric Effect</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Scaling length and reversing direction.
            </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Core Concept */}
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                    Geometrically, multiplying a vector by a scalar <InlineMath>k</InlineMath> stretches or shrinks it. 
                    Think of it like resizing an image while keeping the aspect ratio.
                </p>
            </div>

            {/* Rule 1: Magnitude */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 flex items-center justify-center text-xs font-bold">1</div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Magnitude Rule</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 ml-9">
                    The new length is the absolute value of the scalar times the original length.
                </p>
                <div className="ml-9 bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs">
                    <BlockMath>{`|k\\vec{v}| = |k| \\cdot |\\vec{v}|`}</BlockMath>
                </div>
            </div>

            {/* Rule 2: Direction */}
            <div className={`p-4 rounded-lg border transition-colors ${isFlipped ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${isFlipped ? 'bg-red-500' : 'bg-green-500'}`}>2</div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Direction Rule</h3>
                </div>
                <ul className="text-sm ml-9 space-y-2">
                    <li className={`flex items-center gap-2 ${!isFlipped ? 'font-bold text-green-700 dark:text-green-400' : 'text-slate-500'}`}>
                        <span>➜</span>
                        <span>If <InlineMath>{`k > 0`}</InlineMath>: Direction stays the same.</span>
                    </li>
                    <li className={`flex items-center gap-2 ${isFlipped ? 'font-bold text-red-700 dark:text-red-400' : 'text-slate-500'}`}>
                        <span>↺</span>
                        <span>If <InlineMath>{`k < 0`}</InlineMath>: Direction reverses (flips 180°).</span>
                    </li>
                </ul>
            </div>

            {/* Live Calc Breakdown */}
            <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                 <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Current State</h4>
                 <div className="flex justify-between items-center text-sm font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded">
                    <span><InlineMath>{`|${scalar}| \\cdot ${baseMag}`}</InlineMath></span>
                    <span>=</span>
                    <span className="font-bold text-blue-600">{newMag.toFixed(2)}</span>
                 </div>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: VISUALS & CONTROLS (60%)    */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* TOP RIGHT: POLAR ANIMATION */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[350px]">
            
            {/* Legend */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded border border-slate-700 shadow-sm">
                    <div className="w-4 h-1 bg-slate-500 rounded-full"></div>
                    <span className="text-xs font-bold text-slate-400">Original</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded border border-slate-700 shadow-sm">
                    <div className="w-4 h-1 bg-blue-500 rounded-full"></div>
                    <span className="text-xs font-bold text-blue-400">Scaled Result</span>
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                {/* Radial Grid Pattern */}
                <pattern id="grid-polar" width="400" height="400" patternUnits="userSpaceOnUse">
                    <circle cx="200" cy="200" r="30" fill="none" stroke="#334155" strokeWidth="1" />
                    <circle cx="200" cy="200" r="60" fill="none" stroke="#334155" strokeWidth="1" />
                    <circle cx="200" cy="200" r="90" fill="none" stroke="#334155" strokeWidth="1" />
                    <circle cx="200" cy="200" r="120" fill="none" stroke="#334155" strokeWidth="1" />
                    <circle cx="200" cy="200" r="150" fill="none" stroke="#334155" strokeWidth="1" />
                    {/* Crosshairs */}
                    <line x1="0" y1="200" x2="400" y2="200" stroke="#475569" strokeWidth="1" />
                    <line x1="200" y1="0" x2="200" y2="400" stroke="#475569" strokeWidth="1" />
                </pattern>
                
                <marker id="arrow-base-g" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                </marker>
                <marker id="arrow-result-g" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                </marker>
                <marker id="arrow-result-flip" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                </marker>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid-polar)" />

              <g transform={`translate(${CENTER}, ${CENTER})`}>
                
                {/* Base Vector Ghost */}
                {scalar !== 1 && (
                    <line 
                        x1="0" y1="0" 
                        x2={baseX * SCALE_PX} y2={-baseY * SCALE_PX} 
                        stroke="#64748b" strokeWidth="4" strokeOpacity="0.3"
                        markerEnd="url(#arrow-base-g)"
                    />
                )}

                {/* Result Vector */}
                <motion.line
                    initial={false}
                    animate={{
                        x2: resultX * SCALE_PX,
                        y2: -resultY * SCALE_PX
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    x1="0" y1="0"
                    stroke={isFlipped ? "#EF4444" : "#3B82F6"} 
                    strokeWidth="5"
                    markerEnd={`url(#arrow-result-${isFlipped ? 'flip' : 'g'})`}
                />
              </g>
            </svg>
            
            {/* Direction Indicator Overlay */}
            <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur transition-colors ${isFlipped ? 'bg-red-900/50 text-red-200 border-red-800' : 'bg-green-900/50 text-green-200 border-green-800'}`}>
                {isFlipped ? "⚠️ Direction Reversed" : "✅ Direction Maintained"}
            </div>

        </div>

        {/* BOTTOM RIGHT: CONTROLS */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Scalar Slider */}
                <div>
                    <label className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Scalar (<InlineMath>k</InlineMath>)</span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-mono font-bold">
                            {scalar}
                        </span>
                    </label>
                    <input 
                        type="range" min="-2.5" max="2.5" step="0.25"
                        value={scalar}
                        onChange={(e) => setScalar(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                         <span>-2.5</span>
                         <span>0</span>
                         <span>2.5</span>
                    </div>
                </div>

                {/* Angle Slider */}
                <div>
                    <label className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Angle</span>
                        <span className="font-mono text-slate-500">{baseAngle}°</span>
                    </label>
                    <input 
                        type="range" min="0" max="360" step="15"
                        value={baseAngle}
                        onChange={(e) => setBaseAngle(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-400"
                    />
                     <div className="text-xs text-slate-400 mt-2 text-center">
                         Rotate to test any direction
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="scalar-mult-geometry"
      slideTitle="Scalar multiplication: magnitude and direction"
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