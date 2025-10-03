import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- VISUAL COMPONENTS FOR THE ASSESSMENT ---
const GraphGallery = () => (
    <div className="grid grid-cols-2 gap-4 my-2">
        {/* Simple linear graph */}
        <div className="p-2 bg-slate-100 dark:bg-slate-900/50 rounded-md border border-slate-300 dark:border-slate-700">
            <svg viewBox="-5 -5 10 10"><line x1="-4" y1="4" x2="4" y2="-4" stroke="currentColor" strokeWidth="0.3" /></svg>
            <p className="text-center text-xs mt-1">Graph A</p>
        </div>
        {/* Simple parabola graph */}
        <div className="p-2 bg-slate-100 dark:bg-slate-900/50 rounded-md border border-slate-300 dark:border-slate-700">
            <svg viewBox="-5 -5 10 10"><path d="M -4 4 A 5 5 0 0 0 4 4" fill="none" stroke="currentColor" strokeWidth="0.3" /></svg>
            <p className="text-center text-xs mt-1">Graph B</p>
        </div>
    </div>
);

const DataTable = () => (
    <table className="w-full my-2 text-center text-sm border-collapse">
        <thead>
            <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="p-2 border border-slate-300 dark:border-slate-600">x</th>
                <th className="p-2 border border-slate-300 dark:border-slate-600">y</th>
            </tr>
        </thead>
        <tbody>
            <tr><td className="p-2 border border-slate-300 dark:border-slate-600">1</td><td className="p-2 border border-slate-300 dark:border-slate-600">5</td></tr>
            <tr><td className="p-2 border border-slate-300 dark:border-slate-600">2</td><td className="p-2 border border-slate-300 dark:border-slate-600">8</td></tr>
            <tr><td className="p-2 border border-slate-300 dark:border-slate-600">3</td><td className="p-2 border border-slate-300 dark:border-slate-600">11</td></tr>
        </tbody>
    </table>
);


// --- TYPES AND DATA ---
type Question = {
    id: string;
    questionType: 'text' | 'multiple-choice' | 'dropdown' | 'visual-multi-select';
    questionText: React.ReactNode;
    options?: React.ReactNode[];
    image?: React.ReactNode;
};

// --- ASSESSMENT DISPLAY COMPONENT ---
type Props = {
    questions: Question[];
    interaction: Interaction;
    onInteractionComplete: (response: InteractionResponse) => void;
};

function LinearAndNonlinearFunctionsAssessment({ questions, interaction, onInteractionComplete }: Props) {
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (questionId: string, value: any) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        onInteractionComplete({ 
            interactionId: interaction.id, 
            value: JSON.stringify(answers),
            timestamp: Date.now() 
        });
    };

    const slideContent = (
        <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col bg-slate-100 dark:bg-slate-900">
            <h2 className="text-3xl font-bold text-center mb-6">Assessment: Linear vs. Nonlinear</h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow overflow-y-auto">
                <p className="mb-4 text-sm text-center text-slate-600 dark:text-slate-300">Remember: A function is linear if its graph is a straight line and its rate of change is constant.</p>
                <div className="space-y-8">
                    {questions.map((q, index) => (
                        <div key={q.id}>
                            <div className="block font-semibold">Question {index + 1}: {q.questionText}</div>
                            {q.image && <div className="mt-2">{q.image}</div>}
                            <div className="mt-3">
                                {q.questionType === 'dropdown' ? (
                                    <select id={q.id} onChange={(e) => handleInputChange(q.id, e.target.value)} className="p-2 w-full md:w-1/2 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600">
                                        {q.options?.map((opt, i) => <option key={i}>{String(opt)}</option>)}
                                    </select>
                                ) : q.questionType === 'multiple-choice' ? (
                                    <div className="space-y-2">
                                        {q.options?.map((opt, i) => (
                                            <div key={i} className="flex items-center">
                                                <input type="radio" id={`${q.id}-${i}`} name={q.id} onChange={(e) => handleInputChange(q.id, e.target.value)} value={i} className="mr-2"/>
                                                <label htmlFor={`${q.id}-${i}`}>{opt}</label>
                                            </div>
                                        ))}
                                    </div>
                                ) : <input id={q.id} type="text" onChange={(e) => handleInputChange(q.id, e.target.value)} className="p-2 w-full md:w-3/4 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600" placeholder="Type your answer..."/>}
                            </div>
                        </div>
                    ))}
                    <div className="mt-8 text-center">
                        {!isSubmitted ? (
                            <button onClick={handleSubmit} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">Submit</button>
                        ) : (
                            <p className="font-semibold text-green-500">Response Submitted!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <TrackedInteraction 
            interaction={interaction}
            onInteractionComplete={onInteractionComplete}
        >
            {slideContent}
        </TrackedInteraction>
    );
}

// --- PARENT COMPONENT & NEW QUESTION DEFINITIONS ---
const assessmentQuestions: Question[] = [
    {
        id: 'q1-visual-graph',
        questionType: 'dropdown',
        questionText: "Which of the graphs shown below is linear?",
        image: <GraphGallery />,
        options: ['Select...', 'Graph A', 'Graph B']
    },
    {
        id: 'q2-visual-table',
        questionType: 'dropdown',
        questionText: 'Does the data in this table represent a linear function?',
        image: <DataTable />,
        options: ['Select...', 'Yes', 'No']
    },
    {
        id: 'q3-equations',
        questionType: 'multiple-choice',
        questionText: <>Which of the following equations is <strong>nonlinear</strong>?</>,
        options: [
            <><InlineMath>{'y = 2x - 7'}</InlineMath></>,
            <><InlineMath>{'y = \\sqrt{x}'}</InlineMath></>,
            <><InlineMath>{'3x + 4y = 12'}</InlineMath></>
        ]
    },
    {
        id: 'q4-real-world',
        questionType: 'dropdown',
        questionText: 'You are driving on the Mumbai-Pune Expressway at a constant speed of 80 km/h. Is the graph of your distance traveled over time linear or nonlinear?',
        options: ['Select...', 'Linear', 'Nonlinear']
    },
];

export default function LinearAndNonlinearFunctionsSlide5() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const assessmentInteraction: Interaction = {
        id: 'linear-vs-nonlinear-assessment',
        conceptId: 'linear-vs-nonlinear-assessment',
        conceptName: 'Assessment: Linear vs. Nonlinear',
        type: 'learning',
    };

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    return (
        <SlideComponentWrapper 
            slideId="linear-vs-nonlinear-assessment" 
            slideTitle="Assessment: Linear vs. Nonlinear" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-and-nonlinear-functions"
            interactions={localInteractions}
        >
            <LinearAndNonlinearFunctionsAssessment 
                questions={assessmentQuestions}
                interaction={assessmentInteraction}
                onInteractionComplete={handleInteractionComplete}
            />
        </SlideComponentWrapper>
    );
}