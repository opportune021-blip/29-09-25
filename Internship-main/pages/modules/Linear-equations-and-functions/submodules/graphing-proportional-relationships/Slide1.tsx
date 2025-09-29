import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingProportionalSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'what-is-proportional', conceptId: 'what-is-proportional', conceptName: 'What is a Proportional Relationship?', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
{/*         <h2 className="text-3xl font-bold text-center mb-6">What is a Proportional Relationship?</h2>
 */}        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Concept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">What Does "Proportional" Mean? 🤔</h3>
            <p>Two quantities are proportional if they always have the same ratio or rate. Think of ordering pizza:</p>
            <ul className="list-disc pl-5 text-base space-y-2 mt-3">
                <li>1 pizza costs ₹250. (Ratio: 250/1 = 250)</li>
                <li>2 pizzas cost ₹500. (Ratio: 500/2 = 250)</li>
                <li>3 pizzas cost ₹750. (Ratio: 750/3 = 250)</li>
            </ul>
            <p className="mt-3">The ratio is always 250, so the cost is proportional to the number of pizzas.</p>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">The Secret Formula</h4>
                <p className="text-center text-2xl font-bold my-2"><InlineMath>{'y = kx'}</InlineMath></p>
                <ul className="text-sm space-y-1">
                    <li><InlineMath>{'y'}</InlineMath> is the dependent variable (e.g., total cost).</li>
                    <li><InlineMath>{'x'}</InlineMath> is the independent variable (e.g., number of pizzas).</li>
                    <li><InlineMath>{'k'}</InlineMath> is the constant of proportionality (the "magic number" that connects them, like the cost per pizza).</li>
                </ul>
            </div>
          </div>

          {/* Right Column: The Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Finding the Constant of Proportionality (k) ⚙️</h3>
            <p className="text-base italic mb-4">Problem: A train travels at a constant speed. It covers 300 kilometers in 3 hours. Find the constant of proportionality and write the equation.</p>
            <div className="space-y-4 flex-grow flex flex-col justify-around">
                <div>
                    <h4 className="text-lg font-semibold">Step 1: Identify 'x' and 'y'</h4>
                    <p>The distance traveled (<InlineMath>{'y'}</InlineMath>) depends on the time (<InlineMath>{'x'}</InlineMath>). So, <InlineMath>{'y = 300'}</InlineMath> and <InlineMath>{'x = 3'}</InlineMath>.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 2: Set Up the Formula</h4>
                    <p>Substitute the values into <InlineMath>{'y = kx'}</InlineMath>.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'300 = k \\cdot 3'}</InlineMath></div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 3: Solve for 'k'</h4>
                    <p>Divide both sides by 3 to get 'k' alone.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'k = \\frac{300}{3} = 100'}</InlineMath></div>
                </div>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-center">
                    <h4 className="font-bold">The Final Equation</h4>
                    <p>The equation for this relationship is <InlineMath>{'y = 100x'}</InlineMath>.</p>
                    <p className="text-xs mt-1">(The constant, 100, is the speed in kilometers per hour!)</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-proportional" 
            slideTitle="What is a Proportional Relationship?" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-proportional-relationships"
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