import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearModelsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'what-are-linear-models', conceptId: 'what-are-linear-models', conceptName: 'What are Linear Models?', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-4">What are Linear Models? Math in the Real World!</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-8">A linear model is when we use a straight-line equation to describe and predict real-world situations.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Theory */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Translating the Real World into <InlineMath>{'y = mx + b'}</InlineMath></h3>
            <p className="mb-4 text-sm">Linear models work for any situation with a **constant rate of change**. The trick is to identify the parts of the story.</p>
            
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="font-semibold text-lg">'m' (The Slope) is the RATE OF CHANGE</h4>
                <p className="mt-1 text-sm">This is the "action" part that happens over and over. Look for words like **per, for every, each.**</p>
                <ul className="list-disc pl-5 mt-1 text-xs">
                  <li>Fare in rupees **per** kilometer.</li>
                  <li>Litres of water **per** minute.</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="font-semibold text-lg">'b' (The Y-Intercept) is the STARTING POINT</h4>
                <p className="mt-1 text-sm">This is the initial, one-time value before the action begins (when <InlineMath>{'x=0'}</InlineMath>).</p>
                 <ul className="list-disc pl-5 mt-1 text-xs">
                  <li>The initial meter drop fare.</li>
                  <li>Water already in a tank.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Real-World Examples</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              
              {/* Example 1 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Example 1: The Navi Mumbai Auto-Rickshaw</h4>
                  <p className="text-sm mt-1">An auto has a **₹23 starting fee ('b')** and charges **₹18 per km ('m')**.</p>
                  <p className="font-bold mt-2 text-center bg-blue-100 dark:bg-blue-900/50 rounded-md p-2">Model: <InlineMath>{'y = 18x + 23'}</InlineMath></p>
                  <p className="text-sm mt-2"><strong>Prediction for 5 km trip:</strong> <br/> <InlineMath>{'y = 18(5) + 23 = 90 + 23 = 113'}</InlineMath>. The cost is ₹113.</p>
              </div>

              {/* Example 2 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Example 2: Filling a Water Tank</h4>
                  <p className="text-sm mt-1">A tank in Nerul starts with **200 litres ('b')** and is filled at **50 litres per minute ('m')**.</p>
                  <p className="font-bold mt-2 text-center bg-blue-100 dark:bg-blue-900/50 rounded-md p-2">Model: <InlineMath>{'y = 50x + 200'}</InlineMath></p>
                  <p className="text-sm mt-2"><strong>Prediction for 10 minutes:</strong> <br/> <InlineMath>{'y = 50(10) + 200 = 500 + 200 = 700'}</InlineMath>. The tank will have 700 litres.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-are-linear-models" 
            slideTitle="What are Linear Models?" 
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

