import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ConstructingLinearModelsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'finding-b-from-problem', conceptId: 'finding-b-from-problem', conceptName: 'Finding the Initial Value (b)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Finding the Initial Value (b)</h2>
         */}<p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">The y-intercept ('b') is the story's starting point or one-time fee.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Methods */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">How to Find 'b' in a Story</h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold text-lg">Method 1: Spot the "Starting" Words</h4>
                  <p className="mt-1 text-sm">Look for words that describe a one-time, initial value that doesn't change.</p>
                  <ul className="list-disc pl-5 mt-2 text-xs">
                    <li>starting fee / amount</li>
                    <li>initial value / fee</li>
                    <li>flat rate / one-time charge</li>
                  </ul>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold text-lg">Method 2: Calculate It When It's a Mystery!</h4>
                  <p className="mt-1 text-sm">If the start value isn't given, but you know the rate ('m') and a later point (x, y), you can work backwards.</p>
                  <ol className="list-decimal pl-5 mt-2 text-xs">
                    <li>Start with <InlineMath>{'y = mx + b'}</InlineMath>.</li>
                    <li>Plug in the known values for 'y', 'm', and 'x'.</li>
                    <li>Solve the equation for 'b'.</li>
                  </ol>
              </div>
            </div>
          </div>

          {/* Right Column: Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Examples in Action</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Spotting 'b'</h4>
                  <p className="text-xs italic mt-1">"A gym membership costs ₹1000 to sign up, then ₹500 per month." ➡️ <InlineMath>{'b=1000'}</InlineMath></p>
                  <p className="text-xs italic mt-1">"A plant is 15 cm tall and grows 2 cm each week." ➡️ <InlineMath>{'b=15'}</InlineMath></p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Calculating 'b'</h4>
                  <p className="text-sm mt-1">"It's Wednesday lunchtime. A cab in Navi Mumbai costs ₹18 per km (m). A 4 km (x) trip costs a total of ₹97 (y). What was the starting fee?"</p>
                  <p className="text-center p-1 mt-1 bg-white dark:bg-slate-600 rounded-md text-xs">
                    <InlineMath>{'y = mx + b'}</InlineMath><br/>
                    <InlineMath>{'97 = 18(4) + b'}</InlineMath><br/>
                    <InlineMath>{'97 = 72 + b \\implies b = 25'}</InlineMath>
                  </p>
                  <p className="text-sm mt-1"><strong>Answer:</strong> The starting fee was ₹25.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Special Case: Zero Y-Intercept</h4>
                  <p className="text-sm mt-1">"You are buying mangoes at a Vashi stall for ₹80 per kg, with no extra fees."</p>
                  <p className="text-sm mt-1">Since there is no starting fee, <InlineMath>{'b = 0'}</InlineMath>. The equation is <InlineMath>{'y = 80x'}</InlineMath>.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-b-from-problem" 
            slideTitle="Finding the Initial Value (b)" 
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