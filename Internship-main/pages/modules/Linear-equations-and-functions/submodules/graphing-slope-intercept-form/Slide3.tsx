import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingSlopeInterceptSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'using-rise-over-run', conceptId: 'using-rise-over-run', conceptName: 'Step 2: Using Slope "Rise over Run"', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Step 2: Using the Slope (m) to Move</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: How-To */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">'m' is your treasure map</h3>
            <p className="mb-4">With your starting point set, use the slope ('m') as a set of instructions to find the next point on the line.</p>
            <div className="space-y-3">
                <p>Let's use the example:</p>
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md text-center font-bold text-lg"><InlineMath>{'y = \\frac{2}{3}x - 4'}</InlineMath></div>
                <p><strong>1. Start at 'b':</strong> Your first point is plotted at the y-intercept, <InlineMath>{'(0, -4)'}</InlineMath>.</p>
                <p><strong>2. Identify 'm':</strong> The slope is <InlineMath>{'m = \\frac{2}{3}'}</InlineMath>.</p>
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-md">
                    <p><strong>Rise = 2</strong> (top number): From <InlineMath>{'(0,-4)'}</InlineMath>, move **UP 2 units**.</p>
                    <p><strong>Run = 3</strong> (bottom number): From there, move **RIGHT 3 units**.</p>
                </div>
                <p><strong>3. Plot New Point:</strong> This move lands you on your second point: <InlineMath>{'(3, -2)'}</InlineMath>.</p>
            </div>
          </div>

          {/* Right Column: Visual and Key Questions */}
          <div className="flex flex-col gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">Visualizing the Move</h3>
               <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                  <img src="https://i.imgur.com/q1oXfQf.png" alt="Graph showing the point (0, -4) and arrows indicating a rise of 2 and a run of 3 to the new point (3, -2)." className="rounded-md" />
              </div>
              <p className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md text-center">Start at `b`, then Rise and Run. Now you have two points to connect!</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">Important Questions</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold">What if the slope is a whole number?</h4>
                        <p>For an equation like <InlineMath>{'y=5x+1'}</InlineMath>, write the slope <InlineMath>{'m=5'}</InlineMath> as a fraction: <InlineMath>{'m=\\frac{5}{1}'}</InlineMath>. This means you Rise 5 and Run 1.</p>
                    </div>
                    <div>
                        <h4 className="font-bold">What if the slope is negative?</h4>
                        <p>For <InlineMath>{'y=-\\frac{4}{3}x+2'}</InlineMath>, give the negative to the Rise: <InlineMath>{'m=\\frac{-4}{3}'}</InlineMath>. This means you go **DOWN 4** and Right 3.</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="using-rise-over-run" 
            slideTitle="Step 2: Using Slope 'Rise over Run'" 
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