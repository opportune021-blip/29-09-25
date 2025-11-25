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
    setVec(prev => ({
        x: prev.x + info.delta.x / GRID,
        y: prev.y - info.delta.y / GRID
    }));
  };
  
  // Snap on release for cleaner numbers
  const handleDragEnd = () => {
    setVec(prev => ({
        x: Math.round(prev.x),
        y: Math.round(prev.y)
    }));
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Finding a Unit Vector</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            To find a unit vector <InlineMath>\hat{u}</InlineMath> in the same direction as <InlineMath>\vec{v}</InlineMath>, 
            we divide <InlineMath>\vec{v}</InlineMath> by its own length (magnitude). This process is called <strong>normalization</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Graph */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
            
            <svg className="w-full h-full" viewBox="0 0 400 500">
              <defs>
                <pattern id="grid-norm" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="head-v-norm" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6" /></marker>
                <marker id="head-u-norm" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#F97316" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-norm)" className="text-slate-400" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="500" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

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
                    <InlineMath>\vec{v}</InlineMath>
                </text>
                <text x={unitVec.x * GRID * 1.5} y={-unitVec.y * GRID * 1.5 + 15} textAnchor="middle" fill="#F97316" fontWeight="bold" fontSize="14">
                    <InlineMath>\hat{u}</InlineMath>
                </text>

              </g>
            </svg>

            {/* Draggable Handle for V */}
            <motion.div
                drag dragMomentum={false} onDrag={handleDrag} onDragEnd={handleDragEnd}
                className="absolute w-8 h-8 rounded-full bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500 cursor-move z-20 flex items-center justify-center"
                style={{ left: CENTER_X + vec.x * GRID - 16, top: CENTER_Y - vec.y * GRID - 16 }}
            >
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
            </motion.div>

            <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="text-xs bg-white/90 px-2 py-1 rounded text-slate-500 shadow-sm border border-orange-200">
                    <span className="text-orange-600 font-bold">Orange Circle:</span> Magnitude = 1
                </div>
            </div>

          </div>

          {/* RIGHT: Step-by-Step Math */}
          <div className="flex flex-col gap-6">
            
            {/* The Formula */}
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                <BlockMath>{`\\hat{u} = \\frac{\\vec{v}}{|\\vec{v}|}`}</BlockMath>
            </div>

            {/* Steps Container */}
            <div className="space-y-4">
                
                {/* Step 1: Find Magnitude */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Step 1: Find Magnitude</h3>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        How long is <InlineMath>\vec{v}</InlineMath>?
                    </div>
                    <div className="font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded text-blue-800 dark:text-blue-200">
                        <BlockMath>{`|\\vec{v}| = \\sqrt{${vec.x.toFixed(1)}^2 + ${vec.y.toFixed(1)}^2} = ${magnitude.toFixed(2)}`}</BlockMath>
                    </div>
                </div>

                {/* Step 2: Divide Components */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Step 2: Divide Components</h3>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Scale <InlineMath>\vec{v}</InlineMath> down by {magnitude.toFixed(2)}.
                    </div>
                    <div className="font-mono bg-slate-50 dark:bg-slate-900 p-3 rounded text-orange-800 dark:text-orange-200 overflow-x-auto">
                        <BlockMath>
                            {`\\hat{u} = \\left\\langle \\frac{${vec.x.toFixed(0)}}{${magnitude.toFixed(2)}}, \\frac{${vec.y.toFixed(0)}}{${magnitude.toFixed(2)}} \\right\\rangle`}
                        </BlockMath>
                        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-center">
                             ≈ <InlineMath>{`\\langle ${unitVec.x.toFixed(3)}, ${unitVec.y.toFixed(3)} \\rangle`}</InlineMath>
                        </div>
                    </div>
                </div>

                {/* Step 3: Verify */}
                <div className="text-center text-xs text-slate-500">
                    Check: <InlineMath>{`\\sqrt{(${unitVec.x.toFixed(3)})^2 + (${unitVec.y.toFixed(3)})^2} \\approx 1.00`}</InlineMath> ✅
                </div>

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