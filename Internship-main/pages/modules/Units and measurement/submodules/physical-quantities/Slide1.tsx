import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Define the data structure for our scales
interface ScaleStep {
  power: number;
  label: string;
  description: string;
  size: string;
  icon: string; // Emoji as a placeholder for icons
}

const scales: ScaleStep[] = [
  { power: 0, label: 'Human Scale', description: 'The scale of our daily lives.', size: '10^0 \\text{ m}', icon: '🧍' },
  { power: 7, label: 'Earth', description: 'Radius of the Earth ($6.4 \\times 10^6$ m).', size: '10^7 \\text{ m}', icon: '🌍' },
  { power: 11, label: 'Astronomical Unit', description: 'Average distance from Earth to Sun.', size: '10^{11} \\text{ m}', icon: '☀️' },
  { power: 16, label: 'Light Year', description: 'Distance light travels in one year.', size: '10^{16} \\text{ m}', icon: '✨' },
  { power: 21, label: 'Milky Way Galaxy', description: 'Diameter of our galaxy.', size: '10^{21} \\text{ m}', icon: '🌌' },
  { power: 26, label: 'Observable Universe', description: 'The limit of what we can see.', size: '10^{26} \\text{ m}', icon: '🔭' }
];

export default function ScaleOfTheLargeSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  // Initial state corresponds to the index in the scales array
  const [scaleIndex, setScaleIndex] = useState(0); 

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'scale-of-large-concept', 
      conceptId: 'macrocosm-scale', 
      conceptName: 'The Macrocosm', 
      type: 'learning', 
      description: 'Understanding the vast range of lengths in the physical universe.' 
    }
  ];

  const currentScale = scales[scaleIndex];

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Scale of the Large 🌌</h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              In Physics, we deal with magnitudes that span an incredible range. Today, we look upward to the <strong>Macrocosm</strong>—the world of the very large.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Range of Lengths</h4>
              <p>
                The observable universe spans from the tiny atomic nucleus (<InlineMath>{'10^{-15} \\text{ m}'}</InlineMath>) to the edge of the universe (<InlineMath>{'10^{26} \\text{ m}'}</InlineMath>).
              </p>
            </div>

            <p>
              Because these distances are so huge, measuring them in meters is like measuring the distance between cities in millimeters. We need special units like:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Astronomical Unit (AU):</strong> Distance to the Sun.</li>
              <li><strong>Light Year (ly):</strong> Distance light travels in a year.</li>
              <li><strong>Parsec (pc):</strong> Based on the parallax angle (we will learn this next!).</li>
            </ul>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Zoom Out the Universe</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Drag the slider to jump by orders of magnitude.</p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* Visualization Area */}
                <div className="relative w-64 h-64 flex items-center justify-center bg-slate-900 rounded-full overflow-hidden shadow-inner border-4 border-slate-200 dark:border-slate-600">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentScale.label}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 2 }}
                            transition={{ duration: 0.4 }}
                            className="text-8xl"
                        >
                            {currentScale.icon}
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Overlay Text */}
                    <div className="absolute bottom-4 px-3 py-1 bg-black/50 rounded text-white text-sm font-mono">
                         <InlineMath>{currentScale.size}</InlineMath>
                    </div>
                </div>

                {/* Info Card */}
                <div className="w-full text-center space-y-2">
                    <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentScale.label}</h4>
                    <p className="text-slate-500 dark:text-slate-400 min-h-[3rem]">{currentScale.description}</p>
                </div>

                {/* Controls */}
                <div className="w-full px-8">
                    <label htmlFor="scale-slider" className="block text-center font-mono text-sm text-slate-500 mb-2">
                        Order of Magnitude: 10^{currentScale.power}
                    </label>
                    <input
                        id="scale-slider"
                        type="range"
                        min="0"
                        max={scales.length - 1}
                        step="1"
                        value={scaleIndex}
                        onChange={(e) => setScaleIndex(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-500 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                        <span>1m</span>
                        <span>10^26m</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="scale-of-the-large"
      slideTitle="Scale of the large"
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