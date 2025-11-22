// Slide1.tsx
import React from 'react';
import SlideTemplate, { QuizQuestion } from './SlideTemplate';
import { Interaction } from '../../../common-components/concept';

const interactions: Interaction[] = [
  {
    id: 'calc-motion-integral-learning',
    conceptId: 'calc-motion-integral',
    conceptName: 'Motion with Integrals',
    type: 'learning',
    description: 'Using integration to solve motion problems.'
  },
  {
    id: 'calc-motion-integral-quiz',
    conceptId: 'calc-motion-integral-quiz',
    conceptName: 'Integral Motion Quiz',
    type: 'learning',
    description: 'Quiz on calculus-based motion.'
  }
];

const quiz: QuizQuestion[] = [
  {
    question: 'Displacement is the integral of:',
    options: ['Velocity', 'Acceleration', 'Speed squared', 'Time'],
    correctIndex: 0,
    explanation: 's = ∫ v dt'
  }
];

export default function Slide1() {
  const theory = (
    <div>
      <h2 className="text-2xl font-bold mb-4">Motion Problems with Integrals</h2>

      <p className="text-slate-600 mb-3">
        In calculus-based physics, displacement is found by integrating velocity:
      </p>

      <p className="bg-blue-50 p-3 rounded text-center font-semibold">
        s = ∫ v(t) dt
      </p>

      <p className="mt-3 text-slate-600">
        This allows solving motion where velocity is not constant.
      </p>
    </div>
  );

  const explore = (
    <div className="border p-4 rounded text-center">
      Graph → area under curve placeholder  
      <div className="text-4xl mt-3">📉📘</div>
    </div>
  );

  return (
    <SlideTemplate
      slideId="motion-integral"
      slideTitle="Motion problems with integrals"
      moduleId="motion-in-a-straight-line"
      submoduleId="rectilinear-motion-integral-calc"
      interactions={interactions}
      theoryContent={theory}
      exploreContent={explore}
      quizQuestions={quiz}
    />
  );
}
