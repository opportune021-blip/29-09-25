import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearAndNonlinearFunctionsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'linear-vs-nonlinear-tables', conceptId: 'linear-vs-nonlinear-tables', conceptName: 'Identifying from a Table', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Identifying from a Table</h2>
        
        {/* The How-To Guide */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mb-8">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">The 4-Step Method for Checking a Table</h3>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                <li><strong>Check the `x` values:</strong> Ensure the inputs change by a constant amount in each step (e.g., always +1, or +2).</li>
                <li><strong>Check the `y` values:</strong> Calculate the difference between each consecutive `y` value.</li>
                <li><strong>Calculate the Rate of Change:</strong> For each step, calculate the rate: <InlineMath>{'\\frac{\\text{Change in y}}{\\text{Change in x}}'}</InlineMath>.</li>
                <li><strong>Compare:</strong> If the rate is the **same** for every step, it's **linear**. If it's **different**, it's **nonlinear**.</li>
            </ol>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: Linear Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 text-center">✅ Linear Function (Constant Rate)</h3>
            <p className="text-sm"><strong>Scenario:</strong> A mobile plan in Navi Mumbai starts with 3 GB and adds 2 GB each month.</p>
            <table className="w-full my-3 border text-center text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-2'>Month (x)</th><th className='border-r p-2'>Data GB (y)</th><th className='p-2'>Rate of Change</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-2'>0</td><td className='border-r p-2'>3</td><td className='p-2'>-</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>1</td><td className='border-r p-2'>5</td><td className='p-2 font-bold'><InlineMath>{'\\frac{+2}{+1} = 2'}</InlineMath></td></tr>
                    <tr><td className='border-r p-2'>2</td><td className='border-r p-2'>7</td><td className='p-2 font-bold'><InlineMath>{'\\frac{+2}{+1} = 2'}</InlineMath></td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>3</td><td className='border-r p-2'>9</td><td className='p-2 font-bold'><InlineMath>{'\\frac{+2}{+1} = 2'}</InlineMath></td></tr>
                </tbody>
            </table>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center text-sm">
                The rate of change is consistently 2. This is a <strong>linear function</strong>.
            </p>
          </div>

          {/* Right Column: Nonlinear Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3 text-center">❌ Nonlinear Function (Changing Rate)</h3>
            <p className="text-sm"><strong>Scenario:</strong> The area of a square garden plot as its side length increases.</p>
             <table className="w-full my-3 border text-center text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-2'>Side (x)</th><th className='border-r p-2'>Area (y)</th><th className='p-2'>Rate of Change</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-2'>0</td><td className='border-r p-2'>0</td><td className='p-2'>-</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>1</td><td className='border-r p-2'>1</td><td className='p-2 font-bold'><InlineMath>{'\\frac{+1}{+1} = 1'}</InlineMath></td></tr>
                    <tr><td className='border-r p-2'>2</td><td className='border-r p-2'>4</td><td className='p-2 font-bold'><InlineMath>{'\\frac{+3}{+1} = 3'}</InlineMath></td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>3</td><td className='border-r p-2'>9</td><td className='p-2 font-bold'><InlineMath>{'\\frac{+5}{+1} = 5'}</InlineMath></td></tr>
                </tbody>
            </table>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center text-sm">
                The rate of change is not constant (1, then 3, then 5). This is a <strong>nonlinear function</strong>.
            </p>
          </div>
        </div>
        
        {/* Tricky Case Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mt-8">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Watch Out! A Tricky Case</h3>
            <p className="text-sm mt-2">Sometimes the 'x' values don't change by a constant amount. You must always check the full ratio! In the table below, even though the changes in x and y jump around, the rate of change is **always 3**. This is a **linear function**.</p>
        </div>

      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="linear-vs-nonlinear-tables" 
            slideTitle="Identifying from a Table" 
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