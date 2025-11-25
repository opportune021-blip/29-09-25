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
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Connecting the Methods
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Whether you draw arrows tip-to-tail (Graphical) or add the numbers (Algebraic), the result is identical.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Graphical View (Interactive) */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center group">
             
            <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded text-sm font-bold text-slate-500 border border-slate-200 dark:border-slate-700">
                Geometric View
            </div>

            <svg className="w-full h-full" viewBox="0 0 500 450">
              <defs>
                <pattern id="grid-alg" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="head-a-alg" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6" /></marker>
                <marker id="head-b-alg" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#A855F7" /></marker>
                <marker id="head-res-alg" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-alg)" className="text-slate-400" />
              
              {/* Axes */}
              <line x1={ORIGIN} y1="0" x2={ORIGIN} y2={HEIGHT} stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              <line x1="0" y1={HEIGHT - ORIGIN} x2="500" y2={HEIGHT - ORIGIN} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

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
                className="absolute w-8 h-8 rounded-full bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500 cursor-move z-20"
                style={{ left: ORIGIN + vecA.x * GRID - 16, top: HEIGHT - ORIGIN - vecA.y * GRID - 16 }}
            />
            <motion.div
                drag dragMomentum={false} onDrag={handleDrag(setVecB)}
                className="absolute w-8 h-8 rounded-full bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500 cursor-move z-20"
                style={{ left: ORIGIN + vecB.x * GRID - 16, top: HEIGHT - ORIGIN - vecB.y * GRID - 16 }}
            />

            <div className="absolute bottom-4 left-4 bg-white/90 px-2 py-1 rounded text-xs text-slate-500">
               Drag the blue/purple circles
            </div>

          </div>

          {/* RIGHT: Algebraic View (Auto-updating) */}
          <div className="flex flex-col gap-6">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wide">Algebraic View</h3>
                </div>
                
                {/* The Math Table */}
                <div className="p-0">
                    <table className="w-full text-center">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="p-3 text-left pl-6">Vector</th>
                                <th className="p-3">x-component</th>
                                <th className="p-3">y-component</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 font-mono text-lg">
                            {/* Vec A */}
                            <tr className="group hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
                                <td className="p-4 text-left pl-6 font-bold text-blue-600"><InlineMath>{"\\vec{a}"}</InlineMath></td>
                                <td className="p-4">{vecA.x.toFixed(1)}</td>
                                <td className="p-4">{vecA.y.toFixed(1)}</td>
                            </tr>
                            {/* Vec B */}
                            <tr className="group hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors">
                                <td className="p-4 text-left pl-6 font-bold text-purple-600">
                                    <span className="mr-2 text-slate-400 font-normal">+</span> <InlineMath>{"\\vec{b}"}</InlineMath>
                                </td>
                                <td className="p-4 border-b-2 border-slate-800 dark:border-slate-200">{vecB.x.toFixed(1)}</td>
                                <td className="p-4 border-b-2 border-slate-800 dark:border-slate-200">{vecB.y.toFixed(1)}</td>
                            </tr>
                            {/* Result */}
                            <tr className="bg-emerald-50 dark:bg-emerald-900/10 font-bold text-emerald-700 dark:text-emerald-300">
                                <td className="p-4 text-left pl-6"><InlineMath>{"\\vec{R}"}</InlineMath></td>
                                <td className="p-4">{resX.toFixed(1)}</td>
                                <td className="p-4">{resY.toFixed(1)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Magnitude Callout */}
            <div className="bg-slate-800 dark:bg-white text-white dark:text-slate-900 p-6 rounded-xl flex items-center justify-between shadow-lg">
                <div>
                    <div className="text-xs uppercase opacity-70 font-bold mb-1">Resultant Magnitude</div>
                    <div className="font-mono text-xl">
                        <InlineMath>{`|\\vec{R}| = \\sqrt{${resX.toFixed(1)}^2 + ${resY.toFixed(1)}^2}`}</InlineMath>
                    </div>
                </div>
                <div className="text-3xl font-bold">
                    {resMag.toFixed(2)}
                </div>
            </div>

            <div className="text-sm text-slate-500 italic p-2">
                "Adding vectors is just adding their columns."
            </div>

          </div>

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