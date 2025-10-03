import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- NEW: Clear, understandable visual for Travel Speeds ---
const TravelSpeedsVisual = () => (
    <div className="w-full aspect-square p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-700">
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs><marker id="arrow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><polygon points="0 0, 4 2, 0 4" className="fill-current text-slate-500" /></marker></defs>
            {/* Y-Axis (Distance) */}
            <line x1="10" y1="95" x2="10" y2="5" stroke="currentColor" strokeWidth="2" opacity="0.6" markerEnd="url(#arrow)" />
            <text x="0" y="15" className="text-[6px] fill-slate-500" transform="rotate(-90, 5, 15)">Distance</text>
            {/* X-Axis (Time) */}
            <line x1="5" y1="90" x2="95" y2="90" stroke="currentColor" strokeWidth="2" opacity="0.6" markerEnd="url(#arrow)" />
            <text x="80" y="98" className="text-[6px] fill-slate-500">Time</text>

            {/* Bus Line (Less Steep) */}
            <line x1="10" y1="90" x2="90" y2="50" className="stroke-sky-500" strokeWidth="2.5" />
            <text x="70" y="45" className="text-[7px] fill-sky-400">Bus</text>
            
            {/* Train Line (Steeper) */}
            <line x1="10" y1="90" x2="60" y2="10" className="stroke-blue-400" strokeWidth="4" />
            <text x="30" y="20" className="text-[7px] font-bold fill-blue-300">Train</text>
        </svg>
    </div>
);

// --- NEW: Clear, understandable visual for Spending Money ---
const SpendingVisual = () => (
     <div className="w-full aspect-square p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-700">
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs><marker id="arrow2" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><polygon points="0 0, 4 2, 0 4" className="fill-current text-slate-500" /></marker></defs>
            {/* Y-Axis (Money) */}
            <line x1="10" y1="95" x2="10" y2="5" stroke="currentColor" strokeWidth="2" opacity="0.6" markerEnd="url(#arrow2)" />
            <text x="0" y="15" className="text-[6px] fill-slate-500" transform="rotate(-90, 5, 15)">Money</text>
             {/* X-Axis (Time) */}
            <line x1="5" y1="90" x2="95" y2="90" stroke="currentColor" strokeWidth="2" opacity="0.6" markerEnd="url(#arrow2)" />
            <text x="80" y="98" className="text-[6px] fill-slate-500">Time</text>

            {/* Aarav Line (Less Steep) */}
            <line x1="10" y1="10" x2="90" y2="50" className="stroke-sky-500" strokeWidth="2.5" />
            <text x="70" y="55" className="text-[7px] fill-sky-400">Aarav</text>

            {/* Ben Line (Steeper) */}
            <line x1="10" y1="10" x2="60" y2="90" className="stroke-blue-400" strokeWidth="4" />
            <text x="25" y="70" className="text-[7px] font-bold fill-blue-300">Ben</text>
        </svg>
    </div>
);


export default function ComparingLinearFunctionsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'comparing-slopes', conceptId: 'comparing-slopes', conceptName: 'Comparing Slopes (Rates of Change)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Comparing Slopes: Who is Faster or Steeper?</h2>
        */} <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">By comparing the slope ('m'), you can quickly see which function is changing faster.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Theory and Visuals */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">How to Compare Slopes</h3>
            <div className="space-y-3">
                <p><strong>1. Look at the Sign (+ or -) for DIRECTION:</strong> Positive is increasing, Negative is decreasing.</p>
                <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <h4 className="font-semibold">2. Look at the Absolute Value for STEEPNESS</h4>
                    <p className="mt-1 text-sm">To compare steepness, use the number's <strong>absolute value</strong> (<InlineMath>|m|</InlineMath>). A bigger absolute value means a steeper line.</p>
                    <p className="text-xs mt-1 italic">Example: <InlineMath>m = -4</InlineMath> is steeper than <InlineMath>m = 3</InlineMath> because <InlineMath>{'|-4| > |3|'}</InlineMath>.</p>
                </div>
            </div>
            
            <div className="mt-auto pt-4">
                <h4 className="font-semibold text-center text-slate-600 dark:text-slate-300 mb-2">Visualizing the Examples</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <TravelSpeedsVisual />
                        <p className="text-xs mt-1">The steeper blue line shows the **Train** is faster than the Bus.</p>
                    </div>
                    <div>
                        <SpendingVisual />
                         <p className="text-xs mt-1">The steeper blue line shows **Ben** is spending money faster than Aarav.</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Real-World Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Navi Mumbai Examples</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Example 1: Comparing Travel Speeds</h4>
                  <p className="text-sm mt-1">Priya's trip from Vashi to Panvel:</p>
                  <ul className="list-disc pl-5 mt-1 text-xs">
                      <li><strong>Train:</strong> <InlineMath>{'d(t) = 1.2t'}</InlineMath> (Slope = 1.2)</li>
                      <li><strong>Bus:</strong> <InlineMath>{'d(t) = 0.5t'}</InlineMath> (Slope = 0.5)</li>
                  </ul>
                  <p className="font-bold text-sm mt-1">Conclusion: The train travels faster because its slope is larger.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Example 2: Comparing Negative Slopes</h4>
                  <p className="text-sm mt-1">Aarav and Ben are spending money at an arcade in Seawoods Mall:</p>
                  <ul className="list-disc pl-5 mt-1 text-xs">
                      <li><strong>Aarav:</strong> <InlineMath>{'y = -50t + 500'}</InlineMath> (Slope = -50)</li>
                      <li><strong>Ben:</strong> <InlineMath>{'y = -75t + 500'}</InlineMath> (Slope = -75)</li>
                  </ul>
                  <p className="font-bold text-sm mt-1">Conclusion: Ben is spending money faster because <InlineMath>{'|-75| > |-50|'}</InlineMath>.</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300">Check Your Understanding</h4>
                  <div className="text-sm mt-2 space-y-3">
                    <p><strong>Q1:</strong> Tutor A's fee is <InlineMath>{'y=400x+500'}</InlineMath>. Tutor B's is <InlineMath>{'y=450x+200'}</InlineMath>. Who has a higher hourly rate?</p>
                    <p><strong>Q2:</strong> A person saves money via <InlineMath>{'y = 200x'}</InlineMath>. Another pays a loan via <InlineMath>{'y = -250x + 1000'}</InlineMath>. Who is changing their money at a faster rate?</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="comparing-slopes" 
            slideTitle="Comparing Slopes (Rates of Change)" 
            moduleId="linear-equations-and-functions" 
            submoduleId="comparing-linear-functions"
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