import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ComparingLinearFunctionsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'real-world-comparisons', conceptId: 'real-world-comparisons', conceptName: 'Real-World Comparisons', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Real-World Comparison: Which Taxi is Cheaper?</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">It's 5:50 PM in Navi Mumbai. You need to book a taxi for a 10 km trip. Let's find the best deal!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: Company A & B */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Company A (Equation)</h3>
            <p className="text-sm">Gives their pricing as an equation:</p>
            <p className="p-3 text-center bg-slate-100 dark:bg-slate-700 rounded-md font-mono mt-1"><InlineMath>{'y = 18x + 25'}</InlineMath></p>
            <ul className="list-disc pl-5 mt-3 text-sm">
                <li><strong>Initial Fee (b):</strong> ₹25</li>
                <li><strong>Cost per km (m):</strong> ₹18</li>
            </ul>
            <hr className="my-4 dark:border-slate-600"/>
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Company B (Graph)</h3>
            <p className="text-sm">Shows pricing on a graph. Let's imagine it drawing:</p>
            <div className="bg-slate-100 dark:bg-slate-700 mt-2 rounded-lg flex items-center justify-center p-4 border dark:border-slate-600 text-left">
                <div className="text-slate-500 text-xs">
                    <p>1. First, an empty graph appears with "Distance (km)" on the x-axis and "Cost (₹)" on the y-axis.</p>
                    <p>2. A point is plotted on the y-axis at (0, 30). This is the initial fee.</p>
                    <p>3. Another point is plotted at (2, 60).</p>
                    <p>4. A straight line is drawn connecting (0, 30) and (2, 60), extending to show further distances.</p>
                    <p className="mt-2 font-bold text-slate-400">This visually represents Company B's pricing.</p>
                </div>
            </div>
            <ul className="list-disc pl-5 mt-3 text-sm">
                <li><strong>Initial Fee (b):</strong> ₹30 (from where the line crosses the y-axis)</li>
                <li><strong>Cost per km (m):</strong> <InlineMath>{'m = \\frac{60-30}{2-0} = 15'}</InlineMath> (₹15)</li>
            </ul>
          </div>

          {/* Right Column: Comparison & Decision */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Comparison & Decision</h3>
            <p className="text-sm mb-2">Company A has a cheaper start, but Company B is cheaper per km. The best choice depends on the distance.</p>
            <table className="w-full border text-center text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='p-1'>Feature</th><th className='p-1'>Company A</th><th>Company B</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-1 font-semibold'>Initial Fee (b)</td><td>₹25</td><td>₹30</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-1 font-semibold'>Cost per km (m)</td><td>₹18</td><td>₹15</td></tr>
                </tbody>
            </table>
            <div className="mt-4">
                <p className="font-semibold text-center">Decision for a 10 km Trip</p>
                <p className="text-center p-1 my-1 bg-slate-100 dark:bg-slate-700 rounded-md"><strong>A:</strong> <InlineMath>{'y = 18(10) + 25 = ₹205'}</InlineMath></p>
                <p className="text-center p-1 my-1 bg-slate-100 dark:bg-slate-700 rounded-md"><strong>B:</strong> <InlineMath>{'y = 15(10) + 30 = ₹180'}</InlineMath></p>
                <p className="mt-2 p-2 bg-blue-100 dark:bg-blue-900/50 rounded-md text-center font-bold">For a 10 km trip, Company B is cheaper.</p>
            </div>

            <hr className="my-4 dark:border-slate-600"/>
            
            <div className="mt-auto">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">Deeper Analysis: The Break-Even Point</h3>
                <p className="text-sm mt-2">At what distance are the costs equal? Let's set the equations equal to each other:</p>
                <div className="p-2 my-2 text-center bg-slate-100 dark:bg-slate-700 rounded-md">
                    <InlineMath>{'18x + 25 = 15x + 30'}</InlineMath> <br/>
                    <InlineMath>{'3x = 5'}</InlineMath> <br/>
                    <InlineMath>{'x \\approx 1.67 \\text{ km}'}</InlineMath>
                </div>
                <ul className="text-xs list-disc pl-5">
                    <li>For trips **SHORTER** than 1.67 km, **Company A** is cheaper.</li>
                    <li>For trips **LONGER** than 1.67 km, **Company B** is cheaper.</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="real-world-comparisons" 
            slideTitle="Real-World Comparisons" 
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