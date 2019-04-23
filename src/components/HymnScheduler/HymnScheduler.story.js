import React from 'react';
import { storiesOf } from '@storybook/react';
// import { HymnScheduler } from './index';
import HymnScheduler from './HymnScheduler';

storiesOf('HymnScheduler', module)
  .add('default', () => (
    <HymnScheduler />
  ));
