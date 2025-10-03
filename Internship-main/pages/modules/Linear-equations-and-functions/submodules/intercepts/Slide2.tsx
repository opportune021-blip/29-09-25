import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Type definition for the graph component's props
type InterceptGraphProps = {
    xIntercept: number;
    yIntercept: number;
    lineColor?: string;
};

// The reusable graph component
const InterceptGraph = ({ xIntercept, yIntercept, lineColor = 'stroke-blue-500 dark:stroke-blue-400' }: InterceptGraphProps) => {
    const viewBoxSize = 6;
    const lineX1 = xIntercept !== 0 ? -viewBoxSize : 0;
    const lineY1 = yIntercept + (lineX1 / xIntercept) * -yIntercept;
    const lineX2 = xIntercept !== 0 ? viewBoxSize : 0;
    const lineY2 = yIntercept + (lineX2 / xIntercept) * -yIntercept;

    return (
        <div className="relative w-full aspect-square p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-600">
            <svg viewBox={`${-viewBoxSize} ${-viewBoxSize} ${viewBoxSize * 2} ${viewBoxSize * 2}`} className="w-full h-full">
                <g transform="scale(1, -1)">
                    <g>
                        {Array.from({ length: viewBoxSize * 2 - 1 }, (_, i) => i - (viewBoxSize - 1)).map(i => (
                            <g key={i}>
                                <line x1={i} y1={-viewBoxSize} x2={i} y2={viewBoxSize} className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="0.05" />
                                <line x1={-viewBoxSize} y1={i} x2={viewBoxSize} y2={i} className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="0.05" />
                            </g>
                        ))}
                    </g>
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


export default function InterceptsSlide2() {
    const slideInteractions: Interaction[] = [{ id: 'finding-from-graph', conceptId: 'finding-from-graph', conceptName: 'Finding Intercepts from a Graph', type: 'learning' }];
    
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        {/* --- Main container restored to a 2-column grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* --- LEFT COLUMN: All instructional content --- */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Simple Method</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-lg">1. Find the y-intercept</h4>
                        <p className="mt-1">Look where the line crosses the tall <strong>y-axis</strong>. <br/><span className="font-bold">The x-value will always be 0.</span></p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">2. Find the x-intercept</h4>
                        <p className="mt-1">Look where the line crosses the flat <strong>x-axis</strong>. <br/><span className="font-bold">The y-value will always be 0.</span></p>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-300">Why Do Intercepts Matter?</h4>
                <p className="mt-2 text-sm">Intercepts represent important real-world values:</p>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li>The <strong>y-intercept</strong> is often a <strong>starting point</strong> (e.g., an initial investment).</li>
                    <li>The <strong>x-intercept</strong> is often a <strong>break-even</strong> or <strong>end point</strong> (e.g., when a loan is paid off).</li>
                </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-300">Exploring More Cases</h4>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li>A <strong>curved graph</strong> can have multiple x-intercepts.</li>
                    <li>A <strong>horizontal line</strong> (e.g. y=3) has a y-intercept but no x-intercept.</li>
                    <li>A <strong>vertical line</strong> (e.g. x=2) has an x-intercept but no y-intercept.</li>
                </ul>
            </div>
          </div>
          
          {/* --- RIGHT COLUMN: All visual examples and practice --- */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example Graph</h3>
                <div className="max-w-xs mx-auto">
                    <InterceptGraph xIntercept={2} yIntercept={4} />
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-t border-slate-200 dark:border-slate-700 rounded-b-lg p-3 mt-3 text-center text-sm">
                    <p>y-intercept: <InlineMath>{'(0, 4)'}</InlineMath> | x-intercept: <InlineMath>{'(2, 0)'}</InlineMath></p>
                </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-6 border border-yellow-300 dark:border-yellow-700 shadow-md">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Your Turn</h4>
                <p className="mt-1 text-sm">Look at the graph below. What are the intercepts?</p>
                <div className="max-w-xs mx-auto my-2">
                     <InterceptGraph xIntercept={-3} yIntercept={2} lineColor="stroke-yellow-500 dark:stroke-yellow-400"/>
                </div>
                <p className="text-xs mt-1 text-slate-500 text-center">(Answer: y-intercept is (0, 2), x-intercept is (-3, 0))</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-from-graph" 
            slideTitle="Finding Intercepts from a Graph" 
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