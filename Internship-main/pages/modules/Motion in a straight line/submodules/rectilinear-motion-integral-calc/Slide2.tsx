// Slide2.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'integral-example-learning',
    conceptId: 'integral-example',
    conceptName: 'Integral Example',
    type: 'learning',
    description: 'Worked example using integration.'
  },
  {
    id: 'integral-example-quiz',
    conceptId: 'integral-example-quiz',
    conceptName: 'Integral Example Quiz',
    type: 'learning',
    description: 'Quiz on velocity → displacement.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'If v(t) = 4t, displacement from t=0 to t=3 is:',
    options: ['6 m', '9 m', '12 m', '18 m'],
    correctIndex: 3,
    explanation: 's = ∫4t dt = 2t² |₀³ = 18 m'
  }
];

export default function Slide2() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-3">Worked Example: Velocity → Displacement</h2>

      <p className="text-slate-600 mb-4">
        Given a velocity function v(t), displacement is the area under the v–t curve.
      </p>

      <p className="bg-blue-50 p-3 rounded font-semibold text-center">
        s = ∫ v(t) dt
      </p>

      <p className="mt-3">Example shows integration of a simple function.</p>
    </div>
  );

  const explore = (
    <div className="text-center border p-4 rounded">
      Placeholder: draggable graph curve  
      <div className="text-4xl mt-3">🧮📊</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="velocity-to-displacement"
      slideTitle="Worked example: velocity to displacement"
      moduleId="motion-in-a-straight-line"
      submoduleId="rectilinear-motion-integral-calc"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
