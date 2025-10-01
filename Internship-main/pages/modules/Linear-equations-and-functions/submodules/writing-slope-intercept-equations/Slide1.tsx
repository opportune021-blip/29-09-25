import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function WritingSlopeInterceptSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'equation-from-graph', conceptId: 'equation-from-graph', conceptName: 'Writing an Equation from a Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      // Applied slate background theme to the main container
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-y-auto">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Be a Graph Detective: Finding the Equation</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The How-To Guide */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Your Mission</h3>
                <p className="mt-2 text-sm">When you see a line on a graph, your mission is to find its "secret code"—the equation <InlineMath>{'y = mx + b'}</InlineMath>.</p>
                <ul className="list-disc pl-5 mt-2 text-xs">
                    <li><strong>Clue #1:</strong> The y-intercept (<InlineMath>{'b'}</InlineMath>)</li>
                    <li><strong>Clue #2:</strong> The slope (<InlineMath>{'m'}</InlineMath>)</li>
                </ul>
            </div>
            <hr className="dark:border-slate-600"/>
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">The 3-Step Plan</h3>
                <ol className="space-y-2 mt-2 text-sm list-decimal pl-5">
                    <li><strong>Find 'b':</strong> Look where the line crosses the vertical y-axis.</li>
                    <li><strong>Find 'm':</strong> Pick two "perfect points" and count the <InlineMath>{'\\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath>.</li>
                    <li><strong>Build the Equation:</strong> Put 'm' and 'b' into the formula.</li>
                </ol>
            </div>
            <hr className="dark:border-slate-600"/>
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Detective's Tip: Double-Check Your Clues</h3>
                 <p className="mt-2 text-sm">After you find your equation, prove it's correct!</p>
                 <ol className="list-decimal pl-5 mt-2 text-xs space-y-1">
                     <li>Find your equation (e.g., <InlineMath>{'y = 2x + 1'}</InlineMath>).</li>
                     <li>Pick another point on the graph you didn't use (e.g., (3, 7)).</li>
                     <li>Substitute the point into your equation: <InlineMath>{'7 = 2(3) + 1'}</InlineMath>.</li>
                     <li>Does it work? <InlineMath>{'7 = 6 + 1 \\implies 7 = 7'}</InlineMath>. Yes! Your equation is correct.</li>
                 </ol>
            </div>
          </div>

          {/* Right Column: Case Files */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 text-center">Case Files: Solved Mysteries</h3>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="font-bold">Case File #1: An Uphill Slope</h4>
                <p className="text-sm mt-1">A line crosses the y-axis at (0, -2) and passes through (4, 1).</p>
                <ul className="list-disc pl-5 mt-2 text-xs">
                    <li><strong>Finding 'b':</strong> The line crosses at -2. So, <InlineMath>{'b = -2'}</InlineMath>.</li>
                    <li><strong>Finding 'm':</strong> To get from (0, -2) to (4, 1), we go UP 3 (Rise = 3) and RIGHT 4 (Run = 4). So, <InlineMath>{'m = \\frac{3}{4}'}</InlineMath>.</li>
                </ul>
                <p className="font-bold text-center mt-2 p-1 bg-blue-100 dark:bg-blue-900/50 rounded-md">Equation: <InlineMath>{'y = \\frac{3}{4}x - 2'}</InlineMath></p>
            </div>

             <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="font-bold">Case File #2: A Downhill Slope</h4>
                <p className="text-sm mt-1">A line crosses the y-axis at (0, 1) and passes through (3, -1).</p>
                <ul className="list-disc pl-5 mt-2 text-xs">
                    <li><strong>Finding 'b':</strong> The line crosses at +1. So, <InlineMath>{'b = 1'}</InlineMath>.</li>
                    <li><strong>Finding 'm':</strong> To get from (0, 1) to (3, -1), we go DOWN 2 (Rise = -2) and RIGHT 3 (Run = 3). So, <InlineMath>{'m = -\\frac{2}{3}'}</InlineMath>.</li>
                </ul>
                <p className="font-bold text-center mt-2 p-1 bg-blue-100 dark:bg-blue-900/50 rounded-md">Equation: <InlineMath>{'y = -\\frac{2}{3}x + 1'}</InlineMath></p>
            </div>
          </div>
        </div>

        {/* Special Cases Challenge */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mt-8">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 text-center">Special Cases Challenge</h3>
            <p className="text-sm text-center mt-2">It's 4:15 PM on a Wednesday. Can you identify the equation for these special lines?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-xs">
                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <p><strong>Challenge 1:</strong> A perfectly flat (horizontal) line that crosses the y-axis at y = 5.</p>
                    <p className="italic mt-1">Answer Hint: A flat line has a slope of 0. The equation is just <InlineMath>{'y=5'}</InlineMath>.</p>
                </div>
                 <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <p><strong>Challenge 2:</strong> A perfectly straight (vertical) line that crosses the x-axis at x = -3.</p>
                    <p className="italic mt-1">Answer Hint: A vertical line has an undefined slope. Its equation is just <InlineMath>{'x=-3'}</InlineMath>.</p>
                </div>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="equation-from-graph" 
            slideTitle="Writing an Equation from a Graph" 
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