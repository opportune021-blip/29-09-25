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
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col overflow-y-auto">
        {/* --- Main Title and Subtitle --- */}
        {/* <h2 className="text-3xl font-bold text-center mb-4">Graphing Lines Made Easy: The Slope-Intercept Equation</h2>
         */}<p className="text-center text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            This is the "secret code" for drawing a perfect straight line on a graph. It's the most common way to write and graph linear equations.
        </p>

        {/* --- Two-Column Layout Container --- */}
        <div className="flex flex-col md:flex-row gap-8 flex-grow">

            {/* --- Left Column: The Concepts --- */}
            <div className="md:w-1/2 flex flex-col gap-8">
                
                {/* The Magic Formula */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                    <h3 className="text-2xl font-semibold text-center text-blue-700 dark:text-blue-400">The Magic Formula</h3>
                    <p className="text-center text-4xl font-mono my-4 tracking-wider"><InlineMath>{'y = mx + b'}</InlineMath></p>
                    <p className="text-center mb-4">Each part has a very specific job:</p>
                    <ul className="list-disc list-inside space-y-2 text-left mx-auto max-w-md">
                        <li><InlineMath>{'y'}</InlineMath> and <InlineMath>{'x'}</InlineMath> are the coordinates of any point on the line.</li>
                        <li><InlineMath>{'m'}</InlineMath> is the <strong>slope</strong> of the line.</li>
                        <li><InlineMath>{'b'}</InlineMath> is the <strong>y-intercept</strong> of the line.</li>
                    </ul>
                </div>

                {/* Part 1: 'b' - The Y-Intercept */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Part 1: 'b' - The Y-Intercept (Your Starting Point)</h3>
                    <p className="mt-2">The y-intercept is where the line crosses the vertical y-axis. Think of it as your <strong>B</strong>eginning point.</p>
                    <img src="https://i.imgur.com/G5iM8yq.png" alt="Y-intercept illustration" className="my-4 rounded-lg mx-auto shadow-sm" />
                    <p className="font-semibold mt-4">Examples:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>In <InlineMath>{'y = 2x + 3'}</InlineMath>, the y-intercept is <strong>3</strong>. The starting point is <InlineMath>{'(0, 3)'}</InlineMath>.</li>
                        <li>In <InlineMath>{'y = 5x - 1'}</InlineMath>, the y-intercept is <strong>-1</strong>. The starting point is <InlineMath>{'(0, -1)'}</InlineMath>.</li>
                        <li>In <InlineMath>{'y = -\\frac{1}{2}x'}</InlineMath>, the y-intercept is <strong>0</strong>. The starting point is <InlineMath>{'(0, 0)'}</InlineMath>.</li>
                    </ul>
                </div>
            </div>

            {/* --- Right Column: The Application --- */}
            <div className="md:w-1/2 flex flex-col gap-8">
                
                {/* Part 2: 'm' - The Slope */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Part 2: 'm' - The Slope (The Directions)</h3>
                    <p className="mt-2">The slope tells you how steep the line is. Think of it as your set of <strong>M</strong>ovement instructions, "Rise over Run":</p>
                    <p className="text-center text-3xl font-mono my-4"><InlineMath>{'m = \\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>Rise:</strong> How many units you move UP (positive) or DOWN (negative).</li>
                        <li><strong>Run:</strong> How many units you move to the RIGHT.</li>
                    </ul>
                    <img src="https://i.imgur.com/0uBv62l.png" alt="Slope illustration" className="my-4 rounded-lg mx-auto shadow-sm" />
                </div>

                {/* Putting It All Together */}
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold">How to Graph <InlineMath>{'y = 2x + 1'}</InlineMath></h3>
                    <ol className="list-decimal list-inside space-y-4 mt-4">
                        <li><strong>Find 'm' and 'b':</strong> Here, <InlineMath>{'m = 2'}</InlineMath> and <InlineMath>{'b = 1'}</InlineMath>.</li>
                        <li><strong>Plot 'b':</strong> Plot your first point at <InlineMath>{'(0, 1)'}</InlineMath>.</li>
                        <li><strong>Use 'm' to Move:</strong> Slope is <InlineMath>{'\\frac{2}{1}'}</InlineMath>. From <InlineMath>{'(0, 1)'}</InlineMath>, <strong>rise up 2</strong> and <strong>run right 1</strong> to find your second point at <InlineMath>{'(1, 3)'}</InlineMath>.</li>
                        <li><strong>Draw the line:</strong> Connect the two points.</li>
                    </ol>
                    <img src="https://i.imgur.com/xI6wQk9.png" alt="Graphing y=2x+1" className="my-4 rounded-lg mx-auto shadow-sm" />
                </div>

                {/* Summary */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-blue-500 dark:border-blue-600 shadow-md">
                    <h3 className="text-2xl font-semibold text-center">Summary</h3>
                    <ul className="list-disc list-inside space-y-2 text-left mx-auto max-w-lg mt-4">
                        <li>The equation is <InlineMath>{'y = mx + b'}</InlineMath>.</li>
                        <li><InlineMath>{'b'}</InlineMath> is your <strong>y-intercept</strong> (your starting point).</li>
                        <li><InlineMath>{'m'}</InlineMath> is your <strong>slope</strong> (your movement instructions).</li>
                        <li><strong>Graphing Steps:</strong> Plot 'b', use 'm' to move, connect the dots!</li>
                    </ul>
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