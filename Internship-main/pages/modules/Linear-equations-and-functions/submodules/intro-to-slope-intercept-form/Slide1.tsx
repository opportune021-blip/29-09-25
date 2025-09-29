import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function IntroSlopeInterceptSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'what-is-y-mx-b', conceptId: 'what-is-y-mx-b', conceptName: 'The y = mx + b Formula', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
        
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
      {/*   <h2 className="text-3xl font-bold text-center mb-6">The Slope-Intercept Formula</h2>
         */}
        {/* Main content grid - strictly two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Theory and Application */}
          <div className="flex flex-col gap-6">
            {/* The Blueprint */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col h-full">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Blueprint</h3>
              <p>The most common way to write a linear equation is in **slope-intercept form**.</p>
              <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg text-center">
                  <BlockMath>{'y = mx + b'}</BlockMath>
              </div>
              <p>This formula is a recipe for a straight line. Each part has a special meaning:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-sm flex-grow">
                  <li><InlineMath>{'y'}</InlineMath> and <InlineMath>{'x'}</InlineMath> are the coordinates of **any point** on the line.</li>
                  <li><InlineMath>{'m'}</InlineMath> is the **slope**. It tells you how steep the line is ("rise over run").</li>
                  <li><InlineMath>{'b'}</InlineMath> is the **y-intercept**. It's the point where the line crosses the vertical y-axis.</li>
              </ul>
            </div>

            {/* Graphing the Fare */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col h-full">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Graph the Fare!</h3>
              <p>We can draw any equation in <InlineMath>{'y=mx+b'}</InlineMath> form with two simple steps.</p>
              <div className="mt-4 space-y-3 text-sm flex-grow">
                  <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                      <p className="font-bold">Step 1: Begin at 'b'</p>
                      <p>Find the y-intercept (<InlineMath>{'b'}</InlineMath>) on the vertical y-axis and plot your first point there.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                      <p className="font-bold">Step 2: Move with 'm'</p>
                      <p>From your first point, use the slope (<InlineMath>{'m'}</InlineMath>) as "rise over run" to find your second point.</p>
                  </div>
                   <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                      <p className="font-bold">Step 3: Draw the Line</p>
                      <p>Connect the two points to draw the line!</p>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Column: Example and Assessment */}
          <div className="flex flex-col gap-6">
            {/* The Real-World Example */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col h-full">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Auto-Rickshaw Formula</h3>
              <p>This formula appears in real life! Think about an auto-rickshaw fare in Navi Mumbai.</p>
              <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-md text-center text-sm">
                  Total Cost = (Cost per km × Kilometers) + Starting Fare
              </div>
              <p>Let's match this to our formula using an example:</p>
              <div className="mt-3 space-y-2 text-sm flex-grow">
                  <p>➡️ <InlineMath>{'y'}</InlineMath> is the <span className="font-semibold">Total Cost</span>.</p>
                  <p>➡️ <InlineMath>{'m'}</InlineMath> is the <span className="font-semibold">Cost per km</span>, let's say <InlineMath>{'₹15'}</InlineMath>.</p>
                  <p>➡️ <InlineMath>{'x'}</InlineMath> is the number of <span className="font-semibold">Kilometers</span>.</p>
                  <p>➡️ <InlineMath>{'b'}</InlineMath> is the <span className="font-semibold">Starting Fare</span>, let's say <InlineMath>{'₹23'}</InlineMath>.</p>
              </div>
              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-center font-bold">
                  <p>The equation becomes: <InlineMath>{'y = 15x + 23'}</InlineMath></p>
              </div>
            </div>

            {/* Check Your Understanding Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Check Your Understanding</h3>
                <div className="text-sm space-y-3">
                    <p><span className="font-bold">Question 1:</span> Using the formula <InlineMath>{'y = 15x + 23'}</InlineMath>, what would be the total fare for a trip of 4 kilometers?</p>
                    <p><span className="font-bold">Question 2:</span> A taxi app has no starting fare but charges ₹20 per kilometer. What would its slope-intercept formula be?</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-y-mx-b" 
            slideTitle="The y = mx + b Formula" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intro-to-slope-intercept-form"
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