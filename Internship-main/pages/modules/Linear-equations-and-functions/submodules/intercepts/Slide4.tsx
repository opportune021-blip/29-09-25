import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Using the same InterceptGraph component from the previous slide for consistency
type InterceptGraphProps = {
    xIntercept: number;
    yIntercept: number;
    lineColor?: string;
};

const InterceptGraph = ({ xIntercept, yIntercept, lineColor = 'stroke-blue-500 dark:stroke-blue-400' }: InterceptGraphProps) => {
    const viewBoxSize = Math.max(Math.abs(xIntercept), Math.abs(yIntercept), 2) + 2;
    const lineX1 = -viewBoxSize;
    const lineY1 = yIntercept + (lineX1 / xIntercept) * -yIntercept;
    const lineX2 = viewBoxSize;
    const lineY2 = yIntercept + (lineX2 / xIntercept) * -yIntercept;

    return (
        <div className="relative w-full max-w-xs mx-auto aspect-square p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-600">
            <svg viewBox={`${-viewBoxSize} ${-viewBoxSize} ${viewBoxSize * 2} ${viewBoxSize * 2}`} className="w-full h-full">
                <g transform="scale(1, -1)">
                    <line x1={-viewBoxSize} y1="0" x2={viewBoxSize} y2="0" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="0.1" />
                    <line x1="0" y1={-viewBoxSize} x2="0" y2={viewBoxSize} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="0.1" />
                    <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} className={lineColor} strokeWidth="0.2" />
                    <circle cx={xIntercept} cy="0" r="0.2" className="fill-current text-slate-800 dark:text-slate-200" />
                    <circle cx="0" cy={yIntercept} r="0.2" className="fill-current text-slate-800 dark:text-slate-200" />
                </g>
                 <text x={xIntercept + 0.3} y={0.8} className="text-[1px] fill-slate-800 dark:fill-slate-200">({xIntercept}, 0)</text>
                 <text x={0.3} y={-yIntercept - 0.3} className="text-[1px] fill-slate-800 dark:fill-slate-200">(0, {yIntercept})</text>
            </svg>
        </div>
    );
};

export default function InterceptsSlide4() {
    const slideInteractions: Interaction[] = [{ id: 'graphing-using-intercepts', conceptId: 'graphing-using-intercepts', conceptName: 'Graphing a Line Using Intercepts', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Graphing a Line Using Intercepts</h2>
        */} 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Method & Special Cases */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">A Shortcut to Graphing</h3>
                <p>Since you only need two points to draw a line, the intercepts are a perfect choice!</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold">The 4-Step Process:</h4>
                    <ol className="list-decimal list-inside space-y-3 mt-2">
                        <li>Find the <strong>y-intercept</strong> by setting <InlineMath>{'x=0'}</InlineMath>.</li>
                        <li>Find the <strong>x-intercept</strong> by setting <InlineMath>{'y=0'}</InlineMath>.</li>
                        <li><strong>Plot</strong> these two points on the graph.</li>
                        <li><strong>Connect the dots</strong> with a straight line.</li>
                    </ol>
                </div>
            </div>

            {/* --- NEW: Special Cases Section --- */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300">Good to Know: Special Cases</h3>
                 <ul className="list-disc pl-5 mt-2 text-sm space-y-2">
                    <li><strong>Passing through Origin:</strong> For <InlineMath>{'y=3x'}</InlineMath>, both intercepts are <InlineMath>{'(0,0)'}</InlineMath>. You'll need to find a second point by picking another x-value (like <InlineMath>{'x=1'}</InlineMath>).</li>
                    <li><strong>Horizontal/Vertical Lines:</strong> A line like <InlineMath>{'y=5'}</InlineMath> has no x-intercept. A line like <InlineMath>{'x=3'}</InlineMath> has no y-intercept.</li>
                </ul>
            </div>
            
            {/* --- NEW: Pro Tip Section --- */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-300">Pro Tip: Standard Form</h3>
                <p className="text-sm mt-2">This method is extra fast for equations like <InlineMath>{'2x + 3y = 12'}</InlineMath>.</p>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li>Cover the 'y' term: <InlineMath>{'2x = 12 \\implies x=6'}</InlineMath>. Point is <InlineMath>{'(6,0)'}</InlineMath>.</li>
                    <li>Cover the 'x' term: <InlineMath>{'3y = 12 \\implies y=4'}</InlineMath>. Point is <InlineMath>{'(0,4)'}</InlineMath>.</li>
                </ul>
            </div>
          </div>

          {/* Right Column: The Example & Practice */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Graph <InlineMath>{'y = 2x - 4'}</InlineMath></h3>
                <div className="space-y-2 mt-2 text-sm">
                    <p><strong>1. Find y-intercept (set x=0):</strong></p>
                    <p className="pl-4"><InlineMath>{'y = 2(0) - 4 \\implies y = -4'}</InlineMath>. Point is <InlineMath>{'(0, -4)'}</InlineMath>.</p>
                    <p><strong>2. Find x-intercept (set y=0):</strong></p>
                    <p className="pl-4"><InlineMath>{'0 = 2x - 4 \\implies 4 = 2x \\implies x = 2'}</InlineMath>. Point is <InlineMath>{'(2, 0)'}</InlineMath>.</p>
                </div>
                {/* --- NEW: Actual Graph instead of placeholder --- */}
                <div className="my-4">
                    <InterceptGraph xIntercept={2} yIntercept={-4} />
                </div>
                <p className="text-center font-semibold mt-auto">That's all it takes to graph the line!</p>
            </div>
            
            {/* --- NEW: Your Turn Section --- */}
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-6 border border-yellow-300 dark:border-yellow-700 shadow-md flex flex-col">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Your Turn: Graph <InlineMath>{'x + 2y = 4'}</InlineMath></h4>
                <p className="mt-2 text-sm">Use the "cover-up" method to find the intercepts.</p>
                 <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li><strong>x-intercept:</strong> ?</li>
                    <li><strong>y-intercept:</strong> ?</li>
                </ul>
                <div className="text-xs mt-2 text-slate-500">
                    <p><strong>Answer:</strong> x-intercept is (4, 0), y-intercept is (0, 2).</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graphing-using-intercepts" 
            slideTitle="Graphing a Line Using Intercepts" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intercepts"
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