import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

type AngleMode = 'standard' | 'vertical' | 'bearing';

export default function CompFromMagDirAdvSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State
  const [magnitude, setMagnitude] = useState(6);
  const [inputAngle, setInputAngle] = useState(30); // The angle value the user sees/sets
  const [mode, setMode] = useState<AngleMode>('vertical'); // Default to vertical to show contrast

  // Config
  const GRID = 35;
  const CENTER_X = 200;
  const CENTER_Y = 250;

  // --- LOGIC: Convert Input Angle to Standard Math Angle (from +x axis) ---
  let standardAngleDeg = 0;
  
  if (mode === 'standard') {
    // Normal: 0 is Right, CCW
    standardAngleDeg = inputAngle;
  } else if (mode === 'vertical') {
    // From +y axis (North), going CW or CCW? 
    // Let's assume "Angle from Vertical" usually means theta relative to Y axis.
    // For simplicity in this demo, let's say "Angle with positive y-axis, clockwise"
    // So 30 deg from vertical means 90 - 30 = 60 deg standard.
    standardAngleDeg = 90 - inputAngle;
  } else if (mode === 'bearing') {
    // Bearing: 0 is North (+y), Clockwise
    // 0 -> 90 standard
    // 90 -> 0 standard
    // 180 -> 270 standard
    // Formula: Standard = 90 - Bearing
    standardAngleDeg = 90 - inputAngle;
  }

  // Normalize standard angle for calc
  const rad = toRad(standardAngleDeg);
  const compX = magnitude * Math.cos(rad);
  const compY = magnitude * Math.sin(rad);

  const slideInteraction: Interaction = {
    id: 'comp-adv-explore',
    conceptId: 'resolving-vectors-advanced',
    conceptName: 'Advanced Resolution (Reference Angles)',
    type: 'learning',
    description: 'Resolving vectors when angles are defined relative to vertical or bearings.'
  };

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Helper to render the arc path correctly based on mode
  const renderAngleArc = () => {
    // We need start angle and end angle for the arc
    let startRad = 0;
    let endRad = 0;
    let color = "#3B82F6";

    if (mode === 'standard') {
        startRad = 0; // +x
        endRad = -rad; // SVG y is flipped
        color = "#3B82F6"; // Blue
    } else if (mode === 'vertical') {
        startRad = -Math.PI / 2; // -90 deg in SVG is UP
        endRad = -rad;
        color = "#F97316"; // Orange
    } else if (mode === 'bearing') {
        startRad = -Math.PI / 2; // North
        endRad = -rad;
        color = "#A855F7"; // Purple
    }

    // SVG coordinate flips: Standard math angle theta -> SVG angle -theta
    // Logic for Arc Path is tricky in pure SVG path commands without d3-shape, 
    // simplified visual: just draw line indicators for start/end.
    
    return (
        <>
            {/* Reference Line */}
            <line 
                x1="0" y1="0" 
                x2={Math.cos(startRad)*GRID*3} y2={Math.sin(startRad)*GRID*3}
                stroke={color} strokeWidth="1" strokeDasharray="4,4"
            />
            {/* Simple Arc visualization approximated */}
            {/* (Omitted complex arc path logic for brevity/robustness, relying on labels) */}
        </>
    );
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Resolving with Non-Standard Angles</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            In physics, angles aren't always measured from the x-axis. 
            If the angle is given relative to the <strong>vertical</strong>, our <InlineMath>\sin</InlineMath> and <InlineMath>\cos</InlineMath> rules might flip!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Graph */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
            
            {/* Mode Indicator */}
            <div className="absolute top-4 right-4 text-right z-10">
                <div className="text-xs text-slate-400 uppercase font-bold">Current Mode</div>
                <div className={`font-bold text-lg ${mode === 'standard' ? 'text-blue-600' : mode === 'vertical' ? 'text-orange-600' : 'text-purple-600'}`}>
                    {mode === 'standard' ? 'Standard Position' : mode === 'vertical' ? 'From Vertical' : 'Compass Bearing'}
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-adv" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                </pattern>
                <marker id="head-v-adv" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-adv)" className="text-slate-400" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="currentColor" strokeWidth="2" className="text-slate-300" />
              
              {/* Compass Labels for Bearing Mode */}
              {mode === 'bearing' && (
                  <>
                    <text x={CENTER_X} y="20" textAnchor="middle" fontWeight="bold" fill="#A855F7">N (0°)</text>
                    <text x="380" y={CENTER_Y} textAnchor="end" dominantBaseline="middle" fontWeight="bold" fill="#A855F7">E (90°)</text>
                  </>
              )}

              <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                
                {renderAngleArc()}

                {/* Vector */}
                <motion.line 
                    animate={{ x2: compX * GRID, y2: -compY * GRID }} 
                    x1="0" y1="0"
                    stroke="#3B82F6" strokeWidth="4" markerEnd="url(#head-v-adv)"
                />

                {/* Projection Lines */}
                <motion.line 
                    animate={{ x1: compX * GRID, x2: compX * GRID, y2: -compY * GRID }}
                    y1="0" stroke="#94a3b8" strokeDasharray="4,4"
                />
                <motion.line 
                    animate={{ y1: -compY * GRID, y2: -compY * GRID, x2: compX * GRID }}
                    x1="0" stroke="#94a3b8" strokeDasharray="4,4"
                />
                
                {/* Labels */}
                <motion.text 
                    animate={{ x: compX * GRID, y: 15 }} 
                    textAnchor="middle" fill="#64748b" fontSize="12"
                >
                    v_x
                </motion.text>
                <motion.text 
                    animate={{ x: -15, y: -compY * GRID }} 
                    dominantBaseline="middle" textAnchor="end" fill="#64748b" fontSize="12"
                >
                    v_y
                </motion.text>

              </g>
            </svg>
            
            {/* Angle Input Slider Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 bg-white/90 dark:bg-slate-800/90 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold">Input Angle</span>
                    <span className="font-mono">{inputAngle}°</span>
                </div>
                <input 
                    type="range" min="0" max="90" step="1"
                    value={inputAngle}
                    onChange={(e) => setInputAngle(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                />
            </div>

          </div>

          {/* RIGHT: Controls & Formulas */}
          <div className="flex flex-col gap-6">
            
            {/* Mode Selection */}
            <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex gap-2">
                <button
                    onClick={() => setMode('standard')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${mode === 'standard' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500'}`}
                >
                    Standard (x-axis)
                </button>
                <button
                    onClick={() => setMode('vertical')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${mode === 'vertical' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500'}`}
                >
                    Vertical (y-axis)
                </button>
                <button
                    onClick={() => setMode('bearing')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${mode === 'bearing' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500'}`}
                >
                    Bearing
                </button>
            </div>

            {/* Formula Logic Breakdown */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 border-b pb-2">Component Formulas</h3>
                
                {mode === 'standard' && (
                    <div className="text-blue-700 dark:text-blue-300">
                        <p className="mb-4 text-sm">
                            This is the standard definition. The angle is <strong>adjacent</strong> to the x-axis.
                        </p>
                        <div className="space-y-3 font-mono text-sm bg-white dark:bg-slate-800 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
                            <div><InlineMath>v_x = r \cos(\theta)</InlineMath></div>
                            <div><InlineMath>v_y = r \sin(\theta)</InlineMath></div>
                        </div>
                    </div>
                )}

                {mode === 'vertical' && (
                    <div className="text-orange-700 dark:text-orange-300">
                        <p className="mb-4 text-sm">
                            Wait! The angle is now <strong>adjacent</strong> to the Y-axis. 
                            <br/>We must <strong>swap</strong> our trig functions!
                        </p>
                        <div className="space-y-3 font-mono text-sm bg-white dark:bg-slate-800 p-4 rounded-lg border border-orange-200 dark:border-orange-900 relative">
                            <div className="absolute right-4 top-4 text-xs font-bold bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">SWAPPED</div>
                            <div>
                                <span className="line-through opacity-50 mr-2"><InlineMath>v_x = r \cos</InlineMath></span>
                                <strong><InlineMath>v_x = r \sin(\phi)</InlineMath></strong> (Opposite)
                            </div>
                            <div>
                                <span className="line-through opacity-50 mr-2"><InlineMath>v_y = r \sin</InlineMath></span>
                                <strong><InlineMath>v_y = r \cos(\phi)</InlineMath></strong> (Adjacent)
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'bearing' && (
                    <div className="text-purple-700 dark:text-purple-300">
                        <p className="mb-4 text-sm">
                            Bearings start at North (y-axis). Like the vertical case, this swaps x and y relations.
                        </p>
                        <div className="space-y-3 font-mono text-sm bg-white dark:bg-slate-800 p-4 rounded-lg border border-purple-200 dark:border-purple-900">
                             <div>
                                <strong><InlineMath>v_x = r \sin(\beta)</InlineMath></strong> (East/West)
                            </div>
                            <div>
                                <strong><InlineMath>v_y = r \cos(\beta)</InlineMath></strong> (North/South)
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Result Table */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold">Calculated X</div>
                    <div className="font-mono font-bold text-lg">{compX.toFixed(2)}</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold">Calculated Y</div>
                    <div className="font-mono font-bold text-lg">{compY.toFixed(2)}</div>
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="comp-from-mag-dir-adv"
      slideTitle="Vector components from magnitude & direction (advanced)"
      moduleId="vectors-prerequisite"
      submoduleId="component-form-of-vectors"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}