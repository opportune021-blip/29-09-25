import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingSlopeInterceptSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'graphing-practice-special-cases', conceptId: 'graphing-practice-special-cases', conceptName: 'Graphing Practice & Special Cases', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col overflow-y-auto">
        {/* <h2 className="text-3xl font-bold text-center mb-4">Mastering Slope-Intercept Form: Practice & Special Cases</h2>
         */}
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-2 mb-6">Let's practice to become graphing experts and learn about special types of lines.</p>
        
        {/* NEW: Big Picture Intro */}
        <blockquote className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded-lg">
          <p className="font-semibold text-blue-800 dark:text-blue-300">The Big Picture: Why is <InlineMath>{'y = mx + b'}</InlineMath> so useful?</p>
          <p className="mt-2">It tells a line's story in a single sentence. It gives you two key pieces of information:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li><strong>Where to start:</strong> The <strong>y-intercept (<InlineMath>{'b'}</InlineMath>)</strong> is your starting point on the y-axis.</li>
            <li><strong>How to move:</strong> The <strong>slope (<InlineMath>{'m'}</InlineMath>)</strong> gives you the exact directions (rise over run) to find every other point.</li>
          </ul>
        </blockquote>

        {/* --- Two Column Layout --- */}
        <div className="flex flex-col md:flex-row gap-8 flex-grow">

            {/* --- Left Column: Practice Examples --- */}
            <div className="md:w-1/2 flex flex-col gap-8">
                {/* Example 1: Standard Problem */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Example 1: A Standard Problem</h3>
                    <p className="mt-2 mb-4 font-bold text-lg text-center bg-slate-100 dark:bg-slate-700 p-2 rounded-md">Graph: <InlineMath>{'y = 3x - 4'}</InlineMath></p>
                    <div className="grid grid-cols-1 gap-4 items-center">
                        <div>
                            <ol className="list-decimal list-inside space-y-2">
                                <li><strong>Find 'b' and 'm':</strong> <InlineMath>{'b = -4'}</InlineMath>, <InlineMath>{'m = 3'}</InlineMath>.</li>
                                <li><strong>Plot the Beginning Point:</strong> Place a dot at <InlineMath>{'(0, -4)'}</InlineMath>.</li>
                                <li><strong>Use 'm' to Move:</strong> Slope is <InlineMath>{'m = \\frac{3}{1}'}</InlineMath>. Go <strong>UP 3</strong>, <strong>RIGHT 1</strong> to <InlineMath>{'(1, -1)'}</InlineMath>.</li>
                                <li><strong>Connect the Dots:</strong> Draw the line.</li>
                            </ol>
                        </div>
                        {/* Assuming you have a valid image URL */}
                        {/* <img src="https://i.imgur.com/G5Y8uVn.png" alt="Graph of y=3x-4" className="rounded-lg shadow-sm border dark:border-slate-600"/> */}
                    </div>
                </div>

                {/* Example 2: Negative Fractional Slope */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Example 2: Handling a Negative Fractional Slope</h3>
                    <p className="mt-2 mb-4 font-bold text-lg text-center bg-slate-100 dark:bg-slate-700 p-2 rounded-md">Graph: <InlineMath>{'y = -\\frac{2}{5}x + 3'}</InlineMath></p>
                    <p className="mb-4">Give the negative sign to the Rise. Don't let it scare you!</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Find 'b' and 'm':</strong> <InlineMath>{'b = 3'}</InlineMath>, <InlineMath>{'m = -\\frac{2}{5}'}</InlineMath>.</li>
                        <li><strong>Plot the Beginning Point:</strong> Place a dot at <InlineMath>{'(0, 3)'}</InlineMath>.</li>
                        <li><strong>Use 'm' to Move:</strong> Rise = -2 (<strong>DOWN 2</strong>), Run = 5 (<strong>RIGHT 5</strong>). Find the point <InlineMath>{'(5, 1)'}</InlineMath>.</li>
                        <li><strong>Connect the Dots:</strong> The line will go downhill.</li>
                    </ol>
                    {/* NEW: Pro Tip for negative slope */}
                    <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-300 dark:border-slate-600">
                      <p className="font-semibold text-sm">💡 Pro Tip: Alternate Move</p>
                      <p className="text-sm mt-1">You can also give the negative to the Run! For <InlineMath>{'m = -\\frac{2}{5}'}</InlineMath>, you could write it as <InlineMath>{'\\frac{2}{-5}'}</InlineMath>. This means <strong>UP 2</strong> and <strong>LEFT 5</strong>. Try it from your starting point (0, 3)—you'll land on the exact same line!</p>
                    </div>
                </div>
            </div>

            {/* --- Right Column: Special Cases & Advanced Concepts --- */}
            <div className="md:w-1/2 flex flex-col gap-8">
                {/* NEW: Real-World Connection Panel */}
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-300 dark:border-green-700 shadow-md">
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">📱 Real-World Connection: Mobile Phone Plan</h3>
                    <p className="mt-2 mb-4">A phone plan costs a <strong>$20 flat fee</strong> each month, plus <strong>$10 per GB</strong> of data used.</p>
                    <ul className="list-none space-y-2 text-sm">
                      <li>🔹 The <strong>y-intercept (b)</strong> is the starting cost, even with 0 GB of data. So, <InlineMath>{'b = 20'}</InlineMath>.</li>
                      <li>🔸 The <strong>slope (m)</strong> is the rate of change—the cost "per" GB. So, <InlineMath>{'m = 10'}</InlineMath>.</li>
                    </ul>
                    <p className="mt-3">The equation for your monthly bill (<InlineMath>{'y'}</InlineMath>) based on the data you use (<InlineMath>{'x'}</InlineMath>) is:</p>
                    <p className="font-bold text-center bg-white dark:bg-slate-800 p-2 rounded-md mt-2"><InlineMath>{'y = 10x + 20'}</InlineMath></p>
                </div>
                
                {/* Special Cases */}
                <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-300 dark:border-slate-700">
                    <h3 className="text-xl font-semibold text-center mb-4">Special Cases: Horizontal and Vertical Lines</h3>
                    <div className="grid grid-cols-1 gap-6 items-center">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-blue-600 dark:text-blue-400">Horizontal Lines (e.g., <InlineMath>{'y = 4'}</InlineMath>)</h4>
                                <p>This is <InlineMath>{'y = 0x + 4'}</InlineMath>. The slope is 0 (flat!). Draw a horizontal line crossing the y-axis at 4.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-600 dark:text-blue-400">Vertical Lines (e.g., <InlineMath>{'x = -2'}</InlineMath>)</h4>
                                <p>The slope is **undefined** (like a wall!). Draw a vertical line crossing the x-axis at -2.</p>
                                {/* NEW: Deeper Dive explanation */}
                                <details className="mt-2 text-sm">
                                  <summary className="cursor-pointer font-semibold text-slate-600 dark:text-slate-400">Why is the slope 'undefined'?</summary>
                                  <div className="p-2 bg-white dark:bg-slate-800 rounded-md mt-1">
                                    <p>Let's pick two points on the line <InlineMath>{'x = -2'}</InlineMath>, like <InlineMath>{'(-2, 1)'}</InlineMath> and <InlineMath>{'(-2, 5)'}</InlineMath>.</p>
                                    <p className="my-1"><InlineMath>{'m = \\frac{\\text{Rise}}{\\text{Run}} = \\frac{5 - 1}{-2 - (-2)} = \\frac{4}{0}'}</InlineMath></p>
                                    <p><strong>You can't divide by zero!</strong> That's why the slope is 'undefined'. A vertical line has no "run," so the formula breaks.</p>
                                  </div>
                                </details>
                            </div>
                        </div>
                        {/* <img src="https://i.imgur.com/NfTjX5X.png" alt="Horizontal and Vertical Lines" className="rounded-lg shadow-sm border dark:border-slate-600"/> */}
                    </div>
                </div>
                
                {/* Working Backwards */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Working Backwards: Equation from a Graph</h3>
                    <p className="mt-2 mb-4">If you have the line, you can find the equation by reversing the process.</p>
                    <div className="grid grid-cols-1 gap-4 items-center">
                        {/* <img src="https://i.imgur.com/vH5Uu2b.png" alt="Finding equation from graph" className="rounded-lg shadow-sm border dark:border-slate-600 md:order-last"/> */}
                        <div>
                            <ol className="list-decimal list-inside space-y-3">
                                <li><strong>Find 'b' (Y-Intercept):</strong> The line crosses the y-axis at -1. So, <InlineMath>{'b = -1'}</InlineMath>.</li>
                                <li><strong>Find 'm' (Slope):</strong> Pick two points like <InlineMath>{'(0, -1)'}</InlineMath> and <InlineMath>{'(2, 2)'}</InlineMath>. Count the Rise (UP 3) and Run (RIGHT 2). The slope is <InlineMath>{'m = \\frac{3}{2}'}</InlineMath>.</li>
                                <li><strong>Write the Equation:</strong> Plug 'm' and 'b' into <InlineMath>{'y = mx + b'}</InlineMath>.
                                    <p className="font-bold text-center bg-slate-100 dark:bg-slate-700 p-2 rounded-md mt-2"><InlineMath>{'y = \\frac{3}{2}x - 1'}</InlineMath></p>
                                </li>
                                {/* NEW: Self-Check Step */}
                                <li className="pt-2 border-t border-slate-200 dark:border-slate-700"><strong>Check Your Work:</strong> Test a point from the graph, like <InlineMath>{'(2,2)'}</InlineMath>.
                                  <div className="text-sm mt-1 pl-2">
                                    <p>Is <InlineMath>{'2 = \\frac{3}{2}(2) - 1'}</InlineMath>?</p>
                                    <p><InlineMath>{'2 = 3 - 1 \\implies 2 = 2'}</InlineMath>. ✅ Yes, it works!</p>
                                  </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graphing-practice-special-cases" 
            slideTitle="Graphing: Practice & Special Cases" 
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