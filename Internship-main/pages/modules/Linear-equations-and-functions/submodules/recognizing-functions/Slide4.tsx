import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function RecognizingFunctionsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'functions-from-mapping-diagrams', conceptId: 'functions-from-mapping-diagrams', conceptName: 'Recognizing Functions from Mapping Diagrams', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Recognizing Functions from Mapping Diagrams</h2>
        
        {/* The How-To Guide */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mb-8">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">How to Check a Mapping Diagram in 4 Steps</h3>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                <li>Look at the Domain (or Inputs) on the left.</li>
                <li>Go through each input one by one.</li>
                <li>Count the number of arrows coming out of that single input.</li>
                <li>If every input has exactly one arrow coming out, it's a function. If any input has two or more, it is not a function.</li>
            </ol>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: IS a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">✅ IS a Function</h3>
            <p className="text-sm">Each input has only one arrow leaving it.</p>
            <div className="flex-grow my-4 flex items-center justify-around">
                <div className="text-center"><div className="font-bold mb-2">Student</div><div className="border-2 border-slate-400 rounded-xl p-4 space-y-3"><div>Rohan</div><div>Priya</div><div>Sameer</div></div></div>
                <div className="text-2xl flex flex-col space-y-3"><span>→</span><span>→</span><span>→</span></div>
                <div className="text-center"><div className="font-bold mb-2">Favorite Juice</div><div className="border-2 border-slate-400 rounded-xl p-4 space-y-3"><div>Mango</div><div>Apple</div></div></div>
            </div>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm">Every student has only one favorite. It's okay that Rohan and Sameer both like Mango. This is a function.</p>
          </div>

          {/* Right Column: IS NOT a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">❌ IS NOT a Function</h3>
            <p className="text-sm">An input has two arrows coming out of it.</p>
            <div className="flex-grow my-4 flex items-center justify-around">
                <div className="text-center"><div className="font-bold mb-2">Student</div><div className="border-2 border-slate-400 rounded-xl p-4 space-y-3"><div>Student 1</div><div className="font-bold bg-slate-200 dark:bg-slate-600 rounded">Student 2</div></div></div>
                <div className="text-2xl flex flex-col space-y-3"><span>→</span><span className="font-bold">→</span><span className="font-bold">→</span></div>
                <div className="text-center"><div className="font-bold mb-2">Sports</div><div className="border-2 border-slate-400 rounded-xl p-4 space-y-3"><div>Cricket</div><div>Football</div><div>Hockey</div></div></div>
            </div>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-sm">'Student 2' is mapped to two different outputs (Football and Hockey). This breaks the rule.</p>
          </div>
        </div>

        {/* Connection to Ordered Pairs Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md mt-8">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Connection: From Diagram to Coordinates</h3>
            <p className="text-sm mt-2">The "one arrow out" rule for diagrams is the same as the "no repeated x-values" rule for ordered pairs!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-xs">
              <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="font-bold">Function:</p>
                <p className="font-mono mt-1"><InlineMath>{'\\{(Rohan, Mango), (Priya, Apple), (Sameer, Mango)\\}'}</InlineMath></p>
                <p>No `x` value is repeated.</p>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="font-bold">Not a Function:</p>
                <p className="font-mono mt-1"><InlineMath>{'\\{(S1, Cricket), (S2, Football), (S2, Hockey)\\}'}</InlineMath></p>
                <p>The `x` value 'S2' is repeated with different outputs.</p>
              </div>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="functions-from-mapping-diagrams" 
            slideTitle="Recognizing Functions from Mapping Diagrams" 
            moduleId="linear-equations-and-functions" 
            submoduleId="recognizing-functions"
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