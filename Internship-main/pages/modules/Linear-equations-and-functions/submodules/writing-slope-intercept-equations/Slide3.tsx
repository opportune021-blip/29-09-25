import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- NEW: Visual component for Method 1 ---
const GraphForMethod1 = () => (
    <div className="w-full aspect-square max-w-xs mx-auto my-2 p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-600">
        <svg viewBox="-1 -1 6 5" className="w-full h-full">
            <defs><marker id="arrow" markerWidth="3" markerHeight="3" refX="1.5" refY="1.5" orient="auto"><polygon points="0 0, 3 1.5, 0 3" className="fill-current text-slate-500" /></marker></defs>
            <line x1="-1" y1="0" x2="5" y2="0" className="stroke-slate-400" strokeWidth="0.05" markerEnd="url(#arrow)" />
            <line x1="0" y1="-1" x2="0" y2="4" className="stroke-slate-400" strokeWidth="0.05" markerEnd="url(#arrow)" />
            <line x1="-0.5" y1="3.375" x2="4.5" y2="-0.375" className="stroke-blue-500" strokeWidth="0.1" />
            <circle cx="0" cy="3" r="0.1" className="fill-blue-600" />
            <text x="0.2" y="3.1" className="text-[0.2px] fill-blue-600 font-bold">b = 3</text>
            <circle cx="4" cy="0" r="0.1" className="fill-blue-600" />
            <path d="M 0 3 L 4 3 L 4 0" strokeDasharray="0.1,0.1" strokeWidth="0.05" fill="none" className="stroke-slate-500" />
            <text x="2" y="2.5" className="text-[0.15px] fill-slate-500">Rise = -3</text>
            <text x="2" y="3.3" className="text-[0.15px] fill-slate-500">Run = 4</text>
        </svg>
    </div>
);

// --- NEW: Visual component for Method 2 ---
const GraphForMethod2 = () => (
     <div className="w-full aspect-square max-w-[150px] mx-auto my-2 p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-600">
        <svg viewBox="-1 -2 7 7" className="w-full h-full">
            <line x1="-1" y1="0" x2="6" y2="0" className="stroke-slate-400" strokeWidth="0.05"/>
            <line x1="0" y1="-2" x2="0" y2="6" className="stroke-slate-400" strokeWidth="0.05"/>
            <line x1="-0.5" y1="-2.5" x2="2.5" y2="6.5" className="stroke-blue-500" strokeWidth="0.1" />
            <circle cx="2" cy="5" r="0.15" className="fill-red-500" />
            <text x="2.2" y="4.8" className="text-[0.3px] fill-red-500 font-bold">(2, 5)</text>
        </svg>
    </div>
);


export default function WritingSlopeInterceptSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'equation-from-graph-vs-point', conceptId: 'equation-from-graph-vs-point', conceptName: 'Finding an Equation: Two Methods', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Finding the Equation: Three Common Methods</h2>
         */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">Method 1: From a Graph</h3>
                <p className="text-sm mb-2">The "graph detective" method. Use the picture to find clues.</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                    <li><strong>Find 'b' (Y-Intercept):</strong> Look where the line crosses the y-axis.</li>
                    <li><strong>Find 'm' (Slope):</strong> Pick two points and count the <InlineMath>{'\\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath>.</li>
                    <li><strong>Build the Equation:</strong> Combine 'm' and 'b' into <InlineMath>{'y = mx + b'}</InlineMath>.</li>
                </ol>
                <GraphForMethod1 />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">Method 2: From Slope & a Point</h3>
                <p className="text-sm mb-2">The algebraic method. You are given 'm' and a point (x, y), and must find 'b'.</p>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                    <p className="font-semibold text-sm">Problem: Slope = 3, passes through point (2, 5).</p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1 text-xs">
                        <li>Start with: <InlineMath>{'y = mx + b'}</InlineMath></li>
                        <li>Substitute: <InlineMath>{'5 = (3)(2) + b'}</InlineMath></li>
                        <li>Solve: <InlineMath>{'5 = 6 + b \\implies -1 = b'}</InlineMath>.</li>
                        <li className="font-bold">Final Equation: <InlineMath>{'y = 3x - 1'}</InlineMath></li>
                    </ol>
                </div>
                 <div className="text-center mt-2 text-xs text-slate-500">Visual Confirmation: <GraphForMethod2 /></div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">Method 3: From Two Points</h3>
                <p className="text-sm mb-2">Given two points like <InlineMath>(1, 2)</InlineMath> and <InlineMath>(3, 8)</InlineMath>, you combine both methods!</p>
                <ol className="list-decimal list-inside text-sm space-y-2">
                    <li><strong>First, Find the Slope ('m'):</strong> Use the slope formula.
                        <BlockMath>{String.raw`m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{8 - 2}{3 - 1} = \frac{6}{2} = 3`}</BlockMath>
                    </li>
                    <li><strong>Then, Find 'b':</strong> Use the slope <InlineMath>m=3</InlineMath> and one point (e.g., <InlineMath>(1, 2)</InlineMath>) and follow Method 2.
                         <p className="text-xs pl-4 mt-1"><InlineMath>{'y = mx + b \\implies 2 = (3)(1) + b \\implies b = -1'}</InlineMath></p>
                    </li>
                    <li className="font-bold"><strong>Build the Final Equation:</strong> <InlineMath>{'y = 3x - 1'}</InlineMath></li>
                </ol>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-300 dark:border-blue-700 shadow-md">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Your Turn: Practice Problems</h3>
                <ul className="list-disc pl-5 mt-2 space-y-3 text-sm">
                    <li><strong>From Slope & Point:</strong> Find the equation of a line with <InlineMath>m = -2</InlineMath> that passes through <InlineMath>(-1, 5)</InlineMath>. <br/><span className="text-xs text-slate-500">(Answer: y = -2x + 3)</span></li>
                    <li><strong>From Two Points:</strong> Find the equation of the line that passes through <InlineMath>(2, 2)</InlineMath> and <InlineMath>(4, 8)</InlineMath>. <br/><span className="text-xs text-slate-500">(Answer: y = 3x - 4)</span></li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="equation-finding-methods" 
            slideTitle="Finding an Equation: Three Methods" 
            moduleId="linear-equations-and-functions" 
            submoduleId="writing-slope-intercept-equations"
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