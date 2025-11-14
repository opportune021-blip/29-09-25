import React from 'react';
import { Slide } from '../../../common-components/concept';

// Placeholder imports: Create these component files
import PhotosynthesisSlide1 from './Slide1';
import PhotosynthesisSlide2 from './Slide2';
import PhotosynthesisSlide3 from './Slide3';
import PhotosynthesisSlide4 from './Slide4';

export const photosynthesisSlides: Slide[] = [
  {
    type: 'interactive',
    title: 'Photosynthesis',
    component: PhotosynthesisSlide1,
    id: 'photosynthesis-video'
  },
  {
    type: 'interactive',
    title: 'Breaking down photosynthesis stages',
    component: PhotosynthesisSlide2,
    id: 'photosynthesis-stages'
  },
  {
    type: 'interactive',
    title: 'An introduction to photosynthesis',
    component: PhotosynthesisSlide3,
    id: 'intro-to-photosynthesis'
  },
  {
    type: 'interactive',
    title: 'Photosynthesis and the environment',
    component: PhotosynthesisSlide4,
    id: 'photosynthesis-and-environment'
  }
];

function PhotosynthesisComponent() {
  return (
    <div>
      This is a submodule component, not a page.
    </div>
  );
}

export default PhotosynthesisComponent;