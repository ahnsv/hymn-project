import HymnSchedulerDailyTodo from "./HymnSchedulerDailyTodo";
import { Swipeable } from "react-swipeable";
import React, { useState } from "react";
import { addDays, eachDay, getDate, subDays } from "date-fns";

const HymnSchedulerWeek = ({ today }) => {
  const [index, setIndex] = useState(today);
  const weekIndex = eachDay(subDays(index, 3), addDays(index, 3));
  const handleSwipe = (e) => {
    if (e.dir === "Left") {
      setIndex(addDays(index, 1));
    } else if (e.dir === "Right") {
      setIndex(subDays(index, 1));
    } else {
    }
  };
  return (
    <div className="hymn-scheduler-week">
      <div className="week--scroller">
        {weekIndex.map((w, i) => (
          <Swipeable onSwiped={e => handleSwipe(e)} key={i}>
            <div key={i} className={(i === 3) ? "today" : ""}>{getDate(w)}</div>
          </Swipeable>
        ))}
      </div>
      <HymnSchedulerDailyTodo index={index}/>
    </div>
  );
};

export default HymnSchedulerWeek;
