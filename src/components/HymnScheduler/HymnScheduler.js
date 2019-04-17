import React from "react";
import { useState } from "react";
import {
  eachDay,
  startOfWeek,
  endOfWeek,
  getDate,
  subDays,
  addDays
} from "date-fns";
import { Swipeable } from "react-swipeable";
import "./styles/HymnScheduler.scss";

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
  const weekIndex = eachDay(subDays(index, 3), addDays(index, 3));
  // TODO: Change state with horizontal scroll
  const handleSwipe = e => {
    switch (e.dir) {
      case "Left":
        setIndex(addDays(index, 1));
        break;
      case "Right":
        setIndex(subDays(index, 1));
      default:
        break;
    }
  };
  return (
    <div className="hymn-scheduler-week">
      <div className="week--scroller">
        {weekIndex.map((w, i) => (
          <Swipeable onSwiped={e => handleSwipe(e)} key={i}>
            <div key={i}>{getDate(w)}</div>
          </Swipeable>
        ))}
      </div>
      <HymnSchedulerDailyTodo index={index} />
    </div>
  );
};

const HymnSchedulerDailyTodo = props => {
  const todoData = [
    { date: "2019-04-18", title: "밥 먹기", important: true, due: "" },
    { date: "2019-04-19", title: "밥 먹기", important: false, due: "" }
  ];
  return (
    <div className="hymn-scheduler-daily-todo-wrapper">
      {todoData.map((t, idx) => (
        <div className="hymn-scheduler-daily-todo" key={idx}>
          <div className="daily-todo-title">{t.title}</div>
          <div className="daily-todo-importance">
            {t.important ? "important, bitch" : "meh"}
          </div>
        </div>
      ))}
    </div>
  );
};

const HymnSchedulerMonth = props => {
  const [index, setIndex] = useState(null);
};

export default HymnScheduler;
