import React from "react";
import { storiesOf } from "@storybook/react";
import HymnLayout from "./HymnLayout";
import HymnLayoutCard from "./HymnLayoutCard";
import HymnLayoutRow from "./HymnLayoutRow";
import HymnNewLayout from './HymnNewLayout'
import HymnHeader from '../HymnHeader/HymnHeader'

storiesOf('HymnLayout', module)
  .add('default', () => (
    <HymnLayout>
      <HymnLayoutCard>
        <div style={{ background: 'yellow' }}>1</div>
      </HymnLayoutCard>
      <HymnLayoutCard>
        <div style={{ background: 'red' }}>2</div>
      </HymnLayoutCard>
      <HymnLayoutRow>
        <div style={{ background: 'blue' }}>3</div>
        <div style={{ background: 'blue' }}>3</div>
        <div style={{ background: 'blue' }}>3</div>
        <div style={{ background: 'blue' }}>3</div>
        <div style={{ background: 'blue' }}>3</div>
      </HymnLayoutRow>
      <HymnLayoutCard>
        <div style={{ background: 'pink' }}>4</div>
      </HymnLayoutCard>
    </HymnLayout>
  ))
  .add('new layout', () => (
    <HymnNewLayout>
      <HymnHeader/>
      <div className={`main-dock`} style={{}}/>
    </HymnNewLayout>
  ))
