import React, { useEffect, useState } from "react";
import {
  addDays,
  addMonths,
  eachDay,
  endOfMonth,
  endOfWeek,
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
import "./styles/HymnSchedulerInput.scss";
import HymnSchedulerDay from "./HymnSchedulerDay";



/**
 * TODO: refactor this to more reusable component
 * TODO: how to connect multiple monthly calendar like one component
 * @description Hymn Scheduler Monthly Calendar
 * @description Display schedules on monthly basis
 * @param today {Date}
 * @param indexDate
 * @param isShortVersion
 * @param setSelectProp
 * @constructor
 */
const HymnSchedulerMonth = ({ today, indexDate, isShortVersion, setSelectProp }) => {
  const [index, setIndex] = useState((indexDate) ? indexDate : today);
  const [select, setSelect] = useState(null);
  /**
   * @description get dom elements within range
   * @param start
   * @param end
   */
  const rangeById = ([start, end]) => {
    const ids = (elem) => parseInt(elem.id.split("-")[1]);
    const range = ([start, end]) => [...Array(Math.abs(end - start)).keys()].map(i => i + start);
    const toElems = (range) => range.map(r => document.querySelector(`#day-${r}`));
    return toElems(range([start, end].map(ids)));
  };
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
      select[0].classList.add("selected");
      if (select.length > 1) {
        rangeById(select).forEach((s, idx) => {
          s.classList.add("selected");
        });
      }
    }
    return () => {
      if (select) {
        select[0].classList.remove("selected");
      }
    };
  }, [select]);

  function handleClick(e, date) {
    // Show to-dos and schedules on that day if exists
    e.persist();
    if (setSelectProp) {
      setSelectProp(d => d ? [...d, date] : [date]);
    }
    setSelect(s => s ? [...s, e.target] : [e.target]);
  }

  const startDate = startOfMonth(index);
  const endDate = endOfMonth(index);
  const prevMonthIdx = subDays(startDate, 1);
  const nextMonthIdx = addDays(endDate, 1);
  const daysInMonth = eachDay(startDate, endDate).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={idx} key={idx} id={`day-${idx + 1}`} date={d} isCurrent={true}
                      handleClick={handleClick}/>
  ));
  const prevMthDays = eachDay(startOfWeek(prevMonthIdx), prevMonthIdx).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={`prev-day-${idx}`} key={`prev-${idx}`} date={d} isPrev={true}
                      handleClick={handleClick}/>
  ));
  const nextMthDays = eachDay(nextMonthIdx, endOfWeek(nextMonthIdx)).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={`next-day-${idx}`} key={`next-${idx}`} date={d} isNext={true}
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
      <div className={`hymn-month-to-dos`}>
        <div className="to-do-date">24</div>
        <div className="to-do-content">일정이 없습니다.</div>
      </div>
    </div>
  );
};

HymnSchedulerMonth.defaultProps = {
  today: new Date(),
  indexDate: new Date(),
  isShortVersion: false,
  setSelectProp: null
};

export default HymnSchedulerMonth
