import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { TimelineSliderSection } from '../module';

import './global.scss';

gsap.registerPlugin(useGSAP);

export function App() {
  return <TimelineSliderSection />;
}
