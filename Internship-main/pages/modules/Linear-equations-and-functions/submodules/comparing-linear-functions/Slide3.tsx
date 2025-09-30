import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ComparingLinearFunctionsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'comparing-y-intercepts', conceptId: 'comparing-y-intercepts', conceptName: 'Comparing y-intercepts (Initial Values)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Comparing Y-Intercepts: Who Got the Head Start?</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">While the slope tells you who is faster, the y-intercept ('b') tells you who started with more.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Theory */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">What the Y-Intercept Tells Us</h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold text-lg">It's the STARTING POINT</h4>
                  <p className="mt-1 text-sm">The y-intercept ('b') is the initial value of a function when the input ('x') is zero. Think of it as a <strong>one-time fee</strong>, an <strong>initial amount</strong>, or a <strong>head start</strong>.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold text-lg">How to Compare 'b'</h4>
                  <p className="mt-1 text-sm">This is simple! Just compare the numbers. A function with <InlineMath>{'b = 100'}</InlineMath> has a higher starting value than a function with <InlineMath>{'b = 50'}</InlineMath>.</p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-bold">Slope vs. Y-Intercept</h4>
                <p className="text-sm mt-1">Don't confuse the two! They tell different parts of the story.</p>
                <ul className="list-disc pl-5 mt-1 text-xs">
                    <li><strong>Slope (m):</strong> The rate of change (faster, steeper, charge *per* item).</li>
                    <li><strong>Y-Intercept (b):</strong> The starting value (initial fee, head start).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Real-World Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Navi Mumbai Gym Example</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              <p className="text-sm font-semibold">Rohan and Priya are comparing gym plans in Vashi, where 'm' is the number of months.</p>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Gym A (Fitness First)</h4>
                  <p className="text-center font-mono my-1"><InlineMath>{'A(m) = 1000m + 2000'}</InlineMath></p>
              </div>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Gym B (Gold's Gym)</h4>
                  <p className="text-center font-mono my-1"><InlineMath>{'B(m) = 800m + 3000'}</InlineMath></p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="font-semibold">Question 1: Who has a higher one-time joining fee?</h4>
                <p className="text-sm mt-1">This is the <strong>y-intercept ('b')</strong>. We compare 2000 and 3000.</p>
                {/* FIX: Replaced > with &gt; */}
                <p className="font-bold text-sm mt-1">Conclusion: Gym B has a higher joining fee (₹3000 &gt; ₹2000).</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="font-semibold">Question 2: Who has a higher monthly charge?</h4>
                <p className="text-sm mt-1">This is the <strong>slope ('m')</strong>. We compare 1000 and 800.</p>
                {/* FIX: Replaced > with &gt; */}
                <p className="font-bold text-sm mt-1">Conclusion: Gym A has a higher monthly charge (₹1000 &gt; ₹800).</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="comparing-y-intercepts" 
            slideTitle="Comparing y-intercepts (Initial Values)" 
            moduleId="linear-equations-and-functions" 
            submoduleId="comparing-linear-functions"
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