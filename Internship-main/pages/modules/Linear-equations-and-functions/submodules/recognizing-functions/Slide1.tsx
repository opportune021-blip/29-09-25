import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function RecognizingFunctionsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'the-function-rule-recap', conceptId: 'the-function-rule-recap', conceptName: 'The Core Rule of a Function', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">The Core Rule of a Function</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">The One Rule to Remember</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: Understanding the Rule */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-center">
                <p className="font-bold text-lg">For a relationship to be a **function**, every **input** must have **exactly one output**.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Analogy 1: The Vending Machine</h3>
                <p className="text-sm mt-2">Think of a vending machine at a bus stand in Brahmapuri. You press a button code (input) and get a specific product (output).</p>
                <ul className="list-disc pl-5 mt-2 text-xs">
                    <li>**Why it's a function:** Pressing "B4" always gets you Parle-G. One input, one output.</li>
                    <li>**What breaks the rule:** If "B4" sometimes gave you Parle-G and sometimes gave you chips, it would be "broken" and not a function.</li>
                </ul>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Analogy 2: The Birthday Rule</h3>
                <p className="text-sm mt-2">Think of a person as an input and their birthday as an output.</p>
                <ul className="list-disc pl-5 mt-2 text-xs">
                    <li>**Why it's a function:** Every person has only one birthday.</li>
                    <li>**What's OK:** It's fine for multiple people (inputs) to share the same birthday (output). This is still a function.</li>
                </ul>
            </div>
          </div>

          {/* Right Column: Seeing the Rule in Math */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 text-center">How the Rule Looks in Math</h3>
            <div>
                <h4 className="font-semibold text-lg">1. With Mapping Diagrams</h4>
                <p className="text-sm mt-1">These visually map inputs to outputs.</p>
                <div className="grid grid-cols-2 gap-4 mt-2 text-center text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-bold">✅ IS a Function</p>
                        <p className="mt-1">Each input has only one arrow coming from it.</p>
                    </div>
                     <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-bold">❌ IS NOT a Function</p>
                        <p className="mt-1">An input has two or more arrows coming from it.</p>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-lg">2. With Sets of Points (x, y)</h4>
                <p className="text-sm mt-1">Check for repeated x-values (inputs).</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-bold">✅ IS a Function</p>
                        <p className="font-mono mt-1"><InlineMath>{'\\{(1,5), (2,10), (3,15)\\}'}</InlineMath></p>
                        <p className="mt-1">The x-values (1, 2, 3) are all different.</p>
                    </div>
                     <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-bold">❌ IS NOT a Function</p>
                        <p className="font-mono mt-1"><InlineMath>{'\\{(1,5), (2,10), (1,20)\\}'}</InlineMath></p>
                        <p className="mt-1">The x-value `1` is repeated with two different y-values (5 and 20).</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="the-function-rule-recap" 
            slideTitle="The Core Rule of a Function" 
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