import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function IntroToParallaxSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  // State: Observer position (-1 to 1, representing Left Eye to Right Eye)
  const [observerPos, setObserverPos] = useState(-1); 
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
    { 
      id: 'parallax-concept', 
      conceptId: 'parallax-definition', 
      conceptName: 'Parallax Definition', 
      type: 'learning', 
      description: 'Understanding parallax as an apparent shift in position due to a change in observation point.' 
    }
  ];

  // Visual constants
  const bgWidth = 300;
  const distance = 150; // Distance to object (D)
  const shiftMagnitude = 40; // How much the object appears to move

  // Calculate the apparent position on the background
  // If observer moves Left (-), object appears to shift Right (+) against the background
  const apparentShift = -observerPos * shiftMagnitude;

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">What is Parallax? ↔️</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Have you ever held a pen in front of you and closed one eye, then the other? The pen seems to jump sideways against the background.
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-400 dark:border-green-700 rounded-lg px-6 py-4">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Definition</h4>
              <p>
                <strong>Parallax</strong> is the apparent shift in the position of an object when viewed from two different locations.
              </p>
            </div>

            <ul className="space-y-3">
                <li className="flex items-start">
                    <span className="bg-slate-200 dark:bg-slate-700 rounded px-2 py-1 text-xs font-mono mr-3 mt-1">Term</span>
                    <span><strong>Basis (b):</strong> The distance between the two points of observation (e.g., the distance between your eyes).</span>
                </li>
                <li className="flex items-start">
                    <span className="bg-slate-200 dark:bg-slate-700 rounded px-2 py-1 text-xs font-mono mr-3 mt-1">Term</span>
                    <span><strong>Parallax Angle ($\theta$):</strong> The angle formed at the object by the two lines of sight.</span>
                </li>
            </ul>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">The "Thumb" Experiment</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Switch between the "Left Eye" and "Right Eye" to see the parallax shift.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-4">
                
                {/* Top Down Diagram Area */}
                <div className="relative w-full h-64 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col items-center pt-4">
                    
                    {/* 1. Background Wall */}
                    <div className="w-4/5 h-12 bg-slate-300 dark:bg-slate-700 rounded flex items-center justify-center relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)' }}></div>
                        <span className="text-xs text-slate-500 font-bold z-10 bg-white/50 px-2 rounded">Background Wall</span>
                        
                        {/* The "Projected" Ghost Object (Where it appears to be) */}
                         <motion.div 
                            className="absolute w-4 h-4 bg-red-500/30 rounded-full border-2 border-red-500 border-dashed"
                            animate={{ x: apparentShift }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                    </div>

                    {/* 2. The Object (Thumb/Pen) */}
                    <div className="mt-12 relative z-10">
                        <div className="w-6 h-6 bg-red-500 rounded-full shadow-lg flex items-center justify-center text-white text-[10px]">Obj</div>
                        {/* Label for Theta */}
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-blue-600 font-bold">
                             <InlineMath>\theta</InlineMath>
                         </div>
                    </div>

                    {/* 3. Lines of Sight */}
                    {/* Left Eye Line */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <motion.line 
                            x1="50%" y1="88" // Object center approx
                            x2={observerPos === -1 ? "30%" : "70%"} // Eye position
                            y2="240" 
                            stroke="#3b82f6" 
                            strokeWidth="2" 
                            strokeDasharray="4"
                            animate={{ x2: observerPos === -1 ? "40%" : "60%" }} 
                        />
                     </svg>

                    {/* 4. The Observer (Eyes) */}
                    <div className="absolute bottom-4 w-3/5 flex justify-between items-center px-4 border-t-2 border-slate-400 dark:border-slate-500 pt-2">
                        <div 
                            className={`cursor-pointer flex flex-col items-center transition-opacity ${observerPos === -1 ? 'opacity-100' : 'opacity-40'}`}
                            onClick={() => setObserverPos(-1)}
                        >
                            <span className="text-2xl">👁️</span>
                            <span className="text-xs font-bold">Left Eye (A)</span>
                        </div>

                         <div className="text-xs font-mono text-slate-400">
                            Basis (b)
                        </div>

                        <div 
                            className={`cursor-pointer flex flex-col items-center transition-opacity ${observerPos === 1 ? 'opacity-100' : 'opacity-40'}`}
                            onClick={() => setObserverPos(1)}
                        >
                            <span className="text-2xl">👁️</span>
                            <span className="text-xs font-bold">Right Eye (B)</span>
                        </div>
                    </div>
                </div>

                {/* Explanation of Geometry */}
                <div className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                   <p className="mb-2">
                       <strong>Observation:</strong> When you switch from Left Eye (A) to Right Eye (B), the red object <i>appears</i> to shift position on the background wall.
                   </p>
                   <p>
                       The distance between your eyes is the <strong>Basis ($b$)</strong>. The angle at the object is the <strong>Parallax Angle ($\theta$)</strong>.
                   </p>
                </div>

                {/* Toggle Switch (Alternative control) */}
                <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-full p-1 cursor-pointer relative w-48 h-10" onClick={() => setObserverPos(p => p * -1)}>
                    <motion.div 
                        className="absolute w-24 h-8 bg-white dark:bg-slate-600 rounded-full shadow-sm"
                        animate={{ x: observerPos === -1 ? 0 : 90 }} // Move visual slider
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                    <span className={`w-1/2 text-center text-sm font-bold z-10 transition-colors ${observerPos === -1 ? 'text-blue-600' : 'text-slate-500'}`}>Left Eye</span>
                    <span className={`w-1/2 text-center text-sm font-bold z-10 transition-colors ${observerPos === 1 ? 'text-blue-600' : 'text-slate-500'}`}>Right Eye</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="intro-to-parallax"
      slideTitle="Intro to Parallax"
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