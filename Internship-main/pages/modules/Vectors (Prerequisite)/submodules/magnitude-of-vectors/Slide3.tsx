import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function MagnitudeFromPointsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Coordinates of Initial (A) and Terminal (B) points
  // Using simple integer units (-6 to 6 range typically)
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

  // Generic Drag Handler for Points (with snapping)
  const createDragHandler = (setter: React.Dispatch<React.SetStateAction<{x: number, y: number}>>) => {
    return (_: any, info: any) => {
      const deltaX = info.delta.x / GRID_SCALE;
      const deltaY = -info.delta.y / GRID_SCALE; // Invert Y for math coords

      setter(prev => {
        // We update state smoothly for drag, but usually, we want to snap to integers
        // For this demo, we won't snap strictly during drag, but we will round values for rendering/math
        // To make it feel responsive, we'd need a separate "visual" state vs "logic" state.
        // Simplified approach: Update state based on accumulated delta, clamp to grid.
        
        // Actually, let's just use the visual position for logic to keep code simple:
        // We assume the user drags and we re-calculate.
        // BETTER UX: Just track the integer position changes.
        return prev; // We rely on the specialized update below
      });
    };
  };
  
  // Actually, standard Framer Motion drag updates visual X/Y, not React state. 
  // We need to sync them.
  // Simplified "Snap" Drag Logic:
  const updatePoint = (point: 'A' | 'B', info: any) => {
    const pX = info.point.x; // Page coordinates... tricky inside nested divs.
    // Let's use delta accumulation on the state directly.
    
    const dX = info.delta.x;
    const dY = info.delta.y;

    // We accumulate pixel changes and only update "Unit" state when a threshold is crossed?
    // No, let's just use the onDragEnd to snap to the nearest integer for clean math.
    // While dragging, we let the user see the motion.
  };
  
  // FINAL DRAG STRATEGY for clean code:
  // We use a custom drag handler that snaps the *Result* to the grid on release.
  // While dragging, we update a "live" value if we want real-time, but for the Formula slide,
  // distinct integer steps are better.
  
  // Let's use the same logic as previous slides: Drag updates state directly based on grid size steps?
  // No, let's use a cleaner approach:
  // We render the dots at `coord * scale`.
  // We listen to `onDrag` to update `coord`.
  
  const onDragPoint = (point: 'A' | 'B', info: any) => {
     const setter = point === 'A' ? setPointA : setPointB;
     
     setter(prev => {
        // Calculate new pixel position
        const currentPixelX = prev.x * GRID_SCALE;
        const currentPixelY = -prev.y * GRID_SCALE;
        
        const newPixelX = currentPixelX + info.delta.x;
        const newPixelY = currentPixelY + info.delta.y;
        
        // Convert back to grid units
        let newX = newPixelX / GRID_SCALE;
        let newY = -newPixelY / GRID_SCALE;
        
        // Clamp to avoid going off screen (-6 to 6)
        newX = Math.max(-6, Math.min(6, newX));
        newY = Math.max(-6, Math.min(6, newY));
        
        return { x: newX, y: newY };
     });
  };

  const onDragEnd = (point: 'A' | 'B') => {
    const setter = point === 'A' ? setPointA : setPointB;
    setter(prev => ({ x: Math.round(prev.x), y: Math.round(prev.y) }));
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Distance Formula (Initial & Terminal Points)</h2>
          <p className="text-slate-600 dark:text-slate-400">
            If a vector starts at <InlineMath>{`A(x_1, y_1)`}</InlineMath> and ends at <InlineMath>{`B(x_2, y_2)`}</InlineMath>, 
            we find the components by subtracting coordinates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Graph */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
             
            {/* Legend Overlay */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded shadow text-xs">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Initial Point A</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded shadow text-xs">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Terminal Point B</span>
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-dist" width={GRID_SCALE} height={GRID_SCALE} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID_SCALE} 0 L 0 0 0 ${GRID_SCALE}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="arrow-dist" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dist)" className="text-slate-400" />
              
              {/* Axes */}
              <line x1={CENTER} y1="0" x2={CENTER} y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              <line x1="0" y1={CENTER} x2="400" y2={CENTER} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

              <g transform={`translate(${CENTER}, ${CENTER})`}>
                
                {/* Projection Lines (The Triangle) */}
                <path 
                    d={`M ${pointA.x * GRID_SCALE} ${-pointA.y * GRID_SCALE} L ${pointB.x * GRID_SCALE} ${-pointA.y * GRID_SCALE} L ${pointB.x * GRID_SCALE} ${-pointB.y * GRID_SCALE}`}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                />

                {/* The Vector */}
                <line 
                  x1={pointA.x * GRID_SCALE} y1={-pointA.y * GRID_SCALE} 
                  x2={pointB.x * GRID_SCALE} y2={-pointB.y * GRID_SCALE} 
                  stroke="#3B82F6" strokeWidth="4" 
                  markerEnd="url(#arrow-dist)" 
                />

                {/* Point A (Orange) */}
                <circle cx={pointA.x * GRID_SCALE} cy={-pointA.y * GRID_SCALE} r="5" fill="#F97316" />
                
                {/* Point B (Blue) */}
                <circle cx={pointB.x * GRID_SCALE} cy={-pointB.y * GRID_SCALE} r="5" fill="#3B82F6" />

                {/* Labels */}
                <text x={(pointA.x * GRID_SCALE + pointB.x * GRID_SCALE) / 2} y={-pointA.y * GRID_SCALE + 20} textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="bold">
                    <tspan>Δx = {Math.round(dx)}</tspan>
                </text>
                <text x={pointB.x * GRID_SCALE + 15} y={(-pointA.y * GRID_SCALE + -pointB.y * GRID_SCALE) / 2} dominantBaseline="middle" fontSize="12" fill="#64748b" fontWeight="bold">
                    <tspan>Δy = {Math.round(dy)}</tspan>
                </text>
              </g>
            </svg>

            {/* Draggable A */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={(_, i) => onDragPoint('A', i)}
              onDragEnd={() => onDragEnd('A')}
              className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full bg-orange-500/10 hover:bg-orange-500/30 border border-orange-500 cursor-move z-20 flex items-center justify-center"
              style={{ left: CENTER + pointA.x * GRID_SCALE, top: CENTER - pointA.y * GRID_SCALE }}
            >
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
            </motion.div>

            {/* Draggable B */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={(_, i) => onDragPoint('B', i)}
              onDragEnd={() => onDragEnd('B')}
              className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full bg-blue-500/10 hover:bg-blue-500/30 border border-blue-500 cursor-move z-20 flex items-center justify-center"
              style={{ left: CENTER + pointB.x * GRID_SCALE, top: CENTER - pointB.y * GRID_SCALE }}
            >
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
            </motion.div>

          </div>

          {/* RIGHT: Math Panel */}
          <div className="flex flex-col gap-6 h-full">
            
            {/* Coordinate Inputs (Read Only or Editable if we added inputs) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-200 dark:border-orange-800 text-center">
                    <div className="text-xs font-bold text-orange-700 dark:text-orange-300 uppercase mb-1">Initial Point (A)</div>
                    <div className="text-xl font-mono text-slate-800 dark:text-slate-100">
                        ({Math.round(pointA.x)}, {Math.round(pointA.y)})
                    </div>
                    <div className="text-xs text-slate-400 mt-1">(x₁, y₁)</div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                    <div className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase mb-1">Terminal Point (B)</div>
                    <div className="text-xl font-mono text-slate-800 dark:text-slate-100">
                        ({Math.round(pointB.x)}, {Math.round(pointB.y)})
                    </div>
                    <div className="text-xs text-slate-400 mt-1">(x₂, y₂)</div>
                </div>
            </div>

            {/* Step-by-Step Calculation */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex-grow">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 border-b pb-2">Magnitude Calculation</h3>
                
                <div className="space-y-4 text-sm md:text-base">
                    {/* Step 1: Find Differences */}
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-xs uppercase font-bold">1. Find Components (Subtraction)</span>
                        <div className="grid grid-cols-1 gap-2 font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                            <div>
                                <span className="font-bold">x₂ - x₁</span> = {Math.round(pointB.x)} - ({Math.round(pointA.x)}) = <span className="font-bold text-slate-800 dark:text-white">{Math.round(dx)}</span>
                            </div>
                            <div>
                                <span className="font-bold">y₂ - y₁</span> = {Math.round(pointB.y)} - ({Math.round(pointA.y)}) = <span className="font-bold text-slate-800 dark:text-white">{Math.round(dy)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Distance Formula */}
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-xs uppercase font-bold">2. Apply Formula</span>
                        <div className="text-center py-2">
                             <BlockMath>{`|\\vec{v}| = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}`}</BlockMath>
                        </div>
                    </div>

                    {/* Step 3: Result */}
                    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg transform transition-all">
                        <div className="text-xs opacity-75 uppercase font-bold mb-1">Final Magnitude</div>
                        <div className="flex items-center justify-between">
                            <InlineMath>
                                {`\\sqrt{(${Math.round(dx)})^2 + (${Math.round(dy)})^2}`}
                            </InlineMath>
                            <span className="text-2xl font-bold">
                                = {magnitude.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
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