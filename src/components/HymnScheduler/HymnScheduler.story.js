import React from "react";
import { storiesOf } from "@storybook/react";
// import { HymnScheduler } from './index';
import { HymnScheduler, HymnSchedulerWithDialog, HymnSchedulerWithWeekly } from "./HymnScheduler";

storiesOf('HymnScheduler', module)
  .add('default', () => (
    <HymnScheduler />
  ))
  .add("with weekly", () => (
    <HymnSchedulerWithWeekly/>
  ))
  .add("with dialog", () => (
    <HymnSchedulerWithDialog/>
  ));
