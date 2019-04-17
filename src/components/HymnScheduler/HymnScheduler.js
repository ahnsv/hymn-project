import React from "react";
import { useState } from "react";
import { eachDay, startOfWeek, endOfWeek, getDate, subDays, addDays } from "date-fns";
import { Swipeable } from "react-swipeable";

/**
 * @description Highest Component of HymnScheduler
 * @description Passes down today information
 */
const HymnScheduler = () => {
  const today = new Date();
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerWeek today={today} />
    </div>
  );
};

const HymnSchedulerWeek = ({ today }) => {
  const [index, setIndex] = useState(today);
  // TODO: Set state to today by default, to selected on demand
  const weekIndex = eachDay(startOfWeek(index), endOfWeek(index));
  // TODO: Change state with horizontal scroll
  return (
    <div className="hymn-scheduler-week">
      <div className="week--scroller">
        <Swipeable 
            onSwipedLeft={setIndex(subDays(today, 1))}
            onSwipedRight={setIndex(addDays(today, 1))}
        >
          {weekIndex.map((w, i) => (
            <div key={i}>{getDate(w)}</div>
          ))}
        </Swipeable>
      </div>
    </div>
  );
};

const HymnSchedulerMonth = props => {
  const [index, setIndex] = useState(null);
};

export default HymnScheduler;
