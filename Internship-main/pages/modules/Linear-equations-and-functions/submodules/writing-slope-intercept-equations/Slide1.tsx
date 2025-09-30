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
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Be a Graph Detective: Finding the Equation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Theory and Example Walkthrough */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Your Mission</h3>
                <p className="mt-2">When you see a line on a graph, your mission is to find its "secret code"—the equation <InlineMath>{'y = mx + b'}</InlineMath>. To do this, you need to find two clues:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li><strong>Clue #1:</strong> The y-intercept (<InlineMath>{'b'}</InlineMath>)</li>
                    <li><strong>Clue #2:</strong> The slope (<InlineMath>{'m'}</InlineMath>)</li>
                </ul>
            </div>
            <hr className="dark:border-slate-600"/>
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">The 3-Step Plan</h3>
                <div className="space-y-3 mt-2">
                    <p><strong>1. Find 'b':</strong> Look where the line crosses the vertical y-axis. This is your 'b'.</p>
                    <p><strong>2. Find 'm':</strong> Pick two "perfect points" on the line (where it crosses grid corners). Count the <InlineMath>{'\\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath> between them to get your 'm'.</p>
                    <p><strong>3. Build the Equation:</strong> Put the 'm' and 'b' you found into the <InlineMath>{'y=mx+b'}</InlineMath> formula.</p>
                </div>
            </div>
            <hr className="dark:border-slate-600"/>
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Example: Cracking the Code</h3>
                <p className="mt-2">Let's solve the mystery for the animation on the right:</p>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md mt-2 space-y-2">
                    <p><strong>Finding 'b':</strong> The line crosses the y-axis at -2. So, <InlineMath>{'b = -2'}</InlineMath>.</p>
                    <p><strong>Finding 'm':</strong> Using points <InlineMath>{'(0, -2)'}</InlineMath> and <InlineMath>{'(4, 1)'}</InlineMath>, we Rise 3 and Run 4. So, <InlineMath>{'m = \\frac{3}{4}'}</InlineMath>.</p>
                    <p><strong>The Equation:</strong> With <InlineMath>{'m=\\frac{3}{4}'}</InlineMath> and <InlineMath>{'b=-2'}</InlineMath>, the final equation is <InlineMath>{'y = \\frac{3}{4}x - 2'}</InlineMath>.</p>
                </div>
            </div>
          </div>

          {/* Right Column: Simplified Animation Steps */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-center text-blue-700 dark:text-blue-400 mb-4">Live Animation: Building the Equation</h3>
            
            <div className="flex-grow bg-slate-50 dark:bg-slate-700 rounded-lg p-6 flex flex-col justify-center space-y-6 border border-slate-200 dark:border-slate-600">
              
              {/* Animation Step 1 */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl">📍</span>
                <div>
                  <h4 className="font-bold text-lg">Step 1: Find 'b'</h4>
                  <p className="text-slate-700 dark:text-slate-300">We lock in our starting point at the y-intercept: <InlineMath>{'(0, -2)'}</InlineMath>.</p>
                </div>
              </div>

              <hr className="dark:border-slate-500"/>

              {/* Animation Step 2 */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl">↗️</span>
                <div>
                  <h4 className="font-bold text-lg">Step 2: Find 'm'</h4>
                  <p className="text-slate-700 dark:text-slate-300">We move <strong>UP 3</strong> and <strong>RIGHT 4</strong> to find the next point. Our slope is <InlineMath>{'m = \\frac{3}{4}'}</InlineMath>.</p>
                </div>
              </div>

              <hr className="dark:border-slate-500"/>

              {/* Animation Step 3 */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl">✅</span>
                <div>
                  <h4 className="font-bold text-lg">Step 3: Build the Equation</h4>
                  <p className="text-slate-700 dark:text-slate-300">We combine our clues to get the final answer: <InlineMath>{'y = \\frac{3}{4}x - 2'}</InlineMath>.</p>
                </div>
              </div>

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