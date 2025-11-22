// Slide1.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'rv-what-learning',
    conceptId: 'rv-what',
    conceptName: 'Relative Velocity Intro',
    type: 'learning',
    description: 'Understanding the concept of relative velocity.'
  },
  {
    id: 'rv-what-quiz',
    conceptId: 'rv-what-quiz',
    conceptName: 'Relative Velocity Quiz',
    type: 'learning',
    description: 'Quiz on basic relative velocity.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Relative velocity of A wrt B is:',
    options: ['vA + vB', 'vA - vB', 'vB - vA', 'vA × vB'],
    correctIndex: 1,
    explanation: 'Relative velocity of A wrt B = vA - vB'
  }
];

export default function Slide1() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">What is Relative Velocity?</h2>

      <p className="text-slate-600 mb-3">
        Relative velocity tells us how fast one object is moving as seen from another moving object.
      </p>

      <p className="bg-blue-50 p-3 rounded text-center font-semibold">
        v<sub>A/B</sub> = v<sub>A</sub> − v<sub>B</sub>
      </p>

      <p className="mt-3 text-slate-600">
        Signs are important: positive means forward, negative means backward.
      </p>
    </div>
  );

  const explore = (
    <div className="border p-4 rounded text-center">
      Two cars demo placeholder  
      <div className="text-4xl mt-3">🚗➡️ 🚗</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="relative-velocity-intro"
      slideTitle="What is relative velocity?"
      moduleId="motion-in-a-straight-line"
      submoduleId="relative-velocity-in-1d"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
