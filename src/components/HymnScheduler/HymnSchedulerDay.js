import React from "react";
import { getDate, getMonth, getDay } from "date-fns";

const HymnSchedulerDay = ({ index, today, date, id, idx, handleClick, handleHover, isCurrent, isPrev, isNext }) => {
  return (
    <div
      className={`${isCurrent ? "current-mth-days" : isNext ? "next-mth-days" : "prev-mth-days"} 
      ${(index === today) ? (idx === getDate(today) - 1)
        ? "today" : "" : (idx === getDate(today) - 1 && getMonth(date) === getMonth(today))
        ? "today" : ""}`}
      id={id}
      key={idx}
      style={{ "color": `${getDay(date) === 0 ? "#D80351" : getDay(date) === 6 ? "#00A3EE" : ""}` }}
      onClick={(e) => handleClick(e, date)}
      onMouseEnter={handleHover}
    >
      {getDate(date)}
    </div>
  );
};

export default HymnSchedulerDay;