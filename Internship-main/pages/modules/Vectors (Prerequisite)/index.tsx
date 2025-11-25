import React from 'react';
import { Slide } from '../common-components/concept';

// Imports for the Submodule content
// Note: Ensure these files export the slide arrays as named below from their respective index.tsx files
import { vectorBasicsSlides } from './submodules/vector-basics';
import { magnitudeOfVectorsSlides } from './submodules/magnitude-of-vectors';
import { scalarMultiplicationSlides } from './submodules/scalar-multiplication';
import { vectorAdditionSubtractionSlides } from './submodules/vector-addition-and-subtraction';
import { combinedVectorOperationsSlides } from './submodules/combined-vector-operations';
import { unitVectorsSlides } from './submodules/unit-vectors';
import { magnitudeDirectionFormSlides } from './submodules/magnitude-and-direction-form';
import { componentFormSlides } from './submodules/component-form-of-vectors';
import { addingVectorsMagDirSlides } from './submodules/adding-vectors-in-mag-and-dir';
import { applicationsOfVectorsSlides } from './submodules/applications-of-vectors';

// Define the interface for a submodule
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

// Define all the submodules for the Vectors (Prerequisite) module
export const submodules: Submodule[] = [
  {
    id: 'vector-basics',
    title: 'Vector basics',
    description: 'Introduction to vectors versus scalars, recognizing vector quantities, and understanding vector equivalence and components.',
    slides: vectorBasicsSlides,
    estimatedTime: '25 min',
    difficulty: 'Beginner',
    topics: ['Vectors vs Scalars', 'Vector Components', 'Equivalence']
  },
  {
    id: 'magnitude-of-vectors',
    title: 'Magnitude of vectors',
    description: 'Learn how to calculate the magnitude (length) of a vector from graphs, component forms, and coordinate points using the distance formula.',
    slides: magnitudeOfVectorsSlides,
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    topics: ['Magnitude', 'Distance Formula', 'Pythagorean Theorem']
  },
  {
    id: 'scalar-multiplication',
    title: 'Scalar multiplication',
    description: 'Understand how multiplying a vector by a scalar affects its magnitude and direction, both algebraically and geometrically.',
    slides: scalarMultiplicationSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['Scaling', 'Direction Reversal', 'Scalar Operations']
  },
  {
    id: 'vector-addition-and-subtraction',
    title: 'Vector addition and subtraction',
    description: 'Master vector addition and subtraction using the head-to-tail method (triangle law) and algebraic component addition.',
    slides: vectorAdditionSubtractionSlides,
    estimatedTime: '30 min',
    difficulty: 'Intermediate',
    topics: ['Head-to-Tail Method', 'Resultant Vector', 'Triangle Law']
  },
  {
    id: 'combined-vector-operations',
    title: 'Combined vector operations',
    description: 'Solve complex vector problems involving combinations of addition, subtraction, and scalar multiplication.',
    slides: combinedVectorOperationsSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Linear Combinations', 'Complex Operations']
  },
  {
    id: 'unit-vectors',
    title: 'Unit vectors',
    description: 'Introduction to unit vectors (i-hat, j-hat), finding a unit vector in a specific direction, and scaling them.',
    slides: unitVectorsSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Unit Vectors', 'Normalization', 'Directional Vectors']
  },
  {
    id: 'magnitude-and-direction-form',
    title: 'Magnitude and direction form of vectors',
    description: 'Determine the direction angle of vectors in all four quadrants using trigonometry and inverse tangent functions.',
    slides: magnitudeDirectionFormSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Direction Angle', 'Quadrants', 'Trigonometry']
  },
  {
    id: 'component-form-of-vectors',
    title: 'Component form of vectors',
    description: 'Convert vectors between component form (x, y) and magnitude-direction form (r, θ), a critical skill for physics problems.',
    slides: componentFormSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Polar Coordinates', 'Rectangular Coordinates', 'Decomposition']
  },
  {
    id: 'adding-vectors-in-mag-and-dir',
    title: 'Adding vectors in magnitude and direction form',
    description: 'Learn strategies to add vectors when they are defined by their length and angle, rather than components.',
    slides: addingVectorsMagDirSlides,
    estimatedTime: '30 min',
    difficulty: 'Advanced',
    topics: ['Vector Resolution', 'Resultant Magnitude', 'Resultant Direction']
  },
  {
    id: 'applications-of-vectors',
    title: 'Applications of vectors',
    description: 'Apply vector concepts to solve real-world word problems involving displacement, velocity, and hiking scenarios.',
    slides: applicationsOfVectorsSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Displacement', 'Word Problems', 'Physics Applications']
  }
];

// Main component for the module
function VectorsPrerequisiteModule() {
  return (
    <div>
      {/* The framework will render the submodules based on the 'submodules' export above. */}
    </div>
  );
}

export default VectorsPrerequisiteModule;