import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SlopeSlide1_Introduction() {
    const slideInteractions: Interaction[] = [{ id: 'what-is-slope', conceptId: 'what-is-slope', conceptName: 'What is Slope?', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        {/* <h2 className="text-3xl font-bold text-center mb-6">What is Slope? ⛰️</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Core Concept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Concept of Steepness</h3>

            {/* This is the INNER CONTAINER holding your specific information */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                    Slope is Steepness
                </h4>
                <p className="mt-2">
                    Imagine cycling in Navi Mumbai. Going on a flat road like Palm Beach Road is easy. Going up a flyover ramp is harder. That difference is <strong>steepness</strong>. In math, we call this <strong>slope</strong>.
                </p>
            </div>

            <div className="mt-4 flex-grow">
                <p>Slope is a <strong>number</strong> that measures exactly how steep a line is.</p>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li>A very steep line has a <strong>big</strong> slope number.</li>
                    <li>A less steep, gentle line has a <strong>small</strong> slope number.</li>
                </ul>
            </div>
          </div>

          {/* Right Column: The Four Types of Slope */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Four Basic Types of Slope</h3>
            <div className="grid grid-cols-2 gap-4 flex-grow text-center text-sm">
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-2 flex flex-col justify-center">
                    <p className="font-bold">Positive Slope</p>
                    <div className="text-2xl my-1">↗</div>
                    <p className="text-xs italic">Uphill (L to R)</p>
                    <p className="text-xs mt-1">Analogy: Going up a ramp</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-2 flex flex-col justify-center">
                    <p className="font-bold">Negative Slope</p>
                    <div className="text-2xl my-1">↘</div>
                    <p className="text-xs italic">Downhill (L to R)</p>
                    <p className="text-xs mt-1">Analogy: Coming down a ramp</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-2 flex flex-col justify-center">
                    <p className="font-bold">Zero Slope</p>
                    <div className="text-2xl my-1">→</div>
                    <p className="text-xs italic">Perfectly Flat</p>
                    <p className="text-xs mt-1">Analogy: A level road</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-2 flex flex-col justify-center">
                    <p className="font-bold">Undefined Slope</p>
                    <div className="text-2xl my-1">↑</div>
                    <p className="text-xs italic">Perfectly Vertical</p>
                    <p className="text-xs mt-1">Analogy: A wall</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-slope" 
            slideTitle="What is Slope?" 
            moduleId="linear-equations-and-functions" 
            submoduleId="slope"
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