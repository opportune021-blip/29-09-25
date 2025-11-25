import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- HELPERS ---

const toDegrees = (rad: number) => (rad * 180) / Math.PI;

export default function FindingComponentsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Head position relative to origin (200, 200)
  const [headPos, setHeadPos] = useState({ x: 100, y: -80 }); // Initial: Right & Up
  const [showValues, setShowValues] = useState(true);

  // --- MATH CALCULATIONS ---
  // In SVG, +y is down. In standard math, +y is up.
  const vx = headPos.x;
  const vy = -headPos.y; // Invert for math
  
  const magnitude = Math.sqrt(vx * vx + vy * vy);
  
  // Angle for math display (standard position 0-360)
  let angleRad = Math.atan2(vy, vx);
  if (angleRad < 0) angleRad += 2 * Math.PI;
  const angleDeg = toDegrees(angleRad);

  // Quadrant Detection for Theory
  const isLeft = vx < 0;
  const isDown = vy < 0;

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

  const handleDrag = (_: any, info: any) => {
    setHeadPos(prev => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y
    }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* ========================================= */}
        {/* LEFT COLUMN: THEORY & INSIGHTS (40%)     */}
        {/* ========================================= */}
        <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex-shrink-0">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Resolving Vectors</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Breaking a diagonal path into independent steps.
            </p>
          </div>

          {/* Scrollable Theory Content */}
          <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* 1. The Shadow Analogy */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
               <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-2 flex items-center gap-2">
                 <span>💡</span> The "Shadow" Analogy
               </h3>
               <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                 Think of the vector as a stick.
                 <br/>
                 The <span className="text-orange-600 font-bold">x-component</span> is its shadow on the floor (Sun overhead).
                 <br/>
                 The <span className="text-emerald-600 font-bold">y-component</span> is its shadow on the wall (Sun from the side).
               </p>
            </div>

            {/* 2. Formulas */}
            <div>
               <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Mathematical Definition</h3>
               <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 font-bold text-xs">cos</div>
                        <span className="text-sm text-slate-500">Horizontal</span>
                     </div>
                     <BlockMath>{`v_x = |\\vec{v}| \\cos \\theta`}</BlockMath>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 font-bold text-xs">sin</div>
                        <span className="text-sm text-slate-500">Vertical</span>
                     </div>
                     <BlockMath>{`v_y = |\\vec{v}| \\sin \\theta`}</BlockMath>
                  </div>
               </div>
            </div>

            {/* 3. Dynamic Sign Convention Insight */}
            {/* This block highlights based on where the user drags the vector */}
            <div className={`p-4 rounded-lg border-l-4 transition-colors ${
                (isLeft || isDown) ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-500' : 'bg-slate-50 dark:bg-slate-900 border-slate-300'
            }`}>
               <h3 className="font-bold text-sm mb-1 text-slate-800 dark:text-slate-200">Direction & Signs</h3>
               {(!isLeft && !isDown) ? (
                 <p className="text-sm text-slate-600 dark:text-slate-400">
                   In the first quadrant (up and right), both <InlineMath>v_x</InlineMath> and <InlineMath>v_y</InlineMath> are <strong>positive</strong>.
                 </p>
               ) : (
                 <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc ml-4 space-y-1">
                    {isLeft && <li><InlineMath>v_x</InlineMath> is <strong>negative</strong> because it points LEFT.</li>}
                    {isDown && <li><InlineMath>v_y</InlineMath> is <strong>negative</strong> because it points DOWN.</li>}
                 </ul>
               )}
            </div>

            {/* 4. Verification */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
               <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Pythagorean Check:</span>
                  <span><InlineMath>{`\\sqrt{(${vx.toFixed(0)})^2 + (${vy.toFixed(0)})^2} \\approx ${magnitude.toFixed(0)}`}</InlineMath></span>
               </div>
            </div>

          </div>
          
          {/* Footer controls */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex justify-end flex-shrink-0">
             <label className="flex items-center gap-2 cursor-pointer select-none">
               <input 
                 type="checkbox" 
                 checked={showValues} 
                 onChange={(e) => setShowValues(e.target.checked)}
                 className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
               />
               <span className="text-sm text-slate-600 dark:text-slate-400">Show labels on animation</span>
             </label>
          </div>

        </div>


        {/* ========================================= */}
        {/* RIGHT COLUMN: INTERACTIVE ANIMATION (60%) */}
        {/* ========================================= */}
        <div className="lg:w-7/12 flex flex-col gap-4 h-full">
            
            {/* SVG Animation Container */}
            <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[400px] group">
              
              {/* Dark Grid Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center center' }}>
              </div>

              {/* Axes */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-slate-700"></div> {/* X Axis */}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-full w-0.5 bg-slate-700"></div> {/* Y Axis */}
              </div>

              {/* SVG Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                <defs>
                  <marker id="arrowhead-main" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                  </marker>
                  <marker id="arrowhead-x" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#F97316" />
                  </marker>
                  <marker id="arrowhead-y" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
                  </marker>
                </defs>
                
                {/* Visual Group (Centered at 200,200) */}
                <g transform="translate(200, 200)">
                  
                  {/* Projection Lines (Dashed) */}
                  <line x1={headPos.x} y1={0} x2={headPos.x} y2={headPos.y} stroke="#475569" strokeDasharray="5,5" opacity="0.8" />
                  <line x1={0} y1={headPos.y} x2={headPos.x} y2={headPos.y} stroke="#475569" strokeDasharray="5,5" opacity="0.8" />

                  {/* X Component Vector (Orange) */}
                  <line 
                    x1="0" y1="0" x2={headPos.x} y2="0" 
                    stroke="#F97316" strokeWidth="4" markerEnd="url(#arrowhead-x)" opacity={0.9}
                  />
                  
                  {/* Y Component Vector (Emerald) */}
                  <line 
                    x1="0" y1="0" x2="0" y2={headPos.y} 
                    stroke="#10B981" strokeWidth="4" markerEnd="url(#arrowhead-y)" opacity={0.9}
                  />

                  {/* Main Vector (Blue) */}
                  <line 
                    x1="0" y1="0" x2={headPos.x} y2={headPos.y} 
                    stroke="#3B82F6" strokeWidth="5" markerEnd="url(#arrowhead-main)" 
                  />
                  
                  {/* Angle Arc */}
                  <path 
                    d={`M 40 0 A 40 40 0 ${Math.abs(angleDeg) > 180 ? 1 : 0} 0 ${40 * Math.cos(angleRad)} ${-40 * Math.sin(angleRad)}`}
                    fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.5"
                    transform="scale(1, -1)" 
                  />
                  
                  {/* Labels */}
                  {showValues && (
                    <>
                      <text x={headPos.x / 2} y={headPos.y > 0 ? -15 : 25} textAnchor="middle" fill="#F97316" fontWeight="bold" fontSize="16" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)'}}>
                        <tspan>v</tspan><tspan baselineShift="sub" fontSize="12">x</tspan>
                      </text>
                      <text x={headPos.x > 0 ? -20 : 20} y={headPos.y / 2} textAnchor="middle" dominantBaseline="middle" fill="#10B981" fontWeight="bold" fontSize="16" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)'}}>
                        <tspan>v</tspan><tspan baselineShift="sub" fontSize="12">y</tspan>
                      </text>
                    </>
                  )}
                </g>
              </svg>

              {/* Draggable Handle (Framer Motion) */}
              <motion.div
                drag
                dragMomentum={false}
                onDrag={handleDrag}
                // Center the drag handle on the vector tip
                style={{ left: 200 + headPos.x, top: 200 + headPos.y, x: '-50%', y: '-50%' }}
                className="absolute w-12 h-12 rounded-full cursor-move flex items-center justify-center group z-10"
              >
                {/* Visual Hit Area */}
                <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 group-hover:ring-blue-500/50 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/50" />
              </motion.div>
              
              <div className="absolute top-4 right-4 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur border border-slate-700">
                 Drag the blue dot
              </div>
            </div>

            {/* Quick Live Values Bar (Dark Theme) */}
            <div className="grid grid-cols-4 gap-2 text-xs sm:text-sm font-mono text-center">
               <div className="bg-blue-950/50 text-blue-300 p-3 rounded-lg border border-blue-900/50 shadow-sm">
                  <div className="opacity-70 text-[10px] uppercase mb-1">Magnitude</div>
                  |v| = {magnitude.toFixed(0)}
               </div>
               <div className="bg-slate-800 text-slate-300 p-3 rounded-lg border border-slate-700 shadow-sm">
                  <div className="opacity-70 text-[10px] uppercase mb-1">Angle</div>
                  θ = {angleDeg.toFixed(0)}°
               </div>
               <div className="bg-orange-950/50 text-orange-300 p-3 rounded-lg border border-orange-900/50 shadow-sm">
                  <div className="opacity-70 text-[10px] uppercase mb-1">X-Comp</div>
                  vx = {vx.toFixed(0)}
               </div>
               <div className="bg-emerald-950/50 text-emerald-300 p-3 rounded-lg border border-emerald-900/50 shadow-sm">
                 <div className="opacity-70 text-[10px] uppercase mb-1">Y-Comp</div>
                  vy = {vy.toFixed(0)}
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