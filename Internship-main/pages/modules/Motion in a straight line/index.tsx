import React from 'react';
import { Slide } from '../common-components/concept';

// Import slide arrays from submodules (create these files next)
import { distanceDisplacementSlides } from './submodules/distance-displacement-and-coordinate-systems';
import { averageVelocitySlides } from './submodules/average-velocity-and-average-speed';
import { velocityFromGraphsSlides } from './submodules/velocity-and-speed-from-graphs';
import { accelerationSlides } from './submodules/acceleration';
import { kinematicFormulasSlides } from './submodules/kinematic-formulas';
import { freefallSlides } from './submodules/objects-in-freefall';
import { rectilinearMotionSlides } from './submodules/rectilinear-motion-integral-calc';
import { relativeVelocitySlides } from './submodules/relative-velocity-in-1d';

// Submodule interface
export interface Submodule {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  topics?: string[];
}

// All submodules for “Motion in a Straight Line”
export const submodules: Submodule[] = [
  {
    id: 'distance-displacement-and-coordinate-systems',
    title: 'Distance, displacement, and coordinate systems',
    description:
      'Learn the basics of motion by understanding distance, displacement, and how position is represented using coordinate systems.',
    slides: distanceDisplacementSlides,
    estimatedTime: '30 min',
    difficulty: 'Beginner',
    topics: ['Distance', 'Displacement', 'Coordinates']
  },
  {
    id: 'average-velocity-and-average-speed',
    title: 'Average velocity and average speed',
    description:
      'Understand the difference between speed and velocity, and learn how to compute average speed and velocity for various scenarios.',
    slides: averageVelocitySlides,
    estimatedTime: '25 min',
    difficulty: 'Beginner',
    topics: ['Speed', 'Velocity', '1D Motion']
  },
  {
    id: 'velocity-and-speed-from-graphs',
    title: 'Velocity and speed from graphs',
    description:
      'Learn how to read position-time and velocity-time graphs to calculate velocity, speed, and motion characteristics.',
    slides: velocityFromGraphsSlides,
    estimatedTime: '35 min',
    difficulty: 'Intermediate',
    topics: ['Graphs', 'Slope Interpretation', 'Graph Analysis']
  },
  {
    id: 'acceleration',
    title: 'Acceleration',
    description:
      'Explore acceleration, how it affects motion, and how to interpret acceleration using position-time and velocity-time graphs.',
    slides: accelerationSlides,
    estimatedTime: '30 min',
    difficulty: 'Intermediate',
    topics: ['Acceleration', 'Speed Change', '1D Motion']
  },
  {
    id: 'kinematic-formulas',
    title: 'Kinematic formulas',
    description:
      'Learn the four key kinematic equations and understand how to apply them to solve motion problems.',
    slides: kinematicFormulasSlides,
    estimatedTime: '40 min',
    difficulty: 'Intermediate',
    topics: ['Kinematics', 'Equations of Motion']
  },
  {
    id: 'objects-in-freefall',
    title: 'Objects in freefall',
    description:
      'Understand how objects behave when they fall freely under gravity, and learn to calculate time, velocity, and distance.',
    slides: freefallSlides,
    estimatedTime: '25 min',
    difficulty: 'Beginner',
    topics: ['Gravity', 'Freefall', 'Acceleration']
  },
  {
    id: 'rectilinear-motion-integral-calc',
    title: 'Rectilinear motion (integral calc)',
    description:
      'Use calculus-based methods to analyze motion, including integrating velocity to find displacement.',
    slides: rectilinearMotionSlides,
    estimatedTime: '35 min',
    difficulty: 'Advanced',
    topics: ['Integrals', 'Velocity Functions', 'Displacement']
  },
  {
    id: 'relative-velocity-in-1d',
    title: 'Relative velocity in 1D',
    description:
      'Learn how to calculate the velocity of one object relative to another in straight-line motion.',
    slides: relativeVelocitySlides,
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    topics: ['Relative Motion', 'Reference Frames']
  }
];

// Main component
function MotionInAStraightLineModule() {
  return (
    <div>
      {/* Content is rendered automatically using submodules export */}
    </div>
  );
}

export default MotionInAStraightLineModule;
