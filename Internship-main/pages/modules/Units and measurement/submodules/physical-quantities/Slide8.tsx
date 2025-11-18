import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function StellarParallaxClarificationSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Distance in Light Years
  const [distance, setDistance] = useState(10); 
  
  // Constant: Atmospheric Blur limit (in arcseconds)
  // Ground based telescopes struggle below 0.01" without adaptive optics
  const blurLimit = 0.05; 
  
  // Calculate Parallax Angle (theta = 3.26 / d)
  const parallaxAngle = 3.26 / distance;
  
  // Determine if measurable
  const isMeasurable = parallaxAngle > blurLimit;

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'parallax-limitations', 
      conceptId: 'measurement-error-limit', 
      conceptName: 'Measurement Limits', 
      type: 'learning', 
      description: 'Understanding why parallax only works for nearby stars due to measurement limits.' 
    }
  ];

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Why Parallax Has Limits 🚧</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Parallax is perfect for "nearby" stars (within ~100 parsecs). But for distant stars, the angle <InlineMath>\theta</InlineMath> becomes too small to see.
            </p>

            

[Image of atmospheric turbulence astronomy diagram]


            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Problem: Atmosphere</h4>
              <p>
                Earth's atmosphere is like a pool of water. It makes stars "twinkle" (scintillation). This blurring is often larger than the tiny parallax shift we are trying to measure.
              </p>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">The Solution: Space Telescopes</h4>
                <p>
                    Satellites like <strong>Hipparcos</strong> and <strong>Gaia</strong> go above the atmosphere. Gaia can measure angles as small as <InlineMath>0.00001''</InlineMath> (micro-arcseconds)!
                </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The "Blur" Limit</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Move the star further away. When the parallax shift becomes smaller than the atmospheric blur, we lose the measurement.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* Telescope View Simulation */}
                <div className="relative w-64 h-64 bg-black rounded-full border-4 border-slate-600 overflow-hidden shadow-2xl">
                    <div className="absolute top-4 w-full text-center text-xs text-slate-500 font-mono">Telescope View</div>
                    
                    {/* Crosshairs */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <div className="w-full h-px bg-green-500"></div>
                        <div className="h-full w-px bg-green-500 absolute"></div>
                    </div>

                    {/* The Blur Zone (Atmosphere) */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/50 bg-red-500/10"
                        style={{ width: '40px', height: '40px' }} 
                    ></div>
                    <div className="absolute bottom-10 w-full text-center text-[10px] text-red-500 font-mono">Atmospheric Blur Limit</div>

                    {/* The Star (Shifting) */}
                    <motion.div 
                        className="absolute top-1/2 left-1/2"
                        animate={{ 
                            x: isMeasurable ? [20 * parallaxAngle, -20 * parallaxAngle, 20 * parallaxAngle] : 0
                        }}
                        transition={{ 
                            duration: 2, // 6 months cycle simulation speed
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                         {/* Twinkling Effect */}
                         <motion.div 
                            className={`w-2 h-2 rounded-full ${isMeasurable ? 'bg-white' : 'bg-slate-500'}`}
                            animate={{ scale: [1, 1.5, 0.8, 1.2, 1] }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                         />
                    </motion.div>
                </div>

                {/* Status Indicator */}
                <div className={`w-full p-4 rounded-lg text-center border-2 ${isMeasurable ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}>
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Measurement Status</div>
                    {isMeasurable ? (
                        <div className="text-green-600 dark:text-green-400 font-bold text-lg flex items-center justify-center gap-2">
                            <span>✅ Shift Detected</span>
                        </div>
                    ) : (
                        <div className="text-red-600 dark:text-red-400 font-bold text-lg flex items-center justify-center gap-2">
                            <span>⚠️ Too Far / Too Blurry</span>
                        </div>
                    )}
                    <div className="mt-2 text-xs font-mono">
                        Angle: {parallaxAngle.toFixed(3)}" vs Blur: {blurLimit}"
                    </div>
                </div>

                {/* Slider Control */}
                <div className="w-full px-4">
                    <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        <span>Star Distance: {distance} ly</span>
                    </label>
                    <input
                        type="range"
                        min="4" // Alpha Centauri is ~4.3 ly
                        max="100"
                        step="1"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-blue-400 to-slate-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>Nearby (Strong Signal)</span>
                        <span>Distant (Weak Signal)</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="stellar-parallax-clarification"
      slideTitle="Stellar parallax clarification"
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