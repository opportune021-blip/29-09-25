// Slide4.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  { id: 'worked-example-dd-learning', conceptId: 'worked-example-dd', conceptName: 'Worked example DD', type: 'learning', description: '' },
  { id: 'worked-example-dd-quiz', conceptId: 'worked-example-dd-quiz', conceptName: 'Worked example quiz', type: 'learning', description: '' }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If on a position-time graph object moves from x=0 at t=0 to x=10 at t=2s, average velocity is:',
    options: ['5 m/s', '2 m/s', '20 m/s', '0 m/s'],
    correctIndex: 0,
    explanation: 'Average velocity = (10 - 0)/(2 - 0) = 5 m/s'
  }
];

export default function Slide4() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Worked example: distance & displacement from graphs</h2>
      <p className="text-slate-600">We extract Δx and Δt from the graph and compute average velocity.</p>
      <ol className="ml-5 list-decimal mt-3">
        <li>Read positions at two times.</li>
        <li>Compute Δx and Δt.</li>
        <li>Average velocity = Δx / Δt.</li>
      </ol>
    </div>
  );

  const explore = (
    <div className="text-center">
      <p className="text-sm text-slate-500">Graph with sample points — try reading values (placeholder).</p>
      <div className="mt-4 p-4 border rounded">Graph example placeholder</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="worked-example-distance-displacement"
      slideTitle="Worked example: distance and displacement from position-time graphs"
      moduleId="motion-in-a-straight-line"
      submoduleId="distance-displacement-and-coordinate-systems"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
