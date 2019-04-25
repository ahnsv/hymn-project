import React from "react";
import { storiesOf } from "@storybook/react";
// import { HymnScheduler } from './index';
import { HymnSchedulerOriginal, HymnSchedulerWithDialog, HymnSchedulerWithWeekly } from "./HymnScheduler";

storiesOf('HymnScheduler', module)
  .add('default', () => (
    <HymnSchedulerOriginal/>
  ))
  .add("with weekly", () => (
    <HymnSchedulerWithWeekly/>
  ))
  .add("with dialog", () => (
    <HymnSchedulerWithDialog/>
  ));
