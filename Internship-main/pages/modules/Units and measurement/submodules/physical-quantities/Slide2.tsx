import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function AngularMeasure1Slide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State for interactive elements
  const [radius, setRadius] = useState(100); // arbitrary units for SVG
  const [angleDeg, setAngleDeg] = useState(57.3); // Start at approx 1 radian

  // Derived values
  const angleRad = (angleDeg * (Math.PI / 180));
  const arcLength = radius * angleRad;

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'plane-angle-concept', 
      conceptId: 'plane-angle-radian', 
      conceptName: 'Plane Angle', 
      type: 'learning', 
      description: 'Understanding the definition of plane angle and the radian unit.' 
    }
  ];

  // Helper to describe the SVG arc path
  const getSectorPath = (x: number, y: number, r: number, aDeg: number) => {
    // Convert to radians for calculation
    const aRad = (aDeg * Math.PI) / 180;
    const x1 = x + r * Math.cos(0); // Start point (0 degrees)
    const y1 = y - r * Math.sin(0);
    const x2 = x + r * Math.cos(-aRad); // End point (negative for SVG coord system)
    const y2 = y - r * Math.sin(-aRad);
    
    // SVG Path command: M=Move, L=Line, A=Arc
    // A parameters: rx ry x-axis-rotation large-arc-flag sweep-flag x y
    const largeArcFlag = aDeg > 180 ? 1 : 0;
    
    return `M ${x} ${y} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 0 ${x2} ${y2} Z`;
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
<h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
  The Plane Angle (&theta;) 📐
</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Before we measure the distance to stars, we must understand how to measure "opening" between two lines. This is the <strong>Plane Angle</strong>.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Formula</h4>
              <p>
                Angle is defined as the ratio of arc length to radius:
              </p>
              <BlockMath>{`\\theta = \\frac{\\text{Arc Length } (l)}{\\text{Radius } (r)}`}</BlockMath>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Why Radians?</h4>
                <p>
                    Scientific formulas rely on this ratio. 
                    When <InlineMath>{'l = r'}</InlineMath>, the angle is exactly <strong>1 Radian</strong>.
                </p>
                <p className="text-sm text-slate-500 italic">
                    (1 Radian <InlineMath>{'\\approx 57.3^\\circ'}</InlineMath>)
                </p>
            </div>
            
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm">
                <p><strong>Note:</strong> <InlineMath>{'360^\\circ = 2\\pi \\text{ radians}'}</InlineMath></p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Visualizing the Radian</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
                Adjust the angle to see how Arc Length (<InlineMath>l</InlineMath>) changes relative to Radius (<InlineMath>r</InlineMath>).
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* SVG Visualization */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
                        {/* Radius Lines Background */}
                        <line x1="50" y1="150" x2="250" y2="150" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
                        <line x1="150" y1="50" x2="150" y2="250" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />

                        {/* The Sector */}
                        <motion.path 
                            d={getSectorPath(150, 150, radius, angleDeg)}
                            fill="rgba(59, 130, 246, 0.2)"
                            stroke="#3b82f6"
                            strokeWidth="2"
                        />

                        {/* Labels on the SVG */}
                        {/* Radius Label */}
                        <text x={150 + radius/2} y="165" fill="currentColor" className="text-xs text-slate-500 font-mono">r</text>
                        
                        {/* Arc Length Highlight */}
                         <path 
                            d={`M ${150 + radius * Math.cos(0)} ${150 - radius * Math.sin(0)} A ${radius} ${radius} 0 ${angleDeg > 180 ? 1 : 0} 0 ${150 + radius * Math.cos(-angleDeg * Math.PI / 180)} ${150 - radius * Math.sin(-angleDeg * Math.PI / 180)}`}
                            fill="none"
                            stroke="#ef4444" // Red for arc length
                            strokeWidth="4"
                        />
                    </svg>
                </div>

                {/* Live Calculation Box */}
                <div className="grid grid-cols-3 gap-4 w-full text-center">
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        <div className="text-xs text-slate-500 uppercase font-bold">Arc (l)</div>
                        <div className="text-xl font-mono text-red-500">{arcLength.toFixed(0)}</div>
                    </div>
                    <div className="flex items-center justify-center text-slate-400 font-bold">÷</div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        <div className="text-xs text-slate-500 uppercase font-bold">Radius (r)</div>
                        <div className="text-xl font-mono text-blue-500">{radius}</div>
                    </div>
                </div>

                <div className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Angle (<InlineMath>\theta</InlineMath>) in Radians</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {angleRad.toFixed(2)} rad
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                        ({angleDeg.toFixed(1)}°)
                    </div>
                </div>

                {/* Slider Control */}
                <div className="w-full px-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Change Angle
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="180"
                        step="1"
                        value={angleDeg}
                        onChange={(e) => setAngleDeg(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="angular-measure-1"
      slideTitle="Angular Measure 1"
      moduleId="units-and-measurement"
      submoduleId="physical-quantities-and-measurement"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}