import React, { useState } from 'react'; // FIX: Correctly imports both React and the useState hook.
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FunctionsSlide4() {
    // FIX: Correctly declares 'localInteractions' and its update function, 'setLocalInteractions'.
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'vertical-line-test', conceptId: 'vertical-line-test', conceptName: 'The Vertical Line Test', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        // FIX: Now correctly uses the 'setLocalInteractions' function.
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-4">The Vertical Line Test: An Easy Visual Trick</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-8">This test quickly checks if a graph follows the Golden Rule of Functions: "One input, one output."</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Theory & Method */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">The "Why" and "How"</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">Why The Test Works</h4>
                <p className="mt-1 text-sm">A vertical line represents a single x-value (input). If a graph touches that line more than once, it means one input has multiple outputs, which breaks the rule of functions!</p>
              </div>
              
              <hr className="dark:border-slate-600"/>

              <div>
                <h4 className="font-semibold text-lg">How to Perform the "Ruler Test"</h4>
                <ol className="list-decimal pl-5 mt-2 text-sm space-y-1">
                    <li>Imagine holding a ruler or pencil perfectly vertical.</li>
                    <li>Slide it across the graph from left to right.</li>
                    <li>Watch how many times the graph touches your ruler at any single moment.</li>
                </ol>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-lg p-3">
                <h4 className="font-bold">The Rule in a Nutshell</h4>
                <p className="text-sm mt-1">If your ruler EVER touches the graph in **more than one place at the same time**, it is **NOT** a function.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Visual Examples: Pass or Fail?</h3>
            <div className="space-y-6 flex-grow flex flex-col justify-around">
              
              {/* Passes the Test */}
              <div>
                <h4 className="text-lg font-semibold mb-2">✅ PASSES (IS a function)</h4>
                <p className="text-sm mb-2">The vertical line only ever touches the graph at one single point.</p>
                <img src="https://i.imgur.com/r6sW3lR.png" alt="Graphs of a line and a parabola passing the vertical line test" className="rounded-lg shadow-md border dark:border-slate-600"/>
              </div>

              {/* Fails the Test */}
              <div>
                <h4 className="text-lg font-semibold mb-2">❌ FAILS (NOT a function)</h4>
                <p className="text-sm mb-2">The vertical line can cross the graph in two places at once.</p>
                <img src="https://i.imgur.com/2Y5F5k9.png" alt="Graphs of a circle and a sideways parabola failing the vertical line test" className="rounded-lg shadow-md border dark:border-slate-600"/>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="vertical-line-test" 
            slideTitle="The Vertical Line Test" 
            moduleId="linear-equations-and-functions" 
            submoduleId="functions"
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