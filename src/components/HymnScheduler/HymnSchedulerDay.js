import React from "react";
import { getDate, getMonth, getDay } from "date-fns";
import "./styles/HymnSchedulerDay.scss";

const notifiersColorScheme = {
  $goalsColor: "#F5D908",
  $militaryColor: "#00A3EE",
  $breaksColor: "#D80351",
  $anniversariesColor: "#88A80D"
};

const HymnSchedulerDay = ({ index, today, date, id, idx, handleClick, handleHover, isCurrent, isPrev, isNext }) => {
  return (
    <div
      className={`${isCurrent ? "current-mth-days" : isNext ? "next-mth-days" : "prev-mth-days"} 
      ${(index === today) ? (idx === getDate(today) - 1)
        ? "today" : "" : (idx === getDate(today) - 1 && getMonth(date) === getMonth(today))
        ? "today" : ""} scheduler-day`}
      id={id}
      key={idx}
      style={{ "color": `${getDay(date) === 0 ? "#D80351" : getDay(date) === 6 ? "#00A3EE" : ""}` }}
      onClick={(e) => handleClick(e, date)}
      onMouseEnter={handleHover}
    >
      <div className={`day-schedule-notifiers`}>
        <svg height="6" width="6">
          <circle cx={`2`} cy={`3`} r="2" strokeWidth="1" fill={notifiersColorScheme.$goalsColor}/>
        </svg>
        <svg height="6" width="6">
          <circle cx={`3`} cy={`3`} r="2" strokeWidth="1" fill={notifiersColorScheme.$anniversariesColor}/>
        </svg>
        <svg height="6" width="6">
          <circle cx={`4`} cy={`3`} r="2" strokeWidth="1" fill={notifiersColorScheme.$breaksColor}/>
        </svg>
      </div>
      {getDate(date)}
    </div>);
};

export default HymnSchedulerDay;