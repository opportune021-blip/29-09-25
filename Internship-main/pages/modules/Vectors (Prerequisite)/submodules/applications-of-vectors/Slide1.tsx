import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toRad = (deg: number) => (deg * Math.PI) / 180;

export default function WordProblemCompSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State
  const [force, setForce] = useState(100); // Newtons
  const [angle, setAngle] = useState(30); // Degrees

  // Config
  const GRID = 1; // We define custom scaling for the scene
  const SCALE = 2.5; // Drawing scale factor

  // Calculations
  const rad = toRad(angle);
  const fx = force * Math.cos(rad);
  const fy = force * Math.sin(rad);

  const slideInteraction: Interaction = {
    id: 'word-problem-comp-explore',
    conceptId: 'vector-force-components',
    conceptName: 'Force Components Application',
    type: 'learning',
    description: 'Applying vector resolution to a sled pulling problem.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  return (
    <SlideComponentWrapper
      slideId="word-problem-comp"
      slideTitle="Vector components from magnitude & direction: word problem"
      moduleId="vectors-prerequisite"
      submoduleId="applications-of-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        <div className="w-full p-4 sm:p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Real-World Application: Pulling a Sled</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                When you pull a sled at an angle, not all your force goes into moving it forward. 
                <br/>We resolve the force vector to find how much is <strong>Horizontal (Motion)</strong> vs. <strong>Vertical (Lift)</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* LEFT: Scenario Visualization */}
              <div className="bg-gradient-to-b from-sky-100 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
                
                {/* Ground */}
                <div className="absolute bottom-0 w-full h-24 bg-white dark:bg-slate-800 border-t border-slate-300 dark:border-slate-600">
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 opacity-50" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                </div>

                <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 500 450">
                  <defs>
                    <marker id="force-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" /></marker>
                    <marker id="comp-x-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3B82F6" /></marker>
                    <marker id="comp-y-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#10B981" /></marker>
                  </defs>

                  {/* Sled Position */}
                  <g transform="translate(100, 320)">
                    
                    {/* The Sled/Box */}
                    <rect x="-40" y="-30" width="80" height="30" rx="4" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                    <text x="0" y="-10" textAnchor="middle" fontSize="20">🛷</text>

                    {/* Force Vector (Red) */}
                    <motion.line 
                        initial={false}
                        animate={{ x2: fx * SCALE, y2: -fy * SCALE }}
                        x1="0" y1="-15" // Start from attachment point
                        stroke="#EF4444" strokeWidth="5" markerEnd="url(#force-arrow)" 
                    />

                    {/* Components (Animated) */}
                    
                    {/* Horizontal (Blue) - The Pull */}
                    <motion.line 
                        initial={false}
                        animate={{ x2: fx * SCALE }}
                        x1="0" y1="-15" y2="-15"
                        stroke="#3B82F6" strokeWidth="4" markerEnd="url(#comp-x-arrow)" 
                    />

                    {/* Vertical (Green) - The Lift */}
                    <motion.line 
                        initial={false}
                        animate={{ 
                            x1: fx * SCALE, 
                            x2: fx * SCALE,
                            y2: -fy * SCALE - 15
                        }}
                        y1="-15"
                        stroke="#10B981" strokeWidth="4" markerEnd="url(#comp-y-arrow)"
                        strokeDasharray="4,4"
                    />

                    {/* Angle Arc */}
                    <path 
                        d={`M 40 -15 A 40 40 0 0 0 ${Math.cos(rad)*40} ${-Math.sin(rad)*40 - 15}`}
                        fill="none" stroke="#64748b" strokeWidth="1"
                    />
                    <text x="50" y="-20" fontSize="12" fill="#64748b">{angle}°</text>

                    {/* Force Label */}
                    <motion.text 
                        animate={{ x: fx * SCALE / 2, y: -fy * SCALE / 2 - 30 }} 
                        textAnchor="middle" fill="#EF4444" fontWeight="bold" fontSize="14"
                        style={{ textShadow: '0px 1px 2px white' }}
                    >
                        F = {force}N
                    </motion.text>

                  </g>
                </svg>

                {/* Dynamic Effect Text */}
                <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-lg border border-blue-200 dark:border-slate-700 shadow-sm w-48">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Effective Pull</div>
                        <div className="text-xl font-bold text-blue-600">{fx.toFixed(1)} N</div>
                        <div className="w-full bg-slate-200 h-1 rounded-full mt-1 overflow-hidden">
                            <motion.div 
                                animate={{ width: `${(fx/150)*100}%` }}
                                className="h-full bg-blue-500" 
                            />
                        </div>
                    </div>
                    <div className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-lg border border-emerald-200 dark:border-slate-700 shadow-sm w-48">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Lifting Force</div>
                        <div className="text-xl font-bold text-emerald-600">{fy.toFixed(1)} N</div>
                        <div className="w-full bg-slate-200 h-1 rounded-full mt-1 overflow-hidden">
                            <motion.div 
                                animate={{ width: `${(fy/150)*100}%` }}
                                className="h-full bg-emerald-500" 
                            />
                        </div>
                    </div>
                </div>

              </div>

              {/* RIGHT: Controls & Explanation */}
              <div className="flex flex-col gap-6">
                
                {/* Problem Statement */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Problem Parameters</h3>
                    
                    {/* Force Slider */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-red-600">Total Force (<InlineMath>F</InlineMath>)</span>
                            <span className="font-mono bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 rounded">{force} N</span>
                        </div>
                        <input 
                            type="range" min="50" max="150" step="5" value={force}
                            onChange={(e) => setForce(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                    </div>

                    {/* Angle Slider */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-600 dark:text-slate-300">Angle (<InlineMath>\theta</InlineMath>)</span>
                            <span className="font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 rounded">{angle}°</span>
                        </div>
                        <input 
                            type="range" min="0" max="90" step="5" value={angle}
                            onChange={(e) => setAngle(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
                        />
                    </div>
                </div>

                {/* Solution Steps */}
                <div className="space-y-4">
                    
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2 text-sm uppercase tracking-wide">1. Horizontal Component (Motion)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            The adjacent side uses <strong>Cosine</strong>.
                        </p>
                        <div className="font-mono bg-white dark:bg-slate-800 p-3 rounded text-sm text-slate-700 dark:text-slate-300">
                            <BlockMath>{`F_x = F \\cos(\\theta) = ${force} \\cdot \\cos(${angle}^\\circ) = ${fx.toFixed(1)} \\text{ N}`}</BlockMath>
                        </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2 text-sm uppercase tracking-wide">2. Vertical Component (Lift)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            The opposite side uses <strong>Sine</strong>.
                        </p>
                        <div className="font-mono bg-white dark:bg-slate-800 p-3 rounded text-sm text-slate-700 dark:text-slate-300">
                            <BlockMath>{`F_y = F \\sin(\\theta) = ${force} \\cdot \\sin(${angle}^\\circ) = ${fy.toFixed(1)} \\text{ N}`}</BlockMath>
                        </div>
                    </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}