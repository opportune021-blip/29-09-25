import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse, InteractionType } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';

// Define the type for a single question object
type Question = {
    id: string;
    questionText: string;
    inputType: any; // Using 'any' for simplicity, but should be 'InteractionType'
    required: boolean;
};

// Define the type for the props the component receives
type Props = {
    questions?: Question[]; // Prop is kept to allow overriding default questions
};

// This is a self-contained assessment component.
// The questions are defined inside and used as a default.
export default function SlopeAssessment({ questions: questionsFromProps }: Props) {

    // --- All questions are now included directly in this file ---
    const defaultQuestions: Question[] = [
        // === Part 1: Basic Concepts ===
        {
            id: 'slope-q1-concept-fill',
            questionText: "Slope is the measure of a line's steepness and is often described as Rise over ______.",
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q2-concept-uphill',
            questionText: 'A line that goes uphill from left to right has a _______ (positive/negative) slope.',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q3-concept-horizontal',
            questionText: 'A perfectly flat, horizontal line has a slope of _______.',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q4-concept-steepness',
            questionText: 'True or False: A line with a slope of $m=4$ is steeper than a line with a slope of $m=2$.',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q5-concept-vertical',
            questionText: 'A perfectly vertical line has a(n) _______ slope.',
            inputType: 'TextInput',
            required: true,
        },

        // === Part 2: Calculating Slope from Two Points ===
        {
            id: 'slope-q6-calculate-positive',
            questionText: 'Calculate the slope of the line that passes through the points $(2, 1)$ and $(4, 7)$.',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q7-calculate-negative',
            questionText: 'Calculate the slope of the line that passes through the points $(1, 8)$ and $(3, 4)$.',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q8-calculate-neg-points',
            questionText: 'Calculate the slope of the line passing through $(-2, 5)$ and $(1, -1)$.',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q9-calculate-fraction',
            questionText: 'What is the slope of the line that contains the points $(5, 6)$ and $(10, 8)$? (Enter as a fraction like 2/5).',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q10-calculate-zero',
            questionText: 'Calculate the slope of the line that passes through $(3, 5)$ and $(-1, 5)$.',
            inputType: 'TextInput',
            required: true,
        },

        // === Part 3: Identifying Slope from a Description ===
        {
            id: 'slope-q11-identify-skilift',
            questionText: 'A ski lift travels up a mountain at a constant angle. Is its slope positive, negative, zero, or undefined?',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q12-identify-sidewalk',
            questionText: 'You are walking on a perfectly level sidewalk. What is the slope of the sidewalk?',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q13-identify-downhill',
            questionText: 'What type of slope describes the path of a ball rolling straight down a hill?',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q14-identify-wall',
            questionText: 'A line on a graph represents a wall that goes straight up from the floor. What is the slope of this line?',
            inputType: 'TextInput',
            required: true,
        },

        // === Part 4: Word Problems ===
        {
            id: 'slope-q15-word-ramp',
            questionText: 'A wheelchair ramp rises 1 foot for every 12 feet of horizontal distance. What is the slope of the ramp? (Enter as a fraction).',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q16-word-road',
            questionText: 'A road sign indicates a "6% grade" downhill. What is the slope of the road, written as a simplified fraction?',
            inputType: 'TextInput',
            required: true,
        },
        {
            id: 'slope-q17-word-ladder',
            questionText: 'A ladder touches a wall at a height of 15 feet, and its base is 5 feet from the wall. What is the slope of the ladder? (Hint: The slope will be negative).',
            inputType: 'TextInput',
            required: true,
        },
    ];

    // Use the questions passed in props, or fall back to the default questions defined above.
    const questions = questionsFromProps || defaultQuestions;

    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = questions ? questions.map((q: Question) => ({...q, conceptId: 'slope-assessment', conceptName: 'Slope Assessment', type: q.inputType})) : [];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Assessment: Slope</h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow overflow-y-auto">
          <p className="mb-4">Answer the following questions to test your knowledge.</p>
          <div className="space-y-6">
            {questions && questions.map((question: Question, index: number) => (
              <div key={question.id}>
                <label htmlFor={question.id} className="block font-semibold text-lg">Question {index + 1}:</label>
                <p className="mt-1" dangerouslySetInnerHTML={{ __html: question.questionText }}></p>
                <input
                  id={question.id}
                  type="text"
                  className="mt-2 p-2 w-full md:w-1/2 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                  placeholder="Type your answer here..."
                />
              </div>
            ))}
            {!questions && <p>No questions are available for this assessment.</p>}
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
            {slideInteractions.length > 0 ? (
                <TrackedInteraction 
                    interaction={slideInteractions[0]}
                    onInteractionComplete={handleInteractionComplete}
                >
                    {slideContent}
                </TrackedInteraction>
            ) : (
                slideContent
            )}
        </SlideComponentWrapper>
    );
}