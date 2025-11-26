import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export default function DirFromComp34Slide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Vector head position
  // Initialize in Q3
  const [vec, setVec] = useState({ x: -3, y: -3 });

  // Config
  const GRID = 40;
  const CENTER_X = 200;
  const CENTER_Y = 150; // Shifted UP to show bottom quadrants (Q3/Q4)

  // Calculations
  const calcAngleRad = Math.atan(vec.y / vec.x); 
  const calcAngleDeg = toDeg(calcAngleRad);
  
  // Determine Quadrant
  const isQ3 = vec.x < 0 && vec.y < 0;
  const isQ4 = vec.x >= 0 && vec.y < 0;

  // True Standard Angle (0-360)
  let trueAngleDeg = calcAngleDeg;
  if (isQ3) {
    trueAngleDeg = calcAngleDeg + 180;
  } else if (isQ4) {
    trueAngleDeg = calcAngleDeg + 360;
  }
  
  const slideInteraction: Interaction = {
    id: 'dir-comp-3-4-explore',
    conceptId: 'direction-angle-q3-q4',
    conceptName: 'Direction Angle (Q3 & Q4)',
    type: 'learning',
    description: 'Interactive calculation of vector direction in the third and fourth quadrants.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Drag Logic (Constrain Y to be negative for this slide)
  const handleDrag = (_: any, info: any) => {
    setVec(prev => {
        let newX = prev.x + info.delta.x / GRID;
        let newY = prev.y - info.delta.y / GRID;
        
        // Constrain to Lower Half Plane (Q3 & Q4)
        if (newY > -0.1) newY = -0.1; 
        
        return { x: newX, y: newY };
    });
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: VISUALIZATION (50%)          */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col h-full">
        
        <div className="flex-grow bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[400px]">
            
            {/* Grid */}
            <svg className="w-full h-full pointer-events-none" viewBox="0 0 400 350">
              <defs>
                <pattern id="grid-dir34" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeWidth="1"/>
                </pattern>
                <marker id="head-dir34" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dir34)" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="#64748b" strokeWidth="2" />
              <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="#64748b" strokeWidth="2" />

              <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {/* Full Angle Arc */}
                <path 
                    d={`M ${GRID/1.5} 0 A ${GRID/1.5} ${GRID/1.5} 0 1 1 ${Math.cos(trueAngleDeg*Math.PI/180)*GRID/1.5} ${-Math.sin(trueAngleDeg*Math.PI/180)*GRID/1.5}`}
                    fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="2,2"
                />
                
                {/* Vector */}
                <line 
                    x1="0" y1="0" 
                    x2={vec.x * GRID} y2={-vec.y * GRID} 
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-dir34)" 
                />

                {/* Components (Dashed) */}
                <line x1={vec.x * GRID} y1="0" x2={vec.x * GRID} y2={-vec.y * GRID} stroke="#94a3b8" strokeDasharray="4,4" />
                <line x1="0" y1={-vec.y * GRID} x2={vec.x * GRID} y2={-vec.y * GRID} stroke="#94a3b8" strokeDasharray="4,4" />

                {/* Labels */}
                <text x={vec.x * GRID / 2} y={-10} textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">x={vec.x.toFixed(1)}</text>
                <text x={vec.x * GRID + (vec.x>0?5:-5)} y={-vec.y * GRID / 2} textAnchor={vec.x>0?"start":"end"} dominantBaseline="middle" fill="#64748b" fontSize="12" fontWeight="bold">y={vec.y.toFixed(1)}</text>
                
                {/* Angle Text */}
                <text x="15" y="25" fill="#3B82F6" fontWeight="bold" fontSize="14">
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
                <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 group-hover:ring-blue-500/50 transition-all border border-white" />
            </motion.div>

            {/* Quadrant Labels */}
            <div className="absolute bottom-4 left-4 text-slate-700 font-bold text-6xl opacity-20 pointer-events-none">III</div>
            <div className="absolute bottom-4 right-4 text-slate-700 font-bold text-6xl opacity-20 pointer-events-none">IV</div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: THEORY & MATH (50%)         */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Finding Direction (Q3 & Q4)</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Calculators only return angles between -90° and 90°. We must adjust for the bottom quadrants.
            </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Calculator Output */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">Calculator Output</h3>
                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded border border-slate-100 dark:border-slate-700">
                    <div className="text-sm font-mono text-slate-600 dark:text-slate-300">
                        <BlockMath>{`\\tan^{-1}(${vec.y.toFixed(1)} / ${vec.x.toFixed(1)})`}</BlockMath>
                    </div>
                    <div className="text-xl font-bold text-slate-800 dark:text-white">
                        = {calcAngleDeg.toFixed(1)}°
                    </div>
                </div>
            </div>

            {/* Adjustment Logic */}
            <div className={`p-4 rounded-lg border transition-colors ${isQ3 ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/10 dark:border-purple-800' : 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800'}`}>
                <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold text-sm ${isQ3 ? 'text-purple-800 dark:text-purple-200' : 'text-blue-800 dark:text-blue-200'}`}>
                        Adjusting for {isQ3 ? 'Quadrant III' : 'Quadrant IV'}
                    </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {isQ3 
                        ? "Calculator sees (- / -) as positive (Q1 angle). Rotate 180° to get to the opposite side."
                        : "Calculator gives a negative angle. Add 360° to get the standard positive angle."
                    }
                </p>
                
                <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 font-mono text-sm font-bold">
                    <span className="text-slate-600 dark:text-slate-400">{calcAngleDeg.toFixed(1)}°</span>
                    <span className={isQ3 ? "text-purple-600" : "text-blue-600"}>
                        {isQ3 ? "+ 180°" : "+ 360°"}
                    </span>
                    <span>=</span>
                    <span className="text-lg border-b-2 border-slate-400 dark:border-slate-500">{trueAngleDeg.toFixed(1)}°</span>
                </div>
            </div>

            {/* Reference Table */}
            <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">Quick Reference</h3>
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="text-slate-500 border-b border-slate-200 dark:border-slate-700">
                            <th className="pb-1 font-normal">Quad</th>
                            <th className="pb-1 font-normal">Coords</th>
                            <th className="pb-1 font-normal">Adjustment</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-slate-700 dark:text-slate-300">
                        <tr className={isQ3 ? "bg-purple-100 dark:bg-purple-900/30 font-bold" : "opacity-60"}>
                            <td className="py-2">III</td>
                            <td>(-, -)</td>
                            <td>+180°</td>
                        </tr>
                        <tr className={!isQ3 ? "bg-blue-100 dark:bg-blue-900/30 font-bold" : "opacity-60"}>
                            <td className="py-2">IV</td>
                            <td>(+, -)</td>
                            <td>+360°</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="dir-from-comp-3-4"
      slideTitle="Direction of vectors from components: 3rd & 4th quadrants"
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