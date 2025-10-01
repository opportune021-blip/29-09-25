import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function RecognizingFunctionsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'functions-from-tables', conceptId: 'functions-from-tables', conceptName: 'Recognizing Functions from Tables', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Recognizing Functions from Tables</h2>
        
        {/* The How-To Guide */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mb-8">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Your 4-Step Thought Process</h3>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Focus</strong> only on the <strong>'x' column</strong> (the inputs).</li>
                <li><strong>Scan</strong> the column for any repeated numbers.</li>
                <li>If you find a repeated 'x', look at its corresponding 'y' values. If the 'y' values are <strong>different</strong>, it is <strong>NOT a function</strong>.</li>
                <li>If there are no repeated 'x' values, it <strong>IS a function</strong>.</li>
            </ol>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: IS a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">✅ IS a Function</h3>
            <p className="text-sm"><strong>Scenario:</strong> The cost (`y`) for a number of tickets (`x`) at an amusement park.</p>
            <table className="w-full my-3 border text-center">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-2'>x (Input)</th><th className='p-2'>y (Output)</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-2'>1</td><td className='p-2'>5</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>2</td><td className='p-2'>10</td></tr>
                    <tr><td className='border-r p-2'>3</td><td className='p-2'>15</td></tr>
                </tbody>
            </table>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm">Each input (1, 2, 3) is unique. This makes sense - buying 2 tickets can only have one possible price. This is a function.</p>
          </div>

          {/* Right Column: IS NOT a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">❌ IS NOT a Function</h3>
            <p className="text-sm"><strong>Scenario:</strong> A table claiming to show a student's test score (`y`) based on hours studied (`x`).</p>
            <table className="w-full my-3 border text-center">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-2'>x (Input)</th><th className='p-2'>y (Output)</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-2'>1</td><td className='p-2'>4</td></tr>
                    <tr className="bg-slate-200 dark:bg-slate-600"><td className='border-r p-2 font-bold'>2</td><td className='p-2 font-bold'>8</td></tr>
                    <tr className="bg-slate-200 dark:bg-slate-600"><td className='border-r p-2 font-bold'>2</td><td className='p-2 font-bold'>9</td></tr>
                    <tr><td className='border-r p-2'>3</td><td className='p-2'>12</td></tr>
                </tbody>
            </table>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm">The input `2` is repeated with different outputs (8 and 9). This is impossible for a single test. This breaks the rule.</p>
          </div>
        </div>

        {/* Tricky Case Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mt-8">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Watch Out! A Common Point of Confusion</h3>
            <p className="text-sm mt-2">What if the y-values are repeated? Look at this table for <InlineMath>{'y=x^2'}</InlineMath>.</p>
            <table className="w-1/2 mx-auto my-2 border text-center text-sm">
                 <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-2'>x (Input)</th><th className='p-2'>y (Output)</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-2'>-2</td><td className='p-2 font-bold'>4</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>1</td><td className='p-2'>1</td></tr>
                    <tr><td className='border-r p-2'>2</td><td className='p-2 font-bold'>4</td></tr>
                </tbody>
            </table>
            <p className="text-sm p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">The output `4` is repeated, but that's okay! The rule is about the <strong>inputs</strong>. Since the x-values (-2, 1, 2) are all unique, this <strong>IS</strong> a function.</p>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="functions-from-tables" 
            slideTitle="Recognizing Functions from Tables" 
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