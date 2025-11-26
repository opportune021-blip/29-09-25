import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- MATH HELPERS ---
const toRad = (deg: number) => (deg * Math.PI) / 180;

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
    standardAngleDeg = inputAngle;
  } else if (mode === 'vertical') {
    standardAngleDeg = 90 - inputAngle;
  } else if (mode === 'bearing') {
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

  const renderAngleArc = () => {
    let startRad = 0;
    let color = "#3B82F6";

    if (mode === 'standard') {
        startRad = 0; 
        color = "#3B82F6"; // Blue
    } else if (mode === 'vertical') {
        startRad = -Math.PI / 2; 
        color = "#F97316"; // Orange
    } else if (mode === 'bearing') {
        startRad = -Math.PI / 2; 
        color = "#A855F7"; // Purple
    }
    
    return (
        <>
            <line 
                x1="0" y1="0" 
                x2={Math.cos(startRad)*GRID*3} y2={Math.sin(startRad)*GRID*3}
                stroke={color} strokeWidth="1" strokeDasharray="4,4"
            />
        </>
    );
  };

  const slideContent = (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-stretch">
      
      {/* ========================================= */}
      {/* LEFT COLUMN: VISUALIZATION (50%)          */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col h-full gap-6">
        
        <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative flex-grow overflow-hidden select-none shadow-inner flex items-center justify-center min-h-[400px]">
            
            <div className="absolute top-4 right-4 text-right z-10">
                <div className="text-xs text-slate-400 uppercase font-bold">Current Mode</div>
                <div className={`font-bold text-lg ${mode === 'standard' ? 'text-blue-600' : mode === 'vertical' ? 'text-orange-600' : 'text-purple-600'}`}>
                    {mode === 'standard' ? 'Standard Position' : mode === 'vertical' ? 'From Vertical' : 'Compass Bearing'}
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <pattern id="grid-adv" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                  <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="#334155" strokeOpacity="0.5" strokeWidth="1"/>
                </pattern>
                <marker id="head-v-adv" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" /></marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-adv)" />
              
              {/* Axes */}
              <line x1={CENTER_X} y1="0" x2={CENTER_X} y2="400" stroke="#475569" strokeWidth="2" />
              <line x1="0" y1={CENTER_Y} x2="400" y2={CENTER_Y} stroke="#475569" strokeWidth="2" />
              
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
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 bg-slate-800/90 px-4 py-3 rounded-xl shadow-lg border border-slate-700">
                <div className="flex justify-between text-sm mb-2 text-slate-300">
                    <span className="font-bold">Input Angle</span>
                    <span className="font-mono">{inputAngle}°</span>
                </div>
                <input 
                    type="range" min="0" max="90" step="1"
                    value={inputAngle}
                    onChange={(e) => setInputAngle(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* RIGHT COLUMN: THEORY & MATH (50%)         */}
      {/* ========================================= */}
      <div className="lg:w-1/2 flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Non-Standard Angles</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Resolving when the angle isn't from the x-axis.
            </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Mode Toggle */}
            <div className="flex gap-2">
                <button onClick={() => setMode('standard')} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${mode === 'standard' ? 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300' : 'border-slate-200 text-slate-500'}`}>Standard</button>
                <button onClick={() => setMode('vertical')} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${mode === 'vertical' ? 'bg-orange-100 border-orange-200 text-orange-700 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-300' : 'border-slate-200 text-slate-500'}`}>Vertical</button>
                <button onClick={() => setMode('bearing')} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${mode === 'bearing' ? 'bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-300' : 'border-slate-200 text-slate-500'}`}>Bearing</button>
            </div>

            {/* Formulas */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3 text-sm uppercase">Component Formulas</h3>
                
                {mode === 'standard' && (
                    <div className="text-blue-700 dark:text-blue-300 space-y-2">
                        <p className="text-xs mb-2">Angle is adjacent to x-axis.</p>
                        <BlockMath>v_x = r \cos(\theta)</BlockMath>
                        <BlockMath>v_y = r \sin(\theta)</BlockMath>
                    </div>
                )}

                {mode === 'vertical' && (
                    <div className="text-orange-700 dark:text-orange-300 space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">SWAPPED!</span>
                            <p className="text-xs">Angle is adjacent to y-axis.</p>
                        </div>
                        <BlockMath>v_x = r \sin(\phi)</BlockMath>
                        <BlockMath>v_y = r \cos(\phi)</BlockMath>
                    </div>
                )}

                {mode === 'bearing' && (
                    <div className="text-purple-700 dark:text-purple-300 space-y-2">
                        <p className="text-xs mb-2">Bearings start from North (y-axis). This swaps the relations.</p>
                        <BlockMath>v_x = r \sin(\beta)</BlockMath>
                        <BlockMath>v_y = r \cos(\beta)</BlockMath>
                    </div>
                )}
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold">X Calc</div>
                    <div className="font-mono font-bold text-lg">{compX.toFixed(2)}</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg">
                    <div className="text-xs text-slate-500 uppercase font-bold">Y Calc</div>
                    <div className="font-mono font-bold text-lg">{compY.toFixed(2)}</div>
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