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
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Finding Direction (Quadrants III & IV)</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
             Calculators only return angles between <InlineMath>{"-90^\\circ"}</InlineMath> and <InlineMath>{"90^\\circ"}</InlineMath>. 
             When working in the bottom quadrants, we often need to adjust to find the standard angle <InlineMath>{"(0^\\circ \\le \\theta < 360^\\circ)"}</InlineMath>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Graph */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
            
            <svg className="w-full h-full" viewBox="0 0 400 350">
              <defs>
                <pattern id="grid-dir34" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="head-dir34" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dir34)" className="text-slate-400" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

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
                <text x={vec.x * GRID / 2} y={-10} textAnchor="middle" fill="#64748b" fontSize="12">x={vec.x.toFixed(1)}</text>
                <text x={vec.x * GRID + (vec.x>0?5:-5)} y={-vec.y * GRID / 2} textAnchor={vec.x>0?"start":"end"} dominantBaseline="middle" fill="#64748b" fontSize="12">y={vec.y.toFixed(1)}</text>
                
                {/* Angle Text */}
                <text x="15" y="25" fill="#3B82F6" fontWeight="bold" fontSize="14">
                    {trueAngleDeg.toFixed(0)}°
                </text>

              </g>
            </svg>

            {/* Draggable Handle */}
            <motion.div
                drag dragMomentum={false} onDrag={handleDrag}
                className="absolute w-10 h-10 rounded-full bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500 cursor-move z-20 flex items-center justify-center"
                style={{ left: CENTER_X + vec.x * GRID - 20, top: CENTER_Y - vec.y * GRID - 20 }}
            >
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
            </motion.div>

            {/* Quadrant Labels */}
            <div className="absolute bottom-4 left-4 text-slate-300 font-bold text-4xl pointer-events-none">III</div>
            <div className="absolute bottom-4 right-4 text-slate-300 font-bold text-4xl pointer-events-none">IV</div>

          </div>

          {/* RIGHT: Math & Logic */}
          <div className="flex flex-col gap-6">
            
            {/* The Formula Result */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 border-b pb-2">Calculator Output</h3>
                <div className="flex items-center gap-4">
                    <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded font-mono text-sm flex-grow">
                        <BlockMath>{`\\tan^{-1}(${vec.y.toFixed(1)} / ${vec.x.toFixed(1)})`}</BlockMath>
                    </div>
                    <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
                        = {calcAngleDeg.toFixed(1)}°
                    </div>
                </div>
                <div className="text-xs text-slate-400 mt-2 italic">
                    Note: <InlineMath>{"\\tan^{-1}"}</InlineMath> always gives an answer between -90° and 90°.
                </div>
            </div>

            {/* The Quadrant Check & Fix */}
            <div className={`p-6 rounded-xl border transition-colors ${isQ3 ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/10 dark:border-purple-800' : 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800'}`}>
                <h3 className={`font-bold mb-2 flex items-center gap-2 ${isQ3 ? 'text-purple-700 dark:text-purple-300' : 'text-blue-700 dark:text-blue-300'}`}>
                    <span>Adjusting for {isQ3 ? 'Quadrant III' : 'Quadrant IV'}</span>
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {isQ3 
                        ? "Calculator sees (- / -) as positive, so it gives a Q1 angle. We must rotate 180° to get to the opposite side."
                        : "Calculator gives a negative angle. To get the standard positive angle (0-360°), add 360°."
                    }
                </p>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">Standard Angle Calculation</div>
                    <div className="flex items-center gap-2 font-mono font-bold text-slate-800 dark:text-white flex-wrap">
                        <span>{calcAngleDeg.toFixed(1)}°</span>
                        <span className={isQ3 ? "text-purple-600" : "text-blue-600"}>
                            {isQ3 ? "+ 180°" : "+ 360°"}
                        </span>
                        <span>=</span>
                        <span className="text-xl border-b-2 border-slate-500">{trueAngleDeg.toFixed(1)}°</span>
                    </div>
                </div>
            </div>

            {/* Summary Table */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg text-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-500 border-b border-slate-200 dark:border-slate-700">
                            <th className="pb-2">Quad</th>
                            <th className="pb-2">Coords</th>
                            <th className="pb-2">Adjustment</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-slate-700 dark:text-slate-300">
                        <tr className={isQ3 ? "bg-purple-100 dark:bg-purple-900/30" : "opacity-50"}>
                            <td className="py-1">III</td>
                            <td>(-, -)</td>
                            <td>+180°</td>
                        </tr>
                        <tr className={!isQ3 ? "bg-blue-100 dark:bg-blue-900/30" : "opacity-50"}>
                            <td className="py-1">IV</td>
                            <td>(+, -)</td>
                            <td>+360°</td>
                        </tr>
                    </tbody>
                </table>
            </div>

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