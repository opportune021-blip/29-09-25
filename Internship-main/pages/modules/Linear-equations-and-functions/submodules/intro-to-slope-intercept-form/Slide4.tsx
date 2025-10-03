import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function IntroSlopeInterceptSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'identifying-m-and-b', conceptId: 'identifying-m-and-b', conceptName: 'Identifying m and b', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
        <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
           {/*  <h2 className="text-3xl font-bold text-center mb-4">Identifying 'm' and 'b': A Practical Guide</h2>
            */} 
            {/* The Golden Rule Section */}
            <div className="bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-xl p-4 mb-6 text-center">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">The Golden Rule</h3>
                <p className="text-sm mt-1">First, make sure the equation is in the form <InlineMath>{'y = mx + b'}</InlineMath>. The letter <InlineMath>{'y'}</InlineMath> must be by itself!</p>
                <p className="text-sm mt-1"><InlineMath>{'m'}</InlineMath> is the number multiplying <InlineMath>{'x'}</InlineMath>, and <InlineMath>{'b'}</InlineMath> is the number that stands alone.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                
                {/* Left Column: Examples and Tricky Cases */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Part 1: Standard & Tricky Cases</h3>
                    
                    <h4 className="font-semibold">Standard Cases</h4>
                    <div className="mt-2 space-y-3 text-sm">
                        <p><strong>Equation:</strong> <InlineMath>{'y = 3x + 5'}</InlineMath> <br/> ➡️ <InlineMath>{'m = 3'}</InlineMath>, <InlineMath>{'b = 5'}</InlineMath></p>
                        <p><strong>Equation:</strong> <InlineMath>{'y = 2x - 4'}</InlineMath> <br/> ➡️ <InlineMath>{'m = 2'}</InlineMath>, <InlineMath>{'b = -4'}</InlineMath> (Keep the sign!)</p>
                    </div>

                    <h4 className="font-semibold mt-6">Watch Out for Tricky Cases!</h4>
                    <div className="mt-2 space-y-3 text-sm p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <p><strong>Invisible 'm':</strong> For <InlineMath>{'y = x + 7'}</InlineMath>, the slope is an invisible 1. <br/> ➡️ <InlineMath>{'m = 1'}</InlineMath>, <InlineMath>{'b = 7'}</InlineMath></p>
                        <p><strong>Missing 'b':</strong> For <InlineMath>{'y = 4x'}</InlineMath>, the y-intercept is 0. <br/> ➡️ <InlineMath>{'m = 4'}</InlineMath>, <InlineMath>{'b = 0'}</InlineMath></p>
                        <p><strong>Switched Order:</strong> For <InlineMath>{'y = 6 + 2x'}</InlineMath>, <InlineMath>{'m'}</InlineMath> is still with <InlineMath>{'x'}</InlineMath>. <br/> ➡️ <InlineMath>{'m = 2'}</InlineMath>, <InlineMath>{'b = 6'}</InlineMath></p>
                    </div>
                </div>

                {/* Right Column: Challenge and Practice */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Part 2: Challenge & Practice Drill</h3>
                    
                    <h4 className="font-semibold">The Final Challenge: Rearrange First!</h4>
                    <div className="mt-2 text-sm p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <p>For <InlineMath>{'2x + y = 5'}</InlineMath>, you must get <InlineMath>{'y'}</InlineMath> alone. Subtract <InlineMath>{'2x'}</InlineMath> from both sides:</p>
                        <p className="font-bold my-2 text-center"><InlineMath>{'y = -2x + 5'}</InlineMath></p>
                        <p>Now it's easy: ➡️ <InlineMath>{'m = -2'}</InlineMath>, <InlineMath>{'b = 5'}</InlineMath></p>
                    </div>
                    
                    <h4 className="font-semibold mt-6">Practice Drill</h4>
                    <table className="w-full text-left border-collapse text-sm mt-2">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-900">
                                <th className="p-2 border border-slate-300 dark:border-slate-600">Equation</th>
                                <th className="p-2 border border-slate-300 dark:border-slate-600">Slope (m)</th>
                                <th className="p-2 border border-slate-300 dark:border-slate-600">Y-intercept (b)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y = 5x - 1'}</InlineMath></td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td></tr>
                            <tr><td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y = -x + 8'}</InlineMath></td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td></tr>
                            <tr><td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y = 10 + 3x'}</InlineMath></td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td></tr>
                            <tr><td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y = \\frac{2}{3}x'}</InlineMath></td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td></tr>
                            <tr><td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y = -4'}</InlineMath></td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td></tr>
                            <tr><td className="p-2 border border-slate-300 dark:border-slate-600"><InlineMath>{'y + 4x = 9'}</InlineMath></td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td><td className="p-2 border border-slate-300 dark:border-slate-600">?</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="identifying-m-and-b" 
            slideTitle="Identifying m and b in Equations" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intro-to-slope-intercept-form"
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
