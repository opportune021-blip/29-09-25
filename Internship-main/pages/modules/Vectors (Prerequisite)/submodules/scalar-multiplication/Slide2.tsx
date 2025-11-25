import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function ScalarMultMagDirSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State
  const [scalar, setScalar] = useState(2); // 'k'
  const [baseMag, setBaseMag] = useState(3); // Base length units
  const [baseAngle, setBaseAngle] = useState(45); // Degrees

  // Config
  const SCALE_PX = 30; // Pixels per unit
  const CENTER = 200;

  // Derived Values
  const kMag = Math.abs(scalar);
  const newMag = baseMag * kMag;
  const isFlipped = scalar < 0;
  
  // Coordinate Calculation for SVG
  const angleRad = (baseAngle * Math.PI) / 180;
  
  // Base Vector Tip
  const baseX = baseMag * Math.cos(angleRad);
  const baseY = baseMag * Math.sin(angleRad);
  
  // Result Vector Tip (Scalar applied)
  // Note: If scalar is negative, cos/sin math naturally handles the flip
  const resultX = scalar * baseX; 
  const resultY = scalar * baseY;

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideInteraction: Interaction = {
    id: 'scalar-mult-mag-dir-explore',
    conceptId: 'scalar-mult-geometry',
    conceptName: 'Scalar Multiplication (Geometry)',
    type: 'learning',
    description: 'Visualizing how scalars scale magnitude and flip direction.'
  };

  const slideContent = (
    <div className="w-full p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Geometric Effect of Scalars</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Geometrically, a scalar <InlineMath>k</InlineMath> changes the <strong>length</strong> by a factor of <InlineMath>|k|</InlineMath>. 
            If <InlineMath>k</InlineMath> is negative, it also <strong>reverses</strong> the direction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Polar Visualization */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 relative h-[450px] overflow-hidden select-none shadow-inner flex items-center justify-center">
            
            {/* Legend */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="w-8 h-1 bg-slate-400/50 rounded-full"></div>
                    <span className="text-xs font-bold text-slate-500">Original <InlineMath>| = {baseMag}</InlineMath></span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Result <InlineMath> = {newMag.toFixed(1)}</InlineMath></span>
                </div>
            </div>

            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                {/* Radial Grid Pattern */}
                <pattern id="grid-polar" width="400" height="400" patternUnits="userSpaceOnUse">
                   <circle cx="200" cy="200" r="30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                   <circle cx="200" cy="200" r="60" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                   <circle cx="200" cy="200" r="90" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                   <circle cx="200" cy="200" r="120" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                   <circle cx="200" cy="200" r="150" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                   {/* Crosshairs */}
                   <line x1="0" y1="200" x2="400" y2="200" stroke="#cbd5e1" strokeWidth="1" />
                   <line x1="200" y1="0" x2="200" y2="400" stroke="#cbd5e1" strokeWidth="1" />
                </pattern>
                
                <marker id="arrow-base-g" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
                <marker id="arrow-result-g" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#2563EB" />
                </marker>
                <marker id="arrow-result-flip" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" /> {/* Red for flip */}
                </marker>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid-polar)" className="dark:opacity-20" />

              <g transform={`translate(${CENTER}, ${CENTER})`}>
                
                {/* Base Vector Ghost */}
                {scalar !== 1 && (
                    <line 
                        x1="0" y1="0" 
                        x2={baseX * SCALE_PX} y2={-baseY * SCALE_PX} 
                        stroke="#94a3b8" strokeWidth="4" strokeOpacity="0.4"
                        markerEnd="url(#arrow-base-g)"
                    />
                )}

                {/* Result Vector */}
                <motion.line
                    initial={false}
                    animate={{
                        x2: resultX * SCALE_PX,
                        y2: -resultY * SCALE_PX
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                    x1="0" y1="0"
                    stroke={isFlipped ? "#EF4444" : "#2563EB"} 
                    strokeWidth="5"
                    markerEnd={`url(#arrow-result-${isFlipped ? 'flip' : 'g'})`}
                />

                {/* Magnitude Braces/Labels could go here but simple text is cleaner for this concept */}
              </g>
            </svg>
            
            {/* Direction Indicator Overlay */}
            <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${isFlipped ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                {isFlipped ? "⚠️ Direction Reversed" : "✅ Direction Maintained"}
            </div>

          </div>

          {/* RIGHT: Controls & Rules */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Controls Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                
                {/* Scalar Slider */}
                <div className="mb-6">
                    <label className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Scalar (<InlineMath>k</InlineMath>)</span>
                        <span className="text-xl font-mono font-bold text-blue-600">{scalar}</span>
                    </label>
                    <input 
                        type="range" min="-2.5" max="2.5" step="0.25"
                        value={scalar}
                        onChange={(e) => setScalar(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                {/* Base Angle Slider (Just for fun exploration) */}
                <div>
                    <label className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-slate-500">Vector Angle</span>
                        <span className="font-mono text-slate-500">{baseAngle}°</span>
                    </label>
                    <input 
                        type="range" min="0" max="360" step="15"
                        value={baseAngle}
                        onChange={(e) => setBaseAngle(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-400"
                    />
                </div>
            </div>

            {/* Rules Breakdown */}
            <div className="flex-grow bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
                
                <div className="space-y-6">
                    
                    {/* Magnitude Rule */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold shrink-0">1</div>
                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-slate-100">Magnitude Rule</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">New length is <InlineMath>|k|</InlineMath> times original length.</p>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 font-mono text-sm">
                                <BlockMath>{`|k\\vec{v}| = |${scalar}| \\cdot ${baseMag} = ${newMag.toFixed(2)}`}</BlockMath>
                            </div>
                        </div>
                    </div>

                    {/* Direction Rule */}
                    <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${isFlipped ? 'bg-red-500' : 'bg-green-500'}`}>2</div>
                        <div>
                            <h4 className="font-bold text-slate-800 dark:text-slate-100">Direction Rule</h4>
                            <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc ml-4 space-y-1">
                                <li className={!isFlipped ? "font-bold text-green-600" : ""}>If <InlineMath>{`k > 0`}</InlineMath>: Same direction</li>
                                <li className={isFlipped ? "font-bold text-red-500" : ""}>If <InlineMath>{`k < 0`}</InlineMath>: Opposite direction</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="scalar-mult-mag-dir"
      slideTitle="Scalar multiplication: magnitude and direction"
      moduleId="vectors-prerequisite"
      submoduleId="scalar-multiplication"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteraction} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}