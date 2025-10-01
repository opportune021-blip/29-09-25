import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ComparingLinearFunctionsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'functions-in-different-forms', conceptId: 'functions-in-different-forms', conceptName: 'Functions in Different Forms', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Functions in Different Forms</h2>
        */} <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">A single function is like one story that can be told in many different ways. Let's look at the story of an auto-rickshaw ride.</p>
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Equation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">1. As an Equation (The Master Rule)</h3>
            <p className="mt-2 text-center text-xl p-2 bg-slate-100 dark:bg-slate-700 rounded-md font-mono"><InlineMath>{'C(k) = 15k + 25'}</InlineMath></p>
             <p className="text-xs text-center mt-1">Where 'k' is kilometers and 'C(k)' is the total cost.</p>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">2. As a Table (The Organized List)</h3>
            <table className="w-full mt-2 border text-center text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-1'>Kilometers (k)</th><th className='p-1'>Cost (C(k))</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-1'>0</td><td className='p-1'>₹25</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-1'>1</td><td className='p-1'>₹40</td></tr>
                    <tr><td className='border-r p-1'>2</td><td className='p-1'>₹55</td></tr>
                     <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-1'>3</td><td className='p-1'>₹70</td></tr>
                </tbody>
            </table>
          </div>

          {/* Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">3. As a Graph (The Visual Story)</h3>
            <div className="h-full min-h-[100px] bg-slate-100 dark:bg-slate-900/50 mt-2 rounded-lg flex items-center justify-center p-2 border">
                {/* Removed the img tag as requested */}
                <p className="text-slate-500 text-sm">[Imagine a graph here: a line starting at (0, 25) on the Y-axis and going up, showing the cost increasing with kilometers.]</p>
            </div>
          </div>

          {/* Words */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md flex items-center justify-center">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">4. In Words (The Scenario)</h3>
              <p className="mt-2 text-center p-4 bg-slate-100 dark:bg-slate-700 rounded-md">"An auto-rickshaw ride in Navi Mumbai has a starting fee of ₹25, plus ₹15 for every kilometer traveled."</p>
            </div>
          </div>
        </div>
        <p className="text-center mt-4 p-2 bg-blue-100 dark:bg-blue-900/50 rounded-md font-semibold">All four representations describe the exact same function!</p>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="functions-in-different-forms" 
            slideTitle="Functions in Different Forms" 
            moduleId="linear-equations-and-functions" 
            submoduleId="comparing-linear-functions"
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