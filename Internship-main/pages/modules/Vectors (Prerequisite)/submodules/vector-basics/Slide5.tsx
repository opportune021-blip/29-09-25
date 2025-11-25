import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---

const toDegrees = (rad: number) => (rad * 180) / Math.PI;

export default function FindingComponentsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Vector State (Head position relative to origin)
  // Origin is at (200, 200) in our 400x400 SVG space
  const [headPos, setHeadPos] = useState({ x: 100, y: -80 }); // Initial vector: Right 100, Up 80
  const [showValues, setShowValues] = useState(true);

  // Calculations
  const vx = headPos.x;
  const vy = -headPos.y; // Invert Y because SVG y-axis is down, but math y-axis is up
  const magnitude = Math.sqrt(vx * vx + vy * vy);
  
  // Angle logic: atan2 returns -PI to PI. We want standard 0-360 positive angles.
  let angleRad = Math.atan2(vy, vx);
  if (angleRad < 0) angleRad += 2 * Math.PI;
  const angleDeg = toDegrees(angleRad);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = {
    id: 'finding-components-explore',
    conceptId: 'vector-components',
    conceptName: 'Vector Components',
    type: 'learning',
    description: 'Interactive visualization of vector decomposition into x and y components.'
  };

  // Drag handler for the vector head
  const handleDrag = (event: any, info: any) => {
    // Current SVG center is roughly where we want to base coordinates
    // But since the drag is relative to the parent div, we update state based on deltas usually
    // OR easier: use drag constraints and update state onDrag
    setHeadPos(prev => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y
    }));
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: VISUALIZATION */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
          
          {/* Grid Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
            <defs>
              <pattern id="grid-comp" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
              </pattern>
              <marker id="arrowhead-main" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
              </marker>
              <marker id="arrowhead-x" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#F97316" /> {/* Orange */}
              </marker>
              <marker id="arrowhead-y" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#10B981" /> {/* Emerald */}
              </marker>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-comp)" className="text-slate-400" />
            
            {/* Axes */}
            <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
            
            {/* Coordinate Group translated to Center (200, 200) */}
            <g transform="translate(200, 200)">
              
              {/* Projection Lines (Dashed) */}
              <line x1={headPos.x} y1={0} x2={headPos.x} y2={headPos.y} stroke="#94a3b8" strokeDasharray="5,5" />
              <line x1={0} y1={headPos.y} x2={headPos.x} y2={headPos.y} stroke="#94a3b8" strokeDasharray="5,5" />

              {/* X Component Vector */}
              <line 
                x1="0" y1="0" 
                x2={headPos.x} y2="0" 
                stroke="#F97316" 
                strokeWidth="4" 
                markerEnd="url(#arrowhead-x)"
                opacity={0.8}
              />
              
              {/* Y Component Vector */}
              <line 
                x1="0" y1="0" 
                x2="0" y2={headPos.y} 
                stroke="#10B981" 
                strokeWidth="4" 
                markerEnd="url(#arrowhead-y)"
                opacity={0.8}
              />

              {/* Main Vector */}
              <line 
                x1="0" y1="0" 
                x2={headPos.x} y2={headPos.y} 
                stroke="#3B82F6" 
                strokeWidth="5" 
                markerEnd="url(#arrowhead-main)" 
              />
              
              {/* Angle Arc */}
              <path 
                d={`M 30 0 A 30 30 0 ${Math.abs(angleDeg) > 180 ? 1 : 0} 0 ${30 * Math.cos(angleRad)} ${-30 * Math.sin(angleRad)}`}
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                transform="scale(1, -1)" // Flip Y for arc calc ease
              />
              
              {/* Labels */}
              {showValues && (
                <>
                  <text x={headPos.x / 2} y="20" textAnchor="middle" fill="#F97316" fontWeight="bold" fontSize="14">
                    <tspan>v</tspan><tspan baselineShift="sub" fontSize="10">x</tspan> = {vx.toFixed(0)}
                  </text>
                  <text x="-10" y={headPos.y / 2} textAnchor="end" dominantBaseline="middle" fill="#10B981" fontWeight="bold" fontSize="14">
                    <tspan>v</tspan><tspan baselineShift="sub" fontSize="10">y</tspan> = {vy.toFixed(0)}
                  </text>
                  <text x="40" y="-10" fill="#64748b" fontSize="12">θ</text>
                </>
              )}

            </g>
          </svg>

          {/* Interactive Draggable Head */}
          {/* We position this div exactly where the vector head is */}
          <motion.div
            drag
            dragMomentum={false}
            onDrag={handleDrag}
            className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-blue-500/20 hover:bg-blue-500/40 cursor-pointer flex items-center justify-center border border-blue-400 shadow-lg z-10"
            style={{ 
              left: 200 + headPos.x, 
              top: 200 + headPos.y 
            }}
          >
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
          </motion.div>
          
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
            Drag the blue dot to change <InlineMath>{`\\vec{v}`}</InlineMath>
          </div>

        </div>

        {/* RIGHT: THEORY & MATH */}
        <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Breaking it Down</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Every diagonal vector is just a combination of a horizontal step (<span className="text-orange-500 font-bold">x-component</span>) and a vertical step (<span className="text-emerald-500 font-bold">y-component</span>).
            </p>
          </div>

          <div className="flex-grow space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-2 border-b pb-2">Component Formulas</h3>
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold">cos</div>
                  <div>
                    <div className="text-slate-500">Horizontal Component</div>
                    <BlockMath>{`v_x = |\\vec{v}| \\cos(\\theta)`}</BlockMath>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-bold">sin</div>
                  <div>
                    <div className="text-slate-500">Vertical Component</div>
                    <BlockMath>{`v_y = |\\vec{v}| \\sin(\\theta)`}</BlockMath>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Calculation */}
            <div className="border-t pt-4 border-slate-100 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Live Values</h3>
              <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span className="text-blue-600 font-bold">|v|</span> : {magnitude.toFixed(1)}
                </div>
                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded">
                  <span className="text-slate-600 dark:text-slate-300 font-bold">θ</span> : {angleDeg.toFixed(1)}°
                </div>
                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                  <span className="text-orange-600 font-bold">v<sub className="text-[10px]">x</sub></span> : {vx.toFixed(1)}
                </div>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-600 font-bold">v<sub className="text-[10px]">y</sub></span> : {vy.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between">
               <label className="flex items-center gap-2 cursor-pointer select-none">
                 <input 
                   type="checkbox" 
                   checked={showValues} 
                   onChange={(e) => setShowValues(e.target.checked)}
                   className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                 />
                 <span className="text-sm text-slate-600 dark:text-slate-400">Show numeric labels</span>
               </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="finding-components"
      slideTitle="Finding the components of a vector"
      moduleId="vectors-prerequisite"
      submoduleId="vector-basics"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}