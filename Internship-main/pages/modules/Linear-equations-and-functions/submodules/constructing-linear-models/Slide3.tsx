import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- NEW: A smaller, clearer graph component for the Swiggy example ---
const SwiggyGraph = () => (
    <div className="w-full aspect-square max-w-[200px] mx-auto my-2 p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-700">
        <svg viewBox="0 0 120 120" className="w-full h-full">
            <defs><marker id="swiggy-arrow-sm" markerWidth="3" markerHeight="3" refX="1.5" refY="1.5" orient="auto"><polygon points="0 0, 3 1.5, 0 3" className="fill-current text-slate-500" /></marker></defs>
            
            {/* Grid */}
            {Array.from({ length: 5 }).map((_, i) => (
                <g key={i}>
                    <line x1={10 + i * 25} y1="10" x2={10 + i * 25} y2="110" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="0.5" />
                    <line x1="10" y1={10 + i * 25} x2="110" y2={10 + i * 25} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="0.5" />
                </g>
            ))}

            {/* Axes */}
            <line x1="10" y1="110" x2="110" y2="110" className="stroke-slate-400" strokeWidth="1" markerEnd="url(#swiggy-arrow-sm)" />
            <line x1="10" y1="110" x2="10" y2="10" className="stroke-slate-400" strokeWidth="1" markerEnd="url(#swiggy-arrow-sm)" />
            <text x="100" y="118" className="text-[6px] fill-slate-500">km</text>
            <text x="0" y="15" className="text-[6px] fill-slate-500">₹</text>

            {/* Line y = 10x + 40 */}
            <line x1="10" y1="70" x2="60" y2="20" className="stroke-blue-500" strokeWidth="1.5" />
            
            {/* Points (2, 60) and (5, 90) */}
            <circle cx="30" cy="50" r="1.5" className="fill-blue-600" />
            <text x="33" y="50" className="text-[5px] fill-blue-600">(2, 60)</text>
            <circle cx="60" cy="20" r="1.5" className="fill-blue-600" />
            <text x="63" y="20" className="text-[5px] fill-blue-600">(5, 90)</text>

            {/* Y-intercept */}
            <circle cx="10" cy="70" r="1.5" className="fill-red-500" />
            <text x="13" y="70" className="text-[5px] fill-red-500">b = 40</text>
        </svg>
    </div>
);

export default function ConstructingLinearModelsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'finding-equation-from-problem', conceptId: 'finding-equation-from-problem', conceptName: 'Modeling Stories with Linear Equations', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Modeling Stories with Linear Equations</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Method 1: Spot the Clues</h3>
                <p className="mt-2 text-sm">Look for two types of numbers in the story: the rate of change (m) and the starting value (b).</p>
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg space-y-2">
                    <div>
                        <p className="font-semibold">Find 'm' (The Slope):</p>
                        <p className="text-xs">This is the "action" number that repeats. Look for words like: <strong>per, each, every</strong>.</p>
                    </div>
                    <div>
                        <p className="font-semibold">Find 'b' (The Y-Intercept):</p>
                        <p className="text-xs">This is the "starting" number. Look for words like: <strong>flat fee, initial, starting amount, one-time charge</strong>.</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Method 2: Calculate from Two Points</h3>
                <p className="mt-2 text-sm">If the rates aren't stated, calculate them from two "snapshots" in the story.</p>
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-xs italic">"A 2 km Swiggy delivery costs ₹60, while a 5 km delivery costs ₹90."</p>
                    <div className="md:flex md:gap-4 md:items-center">
                        <div className="flex-grow">
                             <ol className="list-decimal pl-5 mt-2 text-xs space-y-1">
                                <li><strong>Turn story into points:</strong> (2, 60) and (5, 90).</li>
                                <li><strong>Calculate 'm':</strong> <InlineMath>{'m = \\frac{90 - 60}{5 - 2} = 10'}</InlineMath>. The rate is ₹10/km.</li>
                                <li><strong>Calculate 'b':</strong> Use <InlineMath>m=10</InlineMath> and (2, 60).
                                    <p className="pl-2"><InlineMath>{'60 = 10(2) + b \\implies b = 40'}</InlineMath></p>
                                </li>
                                <li className="font-bold">Full Equation: <InlineMath>{'y = 10x + 40'}</InlineMath>.</li>
                            </ol>
                        </div>
                        <div className="flex-shrink-0">
                            <SwiggyGraph />
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Building the Equation from a Story</h3>
            <div className="space-y-3 overflow-y-auto pr-2">
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                <p className="text-sm italic">"A car rental charges a <strong>₹500 flat fee</strong> plus <strong>₹8 per kilometer</strong>."</p>
                <p className="text-xs mt-1">m (per km) = 8, b (flat fee) = 500. <br/><strong>Equation: <InlineMath>{'y = 8x + 500'}</InlineMath></strong></p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                <p className="text-sm italic">"A phone's battery is at <strong>100%</strong> and <strong>loses 2% for each video</strong> watched."</p>
                <p className="text-xs mt-1">m (loses for each) = -2, b (starts at) = 100. <br/><strong>Equation: <InlineMath>{'y = -2x + 100'}</InlineMath></strong></p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                <p className="text-sm italic">"You pay a <strong>flat entry fee of ₹200</strong> for a buffet. The price doesn't change."</p>
                <p className="text-xs mt-1">m (no change per plate) = 0, b (flat fee) = 200. <br/><strong>Equation: <InlineMath>{'y = 200'}</InlineMath></strong></p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700 mt-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300">Your Turn to Model</h4>
                  <div className="text-sm mt-2 space-y-3">
                    <p><strong>Q1 (Spotting):</strong> A gym in Vashi charges a ₹1500 one-time fee and ₹800 per month. What is the full `y = mx + b` equation?</p>
                    <p><strong>Q2 (Calculating):</strong> At a juice stall, a 200ml juice is ₹80 and a 350ml juice is ₹110. Find the full `y = mx + b` equation.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-equation-from-problem" 
            slideTitle="Modeling Stories with Linear Equations" 
            moduleId="linear-equations-and-functions" 
            submoduleId="constructing-linear-models"
            interactions={localInteractions}
        >
            <TrackedInteraction 
                interaction={slideInteractions[0]}
                onInteractionComplete={handleInteractionComplete}
            >
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}