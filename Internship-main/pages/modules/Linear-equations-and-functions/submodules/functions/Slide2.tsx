import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FunctionsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'evaluating-functions', conceptId: 'evaluating-functions', conceptName: 'Evaluating Functions from an Equation', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Worked Example: Evaluating Functions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The "How-To" Guide */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">How to Use a Function</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg">What does "Evaluate" mean?</h4>
                <p className="mt-1">It's a fancy word for "find the value." Evaluating a function is like putting a specific number (input) into our "Function Machine" and seeing what number comes out (output).</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">Understanding Function Notation: <InlineMath>{'f(x)'}</InlineMath></h4>
                <p className="mt-1">You'll often see <InlineMath>{'y'}</InlineMath> replaced with <InlineMath>{'f(x)'}</InlineMath> (read as "f of x"). It's a shorthand that tells you the function's name is 'f' and the input is 'x'. A request to find <InlineMath>{'f(4)'}</InlineMath> is a clear instruction: "Evaluate function 'f' using an input of 4."</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg">The 4-Step Process</h4>
                <ol className="list-decimal pl-5 mt-2 space-y-2">
                    <li><strong>Start</strong> with the function's rule (the equation).</li>
                    <li><strong>Identify</strong> the input value given to you.</li>
                    <li><strong>Substitute</strong> the input for every 'x'. **Always use parentheses `( )`!**</li>
                    <li><strong>Calculate</strong> the final answer using BODMAS.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Right Column: Examples in Action */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Examples in Action</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              
              {/* Example 1 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                  <p className="font-semibold">Example 1: Given <InlineMath>{'f(x) = 3x + 2'}</InlineMath>, find <InlineMath>{'f(4)'}</InlineMath>.</p>
                  <p className="mt-2 text-center p-2 bg-white dark:bg-slate-700 rounded-md">
                    <InlineMath>{'f(4) = 3(4) + 2'}</InlineMath> <br/>
                    <InlineMath>{'f(4) = 12 + 2 = 14'}</InlineMath>
                  </p>
                  <p className="font-bold text-center mt-1">Answer: 14</p>
              </div>

              {/* Example 2 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                  <p className="font-semibold">Example 2: Given <InlineMath>{'g(x) = -5x - 1'}</InlineMath>, find <InlineMath>{'g(-2)'}</InlineMath>.</p>
                   <p className="mt-2 text-center p-2 bg-white dark:bg-slate-700 rounded-md">
                    <InlineMath>{'g(-2) = -5(-2) - 1'}</InlineMath> <br/>
                    <InlineMath>{'g(-2) = 10 - 1 = 9'}</InlineMath>
                  </p>
                  <p className="font-bold text-center mt-1">Answer: 9</p>
              </div>
              
              {/* Example 3 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                  <p className="font-semibold">Example 3: A ferry from Mumbai to Mandwa costs <InlineMath>{'C(p) = 250p + 50'}</InlineMath>. Find the cost for 4 people (<InlineMath>{'C(4)'}</InlineMath>).</p>
                  <p className="mt-2 text-center p-2 bg-white dark:bg-slate-700 rounded-md">
                    <InlineMath>{'C(4) = 250(4) + 50'}</InlineMath> <br/>
                    <InlineMath>{'C(4) = 1000 + 50 = 1050'}</InlineMath>
                  </p>
                  <p className="font-bold text-center mt-1">Answer: ₹1050</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="evaluating-functions" 
            slideTitle="Evaluating Functions from an Equation" 
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