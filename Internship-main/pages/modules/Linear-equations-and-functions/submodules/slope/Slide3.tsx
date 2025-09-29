import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SlopeSlide3() {
    const slideInteractions: Interaction[] = [{ id: 'slope-formula', conceptId: 'slope-formula', conceptName: 'The Slope Formula', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-4">The Slope Formula: Finding Slope Without a Graph</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
            When you don't have a graph to count, the Slope Formula lets you calculate the exact slope using just the coordinates of two points.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Formula and Connection */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Connecting to Rise and Run</h3>
            <div className="space-y-3 text-sm">
                <p>The formula is a smart way to find Rise and Run with subtraction:</p>
                <div>
                    <p className="font-semibold">How to find the Rise:</p>
                    <p>The vertical change is the difference in the y-values. <InlineMath>{`\\text{Rise} = y_2 - y_1`}</InlineMath></p>
                </div>
                 <div>
                    <p className="font-semibold">How to find the Run:</p>
                    <p>The horizontal change is the difference in the x-values. <InlineMath>{`\\text{Run} = x_2 - x_1`}</InlineMath></p>
                </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">The Slope Formula</h4>
                <p className="text-center text-2xl font-bold my-2"><InlineMath>{`m = \\frac{y_2 - y_1}{x_2 - x_1}`}</InlineMath></p>
                <p className="text-xs text-center italic">This is the same as Rise over Run!</p>
            </div>
          </div>

          {/* Right Column: The Worked Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Example 1: Positive Slope</h3>
                <p className="text-sm">Find the slope between <InlineMath>(3, 4)</InlineMath> and <InlineMath>(7, 10)</InlineMath>.</p>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded p-2 mt-2 text-sm">
                    <p>1. <strong>Label:</strong> <InlineMath>{`(x_1, y_1) = (3, 4)`}</InlineMath> and <InlineMath>{`(x_2, y_2) = (7, 10)`}</InlineMath>.</p>
                    <p>2. <strong>Substitute:</strong> <InlineMath>{`m = \\frac{10 - 4}{7 - 3}`}</InlineMath></p>
                    {/* FIX: Changed single quotes to backticks */}
                    <p>3. <strong>Calculate:</strong> <InlineMath>{`m = \\frac{6}{4}`}</InlineMath>, which simplifies to <InlineMath>{`\\frac{3}{2}`}</InlineMath>.</p>
                </div>
            </div>
            <hr className="border-slate-300 dark:border-slate-600"/>
            <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Example 2: Negative Slope</h3>
                <p className="text-sm">Find the slope between <InlineMath>(2, 8)</InlineMath> and <InlineMath>(5, 2)</InlineMath>.</p>
                 <div className="bg-slate-50 dark:bg-slate-900/50 rounded p-2 mt-2 text-sm">
                    <p>1. <strong>Label:</strong> <InlineMath>{`(x_1, y_1) = (2, 8)`}</InlineMath> and <InlineMath>{`(x_2, y_2) = (5, 2)`}</InlineMath>.</p>
                    <p>2. <strong>Substitute:</strong> <InlineMath>{`m = \\frac{2 - 8}{5 - 2}`}</InlineMath></p>
                    {/* FIX: Changed single quotes to backticks */}
                    <p>3. <strong>Calculate:</strong> <InlineMath>{`m = \\frac{-6}{3}`}</InlineMath>, which simplifies to <InlineMath>{`-2`}</InlineMath>.</p>
                </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-blue-100 dark:bg-blue-900/40 rounded-xl p-4 mt-6 border border-blue-300 dark:border-blue-700">
            <h4 className="text-lg font-semibold text-center text-blue-800 dark:text-blue-300">Key Points to Remember</h4>
            <ul className="list-disc pl-5 mt-2 text-sm">
                <li>The Slope Formula is essential when you don't have a graph.</li>
                <li><strong>The most important tip:</strong> Always label your points <InlineMath>{`(x_1, y_1)`}</InlineMath> and <InlineMath>{`(x_2, y_2)`}</InlineMath> before you start to avoid mistakes!</li>
            </ul>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="slope-formula" 
            slideTitle="The Slope Formula" 
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