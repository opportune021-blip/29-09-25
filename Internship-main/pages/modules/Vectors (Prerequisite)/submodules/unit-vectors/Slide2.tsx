import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function FindingUnitVectorSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: The arbitrary vector v
  const [vec, setVec] = useState({ x: 3, y: 4 });

  // Config
  const GRID = 40; // Pixels per unit
  const CENTER_X = 200;
  const CENTER_Y = 250;

  // Calculations
  const magnitude = Math.sqrt(vec.x**2 + vec.y**2);
  const unitVec = {
    x: vec.x / magnitude,
    y: vec.y / magnitude
  };

  const slideInteraction: Interaction = {
    id: 'finding-unit-vector-explore',
    conceptId: 'normalization',
    conceptName: 'Normalization (Unit Vector)',
    type: 'learning',
    description: 'Interactive normalization of a vector.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Drag Logic
  const handleDrag = (_: any, info: any) => {
    // Update based on drag delta relative to current state isn't robust without tracking start pos
    // Simplified for this snippet: Accumulate delta
    // In a real app, consider tracking drag offset or using a ref for base position
    setVec(prev => ({
        x: prev.x + info.delta.x / GRID,
        y: prev.y - info.delta.y / GRID
    }));
  };
  
  // Snap on release for cleaner numbers
  const handleDragEnd = () => {
    setVec(prev => ({
        x: Math.round(prev.x) || 1, // Avoid 0 vector
        y: Math.round(prev.y) || 1
    }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: VISUALIZATION (50%)          */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col h-full gap-6">
        
        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative flex-grow overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[400px]">
            
            <div className="absolute top-4 left-4 z-10 bg-slate-800/90 px-3 py-2 rounded-lg border border-slate-700 shadow-sm text-xs">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="text-blue-200">Vector <InlineMath>{"\\vec{v}"}</InlineMath></span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span className="text-orange-200">Unit Vector <InlineMath>{"\\hat{u}"}</InlineMath></span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-600 text-slate-400">
                    Dashed Circle: Magnitude = 1
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 500">
              <defs>
                <pattern id="grid-norm" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeOpacity="0.5" strokeWidth="1"/>
                </pattern>
                <marker id="head-v-norm" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                <marker id="head-u-norm" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#F97316" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-norm)" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="500" stroke="#475569" strokeWidth="2" />
              <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="#475569" strokeWidth="2" />

              <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {/* Unit Circle (Show magnitude 1 boundary) */}
                <circle cx="0" cy="0" r={GRID} fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />

                {/* Main Vector v */}
                <line 
                    x1="0" y1="0" 
                    x2={vec.x * GRID} y2={-vec.y * GRID} 
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-v-norm)" 
                />
                
                {/* Unit Vector u (Overlaid on top) */}
                <motion.line 
                    animate={{ x2: unitVec.x * GRID, y2: -unitVec.y * GRID }}
                    x1="0" y1="0"
                    stroke="#F97316" strokeWidth="4" markerEnd="url(#head-u-norm)" 
                />

                {/* Labels */}
                <text x={vec.x * GRID / 2} y={-vec.y * GRID / 2 - 15} textAnchor="middle" fill="#3B82F6" fontWeight="bold" fontSize="14">
                    <InlineMath>{"\\vec{v}"}</InlineMath>
                </text>
                {/* Offset unit label slightly based on quadrant */}
                <text 
                    x={unitVec.x * GRID * 1.5 + (unitVec.x > 0 ? 10 : -10)} 
                    y={-unitVec.y * GRID * 1.5 + (unitVec.y > 0 ? -10 : 20)} 
                    textAnchor="middle" fill="#F97316" fontWeight="bold" fontSize="14"
                >
                    <InlineMath>{"\\hat{u}"}</InlineMath>
                </text>

              </g>
            </svg>

            {/* Draggable Handle for V */}
            <motion.div
                drag dragMomentum={false} onDrag={handleDrag} onDragEnd={handleDragEnd}
                className="absolute w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 border-2 border-white cursor-move z-20 flex items-center justify-center shadow-lg"
                style={{ left: CENTER_X + vec.x * GRID - 16, top: CENTER_Y - vec.y * GRID - 16 }}
            />

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: THEORY & MATH (50%)         */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Finding a Unit Vector</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                To find direction <InlineMath>{"\\hat{u}"}</InlineMath>, divide <InlineMath>{"\\vec{v}"}</InlineMath> by its length. This is called <strong>normalization</strong>.
            </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Formula */}
            <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <BlockMath>{"\\hat{u} = \\frac{\\vec{v}}{|\\vec{v}|}"}</BlockMath>
            </div>

            {/* Step 1: Magnitude */}
            <div className="relative pl-6 border-l-2 border-blue-500">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">Step 1: Find Magnitude</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Calculate the length of <InlineMath>{"\\vec{v}"}</InlineMath>.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-blue-900 dark:text-blue-100 font-mono text-sm overflow-x-auto">
                    <BlockMath>{`|\\vec{v}| = \\sqrt{${vec.x.toFixed(1)}^2 + ${vec.y.toFixed(1)}^2} = ${magnitude.toFixed(2)}`}</BlockMath>
                </div>
            </div>

            {/* Step 2: Divide */}
            <div className="relative pl-6 border-l-2 border-orange-500">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500"></div>
                <h3 className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide mb-2">Step 2: Divide Components</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Scale each component down by {magnitude.toFixed(2)}.
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded text-orange-900 dark:text-orange-100 font-mono text-sm overflow-x-auto">
                    <BlockMath>
                        {`\\hat{u} = \\left\\langle \\frac{${vec.x.toFixed(0)}}{${magnitude.toFixed(2)}}, \\frac{${vec.y.toFixed(0)}}{${magnitude.toFixed(2)}} \\right\\rangle`}
                    </BlockMath>
                    <div className="mt-3 pt-2 border-t border-orange-200 dark:border-orange-800 text-center font-bold text-lg">
                         ≈ <InlineMath>{`\\langle ${unitVec.x.toFixed(3)}, ${unitVec.y.toFixed(3)} \\rangle`}</InlineMath>
                    </div>
                </div>
            </div>

            {/* Verification */}
            <div className="text-center pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Verification Check</span>
                <div className="text-xs text-slate-500 mt-1">
                    <InlineMath>{`\\sqrt{(${unitVec.x.toFixed(3)})^2 + (${unitVec.y.toFixed(3)})^2} \\approx 1.00`}</InlineMath> ✅
                </div>
            </div>

        </div>
      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="finding-unit-vector"
      slideTitle="Worked example: finding unit vector with given direction"
      moduleId="vectors-prerequisite"
      submoduleId="unit-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}