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
import HymnSchedulerDay from "./HymnSchedulerDay";

const HymnSchedulerOriginal = (props) => {
  const today = new Date();
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerMonth today={today}/>
    </div>
  );
};

const HymnSchedulerVertical = (props) => {
  const today = new Date();
  // TODO: pass this to hymn scheduler month
  const { setSelect } = props;
  const [numOfMonths, setNumOfMonths] = useState(2);
  const range = (num) => {
    let res = [];
    for (let i = 0; i <= num; i++) {
      res.push(
        <HymnSchedulerMonth
          isShortVersion={true}
          indexDate={addMonths(today, i)}
          today={today}
          key={i}
          setSelectProp={setSelect}
        />);
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
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerMonth
        today={today}
      />
      <button className={`add-schedule`}>+</button>
    </div>
  );
};


const HymnSchedulerCalendarWithInput = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [select, setSelect] = useState(null);
  useEffect(() => {
    if (!select) {

    }
    else if (select.length <= 1) {
      setStartDate(select[0]);
    }
    else if (select.length === 2) {
      setEndDate(select[1])
    }
    else {
      setStartDate(select[0]);
      setEndDate(null);
      setSelect([]);
    }
    console.log(select, startDate, endDate);
  }, [select]);

  return (
    <div className={`hymn-scheduler hymn-scheduler-calendar-with-input`}>
      <div className="inputs">
        <div className="input--start-date">
          <label htmlFor={`input--start-date`}>시작일</label>
          <input
            id={`start-date`}
            value={format(startDate, "YYYY-MM-DD")}
          />
        </div>
        <div className="end-date">
          <label htmlFor={`input--end-date`}>종료일</label>
          <input id={`input--end-date`} value={format(endDate, "YYYY-MM-DD")}/>
        </div>
      </div>
      <HymnSchedulerVertical setSelect={setSelect}/>
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
const HymnSchedulerMonth = ({ today, indexDate, isShortVersion, setSelectProp }) => {
  const [index, setIndex] = useState((indexDate) ? indexDate : today);
  const [select, setSelect] = useState(null);
  useEffect(() => {
    return () => {
      if (select) {
        select.classList.remove("selected");
      }
      setSelect(null);
    };
  }, [index]);
  useEffect(() => {
    if (select) {
      // TODO: pull out date info out of DOM element
      select.classList.add("selected");
    }
    return () => {
      if (select) {
        select.classList.remove("selected");
      }
    };
  }, [select]);

  function handleClick(e, date) {
    // Show to-dos and schedules on that day if exists
    setSelectProp(d => d ? [...d, date] : [date]);
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
