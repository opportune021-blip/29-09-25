import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ConstructingLinearModelsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'words-to-equations', conceptId: 'words-to-equations', conceptName: 'From Words to Equations', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Turning Stories into Equations</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">The skill is to read a story and pull out the mathematical pieces to build <InlineMath>{'y = mx + b'}</InlineMath>.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Theory */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">The Scenario</h3>
                <p className="mt-1">"A mobile phone repair shop in Brahmapuri charges a fixed service fee for inspection, plus an hourly rate for the actual repair work."</p>
            </div>
            
            <div className="text-3xl text-center my-4 font-bold text-blue-400">⬇️</div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 text-center">The Math Pieces</h3>
                <ul className="list-disc pl-5 mt-2 text-sm">
                    <li><strong>Rate of Change (m):</strong> The value that repeats. ➡️ The hourly rate.</li>
                    <li><strong>Initial Value (b):</strong> The one-time, starting amount. ➡️ The fixed service fee.</li>
                    <li><strong>Independent Variable (x):</strong> What the cost depends on. ➡️ The number of hours.</li>
                    <li><strong>Dependent Variable (y):</strong> The final outcome we want. ➡️ The total cost.</li>
                </ul>
            </div>
            
            <div className="text-3xl text-center my-4 font-bold text-blue-400">⬇️</div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg text-center">
                 <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">The Final Equation</h3>
                <p className="font-mono text-lg mt-1">Total Cost = (Hourly Rate × Hours) + Service Fee</p>
                <p className="font-mono text-xl mt-1"><InlineMath>{'y = mx + b'}</InlineMath></p>
            </div>
          </div>

          {/* Right Column: The Practice */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Putting it into Practice</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">1. Adding Numbers to the Story</h4>
                  <p className="text-sm mt-1">Let's say the shop charges a **₹300 service fee (b)** and **₹500 per hour (m)**.</p>
                  <p className="font-bold mt-2 text-center bg-blue-100 dark:bg-blue-900/50 rounded-md p-2">Equation: <InlineMath>{'y = 500x + 300'}</InlineMath></p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">2. Making a Prediction</h4>
                  <p className="text-sm mt-1">What's the cost for a 2-hour repair? (Find y when x=2)</p>
                  <p className="text-center mt-1"><InlineMath>{'y = 500(2) + 300 = 1000 + 300 = 1300'}</InlineMath></p>
                  <p className="text-sm mt-1"><strong>Answer:</strong> The total cost will be ₹1300.</p>
              </div>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">3. Working Backwards (Challenge!)</h4>
                  <p className="text-sm mt-1">Your final bill is ₹1800. How many hours did the repair take? (Find x when y=1800)</p>
                  <p className="text-center mt-1"><InlineMath>{'1800 = 500x + 300 \\implies 1500 = 500x \\implies x=3'}</InlineMath></p>
                  <p className="text-sm mt-1"><strong>Answer:</strong> The repair took 3 hours.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">4. Another Example: Food Delivery</h4>
                  <p className="text-sm mt-1">A delivery app charges a **₹40 delivery fee (b)** plus **₹10 per km (m)**.</p>
                   <p className="font-bold mt-2 text-center bg-blue-100 dark:bg-blue-900/50 rounded-md p-2">Equation: <InlineMath>{'y = 10x + 40'}</InlineMath></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="words-to-equations" 
            slideTitle="From Words to Equations" 
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