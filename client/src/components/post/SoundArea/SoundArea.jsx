import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { SoundPlayer } from '../../foundation/SoundPlayer';

/**
 * @typedef {object} Props
 * @property {Models.Sound} sound
 */

/** @type {React.VFC<Props>} */
const SoundArea = ({ sound }) => {
  return (
    <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden">
      <LazyLoadComponent>
        <SoundPlayer sound={sound} />
      </LazyLoadComponent>
    </div>
  );
};

export { SoundArea };
