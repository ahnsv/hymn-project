import React from 'react';
import { storiesOf } from '@storybook/react';
import HymnLayout from './HymnLayout';
import HymnLayoutCard from './HymnLayoutCard';
import HymnLayoutRow from './HymnLayoutRow';

storiesOf('HymnLayout', module)
  .add('default', () => (
    <HymnLayout>
      <HymnLayoutCard style={{background: 'yellow'}}>
        <div>1</div>
      </HymnLayoutCard>
      <HymnLayoutCard style={{background: 'red'}}>
        <div>2</div>
      </HymnLayoutCard>
      <HymnLayoutRow style={{background: 'blue'}}>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
      </HymnLayoutRow>
      <HymnLayoutCard style={{background: 'pink'}}>
        <div>4</div>
      </HymnLayoutCard>
    </HymnLayout>
  ))