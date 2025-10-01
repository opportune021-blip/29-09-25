import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearAndNonlinearFunctionsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'linear-vs-nonlinear-graphs', conceptId: 'linear-vs-nonlinear-graphs', conceptName: 'Identifying from a Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Identifying from a Graph</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">The easiest way to tell if a function is linear is by looking at its graph.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: Linear Graph Analysis */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">✅ Linear Function (A Straight Line)</h3>
            <p className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md text-center">If the graph forms a **perfectly straight line**, it's a linear function.</p>
            
            <hr className="my-4 dark:border-slate-600"/>

            <h4 className="font-semibold text-lg text-blue-700 dark:text-blue-400">Once You Know It's Linear, Be a Graph Detective!</h4>
            <div className="mt-2 space-y-3 text-sm">
                <p><strong>Clue #1: Find the Y-Intercept (b):</strong> Look where the line crosses the vertical y-axis. This is the function's **starting value**.</p>
                <p><strong>Clue #2: Find the Slope's Direction:</strong> Is the line going Uphill (Positive Slope), Downhill (Negative Slope), or is it Flat (Zero Slope)?</p>
                <p><strong>Clue #3: Find the Slope's Value (m):</strong> Pick two perfect points on the line and count the **Rise over Run** to find the exact rate of change.</p>
            </div>
          </div>

          {/* Right Column: Nonlinear Graph Analysis */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">❌ Nonlinear Function (Not a Straight Line)</h3>
            <p className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md text-center">If the graph has **any curve or bend**, it's a nonlinear function because its rate of change is not constant.</p>

            <hr className="my-4 dark:border-slate-600"/>
            
            <div className="space-y-4 overflow-y-auto pr-2 text-sm">
                <div>
                    <h4 className="font-semibold text-lg text-blue-700 dark:text-blue-400">Common Nonlinear Shapes</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>The Parabola ("U" shape):</strong> The path a thrown cricket ball makes.</li>
                        <li><strong>The Exponential Curve (gets steeper):</strong> The growth of views on a viral video.</li>
                        <li><strong>The V-Shape:</strong> Your distance from home if you walk 2 km away and then walk back.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-blue-700 dark:text-blue-400">Tricky Case: Piecewise Functions</h4>
                    <p className="mt-1">Some graphs are made of straight parts but are still nonlinear overall. For example, parking fees at a Navi Mumbai mall might be ₹50 for the first hour (a steep line), then free for the next two hours (a flat line). Because the slope changes, the overall function is nonlinear.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="linear-vs-nonlinear-graphs" 
            slideTitle="Identifying from a Graph" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-and-nonlinear-functions"
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