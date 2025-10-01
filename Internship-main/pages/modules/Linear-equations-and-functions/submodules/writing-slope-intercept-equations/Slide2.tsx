import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function WritingSlopeInterceptSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'equation-from-intercept-and-point', conceptId: 'equation-from-intercept-and-point', conceptName: 'Equation from Y-Intercept and a Point', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Finding the Equation with the Y-Intercept and Another Point</h2>
        */} 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Method */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">The 3-Step Method</h3>
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-blue-400 bg-slate-50 dark:bg-slate-900/30">
                  <h4 className="font-semibold text-lg">Step 1: Find 'b' (The Easy Part)</h4>
                  <p className="mt-1">If you're given a point where the x-coordinate is 0, like <InlineMath>{'(0, 4)'}</InlineMath>, you have a huge head start! The y-value of that point is your 'b'.</p>
              </div>
              <div className="p-3 border-l-4 border-blue-400 bg-slate-50 dark:bg-slate-900/30">
                  <h4 className="font-semibold text-lg">Step 2: Find 'm' (The Calculation)</h4>
                  <p className="mt-1">Use the two points you have in the Slope Formula to find 'm'. This formula is just a way to calculate "Rise over Run".</p>
                  <div className="text-center my-2 p-2 bg-white dark:bg-slate-700 rounded-md">
                    <InlineMath>{'m = \\frac{y_2 - y_1}{x_2 - x_1}'}</InlineMath>
                  </div>
                   <p className="text-sm text-slate-600 dark:text-slate-400">(<InlineMath>{'(x_1, y_1)'}</InlineMath> is your first point, and <InlineMath>{'(x_2, y_2)'}</InlineMath> is your second point.)</p>
              </div>
              <div className="p-3 border-l-4 border-blue-400 bg-slate-50 dark:bg-slate-900/30">
                  <h4 className="font-semibold text-lg">Step 3: Build the Equation</h4>
                  <p className="mt-1">Put the 'm' and 'b' you found into the final formula: <InlineMath>{'y = mx + b'}</InlineMath>.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Example in Action */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Example: Putting It Into Action</h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/30 rounded-lg">
                <p className="font-semibold">Problem: Find the equation of a line that passes through the y-intercept <InlineMath>{'(0, 4)'}</InlineMath> and the point <InlineMath>{'(3, 10)'}</InlineMath>.</p>
            </div>
            <div className="mt-4 flex-grow space-y-4">
                <div>
                    <h4 className="font-bold">Step 1: Find 'b'</h4>
                    <p>We are given the y-intercept <InlineMath>{'(0, 4)'}</InlineMath>. We instantly know that <strong className="text-blue-600 dark:text-blue-400">b = 4</strong>.</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Our equation starts as <InlineMath>{'y = mx + 4'}</InlineMath>.</p>
                </div>
                <hr className="dark:border-slate-600"/>
                <div>
                    <h4 className="font-bold">Step 2: Find 'm'</h4>
                    <p>We use our two points: Point 1 <InlineMath>{'(0, 4)'}</InlineMath> and Point 2 <InlineMath>{'(3, 10)'}</InlineMath>.</p>
                    <p className="mt-2">Plug them into the formula:</p>
                    <div className="text-center mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md text-lg">
                        <InlineMath>{'m = \\frac{10 - 4}{3 - 0} = \\frac{6}{3} = 2'}</InlineMath>
                    </div>
                    <p className="mt-2">The slope is <strong className="text-blue-600 dark:text-blue-400">m = 2</strong>.</p>
                </div>
                <hr className="dark:border-slate-600"/>
                <div>
                    <h4 className="font-bold">Step 3: Build the Equation</h4>
                    <p>We combine our two clues: <InlineMath>{'m = 2'}</InlineMath> and <InlineMath>{'b = 4'}</InlineMath>.</p>
                    <div className="mt-2 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-center font-bold text-xl">
                        <InlineMath>{'y = 2x + 4'}</InlineMath>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="equation-from-intercept-and-point" 
            slideTitle="Equation from Y-Intercept and a Point" 
            moduleId="linear-equations-and-functions" 
            submoduleId="writing-slope-intercept-equations"
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