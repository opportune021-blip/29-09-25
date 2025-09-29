import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SlopeSlide4() {
    const slideInteractions: Interaction[] = [{ id: 'special-slope-cases', conceptId: 'special-slope-cases', conceptName: 'Special Cases: Horizontal and Vertical Lines', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col overflow-y-auto">
       {/*  <h2 className="text-3xl font-bold text-center mb-4">Special Slopes: Horizontal & Vertical Lines</h2>
        */} <p className="text-center text-slate-600 dark:text-slate-300 mb-6">Let's explore the two special types of lines. We will use "Rise over Run" to see why their slopes are unique.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Horizontal Lines */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Horizontal Lines (The Flat Road) →</h3>
            <p className="text-sm">A horizontal line is perfectly flat. It doesn't go up or down, which means it has **zero rise**.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 mt-4 rounded-md font-bold text-center">
                <p>Calculation:</p>
                <InlineMath>{'m = \\frac{\\text{Rise}}{\\text{Run}} = \\frac{0}{\\text{any number}} = 0'}</InlineMath>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-auto">
                <p className="font-semibold">Golden Rule:</p>
                <p className="mt-1">The slope of ANY horizontal line is always <strong>0</strong>.</p>
                <p className="text-xs mt-2"><strong>Equation Tip:</strong> Its equation is always <InlineMath>{'y = a \\, number'}</InlineMath> (e.g., <InlineMath>{'y = 3'}</InlineMath>).</p>
            </div>
          </div>

          {/* Right Column: Vertical Lines */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Vertical Lines (The Wall) ↑</h3>
            <p className="text-sm">A vertical line goes straight up. It doesn't move left or right, which means it has **zero run**.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 mt-4 rounded-md font-bold text-center">
                <p>Calculation:</p>
                <InlineMath>{'m = \\frac{\\text{Rise}}{\\text{Run}} = \\frac{\\text{any number}}{0}'}</InlineMath>
            </div>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-auto">
                <p className="font-semibold">Golden Rule:</p>
                <p className="mt-1">You can't divide by zero! The slope of ANY vertical line is <strong>Undefined</strong>.</p>
                <p className="text-xs mt-2"><strong>Equation Tip:</strong> Its equation is always <InlineMath>{'x = a \\, number'}</InlineMath> (e.g., <InlineMath>{'x = 5'}</InlineMath>).</p>
            </div>
          </div>
        </div>

        {/* Summary Table Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mt-6">
            <h3 className="text-xl font-semibold text-center text-blue-600 dark:text-blue-400 mb-3">Summary for Quick Revision</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th className="p-2 border border-slate-300 dark:border-slate-600">Feature</th>
                            <th className="p-2 border border-slate-300 dark:border-slate-600">Horizontal Line</th>
                            <th className="p-2 border border-slate-300 dark:border-slate-600">Vertical Line</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">Appearance</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">Perfectly Flat</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">Straight Up & Down</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">Rise</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">Always 0</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">Some number</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">Run</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">Some number</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600">Always 0</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">Slope (m)</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-bold">0</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-bold">Undefined</td>
                        </tr>
                        <tr>
                            <td className="p-2 border border-slate-300 dark:border-slate-600 font-semibold">Equation Type</td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y = c'}</InlineMath></td>
                            <td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'x = c'}</InlineMath></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="special-slope-cases" 
            slideTitle="Special Cases: Horizontal and Vertical Lines" 
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