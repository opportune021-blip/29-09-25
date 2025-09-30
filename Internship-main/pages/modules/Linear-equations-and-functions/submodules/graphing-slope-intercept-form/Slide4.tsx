import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function GraphingSlopeInterceptSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'graphing-full-example', conceptId: 'graphing-full-example', conceptName: 'Full Graphing Example Walkthrough', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      // The background color for the whole slide is set here
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
       {/*  <h2 className="text-3xl font-bold text-center mb-4">Full Example: Graphing a Line from Start to Finish</h2>
         */}<p className="text-center text-slate-600 dark:text-slate-300 mb-4">Let's put all the steps together to graph the equation:</p>
        <div className="mb-8">
            <BlockMath>{'y = -\\frac{2}{3}x + 4'}</BlockMath>
        </div>
        
        {/* --- Two-Column Layout --- */}
        <div className="flex flex-col md:flex-row gap-8 flex-grow">

          {/* --- Left Column: The Instructions --- */}
          <div className="md:w-1/2 flex flex-col space-y-6">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">Step 1: Plot the 'b'</h3>
              <p className="mt-2">First, we find our starting point from the <strong>y-intercept (b)</strong>, which is <InlineMath>{'4'}</InlineMath>. We plot our first point at <InlineMath>{'(0, 4)'}</InlineMath>.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">Step 2: Use the 'm'</h3>
              <p className="mt-2">Next, we use the <strong>slope (m)</strong>, <InlineMath>{'m = -\\frac{2}{3}'}</InlineMath>, to find the second point.</p>
              <ul className="list-disc pl-5 mt-2">
                <li><strong>Rise = -2</strong>: Go <strong>DOWN 2</strong> units.</li>
                <li><strong>Run = 3</strong>: Go <strong>RIGHT 3</strong> units.</li>
              </ul>
               <p className="mt-2">This move takes us from <InlineMath>{'(0, 4)'}</InlineMath> to our second point at <InlineMath>{'(3, 2)'}</InlineMath>.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">Step 3: Connect & Finish</h3>
              <p className="mt-2">With two points plotted, the final step is to use a ruler to draw a straight line through them. Add arrows to each end to show the line continues forever.</p>
            </div>

            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 shadow-md">
              <p className="font-semibold">Great job! You have successfully graphed the line.</p>
            </div>

          </div>

          {/* --- Right Column: The Visual Walkthrough --- */}
          <div className="md:w-1/2 flex flex-col">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
                <h3 className="text-2xl font-semibold text-center mb-4">Visual Walkthrough</h3>
                <div className="space-y-4">
                  
                  {/* Step 1 Visual */}
                  <div>
                    <h4 className="font-bold">1. Plotting the Y-Intercept</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">We start by placing a point at our 'b' value on the y-axis: <InlineMath>{'(0, 4)'}</InlineMath>.</p>
                    <img src="https://i.imgur.com/vHq110r.png" alt="A graph showing the first point plotted at (0, 4)." className="rounded-lg mt-2 shadow-md border dark:border-slate-600"/>
                  </div>
                  
                  <hr className="dark:border-slate-600"/>

                  {/* Step 2 Visual */}
                  <div>
                    <h4 className="font-bold">2. Using the Slope to Move</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">From <InlineMath>{'(0, 4)'}</InlineMath>, we move DOWN 2 and RIGHT 3 to find our next point at <InlineMath>{'(3, 2)'}</InlineMath>.</p>
                    <img src="https://i.imgur.com/5r82V0U.png" alt="The graph now shows a second point at (3, 2)." className="rounded-lg mt-2 shadow-md border dark:border-slate-600"/>
                  </div>
                  
                  <hr className="dark:border-slate-600"/>

                  {/* Step 3 Visual */}
                  <div>
                    <h4 className="font-bold">3. Drawing the Final Line</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Finally, we connect the two points with a straight line and add arrows.</p>
                    <img src="https://i.imgur.com/zWzX05P.png" alt="The final graph showing a complete line." className="rounded-lg mt-2 shadow-md border dark:border-slate-600"/>
                  </div>

                </div>
              </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graphing-full-example" 
            slideTitle="Full Example: Graphing a Line" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-slope-intercept-form"
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