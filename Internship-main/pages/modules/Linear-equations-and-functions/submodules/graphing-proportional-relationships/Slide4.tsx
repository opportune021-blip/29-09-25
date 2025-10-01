import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FindingUnitRateFromGraphSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'unit-rate-from-graph', conceptId: 'unit-rate-from-graph', conceptName: 'Finding the Unit Rate from a Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Finding the Unit Rate from a Graph</h2>
          */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Main Method */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Key: Find the Point (1, k) 🔑</h3>
            <p>On any proportional graph, the unit rate is the <strong>y-value when x equals 1</strong>. This point, <InlineMath>{'(1, k)'}</InlineMath>, reveals the constant of proportionality, <InlineMath>{'k'}</InlineMath>.</p>
            
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400"><strong>Remember:</strong> Proportional graphs are always straight lines that pass through the origin <InlineMath>{'(0,0)'}</InlineMath>. This makes sense—at 0 minutes of streaming, you've used 0 MB of data!</p>
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Example: Graphing Your YouTube Stream</h4>
              {/* UPDATED CONTENT: More active, story-like introduction */}
              <p className="text-sm italic"><strong>Let's track the data you use while watching a YouTube video. As the minutes tick by, the data counter goes up at a perfectly steady rate. That's what "proportional" means here.</strong></p>
              <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-2 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                  <p className="text-slate-500">[Graph with x-axis "Time (minutes)" and y-axis "Data Used (MB)". A line from (0,0) passes through (1, 25) and (2, 50)]</p>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Look at the x-axis (Time) and find the number <strong>1</strong>.</li>
                <li>Go straight up until you hit the line.</li>
                <li>Read the y-value at that point. The point is <InlineMath>{'(1, 25)'}</InlineMath>.</li>
              </ol>

              {/* UPDATED CONTENT: Upgraded mini-challenge with two questions */}
              <div className="my-3 p-3 border border-dashed border-slate-400 dark:border-slate-600 rounded-lg">
                  <details>
                      <summary className="font-semibold cursor-pointer text-base">🚀 Predict the Future! (Mini-Challenge)</summary>
                      <div className="mt-2 text-sm space-y-2">
                          <div>
                            <p><strong>Question 1:</strong> How much data will you use after watching for <strong>10 minutes</strong>?</p>
                            <p className="mt-1 font-bold">Answer: 250 MB! <InlineMath>{'y = 25 \\times 10 = 250'}</InlineMath></p>
                          </div>
                          <div className="pt-2 border-t border-slate-300 dark:border-slate-600">
                            <p><strong>Challenge Question:</strong> Your data plan warns you at 200 MB. How many minutes can you watch?</p>
                            <p className="mt-1 font-bold">Answer: 8 minutes! <InlineMath>{'200 = 25x \\rightarrow x = 8'}</InlineMath></p>
                          </div>
                      </div>
                  </details>
              </div>

              <p className="mt-3 font-bold text-center bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">The unit rate is <InlineMath>{'25'}</InlineMath> MB per minute. The equation is <InlineMath>{'y = 25x'}</InlineMath>.</p>
            </div>
          </div>

          {/* Right Column: Connection to Slope & Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Connection to Slope 📈 (Rise / Run)</h3>
            {/* UPDATED CONTENT: Smoother transition sentence */}
            <p><strong>Another way to find the unit rate is to measure the line's steepness, which we call its slope. For any proportional relationship, the slope is the unit rate.</strong></p>
            
            {/* UPDATED CONTENT: Units are now included in the calculation */}
            <div className="my-4 text-center">
                <p><strong>Rise</strong> (change in Data): <InlineMath>{'50 \\text{ MB} - 0 \\text{ MB} = 50 \\text{ MB}'}</InlineMath></p>
                <p><strong>Run</strong> (change in Time): <InlineMath>{'2 \\text{ min} - 0 \\text{ min} = 2 \\text{ min}'}</InlineMath></p>
                <div className="mt-2 font-bold text-lg">
                    <InlineMath>{'\\text{Slope} = \\frac{\\text{Rise}}{\\text{Run}} = \\frac{50 \\text{ MB}}{2 \\text{ min}} = 25 \\text{ MB/minute}'}</InlineMath>
                </div>
            </div>
            <p>The slope is <strong>25 MB/minute</strong>, which is exactly the same as our unit rate!</p>

            <div className="my-4 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-lg">
                <p className="font-semibold text-sm">Notice the "Constant" Rate:</p>
                <p className="text-sm">No matter which point you check, the ratio <InlineMath>{'\\frac{y}{x}'}</InlineMath> is always the same:</p>
                <ul className="text-xs list-disc pl-5 mt-1">
                    <li>For (1, 25) <InlineMath>{'\\rightarrow \\frac{25}{1} = 25'}</InlineMath></li>
                    <li>For (2, 50) <InlineMath>{'\\rightarrow \\frac{50}{2} = 25'}</InlineMath></li>
                </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded-lg p-4 mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">In Summary, the Unit Rate (k) is:</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>The <strong>y-value</strong> of the point where <InlineMath>{'x=1'}</InlineMath>.</li>
                    <li>The <strong>Constant of Proportionality</strong> (the "multiplier") in <InlineMath>{'y=kx'}</InlineMath>.</li>
                    <li>The <strong>Slope</strong> (the "steepness") of the line.</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="unit-rate-from-graph" 
            slideTitle="Finding the Unit Rate from a Graph" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-proportional-relationships"
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