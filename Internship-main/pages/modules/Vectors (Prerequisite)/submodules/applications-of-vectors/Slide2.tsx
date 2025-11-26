import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

export default function WordProblemHikingSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Two legs of the hike
  // Leg 1: Distance and Angle (Standard position for simplicity)
  const [d1, setD1] = useState(3); // km
  const [a1, setA1] = useState(0); // degrees (East)

  // Leg 2
  const [d2, setD2] = useState(4); // km
  const [a2, setA2] = useState(90); // degrees (North)

  // Config
  const SCALE = 30; // Pixels per km
  const CENTER_X = 100; // Start point (Base Camp)
  const CENTER_Y = 400;

  // --- CALCULATIONS ---
  
  // Leg 1 Components
  const x1 = d1 * Math.cos(toRad(a1));
  const y1 = d1 * Math.sin(toRad(a1));

  // Leg 2 Components
  const x2 = d2 * Math.cos(toRad(a2));
  const y2 = d2 * Math.sin(toRad(a2));

  // Resultant (Displacement)
  const rx = x1 + x2;
  const ry = y1 + y2;
  
  const totalDistance = d1 + d2; // Scalar sum
  const displacementMag = Math.sqrt(rx**2 + ry**2); // Vector sum magnitude
  const displacementAng = toDeg(Math.atan2(ry, rx));

  const slideInteraction: Interaction = {
    id: 'hiking-vectors-explore',
    conceptId: 'displacement-vs-distance',
    conceptName: 'Displacement vs Distance',
    type: 'learning',
    description: 'Using vector addition to solve a multi-leg hiking navigation problem.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: THEORY, CONTROLS & DATA      */}
      {/* ========================================= */}
      <div className="lg:w-5/12 flex flex-col gap-6 h-full">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">The Hiker's Journey</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
                Vector addition: Displacement vs. Distance.
            </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            
            {/* Leg 1 Controls */}
            <div>
                <h3 className="text-xs font-bold text-blue-600 uppercase mb-2">Leg 1 (Blue)</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Distance (km)</label>
                        <input type="number" min="0" max="10" value={d1} onChange={(e) => setD1(Number(e.target.value))} className="w-full p-2 text-sm border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Angle (deg)</label>
                        <input type="number" min="0" max="360" step="15" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full p-2 text-sm border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
                    </div>
                </div>
            </div>

            {/* Leg 2 Controls */}
            <div>
                <h3 className="text-xs font-bold text-purple-600 uppercase mb-2">Leg 2 (Purple)</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Distance (km)</label>
                        <input type="number" min="0" max="10" value={d2} onChange={(e) => setD2(Number(e.target.value))} className="w-full p-2 text-sm border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 block mb-1">Angle (deg)</label>
                        <input type="number" min="0" max="360" step="15" value={a2} onChange={(e) => setA2(Number(e.target.value))} className="w-full p-2 text-sm border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats Panel */}
        <div className="bg-slate-800 text-white rounded-xl border border-slate-700 overflow-hidden shadow-lg flex-grow flex flex-col justify-center p-5">
            <div className="text-center font-bold text-slate-400 text-sm uppercase tracking-wider mb-4 border-b border-slate-600 pb-2">Trip Statistics</div>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-300">
                        Total Distance Walked
                        <div className="text-[10px] opacity-60 font-normal">(Scalar Sum)</div>
                    </div>
                    <div className="text-xl font-mono font-bold text-white">
                        {totalDistance.toFixed(2)} km
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-red-400 font-bold">
                        Net Displacement
                        <div className="text-[10px] opacity-80 font-normal text-red-300">(Vector Resultant)</div>
                    </div>
                    <div className="text-xl font-mono font-bold text-red-400">
                        {displacementMag.toFixed(2)} km
                    </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-600 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Final Direction</div>
                    <div className="font-mono text-lg">
                        {displacementAng.toFixed(1)}° <span className="text-xs text-slate-500">from East</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="text-center text-[10px] text-slate-400 italic">
            Notice: Displacement is always <InlineMath>\le</InlineMath> Total Distance.
        </div>

      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: MAP VISUALIZATION           */}
      {/* ========================================= */}
      <div className="lg:w-7/12 flex flex-col h-full bg-emerald-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden relative min-h-[400px]">
        
        {/* Map Decorations */}
        <div className="absolute top-4 right-4 opacity-50 pointer-events-none z-0 text-4xl">🧭</div>
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 dark:bg-slate-800/90 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-xs pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-1 bg-blue-600 rounded"></span> Leg 1 (Blue)
            </div>
            <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-1 bg-purple-600 rounded"></span> Leg 2 (Purple)
            </div>
            <div className="flex items-center gap-2 font-bold text-red-600">
                <span className="w-4 h-1 bg-red-600 border border-red-600 border-dashed"></span> Displacement
            </div>
        </div>

        <svg className="w-full h-full z-10" viewBox="0 0 600 500">
            <defs>
            <marker id="arrow-hike-1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#2563EB" /></marker>
            <marker id="arrow-hike-2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#9333EA" /></marker>
            <marker id="arrow-disp" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#DC2626" /></marker>
            </defs>

            {/* Coordinate System (Start at Base Camp) */}
            <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
            
            {/* Start Point Marker */}
            <circle cx="0" cy="0" r="6" fill="#10B981" stroke="white" strokeWidth="2" />
            <text x="-10" y="25" fontSize="12" fontWeight="bold" fill="#059669">Base Camp</text>

            {/* Leg 1 Vector */}
            <motion.line 
                animate={{ x2: x1 * SCALE, y2: -y1 * SCALE }}
                x1="0" y1="0"
                stroke="#2563EB" strokeWidth="4" markerEnd="url(#arrow-hike-1)"
            />
            <motion.text 
                animate={{ x: (x1 * SCALE)/2, y: -(y1 * SCALE)/2 - 10 }} 
                fontSize="12" fill="#2563EB" fontWeight="bold"
            >
                {d1}km
            </motion.text>

            {/* Leg 2 Vector (Starts at end of Leg 1) */}
            <motion.line 
                animate={{ 
                    x1: x1 * SCALE, y1: -y1 * SCALE,
                    x2: (x1 + x2) * SCALE, y2: -(y1 + y2) * SCALE 
                }}
                stroke="#9333EA" strokeWidth="4" markerEnd="url(#arrow-hike-2)"
            />
            <motion.text 
                animate={{ x: x1 * SCALE + (x2 * SCALE)/2, y: -y1 * SCALE - (y2 * SCALE)/2 - 10 }} 
                fontSize="12" fill="#9333EA" fontWeight="bold"
            >
                {d2}km
            </motion.text>

            {/* Resultant Displacement (Dashed Red Line) */}
            <motion.line 
                animate={{ x2: rx * SCALE, y2: -ry * SCALE }}
                x1="0" y1="0"
                stroke="#DC2626" strokeWidth="4" strokeDasharray="8,4" markerEnd="url(#arrow-disp)"
            />
            
            {/* Destination Marker */}
            <motion.g animate={{ x: rx * SCALE, y: -ry * SCALE }}>
                <circle cx="0" cy="0" r="6" fill="#DC2626" stroke="white" strokeWidth="2" />
                <text x="10" y="5" fontSize="12" fontWeight="bold" fill="#DC2626">Finish</text>
            </motion.g>

            </g>
        </svg>
      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="word-problem-hiking"
      slideTitle="Vector word problem: hiking"
      moduleId="vectors-prerequisite"
      submoduleId="applications-of-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}