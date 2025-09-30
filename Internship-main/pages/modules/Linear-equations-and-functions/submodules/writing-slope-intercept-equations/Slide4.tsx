import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function WritingSlopeInterceptSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'equation-from-two-points', conceptId: 'equation-from-two-points', conceptName: 'Writing an Equation from Two Points', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Advanced Methods: Finding the Equation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: From Two Points */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Method 3: From Two Points</h3>
            <p className="mb-4">This is the master method! It always works, even if you only have two random points.</p>
            
            <div className="space-y-3 flex-grow flex flex-col">
              <p><strong>Step 1: Find the Slope ('m'):</strong> Use the two points in the Slope Formula.</p>
               <div className="text-center my-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <InlineMath>{'m = \\frac{y_2 - y_1}{x_2 - x_1}'}</InlineMath>
                </div>
              <p><strong>Step 2: Find the Y-Intercept ('b'):</strong> Pick one of the points, plug it and the slope 'm' into <InlineMath>{'y = mx + b'}</InlineMath>, and solve for 'b'.</p>
              <p><strong>Step 3: Build the Equation:</strong> Combine your new 'm' and 'b'.</p>
            
              <hr className="my-4 dark:border-slate-600"/>

              <h4 className="font-semibold text-lg mb-2">Example:</h4>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md flex-grow">
                  <p className="font-semibold">Problem: Find the equation for a line that passes through (2, 3) and (4, 7).</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-1">
                    <li><strong>Find 'm':</strong> <InlineMath>{'m = \\frac{7-3}{4-2} = \\frac{4}{2} = 2'}</InlineMath>.</li>
                    <li><strong>Find 'b':</strong> Use point (2, 3) and m=2.
                      <div className="pl-4">
                        <InlineMath>{'y = mx + b'}</InlineMath> <br/>
                        <InlineMath>{'3 = (2)(2) + b'}</InlineMath> <br/>
                        <InlineMath>{'3 = 4 + b \\implies b = -1'}</InlineMath>
                      </div>
                    </li>
                    <li className="font-bold">Equation: <InlineMath>{'y = 2x - 1'}</InlineMath></li>
                  </ol>
              </div>
            </div>
          </div>

          {/* Right Column: Practice Problems */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Practice Problems</h3>
            <p className="mb-4">Let's test your skills. The first step is always to identify your clues.</p>
            
            <div className="space-y-4 flex-grow flex flex-col">
              
              {/* Problem 1 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-600">
                  <h4 className="font-semibold">Problem 1: The Word Problem</h4>
                  <p className="text-sm mt-1">A gym in Navi Mumbai charges a joining fee plus a monthly rate. It costs ₹4500 for 3 months and ₹6500 for 5 months. Find the equation.</p>
                  <p className="text-sm mt-2"><strong>Solution:</strong> This is a two-point problem: (3, 4500) and (5, 6500). The slope (monthly fee) is <InlineMath>{'m=1000'}</InlineMath>. The y-intercept (joining fee) is <InlineMath>{'b=1500'}</InlineMath>.</p>
                  <p className="font-bold mt-1 text-center bg-blue-100 dark:bg-blue-900/50 rounded-md p-1">Equation: <InlineMath>{'y = 1000x + 1500'}</InlineMath></p>
              </div>

              {/* Problem 2 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-600">
                  <h4 className="font-semibold">Problem 2: The Horizontal Line</h4>
                  <p className="text-sm mt-1">A line passes through (-2, 8) and (5, 8). Find the equation.</p>
                  <p className="text-sm mt-2"><strong>Solution:</strong> The y-value is the same! This is a horizontal line with a slope of 0.</p>
                  <p className="font-bold mt-1 text-center bg-blue-100 dark:bg-blue-900/50 rounded-md p-1">Equation: <InlineMath>{'y = 8'}</InlineMath></p>
              </div>
              
              {/* Problem 3 */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-600">
                  <h4 className="font-semibold">Problem 3: Given Slope and a Point</h4>
                  <p className="text-sm mt-1">A line has a slope of -4 and passes through (1, -3). Find the equation.</p>
                  <p className="text-sm mt-2"><strong>Solution:</strong> We are given <InlineMath>{'m=-4'}</InlineMath>. Plug the point into <InlineMath>{'y = -4x + b'}</InlineMath> to solve for 'b'. <InlineMath>{'-3 = -4(1) + b \\implies b=1'}</InlineMath>.</p>
                  <p className="font-bold mt-1 text-center bg-blue-100 dark:bg-blue-900/50 rounded-md p-1">Equation: <InlineMath>{'y = -4x + 1'}</InlineMath></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="equation-from-two-points-and-problems" 
            slideTitle="Advanced Methods and Problems" 
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