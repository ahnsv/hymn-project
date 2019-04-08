import React from 'react';
import { storiesOf } from '@storybook/react';
import { HymnScheduler } from './index';

storiesOf('HymnScheduler', module)
  .add('default', () => (
    <HymnScheduler/>
  ))