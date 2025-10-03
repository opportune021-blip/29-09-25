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
                    <line x1="-3" y1="-3" x2="3" y2="3" className="stroke-blue-500 dark:stroke-blue-400" strokeWidth="0.2" />
                    <circle cx="0" cy="0" r="0.2" className="fill-current text-slate-800 dark:text-slate-200" />
                    <circle cx="2" cy="2" r="0.2" className="fill-current text-slate-800 dark:text-slate-200" />
                </g>
            </svg>
        </div>
    );
};

// Define the type for a single question object
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

// Define the type for the props the component receives
type Props = {
    questions?: Question[];
};


export default function SlopeAssessment({ questions: questionsFromProps }: Props) {
    // --- All questions are now included directly in this file ---
    const defaultQuestions: Question[] = [
        {
            id: 'slope-q1-calc-points',
            questionType: 'text',
            questionText: <>Calculate the slope of the line that passes through the points <InlineMath>(1, 2)</InlineMath> and <InlineMath>(5, 10)</InlineMath>.</>,
            prompt: 'Enter your answer as a number...',
            inputType: 'learning',
            required: true,
        },
        {
            id: 'slope-q2-visual-calc',
            questionType: 'visual-text',
            questionText: "By counting the 'Rise over Run' on the graph, what is the slope of the line?",
            image: <AssessmentGraph />,
            prompt: 'Enter your answer as a number...',
            inputType: 'learning',
            required: true,
        },
        {
            id: 'slope-q3-from-equation',
            questionType: 'text',
            questionText: <>What is the slope of the line given by the equation <InlineMath>{'y = -4x + 7'}</InlineMath>?</>,
            prompt: 'Enter your answer as a number...',
            inputType: 'learning',
            required: true,
        },
        {
            id: 'slope-q4-steepness-check',
            questionType: 'dropdown',
            questionText: <>True or False: A line with a slope of <InlineMath>m = -5</InlineMath> is steeper than a line with a slope of <InlineMath>m = 4</InlineMath>.</>,
            options: ['Select...', 'True', 'False'],
            inputType: 'learning',
            required: true,
        },
        {
            id: 'slope-q5-word-problem',
            questionType: 'multiple-choice',
            questionText: "The temperature in Navi Mumbai is rising at a rate of 2°C per hour. If this is graphed, what would the slope be?",
            options: ['2', '-2', '1/2', 'Cannot be determined'],
            inputType: 'learning',
            required: true,
        },
        {
            id: 'slope-q6-undefined',
            questionType: 'text',
            questionText: 'A perfectly vertical line has a slope that is _______.',
            prompt: 'Type your answer here...',
            inputType: 'learning',
            required: true,
        }
    ];
    
    const questions = questionsFromProps || defaultQuestions;

    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    
    const slideInteractions: Interaction[] = [{
        id: 'slope-assessment-container',
        conceptId: 'slope-assessment',
        conceptName: 'Slope Assessment',
        type: 'learning'
    }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Assessment: Slope</h2>
        */} 
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow overflow-y-auto">
          <p className="mb-4 text-center">Answer the following questions to test your knowledge.</p>
          <div className="space-y-8">
            {questions.map((q, index) => (
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
            slideId="slope-assessment" 
            slideTitle="Slope Assessment" 
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