import React, { useState } from 'react'; // FIX: Correctly imports both React and the useState hook.
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearModelsSlide2() {
    // FIX: Correctly declares 'localInteractions' and its update function, 'setLocalInteractions'.
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'scatter-plots-and-trends', conceptId: 'scatter-plots-and-trends', conceptName: 'Scatter Plots and Trends', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        // FIX: Now correctly uses the 'setLocalInteractions' function.
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Scatter Plots and Trends: Finding Patterns in Messy Data</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-8">Let's learn how to find patterns in real-world data that isn't perfectly linear.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          
          {/* Left Column: Core Concepts */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">What is a Scatter Plot?</h3>
                <p className="mt-2 text-sm">A scatter plot is a graph showing a "cloud of points." It helps us see if there's a relationship between two sets of data. Each point represents two pieces of information about one thing. For example, a point at <InlineMath>{'(3, 85)'}</InlineMath> could represent one student who studied for 3 hours and scored 85 marks.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">What is the Goal?</h3>
                <p className="mt-2 text-sm">When looking at the cloud of points, our goal as "data detectives" is to find a **trend**, which is a general pattern or direction in the data.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">What is a Line of Best Fit?</h3>
                <p className="mt-2 text-sm">When we see a trend, we can draw a single straight line through the middle of the points called the **Line of Best Fit**. This line acts as our linear model (<InlineMath>{'y=mx+b'}</InlineMath>) for the messy data, allowing us to make educated guesses or predictions.</p>
            </div>
          </div>

          {/* Right Column: The Three Types of Trends */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 text-center mb-4">The Three Types of Trends</h3>
            <div className="space-y-4 overflow-y-auto pr-2">
              
              {/* Positive Trend */}
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">1. Positive Trend (Positive Correlation)</h4>
                  <p className="text-sm mt-1">This is when the points form a cloud that generally goes **uphill**. As one value increases, the other also tends to increase.</p>
                  <p className="text-xs mt-1"><em>**Example:** As temperature rises, sugarcane juice sales at Vashi station also tend to rise.</em></p>
              </div>

              {/* Negative Trend */}
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">2. Negative Trend (Negative Correlation)</h4>
                  <p className="text-sm mt-1">This is when the points form a cloud that generally goes **downhill**. As one value increases, the other tends to decrease.</p>
                  <p className="text-xs mt-1"><em>**Example:** As the distance from Palm Beach Road increases, apartment prices tend to decrease.</em></p>
              </div>

              {/* No Trend */}
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h4 className="font-semibold">3. No Trend (No Correlation)</h4>
                  <p className="text-sm mt-1">The points are scattered randomly with no clear direction. The two values are likely unrelated.</p>
                  <p className="text-xs mt-1"><em>**Example:** The number of ships at JNPT port and the number of visitors at Inorbit Mall.</em></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="scatter-plots-and-trends" 
            slideTitle="Scatter Plots and Trends" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-models"
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