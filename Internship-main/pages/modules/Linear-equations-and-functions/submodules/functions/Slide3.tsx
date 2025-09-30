import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FunctionsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'function-notation', conceptId: 'function-notation', conceptName: 'Function Notation: f(x)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Understanding Function Notation: What is f(x)?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Theory */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Why Not Just Use 'y'?</h3>
            <p className="mb-4">While 'y' is correct, function notation <InlineMath>{'f(x)'}</InlineMath> is a more powerful and descriptive way to write our rules.</p>
            
            <div className="space-y-3">
              <p>The notation <InlineMath>{'f(x) = 2x + 1'}</InlineMath> is read as "**f of x** equals 2x plus 1."</p>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-600">
                <ul className="list-disc pl-5 space-y-2">
                    <li>The <InlineMath>{'f'}</InlineMath> is the **name** of the function.</li>
                    <li>The <InlineMath>{'(x)'}</InlineMath> tells us the **input** variable.</li>
                    <li>The whole expression <InlineMath>{'f(x)'}</InlineMath> represents the **output** (it's the new 'y'!).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mt-4">The Power of f(x)</h4>
                <p>It gives clear instructions. "Find <InlineMath>{'f(2)'}</InlineMath>" is a complete command: "Use function 'f' and plug in an input of 2."</p>
              </div>
            </div>
          </div>

          {/* Right Column: Worked Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Worked Examples</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              
              {/* Example 1 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                  <p className="font-semibold">Example 1: Given <InlineMath>{'f(x) = 4x - 10'}</InlineMath>, find <InlineMath>{'f(3)'}</InlineMath>.</p>
                  <p className="mt-2 text-sm">This means replace every 'x' with '3'.</p>
                  <p className="mt-2 text-center p-2 bg-white dark:bg-slate-700 rounded-md">
                    <InlineMath>{'f(3) = 4(3) - 10'}</InlineMath> <br/>
                    <InlineMath>{'f(3) = 12 - 10 = 2'}</InlineMath>
                  </p>
                  <p className="font-bold text-center mt-1">Answer: <InlineMath>{'f(3) = 2'}</InlineMath></p>
              </div>

              {/* Example 2 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                  <p className="font-semibold">Example 2: An auto-rickshaw from Vashi to Seawoods costs <InlineMath>{'C(d) = 18d + 23'}</InlineMath>, where 'd' is distance in km. Find the cost for 4 km, <InlineMath>{'C(4)'}</InlineMath>.</p>
                   <p className="mt-2 text-center p-2 bg-white dark:bg-slate-700 rounded-md">
                    <InlineMath>{'C(4) = 18(4) + 23'}</InlineMath> <br/>
                    <InlineMath>{'C(4) = 72 + 23 = 95'}</InlineMath>
                  </p>
                  <p className="font-bold text-center mt-1">Answer: The cost is ₹95.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="function-notation" 
            slideTitle="Function Notation: f(x)" 
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