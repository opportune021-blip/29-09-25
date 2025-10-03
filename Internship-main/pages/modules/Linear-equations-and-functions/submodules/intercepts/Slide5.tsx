import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse, InteractionType } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// A simple graph for the visual question
const AssessmentGraph = () => {
    const viewBoxSize = 5;
    return (
        <div className="max-w-[250px] mx-auto my-4 p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-300 dark:border-slate-600">
            <svg viewBox={`${-viewBoxSize} ${-viewBoxSize} ${viewBoxSize * 2} ${viewBoxSize * 2}`}>
                <g transform="scale(1, -1)">
                    <line x1={-viewBoxSize} y1="0" x2={viewBoxSize} y2="0" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="0.1" />
                    <line x1="0" y1={-viewBoxSize} x2="0" y2={viewBoxSize} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="0.1" />
                    <line x1="-2" y1="-5" x2="6" y2="5" className="stroke-blue-500 dark:stroke-blue-400" strokeWidth="0.2" />
                    <circle cx={3} cy="0" r="0.2" className="fill-current text-slate-800 dark:text-slate-200" />
                    <circle cx="0" cy="-3.75" r="0.2" className="fill-current text-slate-800 dark:text-slate-200" />
                </g>
            </svg>
        </div>
    );
};

// Enhanced Question type definition
type Question = {
    id: string;
    questionType: 'text' | 'multiple-choice' | 'dropdown' | 'visual-text';
    questionText: React.ReactNode;
    image?: React.ReactNode;
    options?: string[];
    prompt?: string;
    inputType: InteractionType;
    required: boolean;
};

// The comprehensive set of questions is now part of this component
const assessmentQuestions: Question[] = [
    {
        id: 'q1-y-intercept-calc',
        questionType: 'text',
        questionText: <>Find the y-intercept of the equation <InlineMath>{'y = 3x - 12'}</InlineMath>.</>,
        prompt: 'Enter your answer as a coordinate point, e.g., (x, y)',
        inputType: 'learning',
        required: true,
    },
    {
        id: 'q2-visual-x-intercept',
        questionType: 'visual-text',
        questionText: <>Look at the graph. What are the coordinates of the <strong>x-intercept</strong>?</>,
        image: <AssessmentGraph />,
        prompt: 'Enter your answer as a coordinate point, e.g., (x, y)',
        inputType: 'learning',
        required: true,
    },
    {
        id: 'q3-word-problem',
        questionType: 'multiple-choice',
        questionText: <>The value of a new car is modeled by <InlineMath>{'V = 40000 - 2500t'}</InlineMath>, where V is the value and t is time in years. What does the V-intercept represent?</>,
        options: ['The years until the car is worthless', 'The initial price of the car', 'How much the value decreases each year'],
        inputType: 'learning',
        required: true,
    },
    {
        id: 'q4-special-case',
        questionType: 'text',
        questionText: <>What is the x-intercept of the line <InlineMath>{'y = 7'}</InlineMath>?</>,
        prompt: 'If none exists, type "None"',
        inputType: 'learning',
        required: true,
    },
    {
        id: 'q5-identify-from-point',
        questionType: 'dropdown',
        questionText: <>A graph shows a line passing through the point <InlineMath>{'(-4, 0)'}</InlineMath>. Is this point the x-intercept or the y-intercept?</>,
        options: ['Select an answer...', 'x-intercept', 'y-intercept'],
        inputType: 'learning',
        required: true,
    },
];

// The component is now self-contained and does not need props
export default function InterceptsAssessment() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    
    // Define a single interaction for the entire assessment slide to fix rendering bug
    const slideInteractions: Interaction[] = [{
        id: 'intercepts-assessment-container',
        conceptId: 'intercepts-assessment',
        conceptName: 'Intercepts Assessment',
        type: 'learning'
    }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Assessment: Intercepts</h2>
         */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow overflow-y-auto">
          <p className="mb-4 text-center">Answer the following questions to test your knowledge.</p>
          <div className="space-y-8">
            {assessmentQuestions.map((q, index) => (
              <div key={q.id}>
                <label htmlFor={q.id} className="block font-semibold">Question {index + 1}: {q.questionText}</label>
                
                {q.image && <div className="mt-2">{q.image}</div>}
                
                {q.questionType === 'text' || q.questionType === 'visual-text' ? (
                    <input id={q.id} type="text" className="mt-2 p-2 w-full md:w-3/4 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600" placeholder={q.prompt}/>
                ) : q.questionType === 'multiple-choice' ? (
                    <div id={q.id} className="mt-2 space-y-2">
                        {q.options?.map((opt: string) => (
                            <div key={opt} className="flex items-center">
                                <input type="radio" id={`${q.id}-${opt}`} name={q.id} value={opt} className="mr-2"/>
                                <label htmlFor={`${q.id}-${opt}`}>{opt}</label>
                            </div>
                        ))}
                    </div>
                ) : q.questionType === 'dropdown' ? (
                    <select id={q.id} className="mt-2 p-2 w-full md:w-3/4 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600">
                        {q.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="intercepts-assessment" 
            slideTitle="Intercepts Assessment" 
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