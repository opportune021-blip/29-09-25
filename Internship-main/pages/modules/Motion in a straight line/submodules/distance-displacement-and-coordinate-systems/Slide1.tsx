// Slide1.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  { id: 'distance-displacement-learning', conceptId: 'distance-displacement', conceptName: 'Distance & Displacement', type: 'learning', description: 'Intro to distance and displacement' },
  { id: 'distance-displacement-quiz', conceptId: 'distance-displacement-quiz', conceptName: 'DD Quiz', type: 'learning', description: 'Quiz for distance & displacement' }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Which of the following is a vector quantity?',
    options: ['Distance', 'Speed', 'Displacement', 'Mass'],
    correctIndex: 2,
    explanation: 'Displacement is a vector (has magnitude and direction).'
  },
  {
    question: 'If an object moves 5 m east, then 3 m west, the distance and displacement are:',
    options: ['8 m, 2 m east', '8 m, 2 m west', '2 m, 8 m east', '8 m, 2 m east (signed)'],
    correctIndex: 0,
    explanation: 'Distance sums steps (5+3=8). Displacement is 2 m east (5 - 3).'
  }
];

export default function Slide1() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Distance & Displacement — Introduction</h2>
      <p className="text-slate-600 mb-3">
        <strong>Distance</strong> is the total length traveled (scalar). <strong>Displacement</strong> is the change in position from start to end (vector).
      </p>

      <div className="bg-blue-50 px-4 py-3 rounded">
        <p className="font-medium">Key points:</p>
        <ul className="list-disc ml-5">
          <li>Distance ≥ 0, always scalar.</li>
          <li>Displacement can be negative depending on chosen axis.</li>
          <li>Displacement = final position − initial position.</li>
        </ul>
      </div>
    </div>
  );

  const explore = (
    <div className="text-center">
      <h3 className="font-bold mb-2">Simple number line demo</h3>
      <p className="text-sm text-slate-500">(Use this placeholder for an interactive number-line you can implement)</p>
      <div className="mt-4 p-4 border rounded">Number-line / mini-simulator goes here</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="distance-displacement-intro"
      slideTitle="Distance and displacement introduction"
      moduleId="motion-in-a-straight-line"
      submoduleId="distance-displacement-and-coordinate-systems"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
