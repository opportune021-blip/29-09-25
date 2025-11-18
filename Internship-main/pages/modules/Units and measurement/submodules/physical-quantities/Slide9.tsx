import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Define the data structure for our micro scales
interface ScaleStep {
  power: number;
  label: string;
  description: string;
  size: string;
  icon: string;
  color: string;
}

const scales: ScaleStep[] = [
  { power: -5, label: 'Red Blood Cell', description: 'The scale of biological cells.', size: '10^{-5} \\text{ m}', icon: '🩸', color: 'text-red-500' },
  { power: -7, label: 'Optical Limit', description: 'The limit of visible light (~400-700nm). Viruses live here.', size: '10^{-7} \\text{ m}', icon: '🦠', color: 'text-green-500' },
  { power: -9, label: 'DNA Helix', description: 'Nanometer scale. Width of DNA strands.', size: '10^{-9} \\text{ m}', icon: '🧬', color: 'text-blue-500' },
  { power: -10, label: 'Hydrogen Atom', description: 'The Angstrom (Å) scale.', size: '10^{-10} \\text{ m}', icon: '⚛️', color: 'text-purple-500' },
  { power: -14, label: 'Atomic Nucleus', description: 'Tiny, dense center of the atom.', size: '10^{-14} \\text{ m}', icon: '🌑', color: 'text-slate-700' },
  { power: -15, label: 'Proton', description: 'The Fermi (fm) scale. Inside the nucleus.', size: '10^{-15} \\text{ m}', icon: '🔴', color: 'text-orange-500' }
];

export default function ScaleOfTheSmallSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [scaleIndex, setScaleIndex] = useState(0); 

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'scale-of-small-concept', 
      conceptId: 'microcosm-scale', 
      conceptName: 'The Microcosm', 
      type: 'learning', 
      description: 'Understanding the microscopic ranges of length.' 
    }
  ];

  const currentScale = scales[scaleIndex];

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Scale of the Small 🔬</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Physics isn't just about stars; it's also about the fundamental building blocks of matter. We call this the <strong>Microcosm</strong>.
            </p>

            

[Image of atom structure diagram label parts]


            <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-400 dark:border-green-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">How Small?</h4>
              <p>
                We range from a human hair (<InlineMath>{'10^{-4} \\text{ m}'}</InlineMath>) down to the proton (<InlineMath>{'10^{-15} \\text{ m}'}</InlineMath>).
              </p>
            </div>

            <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Measurement Limits</h4>
                <ul className="list-disc pl-5 space-y-2 text-base">
                    <li>
                        <strong>Optical Microscopes:</strong> Use visible light. Cannot see anything smaller than the wavelength of light (<InlineMath>\approx 10^{-7}</InlineMath> m).
                    </li>
                    <li>
                        <strong>Electron Microscopes:</strong> Use electron beams. Electrons act like waves with very short wavelengths (<InlineMath>\approx 1 Å</InlineMath>), allowing us to see atoms.
                    </li>
                </ul>
            </div>
            
            {/* <div className="mt-2 p-3 bg-slate-100 dark:bg-slate-700 rounded text-sm font-mono">
                1 Fermi (f) = <InlineMath>10^{-15} \text{ m}</InlineMath> (Size of Proton)
            </div> */}
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Zoom Into Matter</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Drag the slider to magnify the universe.</p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8">
                
                {/* Visualization Area - Aperture View */}
                <div className="relative w-64 h-64 flex items-center justify-center bg-black rounded-full overflow-hidden shadow-2xl border-4 border-slate-600">
                    
                    {/* Microscope Crosshairs */}
                    <div className="absolute w-full h-px bg-cyan-500/30 z-20"></div>
                    <div className="absolute h-full w-full bg-cyan-500/30 z-20" style={{ width: '1px' }}></div>
                    
                    {/* Vignette Effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,black_100%)] z-20 pointer-events-none"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentScale.label}
                            initial={{ opacity: 0, scale: 0.1, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 5, rotate: 90 }} // Zoom IN effect
                            transition={{ duration: 0.4 }}
                            className={`text-8xl z-10 ${currentScale.color}`}
                        >
                            {currentScale.icon}
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Scale Bar */}
                    <div className="absolute bottom-8 w-32 h-1 bg-white/50 z-20 flex justify-between items-end">
                        <div className="w-px h-2 bg-white/50"></div>
                        <span className="text-[10px] text-white bg-black/50 px-1 rounded mb-2">
                            <InlineMath>{currentScale.size}</InlineMath>
                        </span>
                        <div className="w-px h-2 bg-white/50"></div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="w-full text-center space-y-2 h-24">
                    <h4 className={`text-2xl font-bold ${currentScale.color} transition-colors duration-300`}>
                        {currentScale.label}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {currentScale.description}
                    </p>
                </div>

                {/* Controls */}
                <div className="w-full px-8">
                    <label htmlFor="scale-slider-small" className="block text-center font-mono text-sm text-slate-500 mb-2">
                        Order of Magnitude: 10^{currentScale.power}
                    </label>
                    <input
                        id="scale-slider-small"
                        type="range"
                        min="0"
                        max={scales.length - 1}
                        step="1"
                        value={scaleIndex}
                        onChange={(e) => setScaleIndex(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-red-300 via-green-300 to-purple-500 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                        style={{ direction: 'rtl' }} // Right to left to simulate zooming IN? Or keep standard LTR. Let's keep LTR for consistency with array index.
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                        <span>Cell (10^-5)</span>
                        <span>Proton (10^-15)</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="scale-of-the-small"
      slideTitle="Scale of the small"
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