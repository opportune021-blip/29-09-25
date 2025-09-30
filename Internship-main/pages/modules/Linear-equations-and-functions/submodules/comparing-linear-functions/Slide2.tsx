import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ComparingLinearFunctionsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'comparing-slopes', conceptId: 'comparing-slopes', conceptName: 'Comparing Slopes (Rates of Change)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-6">Comparing Slopes: Who is Faster or Steeper?</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">By comparing the slope ('m'), you can quickly see which function is changing faster.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: The Theory and Visuals */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">How to Compare Slopes</h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold text-lg">1. Look at the Sign (+ or -) for DIRECTION</h4>
                  <ul className="list-disc pl-5 mt-1 text-xs">
                    <li><strong>Positive (+):</strong> Increasing (earning, filling a tank).</li>
                    <li><strong>Negative (-):</strong> Decreasing (spending, draining a tank).</li>
                  </ul>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold text-lg">2. Look at the Number for SPEED</h4>
                  <p className="mt-1 text-sm">A **bigger number** (ignoring the sign) means a **faster** change and a **steeper** line.</p>
              </div>
            </div>
            {/* Visual Graphs for Examples */}
            <div className="mt-4 flex-grow flex flex-col justify-around">
                <h4 className="font-semibold text-center text-slate-600 dark:text-slate-300">Visualizing the Examples</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border dark:border-slate-600 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold">Travel Speeds</p>
                         <p className="text-xs mt-1">The Train's line (<InlineMath>{'m=1.2'}</InlineMath>) is steeper.</p>
                    </div>
                    <div className="border dark:border-slate-600 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold">Phone Battery</p>
                         <p className="text-xs mt-1">Charging (<InlineMath>{'m=2'}</InlineMath>) is steeper than draining (<InlineMath>{'m=-0.5'}</InlineMath>).</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Real-World Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Navi Mumbai Examples</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Example 1: Comparing Travel Speeds</h4>
                  <p className="text-sm mt-1">Priya's trip from Vashi to Panvel:</p>
                  <ul className="list-disc pl-5 mt-1 text-xs">
                    <li><strong>Train:</strong> <InlineMath>{'d(t) = 1.2t'}</InlineMath> (Slope = 1.2)</li>
                    <li><strong>Bus:</strong> <InlineMath>{'d(t) = 0.5t'}</InlineMath> (Slope = 0.5)</li>
                  </ul>
                  <p className="text-sm mt-2"><strong>Comparison:</strong> Since <InlineMath>{'1.2 > 0.5'}</InlineMath>, the train's slope is bigger.</p>
                  <p className="font-bold text-sm mt-1">Conclusion: The train travels faster.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">Example 2: Comparing Negative Slopes</h4>
                  <p className="text-sm mt-1">Aarav and Ben are spending money at an arcade in Seawoods Mall:</p>
                  <ul className="list-disc pl-5 mt-1 text-xs">
                    <li><strong>Aarav:</strong> <InlineMath>{'y = -50t + 500'}</InlineMath> (Slope = -50)</li>
                    <li><strong>Ben:</strong> <InlineMath>{'y = -75t + 500'}</InlineMath> (Slope = -75)</li>
                  </ul>
                  <p className="text-sm mt-2"><strong>Comparison:</strong> Both slopes are negative. We compare the values: <InlineMath>{'|-75| > |-50|'}</InlineMath>.</p>
                  <p className="font-bold text-sm mt-1">Conclusion: Ben is spending money at a faster rate.</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h4 className="font-semibold">Check Your Understanding</h4>
                <p className="text-sm mt-1">Two tutors offer classes. Tutor A's fee is <InlineMath>{'y=400x+500'}</InlineMath>. Tutor B's fee is <InlineMath>{'y=450x+200'}</InlineMath>.</p>
                <p className="text-xs mt-2"><strong>(a) Who has a higher hourly rate?</strong> Tutor B, because their slope (450) is greater than Tutor A's (400).</p>
                <p className="text-xs mt-1"><strong>(b) Who has a higher one-time registration fee?</strong> Tutor A, because their y-intercept (500) is greater than Tutor B's (200).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="comparing-slopes" 
            slideTitle="Comparing Slopes (Rates of Change)" 
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