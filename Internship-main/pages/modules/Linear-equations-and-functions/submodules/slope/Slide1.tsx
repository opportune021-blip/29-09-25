import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SlopeSlide1_Introduction() {
    const slideInteractions: Interaction[] = [{ id: 'what-is-slope', conceptId: 'what-is-slope', conceptName: 'What is Slope?', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">What is Slope? Measuring Steepness</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          {/* Left Column: The "What" and "How" */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The Concept of Steepness</h3>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-lg p-4">
                <p className="mt-2 text-sm">
                    Imagine cycling in Navi Mumbai. Going on a flat road like Palm Beach Road is easy. Going up a flyover ramp is harder. That difference is <strong>steepness</strong>. In math, we call this <strong>slope</strong>.
                </p>
            </div>

            <div className="mt-4">
                <p className="text-sm">Slope is a <strong>number</strong> that measures exactly how steep a line is. A steeper line has a <strong>bigger</strong> slope number.</p>
            </div>
            
            <hr className="my-4 dark:border-slate-600"/>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">How Do We Measure Slope?</h3>
            <p className="text-sm">We use a formula called "Rise over Run."</p>
            <ul className="list-disc pl-5 my-2 text-xs space-y-1">
                <li><strong>Rise:</strong> How much the line goes **UP** (+) or **DOWN** (-).</li>
                <li><strong>Run:</strong> How much the line goes to the **RIGHT**.</li>
            </ul>
             <p className="text-center font-bold text-lg p-2 bg-slate-100 dark:bg-slate-700 rounded-md"><InlineMath>{'m = \\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath></p>
          </div>

          {/* Right Column: The "Types" and "Connection" */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The Four Basic Types of Slope</h3>
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-2 flex flex-col justify-center">
                  <p className="font-bold">Positive Slope</p>
                  <div className="text-2xl my-1">↗</div>
                  <p className="text-xs italic">Uphill (e.g., <InlineMath>{'m=2, m=\\frac{1}{3}'}</InlineMath>)</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-2 flex flex-col justify-center">
                  <p className="font-bold">Negative Slope</p>
                  <div className="text-2xl my-1">↘</div>
                  <p className="text-xs italic">Downhill (e.g., <InlineMath>{'m=-3, m=-\\frac{1}{2}'}</InlineMath>)</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-2 flex flex-col justify-center">
                  <p className="font-bold">Zero Slope</p>
                  <div className="text-2xl my-1">→</div>
                  <p className="text-xs italic">Perfectly Flat (e.g., <InlineMath>{'m=0'}</InlineMath>)</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-2 flex flex-col justify-center">
                  <p className="font-bold">Undefined Slope</p>
                  <div className="text-2xl my-1">↑</div>
                  <p className="text-xs italic">Perfectly Vertical</p>
              </div>
            </div>

            <hr className="my-4 dark:border-slate-600"/>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Where Does Slope Fit In?</h3>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-sm">
                <p>Remember the equation <InlineMath>{'y = mx + b'}</InlineMath>? The **'m'** in that equation is the **slope**! It's the number that tells you the line's steepness and direction.</p>
                <p className="mt-2 text-xs italic">For example, in <InlineMath>{'y = 3x + 5'}</InlineMath>, the slope is <InlineMath>{'m = 3'}</InlineMath>, which means it's a fairly steep, uphill line.</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-slope" 
            slideTitle="What is Slope?" 
            moduleId="linear-equations-and-functions" 
            submoduleId="slope"
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