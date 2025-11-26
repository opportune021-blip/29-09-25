import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toRad = (deg: number) => (deg * Math.PI) / 180;

export default function CompFromMagDirSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Polar Coordinates
  const [magnitude, setMagnitude] = useState(5);
  const [angle, setAngle] = useState(30);

  // Config
  const GRID = 40;
  const CENTER_X = 200;
  const CENTER_Y = 250;

  // Calculations (Polar to Rectangular)
  const rad = toRad(angle);
  const compX = magnitude * Math.cos(rad);
  const compY = magnitude * Math.sin(rad);

  const slideInteraction: Interaction = {
    id: 'comp-from-mag-dir-explore',
    conceptId: 'resolving-vectors',
    conceptName: 'Resolving Vectors',
    type: 'learning',
    description: 'Interactive decomposition of a vector into x and y components.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: VISUALIZATION (50%)          */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Resolving Vectors </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
  Using <InlineMath>{"|\\vec{v}|"}</InlineMath> and <InlineMath>{"\\theta"}</InlineMath> to find components.
</p>

        </div>

        <div className="flex-grow bg-slate-50 dark:bg-slate-900 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[400px]">
            
            {/* Legend */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded text-xs shadow-sm border border-orange-200 dark:border-slate-700">
                     <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                     <span className="font-bold text-slate-600 dark:text-slate-300">x-component (cos)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded text-xs shadow-sm border border-emerald-200 dark:border-slate-700">
                     <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                     <span className="font-bold text-slate-600 dark:text-slate-300">y-component (sin)</span>
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 350">
              <defs>
                <pattern id="grid-res" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeOpacity="0.5" strokeWidth="1"/>
                </pattern>
                <marker id="head-v-res" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                <marker id="head-x-res" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#F97316" /></marker>
                <marker id="head-y-res" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#10B981" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-res)" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="#64748b" strokeWidth="2" />
              <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="#64748b" strokeWidth="2" />

              <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {/* Angle Arc */}
                <path 
                    d={`M ${GRID} 0 A ${GRID} ${GRID} 0 ${angle > 180 ? 1 : 0} 0 ${Math.cos(rad)*GRID} ${-Math.sin(rad)*GRID}`}
                    fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6"
                />
                <text x={GRID + 5} y={-5} fontSize="12" fill="#3B82F6">{angle}°</text>

                {/* Projection Lines (Dashed) */}
                <line 
                    x1={compX * GRID} y1={0} 
                    x2={compX * GRID} y2={-compY * GRID} 
                    stroke="#94a3b8" strokeDasharray="4,4" opacity="0.5"
                />
                <line 
                    x1={0} y1={-compY * GRID} 
                    x2={compX * GRID} y2={-compY * GRID} 
                    stroke="#94a3b8" strokeDasharray="4,4" opacity="0.5"
                />

                {/* X Component */}
                <motion.line 
                    animate={{ x2: compX * GRID }} 
                    y2="0" x1="0" y1="0"
                    stroke="#F97316" strokeWidth="3" markerEnd="url(#head-x-res)"
                />
                {/* Y Component */}
                <motion.line 
                    animate={{ y2: -compY * GRID }} 
                    x1="0" y1="0" x2="0"
                    stroke="#10B981" strokeWidth="3" markerEnd="url(#head-y-res)"
                />

                {/* Main Vector */}
                <motion.line 
                    animate={{ x2: compX * GRID, y2: -compY * GRID }} 
                    x1="0" y1="0"
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-v-res)"
                />

                {/* Label */}
                <motion.text 
                    animate={{ x: compX * GRID / 2, y: -compY * GRID / 2 - 15 }} 
                    textAnchor="middle" fill="#3B82F6" fontWeight="bold" fontSize="14"
                    style={{ textShadow: '0 2px 4px black' }}
                >
                    {magnitude}
                </motion.text>

              </g>
            </svg>

            {/* Angle Control Overlay */}
            <div className="absolute bottom-4 right-4 bg-slate-800/50 p-4 rounded-full shadow-lg border border-slate-600 w-24 h-24 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full rounded-full border border-slate-500">
                    <motion.div 
                        className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-blue-500 origin-bottom"
                        style={{ rotate: -angle }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-300">
                        {angle}°
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: CONTROLS & MATH (50%)       */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col gap-6 h-full">
        
        {/* Controls */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            
            {/* Magnitude Slider */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-blue-600">Magnitude (<InlineMath>r</InlineMath>)</span>
                    <span className="font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 rounded">{magnitude}</span>
                </div>
                <input 
                    type="range" min="1" max="8" step="0.5" value={magnitude}
                    onChange={(e) => setMagnitude(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>

            {/* Angle Slider */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-600 dark:text-slate-300">Direction (<InlineMath>\theta</InlineMath>)</span>
                    <span className="font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 rounded">{angle}°</span>
                </div>
                <input 
                    type="range" min="0" max="360" step="15" value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
                />
            </div>
        </div>

        {/* Calculation Cards */}
        <div className="flex flex-col gap-4 flex-grow">
            
            {/* X Calc */}
            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 mb-2">
                    <div className="font-bold text-orange-700 dark:text-orange-300">Horizontal Component</div>
                    <div className="text-xs px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-orange-200 text-orange-600">Cosine</div>
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-800 p-3 rounded text-slate-700 dark:text-slate-300 border border-orange-100 dark:border-slate-700">
                    <BlockMath>{`v_x = ${magnitude} \\cdot \\cos(${angle}^\\circ) = ${compX.toFixed(2)}`}</BlockMath>
                </div>
            </div>

            {/* Y Calc */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 mb-2">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">Vertical Component</div>
                    <div className="text-xs px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-emerald-200 text-emerald-600">Sine</div>
                </div>
                <div className="font-mono text-sm bg-white dark:bg-slate-800 p-3 rounded text-slate-700 dark:text-slate-300 border border-emerald-100 dark:border-slate-700">
                    <BlockMath>{`v_y = ${magnitude} \\cdot \\sin(${angle}^\\circ) = ${compY.toFixed(2)}`}</BlockMath>
                </div>
            </div>

            {/* Final Result */}
            <div className="text-center font-mono text-lg bg-slate-100 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 mt-auto">
                <InlineMath>{`\\vec{v} = \\langle ${compX.toFixed(2)}, ${compY.toFixed(2)} \\rangle`}</InlineMath>
            </div>

        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="comp-from-mag-dir"
      slideTitle="Vector components from magnitude & direction"
      moduleId="vectors-prerequisite"
      submoduleId="component-form-of-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}