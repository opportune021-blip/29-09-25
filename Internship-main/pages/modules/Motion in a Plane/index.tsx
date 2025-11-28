import React from 'react';
import { Slide } from '../common-components/concept';

// Imports for the Submodule content
// Note: Ensure these files export the slide arrays as named below from their respective index.tsx files
import { introTo2DMotionSlides } from './submodules/intro-2d-motion';
import { vectorsTrigonometrySlides } from './submodules/vectors-trigonometry';
import { unitVectorsReviewSlides } from './submodules/unit-vectors-review';
import { projectileGraphsSlides } from './submodules/projectile-graphs';
import { horizontalProjectilesSlides } from './submodules/horizontal-projectiles';
import { angularProjectilesSlides } from './submodules/angular-projectiles';
import { heightProjectilesSlides } from './submodules/height-projectiles';
import { optimalAngleSlides } from './submodules/optimal-angle';
import { inclineProjectileSlides } from './submodules/incline-projectile';
import { relativeMotion2DSlides } from './submodules/relative-motion-2d';
import { ucmIntroSlides } from './submodules/ucm-intro';
import { centripetalAccelerationSlides } from './submodules/centripetal-acceleration';

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

// Define all the submodules for the Motion in a Plane module
export const submodules: Submodule[] = [
  {
    id: 'intro-2d-motion',
    title: 'Introduction to vectors and two-dimensional motion',
    description: 'Understand how 2D motion is a combination of two independent 1D motions along perpendicular axes.',
    slides: introTo2DMotionSlides,
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    topics: ['Position Vector', 'Independence of Axes', '2D Trajectory']
  },
  {
    id: 'vectors-trigonometry',
    title: 'Analyzing vectors using trigonometry',
    description: 'Master the resolution of vectors into rectangular components using sine and cosine—the fundamental tool for projectile physics.',
    slides: vectorsTrigonometrySlides,
    estimatedTime: '30 min',
    difficulty: 'Beginner',
    topics: ['Resolution of Vectors', 'Rectangular Components', 'SOH CAH TOA']
  },
  {
    id: 'unit-vectors-review',
    title: 'Review: Unit vectors',
    description: 'A quick review of i-hat and j-hat notation to express velocity and position in vector form.',
    slides: unitVectorsReviewSlides,
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    topics: ['i-j Notation', 'Vector Representation', 'Coordinate Systems']
  },
  {
    id: 'horizontal-projectiles',
    title: 'Horizontally launched projectiles',
    description: 'Analyze objects thrown horizontally from a height. Focus on constant horizontal velocity and vertical free fall.',
    slides: horizontalProjectilesSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Zero Vertical Initial Velocity', 'Trajectory Equation', 'Time of Flight']
  },
  {
    id: 'angular-projectiles',
    title: 'Projectiles launched at an angle',
    description: 'Derive and apply the equations for Time of Flight (T), Maximum Height (H), and Horizontal Range (R) for ground-to-ground projectiles.',
    slides: angularProjectilesSlides,
    estimatedTime: '40 min',
    difficulty: 'Intermediate',
    topics: ['Ground-to-Ground', 'Derivations', 'Symmetry of Motion']
  },
  {
    id: 'projectile-graphs',
    title: 'Graphs of projectile motion',
    description: 'Visualize projectile motion through position-time and velocity-time graphs for both X and Y components.',
    slides: projectileGraphsSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Kinematic Graphs', 'Velocity Analysis', 'Slope Interpretation']
  },
  {
    id: 'height-projectiles',
    title: 'Projectiles launched from/to a height',
    description: 'Solve complex problems where the landing point is at a different elevation than the launch point (e.g., firing from a cliff).',
    slides: heightProjectilesSlides,
    estimatedTime: '35 min',
    difficulty: 'Advanced',
    topics: ['Equation of Trajectory', 'Displacement Vectors', 'Impact Velocity']
  },
  {
    id: 'optimal-angle',
    title: 'Optimal angle for a projectile',
    description: 'Explore how launch angle affects range, including maximum range at 45° and complementary angles.',
    slides: optimalAngleSlides,
    estimatedTime: '20 min',
    difficulty: 'Intermediate',
    topics: ['Range Optimization', 'Complementary Angles', 'Maximization']
  },
  {
    id: 'incline-projectile',
    title: 'Projectile on an incline',
    description: 'Advanced analysis of projectiles launched up or down an inclined plane using rotated coordinate systems.',
    slides: inclineProjectileSlides,
    estimatedTime: '40 min',
    difficulty: 'Advanced',
    topics: ['Rotated Axes', 'Effective Gravity', 'Range on Incline']
  },
  {
    id: 'relative-motion-2d',
    title: 'Relative motion in 2D',
    description: 'Solve relative velocity problems in two dimensions, including the classic Rain-Man and River-Swimmer problems.',
    slides: relativeMotion2DSlides,
    estimatedTime: '35 min',
    difficulty: 'Advanced',
    topics: ['Relative Velocity', 'Rain-Man Problems', 'River-Boat Problems']
  },
  {
    id: 'ucm-intro',
    title: 'Uniform circular motion introduction',
    description: 'Introduction to angular variables (displacement, velocity) and the relationship between linear and angular speed (v = rω).',
    slides: ucmIntroSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Angular Velocity', 'Period and Frequency', 'v = rω']
  },
  {
    id: 'centripetal-acceleration',
    title: 'Centripetal acceleration',
    description: 'Understand why circular motion requires acceleration towards the center and learn to calculate it.',
    slides: centripetalAccelerationSlides,
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    topics: ['Center-seeking Force', 'Direction Change', 'Radial Acceleration']
  }
];

// Main component for the module
function MotionInAPlaneModule() {
  return (
    <div>
      {/* The framework will render the submodules based on the 'submodules' export above. */}
    </div>
  );
}

export default MotionInAPlaneModule;