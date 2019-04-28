import React, { useEffect, useState } from "react";
import {
  addDays,
  addMonths,
  eachDay,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
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

/**
 * @description Highest Component of HymnScheduler
 * @description Passes down today information
 */
const HymnSchedulerOriginal = () => {
  const today = new Date();
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerMonth today={today}/>
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

const HymnSchedulerWithDialog = ({ setTitle }) => {
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
  const [datesPicked, pickDates] = useState([]);
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerMonth
        today={today}
        setDialog={setDialog}
        pickDates={pickDates}
        dialogEffect={dialogEffect}
        setTitle={setTitle}
      />
      <button className={`add-schedule`} onClick={() => setDialog(true)}>+</button>
      <HymnSchedulerRegisterForm
        start={datesPicked[0]}
        end={datesPicked[1]}
        isToggled={(!dialog) ? "hidden" : ""}
        toggle={setDialog}
      />
    </div>
  );
};


/**
 * @description Hymn Scheduler Monthly Calendar
 * @param today Date
 * @param setDialog
 * @param pickDates
 * @param dialogEffect
 * @constructor
 */
const HymnSchedulerMonth = ({ today, setDialog, pickDates, setTitle, ...rest }) => {
  const [index, setIndex] = useState(today);
  // BUG: query selector all is fucking broken
  const days = document.querySelectorAll(".scheduler-month-wrapper > div");
  useEffect(() => {
    setRange([]);
    setFocusedNode(null);
    setTitle(getYear(index));
    days.forEach((d, idx) => {
      if (idx % 7 === 0) {
        d.style.color = "#D80351";
      } else if (idx % 7 === 6) {
        d.style.color = "#00A3EE";
      }
    });
    return () => {
      days.forEach((d, idx) => {
        if (idx % 7 === 0) {
          d.style.color = "inherit";
        } else if (idx % 7 === 6) {
          d.style.color = "inherit";
        }
      });
    };
  }, [index]);

  const [range, setRange] = useState([]);
  // call dialog effect from parent
  if (rest.length > 0) {
    rest[0](setRange, () => {
      document.querySelector(".scheduler-month-wrapper").childNodes.forEach(c => {
        c.classList.remove("in_range");
      });
    });
  }
  useEffect(() => {
    range.forEach(r => r.classList.add("selected"));
    return () => {
      document.querySelectorAll(".selected").forEach(r => r.classList.remove("selected"));
      // document.querySelector(".scheduler-month-wrapper").childNodes.forEach(c => {
      //   c.classList.remove("in_range");
      // });
    };
  }, [range]);

  const [focusedNode, setFocusedNode] = useState(null);
  useEffect(() => {
    if (focusedNode === null) {
      return;
    }
    const wrapper = Array.from(document.querySelector(".scheduler-month-wrapper").childNodes);
    if (wrapper.indexOf(range[0]) < wrapper.indexOf(focusedNode)) {
      for (let i = wrapper.indexOf(range[0]) + 1; i < wrapper.indexOf(focusedNode); i++) {
        wrapper[i].classList.add("in_range");
      }
    }
    if (wrapper.indexOf(range[0]) > wrapper.indexOf(focusedNode)) {
      for (let i = wrapper.indexOf(focusedNode) + 1; i < wrapper.indexOf(range[0]); i++) {
        wrapper[i].classList.add("in_range");
      }
    }
    return () => {
      wrapper.forEach(c => {
        c.classList.remove("in_range");
      });
    };
  }, [focusedNode]);

  const formatDate = (idx) => format(new Date(getYear(index),
    getMonth(index),
    parseInt(idx)), "YYYY-MM-DD");

  function handleClick(e) {
    // In order to target persist through range state change
    e.persist();
    // TODO: handle inter-month schedule add
    if (range.length === 0) {
      setRange([e.target]);
      return;
    }
    if (range.includes(e.target)) {
      //  Popup scheduler add
      setDialog(true);
      pickDates([formatDate(e.target.innerText), formatDate(e.target.innerText)]);
      return;
    }
    //  range select, pop up scheduler in range
    setRange(range => [...range, e.target]);
    setDialog(true);
    (parseInt(range[0].innerText) < parseInt(e.target.innerText))
      ? pickDates([formatDate(range[0].innerText), formatDate(e.target.innerText)])
      : pickDates([formatDate(e.target.innerText), formatDate(range[0].innerText)]);
  }

  function handleHover(e) {
    if (range.length === 0) {
      return;
    }
    setFocusedNode(e.target);
  }


  // For prev and next month days
  const startDate = startOfMonth(index);
  const endDate = endOfMonth(index);
  const prevMonthIdx = subDays(startDate, 1);
  const nextMonthIdx = addDays(endDate, 1);
  const daysInMonth = eachDay(startDate, endDate).map((d, idx) => (
    <div
      className={`current-mth-days 
      ${(index === today) ? (idx === getDate(today) - 1)
        ? "today" : "" : (idx === getDate(today) - 1 && getMonth(d) === getMonth(today))
        ? "today" : ""}`}
      key={idx}
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      {getDate(d)}
    </div>
  ));
  const prevMthDays = eachDay(startOfWeek(prevMonthIdx), prevMonthIdx).map((d, idx) => (
    <div
      className="prev-mth-days"
      key={`prev-day-${idx}`}
    >
      {getDate(d)}
    </div>
  ));
  const nextMthDays = eachDay(nextMonthIdx, endOfWeek(nextMonthIdx)).map((d, idx) => (
    <div
      className="next-mth-days"
      key={`next-day-${idx}`}
    >
      {getDate(d)}
    </div>
  ));
  const handlePrev = () => {
    setIndex(subMonths(index, 1));
  };
  const handleNext = () => {
    setIndex(index => addMonths(index, 1));
  };
  return (
    <div className="hymn-scheduler-month">
      <div className={`scheduler-month-nav`}>
        <div className={`scheduler-month-month`}>
          {getMonth(index) + 1}
        </div>
        <div className={`scheduler-month-text`}>
          {
            ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][getMonth(index)]
          }
        </div>
      </div>
      <Swipeable onSwipedRight={handlePrev} onSwipedLeft={handleNext} className={`scheduler-month-wrapper`}>
        {prevMthDays}
        {daysInMonth}
        {nextMthDays}
      </Swipeable>
    </div>
  );
};

export { HymnSchedulerOriginal, HymnSchedulerWithDialog, HymnSchedulerWithWeekly };
