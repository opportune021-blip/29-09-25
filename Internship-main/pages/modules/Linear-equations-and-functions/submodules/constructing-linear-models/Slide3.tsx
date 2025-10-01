import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ConstructingLinearModelsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'finding-m-from-problem', conceptId: 'finding-m-from-problem', conceptName: 'Finding the Rate of Change (m)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Finding the Rate of Change (m)</h2>
        */} 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: How to find 'm' */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Method 1: Look for "Action" Words</h3>
              <p className="mt-2 text-sm">The slope (`m`) is the value that happens repeatedly. Look for these clue words in the story:</p>
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="grid grid-cols-2 gap-x-4">
                  <ul className="list-disc pl-5 text-sm"><li>per</li><li>each</li></ul>
                  <ul className="list-disc pl-5 text-sm"><li>every</li><li>for</li></ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Method 2: Calculate It!</h3>
              <p className="mt-2 text-sm">If the rate isn't stated, you can calculate it from two "snapshots" (or points) in the story.</p>
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-xs italic">"It's Wednesday lunchtime in Navi Mumbai. A 2 km Swiggy delivery costs ₹60, while a 5 km delivery costs ₹90."</p>
                <ol className="list-decimal pl-5 mt-2 text-xs">
                    <li>Turn the story into points: (2, 60) and (5, 90).</li>
                    <li>Use the slope formula: <InlineMath>{'m = \\frac{90 - 60}{5 - 2} = \\frac{30}{3} = 10'}</InlineMath>.</li>
                    <li>The rate of change is **₹10 per km**, so <InlineMath>{'m=10'}</InlineMath>.</li>
                </ol>
              </div>
            </div>
          </div>
{/* Right Column: Spotting the Slope Examples */}
<div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
  <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Spotting the Slope in a Story</h3>
  <div className="space-y-3 overflow-y-auto pr-2">
    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
      <p className="text-sm italic">"A car rental company charges ₹500 plus <strong>₹8 per kilometer</strong>."</p>
      <p className="text-right font-bold"><InlineMath>{'m = 8'}</InlineMath></p>
    </div>
    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
      <p className="text-sm italic">"Rohan reads <strong>20 pages every hour</strong>."</p>
      <p className="text-right font-bold"><InlineMath>{'m = 20'}</InlineMath></p>
    </div>
    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
      <p className="text-sm italic">"A phone's battery <strong>loses 2% for each video</strong> watched."</p>
      <p className="text-right font-bold">
        <InlineMath>{'m = -2'}</InlineMath> (it's decreasing!)
      </p>
    </div>
    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
      <p className="text-sm italic">
        "You pay a flat entry fee of ₹200 for an all-you-can-eat buffet. The price doesn't change no matter how many plates you eat."
      </p>
      <p className="text-right font-bold">
        <InlineMath>{'m = 0'}</InlineMath> (Zero Slope)
      </p>
    </div>
  </div>
</div>

        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-m-from-problem" 
            slideTitle="Finding the Rate of Change (m)" 
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
