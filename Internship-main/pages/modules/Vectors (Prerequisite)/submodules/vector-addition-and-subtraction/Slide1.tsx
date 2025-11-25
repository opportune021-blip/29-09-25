import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function AddSubtractVectorsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Vector Head Coordinates (Tail is always at 0,0 for the "Standard Position" view)
  const [vecA, setVecA] = useState({ x: 3, y: 2 });
  const [vecB, setVecB] = useState({ x: 1, y: -3 });
  const [mode, setMode] = useState<'add' | 'sub'>('add');
  const [showHelpers, setShowHelpers] = useState(true);

  // Config
  const GRID_SCALE = 30;
  const CENTER_X = 150; // Shifted left slightly to make room for result
  const CENTER_Y = 200;

  // Calculations
  // Resultant R = A + B (or A - B)
  const vecResult = {
    x: mode === 'add' ? vecA.x + vecB.x : vecA.x - vecB.x,
    y: mode === 'add' ? vecA.y + vecB.y : vecA.y - vecB.y
  };

  // For Subtraction, we essentially add (-B). We need to visualize -B.
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
  const onDragA = (_: any, info: any) => {
    // Basic delta update logic
    setVecA(prev => ({
        x: Math.round((prev.x * GRID_SCALE + info.delta.x) / GRID_SCALE), // Snap logic simplified
        y: Math.round((prev.y * GRID_SCALE - info.delta.y) / GRID_SCALE)
    }));
  };
  
  // Custom Smooth Drag Hook equivalent for cleaner UI
  const handleDrag = (setter: any) => (_: any, info: any) => {
    setter((prev: any) => ({
      x: prev.x + info.delta.x / GRID_SCALE,
      y: prev.y - info.delta.y / GRID_SCALE
    }));
  };

  // Render Helper
  const toSVG = (v: {x: number, y: number}) => ({
    x: v.x * GRID_SCALE,
    y: -v.y * GRID_SCALE
  });

  const svA = toSVG(vecA);
  const svB = toSVG(vecB);
  const svNegB = toSVG(negB);
  const svRes = toSVG(vecResult);

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {mode === 'add' ? 'Vector Addition' : 'Vector Subtraction'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {mode === 'add' 
              ? <span>Combining vectors is like following a path: <InlineMath>\vec{a}</InlineMath> then <InlineMath>\vec{b}</InlineMath>.</span>
              : <span>Subtraction is just adding the negative: <InlineMath>\vec{a} - \vec{b} = \vec{a} + (-\vec{b})</InlineMath>.</span>
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Main Graph */}
          <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[500px] overflow-hidden select-none shadow-inner flex items-center justify-center">
             
             {/* Mode Toggle Overlay */}
             <div className="absolute top-4 left-4 z-10 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex">
                <button
                    onClick={() => setMode('add')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'add' ? 'bg-blue-600 text-white shadow' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                    Add (<InlineMath>+</InlineMath>)
                </button>
                <button
                    onClick={() => setMode('sub')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${mode === 'sub' ? 'bg-orange-600 text-white shadow' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                    Subtract (<InlineMath>-</InlineMath>)
                </button>
             </div>

             {/* Legend */}
             <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded shadow-sm">
                    <span>Vector A</span>
                    <div className="w-8 h-1 bg-blue-600 rounded"></div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded shadow-sm">
                    <span>Vector B</span>
                    <div className="w-8 h-1 bg-purple-600 rounded"></div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded shadow-sm">
                    <span>Resultant</span>
                    <div className="w-8 h-1 bg-emerald-500 rounded"></div>
                </div>
             </div>

             <svg className="w-full h-full" viewBox="0 0 500 400">
                <defs>
                    <pattern id="grid-add" width={GRID_SCALE} height={GRID_SCALE} patternUnits="userSpaceOnUse">
                        <path d={`M ${GRID_SCALE} 0 L 0 0 0 ${GRID_SCALE}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                    </pattern>
                    <marker id="head-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#2563EB" /></marker>
                    <marker id="head-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#9333EA" /></marker>
                    <marker id="head-res" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
                    <marker id="head-ghost" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#94a3b8" /></marker>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-add)" className="text-slate-400" />
                
                {/* Axes */}
                <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
                <line x1="0" y1={CENTER_Y} x2="500" y2={CENTER_Y} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

                <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                    
                    {/* --- HELPER LINES (The construction) --- */}
                    {showHelpers && (
                        <>
                            {/* If Adding: Show B starting from A's head */}
                            {mode === 'add' && (
                                <path 
                                    d={`M ${svA.x} ${svA.y} L ${svRes.x} ${svRes.y}`}
                                    stroke="#9333EA" strokeWidth="2" strokeDasharray="5,5" opacity="0.5"
                                    markerEnd="url(#head-b)"
                                />
                            )}
                            
                            {/* If Subtracting: Show -B and then add it to A */}
                            {mode === 'sub' && (
                                <>
                                    {/* The negative B vector ghost from origin */}
                                    <line 
                                        x1="0" y1="0" x2={svNegB.x} y2={svNegB.y}
                                        stroke="#9333EA" strokeWidth="2" strokeDasharray="4,4" opacity="0.3"
                                    />
                                    {/* The -B vector added to A's head */}
                                    <path 
                                        d={`M ${svA.x} ${svA.y} L ${svRes.x} ${svRes.y}`}
                                        stroke="#F97316" strokeWidth="2" strokeDasharray="5,5" opacity="0.5"
                                        markerEnd="url(#head-ghost)"
                                    />
                                </>
                            )}
                        </>
                    )}

                    {/* --- MAIN VECTORS --- */}
                    
                    {/* Vector A */}
                    <line x1="0" y1="0" x2={svA.x} y2={svA.y} stroke="#2563EB" strokeWidth="4" markerEnd="url(#head-a)" />
                    
                    {/* Vector B */}
                    <line x1="0" y1="0" x2={svB.x} y2={svB.y} stroke="#9333EA" strokeWidth="4" markerEnd="url(#head-b)" />

                    {/* Resultant Vector */}
                    <motion.line 
                        initial={false}
                        animate={{ x2: svRes.x, y2: svRes.y }}
                        stroke="#10B981" strokeWidth="5" markerEnd="url(#head-res)" 
                    />

                </g>
             </svg>

             {/* Draggable Handles */}
             {/* Handle A */}
             <motion.div
                drag dragMomentum={false} onDrag={handleDrag(setVecA)}
                className="absolute w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 cursor-move border-2 border-white shadow-md z-20 flex items-center justify-center opacity-80 hover:opacity-100"
                style={{ left: CENTER_X + svA.x - 16, top: CENTER_Y + svA.y - 16 }}
             >
                 <span className="text-white text-xs font-bold">A</span>
             </motion.div>

             {/* Handle B */}
             <motion.div
                drag dragMomentum={false} onDrag={handleDrag(setVecB)}
                className="absolute w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 cursor-move border-2 border-white shadow-md z-20 flex items-center justify-center opacity-80 hover:opacity-100"
                style={{ left: CENTER_X + svB.x - 16, top: CENTER_Y + svB.y - 16 }}
             >
                 <span className="text-white text-xs font-bold">B</span>
             </motion.div>

             <div className="absolute bottom-4 left-4 bg-white/80 px-2 py-1 rounded text-xs text-slate-500">
                Drag <strong>A</strong> or <strong>B</strong> to change values.
             </div>

          </div>

          {/* RIGHT: Math & Values */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Value Dashboard */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wide">Component Math</h3>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Row A */}
                    <div className="flex items-center justify-between font-mono">
                        <span className="text-blue-600 font-bold text-lg"><InlineMath>\vec{a}</InlineMath></span>
                        <span className="text-slate-600 dark:text-slate-300">=</span>
                        <span className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded text-blue-700 dark:text-blue-300">
                            <InlineMath>{`\\langle ${vecA.x.toFixed(1)}, ${vecA.y.toFixed(1)} \\rangle`}</InlineMath>
                        </span>
                    </div>

                    {/* Operator */}
                    <div className="flex justify-center">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500">
                            {mode === 'add' ? '+' : '−'}
                        </div>
                    </div>

                    {/* Row B */}
                    <div className="flex items-center justify-between font-mono">
                        <span className="text-purple-600 font-bold text-lg"><InlineMath>\vec{b}</InlineMath></span>
                        <span className="text-slate-600 dark:text-slate-300">=</span>
                        <span className="bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded text-purple-700 dark:text-purple-300">
                            <InlineMath>{`\\langle ${vecB.x.toFixed(1)}, ${vecB.y.toFixed(1)} \\rangle`}</InlineMath>
                        </span>
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700" />

                    {/* Result */}
                    <div className="flex items-center justify-between font-mono bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800">
                        <span className="text-emerald-600 font-bold text-lg"><InlineMath>\vec{R}</InlineMath></span>
                        <span className="text-emerald-800 dark:text-emerald-200">=</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-300">
                            <InlineMath>{`\\langle ${vecResult.x.toFixed(1)}, ${vecResult.y.toFixed(1)} \\rangle`}</InlineMath>
                        </span>
                    </div>
                </div>
            </div>

            {/* Explanation Box */}
            <div className="flex-grow bg-blue-50 dark:bg-slate-900/30 p-4 rounded-xl text-sm border border-blue-100 dark:border-slate-700">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">How it works</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                    {mode === 'add' 
                        ? "To add vectors, simply add their corresponding components together:"
                        : "To subtract, subtract the components (or add the negative):"
                    }
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 font-mono text-center">
                    {mode === 'add' 
                        ? <InlineMath>{`x_R = x_a + x_b`}</InlineMath> 
                        : <InlineMath>{`x_R = x_a - x_b`}</InlineMath>
                    }
                    <br/>
                    {mode === 'add' 
                        ? <InlineMath>{`y_R = y_a + y_b`}</InlineMath> 
                        : <InlineMath>{`y_R = y_a - y_b`}</InlineMath>
                    }
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                 <input 
                    type="checkbox" 
                    id="showHelpers"
                    checked={showHelpers}
                    onChange={(e) => setShowHelpers(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                 />
                 <label htmlFor="showHelpers" className="text-sm text-slate-600 dark:text-slate-400 select-none cursor-pointer">
                    Show geometric construction lines
                 </label>
            </div>

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