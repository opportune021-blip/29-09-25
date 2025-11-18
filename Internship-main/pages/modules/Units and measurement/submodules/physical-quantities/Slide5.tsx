import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ParallaxDistanceSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Distance D (arbitrary units for visualization)
  // Range: 100 to 350
  const [distance, setDistance] = useState(200);
  const basis = 100; // Fixed basis width (b)

  // Calculate Angle (Theta)
  // Formula: theta = b / D (Small angle approximation)
  const thetaRad = basis / distance;
  const thetaDeg = thetaRad * (180 / Math.PI);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'parallax-formula', 
      conceptId: 'parallax-math', 
      conceptName: 'Parallax Formula', 
      type: 'learning', 
      description: 'Deriving the relationship D = b/theta.' 
    }
  ];

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Calculating the Distance 📏</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              By measuring the basis ($b$) and the parallax angle ($\theta$), we can calculate the unknown distance ($D$) to a faraway object.
            </p>

            

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">The Math</h4>
              <p>
                Because the star is very far away, the distance $D$ is very large compared to $b$. This forms a very long, thin wedge.
              </p>
              <p className="mt-2">
                 We treat the basis $b$ as an arc of a circle of radius $D$. From <InlineMath>{'\\theta = \\text{Arc}/\\text{Radius}'}</InlineMath>:
              </p>
              <BlockMath>{`\\theta = \\frac{b}{D}`}</BlockMath>
              <p>Rearranging to find Distance:</p>
              <BlockMath>{`D = \\frac{b}{\\theta}`}</BlockMath>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm border border-yellow-200">
                <strong>Crucial Concept:</strong> As Distance ($D$) increases, the Angle ($\theta$) becomes smaller. This is why distant stars are so hard to measure!
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The Geometry of Parallax</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Increase the distance to see how the angle shrinks.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-4">
                
                {/* SVG Geometry */}
                <div className="relative w-full h-[400px] border-b border-slate-200 dark:border-slate-700 flex justify-center items-end pb-8">
                    <svg width="300" height="400" viewBox="0 0 300 400" className="overflow-visible">
                        {/* Definitions */}
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <path d="M0,0 L10,5 L0,10" fill="#94a3b8" />
                            </marker>
                        </defs>

                        {/* Observer Points (Basis) */}
                        <circle cx="100" cy="350" r="4" fill="#3b82f6" />
                        <text x="100" y="370" textAnchor="middle" className="text-xs fill-slate-500 font-bold">A</text>
                        
                        <circle cx="200" cy="350" r="4" fill="#3b82f6" />
                        <text x="200" y="370" textAnchor="middle" className="text-xs fill-slate-500 font-bold">B</text>

                        {/* Basis Line (b) */}
                        <line x1="100" y1="350" x2="200" y2="350" stroke="#3b82f6" strokeWidth="2" />
                        <text x="150" y="370" textAnchor="middle" className="text-sm fill-blue-600 font-bold">b</text>

                        {/* The Distant Object (S) */}
                        <motion.g 
                            animate={{ y: 350 - distance }} // Move up as distance increases
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        >
                            {/* Star Icon */}
                            <path d="M150,-10 L153,-3 L160,-3 L155,2 L157,9 L150,5 L143,9 L145,2 L140,-3 L147,-3 Z" fill="#eab308" />
                            <text x="150" y="-20" textAnchor="middle" className="text-xs fill-slate-500 font-bold">S (Star)</text>
                            
                            {/* Angle Arc */}
                            <path 
                                d={`M 140,20 Q 150,25 160,20`} // Simple curve representing angle
                                fill="none" 
                                stroke="#ef4444" 
                                strokeWidth="2"
                                opacity={distance > 300 ? 0.3 : 1} // Fade out if too small
                            />
                            <text x="150" y="40" textAnchor="middle" className="text-xs fill-red-500 font-bold">θ</text>
                        </motion.g>

                        {/* Lines of Sight */}
                        <motion.line 
                            x1="100" y1="350" 
                            x2="150" 
                            y2={350 - distance} 
                            stroke="#94a3b8" 
                            strokeWidth="1" 
                            strokeDasharray="4"
                        />
                        <motion.line 
                            x1="200" y1="350" 
                            x2="150" 
                            y2={350 - distance} 
                            stroke="#94a3b8" 
                            strokeWidth="1" 
                            strokeDasharray="4"
                        />

                        {/* Distance Label (D) */}
                        <motion.g animate={{ y: (350 - distance/2) }}>
                             <text x="210" y="0" className="text-xs fill-slate-400 font-mono">D</text>
                             <line x1="150" y1="0" x2="200" y2="0" stroke="#cbd5e1" strokeWidth="1" />
                        </motion.g>
                    </svg>
                </div>

                {/* Live Data */}
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg text-center border border-slate-200 dark:border-slate-700">
                        <div className="text-xs text-slate-500">Distance (D)</div>
                        <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{distance} m</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center border border-red-100 dark:border-red-800">
                        <div className="text-xs text-red-500">Parallax Angle (<InlineMath>\theta</InlineMath>)</div>
                        <div className="text-xl font-bold text-red-600 dark:text-red-400">{thetaRad.toFixed(3)} rad</div>
                        <div className="text-xs text-red-400">({thetaDeg.toFixed(1)}°)</div>
                    </div>
                </div>

                {/* Slider */}
                <div className="w-full px-4">
                    <label className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        <span>Closer</span>
                        <span>Move Star Away</span>
                    </label>
                    <input
                        type="range"
                        min="100"
                        max="400"
                        step="1"
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-slate-300 to-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="parallax-distance"
      slideTitle="Parallax: distance"
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