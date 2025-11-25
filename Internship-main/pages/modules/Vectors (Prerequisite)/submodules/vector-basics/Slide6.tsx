import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---

// SVG Coordination space: 400x400, Center at 200,200
// Y is down in SVG, Up in Math. 
// We will store "Math Coordinates" in state for easier logic, then map to SVG for rendering.

interface VectorState {
  x: number;
  y: number;
}

export default function ComparingComponentsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State for Vector A (Blue) and Vector B (Purple)
  // These are component values (math coordinates)
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
    setVecA(prev => ({ x: prev.x + info.delta.x, y: prev.y - info.delta.y })); // Y inverted delta
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
    if (Math.abs(val1 - val2) < 5) return "text-green-600 font-bold";
    return "text-slate-500";
  };

  // Scenarios for "Quick Set" buttons
  const setScenario = (type: 'equal' | 'opposite' | 'orthogonal') => {
    if (type === 'equal') {
      setVecB({ ...vecA });
    } else if (type === 'opposite') {
      setVecB({ x: -vecA.x, y: -vecA.y });
    } else if (type === 'orthogonal') {
      // Rotate 90 degrees: (x, y) -> (-y, x)
      setVecB({ x: -vecA.y, y: vecA.x });
    }
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Comparing Vector Components</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Compare the horizontal ($x$) and vertical ($y$) contributions of two different vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
          
          {/* LEFT: SVG Visualization */}
          <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden shadow-inner flex items-center justify-center">
            
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                 <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 px-3 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Vector A</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 px-3 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Vector B</span>
                 </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="grid-compare" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="arrow-a" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                </marker>
                <marker id="arrow-b" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#A855F7" />
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-compare)" className="text-slate-400" />
              
              {/* Axes */}
              <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              
              <g transform="translate(200, 200)">
                
                {/* --- VECTOR A --- */}
                {/* Projections */}
                <line x1={vecA.x} y1={0} x2={vecA.x} y2={-vecA.y} stroke="#3B82F6" strokeDasharray="4,4" opacity="0.4" />
                <line x1={0} y1={-vecA.y} x2={vecA.x} y2={-vecA.y} stroke="#3B82F6" strokeDasharray="4,4" opacity="0.4" />
                {/* Arrow */}
                <line x1="0" y1="0" x2={vecA.x} y2={-vecA.y} stroke="#3B82F6" strokeWidth="4" markerEnd="url(#arrow-a)" />

                {/* --- VECTOR B --- */}
                {/* Projections */}
                <line x1={vecB.x} y1={0} x2={vecB.x} y2={-vecB.y} stroke="#A855F7" strokeDasharray="4,4" opacity="0.4" />
                <line x1={0} y1={-vecB.y} x2={vecB.x} y2={-vecB.y} stroke="#A855F7" strokeDasharray="4,4" opacity="0.4" />
                {/* Arrow */}
                <line x1="0" y1="0" x2={vecB.x} y2={-vecB.y} stroke="#A855F7" strokeWidth="4" markerEnd="url(#arrow-b)" />

              </g>
            </svg>

            {/* Draggable Handles (HTML Overlay) */}
            {/* Handle A */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={handleDragA}
              className="absolute w-10 h-10 rounded-full bg-blue-500/10 hover:bg-blue-500/30 cursor-move border border-blue-400 z-20 flex items-center justify-center"
              style={{ left: 200 + vecA.x - 20, top: 200 - vecA.y - 20 }}
            >
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </motion.div>

            {/* Handle B */}
            <motion.div
              drag
              dragMomentum={false}
              onDrag={handleDragB}
              className="absolute w-10 h-10 rounded-full bg-purple-500/10 hover:bg-purple-500/30 cursor-move border border-purple-400 z-20 flex items-center justify-center"
              style={{ left: 200 + vecB.x - 20, top: 200 - vecB.y - 20 }}
            >
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            </motion.div>

          </div>

          {/* RIGHT: Comparison Dashboard */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Logic Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Component Analysis</h3>
                </div>
                
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    
                    {/* X Comparison */}
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-blue-500 uppercase">A-Horizontal</span>
                            <span className="text-xl font-mono">{Math.round(vecA.x)}</span>
                        </div>
                        
                        <div className={`text-3xl font-bold px-4 ${getStyle(vecA.x, vecB.x)}`}>
                            {getSymbol(vecA.x, vecB.x)}
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-purple-500 uppercase">B-Horizontal</span>
                            <span className="text-xl font-mono">{Math.round(vecB.x)}</span>
                        </div>
                    </div>
                    
                    {/* Y Comparison */}
                    <div className="p-6 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-blue-500 uppercase">A-Vertical</span>
                            <span className="text-xl font-mono">{Math.round(vecA.y)}</span>
                        </div>
                        
                        <div className={`text-3xl font-bold px-4 ${getStyle(vecA.y, vecB.y)}`}>
                            {getSymbol(vecA.y, vecB.y)}
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-xs font-bold text-purple-500 uppercase">B-Vertical</span>
                            <span className="text-xl font-mono">{Math.round(vecB.y)}</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Quick Scenarios</h4>
                <div className="grid grid-cols-1 gap-2">
                    <button 
                        onClick={() => setScenario('equal')}
                        className="w-full py-2 px-4 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-medium transition-colors text-left flex justify-between items-center group"
                    >
                        <span>Make <InlineMath>{`\\vec{A} = \\vec{B}`}</InlineMath></span>
                        <span className="opacity-0 group-hover:opacity-100">➜</span>
                    </button>
                    <button 
                        onClick={() => setScenario('opposite')}
                        className="w-full py-2 px-4 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-medium transition-colors text-left flex justify-between items-center group"
                    >
                        <span>Make Opposite (<InlineMath>{`\\vec{A} = -\\vec{B}`}</InlineMath>)</span>
                        <span className="opacity-0 group-hover:opacity-100">➜</span>
                    </button>
                    <button 
                        onClick={() => setScenario('orthogonal')}
                        className="w-full py-2 px-4 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-medium transition-colors text-left flex justify-between items-center group"
                    >
                        <span>Make Perpendicular</span>
                        <span className="opacity-0 group-hover:opacity-100">➜</span>
                    </button>
                </div>
            </div>

            <div className="text-center text-xs text-slate-400 mt-auto">
                Dragging updates components in real-time.
            </div>

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