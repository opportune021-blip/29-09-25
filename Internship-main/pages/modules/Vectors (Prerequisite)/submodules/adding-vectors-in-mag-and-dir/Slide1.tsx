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

  return (
    <SlideComponentWrapper
      slideId="add-mag-dir-1"
      slideTitle="Adding vectors in magnitude & direction form (1 of 2)"
      moduleId="vectors-prerequisite"
      submoduleId="adding-vectors-in-mag-and-dir"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        <div className="w-full p-4 sm:p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">The "Component Method"</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                You cannot simply add magnitudes and angles together. 
                <br/>To add <InlineMath>{"\\vec{A}"}</InlineMath> and <InlineMath>{"\\vec{B}"}</InlineMath>, we must first <strong>resolve</strong> them into x and y components.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: Graph (Visual Proof) */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[500px] overflow-hidden select-none shadow-inner flex items-center justify-center">
                
                <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-slate-800/90 px-3 py-2 rounded shadow text-xs border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
                        <span className="w-8 h-1 bg-blue-600 rounded"></span> Vector A
                    </div>
                    <div className="flex items-center gap-2 text-purple-600 font-bold mb-1">
                        <span className="w-8 h-1 bg-purple-600 rounded"></span> Vector B
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold">
                        <span className="w-8 h-1 bg-emerald-500 rounded"></span> Resultant
                    </div>
                </div>

                <svg className="w-full h-full" viewBox="0 0 500 500">
                  <defs>
                    <pattern id="grid-add-md" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                      <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                    </pattern>
                    <marker id="head-a-md" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6" /></marker>
                    <marker id="head-b-md" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#A855F7" /></marker>
                    <marker id="head-res-md" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#10B981" /></marker>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-add-md)" className="text-slate-400" />
                  
                  {/* Axes */}
                  <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="500" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
                  <line x1="0" y1={CENTER_Y} x2="500" y2={CENTER_Y} stroke="currentColor" strokeWidth="2" className="text-slate-300" />

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

                    {/* Dashed Components for Visual Aid (Optional, can get cluttered) */}
                    <path 
                        d={`M 0 0 L ${rx * GRID} 0 L ${rx * GRID} ${-ry * GRID}`}
                        fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" opacity="0.3"
                    />

                  </g>
                </svg>
              </div>

              {/* RIGHT: The Resolution Table */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* Inputs */}
                <div className="grid grid-cols-2 gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    
                    {/* Input A */}
                    <div className="flex flex-col gap-3 p-2 border-r border-slate-100 dark:border-slate-700">
                        <div className="font-bold text-blue-600 border-b pb-1">Vector A</div>
                        <div>
                            <label className="text-xs text-slate-500 block">Magnitude</label>
                            <input type="range" min="1" max="8" value={magA} onChange={(e) => setMagA(Number(e.target.value))} className="w-full accent-blue-600"/>
                            <div className="text-right text-sm font-mono">{magA}</div>
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 block">Angle</label>
                            <input type="range" min="0" max="360" step="15" value={angA} onChange={(e) => setAngA(Number(e.target.value))} className="w-full accent-blue-600"/>
                            <div className="text-right text-sm font-mono">{angA}°</div>
                        </div>
                    </div>

                    {/* Input B */}
                    <div className="flex flex-col gap-3 p-2">
                        <div className="font-bold text-purple-600 border-b pb-1">Vector B</div>
                        <div>
                            <label className="text-xs text-slate-500 block">Magnitude</label>
                            <input type="range" min="1" max="8" value={magB} onChange={(e) => setMagB(Number(e.target.value))} className="w-full accent-purple-600"/>
                            <div className="text-right text-sm font-mono">{magB}</div>
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 block">Angle</label>
                            <input type="range" min="0" max="360" step="15" value={angB} onChange={(e) => setAngB(Number(e.target.value))} className="w-full accent-purple-600"/>
                            <div className="text-right text-sm font-mono">{angB}°</div>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 text-center">
                        Resolution Table
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm md:text-base">
                            <thead>
                                <tr className="text-slate-500 text-xs uppercase border-b border-slate-200 dark:border-slate-700">
                                    <th className="p-3 text-left">Vector</th>
                                    <th className="p-3 text-center w-1/3">x-component <br/> <span className="normal-case font-normal">(mag · cos θ)</span></th>
                                    <th className="p-3 text-center w-1/3">y-component <br/> <span className="normal-case font-normal">(mag · sin θ)</span></th>
                                </tr>
                            </thead>
                            <tbody className="font-mono">
                                {/* Row A */}
                                <tr className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                                    <td className="p-3 font-bold text-blue-600"><InlineMath>{"\\vec{A}"}</InlineMath></td>
                                    <td className="p-3 text-center">
                                        <div className="text-xs text-slate-400">{magA} cos({angA}°)</div>
                                        <div className="font-bold text-slate-700 dark:text-slate-200">{ax.toFixed(2)}</div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="text-xs text-slate-400">{magA} sin({angA}°)</div>
                                        <div className="font-bold text-slate-700 dark:text-slate-200">{ay.toFixed(2)}</div>
                                    </td>
                                </tr>
                                {/* Row B */}
                                <tr className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                    <td className="p-3 font-bold text-purple-600"><InlineMath>{"\\vec{B}"}</InlineMath></td>
                                    <td className="p-3 text-center">
                                        <div className="text-xs text-slate-400">{magB} cos({angB}°)</div>
                                        <div className="font-bold text-slate-700 dark:text-slate-200">{bx.toFixed(2)}</div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="text-xs text-slate-400">{magB} sin({angB}°)</div>
                                        <div className="font-bold text-slate-700 dark:text-slate-200">{by.toFixed(2)}</div>
                                    </td>
                                </tr>
                                {/* Row Result */}
                                <tr className="bg-emerald-50 dark:bg-emerald-900/20 font-bold text-emerald-800 dark:text-emerald-200 text-lg">
                                    <td className="p-4"><InlineMath>{"\\vec{R}"}</InlineMath></td>
                                    <td className="p-4 text-center">{rx.toFixed(2)}</td>
                                    <td className="p-4 text-center">{ry.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="text-center text-sm text-slate-500">
                    The result vector is <InlineMath>{`\\vec{R} = \\langle ${rx.toFixed(2)}, ${ry.toFixed(2)} \\rangle`}</InlineMath>
                </div>

              </div>

            </div>
          </div>
        </div>
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}