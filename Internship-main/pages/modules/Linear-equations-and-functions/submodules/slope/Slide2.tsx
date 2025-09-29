import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SlopeSlide2_CompleteGuide() {
    const slideInteractions: Interaction[] = [{ id: 'finding-slope-from-graph-complete', conceptId: 'finding-slope-from-graph', conceptName: 'Complete Guide to Finding Slope from a Graph', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-4">A Complete Guide to Finding Slope from a Graph</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
            Let's master the "Rise over Run" method. It's a simple counting skill that works for any straight line.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Main Method & Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">The 5-Step Method</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li><strong>Find</strong> two "perfect points" on the line.</li>
                    <li><strong>Imagine</strong> a right-angled triangle connecting them.</li>
                    <li><strong>Count the Rise</strong> (Up is +, Down is -).</li>
                    <li><strong>Count the Run</strong> (to the right).</li>
                    <li><strong>Divide</strong> Rise by Run and simplify.</li>
                </ol>
            </div>
            
            <hr className="border-slate-300 dark:border-slate-600"/>

            <div>
                <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400">Positive Slope (Uphill)</h4>
                <p className="text-xs mt-1">Line through (1, 2) and (3, 6)</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded p-2 mt-2">
                    <p><strong>Rise:</strong> +4, <strong>Run:</strong> 2</p>
                    <p className="text-center font-bold"><InlineMath>{'\\text{Slope} = \\frac{4}{2} = 2'}</InlineMath></p>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400">Negative Slope (Downhill)</h4>
                <p className="text-xs mt-1">Line through (0, 5) and (2, 1)</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded p-2 mt-2">
                    <p><strong>Rise:</strong> -4, <strong>Run:</strong> 2</p>
                    <p className="text-center font-bold"><InlineMath>{'\\text{Slope} = \\frac{-4}{2} = -2'}</InlineMath></p>
                </div>
            </div>
          </div>

          {/* Right Column: Special Cases & Quick Tips */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Special Cases</h3>
            <div>
                <h4 className="font-semibold text-lg">Zero Slope (Flat Line)</h4>
                <p className="text-xs mt-1">A horizontal line through (1, 4) and (5, 4)</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded p-2 mt-2">
                    <p><strong>Rise:</strong> 0, <strong>Run:</strong> 4</p>
                    <p className="text-center font-bold"><InlineMath>{'\\text{Slope} = \\frac{0}{4} = 0'}</InlineMath></p>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-lg">Undefined Slope (Vertical Line)</h4>
                <p className="text-xs mt-1">A vertical line through (3, 2) and (3, 7)</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded p-2 mt-2">
                    <p><strong>Rise:</strong> 5, <strong>Run:</strong> 0</p>
                    <p className="text-center font-bold"><InlineMath>{'\\text{Slope} = \\frac{5}{0} \\rightarrow \\text{Undefined!}'}</InlineMath></p>
                </div>
            </div>
            
            <hr className="border-slate-300 dark:border-slate-600"/>

            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-center text-blue-800 dark:text-blue-300">Quick Tips to Remember</h4>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                    <li>If the line goes **uphill**, the slope is **positive**. If it's **downhill**, the slope is **negative**.</li>
                    <li>Always simplify your final fraction.</li>
                </ul>
            </div>
          </div>

        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-slope-from-graph-complete" 
            slideTitle="Complete Guide to Finding Slope from a Graph" 
            moduleId="linear-equations-and-functions" 
            submoduleId="slope"
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