import React from "react";
import { getDate, getDay, getMonth, isSameDay } from "date-fns";
import "./styles/HymnSchedulerDay.scss";
import HymnSchedulerDayNotifiers from "./HymnSchedulerDayNotifiers";

export const notifiersColorScheme = {
  $goalsColor: "#F5D908",
  $militaryColor: "#00A3EE",
  $breaksColor: "#D80351",
  $anniversariesColor: "#88A80D"
};

const HymnSchedulerDay = ({ index, today, date, id, idx, handleClick, handleHover, isCurrent, isPrev, isNext, start, end, handleSelect }) => {
  // TODO: pull schedule data from indexedDB
  function handleDayClick(e, date) {
    const payload = {
      date: date,
      id: id
    };
    if (handleClick) {
      handleClick(e, date);
    }
    if (handleSelect) {
      handleSelect((s) => {
          if (s && s.length >= 2) {
            return [payload];
          }
          return s ? [...s, payload] : [payload];
        }
      );
    }
  }

  return (
    <div
      className={`${isCurrent ? "current-mth-days" : isNext ? "next-mth-days" : "prev-mth-days"} 
      ${(index === today) ? (idx === getDate(today) - 1)
        ? "today" : "" : (idx === getDate(today) - 1 && getMonth(date) === getMonth(today))
        ? "today" : ""} scheduler-day ${isSameDay(start, date) ? "selected" : ""} ${isSameDay(end, date) ? "selected" : ""}`}
      id={id}
      key={idx}
      style={{ "color": `${getDay(date) === 0 ? "#D80351" : getDay(date) === 6 ? "#00A3EE" : ""}` }}
      onClick={(e) => handleDayClick(e, date)}
      onMouseEnter={handleHover}
    >
      <div className={`day-schedule-notifiers`}>
        <HymnSchedulerDayNotifiers/>
      </div>
      {getDate(date)}
      <div className="day-schedule-notifiers-range">
        <svg height="20" width="100">
          <line x1="10" y1="3" x2="40" y2="3" stroke={notifiersColorScheme.$breaksColor} strokeWidth={`4`}
                strokeLinecap={`round`}/>
          <line x1="10" y1="9" x2="50" y2="9" stroke={notifiersColorScheme.$goalsColor} strokeWidth={`4`}
                strokeLinecap={`round`}/>
        </svg>
      </div>
    </div>);
};

export default HymnSchedulerDay;