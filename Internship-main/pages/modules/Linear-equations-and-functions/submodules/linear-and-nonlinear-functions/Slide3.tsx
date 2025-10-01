import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearAndNonlinearFunctionsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'linear-vs-nonlinear-equations', conceptId: 'linear-vs-nonlinear-equations', conceptName: 'Identifying from an Equation', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Identifying from an Equation</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">Look for patterns in the equation's variables to know its story.</p>
        
        {/* --- Top Section: Rules & Examples --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Linear Equation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 text-center">✅ Linear Equation</h3>
            <p className="text-sm">A linear equation's variables are simple:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>`x` and `y` only have a power of 1 (no <InlineMath>{'x^2'}</InlineMath>).</li>
                <li>`x` and `y` are not multiplied together (no <InlineMath>{'xy'}</InlineMath>).</li>
                <li>`x` and `y` are not in the denominator (no <InlineMath>{'1/x'}</InlineMath>).</li>
            </ul>
            <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-semibold text-center text-xs mb-2">Examples:</p>
                <p className="font-mono text-center text-md"><InlineMath>{'y = 3x + 2'}</InlineMath></p>
                <p className="font-mono text-center text-md"><InlineMath>{'3x + 2y = 6'}</InlineMath></p>
            </div>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center text-sm">
                These equations fit the <InlineMath>{'y = mx + b'}</InlineMath> form and produce a straight line.
            </p>
          </div>

          {/* Right Column: Nonlinear Equation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 text-center">❌ Nonlinear Equation</h3>
            <p className="text-sm">An equation is nonlinear if it has complex variables:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Variables with exponents other than 1 (e.g., <InlineMath>{'x^2'}</InlineMath>).</li>
                <li>Variables multiplied together (e.g., <InlineMath>{'xy = 12'}</InlineMath>).</li>
                <li>Variables in the denominator (e.g., <InlineMath>{'y = 1/x'}</InlineMath>).</li>
                <li>Variables inside square roots (<InlineMath>{'\\sqrt{x}'}</InlineMath>) or absolute values (<InlineMath>{'|x|'}</InlineMath>).</li>
            </ul>
            <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                 <p className="font-semibold text-center text-xs mb-2">Examples:</p>
                <p className="font-mono text-center text-md"><InlineMath>{'y = x^2 - 4'}</InlineMath></p>
                <p className="font-mono text-center text-md"><InlineMath>{'y = |x|'}</InlineMath></p>
            </div>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center text-sm">
                These equations have a changing rate of change and will produce a curve or bend.
            </p>
          </div>
        </div>

        {/* --- Bottom Section: Test the Rules --- */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mt-8">
            <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4 text-center">Let's Test the Rules: See Them in Action</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Linear Test */}
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <h4 className="font-bold text-center">Testing: <InlineMath>{'y = 3x + 2'}</InlineMath></h4>
                    <p className="text-xs text-center mt-2">For every +1 change in 'x', 'y' **always** changes by +3. The rate is **constant**!</p>
                </div>
                {/* Nonlinear Test */}
                 <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <h4 className="font-bold text-center">Testing: <InlineMath>{'y = x^2 - 4'}</InlineMath></h4>
                    <p className="text-xs text-center mt-2">For every +1 change in 'x', 'y' changes by a **different amount** (+1, then +3, then +5...). The rate is **NOT constant**!</p>
                </div>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="linear-vs-nonlinear-equations" 
            slideTitle="Identifying from an Equation" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-and-nonlinear-functions"
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