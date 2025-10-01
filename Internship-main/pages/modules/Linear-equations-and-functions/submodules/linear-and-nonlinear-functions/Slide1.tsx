import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearAndNonlinearFunctionsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'what-is-linear', conceptId: 'what-is-linear', conceptName: 'What Makes a Function Linear?', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">{/* 
        <h2 className="text-3xl font-bold text-center mb-6">What Makes a Function Linear? The Constant Rate Check</h2> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Rule, Equations, and Tables */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">The One Big Rule</h3>
                <p className="mt-2">A function is linear if it has a constant rate of change. This means its slope (`m`) never changes. Think of it like a car on the Palm Beach Road with cruise control set—its speed is constant.</p>
            </div>

            <hr className="dark:border-slate-600"/>

            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">1. Checking From an Equation</h3>
                <p className="mt-2 text-sm">A function is linear if its equation can be written as <InlineMath>{'y = mx + b'}</InlineMath>, and the variable `x` has no exponents (like <InlineMath>{'x^2'}</InlineMath>).</p>
                <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                    <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded"><strong>✅ Linear:</strong> <InlineMath>{'y = 2x+5'}</InlineMath></div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded"><strong>❌ Not Linear:</strong> <InlineMath>{'y = x^2+1'}</InlineMath></div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">2. Checking From a Table</h3>
                <p className="mt-2 text-sm">A function is linear if the rate of change (<InlineMath>{'\\frac{\\text{change in y}}{\\text{change in x}}'}</InlineMath>) is the same between every pair of points.</p>
                <p className="text-xs font-semibold mt-2">✅ Linear Table (Rate is always <InlineMath>{'\\frac{6}{2}=3'}</InlineMath>):</p>
                <p className="text-xs font-mono">x: 0, 2, 4, 6<br/>y: 5, 11, 17, 23</p>
                <p className="text-xs font-semibold mt-2">❌ Not Linear Table (Rate changes from 3 to 5 to 7):</p>
                <p className="text-xs font-mono">x: 1, 2, 3, 4<br/>y: 2, 5, 10, 17</p>
            </div>
          </div>

          {/* Right Column: Graphs and Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">3. Checking From a Graph</h3>
                <p className="mt-2">This is the easiest check! A function is linear if its graph is a single, perfectly straight line.</p>
                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                    <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-bold">✅ Linear</p>
                        <p className="text-xs">A straight, slanted line.</p>
                        <p className="text-xs">A horizontal line.</p>
                    </div>
                     <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <p className="font-bold">❌ Not Linear</p>
                        <p className="text-xs">Any curve (like a 'U' shape).</p>
                        <p className="text-xs">A jagged 'V' shape.</p>
                    </div>
                </div>
            </div>

            <hr className="dark:border-slate-600"/>

            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">The Big Picture Summary</h3>
                <table className="w-full mt-2 border text-left text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th className="p-2 border-r dark:border-slate-600">Form</th>
                            <th className="p-2">How to Know It's LINEAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t dark:border-slate-600">
                            <td className="p-2 border-r dark:border-slate-600 font-semibold">Equation</td>
                            <td className="p-2">Can be written as <InlineMath>{'y=mx+b'}</InlineMath>. No exponents on 'x'.</td>
                        </tr>
                        <tr className="border-t dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50">
                            <td className="p-2 border-r dark:border-slate-600 font-semibold">Table</td>
                            <td className="p-2">The rate of change is constant between any two points.</td>
                        </tr>
                        <tr className="border-t dark:border-slate-600">
                            <td className="p-2 border-r dark:border-slate-600 font-semibold">Graph</td>
                            <td className="p-2">The picture is a single, perfectly straight line.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-linear" 
            slideTitle="What Makes a Function Linear?" 
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