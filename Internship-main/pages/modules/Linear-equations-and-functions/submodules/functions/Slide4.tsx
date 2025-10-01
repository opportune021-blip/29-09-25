import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FunctionsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'vertical-line-test', conceptId: 'vertical-line-test', conceptName: 'The Vertical Line Test', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
       {/*  <h2 className="text-3xl font-bold text-center mb-4">The Vertical Line Test: An Easy Visual Trick</h2>
        */} <p className="text-center text-slate-600 dark:text-slate-300 mb-8">This test quickly checks if a graph follows the Golden Rule of Functions: "One input, one output."</p>
        
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
                <p className="text-sm mt-1">If your ruler EVER touches the graph in <strong>more than one place at the same time</strong>, it is <strong>NOT</strong> a function.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptive Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Descriptive Examples: Pass or Fail?</h3>
            <div className="space-y-4 flex-grow flex flex-col">
              
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="text-lg font-semibold">✅ PASSES (IS a function)</h4>
                <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                    <li><strong>A Straight, Slanted Line:</strong> As you slide your ruler across, it only ever touches the line at one single point.</li>
                    <li><strong>A 'U'-shaped Parabola:</strong> Even though it's a curve, your vertical ruler only hits it once at any position.</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="text-lg font-semibold">❌ FAILS (NOT a function)</h4>
                <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                    <li><strong>A Circle:</strong> When you slide your ruler over the middle of a circle, it touches both the top and the bottom at the same time.</li>
                    <li><strong>A Sideways 'C'-shape:</strong> Your vertical ruler will hit the curve in two places at once.</li>
                </ul>
              </div>

              <div className="mt-auto p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <h4 className="font-semibold text-center">Mental Challenge</h4>
                <p className="text-xs text-center mt-1">Imagine the capital letter 'S' drawn on a graph. Would it pass or fail? What about the letter 'V'?</p>
                <p className="text-xs text-center mt-1"><em>Answer: 'S' would fail. 'V' would pass!</em></p>
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