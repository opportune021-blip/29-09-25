import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function StellarDistanceSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Parallax Angle in Arcseconds (theta)
  // Real stars have tiny angles. Proxima Centauri is ~0.76 arcsec.
  const [angleArcSec, setAngleArcSec] = useState(1.0);

  // Calculations
  // Definition: Distance in Parsecs = 1 / Angle in Arcseconds
  const distanceParsecs = 1 / angleArcSec;
  const distanceLightYears = distanceParsecs * 3.26;
  const distanceAu = 206265 / angleArcSec; // 1 radian approx 206265 arcseconds

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'parsec-definition', 
      conceptId: 'unit-parsec', 
      conceptName: 'The Parsec', 
      type: 'learning', 
      description: 'Understanding the definition of a Parsec based on parallax angle.' 
    }
  ];

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Parsec (pc) 📏</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Astronomers hate converting radians to meters constantly. Instead, they defined a convenient unit called the <strong>Parsec</strong> (Parallax Second).
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-400 dark:border-indigo-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Definition</h4>
              <p>
                One <strong>Parsec (pc)</strong> is the distance at which the radius of Earth's orbit (1 AU) subtends an angle of exactly <strong>1 second of arc</strong>.
              </p>
            </div>
            
            

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">The Magic Formula</h4>
                <p>If you measure the angle $\theta$ in arcseconds, the math becomes incredibly simple:</p>
                <BlockMath>{`D \\text{ (pc)} = \\frac{1}{\\theta''}`}</BlockMath>
            </div>
            
            <div className="text-sm text-slate-500 mt-4">
                <strong>Note:</strong> 1 arcsecond is tiny! It's <InlineMath>1/3600</InlineMath> of a degree.
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Cosmic Calculator</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Adjust the measured angle ($\theta$) to see how far away the star is.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* Visualization of the Triangle */}
                <div className="relative w-full h-48 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                    
                    {/* Earth Orbit Base (Left) */}
                    <div className="absolute left-10 h-32 border-l-2 border-blue-500 flex flex-col justify-center items-center">
                         <span className="absolute -left-8 text-xs font-bold text-blue-600 rotate-[-90deg]">1 AU</span>
                    </div>
                    
                    {/* Triangle visual */}
                    <svg className="absolute inset-0 w-full h-full">
                        <motion.path 
                            d={`M 40,24 L ${40 + distanceParsecs * 20}, 96 L 40, 168`} // Scaling for visual effect
                            fill="rgba(99, 102, 241, 0.1)"
                            stroke="#6366f1"
                            strokeWidth="1"
                            // Limit the drawing so it doesn't break the SVG
                            animate={{ d: `M 40,${96 - (angleArcSec * 40)} L 280, 96 L 40, ${96 + (angleArcSec * 40)}` }}
                        />
                         {/* Angle Label */}
                         <text x="50" y="100" className="text-[10px] fill-slate-500">θ</text>
                    </svg>

                    {/* Star Icon */}
                    <div className="absolute right-10 text-yellow-500 text-2xl">★</div>
                </div>

                {/* Results Dashboard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Distance in Parsecs</div>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {distanceParsecs.toFixed(2)} pc
                        </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Distance in Light Years</div>
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                            {distanceLightYears.toFixed(2)} ly
                        </div>
                        <div className="text-xs text-slate-400 mt-1">1 pc ≈ 3.26 ly</div>
                    </div>
                </div>

                {/* Comparison Card */}
                 <div className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-center text-slate-600 dark:text-slate-300">
                    {angleArcSec > 0.7 ? (
                        <span>Only extremely close stars have parallax  0.7"</span>
                    ) : angleArcSec > 0.1 ? (
                        <span>Typical neighborhood stars (like Sirius)</span>
                    ) : (
                        <span>Very distant stars (Angle is tiny!)</span>
                    )}
                </div>

                {/* Slider Control */}
                <div className="w-full px-4">
                    <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        <span>Measured Angle: {angleArcSec.toFixed(2)}"</span>
                    </label>
                    <input
                        type="range"
                        min="0.05"
                        max="1.50"
                        step="0.01"
                        value={angleArcSec}
                        onChange={(e) => setAngleArcSec(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>0.05" (Far)</span>
                        <span>1.50" (Close)</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="stellar-distance-using-parallax"
      slideTitle="Stellar distance using parallax"
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