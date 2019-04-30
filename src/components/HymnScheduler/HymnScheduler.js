import React, { useEffect, useState } from "react";
import {
  addDays,
  addMonths,
  eachDay,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths
} from "date-fns";
import { Swipeable } from "react-swipeable";
import "./styles/HymnScheduler.scss";
import HymnSchedulerWeek from "./HymnSchedulerWeek";
import HymnSchedulerRegisterForm from "./HymnSchedulerRegisterForm";
import HymnSchedulerDay from "./HymnSchedulerDay";

/**
 * @description Highest Component of HymnScheduler
 * @description Passes down today information
 */
const HymnSchedulerOriginal = ({ isVisible, setDialog }) => {
  const today = new Date();
  return (
    <div className="hymn-scheduler" style={{ "display": (isVisible) ? "block" : "none" }}>
      <HymnSchedulerMonth today={today}/>
    </div>
  );
};

const HymnSchedulerVertical = (props) => {
  const today = new Date();
  const [numOfMonths, setNumOfMonths] = useState(2);
  const range = (num) => {
    let res = [];
    for (let i = 1; i <= num; i++) {
      res.push(<HymnSchedulerMonth isShortVersion={true} indexDate={addMonths(today, i)} today={today} key={i}/>);
    }
    return res;
  };
  return (
    <div className={`hymn-scheduler-vertical`}>
      {range(numOfMonths)}
    </div>
  );
};

const HymnSchedulerWithWeekly = () => {
  const today = new Date();
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerMonth today={today}/>
      <HymnSchedulerWeek today={today}/>
    </div>
  );
};

const HymnSchedulerWithDialog = (props) => {
  const today = new Date();
  const [dialog, setDialog] = useState(false);
  // TODO: change this into custom hook
  const dialogEffect = (param, sideEffect) => useEffect(() => {
    sideEffect();
    return () => {
      if (dialog === true) {
        param([]);
      }
    };
  }, [dialog]);
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerMonth
        today={today}
        setDialog={setDialog}
        dialogEffect={dialogEffect}
        // setTitle={setTitle}
      />
      <button className={`add-schedule`} onClick={() => setDialog(true)}>+</button>
    </div>
  );
};


const HymnSchedulerCalendarWithInput = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <div className={`hymn-scheduler hymn-scheduler-calendar-with-input`}>
      <div className="inputs">
        <div className="start-date">
          <label>시작일</label>
          <input
            onClick={() => setStartDate(true)}
          />
        </div>
        <div className="end-date">
          <label>종료일</label>
          <input onClick={() => setEndDate(true)}/>
        </div>
      </div>
      <HymnSchedulerVertical/>
    </div>
  );
};


/**
 * TODO: refactor this to more reusable component
 * @description Hymn Scheduler Monthly Calendar
 * @description Display schedules on monthly basis
 * @param today {Date}
 * @param setDialog
 * @constructor
 */
const HymnSchedulerMonth = ({ today, indexDate, isShortVersion }) => {
  const [index, setIndex] = useState((indexDate) ? indexDate : today);
  const [select, setSelect] = useState(null);
  useEffect(() => {
    return () => {
      if (select) {
        select.classList.remove("selected");
      }
      setSelect(null);
    }
  }, [index]);
  // const formatDate = (idx) => format(new Date(getYear(index),
  //   getMonth(index),
  //   parseInt(idx)), "YYYY-MM-DD");
  useEffect(() => {
    if (select) {
      select.classList.add("selected");
    }
    return () => {
      if (select) {
        select.classList.remove("selected");
      }
    };
  }, [select]);

  function handleClick(e) {
    // Show to-dos and schedules on that day if exists
    setSelect(e.target);
  }

  const startDate = startOfMonth(index);
  const endDate = endOfMonth(index);
  const prevMonthIdx = subDays(startDate, 1);
  const nextMonthIdx = addDays(endDate, 1);
  const daysInMonth = eachDay(startDate, endDate).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={idx} date={d} isCurrent={true} handleClick={handleClick}/>
  ));
  const prevMthDays = eachDay(startOfWeek(prevMonthIdx), prevMonthIdx).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={`prev-day-${idx}`} date={d} isPrev={true}
                      handleClick={handleClick}/>
  ));
  const nextMthDays = eachDay(nextMonthIdx, endOfWeek(nextMonthIdx)).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={`next-day-${idx}`} date={d} isNext={true}
                      handleClick={handleClick}/>
  ));
  const handlePrev = () => {
    setIndex(index => subMonths(index, 1));
  };
  const handleNext = () => {
    setIndex(index => addMonths(index, 1));
  };
  return (
    <div className="hymn-scheduler-month">
      <div className={`scheduler-month-nav ${isShortVersion ? "short" : ""}`}>
        <div className={`scheduler-month-year`}>
          {getYear(index)}
        </div>
        <div className={`scheduler-month-month`}>
          {getMonth(index) + 1}
        </div>
      </div>
      <Swipeable onSwipedRight={handlePrev} onSwipedLeft={handleNext} className={`scheduler-month-wrapper`}>
        {
          ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, idx) => (
            <div key={idx}
                 className={`day-indexes`}
                 style={{ "color": `${idx === 0 ? "#D80351" : idx === 6 ? "#00A3EE" : "inherit"}` }}>
              <div>{d}</div>
            </div>
          ))
        }
        {prevMthDays}
        {daysInMonth}
        {nextMthDays}
      </Swipeable>
    </div>
  );
};

export { HymnSchedulerOriginal, HymnSchedulerWithDialog, HymnSchedulerWithWeekly, HymnSchedulerCalendarWithInput };
