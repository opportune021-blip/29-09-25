import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse, InteractionType } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';

// Define the type for a single question object
type Question = {
    id: string;
    questionText: string;
    inputType: InteractionType;
    required: boolean;
};

// Define the type for the props the component receives
type Props = {
    questions?: Question[]; // Made optional to prevent errors in the index file
};

// This is a simplified assessment component. The questions are passed in via props from the index.tsx file.
export default function SlopeAssessment({ questions }: Props) {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = questions ? questions.map((q: Question) => ({...q, conceptId: 'slope-assessment', conceptName: 'Slope Assessment', type: q.inputType})) : [];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Assessment: Slope</h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
          <p className="mb-4">Answer the following questions to test your knowledge.</p>
          <div className="space-y-6">
            {questions && questions.map((question: Question, index: number) => (
              <div key={question.id}>
                <label htmlFor={question.id} className="block font-semibold text-lg">Question {index + 1}:</label>
                <p className="mt-1">{question.questionText}</p>
                <input
                  id={question.id}
                  type="text"
                  className="mt-2 p-2 w-full md:w-1/2 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                  placeholder="Type your answer here..."
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="slope-assessment" 
            slideTitle="Slope Assessment" 
            moduleId="linear-equations-and-functions" 
            submoduleId="slope"
            interactions={localInteractions}
        >
            {/* FIX: Conditionally render TrackedInteraction only if interactions exist */}
            {slideInteractions.length > 0 ? (
                <TrackedInteraction 
                    interaction={slideInteractions[0]} // This is now safe
                    onInteractionComplete={handleInteractionComplete}
                >
                    {slideContent}
                </TrackedInteraction>
            ) : (
                // If there are no interactions, just render the content without tracking
                slideContent
            )}
        </SlideComponentWrapper>
    );
}