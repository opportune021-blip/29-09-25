import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface ExampleData {
  id: number;
  title: string;
  original: string;
  scientific: string;
  exponent: number;
  direction: 'Left' | 'Right';
  description: string;
  icon: string;
}

const examples: ExampleData[] = [
  {
    id: 1,
    title: "Speed of Light (c)",
    original: "299,792,458",
    scientific: "2.998 \\times 10^8",
    exponent: 8,
    direction: 'Left',
    description: "Decimal moves 8 places LEFT. Large number = Positive exponent.",
    icon: "⚡"
  },
  {
    id: 2,
    title: "Mass of Dust Particle",
    original: "0.000000000753",
    scientific: "7.53 \\times 10^{-10}",
    exponent: -10,
    direction: 'Right',
    description: "Decimal moves 10 places RIGHT. Small number = Negative exponent.",
    icon: "🌪️"
  },
  {
    id: 3,
    title: "Avogadro's Number",
    original: "602,200,000,000,000,000,000,000",
    scientific: "6.022 \\times 10^{23}",
    exponent: 23,
    direction: 'Left',
    description: "A huge number! Moving decimal 23 places left.",
    icon: "🧪"
  }
];

export default function ScientificNotationExamplesSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const slideInteractions: Interaction[] = [
   /*  { 
      id: 'sci-notation-general', 
      conceptId: 'scientific-notation-mixed', 
      conceptName: 'Scientific Notation Practice', 
      type: 'practice', 
      description: 'Reviewing examples of both large and small numbers in scientific notation.' 
    } */
  ];

  const currentExample = examples[currentIndex];

  const nextExample = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % examples.length);
    }, 200);
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">General Rules 🧭</h2>
          
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
            <p>
              Whether the number is huge or tiny, the goal is always the same: create a number between 1 and 10.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">Large Numbers</h4>
                    <p className="text-sm">Decimal moves <strong>Left</strong>.</p>
                    <p className="text-sm mt-1">Exponent is <strong>Positive (+)</strong>.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-900 p-1 rounded">
                        3000 → <InlineMath>3 \times 10^3</InlineMath>
                    </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Small Numbers</h4>
                    <p className="text-sm">Decimal moves <strong>Right</strong>.</p>
                    <p className="text-sm mt-1">Exponent is <strong>Negative (-)</strong>.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-900 p-1 rounded">
                        0.003 → <InlineMath>3 \times 10^{-3}</InlineMath>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Why do we do this?</h4>
                <ul className="list-disc pl-5 text-base space-y-1">
                    <li>Easier to read (no counting zeros).</li>
                    <li>Easier to multiply/divide (using exponent laws).</li>
                    <li>Shows <strong>Significant Figures</strong> clearly.</li>
                </ul>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Interactive Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Example Deck</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Look at the number and guess the scientific notation. Click to flip the card.
            </p>
            
            <div className="flex-grow flex flex-col items-center justify-center gap-8 perspective-1000">
                
                {/* Flip Card */}
                <motion.div 
                    className="relative w-full max-w-md h-64 cursor-pointer preserve-3d"
                    onClick={() => setIsFlipped(!isFlipped)}
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front Face (Problem) */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center text-white backface-hidden">
                        <div className="text-6xl mb-4">{currentExample.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{currentExample.title}</h3>
                        <div className="font-mono text-lg sm:text-2xl break-all text-center bg-black/20 p-2 rounded">
                            {currentExample.original}
                        </div>
                        <p className="mt-4 text-sm opacity-80 animate-pulse">Click to Reveal</p>
                    </div>

                    {/* Back Face (Solution) */}
                    <div 
                        className="absolute inset-0 w-full h-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-2 border-blue-500 p-6 flex flex-col items-center justify-center text-slate-800 dark:text-slate-100 backface-hidden"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        <h3 className="text-lg font-bold text-slate-500 uppercase mb-4">Solution</h3>
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            <InlineMath>{currentExample.scientific}</InlineMath>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4 text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                            <span>Moved {currentExample.direction}</span>
                            <span>•</span>
                            <span>Exp: {currentExample.exponent > 0 ? `+${currentExample.exponent}` : currentExample.exponent}</span>
                        </div>

                        <p className="mt-4 text-center text-sm text-slate-500">
                            {currentExample.description}
                        </p>
                    </div>
                </motion.div>

                {/* Controls */}
                <div className="flex gap-4 w-full justify-center">
                    <button 
                        onClick={nextExample}
                        className="px-6 py-3 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-bold flex items-center gap-2"
                    >
                        Next Example ⏭️
                    </button>
                </div>

                {/* Progress Dots */}
                <div className="flex gap-2">
                    {examples.map((ex, i) => (
                        <div 
                            key={ex.id}
                            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-blue-500 w-4' : 'bg-slate-300 dark:bg-slate-600'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="notation-examples-general"
      slideTitle="Scientific notation examples"
      moduleId="units-and-measurement"
      submoduleId="scientific-notation"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}