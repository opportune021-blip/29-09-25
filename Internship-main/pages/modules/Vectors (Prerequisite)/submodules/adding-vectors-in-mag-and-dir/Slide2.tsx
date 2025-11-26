import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export default function AddMagDirSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Resultant components (Initialized in Q2 for demonstration)
  const [rx, setRx] = useState(-3);
  const [ry, setRy] = useState(4);

  // Config
  const GRID = 35;
  const CENTER_X = 250;
  const CENTER_Y = 250;

  // --- CALCULATIONS ---
  const magnitude = Math.sqrt(rx**2 + ry**2);
  
  // Reference Angle (alpha) - strictly positive
  const refAngleRad = Math.atan(Math.abs(ry) / Math.abs(rx));
  const refAngleDeg = toDeg(refAngleRad);

  // True Standard Angle
  const trueAngleRad = Math.atan2(ry, rx);
  let trueAngleDeg = toDeg(trueAngleRad);
  if (trueAngleDeg < 0) trueAngleDeg += 360;

  // Quadrant logic
  let quadText = "I";
  let angleFormula = "\\theta = \\alpha";
  
  if (rx < 0 && ry >= 0) {
    quadText = "II";
    angleFormula = "\\theta = 180^\\circ - \\alpha";
  } else if (rx < 0 && ry < 0) {
    quadText = "III";
    angleFormula = "\\theta = 180^\\circ + \\alpha";
  } else if (rx >= 0 && ry < 0) {
    quadText = "IV";
    angleFormula = "\\theta = 360^\\circ - \\alpha";
  }

  const slideInteraction: Interaction = {
    id: 'add-mag-dir-2-explore',
    conceptId: 'recomposing-vectors',
    conceptName: 'Recomposing Vectors',
    type: 'learning',
    description: 'Converting resultant components back to magnitude and direction.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Custom Drag
  const handleDrag = (_: any, info: any) => {
    setRx(prev => prev + info.delta.x / GRID);
    setRy(prev => prev - info.delta.y / GRID);
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & STEPS (40%)         */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Step 2: Recomposing</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Using components to find Magnitude & Direction.
            </p>
        </div>

        {/* Scrollable Steps */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Step 1: Magnitude */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">1. Find Magnitude </h3>
                <div className="font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded text-slate-800 dark:text-slate-200 text-sm">
                    <BlockMath>
                        {`|\\vec{R}| = \\sqrt{(${rx.toFixed(1)})^2 + (${ry.toFixed(1)})^2}`}
                    </BlockMath>
                    <div className="text-center font-bold text-blue-600 mt-2">
                        <InlineMath>{`= ${magnitude.toFixed(2)}`}</InlineMath>
                    </div>
                </div>
            </div>

            {/* Step 2: Reference Angle */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">2. Find Ref. Angle (<InlineMath>\alpha</InlineMath>)</h3>
                <div className="font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded text-slate-800 dark:text-slate-200 text-sm">
                    <BlockMath>
                        {`\\alpha = \\tan^{-1}\\left(\\left|\\frac{${ry.toFixed(1)}}{${rx.toFixed(1)}}\\right|\\right)`}
                    </BlockMath>
                    <div className="text-center font-bold text-purple-600 mt-2">
                        <InlineMath>{`= ${refAngleDeg.toFixed(1)}^\\circ`}</InlineMath>
                    </div>
                </div>
            </div>

            {/* Step 3: Quadrant Check */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-200 uppercase tracking-wide">3. Direction</h3>
                    <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold text-emerald-600 border border-emerald-100 dark:border-emerald-900">Quad {quadText}</span>
                </div>
                
                <div className="font-mono text-center text-emerald-700 dark:text-emerald-300 mb-2 text-sm">
                    <InlineMath>{angleFormula}</InlineMath>
                </div>
                
                <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded text-emerald-900 dark:text-emerald-100 text-center border border-emerald-100 dark:border-emerald-900 text-lg font-bold">
                    <InlineMath>{`\\theta = ${trueAngleDeg.toFixed(1)}^\\circ`}</InlineMath>
                </div>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: VISUALIZATION (60%)         */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* TOP RIGHT: GRAPH */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[350px]">
            
            {/* Fixed String Interpolation for KaTeX */}
            <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur px-3 py-2 rounded border border-slate-700 pointer-events-none shadow-xl">
                <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1 tracking-wider">Current Components</span>
                <div className="font-mono text-sm text-slate-200">
                    <InlineMath>{`R_x = ${rx.toFixed(1)}`}</InlineMath>
                </div>
                <div className="font-mono text-sm text-slate-200">
                    <InlineMath>{`R_y = ${ry.toFixed(1)}`}</InlineMath>
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 500 500">
              <defs>
                <pattern id="grid-recomp" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeOpacity="0.5" strokeWidth="1"/>
                </pattern>
                <marker id="head-res-fin" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-recomp)" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="500" stroke="#475569" strokeWidth="2" />
              <line x1="0" y1={CENTER_Y} x2="500" y2={CENTER_Y} stroke="#475569" strokeWidth="2" />

              <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {/* Angle Arc */}
                <path 
                    d={`M ${GRID} 0 A ${GRID} ${GRID} 0 ${Math.abs(trueAngleDeg) > 180 ? 1 : 0} 0 ${Math.cos(trueAngleRad)*GRID} ${-Math.sin(trueAngleRad)*GRID}`}
                    fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2"
                />

                {/* Component Legs (Dashed) */}
                <line 
                    x1={0} y1={0} x2={rx * GRID} y2={0} 
                    stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" 
                />
                <line 
                    x1={rx * GRID} y1={0} x2={rx * GRID} y2={-ry * GRID} 
                    stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" 
                />

                {/* Resultant Vector */}
                <line 
                    x1={0} y1={0} 
                    x2={rx * GRID} y2={-ry * GRID} 
                    stroke="#10B981" strokeWidth="5" markerEnd="url(#head-res-fin)" 
                />

                {/* Labels */}
                <text x={rx * GRID / 2} y={20} textAnchor="middle" fill="#94a3b8" fontWeight="bold" fontSize="12">Rx</text>
                <text x={rx * GRID + (rx > 0 ? 15 : -25)} y={-ry * GRID / 2} textAnchor="start" fill="#94a3b8" fontWeight="bold" fontSize="12">Ry</text>

              </g>
            </svg>

            {/* Draggable Tip */}
            <motion.div
                drag dragMomentum={false} onDrag={handleDrag}
                className="absolute w-12 h-12 rounded-full cursor-move z-20 flex items-center justify-center group"
                style={{ left: CENTER_X + rx * GRID - 24, top: CENTER_Y - ry * GRID - 24 }}
            >
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white ring-4 ring-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-transform group-hover:scale-110" />
            </motion.div>

            <div className="absolute bottom-4 right-4 text-xs text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-slate-800 pointer-events-none">
                Drag the green tip
            </div>

        </div>

        {/* Bottom Summary */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
             <span className="text-sm text-slate-500 uppercase font-bold tracking-wider mr-2">Final Answer</span>
             <span className="font-mono font-bold text-lg text-slate-800 dark:text-slate-100">
                {magnitude.toFixed(2)} units at {trueAngleDeg.toFixed(1)}°
             </span>
        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="add-mag-dir-2"
      slideTitle="Adding vectors in magnitude & direction form (2 of 2)"
      moduleId="vectors-prerequisite"
      submoduleId="adding-vectors-in-mag-and-dir"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}