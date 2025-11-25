import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function MagnitudeFromGraphSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Vector State (Head position in grid units)
  const [vector, setVector] = useState({ x: 4, y: 3 }); 
  
  // Grid settings
  const GRID_SIZE = 40; // Pixels per unit
  const AXIS_CENTER = 200; // Center of 400x400 SVG

  // Calculations
  const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = {
    id: 'magnitude-graph-explore',
    conceptId: 'magnitude-graph',
    conceptName: 'Magnitude from Graph',
    type: 'learning',
    description: 'Visualizing vector magnitude using the Pythagorean theorem on a graph.'
  };

  // Drag Logic
  // We track the drag delta in pixels and convert it to grid units
  // We clamp the values between -4 and 4 to keep it inside the visible grid
  const onDrag = (_: any, info: any) => {
    // We update state based on drag delta relative to the CURRENT state
    // Note: In a production app, dragging SVG elements usually requires a ref to the container
    // to calculate absolute coordinates. For this snippet, we use a simplified relative approach.
    
    // However, to make it robust without complex refs in this snippet, 
    // we can use the `info.point` if we knew the offset, OR just rely on the visual feedback.
    
    // Let's use a simplified approach: 
    // We assume the drag movement corresponds 1:1 to pixels.
    setVector(prev => {
      const dxUnits = info.delta.x / GRID_SIZE;
      const dyUnits = -info.delta.y / GRID_SIZE; // Inverted Y axis
      
      let newX = prev.x + dxUnits;
      let newY = prev.y + dyUnits;
      
      // Clamp to grid boundaries (-4.5 to 4.5)
      newX = Math.max(-4.5, Math.min(4.5, newX));
      newY = Math.max(-4.5, Math.min(4.5, newY));
      
      return { x: newX, y: newY };
    });
  };

  const onDragEnd = () => {
    // Snap to nearest 0.5 for cleaner numbers, but strictly integer is easier for students
    setVector(prev => ({
      x: Math.round(prev.x),
      y: Math.round(prev.y)
    }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY (40%)                 */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Magnitude from Graph </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
            The <strong>magnitude</strong> (length) of a vector on a graph is simply the hypotenuse of a right-angled triangle formed by its components.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* 1. The Pythagorean Connection */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
               <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-3">The Pythagorean Connection</h3>
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 opacity-80">
                     {/* Mini Triangle SVG Icon */}
                     <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible">
                        <path d="M0,40 L30,40 L30,10 Z" fill="none" stroke="#64748b" strokeWidth="2" />
                        <line x1="0" y1="40" x2="30" y2="40" stroke="#F97316" strokeWidth="3" />
                        <line x1="30" y1="40" x2="30" y2="10" stroke="#10B981" strokeWidth="3" />
                        <line x1="0" y1="40" x2="30" y2="10" stroke="#3B82F6" strokeWidth="3" />
                     </svg>
                  </div>
                  <div className="flex-1 text-sm">
                     <BlockMath>{`c^2 = a^2 + b^2`}</BlockMath>
                     <p className="text-xs text-slate-500 mt-1">
                        Here, <InlineMath>{`c = |\\vec{v}|`}</InlineMath>, <InlineMath>{`a = v_x`}</InlineMath>, and <InlineMath>{`b = v_y`}</InlineMath>.
                     </p>
                  </div>
               </div>
            </div>

            {/* 2. Key Insight: Negatives */}
            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
               <div className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">⚠️</span>
                  <div>
                    <h3 className="font-bold text-amber-800 dark:text-amber-200 text-sm mb-1">Negative Direction?</h3>
                    <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                      Even if a component is negative (pointing left or down), <strong>squaring it makes it positive</strong>.
                    </p>
                    <div className="mt-2 font-mono text-xs bg-white dark:bg-black/20 p-2 rounded inline-block text-slate-600 dark:text-slate-300">
                      (-3)² = 9
                    </div>
                  </div>
               </div>
            </div>

            {/* 3. Steps */}
            <div>
               <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Algorithm</h3>
               <ol className="list-decimal ml-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>Count horizontal units (<InlineMath>v_x</InlineMath>).</li>
                  <li>Count vertical units (<InlineMath>v_y</InlineMath>).</li>
                  <li>Calculate: <InlineMath>{`\\sqrt{v_x^2 + v_y^2}`}</InlineMath></li>
               </ol>
            </div>

        </div>
      </div>


      {/* ========================================= */}
      {/* RIGHT COLUMN: VISUALS (60%)               */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-4 h-full">
        
        {/* TOP RIGHT: ANIMATION */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[350px] group">
            
            {/* Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-mag" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`} fill="none" stroke="#475569" strokeOpacity="0.3" strokeWidth="1"/>
                </pattern>
                <marker id="arrow-mag" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M2,2 L10,6 L2,10 L6,6 L2,2" fill="#3B82F6" />
                </marker>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid-mag)" />
              
              {/* Axes */}
              <line x1={AXIS_CENTER} y1="0" x2={AXIS_CENTER} y2="400" stroke="#94a3b8" strokeWidth="2" strokeOpacity="0.5" />
              <line x1="0" y1={AXIS_CENTER} x2="400" y2={AXIS_CENTER} stroke="#94a3b8" strokeWidth="2" strokeOpacity="0.5" />
              
              {/* --- DYNAMIC CONTENT --- */}
              <g transform={`translate(${AXIS_CENTER}, ${AXIS_CENTER})`}>
                
                {/* 1. Triangle Legs (Components) */}
                <line 
                  x1={0} y1={0} 
                  x2={vector.x * GRID_SIZE} y2={0} 
                  stroke="#F97316" strokeWidth="4" strokeOpacity="0.8" strokeLinecap="round"
                />
                <line 
                  x1={vector.x * GRID_SIZE} y1={0} 
                  x2={vector.x * GRID_SIZE} y2={-vector.y * GRID_SIZE} 
                  stroke="#10B981" strokeWidth="4" strokeOpacity="0.8" strokeLinecap="round"
                />

                {/* 2. The Vector (Hypotenuse) */}
                <line 
                  x1="0" y1="0" 
                  x2={vector.x * GRID_SIZE} 
                  y2={-vector.y * GRID_SIZE} 
                  stroke="#3B82F6" 
                  strokeWidth="5" 
                  markerEnd="url(#arrow-mag)" 
                />

                {/* 3. Labels on Graph */}
                <text x={vector.x * GRID_SIZE / 2} y={vector.y > 0 ? 25 : -15} textAnchor="middle" fill="#F97316" fontWeight="bold" fontSize="16" style={{textShadow: '0 2px 4px black'}}>
                  {Math.abs(Math.round(vector.x))}
                </text>
                <text 
                  x={vector.x * GRID_SIZE + (vector.x > 0 ? 20 : -20)} 
                  y={-vector.y * GRID_SIZE / 2} 
                  dominantBaseline="middle" 
                  textAnchor="middle" 
                  fill="#10B981" 
                  fontWeight="bold"
                  fontSize="16"
                  style={{textShadow: '0 2px 4px black'}}
                >
                  {Math.abs(Math.round(vector.y))}
                </text>

              </g>
            </svg>

            {/* Draggable Handle */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={onDrag}
              onDragEnd={onDragEnd}
              className="absolute w-12 h-12 rounded-full cursor-move flex items-center justify-center group z-10"
              style={{
                left: AXIS_CENTER + (vector.x * GRID_SIZE) - 24,
                top: AXIS_CENTER - (vector.y * GRID_SIZE) - 24
              }}
            >
               {/* Visual Target */}
               <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 group-hover:ring-blue-500/50 transition-all shadow-[0_0_15px_rgba(59,130,246,0.8)] border border-white" />
            </motion.div>
            
            <div className="absolute top-4 right-4 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700 pointer-events-none">
               Drag vector head
            </div>

        </div>

        {/* BOTTOM RIGHT: LIVE CALCULATION */}
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
           <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* Inputs */}
              <div className="flex gap-6 text-center">
                 <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Horizontal (x)</div>
                    <div className="text-xl font-mono font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded">
                       {Math.round(vector.x)}
                    </div>
                 </div>
                 <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Vertical (y)</div>
                    <div className="text-xl font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded">
                       {Math.round(vector.y)}
                    </div>
                 </div>
              </div>

              {/* Equation */}
              <div className="hidden sm:block text-slate-300 dark:text-slate-600 text-3xl">→</div>

              {/* Result */}
              <div className="flex-1 w-full sm:w-auto bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3">
                 <div className="text-sm text-slate-500">
                    <InlineMath>{`|\\vec{v}| = \\sqrt{(${Math.round(vector.x)})^2 + (${Math.round(vector.y)})^2}`}</InlineMath>
                 </div>
                 <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    <span>=</span>
                    <span>{magnitude.toFixed(1)}</span>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="mag-from-graph"
      slideTitle="Vector magnitude from graph"
      moduleId="vectors-prerequisite"
      submoduleId="magnitude-of-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}