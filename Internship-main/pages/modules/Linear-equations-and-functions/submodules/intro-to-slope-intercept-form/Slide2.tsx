import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function IntroSlopeInterceptSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'understanding-m', conceptId: 'understanding-m', conceptName: 'Understanding Slope (m)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Understanding Slope (m): The Engine of the Line</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The "Personality" of Slope */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The 'Personality' of m</h3>
            <p className="mb-4">In <InlineMath>{'y = mx + b'}</InlineMath>, the slope <InlineMath>{'m'}</InlineMath> tells you the line's story: its direction and steepness.</p>
            
            <h4 className="font-bold mt-2">Part 1: The Sign (Direction)</h4>
            <div className="mt-2 space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h5 className="font-bold text-blue-700 dark:text-blue-300">Positive Slope (Uphill 📈)</h5>
                    <p className="text-sm">When <InlineMath>{'m'}</InlineMath> is positive, the line goes **UPHILL**. Think of earning money—for every day that passes, your savings go up.</p>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <h5 className="font-bold">Negative Slope (Downhill 📉)</h5>
                    <p className="text-sm">When <InlineMath>{'m'}</InlineMath> is negative, the line goes **DOWNHILL**. Think of a phone's battery—for every hour you use it, the percentage goes down.</p>
                </div>
            </div>

            <h4 className="font-bold mt-6">Part 2: The Size (Steepness)</h4>
            <div className="mt-2 text-sm space-y-2">
                <p>➡️ <strong className="text-blue-600 dark:text-blue-400">Large <InlineMath>{'m'}</InlineMath></strong> (like 5 or -4): The line is **very steep**, like climbing a mountain. The "rise" is bigger than the "run".</p>
                <p>➡️ <strong className="text-blue-600 dark:text-blue-400">Small <InlineMath>{'m'}</InlineMath></strong> (a fraction like <InlineMath>{'\\frac{1}{3}'}</InlineMath>): The line is **very gentle**, like a wheelchair ramp. The "run" is bigger than the "rise".</p>
            </div>
          </div>

          {/* Right Column: Slope in the Real World */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1">The Most Important Idea: 'm' as a Rate of Change</h3>
            <p className="text-sm">In the real world, slope is a **rate**. It's the "per" number that tells you how much one thing changes compared to another.</p>
            
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                <p className="font-semibold">Example: Auto-Rickshaw Fare</p>
                <p className="text-sm">In our formula <InlineMath>{'y = 15x + 23'}</InlineMath>, the slope <InlineMath>{'m=15'}</InlineMath>. This is the rate of **₹15 per kilometer**.</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                <p className="font-semibold">Example: Leaking Water Tank</p>
                <p className="text-sm">For <InlineMath>{'y = -5x + 100'}</InlineMath>, the slope <InlineMath>{'m=-5'}</InlineMath>. This is the rate of losing **5 litres per hour**.</p>
            </div>
            
            <h4 className="font-bold pt-4">Quick Summary</h4>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-900">
                            <th className="p-2 border border-slate-300 dark:border-slate-600">If `m` is...</th>
                            <th className="p-2 border border-slate-300 dark:border-slate-600">The line is...</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="p-2 border border-slate-300 dark:border-slate-600">Positive</td><td className="p-2 border border-slate-300 dark:border-slate-600">Going **uphill** (increasing)</td></tr>
                        <tr><td className="p-2 border border-slate-300 dark:border-slate-600">Negative</td><td className="p-2 border border-slate-300 dark:border-slate-600">Going **downhill** (decreasing)</td></tr>
                        <tr><td className="p-2 border border-slate-300 dark:border-slate-600">A Large Number</td><td className="p-2 border border-slate-300 dark:border-slate-600">Very **steep**</td></tr>
                        <tr><td className="p-2 border border-slate-300 dark:border-slate-600">A Small Fraction</td><td className="p-2 border border-slate-300 dark:border-slate-600">Very **gentle / shallow**</td></tr>
                    </tbody>
                </table>
            </div>

          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="understanding-m" 
            slideTitle="Understanding Slope (m)" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intro-to-slope-intercept-form"
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