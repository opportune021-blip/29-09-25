import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearModelsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'making-predictions', conceptId: 'making-predictions', conceptName: 'Making Predictions', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
      {/*   <h2 className="text-3xl font-bold text-center mb-6">Making Predictions: The Power of Linear Models</h2>
        */} 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Methods */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Why Make a Model?</h3>
            <p className="text-sm">The most powerful reason we create a linear model is to make predictions about the future or unknown situations. It's like a crystal ball for data that follows a pattern.</p>
            
            <hr className="my-4 dark:border-slate-600"/>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Two Methods for Predicting</h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-bold">1. The Visual Way (From a Graph)</h4>
                  <p className="text-sm mt-1">Quick and easy for estimates. Find your input on the x-axis, move up to the line, then move across to the y-axis to read the predicted output.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-bold">2. The Precise Way (From the Equation)</h4>
                  <p className="text-sm mt-1">This is the most accurate method. It's the same as **evaluating a function**.</p>
                  <ol className="list-decimal pl-5 mt-1 text-xs">
                    <li>Start with your model: <InlineMath>{'y = mx + b'}</InlineMath>.</li>
                    <li>Substitute your input value for 'x'.</li>
                    <li>Calculate the result to find 'y'.</li>
                  </ol>
              </div>
            </div>
          </div>

          {/* Right Column: Examples & Warning */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Examples & An Important Warning</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Example 1: Auto-Rickshaw Ride</h4>
                  <p className="text-sm mt-1">Using the model <InlineMath>{'C(k) = 18k + 23'}</InlineMath>, predict the cost for a 7 km trip.</p>
                  <p className="text-center p-1 mt-1 bg-white dark:bg-slate-600 rounded"><InlineMath>{'C(7) = 18(7) + 23 = 126 + 23 = 149'}</InlineMath></p>
                  <p className="text-sm mt-1"><strong>Prediction:</strong> The cost will be ₹149.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Example 2: Cold Drink Sales</h4>
                  <p className="text-sm mt-1">Using the model <InlineMath>{'Sales(t) = 2t + 10'}</InlineMath>, predict sales if the temperature is 32°C.</p>
                  <p className="text-center p-1 mt-1 bg-white dark:bg-slate-600 rounded"><InlineMath>{'Sales(32) = 2(32) + 10 = 64 + 10 = 74'}</InlineMath></p>
                  <p className="text-sm mt-1"><strong>Prediction:</strong> The shop will sell about 74 drinks.</p>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-300">Warning: Prediction vs. Reality</h4>
                  <p className="text-sm mt-2"><strong>Interpolation</strong> (predicting *inside* your data range) is usually reliable.</p>
                  <p className="text-sm mt-1"><strong>Extrapolation</strong> (predicting *outside* your data range) can be risky. The real-world rule might change!</p>
                  <p className="text-xs mt-1 italic">Always ask: "Does my prediction make sense in the real world?"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="making-predictions" 
            slideTitle="Making Predictions" 
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