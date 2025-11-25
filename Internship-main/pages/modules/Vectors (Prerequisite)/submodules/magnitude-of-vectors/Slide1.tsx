import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function MagnitudeFromGraphSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // Vector State (Head position relative to tail at 0,0)
  const [vector, setVector] = useState({ x: 4, y: 3 }); 
  
  // Grid settings
  const GRID_SIZE = 40; // Pixels per unit
  const AXIS_CENTER = 200; // Center of SVG

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

  // Drag Handler
  // We constrain the drag to "snap" to integer grid points for cleaner math numbers
  const handleDrag = (_: any, info: any) => {
    const rawX = (info.point.x - 0); // This usually requires ref bounding rect logic
    // Simplified: We update based on delta, but we snap the STATE to integers
    // For this demo, we'll let it be smooth but display rounded numbers, 
    // OR we implement a custom drag constraint.
    // Let's stick to smooth dragging for UI feel, but math uses integers if close.
    
    // Actually, for a graph slide, snapping to grid is better for "counting units".
    // We will simulate this by using a custom drag logic or just rounding the display values.
  };

  // Improved Drag Logic:
  // We use Framer's onDrag to update a separate state, but since we are rendering SVG lines 
  // based on that state, we need to map pixels back to grid units.
  const onDrag = (_: any, info: any) => {
    // Current pixel delta
    const dxPixels = info.delta.x;
    const dyPixels = info.delta.y; // Inverted Y logic happens in rendering usually
    
    setVector(prev => {
      const newXPixels = (prev.x * GRID_SIZE) + dxPixels;
      const newYPixels = (prev.y * GRID_SIZE) - dyPixels; // Subtract because dragging UP is negative Y pixels
      
      // Convert back to units and clamp to graph bounds (-5 to 5)
      const newX = Math.max(-5, Math.min(5, newXPixels / GRID_SIZE));
      const newY = Math.max(-5, Math.min(5, newYPixels / GRID_SIZE));
      
      return { x: newX, y: newY };
    });
  };

  // Snap to integer when drag ends for nice numbers
  const onDragEnd = () => {
    setVector(prev => ({
      x: Math.round(prev.x),
      y: Math.round(prev.y)
    }));
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Finding Magnitude from a Graph</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            The magnitude (length) of a vector is just the hypotenuse of a right triangle. 
            Count the horizontal and vertical units to find it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: Interactive Graph */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
            
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-mag" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="arrow-mag" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M2,2 L10,6 L2,10 L6,6 L2,2" fill="#3B82F6" />
                </marker>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid-mag)" className="text-slate-400" />
              
              {/* Axes */}
              <line x1={AXIS_CENTER} y1="0" x2={AXIS_CENTER} y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              <line x1="0" y1={AXIS_CENTER} x2="400" y2={AXIS_CENTER} stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              
              {/* Content Group (Centered) */}
              <g transform={`translate(${AXIS_CENTER}, ${AXIS_CENTER})`}>
                
                {/* Triangle Legs */}
                <line 
                  x1={0} y1={0} 
                  x2={vector.x * GRID_SIZE} y2={0} 
                  stroke="#F97316" strokeWidth="3" strokeOpacity="0.6"
                />
                <line 
                  x1={vector.x * GRID_SIZE} y1={0} 
                  x2={vector.x * GRID_SIZE} y2={-vector.y * GRID_SIZE} 
                  stroke="#10B981" strokeWidth="3" strokeOpacity="0.6"
                />

                {/* The Vector */}
                <line 
                  x1="0" y1="0" 
                  x2={vector.x * GRID_SIZE} 
                  y2={-vector.y * GRID_SIZE} 
                  stroke="#3B82F6" 
                  strokeWidth="4" 
                  markerEnd="url(#arrow-mag)" 
                />

                {/* Labels on Graph */}
                <text x={vector.x * GRID_SIZE / 2} y="20" textAnchor="middle" fill="#F97316" fontWeight="bold">
                  {Math.abs(Math.round(vector.x))}
                </text>
                <text 
                  x={vector.x * GRID_SIZE + (vector.x > 0 ? 15 : -15)} 
                  y={-vector.y * GRID_SIZE / 2} 
                  dominantBaseline="middle" 
                  textAnchor="middle" 
                  fill="#10B981" 
                  fontWeight="bold"
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
              className="absolute w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 cursor-move shadow-lg ring-4 ring-blue-500/20 z-10"
              style={{
                left: AXIS_CENTER + (vector.x * GRID_SIZE) - 16,
                top: AXIS_CENTER - (vector.y * GRID_SIZE) - 16
              }}
            />

            <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded border text-xs text-slate-500 pointer-events-none">
              Drag to resize
            </div>

          </div>

          {/* RIGHT: Math Panel */}
          <div className="flex flex-col justify-center gap-6">
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b pb-2">Calculation</h3>
              
              <div className="space-y-6">
                
                {/* Steps */}
                <div>
                  <div className="text-sm text-slate-500 mb-1">1. Identify Components (Legs)</div>
                  <div className="flex gap-4 font-mono">
                    <span className="text-orange-600 font-bold">x = {Math.round(vector.x)}</span>
                    <span className="text-emerald-600 font-bold">y = {Math.round(vector.y)}</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500 mb-1">2. Pythagorean Theorem</div>
                  <BlockMath>
                    {`|\\vec{v}| = \\sqrt{(${Math.round(vector.x)})^2 + (${Math.round(vector.y)})^2}`}
                  </BlockMath>
                </div>

                <div>
                  <div className="text-sm text-slate-500 mb-1">3. Solve</div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between">
                    <InlineMath>
                      {`|\\vec{v}| = \\sqrt{${Math.round(vector.x**2)} + ${Math.round(vector.y**2)}}`}
                    </InlineMath>
                    <span className="text-2xl font-bold text-blue-600">
                      ≈ {magnitude.toFixed(1)}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg text-sm text-orange-800 dark:text-orange-200">
              <strong>Tip:</strong> Even if the vector points in a negative direction (left or down), squaring the number makes it positive. Length is always positive!
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