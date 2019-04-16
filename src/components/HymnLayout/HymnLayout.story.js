import React from 'react';
import { storiesOf } from '@storybook/react';
import HymnLayout from './HymnLayout';

storiesOf('HymnLayout', module)
  .add('default', () => (
    <HymnLayout>
        <div>0</div>
        <div>
            1
            <div>child1</div>
            <div>child2</div>
            <div>child3</div>
            <div>child4</div>
        </div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
    </HymnLayout>
  ))