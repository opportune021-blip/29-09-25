import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export default function DirFromComp12Slide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Vector head position
  // Initialize in Q1
  const [vec, setVec] = useState({ x: 3, y: 3 });

  // Config
  const GRID = 40;
  const CENTER_X = 200;
  const CENTER_Y = 300; // Shifted down to give more room for Q1/Q2

  // Calculations
  const mag = Math.sqrt(vec.x**2 + vec.y**2);
  
  // Angle Logic
  // Math.atan2 handles all quadrants automatically, but we want to teach the manual logic
  const trueAngleRad = Math.atan2(vec.y, vec.x);
  const trueAngleDeg = toDeg(trueAngleRad);
  
  // Calculator simulation: Math.atan(y/x)
  // This is what a standard calculator gives for tan^-1
  const calcAngleRad = Math.atan(vec.y / vec.x); 
  const calcAngleDeg = toDeg(calcAngleRad);

  const isQ2 = vec.x < 0 && vec.y >= 0;
  const isQ1 = vec.x >= 0 && vec.y >= 0;

  const slideInteraction: Interaction = {
    id: 'dir-comp-1-2-explore',
    conceptId: 'direction-angle-q1-q2',
    conceptName: 'Direction Angle (Q1 & Q2)',
    type: 'learning',
    description: 'Interactive calculation of vector direction in the first two quadrants.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Drag Logic (Constrain Y to be positive for this slide)
  const handleDrag = (_: any, info: any) => {
    setVec(prev => {
        let newX = prev.x + info.delta.x / GRID;
        let newY = prev.y - info.delta.y / GRID;
        
        // Constrain to Upper Half Plane (Q1 & Q2) mostly
        if (newY < 0.1) newY = 0.1; // Keep strictly positive for this lesson
        
        return { x: newX, y: newY };
    });
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & STEPS (45%)         */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Finding Direction </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Calculating angle <InlineMath>\theta</InlineMath> in Quadrants I & II.
            </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Step 1 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                    Step 1: Inverse Tangent
                </h3>
                <div className="flex items-center gap-3 justify-between">
                    <div className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700 font-mono text-xs">
                        <BlockMath>{`\\theta_{calc} = \\tan^{-1}\\left(\\frac{${vec.y.toFixed(1)}}{${vec.x.toFixed(1)}}\\right)`}</BlockMath>
                    </div>
                    <div className="text-xl font-bold text-slate-600 dark:text-slate-400">
                        = {calcAngleDeg.toFixed(1)}°
                    </div>
                </div>
            </div>

            {/* Step 2 */}
            <div className={`p-4 rounded-lg border transition-colors ${isQ2 ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-800' : 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800'}`}>
                <h3 className={`font-bold text-sm mb-2 flex items-center gap-2 ${isQ2 ? 'text-orange-800 dark:text-orange-200' : 'text-green-800 dark:text-green-200'}`}>
                    <span>Step 2: Check Quadrant</span>
                    {isQ2 ? <span className="text-xs bg-orange-200 dark:bg-orange-800 px-2 py-0.5 rounded">Adj. Needed</span> : <span className="text-xs bg-green-200 dark:bg-green-800 px-2 py-0.5 rounded">OK</span>}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isQ2 
                        ? "Since x is negative (Q2), the calculator gives a negative angle (Q4). We must ADD 180°."
                        : "Since x and y are positive (Q1), the calculator answer is correct."
                    }
                </p>
            </div>

            {/* Final Calculation */}
            <div className="bg-slate-800 text-white p-4 rounded-lg shadow-lg">
                <div className="text-xs uppercase font-bold text-slate-400 mb-2">Final Angle <InlineMath>\theta</InlineMath></div>
                {isQ2 ? (
                    <div className="flex items-center gap-2 font-mono text-lg">
                        <span className="text-orange-400">{calcAngleDeg.toFixed(1)}°</span>
                        <span>+ 180°</span>
                        <span>=</span>
                        <span className="font-bold text-emerald-400">{trueAngleDeg.toFixed(1)}°</span>
                    </div>
                ) : (
                    <div className="font-mono text-2xl font-bold text-emerald-400">
                        {calcAngleDeg.toFixed(1)}°
                    </div>
                )}
            </div>

            <div className="flex gap-2 text-xs text-slate-500 items-start">
                <span className="text-lg">💡</span>
                <p>Tip: Always draw a quick sketch! If your vector points Left-and-Up (Q2), your angle must be between 90° and 180°.</p>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: ANIMATION (55%)             */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* Interactive Graph */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[350px] group">
            
            {/* Grid */}
            <svg className="w-full h-full pointer-events-none" viewBox="0 0 400 350">
              <defs>
                <pattern id="grid-dir12" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeWidth="1"/>
                </pattern>
                <marker id="head-dir12" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dir12)" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="#64748b" strokeWidth="2" />
              <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="#64748b" strokeWidth="2" />

              <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {/* Angle Arc */}
                <path 
                    d={`M ${GRID} 0 A ${GRID} ${GRID} 0 0 0 ${Math.cos(trueAngleRad)*GRID} ${-Math.sin(trueAngleRad)*GRID}`}
                    fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"
                />
                
                {/* Vector */}
                <line 
                    x1="0" y1="0" 
                    x2={vec.x * GRID} y2={-vec.y * GRID} 
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-dir12)" 
                />

                {/* Components (Dashed) */}
                <line x1={vec.x * GRID} y1="0" x2={vec.x * GRID} y2={-vec.y * GRID} stroke="#94a3b8" strokeDasharray="4,4" />
                <line x1="0" y1={-vec.y * GRID} x2={vec.x * GRID} y2={-vec.y * GRID} stroke="#94a3b8" strokeDasharray="4,4" />

                {/* Labels */}
                <text x={vec.x * GRID / 2} y={15} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">x={vec.x.toFixed(1)}</text>
                <text x={vec.x * GRID + (vec.x>0?5:-5)} y={-vec.y * GRID / 2} textAnchor={vec.x>0?"start":"end"} dominantBaseline="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">y={vec.y.toFixed(1)}</text>
                
                {/* Angle Text */}
                <text x="20" y="-20" fill="#3B82F6" fontWeight="bold" fontSize="16">
                    {trueAngleDeg.toFixed(0)}°
                </text>

              </g>
            </svg>

            {/* Draggable Handle */}
            <motion.div
                drag dragMomentum={false} onDrag={handleDrag}
                className="absolute w-12 h-12 rounded-full cursor-move z-20 flex items-center justify-center group pointer-events-auto"
                style={{ left: CENTER_X + vec.x * GRID - 24, top: CENTER_Y - vec.y * GRID - 24 }}
            >
                {/* Visual Hit Area */}
                <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 group-hover:ring-blue-500/50 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white" />
            </motion.div>

            {/* Quadrant Labels */}
            <div className="absolute top-4 right-4 text-slate-700 font-bold text-6xl opacity-20 pointer-events-none">I</div>
            <div className="absolute top-4 left-4 text-slate-700 font-bold text-6xl opacity-20 pointer-events-none">II</div>

            <div className="absolute bottom-4 right-4 bg-slate-900/80 px-3 py-1 rounded border border-slate-700 text-xs text-slate-400 pointer-events-none">
                Drag vector head
            </div>

        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="dir-from-comp-1-2"
      slideTitle="Direction of vectors from components: 1st & 2nd quadrants"
      moduleId="vectors-prerequisite"
      submoduleId="magnitude-and-direction-form"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}