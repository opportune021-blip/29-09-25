import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function UnitVectorsIntroSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Coefficients for i-hat and j-hat
  const [xVal, setXVal] = useState(3);
  const [yVal, setYVal] = useState(2);

  // Config
  const GRID = 40; // Pixels per unit
  const CENTER_X = 100; // Offset origin for better positive quadrant view
  const CENTER_Y = 300;

  const slideInteraction: Interaction = {
    id: 'unit-vectors-intro-explore',
    conceptId: 'unit-vectors-basis',
    conceptName: 'Standard Basis Vectors',
    type: 'learning',
    description: 'Visualizing vectors as combinations of i-hat and j-hat.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & DEFINITIONS (40%)   */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                The Building Blocks: <InlineMath>{"\\hat{i}"}</InlineMath> and <InlineMath>{"\\hat{j}"}</InlineMath>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                A <strong>unit vector</strong> has a magnitude of exactly 1. We use special unit vectors to describe direction along the axes.
            </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Definitions */}
            <div className="space-y-3">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xl font-bold text-orange-600">
                        <InlineMath>{"\\hat{i}"}</InlineMath>
                    </div>
                    <div>
                        <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">"i-hat"</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                            Unit vector in x-direction <br/>
                            <InlineMath>{"\\langle 1, 0 \\rangle"}</InlineMath>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xl font-bold text-emerald-600">
                        <InlineMath>{"\\hat{j}"}</InlineMath>
                    </div>
                    <div>
                        <div className="font-bold text-slate-700 dark:text-slate-200 text-sm">"j-hat"</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                            Unit vector in y-direction <br/>
                            <InlineMath>{"\\langle 0, 1 \\rangle"}</InlineMath>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notation Rule */}
            <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2 uppercase tracking-wide">Unit Vector Notation</h3>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Any vector <InlineMath>{"\\vec{v} = \\langle x, y \\rangle"}</InlineMath> can be written as a sum of scaled unit vectors:
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 text-center">
                    <BlockMath>{"\\vec{v} = x\\hat{i} + y\\hat{j}"}</BlockMath>
                </div>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: VISUALS & CONTROLS (60%)    */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* TOP RIGHT: ANIMATION */}
        <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[350px]">
            
            {/* Grid */}
            <svg className="w-full h-full" viewBox="0 0 500 400">
                <defs>
                <pattern id="grid-unit" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                    <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeOpacity="0.5" strokeWidth="1"/>
                </pattern>
                <marker id="head-i" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#F97316" /></marker>
                <marker id="head-j" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#10B981" /></marker>
                <marker id="head-res-u" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-unit)" />
                
                {/* Axes */}
                <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="#475569" strokeWidth="2" />
                <line x1="0" y1={CENTER_Y} x2="500" y2={CENTER_Y} stroke="#475569" strokeWidth="2" />

                <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {/* The Unit Vectors (Ghosted at Origin) */}
                <line x1="0" y1="0" x2={GRID} y2="0" stroke="#F97316" strokeWidth="6" opacity="0.15" markerEnd="url(#head-i)" />
                <line x1="0" y1="0" x2="0" y2={-GRID} stroke="#10B981" strokeWidth="6" opacity="0.15" markerEnd="url(#head-j)" />

                {/* Scaled Component Vectors (Animated) */}
                <motion.line 
                    animate={{ x2: xVal * GRID }} 
                    y2="0" x1="0" y1="0"
                    stroke="#F97316" strokeWidth="3" markerEnd="url(#head-i)"
                />
                <motion.line 
                    animate={{ x1: xVal * GRID, x2: xVal * GRID, y2: -yVal * GRID }} 
                    y1="0"
                    stroke="#10B981" strokeWidth="3" markerEnd="url(#head-j)"
                    strokeDasharray="4,4" 
                />
                
                {/* Resultant Vector */}
                <motion.line 
                    animate={{ x2: xVal * GRID, y2: -yVal * GRID }} 
                    x1="0" y1="0"
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-res-u)"
                />

                {/* Labels */}
                <motion.text 
                    animate={{ x: (xVal * GRID) / 2, y: 20 }} 
                    textAnchor="middle" fill="#F97316" fontWeight="bold" fontSize="14"
                    style={{ textShadow: '0 2px 4px black' }}
                >
                    {xVal}<tspan fontSize="10" dy="-5">î</tspan>
                </motion.text>

                    <motion.text 
                    animate={{ x: xVal * GRID + 20, y: -(yVal * GRID) / 2 }} 
                    dominantBaseline="middle" fill="#10B981" fontWeight="bold" fontSize="14"
                    style={{ textShadow: '0 2px 4px black' }}
                >
                    {yVal}<tspan fontSize="10" dy="-5">ĵ</tspan>
                </motion.text>

                </g>
            </svg>

            {/* Legend */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
                <div className="text-xs bg-slate-800/90 px-2 py-1 rounded text-orange-400 shadow-sm border border-slate-700">
                    i-hat (<InlineMath>{"\\hat{i}"}</InlineMath>)
                </div>
                <div className="text-xs bg-slate-800/90 px-2 py-1 rounded text-emerald-400 shadow-sm border border-slate-700">
                    j-hat (<InlineMath>{"\\hat{j}"}</InlineMath>)
                </div>
            </div>

        </div>

        {/* BOTTOM RIGHT: CONTROLS */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 text-sm uppercase tracking-wide">Construct a Vector</h4>
            
            {/* X Control */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-orange-600 text-sm"><InlineMath>{"x"}</InlineMath> component</span>
                    <span className="font-mono bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 rounded text-sm">{xVal}</span>
                </div>
                <input 
                    type="range" min="-2" max="8" step="1" value={xVal}
                    onChange={(e) => setXVal(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
            </div>

            {/* Y Control */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-emerald-600 text-sm"><InlineMath>{"y"}</InlineMath> component</span>
                    <span className="font-mono bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-2 rounded text-sm">{yVal}</span>
                </div>
                <input 
                    type="range" min="-4" max="6" step="1" value={yVal}
                    onChange={(e) => setYVal(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
            </div>

            {/* Result Box */}
            <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-center">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Result</span>
                <div className="text-xl font-mono text-blue-600 dark:text-blue-400 font-bold mt-1">
                    <InlineMath>{`\\vec{v} = ${xVal}\\hat{i} ${yVal >= 0 ? '+' : ''} ${yVal}\\hat{j}`}</InlineMath>
                </div>
            </div>

        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="unit-vectors-intro"
      slideTitle="Unit vectors intro"
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