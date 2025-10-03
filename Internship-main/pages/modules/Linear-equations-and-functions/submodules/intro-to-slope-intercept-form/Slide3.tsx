import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// A simple SVG component to draw the parallel lines graph
// Note: In SVG, the y-axis is inverted (0 is at the top).
const ParallelLinesGraph = () => (
    <div className="w-full h-full p-2">
        <svg viewBox="-6 -6 12 12" className="w-full h-full">
            {/* Axes */}
            <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="currentColor" strokeWidth="0.1" strokeOpacity="0.5" />
            <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="currentColor" strokeWidth="0.1" strokeOpacity="0.5" />

            {/* y = x + 3  (starts at y=3, SVG y=-3) */}
            <line x1="-5" y1="2" x2="2" y2="-5" className="stroke-blue-500" strokeWidth="0.3" />
            <circle cx="0" cy="-3" r="0.4" className="fill-blue-500" />

            {/* y = x      (starts at y=0, SVG y=0) */}
            <line x1="-5" y1="5" x2="5" y2="-5" className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="0.3" />
            <circle cx="0" cy="0" r="0.4" className="fill-slate-600 dark:fill-slate-300" />

            {/* y = x - 1  (starts at y=-1, SVG y=1) */}
            <line x1="-4" y1="5" x2="5" y2="-4" className="stroke-blue-300" strokeWidth="0.3" />
            <circle cx="0" cy="1" r="0.4" className="fill-blue-300" />
        </svg>
    </div>
);


export default function IntroSlopeInterceptSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'understanding-b', conceptId: 'understanding-b', conceptName: 'Understanding the y-intercept (b)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
        // --- Background style applied to this main container ---
        <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
            {/* <h2 className="text-3xl font-bold text-center mb-6">Understanding the y-intercept (b)</h2>
             */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                
                {/* Left Column: What is 'b' and How it Affects the Graph */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The 'b' is for 'Begin'</h3>
                    <p>If the slope (<InlineMath>{'m'}</InlineMath>) is the line's engine, the y-intercept (<InlineMath>{'b'}</InlineMath>) is its <strong>"launching pad"</strong>.</p>
                    <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded-r-lg">
                        <p className="font-bold">Key Point: The Coordinate</p>
                        <p className="text-sm">The x-coordinate of the y-intercept is <strong>always 0</strong>. The point is always written as <InlineMath>{'(0, b)'}</InlineMath>.</p>
                    </div>

                    <h4 className="font-bold mt-4">How 'b' Affects the Graph</h4>
                    <p className="text-sm mt-2">Changing <InlineMath>{'b'}</InlineMath> just <strong>shifts the line up or down</strong>. Lines with the same slope are parallel.</p>
                    
                    <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-3 rounded-lg flex items-center justify-center border border-slate-300 dark:border-slate-600 min-h-[150px]">
                        <ParallelLinesGraph />
                    </div>
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
                        <li>For <InlineMath>{'y = x + 3'}</InlineMath>, the <span className="text-blue-500 font-bold">blue line</span> starts at <InlineMath>{'(0, 3)'}</InlineMath>.</li>
                        <li>For <InlineMath>{'y = x'}</InlineMath>, the <span className="text-slate-600 dark:text-slate-300 font-bold">black line</span> starts at <InlineMath>{'(0, 0)'}</InlineMath>.</li>
                        <li>For <InlineMath>{'y = x - 1'}</InlineMath>, the <span className="text-blue-300 font-bold">light blue line</span> starts at <InlineMath>{'(0, -1)'}</InlineMath>.</li>
                    </ul>
                </div>

                {/* Right Column: Real-World Meaning and Summary */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">'b' in the Real World: The Initial Amount</h3>
                    <p className="text-sm">In real-world problems, <InlineMath>{'b'}</InlineMath> is your <strong>starting value</strong> before any change happens.</p>
                    <div className="mt-4 space-y-3">
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                            <p className="font-semibold">Auto-Rickshaw Fare: <InlineMath>{'y = 15x + 23'}</InlineMath></p>
                            <p className="text-sm"><InlineMath>{'b = 23'}</InlineMath> is the starting fare you pay at <strong>0 kilometers</strong>.</p>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                            <p className="font-semibold">Savings Account: <InlineMath>{'y = 100x + 500'}</InlineMath></p>
                            <p className="text-sm"><InlineMath>{'b = 500'}</InlineMath> is the initial ₹500 you had <strong>before</strong> you started saving ₹100 weekly.</p>
                        </div>
                    </div>
                    <h4 className="font-bold mt-6">Special Cases of 'b'</h4>
                    <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                        <li><strong>Positive 'b'</strong>: A positive start. The line crosses above the x-axis.</li>
                        <li><strong>Negative 'b'</strong>: A negative start. The line crosses below the x-axis.</li>
                        <li><strong>b = 0</strong>: No starting amount (<InlineMath>{'y=mx'}</InlineMath>). The line passes through the origin (0,0).</li>
                    </ul>
                    <h4 className="font-bold mt-6">Summary: m vs. b</h4>
                    <table className="w-full text-left border-collapse text-sm mt-2">
                        <thead>
                            <tr className="bg-slate-100 dark:bg-slate-900">
                                <th className="p-2 border border-slate-300 dark:border-slate-600">Part</th>
                                <th className="p-2 border border-slate-300 dark:border-slate-600">Role</th>
                                <th className="p-2 border border-slate-300 dark:border-slate-600">Question it Answers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border border-slate-300 dark:border-slate-600 font-bold text-blue-600 dark:text-blue-400">m</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600">The Engine</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600">How steep is it and which way is it going?</td>
                            </tr>
                            <tr>
                                <td className="p-2 border border-slate-300 dark:border-slate-600 font-bold text-blue-600 dark:text-blue-400">b</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600">The Starting Point</td>
                                <td className="p-2 border border-slate-300 dark:border-slate-600">Where does the journey begin on the y-axis?</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="understanding-b" 
            slideTitle="Understanding the y-intercept (b)" 
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