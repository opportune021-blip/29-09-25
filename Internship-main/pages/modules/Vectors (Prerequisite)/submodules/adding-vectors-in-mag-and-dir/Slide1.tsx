import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toRad = (deg: number) => (deg * Math.PI) / 180;

export default function AddMagDirSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Two vectors defined by Magnitude and Angle
  const [magA, setMagA] = useState(5);
  const [angA, setAngA] = useState(30);
  
  const [magB, setMagB] = useState(4);
  const [angB, setAngB] = useState(120);

  // Config
  const GRID = 30;
  const CENTER_X = 250;
  const CENTER_Y = 300;

  // --- CALCULATIONS ---
  
  // 1. Resolve A
  const ax = magA * Math.cos(toRad(angA));
  const ay = magA * Math.sin(toRad(angA));

  // 2. Resolve B
  const bx = magB * Math.cos(toRad(angB));
  const by = magB * Math.sin(toRad(angB));

  // 3. Sum Components
  const rx = ax + bx;
  const ry = ay + by;

  const slideInteraction: Interaction = {
    id: 'add-mag-dir-1-explore',
    conceptId: 'vector-resolution-table',
    conceptName: 'Vector Resolution Table',
    type: 'learning',
    description: 'Breaking down two polar vectors into components to add them.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: VISUAL PROOF (40%)           */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">The "Component Method"</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                You cannot simply add magnitudes. You must resolve them first.
            </p>
        </div>

        {/* Graph Area */}
        <div className="flex-grow bg-slate-50 dark:bg-slate-900 relative overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[400px]">
            
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded text-xs shadow-sm border border-blue-200 dark:border-slate-700">
                     <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                     <span className="font-bold text-blue-600 dark:text-blue-300">Vector A</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded text-xs shadow-sm border border-purple-200 dark:border-slate-700">
                     <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                     <span className="font-bold text-purple-600 dark:text-purple-300">Vector B</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded text-xs shadow-sm border border-emerald-200 dark:border-slate-700">
                     <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                     <span className="font-bold text-emerald-600 dark:text-emerald-300">Resultant</span>
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 500 500">
              <defs>
                <pattern id="grid-add-md" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeOpacity="0.5" strokeWidth="1"/>
                </pattern>
                <marker id="head-a-md" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
                <marker id="head-b-md" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#A855F7" /></marker>
                <marker id="head-res-md" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-add-md)" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="500" stroke="#475569" strokeWidth="2" />
              <line x1="0" y1={CENTER_Y} x2="500" y2={CENTER_Y} stroke="#475569" strokeWidth="2" />

              <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {/* Vector A */}
                <line 
                    x1="0" y1="0" 
                    x2={ax * GRID} y2={-ay * GRID} 
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-a-md)" 
                />
                
                {/* Vector B (Tip-to-Tail) starts at A's head */}
                <line 
                    x1={ax * GRID} y1={-ay * GRID} 
                    x2={(ax + bx) * GRID} y2={-(ay + by) * GRID} 
                    stroke="#A855F7" strokeWidth="4" markerEnd="url(#head-b-md)" 
                />

                {/* Resultant */}
                <line 
                    x1="0" y1="0" 
                    x2={rx * GRID} y2={-ry * GRID} 
                    stroke="#10B981" strokeWidth="5" markerEnd="url(#head-res-md)" 
                />

              </g>
            </svg>
        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: CONTROLS & TABLE (60%)      */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col gap-6 h-full">
        
        {/* Controls Panel */}
        <div className="grid grid-cols-2 gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            
            {/* Input A */}
            <div className="space-y-4 border-r border-slate-100 dark:border-slate-700 pr-4">
                <div className="font-bold text-blue-600 border-b border-blue-100 dark:border-blue-900 pb-1 mb-2">Vector A</div>
                <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Magnitude</span>
                        <span className="font-mono">{magA}</span>
                    </div>
                    <input type="range" min="1" max="8" value={magA} onChange={(e) => setMagA(Number(e.target.value))} className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"/>
                </div>
                <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Angle</span>
                        <span className="font-mono">{angA}°</span>
                    </div>
                    <input type="range" min="0" max="360" step="15" value={angA} onChange={(e) => setAngA(Number(e.target.value))} className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"/>
                </div>
            </div>

            {/* Input B */}
            <div className="space-y-4 pl-2">
                <div className="font-bold text-purple-600 border-b border-purple-100 dark:border-purple-900 pb-1 mb-2">Vector B</div>
                <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Magnitude</span>
                        <span className="font-mono">{magB}</span>
                    </div>
                    <input type="range" min="1" max="8" value={magB} onChange={(e) => setMagB(Number(e.target.value))} className="w-full accent-purple-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"/>
                </div>
                <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Angle</span>
                        <span className="font-mono">{angB}°</span>
                    </div>
                    <input type="range" min="0" max="360" step="15" value={angB} onChange={(e) => setAngB(Number(e.target.value))} className="w-full accent-purple-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"/>
                </div>
            </div>
        </div>

        {/* Resolution Table */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex-grow flex flex-col">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 text-center text-sm uppercase tracking-wide">
                Resolution Table
            </div>
            <div className="overflow-x-auto flex-grow flex items-center">
                <table className="w-full text-sm md:text-base">
                    <thead>
                        <tr className="text-slate-500 text-xs uppercase border-b border-slate-200 dark:border-slate-700">
                            <th className="p-3 text-left pl-6">Vector</th>
                            <th className="p-3 text-center">x-component <br/><span className="lowercase font-normal opacity-70">(cos)</span></th>
                            <th className="p-3 text-center">y-component <br/><span className="lowercase font-normal opacity-70">(sin)</span></th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-slate-700 dark:text-slate-300">
                        {/* Row A */}
                        <tr className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 pl-6 font-bold text-blue-600"><InlineMath>{"\\vec{A}"}</InlineMath></td>
                            <td className="p-3 text-center">
                                <div className="text-[10px] text-slate-400">{magA} cos({angA}°)</div>
                                <div className="font-bold">{ax.toFixed(2)}</div>
                            </td>
                            <td className="p-3 text-center">
                                <div className="text-[10px] text-slate-400">{magA} sin({angA}°)</div>
                                <div className="font-bold">{ay.toFixed(2)}</div>
                            </td>
                        </tr>
                        {/* Row B */}
                        <tr className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                            <td className="p-3 pl-6 font-bold text-purple-600"><InlineMath>{"\\vec{B}"}</InlineMath></td>
                            <td className="p-3 text-center">
                                <div className="text-[10px] text-slate-400">{magB} cos({angB}°)</div>
                                <div className="font-bold">{bx.toFixed(2)}</div>
                            </td>
                            <td className="p-3 text-center">
                                <div className="text-[10px] text-slate-400">{magB} sin({angB}°)</div>
                                <div className="font-bold">{by.toFixed(2)}</div>
                            </td>
                        </tr>
                        {/* Result */}
                        <tr className="bg-emerald-50 dark:bg-emerald-900/20 font-bold text-emerald-700 dark:text-emerald-300 text-lg">
                            <td className="p-4 pl-6"><InlineMath>{"\\vec{R}"}</InlineMath></td>
                            <td className="p-4 text-center">{rx.toFixed(2)}</td>
                            <td className="p-4 text-center">{ry.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="text-center text-xs text-slate-500">
            The result vector is <InlineMath>{`\\vec{R} = \\langle ${rx.toFixed(2)}, ${ry.toFixed(2)} \\rangle`}</InlineMath>
        </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="add-mag-dir-1"
      slideTitle="Adding vectors in magnitude & direction form (1 of 2)"
      moduleId="vectors-prerequisite"
      submoduleId="adding-vectors-in-mag-and-dir"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}