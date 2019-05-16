import React from "react";
import { storiesOf } from "@storybook/react";
import HymnNewLayout from "../HymnLayout/HymnNewLayout";
import HymnHeader from "../HymnHeader/HymnHeader";
import HymnTodoLayout from "../HymnLayout/HymnTodoLayout";
import { Swipeable } from "react-swipeable";
import { HymnSchedulerWithDialog } from "../HymnScheduler/HymnSchedulerMonth";

storiesOf("Main Pages", module)
  .add("main page", () => (
    <HymnNewLayout>
      <HymnHeader/>
      <Swipeable>
        <div className={`main-dock`}/>
      </Swipeable>
    </HymnNewLayout>
  ))
  .add("main todo page", () => (
    <HymnNewLayout theme={`half`} color={`#f5d908`}>
      <HymnHeader/>
      <HymnTodoLayout/>
    </HymnNewLayout>
  ))
  .add("schedule page", () => (
    <HymnNewLayout theme={`half`}>
      <HymnHeader/>
      <HymnSchedulerWithDialog/>
    </HymnNewLayout>
  ))
