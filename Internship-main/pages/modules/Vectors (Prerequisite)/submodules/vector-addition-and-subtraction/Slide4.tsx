import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function AddAlgGraphicalSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Vector A and B
  const [vecA, setVecA] = useState({ x: 3, y: 1 });
  const [vecB, setVecB] = useState({ x: 1, y: 3 });

  // Config
  const GRID = 30;
  const ORIGIN = 100; // Offset from bottom-left for positive quadrant focus
  const HEIGHT = 400;

  // Calculations
  const resX = vecA.x + vecB.x;
  const resY = vecA.y + vecB.y;
  const resMag = Math.sqrt(resX**2 + resY**2);

  const slideInteraction: Interaction = {
    id: 'add-alg-graph-explore',
    conceptId: 'vector-addition-dual-view',
    conceptName: 'Algebraic & Graphical Addition',
    type: 'learning',
    description: 'Side-by-side comparison of geometric construction and algebraic component addition.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Custom Drag Logic (updates components)
  const handleDrag = (setter: any) => (_: any, info: any) => {
    // We update based on delta, mapped to grid units
    setter((prev: any) => ({
        x: prev.x + info.delta.x / GRID,
        y: prev.y - info.delta.y / GRID
    }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: GRAPHICAL VIEW (50%)         */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Graphical Method</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Connecting tip-to-tail.
            </p>
        </div>

        <div className="flex-grow bg-slate-950 relative overflow-hidden select-none shadow-inner group">
            
            <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur px-3 py-1 rounded border border-slate-700 text-xs text-slate-400">
                Drag the Blue or Purple dots
            </div>

            <svg className="w-full h-full" viewBox="0 0 500 450">
              <defs>
                <pattern id="grid-alg" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeOpacity="0.5" strokeWidth="1"/>
                </pattern>
                <marker id="head-a-alg" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                <marker id="head-b-alg" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#A855F7" /></marker>
                <marker id="head-res-alg" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-alg)" />
              
              {/* Axes */}
              <line x1={ORIGIN} y1="0" x2={ORIGIN} y2={HEIGHT} stroke="#475569" strokeWidth="2" />
              <line x1="0" y1={HEIGHT - ORIGIN} x2="500" y2={HEIGHT - ORIGIN} stroke="#475569" strokeWidth="2" />

              <g transform={`translate(${ORIGIN}, ${HEIGHT - ORIGIN})`}>
                
                {/* Construction Lines (Tip to Tail) */}
                <path 
                    d={`M ${vecA.x * GRID} ${-vecA.y * GRID} L ${resX * GRID} ${-resY * GRID}`}
                    stroke="#A855F7" strokeWidth="2" strokeDasharray="5,5" opacity="0.4"
                />
                 <path 
                    d={`M ${vecB.x * GRID} ${-vecB.y * GRID} L ${resX * GRID} ${-resY * GRID}`}
                    stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" opacity="0.4"
                />

                {/* Vectors */}
                <line x1="0" y1="0" x2={vecA.x * GRID} y2={-vecA.y * GRID} stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-a-alg)" />
                <line x1="0" y1="0" x2={vecB.x * GRID} y2={-vecB.y * GRID} stroke="#A855F7" strokeWidth="4" markerEnd="url(#head-b-alg)" />
                
                {/* Resultant */}
                <line x1="0" y1="0" x2={resX * GRID} y2={-resY * GRID} stroke="#10B981" strokeWidth="5" markerEnd="url(#head-res-alg)" />

              </g>
            </svg>

            {/* Draggables */}
            <motion.div
                drag dragMomentum={false} onDrag={handleDrag(setVecA)}
                className="absolute w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 cursor-move border-2 border-white z-20 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                style={{ left: ORIGIN + vecA.x * GRID - 16, top: HEIGHT - ORIGIN - vecA.y * GRID - 16 }}
            />
            <motion.div
                drag dragMomentum={false} onDrag={handleDrag(setVecB)}
                className="absolute w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 cursor-move border-2 border-white z-20 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                style={{ left: ORIGIN + vecB.x * GRID - 16, top: HEIGHT - ORIGIN - vecB.y * GRID - 16 }}
            />

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: ALGEBRAIC VIEW (50%)        */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col gap-6 h-full">
        
        {/* The Math Table Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex-grow flex flex-col">
            
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Algebraic Method</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Adding components column-wise.
                </p>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-center">
                <table className="w-full text-center border-collapse">
                    <thead className="text-xs uppercase text-slate-400 font-bold tracking-wider border-b border-slate-200 dark:border-slate-700">
                        <tr>
                            <th className="pb-3 text-left pl-4">Vector</th>
                            <th className="pb-3">X-Comp</th>
                            <th className="pb-3">Y-Comp</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-lg">
                        {/* Vec A */}
                        <tr className="group transition-colors">
                            <td className="py-4 text-left pl-4 font-bold text-blue-600"><InlineMath>{"\\vec{a}"}</InlineMath></td>
                            <td className="py-4 text-slate-600 dark:text-slate-300">{vecA.x.toFixed(1)}</td>
                            <td className="py-4 text-slate-600 dark:text-slate-300">{vecA.y.toFixed(1)}</td>
                        </tr>
                        {/* Vec B */}
                        <tr className="group transition-colors border-b-2 border-slate-800 dark:border-slate-200">
                            <td className="py-4 text-left pl-4 font-bold text-purple-600 flex items-center gap-2">
                                <span className="text-slate-400 text-sm font-normal">+</span> <InlineMath>{"\\vec{b}"}</InlineMath>
                            </td>
                            <td className="py-4 text-slate-600 dark:text-slate-300">{vecB.x.toFixed(1)}</td>
                            <td className="py-4 text-slate-600 dark:text-slate-300">{vecB.y.toFixed(1)}</td>
                        </tr>
                        {/* Result */}
                        <tr className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/10">
                            <td className="py-4 text-left pl-4"><InlineMath>{"\\vec{R}"}</InlineMath></td>
                            <td className="py-4">{resX.toFixed(1)}</td>
                            <td className="py-4">{resY.toFixed(1)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        {/* Magnitude Callout */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border border-slate-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-wider">Resultant Magnitude</div>
                    <div className="font-mono text-lg text-slate-200">
                        <InlineMath>{`|\\vec{R}| = \\sqrt{${resX.toFixed(1)}^2 + ${resY.toFixed(1)}^2}`}</InlineMath>
                    </div>
                </div>
                <div className="text-4xl font-bold text-emerald-400">
                    {resMag.toFixed(2)}
                </div>
            </div>
        </div>

        <div className="text-center text-xs text-slate-400 italic">
            "Algebra ensures precision; Geometry builds intuition."
        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="add-alg-graph"
      slideTitle="Adding vectors algebraically & graphically"
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