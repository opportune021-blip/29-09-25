import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function WritingSlopeInterceptSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'equation-from-graph-vs-point', conceptId: 'equation-from-graph-vs-point', conceptName: 'Finding an Equation: Two Methods', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Finding the Equation: Two Common Methods</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: From a Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Method 1: From a Graph</h3>
            <p className="mb-4">This is the "graph detective" method. You use the picture to find the clues.</p>
            
            <div className="space-y-3">
              <p><strong>Step 1: Find 'b' (Y-Intercept):</strong> Look where the line crosses the y-axis.</p>
              <p><strong>Step 2: Find 'm' (Slope):</strong> Pick two perfect points. Count the <InlineMath>{'\\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath>.</p>
              <p><strong>Step 3: Build the Equation:</strong> Combine 'm' and 'b' into <InlineMath>{'y = mx + b'}</InlineMath>.</p>
            </div>

            <hr className="my-4 dark:border-slate-600"/>

            <h4 className="font-semibold text-lg mb-2">Example:</h4>
            {/* Removed the img tag and its containing div */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md space-y-1">
              <p className="font-semibold">Consider a line that crosses the y-axis at +3, and passes through (4, 0).</p>
              <p><strong>Find 'b':</strong> The line crosses at +3. So, <InlineMath>{'b = 3'}</InlineMath>.</p>
              <p><strong>Find 'm':</strong> From <InlineMath>{'(0, 3)'}</InlineMath> to <InlineMath>{'(4, 0)'}</InlineMath>, we go DOWN 3 (Rise = -3) and RIGHT 4 (Run = 4). So, <InlineMath>{'m = -\\frac{3}{4}'}</InlineMath>.</p>
              <p className="font-bold">Equation: <InlineMath>{'y = -\\frac{3}{4}x + 3'}</InlineMath></p>
            </div>
          </div>

          {/* Right Column: From Slope and a Point */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Method 2: From Slope & a Point</h3>
            <p className="mb-4">This is a purely algebraic method. You are given 'm' and must find 'b'.</p>
            
            <div className="space-y-3">
              <p><strong>Step 1: Start with <InlineMath>{'y = mx + b'}</InlineMath>.</strong> You will have values for 'm', 'x', and 'y'.</p>
              <p><strong>Step 2: Substitute (Plug In):</strong> Put the slope in for 'm' and the point's coordinates in for 'x' and 'y'.</p>
              <p><strong>Step 3: Solve for 'b':</strong> Use algebra to get 'b' by itself.</p>
              <p><strong>Step 4: Build the Final Equation:</strong> Use the original 'm' and the 'b' you just found.</p>
            </div>
            
            <hr className="my-4 dark:border-slate-600"/>

            <h4 className="font-semibold text-lg mb-2">Example:</h4>
             <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                <p className="font-semibold">Problem: Slope = 3, passes through point (2, 5).</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Start with: <InlineMath>{'y = mx + b'}</InlineMath></li>
                  <li>Substitute: <InlineMath>{'5 = (3)(2) + b'}</InlineMath></li>
                  <li>Solve: <InlineMath>{'5 = 6 + b'}</InlineMath> <br/> <InlineMath>{'\\implies -1 = b'}</InlineMath>.</li>
                  <li className="font-bold">Final Equation: <InlineMath>{'y = 3x - 1'}</InlineMath></li>
                </ol>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="equation-finding-methods" 
            slideTitle="Finding an Equation: Two Methods" 
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