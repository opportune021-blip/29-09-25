import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FunctionsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'what-is-a-function', conceptId: 'what-is-a-function', conceptName: 'What is a Function?', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-y-auto">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">What is a Function? The Core Rule</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: Understanding the Rule */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-center">
                <p className="font-bold text-lg">For a relationship to be a <strong>function</strong>, every <strong>input</strong> must have <strong>exactly one output</strong>.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Analogy 1: The Vending Machine</h3>
                <p className="text-sm mt-2">A vending machine is a function because one input (button code) gives one output (snack).</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Analogy 2: The Birthday Rule</h3>
                <p className="text-sm mt-2">People and their birthdays form a function because one person (input) has only one birthday (output).</p>
            </div>
            {/* --- EXTRA CONTENT ADDED HERE --- */}
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg space-y-3">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">Connections & Vocabulary</h3>
                <div>
                  <h4 className="font-bold">Connection to Linear Equations</h4>
                  <p className="text-xs mt-1">An equation like <InlineMath>{'y = 2x + 1'}</InlineMath> is a perfect function. Any 'x' you input gives you only one possible 'y' output.</p>
                </div>
                <div>
                  <h4 className="font-bold">Official Vocabulary</h4>
                  <ul className="list-disc pl-5 mt-1 text-xs">
                    <li><strong>Domain:</strong> The set of all possible inputs (all the 'x' values).</li>
                    <li><strong>Range:</strong> The set of all possible outputs (all the 'y' values).</li>
                  </ul>
                </div>
            </div>
          </div>

          {/* Right Column: Seeing the Rule in Math */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 text-center">How the Rule Looks in Math</h3>
            <div>
                <h4 className="font-semibold text-lg">1. With Mapping Diagrams</h4>
                <p className="text-sm mt-1">Visually maps inputs to outputs.</p>
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
                 <div className="space-y-2 mt-2 text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-bold">✅ IS a Function:</p>
                        <p className="font-mono mt-1"><InlineMath>{'\\{(1,5), (2,10), (3,15)\\}'}</InlineMath></p>
                        <p className="mt-1">The x-values (1, 2, 3) are all different.</p>
                    </div>
                     <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-bold">❌ IS NOT a Function:</p>
                        <p className="font-mono mt-1"><InlineMath>{'\\{(1,5), (2,10), (1,20)\\}'}</InlineMath></p>
                        <p className="mt-1">The x-value `1` is repeated with two different y-values (5 and 20).</p>
                    </div>
                </div>
            </div>
             <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                 <h4 className="font-semibold text-center">Quick Check!</h4>
                 <p className="text-xs mt-1">Which of these is NOT a function?<br/>A) <InlineMath>{'\\{(1,2), (2,4), (3,4)\\}'}</InlineMath><br/>B) <InlineMath>{'\\{(5,1), (6,2), (5,3)\\}'}</InlineMath></p>
                 <p className="text-xs mt-1"><em>Answer: Set B, because the input 5 has two different outputs.</em></p>
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