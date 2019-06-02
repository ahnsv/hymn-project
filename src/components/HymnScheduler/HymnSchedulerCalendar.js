import React from "react";
import {
  addDays,
  eachDay,
  endOfMonth,
  endOfWeek,
  getMonth,
  getYear,
  startOfMonth,
  startOfWeek,
  subDays
} from "date-fns";
import { Swipeable } from "react-swipeable";
import HymnSchedulerDay from "./HymnSchedulerDay";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles/HymnSchedulerCalendar.scss";

function HymnSchedulerCalendar({ today, index, handleNext, handlePrev, handleClick, mode, number, start, end, setSelect }) {
  const startDate = startOfMonth(index);
  const endDate = endOfMonth(index);
  const prevMonthIdx = subDays(startDate, 1);
  const nextMonthIdx = addDays(endDate, 1);
  const daysInMonth = eachDay(startDate, endDate).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={idx} key={idx} id={`day-${idx + 1}`} start={start ? start : null}
                      end={end ? end : null} date={d} isCurrent={true}
                      handleClick={handleClick} handleSelect={setSelect}/>
  ));
  const prevMthDays = eachDay(startOfWeek(prevMonthIdx), prevMonthIdx).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={`prev-day-${idx}`} key={`prev-${idx}`} date={d} isPrev={true}
                      handleClick={handleClick} handleSelect={setSelect}/>
  ));
  const nextMthDays = eachDay(nextMonthIdx, endOfWeek(nextMonthIdx)).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={`next-day-${idx}`} key={`next-${idx}`} date={d} isNext={true}
                      handleClick={handleClick} handleSelect={setSelect}/>
  ));
  return (
    <>
      {
        mode === "mini" && <div className={`month-index`}>{getYear(index) + "." + (getMonth(index) + 1)}</div>
      }
      <CSSTransition timeout={500} key={index} classNames={`months`} unmountOnExit={true} mountOnEnter={true} in={true}>
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
    </>
  );
}

HymnSchedulerCalendar.defaultProps = {
  mode: "regular"
};

export default HymnSchedulerCalendar;