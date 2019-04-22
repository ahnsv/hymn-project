import React, { useState } from "react";
import {
  addDays,
  addMonths,
  eachDay,
  endOfMonth,
  endOfWeek,
  getDate,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths
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
      <HymnSchedulerMonth today={today}/>
      <HymnSchedulerWeek today={today}/>
    </div>
  );
};

const HymnSchedulerWeek = ({ today }) => {
  const [index, setIndex] = useState(today);
  const weekIndex = eachDay(subDays(index, 3), addDays(index, 3));
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
            <div key={i} className={(i === 3) ? "today" : ""}>{getDate(w)}</div>
          </Swipeable>
        ))}
      </div>
      <HymnSchedulerDailyTodo index={index}/>
    </div>
  );
};

const HymnSchedulerDailyTodo = props => {
  const todoData = [
    { date: "2019-04-18", title: "밥 먹기", important: true, due: "" },
    { date: "2019-04-19", title: "밥 먹기", important: false, due: "" }
  ];
  // TODO: query todos from mobx
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

/**
 * @description Hymn Scheduler Monthly Calendar
 * @param today Date
 * @constructor
 */
const HymnSchedulerMonth = ({ today }) => {
  const [index, setIndex] = useState(today);
  const startDate = startOfMonth(today);
  const endDate = endOfMonth(today);
  const prevMonthIdx = subDays(startDate, 1);
  const nextMonthIdx = addDays(endDate, 1);
  const daysInMonth = eachDay(startDate, endDate).map((d, idx) => {
    return <div
      className={`current-mth-day-${idx + 1} ${(index === today) ? (idx === getDate(today) - 1) ? "today" : "" : ""}`}
      key={idx}>{getDate(d)}</div>;
  });
  const prevMthDays = eachDay(startOfWeek(prevMonthIdx), prevMonthIdx).map((d, idx) => <div className="prev=mth-day"
                                                                                            key={`prev-day-${idx}`}>{getDate(d)}</div>);
  const nextMthDays = eachDay(nextMonthIdx, endOfWeek(nextMonthIdx)).map((d, idx) => <div className={`next-mth-days`}
                                                                                          key={`next-day-${idx}`}>{getDate(d)}</div>);
  const handlePrev = () => {
    setIndex(subMonths(index, 1));
  };
  const handleNext = () => {
    setIndex(addMonths(index, 1));
  };
  return (
    <div className="hymn-scheduler-month">
      <Swipeable onSwipedRight={handlePrev} onSwipedLeft={handleNext}>
        {prevMthDays}
        {daysInMonth}
        {nextMthDays}
      </Swipeable>
    </div>
  );
};

export default HymnScheduler;
