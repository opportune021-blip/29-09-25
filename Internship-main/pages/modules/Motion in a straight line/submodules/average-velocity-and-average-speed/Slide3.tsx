// Slide3.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'avg-vel-example-learning',
    conceptId: 'avg-vel-example',
    conceptName: 'Average velocity example',
    type: 'learning',
    description: 'Worked example on average velocity.'
  },
  {
    id: 'avg-vel-example-quiz',
    conceptId: 'avg-vel-example-quiz',
    conceptName: 'Example quiz',
    type: 'learning',
    description: 'Quiz based on examples.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'A car travels 30 km east and 10 km west in 1 hour. Average velocity?',
    options: ['20 km/h east', '40 km/h east', '30 km/h west', 'Zero'],
    correctIndex: 0,
    explanation: 'Net displacement = 30 - 10 = 20 km east.'
  }
];

export default function Slide3() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Worked Example</h2>
      <p className="text-slate-600">
        Example: A runner travels 400 m in 100 seconds.
      </p>
      <p className="mt-3">
        Average speed = 400 / 100 = <strong>4 m/s</strong>
      </p>
    </div>
  );

  const explore = (
    <div className="text-center">
      <div className="border p-4 rounded">
        Placeholder: Example simulator  
        <br />
        <span className="text-4xl">🏃</span>
      </div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="avg-velocity-example"
      slideTitle="Average velocity and speed worked example"
      moduleId="motion-in-a-straight-line"
      submoduleId="average-velocity-and-average-speed"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
