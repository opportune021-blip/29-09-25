import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearModelsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'line-of-best-fit', conceptId: 'line-of-best-fit', conceptName: 'The Line of Best Fit', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
      {/*   <h2 className="text-3xl font-bold text-center mb-6">The Line of Best Fit: Making Predictions from Messy Data</h2>
        */} 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Theory */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">The "How-To" Guide</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">What is a Line of Best Fit?</h4>
                <p className="mt-1 text-sm">It's a single straight line drawn through the middle of the points on a scatter plot. It summarizes the trend and acts as our "best guess" for the linear relationship hidden in the messy data.</p>
              </div>
              
              <hr className="dark:border-slate-600"/>

              <div>
                <h4 className="font-semibold text-lg">How to Draw One (By Eye)</h4>
                <ol className="list-decimal pl-5 mt-2 text-sm space-y-1">
                    <li>The line must follow the **direction** of the trend (uphill or downhill).</li>
                    <li>It should go through the **middle** of the "cloud" of points.</li>
                    <li>Try to have roughly the **same number of points above the line as below it**.</li>
                </ol>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-lg p-3">
                <h4 className="font-bold">Its Purpose: Making Predictions</h4>
                <p className="text-sm mt-1">Once drawn, the Line of Best Fit becomes our **linear model** (<InlineMath>{'y=mx+b'}</InlineMath>). We can find its equation and use it to predict future values.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Worked Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Full Example: Cold Drink Sales</h3>
            <div className="space-y-3 overflow-y-auto pr-2">
                <p className="text-sm font-semibold">Scenario: A shopkeeper in Navi Mumbai tracks temperature vs. cold drinks sold and draws a Line of Best Fit.</p>
                 
                <h4 className="font-semibold pt-2">Step 1: Find the Equation of the Line</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Find 'b':</strong> The drawn line crosses the y-axis at about 10. So, <InlineMath>{'b \\approx 10'}</InlineMath>.</p>
                  <p><strong>Find 'm':</strong> The line passes near (15, 40) and (25, 60). <br/>
                  <InlineMath>{'m = \\frac{60-40}{25-15} = \\frac{20}{10} = 2'}</InlineMath>. So, <InlineMath>{'m \\approx 2'}</InlineMath>.</p>
                  <p className="font-bold text-center bg-slate-100 dark:bg-slate-700 rounded p-1">Model: <InlineMath>{'y = 2x + 10'}</InlineMath></p>
                </div>

                <h4 className="font-semibold pt-2">Step 2: Make a Prediction</h4>
                 <div className="text-sm space-y-1">
                  <p><strong>Question:</strong> Predict sales if the temperature is 30°C.</p>
                  <p><strong>Solution:</strong> Plug <InlineMath>{'x=30'}</InlineMath> into our model.</p>
                  <p className="text-center bg-blue-100 dark:bg-blue-900/50 rounded p-2"><InlineMath>{'y = 2(30) + 10 = 60 + 10 = 70'}</InlineMath></p>
                  <p className="font-bold mt-1">Answer: The shop can expect to sell about 70 cold drinks.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="line-of-best-fit" 
            slideTitle="The Line of Best Fit" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-models"
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