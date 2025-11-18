import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function AngularMeasure2Slide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State for interactive elements
  // We simulate changing the area 'A' on a sphere of radius 'r'
  const [area, setArea] = useState(50); 
  const radius = 10; // conceptual radius
  
  // Calculate Solid Angle (Omega)
  // Omega = Area / r^2
  const solidAngle = area / (radius * radius);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'solid-angle-concept', 
      conceptId: 'solid-angle-steradian', 
      conceptName: 'Solid Angle', 
      type: 'learning', 
      description: 'Understanding solid angle and the steradian unit.' 
    }
  ];

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Solid Angle ($\Omega$) 🧊</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Just as a circle has a 2D angle (plane angle), a sphere has a 3D angle known as the <strong>Solid Angle</strong>. It measures the "amount of sky" an object covers from a specific point.
            </p>

            

[Image of solid angle diagram sphere]


            <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-400 dark:border-indigo-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Formula</h4>
              <p>
                Solid Angle is the ratio of the area on the sphere's surface to the square of the radius:
              </p>
              <BlockMath>{`\\Omega = \\frac{\\text{Area } (A)}{r^2}`}</BlockMath>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">The Steradian (sr)</h4>
                <p>
                    The unit of solid angle is the <strong>Steradian</strong>. 
                    One steradian is the solid angle subtended by an area equal to the square of the radius (<InlineMath>{'A = r^2'}</InlineMath>).
                </p>
            </div>
            
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm">
                <p><strong>Total Sphere:</strong> Just as a circle is <InlineMath>{'2\\pi'}</InlineMath> radians, a full sphere is <InlineMath>{'4\\pi'}</InlineMath> steradians (<InlineMath>\approx 12.57</InlineMath> sr).</p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Visualizing 3D Angles</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Imagine looking at a cone projecting from the center of a sphere. Increase the surface area to see the solid angle grow.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* Conceptual 3D Visualization (Using CSS/SVG) */}
                <div className="relative w-64 h-64 flex items-center justify-center perspective-1000">
                    {/* The Sphere Wireframe */}
                    <div className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 shadow-inner opacity-50"></div>
                    
                    {/* The Cone / Sector Representation */}
                    {/* We simulate the "Area" growing by scaling a circle in the center */}
                    <motion.div 
                        className="relative z-10 bg-indigo-500/30 border-2 border-indigo-500 rounded-full flex items-center justify-center backdrop-blur-sm"
                        animate={{ 
                            width: Math.sqrt(area) * 20, // Visual scaling factor
                            height: Math.sqrt(area) * 20 
                        }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Area A</div>
                    </motion.div>
                    
                    {/* Radius Indicators (Visual only) */}
                    <div className="absolute w-full h-px bg-slate-300 rotate-45 -z-10"></div>
                    <div className="absolute w-full h-px bg-slate-300 -rotate-45 -z-10"></div>
                </div>

                {/* Live Calculation Box */}
                <div className="grid grid-cols-3 gap-4 w-full text-center">
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        <div className="text-xs text-slate-500 uppercase font-bold">Area (A)</div>
                        <div className="text-xl font-mono text-indigo-500">{area.toFixed(0)}</div>
                    </div>
                    <div className="flex items-center justify-center text-slate-400 font-bold">÷</div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        <div className="text-xs text-slate-500 uppercase font-bold">Radius² (<InlineMath>r^2</InlineMath>)</div>
                        <div className="text-xl font-mono text-slate-500">100</div>
                    </div>
                </div>

                <div className="w-full p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg text-center">
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Solid Angle (<InlineMath>\Omega</InlineMath>)</div>
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        {solidAngle.toFixed(2)} sr
                    </div>
                    {Math.abs(solidAngle - 1) < 0.1 && (
                         <div className="text-xs text-green-600 font-bold mt-1 animate-pulse">
                            ≈ 1 Steradian! (Area ≈ r²)
                         </div>
                    )}
                </div>

                {/* Slider Control */}
                <div className="w-full px-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Increase Surface Area
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="400" // 4*pi*r^2 is approx 1256, keeping it smaller for visual clarity
                        step="5"
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value))}
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
      slideId="angular-measure-2"
      slideTitle="Angular Measure 2"
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