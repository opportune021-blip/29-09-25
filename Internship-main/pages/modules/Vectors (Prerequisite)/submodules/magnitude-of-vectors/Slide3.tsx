import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function MagnitudeFromPointsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Coordinates of Initial (A) and Terminal (B) points
  const [pointA, setPointA] = useState({ x: -3, y: -2 });
  const [pointB, setPointB] = useState({ x: 2, y: 3 });

  // Grid Config
  const GRID_SCALE = 30; // Pixels per unit
  const CENTER = 200; // SVG Center

  // Calculations
  const dx = pointB.x - pointA.x;
  const dy = pointB.y - pointA.y;
  const magnitude = Math.sqrt(dx ** 2 + dy ** 2);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = {
    id: 'magnitude-points-explore',
    conceptId: 'distance-formula',
    conceptName: 'Distance Formula Exploration',
    type: 'learning',
    description: 'Interactive visualization of the distance formula between two points.'
  };

  // Logic to update points while dragging
  const onDragPoint = (point: 'A' | 'B', info: any) => {
     const setter = point === 'A' ? setPointA : setPointB;
     
     // Note: In a real app, using delta accumulation can drift. 
     // Ideally, you'd use a ref for the start position + info.point.
     // For this stateless demo, we use a simplified accumulation with clamping.
     
     setter(prev => {
        const dxUnits = info.delta.x / GRID_SCALE;
        const dyUnits = -info.delta.y / GRID_SCALE; // Invert Y
        
        let newX = prev.x + dxUnits;
        let newY = prev.y + dyUnits;
        
        // Clamp to avoid going off screen (-6 to 6)
        newX = Math.max(-6, Math.min(6, newX));
        newY = Math.max(-6, Math.min(6, newY));
        
        return { x: newX, y: newY };
     });
  };

  // Snap to integer on release for clean math
  const onDragEnd = (point: 'A' | 'B') => {
    const setter = point === 'A' ? setPointA : setPointB;
    setter(prev => ({ x: Math.round(prev.x), y: Math.round(prev.y) }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & STEPS (40%)         */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">The Distance Formula</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Calculating magnitude when given start and end points.
            </p>
        </div>

        {/* Scrollable Theory */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Core Concept */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    A vector defined by two points is just the path between them. To find its length (magnitude), we use the distance formula:
                </p>
                <div className="text-lg py-2">
                    <BlockMath>{`|\\vec{v}| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`}</BlockMath>
                </div>
            </div>

            {/* Step 1 Explanation */}
            <div>
                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 flex items-center justify-center text-xs">1</span>
                    Find the Components
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-8">
                    Subtract the <strong>Initial Point</strong> (Start) from the <strong>Terminal Point</strong> (End).
                    <br/>
                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-1 rounded">End - Start</span> gives you the distance traveled in X and Y.
                </p>
            </div>

            {/* Step 2 Explanation */}
            <div>
                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 flex items-center justify-center text-xs">2</span>
                    Pythagorean Theorem
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-8">
                    Once you have the components (the legs of the triangle), square them, add them, and take the root.
                </p>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: VISUALS (60%)               */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* TOP RIGHT: GRAPH ANIMATION */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[350px] group">
            
            {/* Legend */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur px-2 py-1.5 rounded border border-slate-700 text-xs">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="font-bold text-slate-300">Initial (A)</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur px-2 py-1.5 rounded border border-slate-700 text-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-bold text-slate-300">Terminal (B)</span>
                </div>
            </div>

            {/* SVG Graph */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-dist" width={GRID_SCALE} height={GRID_SCALE} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID_SCALE} 0 L 0 0 0 ${GRID_SCALE}`} fill="none" stroke="#475569" strokeOpacity="0.3" strokeWidth="1"/>
                </pattern>
                <marker id="arrow-dist" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M2,2 L10,6 L2,10 L6,6 L2,2" fill="#3B82F6" />
                </marker>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid-dist)" />
              
              {/* Axes */}
              <line x1={CENTER} y1="0" x2={CENTER} y2="400" stroke="#64748b" strokeWidth="2" strokeOpacity="0.5" />
              <line x1="0" y1={CENTER} x2="400" y2={CENTER} stroke="#64748b" strokeWidth="2" strokeOpacity="0.5" />

              <g transform={`translate(${CENTER}, ${CENTER})`}>
                
                {/* Dashed Triangle Legs */}
                <path 
                    d={`M ${pointA.x * GRID_SCALE} ${-pointA.y * GRID_SCALE} L ${pointB.x * GRID_SCALE} ${-pointA.y * GRID_SCALE} L ${pointB.x * GRID_SCALE} ${-pointB.y * GRID_SCALE}`}
                    fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" opacity="0.5"
                />

                {/* The Vector */}
                <line 
                  x1={pointA.x * GRID_SCALE} y1={-pointA.y * GRID_SCALE} 
                  x2={pointB.x * GRID_SCALE} y2={-pointB.y * GRID_SCALE} 
                  stroke="#3B82F6" strokeWidth="4" 
                  markerEnd="url(#arrow-dist)" 
                />

                {/* Labels */}
                <text x={(pointA.x * GRID_SCALE + pointB.x * GRID_SCALE) / 2} y={-pointA.y * GRID_SCALE + 20} textAnchor="middle" fontSize="12" fill="#94a3b8" fontWeight="bold">
                    <tspan>Δx = {Math.round(dx)}</tspan>
                </text>
                <text x={pointB.x * GRID_SCALE + 15} y={(-pointA.y * GRID_SCALE + -pointB.y * GRID_SCALE) / 2} dominantBaseline="middle" fontSize="12" fill="#94a3b8" fontWeight="bold">
                    <tspan>Δy = {Math.round(dy)}</tspan>
                </text>
              </g>
            </svg>

            {/* Draggable Handle A (Start) */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={(_, i) => onDragPoint('A', i)}
              onDragEnd={() => onDragEnd('A')}
              className="absolute w-12 h-12 rounded-full cursor-move z-20 flex items-center justify-center group"
              style={{ left: CENTER + pointA.x * GRID_SCALE - 24, top: CENTER - pointA.y * GRID_SCALE - 24 }}
            >
               <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white ring-2 ring-orange-500/30 group-hover:scale-125 transition-transform" />
            </motion.div>

            {/* Draggable Handle B (End) */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={(_, i) => onDragPoint('B', i)}
              onDragEnd={() => onDragEnd('B')}
              className="absolute w-12 h-12 rounded-full cursor-move z-20 flex items-center justify-center group"
              style={{ left: CENTER + pointB.x * GRID_SCALE - 24, top: CENTER - pointB.y * GRID_SCALE - 24 }}
            >
               <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white ring-2 ring-blue-500/30 group-hover:scale-125 transition-transform" />
            </motion.div>

            <div className="absolute top-4 right-4 text-xs text-slate-400 bg-slate-900/50 px-2 py-1 rounded border border-slate-700">
               Drag points A & B
            </div>

        </div>

        {/* BOTTOM RIGHT: CALCULATION PANEL */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            
            {/* Step 1: Subtraction */}
            <div className="grid grid-cols-2 gap-4 mb-4">
               <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded border border-slate-100 dark:border-slate-700">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Delta X (Run)</div>
                  <div className="font-mono text-sm text-slate-600 dark:text-slate-300">
                     {Math.round(pointB.x)} - ({Math.round(pointA.x)}) = <span className="font-bold text-orange-600">{Math.round(dx)}</span>
                  </div>
               </div>
               <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded border border-slate-100 dark:border-slate-700">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Delta Y (Rise)</div>
                  <div className="font-mono text-sm text-slate-600 dark:text-slate-300">
                     {Math.round(pointB.y)} - ({Math.round(pointA.y)}) = <span className="font-bold text-blue-600">{Math.round(dy)}</span>
                  </div>
               </div>
            </div>

            {/* Step 2: Final Calc */}
            <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
               <div>
                  <div className="text-xs opacity-75 uppercase font-bold mb-1">Resulting Magnitude</div>
                  <div className="text-lg">
                     <InlineMath>{`\\sqrt{(${Math.round(dx)})^2 + (${Math.round(dy)})^2}`}</InlineMath>
                  </div>
               </div>
               <div className="text-3xl font-bold">
                  = {magnitude.toFixed(2)}
               </div>
            </div>

        </div>

      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="mag-from-points"
      slideTitle="Vector magnitude from initial & terminal points"
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