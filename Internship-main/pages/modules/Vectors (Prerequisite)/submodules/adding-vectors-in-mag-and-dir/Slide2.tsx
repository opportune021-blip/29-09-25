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
  
  // State: The components of the Resultant Vector
  // We initialize with values that land in Quadrant 2 to make the angle interesting
  const [rx, setRx] = useState(-3);
  const [ry, setRy] = useState(4);

  // Config
  const GRID = 35;
  const CENTER_X = 250;
  const CENTER_Y = 250;

  // --- CALCULATIONS ---
  const magnitude = Math.sqrt(rx**2 + ry**2);
  
  // Reference Angle (alpha) - strictly positive acute angle
  const refAngleRad = Math.atan(Math.abs(ry) / Math.abs(rx));
  const refAngleDeg = toDeg(refAngleRad);

  // True Standard Angle
  const trueAngleRad = Math.atan2(ry, rx);
  let trueAngleDeg = toDeg(trueAngleRad);
  if (trueAngleDeg < 0) trueAngleDeg += 360; // Normalize to 0-360

  // Quadrant logic for display text
  let quadText = "I";
  let angleLogic = <InlineMath>\theta = \alpha</InlineMath>;
  
  if (rx < 0 && ry >= 0) {
    quadText = "II";
    angleLogic = <InlineMath>\theta = 180^\circ - \alpha</InlineMath>;
  } else if (rx < 0 && ry < 0) {
    quadText = "III";
    angleLogic = <InlineMath>\theta = 180^\circ + \alpha</InlineMath>;
  } else if (rx >= 0 && ry < 0) {
    quadText = "IV";
    angleLogic = <InlineMath>\theta = 360^\circ - \alpha</InlineMath>;
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

  return (
    <SlideComponentWrapper
      slideId="add-mag-dir-2"
      slideTitle="Adding vectors in magnitude & direction form (2 of 2)"
      moduleId="vectors-prerequisite"
      submoduleId="adding-vectors-in-mag-and-dir"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        <div className="w-full p-4 sm:p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Step 2: Recomposing the Vector</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                After adding components to get <InlineMath>R_x</InlineMath> and <InlineMath>R_y</InlineMath>, 
                we use Pythagoras and Inverse Tangent to find the final answer.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: Graph */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[500px] overflow-hidden select-none shadow-inner flex items-center justify-center">
                
                <div className="absolute top-4 left-4 z-10">
                    <div className="bg-white/90 dark:bg-slate-800/90 px-3 py-2 rounded shadow text-sm border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-slate-500 uppercase text-xs block mb-1">Current State</span>
                        <div className="font-mono"><InlineMath>R_x = {rx.toFixed(1)}</InlineMath></div>
                        <div className="font-mono"><InlineMath>R_y = {ry.toFixed(1)}</InlineMath></div>
                    </div>
                </div>

                <svg className="w-full h-full" viewBox="0 0 500 500">
                  <defs>
                    <pattern id="grid-recomp" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                      <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                    </pattern>
                    <marker id="head-res-fin" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-recomp)" className="text-slate-400" />
                  
                  {/* Axes */}
                  <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="500" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
                  <line x1="0" y1={CENTER_Y} x2="500" y2={CENTER_Y} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

                  <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                    
                    {/* Angle Arc */}
                    <path 
                        d={`M ${GRID} 0 A ${GRID} ${GRID} 0 ${Math.abs(trueAngleDeg) > 180 ? 1 : 0} 0 ${Math.cos(trueAngleRad)*GRID} ${-Math.sin(trueAngleRad)*GRID}`}
                        fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2"
                    />

                    {/* Component Legs */}
                    <line 
                        x1={0} y1={0} x2={rx * GRID} y2={0} 
                        stroke="#94a3b8" strokeWidth="4" strokeOpacity="0.5" 
                    />
                    <line 
                        x1={rx * GRID} y1={0} x2={rx * GRID} y2={-ry * GRID} 
                        stroke="#94a3b8" strokeWidth="4" strokeOpacity="0.5" 
                    />

                    {/* Resultant Vector */}
                    <line 
                        x1="0" y1="0" 
                        x2={rx * GRID} y2={-ry * GRID} 
                        stroke="#10B981" strokeWidth="5" markerEnd="url(#head-res-fin)" 
                    />

                    {/* Labels */}
                    <text x={rx * GRID / 2} y={20} textAnchor="middle" fill="#64748b" fontWeight="bold" fontSize="12">Rx</text>
                    <text x={rx * GRID + 15} y={-ry * GRID / 2} textAnchor="start" fill="#64748b" fontWeight="bold" fontSize="12">Ry</text>

                  </g>
                </svg>

                {/* Draggable Tip */}
                <motion.div
                    drag dragMomentum={false} onDrag={handleDrag}
                    className="absolute w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500 cursor-move z-20 flex items-center justify-center"
                    style={{ left: CENTER_X + rx * GRID - 20, top: CENTER_Y - ry * GRID - 20 }}
                >
                    <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                </motion.div>

              </div>

              {/* RIGHT: Calculation Steps */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Step 1: Magnitude */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">1. Find Magnitude (Pythagoras)</h3>
                    <div className="font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded text-slate-800 dark:text-slate-200">
                        <BlockMath>
                            {`|\\vec{R}| = \\sqrt{(${rx.toFixed(1)})^2 + (${ry.toFixed(1)})^2} = ${magnitude.toFixed(2)}`}
                        </BlockMath>
                    </div>
                </div>

                {/* Step 2: Reference Angle */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">2. Find Reference Angle (<InlineMath>\alpha</InlineMath>)</h3>
                    <div className="text-sm text-slate-600 mb-2">Always use positive values for <InlineMath>\tan^{-1}</InlineMath>.</div>
                    <div className="font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded text-slate-800 dark:text-slate-200">
                        <BlockMath>
                            {`\\alpha = \\tan^{-1}\\left(\\left|\\frac{${ry.toFixed(1)}}{${rx.toFixed(1)}}\\right|\\right) = ${refAngleDeg.toFixed(1)}^\\circ`}
                        </BlockMath>
                    </div>
                </div>

                {/* Step 3: Quadrant Check */}
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-200 uppercase tracking-wide">3. Determine Direction</h3>
                        <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold border border-emerald-200 dark:border-emerald-800">Quadrant {quadText}</span>
                    </div>
                    
                    <div className="font-mono text-center text-lg font-bold text-emerald-700 dark:text-emerald-300 my-2">
                        {angleLogic}
                    </div>
                    
                    <div className="font-mono bg-white dark:bg-slate-800 p-3 rounded text-emerald-900 dark:text-emerald-100 text-center border border-emerald-100 dark:border-emerald-900">
                        <InlineMath>{`\\theta = ${trueAngleDeg.toFixed(1)}^\\circ`}</InlineMath>
                    </div>
                </div>

                <div className="text-center text-sm text-slate-500 italic">
                    Final Answer: <span className="font-bold not-italic text-slate-800 dark:text-slate-200">{magnitude.toFixed(2)} units at {trueAngleDeg.toFixed(1)}°</span>
                </div>

              </div>

            </div>
          </div>
        </div>
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}