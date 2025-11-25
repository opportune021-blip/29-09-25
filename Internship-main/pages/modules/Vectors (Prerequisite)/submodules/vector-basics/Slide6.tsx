import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- HELPERS ---

interface VectorState {
  x: number;
  y: number;
}

export default function ComparingComponentsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State for Vector A (Blue) and Vector B (Purple)
  // Coordinates are relative to origin (0,0) in math space
  const [vecA, setVecA] = useState<VectorState>({ x: 50, y: 80 });
  const [vecB, setVecB] = useState<VectorState>({ x: -60, y: 40 });

  const slideInteraction: Interaction = {
    id: 'comparing-components-explore',
    conceptId: 'comparing-components',
    conceptName: 'Comparing Components',
    type: 'learning',
    description: 'Interactive tool to compare x and y components of two vectors.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // --- HANDLERS ---

  // Drag handler updates math coordinates based on delta
  const handleDragA = (_: any, info: any) => {
    setVecA(prev => ({ x: prev.x + info.delta.x, y: prev.y - info.delta.y })); // Y inverted for math
  };

  const handleDragB = (_: any, info: any) => {
    setVecB(prev => ({ x: prev.x + info.delta.x, y: prev.y - info.delta.y }));
  };

  // Helper to get comparison symbol
  const getSymbol = (val1: number, val2: number) => {
    const diff = val1 - val2;
    if (Math.abs(diff) < 5) return '='; // Tolerance
    return val1 > val2 ? '>' : '<';
  };

  const getStyle = (val1: number, val2: number) => {
    if (Math.abs(val1 - val2) < 5) return "text-green-600 font-bold bg-green-100 px-2 rounded";
    return "text-slate-400 font-mono";
  };

  // Scenarios for "Quick Set" buttons
  const setScenario = (type: 'equal' | 'opposite' | 'orthogonal') => {
    if (type === 'equal') {
      setVecB({ ...vecA });
    } else if (type === 'opposite') {
      setVecB({ x: -vecA.x, y: -vecA.y });
    } else if (type === 'orthogonal') {
      setVecB({ x: -vecA.y, y: vecA.x });
    }
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY & ANALYSIS (45%)      */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Scrollable Content Area */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Header / Intro Theory */}
            <div>
               <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Component Comparison</h2>
               <p className="text-slate-600 dark:text-slate-400 text-sm">
                 To compare two vectors, we don't just look at their length. We must compare their <span className="text-orange-500 font-bold">Horizontal (x)</span> and <span className="text-emerald-500 font-bold">Vertical (y)</span> parts separately.
               </p>
            </div>

            {/* Core Rule Block */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
               <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-2">The Rule of Equality</h3>
               <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                 Two vectors <InlineMath>{`\\vec{A}`}</InlineMath> and <InlineMath>{`\\vec{B}`}</InlineMath> are equal <strong>if and only if</strong>:
               </p>
               <div className="text-sm">
                 <BlockMath>{`A_x = B_x \\quad \\text{AND} \\quad A_y = B_y`}</BlockMath>
               </div>
            </div>

            {/* LIVE ANALYSIS TABLE */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                   <span className="text-xs font-bold uppercase text-slate-500">Live Analysis</span>
                   <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-slate-500">Real-time</span>
                </div>

                {/* X Comparison Row */}
                <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                   <div className="text-center w-16">
                      <div className="text-[10px] font-bold text-blue-500 uppercase mb-1">Ax</div>
                      <div className="font-mono text-lg text-slate-700 dark:text-slate-300">{Math.round(vecA.x)}</div>
                   </div>
                   
                   <div className={`text-xl ${getStyle(vecA.x, vecB.x)}`}>
                      {getSymbol(vecA.x, vecB.x)}
                   </div>

                   <div className="text-center w-16">
                      <div className="text-[10px] font-bold text-purple-500 uppercase mb-1">Bx</div>
                      <div className="font-mono text-lg text-slate-700 dark:text-slate-300">{Math.round(vecB.x)}</div>
                   </div>
                </div>

                {/* Y Comparison Row */}
                <div className="p-4 flex items-center justify-between">
                   <div className="text-center w-16">
                      <div className="text-[10px] font-bold text-blue-500 uppercase mb-1">Ay</div>
                      <div className="font-mono text-lg text-slate-700 dark:text-slate-300">{Math.round(vecA.y)}</div>
                   </div>
                   
                   <div className={`text-xl ${getStyle(vecA.y, vecB.y)}`}>
                      {getSymbol(vecA.y, vecB.y)}
                   </div>

                   <div className="text-center w-16">
                      <div className="text-[10px] font-bold text-purple-500 uppercase mb-1">By</div>
                      <div className="font-mono text-lg text-slate-700 dark:text-slate-300">{Math.round(vecB.y)}</div>
                   </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Quick Scenarios</h4>
                <button 
                  onClick={() => setScenario('equal')}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-left flex justify-between items-center group transition-all"
                >
                  <span className="text-slate-600 dark:text-slate-300">Make Equal (<InlineMath>{`\\vec{A} = \\vec{B}`}</InlineMath>)</span>
                  <span className="text-xs bg-slate-100 dark:bg-slate-600 px-2 py-0.5 rounded text-slate-500 dark:text-slate-300">Set</span>
                </button>
                <button 
                  onClick={() => setScenario('opposite')}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-left flex justify-between items-center group transition-all"
                >
                  <span className="text-slate-600 dark:text-slate-300">Make Opposite (<InlineMath>{`\\vec{A} = -\\vec{B}`}</InlineMath>)</span>
                  <span className="text-xs bg-slate-100 dark:bg-slate-600 px-2 py-0.5 rounded text-slate-500 dark:text-slate-300">Set</span>
                </button>
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: ANIMATION (55%)             */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col h-full">
         
         <div className="flex-grow bg-slate-950 rounded-xl border border-slate-700 relative overflow-hidden shadow-inner flex items-center justify-center min-h-[450px] group">
            
            {/* Dark Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center center' }}>
            </div>

            {/* Axes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-slate-600"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-full w-px bg-slate-600"></div>
            </div>

            {/* Legend Overlay */}
            <div className="absolute top-4 left-4 flex gap-3 z-10">
               <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-600">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-blue-200 font-mono">vec(A)</span>
               </div>
               <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-full border border-slate-600">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="text-xs text-purple-200 font-mono">vec(B)</span>
               </div>
            </div>

            {/* SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 400 400">
              <defs>
                <marker id="arrow-a" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M2,2 L10,6 L2,10 L2,2" fill="#3B82F6" />
                </marker>
                <marker id="arrow-b" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M2,2 L10,6 L2,10 L2,2" fill="#A855F7" />
                </marker>
              </defs>

              {/* Group Centered at 200, 200 */}
              <g transform="translate(200, 200)">
                
                {/* --- VECTOR A (Blue) --- */}
                {/* Projections */}
                <line x1={vecA.x} y1={0} x2={vecA.x} y2={-vecA.y} stroke="#3B82F6" strokeDasharray="4,4" opacity="0.3" strokeWidth="1" />
                <line x1={0} y1={-vecA.y} x2={vecA.x} y2={-vecA.y} stroke="#3B82F6" strokeDasharray="4,4" opacity="0.3" strokeWidth="1" />
                
                {/* Arrow */}
                <line x1="0" y1="0" x2={vecA.x} y2={-vecA.y} stroke="#3B82F6" strokeWidth="4" markerEnd="url(#arrow-a)" />
                
                {/* Labels */}
                <text x={vecA.x + 10} y={-vecA.y - 10} fill="#3B82F6" fontSize="12" fontWeight="bold">A</text>


                {/* --- VECTOR B (Purple) --- */}
                {/* Projections */}
                <line x1={vecB.x} y1={0} x2={vecB.x} y2={-vecB.y} stroke="#A855F7" strokeDasharray="4,4" opacity="0.3" strokeWidth="1" />
                <line x1={0} y1={-vecB.y} x2={vecB.x} y2={-vecB.y} stroke="#A855F7" strokeDasharray="4,4" opacity="0.3" strokeWidth="1" />
                
                {/* Arrow */}
                <line x1="0" y1="0" x2={vecB.x} y2={-vecB.y} stroke="#A855F7" strokeWidth="4" markerEnd="url(#arrow-b)" />
                
                {/* Labels */}
                <text x={vecB.x + 10} y={-vecB.y - 10} fill="#A855F7" fontSize="12" fontWeight="bold">B</text>

              </g>
            </svg>

            {/* Draggable Handles (Motion Divs) */}
            
            {/* Handle A */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={handleDragA}
              className="absolute w-12 h-12 rounded-full cursor-move flex items-center justify-center group z-20"
              style={{ left: 200 + vecA.x - 24, top: 200 - vecA.y - 24 }}
            >
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-slate-900 ring-2 ring-blue-500/50 group-hover:scale-110 transition-transform shadow-lg" />
            </motion.div>

            {/* Handle B */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={handleDragB}
              className="absolute w-12 h-12 rounded-full cursor-move flex items-center justify-center group z-20"
              style={{ left: 200 + vecB.x - 24, top: 200 - vecB.y - 24 }}
            >
                <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-slate-900 ring-2 ring-purple-500/50 group-hover:scale-110 transition-transform shadow-lg" />
            </motion.div>

            <div className="absolute bottom-4 right-4 text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded">
               Try dragging vectors to overlap
            </div>

         </div>

      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="comparing-components"
      slideTitle="Comparing the components of vectors"
      moduleId="vectors-prerequisite"
      submoduleId="vector-basics"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}