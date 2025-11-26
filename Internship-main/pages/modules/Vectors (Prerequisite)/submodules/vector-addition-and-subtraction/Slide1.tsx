import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function AddSubtractVectorsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Vector Head Coordinates
  const [vecA, setVecA] = useState({ x: 3, y: 2 });
  const [vecB, setVecB] = useState({ x: 1, y: -3 });
  const [mode, setMode] = useState<'add' | 'sub'>('add');
  const [showHelpers, setShowHelpers] = useState(true);

  // Config
  const GRID_SCALE = 30;
  const CENTER_X = 200; 
  const CENTER_Y = 200;

  // Calculations
  const vecResult = {
    x: mode === 'add' ? vecA.x + vecB.x : vecA.x - vecB.x,
    y: mode === 'add' ? vecA.y + vecB.y : vecA.y - vecB.y
  };

  // Negative B for visualization during subtraction
  const negB = { x: -vecB.x, y: -vecB.y };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = {
    id: 'vector-add-sub-explore',
    conceptId: 'vector-addition',
    conceptName: 'Vector Addition/Subtraction',
    type: 'learning',
    description: 'Interactive visualization of vector addition and subtraction resultants.'
  };

  // Drag Handlers
  const handleDrag = (setter: any) => (_: any, info: any) => {
    setter((prev: any) => ({
      x: prev.x + info.delta.x / GRID_SCALE,
      y: prev.y - info.delta.y / GRID_SCALE
    }));
  };

  // Render Helpers
  const toSVG = (v: {x: number, y: number}) => ({
    x: v.x * GRID_SCALE,
    y: -v.y * GRID_SCALE
  });

  const svA = toSVG(vecA);
  const svB = toSVG(vecB);
  const svNegB = toSVG(negB);
  const svRes = toSVG(vecResult);

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & CONCEPTS (40%)      */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {mode === 'add' ? 'Vector Addition' : 'Vector Subtraction'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {mode === 'add' ? 'Combining forces or paths.' : 'Finding the difference or relative position.'}
            </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Concept Explanation */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">Geometric Method</h3>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        {mode === 'add' ? (
                            <>
                                <strong className="text-blue-600">Head-to-Tail Rule:</strong>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                                    Imagine walking along vector <InlineMath>{"\\vec{A}"}</InlineMath>. From there, walk along vector <InlineMath>{"\\vec{B}"}</InlineMath>. 
                                    The resultant vector <InlineMath>{"\\vec{R}"}</InlineMath> is the direct path from your starting point to your final destination.
                                </p>
                            </>
                        ) : (
                            <>
                                <strong className="text-orange-600">Add the Negative:</strong>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                                    Subtracting <InlineMath>{"\\vec{B}"}</InlineMath> is the same as adding <InlineMath>{"-\\vec{B}"}</InlineMath>.
                                    <br/>
                                    <span className="block mt-2 font-mono bg-white dark:bg-slate-800 p-1 rounded text-center">
                                        <InlineMath>{"\\vec{A} - \\vec{B} = \\vec{A} + (-\\vec{B})"}</InlineMath>
                                    </span>
                                    <br/>
                                    Visually, we flip <InlineMath>{"\\vec{B}"}</InlineMath> around and then use the Head-to-Tail rule.
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Algebraic Rule */}
                <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">Algebraic Method</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Simply add or subtract the corresponding components (x with x, y with y).
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 text-center font-mono text-sm">
                        {mode === 'add' ? (
                            <BlockMath>{"\\langle x_a + x_b, \\; y_a + y_b \\rangle"}</BlockMath>
                        ) : (
                            <BlockMath>{"\\langle x_a - x_b, \\; y_a - y_b \\rangle"}</BlockMath>
                        )}
                    </div>
                </div>
            </div>

            {/* Helper Toggle */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <label className="flex items-center gap-3 cursor-pointer select-none p-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded transition-colors">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${showHelpers ? 'bg-blue-600 border-blue-600' : 'border-slate-400'}`}>
                        {showHelpers && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <input type="checkbox" className="hidden" checked={showHelpers} onChange={(e) => setShowHelpers(e.target.checked)} />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Show geometric construction </span>
                </label>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: ANIMATION & MATH (60%)      */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
         
         {/* TOP RIGHT: INTERACTIVE GRAPH */}
         <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[400px]">
            
            {/* Mode Toggles */}
            <div className="absolute top-4 left-4 z-10 flex bg-slate-800 rounded-lg p-1 border border-slate-700 shadow-lg">
                <button
                    onClick={() => setMode('add')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${mode === 'add' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    Add (+)
                </button>
                <button
                    onClick={() => setMode('sub')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${mode === 'sub' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    Subtract (−)
                </button>
            </div>

            {/* Legend */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 text-[10px] font-mono">
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded border border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-blue-200">Vector A</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded border border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-purple-200">Vector B</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded border border-slate-700">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-emerald-200">Resultant</span>
                </div>
            </div>

            {/* SVG Graph */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                <defs>
                    <pattern id="grid-add" width={GRID_SCALE} height={GRID_SCALE} patternUnits="userSpaceOnUse">
                        <path d={`M ${GRID_SCALE} 0 L 0 0 0 ${GRID_SCALE}`} fill="none" stroke="#334155" strokeWidth="1"/>
                    </pattern>
                    <marker id="head-a" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                    <marker id="head-b" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#A855F7" /></marker>
                    <marker id="head-res" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
                    <marker id="head-ghost" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#94a3b8" /></marker>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-add)" />
                
                {/* Axes */}
                <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="#475569" strokeWidth="2" />
                <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="#475569" strokeWidth="2" />

                <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                    
                    {/* --- Helper Construction Lines --- */}
                    {showHelpers && (
                        <>
                            {mode === 'add' && (
                                <path 
                                    d={`M ${svA.x} ${svA.y} L ${svRes.x} ${svRes.y}`}
                                    stroke="#A855F7" strokeWidth="2" strokeDasharray="5,5" opacity="0.5"
                                    markerEnd="url(#head-b)"
                                />
                            )}
                            {mode === 'sub' && (
                                <>
                                    {/* Ghost -B at origin */}
                                    <line x1="0" y1="0" x2={svNegB.x} y2={svNegB.y} stroke="#A855F7" strokeWidth="2" strokeDasharray="4,4" opacity="0.3" />
                                    {/* Ghost -B at A's head */}
                                    <path 
                                        d={`M ${svA.x} ${svA.y} L ${svRes.x} ${svRes.y}`}
                                        stroke="#F97316" strokeWidth="2" strokeDasharray="5,5" opacity="0.6"
                                        markerEnd="url(#head-ghost)"
                                    />
                                </>
                            )}
                        </>
                    )}

                    {/* Vector A */}
                    <line x1="0" y1="0" x2={svA.x} y2={svA.y} stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-a)" />
                    
                    {/* Vector B */}
                    <line x1="0" y1="0" x2={svB.x} y2={svB.y} stroke="#A855F7" strokeWidth="4" markerEnd="url(#head-b)" />

                    {/* Resultant */}
                    <motion.line 
                        initial={false}
                        animate={{ x2: svRes.x, y2: svRes.y }}
                        stroke="#10B981" strokeWidth="5" markerEnd="url(#head-res)" 
                    />
                </g>
            </svg>

            {/* Draggable Handles */}
            <motion.div
                drag dragMomentum={false} onDrag={handleDrag(setVecA)}
                className="absolute w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 cursor-move border-2 border-white z-20 flex items-center justify-center shadow-lg"
                style={{ left: CENTER_X + svA.x - 16, top: CENTER_Y + svA.y - 16 }}
            >
                <span className="text-white text-[10px] font-bold">A</span>
            </motion.div>

            <motion.div
                drag dragMomentum={false} onDrag={handleDrag(setVecB)}
                className="absolute w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 cursor-move border-2 border-white z-20 flex items-center justify-center shadow-lg"
                style={{ left: CENTER_X + svB.x - 16, top: CENTER_Y + svB.y - 16 }}
            >
                <span className="text-white text-[10px] font-bold">B</span>
            </motion.div>

            <div className="absolute bottom-4 left-4 bg-slate-900/50 backdrop-blur px-2 py-1 rounded text-xs text-slate-300 border border-slate-700 pointer-events-none">
                Drag A or B
            </div>
         </div>

         {/* BOTTOM RIGHT: MATH DASHBOARD */}
         <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4">
             <div className="grid grid-cols-3 items-center gap-2 text-center font-mono text-sm">
                 
                 {/* Vector A */}
                 <div className="flex flex-col items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800">
                     <span className="text-blue-600 font-bold mb-1"><InlineMath>{"\\vec{A}"}</InlineMath></span>
                     <span className="text-slate-700 dark:text-slate-300"><InlineMath>{`\\langle ${vecA.x.toFixed(1)}, ${vecA.y.toFixed(1)} \\rangle`}</InlineMath></span>
                 </div>

                 {/* Operation */}
                 <div className="flex flex-col items-center justify-center">
                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg font-bold text-slate-500">
                         {mode === 'add' ? '+' : '−'}
                     </div>
                 </div>

                 {/* Vector B */}
                 <div className="flex flex-col items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-100 dark:border-purple-800">
                     <span className="text-purple-600 font-bold mb-1"><InlineMath>{"\\vec{B}"}</InlineMath></span>
                     <span className="text-slate-700 dark:text-slate-300"><InlineMath>{`\\langle ${vecB.x.toFixed(1)}, ${vecB.y.toFixed(1)} \\rangle`}</InlineMath></span>
                 </div>

             </div>

             <div className="mt-4 flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800">
                 <span className="text-emerald-700 dark:text-emerald-300 text-sm font-bold uppercase tracking-wide">Resultant <InlineMath>{"\\vec{R}"}</InlineMath></span>
                 <span className="font-mono font-bold text-xl text-emerald-600 dark:text-emerald-400">
                     <InlineMath>{`\\langle ${vecResult.x.toFixed(1)}, ${vecResult.y.toFixed(1)} \\rangle`}</InlineMath>
                 </span>
             </div>
         </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="add-sub-vectors"
      slideTitle="Adding & subtracting vectors"
      moduleId="vectors-prerequisite"
      submoduleId="vector-addition-and-subtraction"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}