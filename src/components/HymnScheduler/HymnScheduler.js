import React from "react";
import { useState } from "react";
import { eachDay, startOfWeek, endOfWeek, getDate } from "date-fns";

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
        {weekIndex.map((w, i) => (
          <div key={i}>{getDate(w)}</div>
        ))}
      </div>
    </div>
  );
};

const HymnSchedulerMonth = props => {
  const [index, setIndex] = useState(null);
};

export default HymnScheduler;
