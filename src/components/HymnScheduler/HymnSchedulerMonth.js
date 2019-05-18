import React, { useEffect, useState } from "react";
import { addMonths, getDate, subMonths } from "date-fns";
import "./styles/HymnScheduler.scss";
import "./styles/HymnSchedulerInput.scss";
import HymnSchedulerMonthNav from "./HymnSchedulerMonthNav";
import HymnSchedulerCalendar from "./HymnSchedulerCalendar";


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
const HymnSchedulerMonth = ({ today, indexDate, isShortVersion, setSelectProp, isDialog }) => {
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
    setSelectedDOM(e.target);
  }

  const handlePrev = () => {
    setIndex(index => subMonths(index, 1));
  };
  const handleNext = () => {
    setIndex(index => addMonths(index, 1));
  };
  return (
    <div className="hymn-scheduler-month" style={{ zIndex: isDialog ? "-1" : "inherit" }}>
      <HymnSchedulerMonthNav index={index} handleNext={handleNext} handlePrev={handlePrev}
                             isShortVersion={isShortVersion}/>
      <HymnSchedulerCalendar index={index} today={today} handlePrev={handlePrev} handleNext={handleNext} handleClick={handleClick}/>
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
  setSelectProp: null,
  isDialog: false
};

export default HymnSchedulerMonth;
