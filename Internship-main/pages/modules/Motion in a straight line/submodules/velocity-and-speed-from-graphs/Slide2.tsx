// Slide2.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'what-is-velocity-learning',
    conceptId: 'what-is-velocity',
    conceptName: 'What is Velocity?',
    type: 'learning',
    description: 'Definition and concept of velocity.'
  },
  {
    id: 'what-is-velocity-quiz',
    conceptId: 'what-is-velocity-quiz',
    conceptName: 'Velocity Quiz',
    type: 'learning',
    description: 'Quiz on velocity definition.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Velocity is:',
    options: ['A scalar', 'Rate of change of displacement', 'Rate of change of distance', 'Always positive'],
    correctIndex: 1
  }
];

export default function Slide2() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">What is Velocity?</h2>
      <p className="text-slate-600 mb-3">
        Velocity is the <strong>rate of change of displacement</strong>.
      </p>

      <div className="bg-blue-50 p-3 rounded">
        <p className="font-medium">Key Points:</p>
        <ul className="list-disc ml-5">
          <li>Vector quantity</li>
          <li>Can be positive or negative</li>
          <li>Instantaneous velocity = slope of x–t graph</li>
        </ul>
      </div>
    </div>
  );

  const explore = (
    <div className="border p-4 text-center rounded">
      Placeholder: slider to change displacement/time  
      <br />
      <span className="text-4xl">🎚️</span>
    </div>
  );

  return (
    <SlideTemplate
      slideId="what-is-velocity"
      slideTitle="What is velocity?"
      moduleId="motion-in-a-straight-line"
      submoduleId="velocity-and-speed-from-graphs"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
