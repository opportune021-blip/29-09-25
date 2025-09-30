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
        <h2 className="text-3xl font-bold text-center mb-6">What is a Function? Your Very Own Rule Machine!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Core Concepts */}
          <div className="flex flex-col space-y-8">
            {/* The Main Idea */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">The Vending Machine Analogy</h3>
              <p className="mt-2">Imagine a vending machine. You press a button for Lays (the <strong>input</strong>), and you get a packet of Lays (the <strong>output</strong>). A function is just like a perfect vending machine: it's a special rule that takes an input and gives you back a single, predictable output.</p>
            </div>
            
            {/* The Golden Rule */}
            <div className="bg-blue-100 dark:bg-blue-900/50 rounded-xl p-6 border-l-4 border-blue-500 shadow-md">
              <h3 className="text-xl font-semibold">The Golden Rule of Functions</h3>
              <p className="mt-2 text-lg">For each one input, there can only be **ONE** output.</p>
              <p className="mt-2 text-sm">If a machine is "broken" and gives different outputs for the same input, it is **NOT** a function.</p>
            </div>

            {/* Functions in Math */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Functions in Math</h3>
              <p className="mt-2">In math, the "rule" is usually an equation like <InlineMath>{'y = 2x + 1'}</InlineMath>.</p>
              <ul className="list-disc pl-5 mt-2">
                  <li>The <strong>input</strong> is the value you choose for <InlineMath>{'x'}</InlineMath>.</li>
                  <li>The <strong>rule</strong> is "multiply the input by 2 and then add 1."</li>
                  <li>The <strong>output</strong> is the final value you get for <InlineMath>{'y'}</InlineMath>.</li>
              </ul>
              <p className="mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">If you input <InlineMath>{'x=3'}</InlineMath>, you will always get the output <InlineMath>{'y=7'}</InlineMath>.</p>
            </div>
          </div>


          {/* Right Column: How to Spot a Function */}
          <div className="flex flex-col space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">How to Spot a Function</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg">Method 1: From a List of Points or a Table</h4>
                  <p className="mt-1">Look at the x-values (inputs). If any x-value is repeated with a **different** y-value, it's NOT a function.</p>
                  <div className="grid grid-cols-1 gap-4 mt-2">
                    {/* Removed green background */}
                    <div className="p-3 border border-slate-300 dark:border-slate-600 rounded-lg">
                      <p className="font-bold text-green-700 dark:text-green-400">✅ IS a function:</p>
                      <p><InlineMath>{'\\{(1, 5), (2, 10), (3, 15)\\}'}</InlineMath></p>
                      <p className="text-sm">All x-values are unique.</p>
                    </div>
                    {/* Removed red background */}
                    <div className="p-3 border border-slate-300 dark:border-slate-600 rounded-lg">
                      <p className="font-bold text-red-600 dark:text-red-400">❌ IS NOT a function:</p>
                      <p><InlineMath>{'\\{(1, 8), (2, 4), (1, 6)\\}'}</InlineMath></p>
                      <p className="text-sm">The input x=1 has two different outputs (8 and 6).</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Method 2: From a Graph (The Vertical Line Test)</h4>
                  <p className="mt-1">Imagine sliding a vertical ruler across the graph. If it ever touches the graph in more than one place at the same time, it fails the test and is NOT a function.</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-a-function" 
            slideTitle="What is a Function?" 
            moduleId="linear-equations-and-functions" 
            submoduleId="functions"
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