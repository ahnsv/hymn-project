import React, { useEffect, useState } from "react";
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
import "./styles/HymnSchedulerInput.scss";
import HymnSchedulerDay from "./HymnSchedulerDay";
import HymnSchedulerMonthNav from "./HymnSchedulerMonthNav";
import {TransitionGroup, CSSTransition, Transition} from 'react-transition-group'


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
  const [selectedDOM, setSelectedDOM] = useState(null);
  useEffect(() => {
    if (selectedDOM) {
      selectedDOM.classList.add("selected");
    }
    return () => {
      if (document.querySelector(".selected")) {
        document.querySelector(".selected").classList.remove("selected");
      }
    };
  }, [select, selectedDOM]);

  function handleClick(e, date) {
    e.persist();
    setSelect(date);
    setSelectedDOM(e.target)
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
      <HymnSchedulerMonthNav index={index} handleNext={handleNext} handlePrev={handlePrev} isShortVersion={isShortVersion}/>
      <TransitionGroup className={`months-transition`}>
        <CSSTransition timeout={500} key={index} classNames={`months`} unmountOnExit={true} mountOnEnter={true}>
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
        </CSSTransition>
      </TransitionGroup>
      <div className={`hymn-month-to-dos`}>
        <div className="to-do-date">{getDate(select)}</div>
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

export default HymnSchedulerMonth;
