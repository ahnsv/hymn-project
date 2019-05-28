import React from "react";
import { getDate, getDay, getMonth, isSameDay } from "date-fns";
import "./styles/HymnSchedulerDay.scss";
import HymnSchedulerDayNotifiers from "./HymnSchedulerDayNotifiers";
import HymnSchedulerDayNotifiersRange from "./HymnSchedulerDayNotifiersRange";

export const notifiersColorScheme = {
  $goalsColor: "#F5D908",
  $militaryColor: "#00A3EE",
  $breaksColor: "#D80351",
  $anniversariesColor: "#88A80D"
};

export const test_data = [{
  date: new Date(2019, 4, 11),
  title: "안녕",
  important: true,
  category: "military"
}, {
  date: [new Date(2019, 5, 4), new Date(2019, 5, 7)],
  title: "휴가",
  category: "break",
  important: true
}, {
  date: [new Date(2019, 4, 3), new Date(2019, 4, 7)],
  title: "테스트",
  category: "goals",
  important: false
}
];
/**
 *
 * @param index
 * @param today
 * @param date
 * @param id
 * @param idx
 * @param handleClick
 * @param handleHover
 * @param isCurrent
 * @param isPrev
 * @param isNext
 * @param start
 * @param end
 * @param handleSelect
 * @param {ReactDOM} notifiers
 * @returns {*}
 * @constructor
 */
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
      <HymnSchedulerDayNotifiers stored_data={test_data} date={date}/>
      {getDate(date)}
      <HymnSchedulerDayNotifiersRange stored_data={test_data} date={date}/>
    </div>);
};

export default HymnSchedulerDay;