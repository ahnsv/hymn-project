import React from "react";
import { storiesOf } from "@storybook/react";
// import { HymnScheduler } from './index';
import { HymnSchedulerOriginal, HymnSchedulerWithDialog, HymnSchedulerWithWeekly, HymnSchedulerCalendarWithInput } from "./HymnSchedulerMonth";

storiesOf('HymnScheduler', module)
  .add('default', () => (
    <HymnSchedulerOriginal/>
  ))
  .add("with weekly", () => (
    <HymnSchedulerWithWeekly/>
  ))
  .add("with dialog", () => (
    <HymnSchedulerWithDialog/>
  ))
  .add("with input", () => (
    <HymnSchedulerCalendarWithInput/>
  ));
