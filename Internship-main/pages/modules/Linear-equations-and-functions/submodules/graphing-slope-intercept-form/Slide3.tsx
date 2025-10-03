import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingSlopeInterceptSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'using-rise-over-run', conceptId: 'using-rise-over-run', conceptName: 'Step 2: Using Slope "Rise over Run"', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
        <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
         {/*    <h2 className="text-3xl font-bold text-center mb-6">Step 2: Following the Slope Treasure Map</h2>
          */}   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
                
                {/* Left Column: How-To */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">'m' is your treasure map 🗺️</h3>
                    <p className="mb-4">With your starting point set, use the slope ('m') as a set of directions to find the next point on the line.</p>
                    
                    <p>Let's use the example:</p>
                    <div className="p-3 my-2 bg-slate-100 dark:bg-slate-700 rounded-md text-center font-bold text-lg"><InlineMath>{'y = \\frac{2}{3}x - 4'}</InlineMath></div>

                    <ol className="list-decimal list-inside space-y-4 mt-3">
                        <li>
                            <strong>Start at 'b':</strong> Your first point is plotted at the y-intercept, <InlineMath>{'(0, -4)'}</InlineMath>.
                        </li>
                        <li>
                            <strong>Identify 'm':</strong> The slope is <InlineMath>{'m = \\frac{2}{3}'}</InlineMath>.
                            <div className="p-3 mt-2 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                                <p><strong>Rise (North/South) = 2:</strong> From <InlineMath>{'(0,-4)'}</InlineMath>, move **UP 2 units**.</p>
                                <p><strong>Run (East/West) = 3:</strong> From there, move **RIGHT 3 units**.</p>
                            </div>
                        </li>
                        <li>
                            <strong>Plot New Point:</strong> This move lands you on your second point: <InlineMath>{'(3, -2)'}</InlineMath>.
                        </li>
                    </ol>
                </div>

                {/* Right Column: Visual and Key Questions */}
                <div className="flex flex-col gap-8">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Visualizing the Move: The Slope Staircase</h3>
                            {/* <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                                <img src="https://i.imgur.com/q1oXfQf.png" alt="Graph showing the point (0, -4) and arrows indicating a rise of 2 and a run of 3 to the new point (3, -2)." className="rounded-md" />
                            </div> */}
                        <p className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">The slope is a constant pattern. You can apply the "Rise over Run" instruction <strong>over and over</strong> from any point on the line to find the next one, building a perfect staircase!</p>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Important Questions</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold">What if the slope is a whole number?</h4>
                                <p>For an equation like <InlineMath>{'y=5x+1'}</InlineMath>, write the slope <InlineMath>{'m=5'}</InlineMath> as a fraction: <InlineMath>{'m=\\frac{5}{1}'}</InlineMath>. This means you Rise 5 and Run 1.</p>
                            </div>
                            <div>
                                <h4 className="font-bold">What if the slope is negative?</h4>
                                <p>For <InlineMath>{'y=-\\frac{4}{3}x+2'}</InlineMath>, give the negative to the Rise: <InlineMath>{'m=\\frac{-4}{3}'}</InlineMath>. This means you go <strong>DOWN 4</strong> and Right 3.</p>
                                <div className="mt-2 text-sm p-2 bg-slate-50 dark:bg-slate-900/40 rounded-md">
                                    <p><strong>💡 Pro Tip:</strong> You can also give the negative to the Run: <InlineMath>{'m=\\frac{4}{-3}'}</InlineMath>. This means **UP 4** and **LEFT 3**. You'll land on a different point, but it will be on the exact same line!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-300 dark:border-blue-700 shadow-md">
                        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">Watch Out! Common Traps 🚧</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li><strong>Starting at the Wrong Place:</strong> Your treasure hunt *always* starts at <strong>'b' (the y-intercept)</strong>, NOT the origin (0, 0).</li>
                            <li><strong>Mixing up Rise and Run:</strong> Always go <strong>UP/DOWN first</strong>, then <strong>RIGHT</strong>. Don't do the Run before the Rise.</li>
                            <li><strong>The Double Negative:</strong> For a negative slope like <InlineMath>{'m = -\\frac{4}{3}'}</InlineMath>, the negative belongs to <strong>only one number</strong>. Don't go DOWN and LEFT, as two negatives make a positive slope!</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="using-rise-over-run" 
            slideTitle="Step 2: Following the Slope Treasure Map" 
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