import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingSlopeInterceptSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'graphing-slope-intercept-intro', conceptId: 'graphing-slope-intercept-intro', conceptName: 'Introduction to Slope-Intercept Form', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-y-auto">
     {/*    <h2 className="text-3xl font-bold text-center mb-4">Graphing Lines Made Easy: The Slope-Intercept Equation</h2>
      */}   <p className="text-center text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            This is the "secret code" for drawing a perfect straight line on a graph using its equation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">

            {/* --- Left Column: The "How-To" Guide --- */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">The Method</h3>
                <div className="space-y-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-semibold">The Magic Formula</h4>
                        <p className="text-center font-mono text-xl my-1"><InlineMath>{'y = mx + b'}</InlineMath></p>
                        <ul className="list-disc pl-5 text-xs">
                            <li><InlineMath>{'b'}</InlineMath> is the <strong>Y-Intercept</strong> (your starting point).</li>
                            <li><InlineMath>{'m'}</InlineMath> is the <strong>Slope</strong> (your movement instructions, <InlineMath>{'\\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath>).</li>
                        </ul>
                    </div>
                     <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-semibold">The 4 Graphing Steps</h4>
                        <ol className="list-decimal pl-5 mt-2 text-sm space-y-1">
                            <li><strong>Identify 'm' and 'b'</strong> from the equation.</li>
                            <li><strong>Plot 'b'</strong> on the y-axis. This is your first point.</li>
                            <li><strong>Use 'm'</strong> (Rise over Run) to move from your first point and plot a second point.</li>
                            <li><strong>Draw the line</strong> connecting your two points.</li>
                        </ol>
                    </div>
                </div>
            </div>

            {/* --- Right Column: Examples in Action --- */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Examples in Action</h3>
                <div className="space-y-4 overflow-y-auto pr-2">
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-bold">1. Positive Slope: <InlineMath>{'y = 2x + 1'}</InlineMath></h4>
                        <p className="text-xs mt-1">Start at <InlineMath>{'b=1'}</InlineMath>. From (0, 1), use <InlineMath>{'m=\\frac{2}{1}'}</InlineMath> (Up 2, Right 1) to find the next point.</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-bold">2. Negative Slope: <InlineMath>{'y = -\\frac{2}{3}x + 1'}</InlineMath></h4>
                        <p className="text-xs mt-1">Start at <InlineMath>{'b=1'}</InlineMath>. From (0, 1), use <InlineMath>{'m=\\frac{-2}{3}'}</InlineMath> (Down 2, Right 3) to find the next point.</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="font-bold">3. Special Cases</h4>
                        <ul className="list-disc pl-5 text-xs">
                            <li><strong>Horizontal Line (<InlineMath>{'y=4'}</InlineMath>):</strong> A flat line crossing the y-axis at 4. (Slope is 0).</li>
                            <li><strong>Vertical Line (<InlineMath>{'x=-2'}</InlineMath>):</strong> A vertical line crossing the x-axis at -2. (Slope is undefined).</li>
                        </ul>
                    </div>
                     <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                        <h4 className="font-bold">4. Quick Check!</h4>
                        <p className="text-xs mt-1">For <InlineMath>{'y=-x+5'}</InlineMath>: The starting point ('b') is 5. The movement ('m') is -1, so you go DOWN 1, RIGHT 1.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graphing-slope-intercept-intro" 
            slideTitle="Introduction to Slope-Intercept Form" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-slope-intercept-form"
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