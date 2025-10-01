import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ConstructingLinearModelsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'identifying-variables', conceptId: 'identifying-variables', conceptName: 'Identifying Variables (x and y)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Identifying Variables (x and y)</h2>
        */} <div className="p-4 bg-white dark:bg-slate-800 rounded-lg mb-8 shadow-md border border-slate-300 dark:border-slate-700">
            <p className="font-bold text-center">Scenario: "A water tank starts with 50 litres and is filled at a rate of 10 litres per minute."</p>
        </div>
        
        {/* --- Part 1: Identifying Variables --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Dependent Variable (y) */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">What are we trying to find? (The 'y')</h3>
            <p className="text-sm">The dependent variable (y) is the final result or total amount that you want to calculate.</p>
            <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <strong>Ask yourself:</strong> "What is the main outcome?"
            </div>
            <p className="mt-auto p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                In our scenario, the main outcome is the Total Water in the tank.
                <br/>So, <InlineMath>{'y = \\text{Total Water}'}</InlineMath>.
            </p>
          </div>

          {/* Right Column: Independent Variable (x) */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">What does it depend on? (The 'x')</h3>
            <p className="text-sm">The independent variable (x) is the factor that changes, which causes the final result to change.</p>
            <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <strong>Ask yourself:</strong> "What is the changing factor?"
            </div>
            <p className="mt-auto p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                The total water depends on the number of minutes the tap is open.
                <br/>So, <InlineMath>{'x = \\text{Time in minutes}'}</InlineMath>.
            </p>
          </div>
        </div>

        {/* --- Part 2: Putting It All Together --- */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mt-8">
            <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 text-center mb-4">Putting It All Together</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side: Building the Model */}
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <h4 className="font-bold">1. Build the Full Equation</h4>
                    <p className="text-sm mt-2">Now that we know 'x' and 'y', we find 'm' and 'b' from the story:</p>
                    <ul className="list-disc pl-5 mt-1 text-xs">
                        <li><strong>Rate of Change (m):</strong> The rate is "10 litres per minute". So, <InlineMath>{'m=10'}</InlineMath>.</li>
                        <li><strong>Initial Value (b):</strong> The tank "starts with 50 litres". So, <InlineMath>{'b=50'}</InlineMath>.</li>
                    </ul>
                    <p className="font-bold mt-2 text-center bg-blue-100 dark:bg-blue-900/50 rounded-md p-2">Equation: <InlineMath>{'y = 10x + 50'}</InlineMath></p>
                    <p className="text-sm mt-2"><strong>On a Graph:</strong> The x-axis would be 'Time' and the y-axis would be 'Total Water'.</p>
                </div>
                 {/* Right side: Practice */}
                 <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <h4 className="font-bold">2. Practice Scenario: Food Delivery</h4>
                    <p className="text-sm mt-2">"It's Wednesday lunchtime in Navi Mumbai. The total cost of a food delivery from a restaurant depends on the distance it has to travel."</p>
                    <p className="text-xs mt-2"><strong>What is the main outcome? (The 'y')</strong><br/>Answer: The total cost of the delivery.</p>
                    <p className="text-xs mt-1"><strong>What does it depend on? (The 'x')</strong><br/>Answer: The distance in kilometers.</p>
                </div>
            </div>
        </div>

      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="identifying-variables" 
            slideTitle="Identifying Variables (x and y)" 
            moduleId="linear-equations-and-functions" 
            submoduleId="constructing-linear-models"
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