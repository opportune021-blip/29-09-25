import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function RecognizingFunctionsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'functions-from-ordered-pairs', conceptId: 'functions-from-ordered-pairs', conceptName: 'Recognizing Functions from Ordered Pairs', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Recognizing Functions from Ordered Pairs</h2>
        
        {/* The How-To Guide */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mb-8">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Your 4-Step Thought Process</h3>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Focus</strong> only on the `x`-coordinates (the first number in each pair).</li>
                <li><strong>Scan</strong> the list of `x`-values for any repeated numbers.</li>
                <li><strong>If an `x`-value is repeated</strong>, check if it's paired with different `y`-values. If so, it is NOT a function.</li>
                <li><strong>If there are no repeated `x`-values</strong> (or if a repeated `x` has the same `y`), it IS a function.</li>
            </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: IS a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">✅ IS a Function</h3>
            <p className="text-sm">Check if all the `x` values are unique.</p>
            <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-mono text-center"><InlineMath>{'\\{(1, 2), (3, 6), (4, 8), (5, 10)\\}'}</InlineMath></p>
            </div>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm">The inputs are 1, 3, 4, and 5. Since all inputs are different, this is a function.</p>
          </div>

          {/* Right Column: IS NOT a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">❌ IS NOT a Function</h3>
            <p className="text-sm">If you see the same `x` value paired with different `y` values, it's not a function.</p>
            <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-mono text-center"><InlineMath>{'\\{(2, 4), (3, 6), (2, 5)\\}'}</InlineMath></p>
            </div>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm">The input `2` is repeated and is paired with two different outputs (4 and 5). This breaks the rule.</p>
          </div>
        </div>

        {/* Deeper Understanding Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">The Connection to Graphs</h3>
                <p className="text-sm mt-2">Checking for repeated x-values is the same as doing the Vertical Line Test! The points <InlineMath>{'(2, 4)'}</InlineMath> and <InlineMath>{'(2, 5)'}</InlineMath> would lie on the same vertical line, failing the test.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                 <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">The "Tricky Case"</h3>
                 <p className="text-sm mt-2">What if the y-values are repeated? Look at this set:</p>
                 <p className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md"><InlineMath>{'\\{(-2, 4), (1, 1), (2, 4)\\}'}</InlineMath></p>
                 <p className="text-sm">The output '4' is repeated, but that's okay! The inputs (-2, 1, 2) are all unique. This IS a function.</p>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="functions-from-ordered-pairs" 
            slideTitle="Recognizing Functions from Ordered Pairs" 
            moduleId="linear-equations-and-functions" 
            submoduleId="recognizing-functions"
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