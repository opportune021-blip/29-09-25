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
  const CENTER_Y = 250; // Shifted down to give more room for Q1/Q2

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
        // Allow slightly below 0 for snapping feel, but clamp for logic if needed
        if (newY < 0.1) newY = 0.1; // Keep strictly positive for this lesson
        
        return { x: newX, y: newY };
    });
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Finding Direction (Quadrants I & II)</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            To find the angle <InlineMath>\theta</InlineMath>, we use the inverse tangent: <InlineMath>\theta = \tan^{-1}(y/x)</InlineMath>. 
            But be careful in the 2nd Quadrant!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Graph */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
            
            <svg className="w-full h-full" viewBox="0 0 400 350">
              <defs>
                <pattern id="grid-dir12" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="head-dir12" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dir12)" className="text-slate-400" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

              <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {/* Angle Arc */}
                <path 
                    d={`M ${GRID} 0 A ${GRID} ${GRID} 0 0 0 ${Math.cos(trueAngleRad)*GRID} ${-Math.sin(trueAngleRad)*GRID}`}
                    fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="2"
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
                <text x={vec.x * GRID / 2} y={15} textAnchor="middle" fill="#64748b" fontSize="12">x={vec.x.toFixed(1)}</text>
                <text x={vec.x * GRID + (vec.x>0?5:-5)} y={-vec.y * GRID / 2} textAnchor={vec.x>0?"start":"end"} dominantBaseline="middle" fill="#64748b" fontSize="12">y={vec.y.toFixed(1)}</text>
                
                {/* Angle Text */}
                <text x="15" y="-15" fill="#3B82F6" fontWeight="bold" fontSize="14">
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
            <div className="absolute top-4 right-4 text-slate-300 font-bold text-4xl pointer-events-none">I</div>
            <div className="absolute top-4 left-4 text-slate-300 font-bold text-4xl pointer-events-none">II</div>

          </div>

          {/* RIGHT: Math & Logic */}
          <div className="flex flex-col gap-6">
            
            {/* The Formula */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 border-b pb-2">Step 1: Use Inverse Tangent</h3>
                <div className="flex items-center gap-4">
                    <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded font-mono text-sm flex-grow">
                        <BlockMath>{`\\theta_{calc} = \\tan^{-1}\\left(\\frac{${vec.y.toFixed(1)}}{${vec.x.toFixed(1)}}\\right)`}</BlockMath>
                    </div>
                    <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
                        = {calcAngleDeg.toFixed(1)}°
                    </div>
                </div>
            </div>

            {/* The Quadrant Check */}
            <div className={`p-6 rounded-xl border transition-colors ${isQ2 ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-800' : 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800'}`}>
                <h3 className={`font-bold mb-2 flex items-center gap-2 ${isQ2 ? 'text-orange-700 dark:text-orange-300' : 'text-green-700 dark:text-green-300'}`}>
                    <span>Step 2: Check Quadrant</span>
                    {isQ2 ? <span>⚠️ Adjustment Needed</span> : <span>✅ No Adjustment</span>}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {isQ2 
                        ? "Since x is negative, the calculator thinks you are in Q4 (or gives a negative angle). You must ADD 180°."
                        : "Since x and y are positive, the calculator answer is the correct standard angle."
                    }
                </p>

                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">Final Calculation</div>
                    {isQ2 ? (
                        <div className="flex items-center gap-2 font-mono font-bold text-orange-600">
                            <span>{calcAngleDeg.toFixed(1)}°</span>
                            <span>+ 180°</span>
                            <span>=</span>
                            <span className="text-xl border-b-2 border-orange-500">{trueAngleDeg.toFixed(1)}°</span>
                        </div>
                    ) : (
                        <div className="font-mono font-bold text-green-600 text-xl">
                            <InlineMath>{`\\theta = ${calcAngleDeg.toFixed(1)} ^\\circ`}</InlineMath>
                        </div>
                    )}
                </div>
            </div>

            {/* Tip */}
            <div className="flex gap-3 items-start text-sm text-slate-500">
                <span className="text-xl">💡</span>
                <p>
                    Always draw a quick sketch! If your vector points Left-and-Up (Q2), your angle must be between 90° and 180°.
                </p>
            </div>

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