// Slide1.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'instantaneous-speed-velocity-learning',
    conceptId: 'instantaneous-speed-velocity',
    conceptName: 'Instantaneous Speed & Velocity',
    type: 'learning',
    description: 'Understanding instantaneous values on motion graphs.'
  },
  {
    id: 'instantaneous-speed-velocity-quiz',
    conceptId: 'instantaneous-speed-velocity-quiz',
    conceptName: 'Instantaneous Quiz',
    type: 'learning',
    description: 'Quiz on instantaneous velocity.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Instantaneous velocity at a point on a position-time graph is given by:',
    options: ['The area under the graph', 'The slope at that point', 'The y-value of the graph', 'The intercept'],
    correctIndex: 1,
    explanation: 'Instantaneous velocity = slope of x–t graph at that point.'
  }
];

export default function Slide1() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">Instantaneous Speed & Velocity</h2>
      <p className="text-slate-600 mb-3">
        Instantaneous velocity is the velocity at a specific moment.  
        In a position–time graph, it is given by the <strong>slope of the tangent</strong>.
      </p>

      <ul className="list-disc ml-5 text-slate-600">
        <li>Steep slope → high velocity</li>
        <li>Positive slope → moving forward</li>
        <li>Negative slope → moving backward</li>
      </ul>
    </div>
  );

  const explore = (
    <div className="text-center">
      <p className="text-sm text-slate-500">Drag tangent line to see slope change (placeholder)</p>
      <div className="border p-4 rounded">📈 Tangent line demo placeholder</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="instantaneous-speed-velocity"
      slideTitle="Instantaneous speed and velocity"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
