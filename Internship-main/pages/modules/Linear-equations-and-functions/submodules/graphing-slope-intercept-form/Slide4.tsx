import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- NEW & IMPROVED: A single, annotated graph component for the full example ---
const FullExampleGraph = () => {
    const viewBoxSize = 7; // Increased viewBox size slightly for more padding
    const scale = 1; // Used for text scaling if needed, but direct font size in svg is better

    return (
        <div className="w-full aspect-square p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-600 flex items-center justify-center">
            <svg viewBox={`${-viewBoxSize} ${-viewBoxSize} ${viewBoxSize * 2} ${viewBoxSize * 2}`} className="w-full h-full">
                <defs>
                    <marker id="arrow-head" markerWidth="3" markerHeight="3" refX="2" refY="1.5" orient="auto"><polygon points="0 0, 3 1.5, 0 3" className="fill-blue-500" /></marker>
                    <marker id="small-arrow-head" markerWidth="2" markerHeight="2" refX="1.5" refY="1" orient="auto"><polygon points="0 0, 2 1, 0 2" className="fill-slate-500 dark:fill-slate-400" /></marker>
                </defs>

                {/* Grid */}
                {Array.from({ length: (viewBoxSize * 2) - 1 }, (_, i) => i - (viewBoxSize - 1)).map(i => (
                    <g key={`grid-h-${i}`}>
                        <line x1={i} y1={-viewBoxSize} x2={i} y2={viewBoxSize} className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="0.05" />
                        <line x1={-viewBoxSize} y1={i} x2={viewBoxSize} y2={i} className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="0.05" />
                        {/* Axis labels - numbers */}
                        {i !== 0 && i % 1 === 0 && ( // Label every unit, skip 0
                            <>
                                <text x={i - 0.1} y={0.5} className="text-[0.4px] fill-slate-600 dark:fill-slate-300" textAnchor="middle">{i}</text>
                                <text x={-0.3} y={-i + 0.1} className="text-[0.4px] fill-slate-600 dark:fill-slate-300" textAnchor="end">{i}</text>
                            </>
                        )}
                    </g>
                ))}

                {/* Axes */}
                <line x1={-viewBoxSize} y1="0" x2={viewBoxSize} y2="0" className="stroke-slate-400" strokeWidth="0.1" markerEnd="url(#arrow-head)" /> {/* X-axis */}
                <line x1="0" y1={-viewBoxSize} x2="0" y2={viewBoxSize} className="stroke-slate-400" strokeWidth="0.1" markerEnd="url(#arrow-head)" /> {/* Y-axis */}
                {/* Axis labels - X, Y */}
                <text x={viewBoxSize - 0.5} y={0.5} className="text-[0.6px] fill-slate-600 dark:fill-slate-300 font-bold">X</text>
                <text x={0.5} y={viewBoxSize - 0.5} className="text-[0.6px] fill-slate-600 dark:fill-slate-300 font-bold">Y</text>
                <text x={-0.2} y={0.7} className="text-[0.4px] fill-slate-600 dark:fill-slate-300">0</text>


                {/* Main line: y = -2/3x + 4 (from (-3, 6) to (6, 0)) */}
                <line x1="-3" y1="6" x2="6" y2="0" className="stroke-blue-500" strokeWidth="0.2" />

                {/* Step 1: Plot 'b' (0,4) */}
                <circle cx="0" cy="4" r="0.2" className="fill-blue-600 dark:fill-blue-400" />
                <text x="0.5" y="4.2" className="text-[0.5px] fill-blue-600 dark:fill-blue-400 font-bold">b (0,4)</text>

                {/* Step 2: Use 'm' (from (0,4) down 2, right 3 to (3,2)) */}
                <path d="M 0 4 v -2 h 3" strokeDasharray="0.2,0.2" strokeWidth="0.1" fill="none" className="stroke-slate-500 dark:stroke-slate-400" markerEnd="url(#small-arrow-head)" />
                <circle cx="3" cy="2" r="0.2" className="fill-blue-600 dark:fill-blue-400" />
                <text x="3.5" y="2.2" className="text-[0.5px] fill-blue-600 dark:fill-blue-400 font-bold">(3,2)</text>
                <text x="1.5" y="3.2" className="text-[0.4px] fill-slate-600 dark:fill-slate-300" textAnchor="middle">Down 2</text>
                <text x="1.5" y="1.7" className="text-[0.4px] fill-slate-600 dark:fill-slate-300" textAnchor="middle">Right 3</text>
            </svg>
        </div>
    );
};

export default function GraphingSlopeInterceptSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'graphing-full-example', conceptId: 'graphing-full-example', conceptName: 'Full Graphing Example Walkthrough', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
       {/*  <h2 className="text-3xl font-bold text-center mb-4">Full Example: Graphing a Line from Start to Finish</h2>
        */} <p className="text-center text-slate-600 dark:text-slate-300 mb-4">Let's put all the steps together to graph the equation:</p>
        <div className="mb-8 text-center"><BlockMath>{'y = -\\frac{2}{3}x + 4'}</BlockMath></div>
        
        <div className="flex flex-col md:flex-row gap-8 flex-grow">

          {/* --- Left Column: The Instructions --- */}
          <div className="md:w-1/2 flex flex-col space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Step 1: Plot the 'b'</h3>
                <p className="mt-2 text-sm">First, find the <strong>y-intercept (b)</strong>, which is <InlineMath>{'4'}</InlineMath>. Plot the first point at <InlineMath>{'(0, 4)'}</InlineMath>.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Step 2: Use the 'm'</h3>
                <p className="mt-2 text-sm">Next, use the <strong>slope (m)</strong>, <InlineMath>{'m = -\\frac{2}{3}'}</InlineMath>, to find the second point. From (0, 4), go <strong>DOWN 2</strong> and <strong>RIGHT 3</strong> to land on <InlineMath>{'(3, 2)'}</InlineMath>.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Step 3: Connect & Finish</h3>
                <p className="mt-2 text-sm">Draw a straight line through your two points. Add arrows to show it continues forever.</p>
            </div>
            
            {/* --- NEW: Self-Check Step (using blue/white/black palette) --- */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 shadow-md">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">✓ Step 4: Self-Check Your Work</h4>
                <p className="text-xs mt-1">Pick a point you found, like <InlineMath>(3, 2)</InlineMath>, and plug it into the equation. Is <InlineMath>{'2 = -\\frac{2}{3}(3) + 4'}</InlineMath>? Yes, <InlineMath>{'2 = -2 + 4'}</InlineMath>. It works!</p>
            </div>
          </div>

          {/* --- Right Column: The Visuals & Pro Tips --- */}
          <div className="md:w-1/2 flex flex-col space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
                <h3 className="text-xl font-semibold text-center mb-4">Visual Walkthrough</h3>
                {/* --- NEW: Single Annotated Graph --- */}
                <FullExampleGraph />
            </div>
            
            {/* --- NEW: Pro Tip Section (using blue/white/black palette) --- */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-300 dark:border-blue-700 shadow-md">
                <p className="font-semibold text-sm">💡 Pro Tip: The Alternate Move</p>
                <p className="text-xs mt-1">For <InlineMath>{'m = -\\frac{2}{3}'}</InlineMath>, you can also use <InlineMath>{'m = \\frac{2}{-3}'}</InlineMath>. From (0, 4), go <strong>UP 2</strong> and <strong>LEFT 3</strong> to find another point at (-3, 6). It's on the same line!</p>
            </div>

            {/* --- NEW: Your Turn Section (using blue/white/black palette) --- */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-300 dark:border-blue-700 shadow-md">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Your Turn to Graph!</h3>
                <p className="mt-2 text-sm">On paper, use all the steps to graph <InlineMath>{'y = \\frac{3}{4}x - 2'}</InlineMath>.</p>
                <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">(Answer: Start at (0, -2), then move UP 3 and RIGHT 4 to find the point (4, 1).)</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graphing-full-example" 
            slideTitle="Full Example: Graphing a Line" 
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