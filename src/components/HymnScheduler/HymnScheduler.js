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
import HymnSchedulerRegisterForm from "./HymnSchedulerRegisterForm";

/**
 * @description Highest Component of HymnScheduler
 * @description Passes down today information
 */
const HymnSchedulerOriginal = ({ isVisible, setDialog }) => {
  const today = new Date();
  return (
    <div className="hymn-scheduler" style={{ "display": (isVisible) ? "block" : "none" }}>
      <HymnSchedulerMonth today={today}/>
    </div>
  );
};

const HymnSchedulerVertical = (props) => {
  const today = new Date();
  const [numOfMonths, setNumOfMonths] = useState(12);
  const range = (num) => {
    let res = [];
    for (let i = 1; i <= num; i++) {
      res.push(<HymnSchedulerMonth indexDate={addMonths(today, i)} today={today}/>);
    }
    return res;
  };
  return (
    <div className={`hymn-scheduler-vertical`}>
      { range(numOfMonths) }
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
        // setTitle={setTitle}
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


const HymnSchedulerCalendarWithInput = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <div className={`hymn-scheduler hymn-scheduler-calendar-with-input`}>
      <div className="inputs">
        <div className="start-date">
          <label>시작일</label>
          <input
            onClick={() => setStartDate(true)}

          />
        </div>
        <div className="end-date">
          <label>종료일</label>
          <input onClick={() => setEndDate(true)}/>
        </div>
      </div>
      {/*  HymnSchedulerMonth in vertical View */}
      <HymnSchedulerVertical />
    </div>
  );
};

const HymnSchedulerDay = ({index, today, date, idx, handleClick, handleHover, isCurrent, isPrev, isNext}) => {
  return (
    <div
      className={`${isCurrent ? 'current-mth-days' : isNext ? 'next-mth-days' : 'prev-mth-days'} 
      ${(index === today) ? (idx === getDate(today) - 1)
        ? "today" : "" : (idx === getDate(today) - 1 && getMonth(date) === getMonth(today))
        ? "today" : ""}`}
      key={idx}
      style={{ "color": `${getDay(date) === 0 ? "#D80351" : getDay(date) === 6 ? "#00A3EE" : ""}` }}
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      {getDate(date)}
    </div>
  )
}

/**
 * @description Hymn Scheduler Monthly Calendar
 * @param today Date
 * @param setDialog
 * @param pickDates
 * @param dialogEffect
 * @constructor
 */
const HymnSchedulerMonth = ({ today, indexDate, setDialog, pickDates, ...rest }) => {
  const [index, setIndex] = useState((indexDate) ? indexDate : today);
  useEffect(() => {
    setRange([]);
    setFocusedNode(null);
    // setTitle(getYear(index));
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
      document.querySelector(".scheduler-month-wrapper").childNodes.forEach(c => {
        c.classList.remove("in_range");
        c.classList.remove("selected");
      });
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
    } else if (wrapper.indexOf(range[0]) > wrapper.indexOf(focusedNode)) {
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
    <HymnSchedulerDay today={today} index={index} idx={idx} date={d} isCurrent={true} handleClick={handleClick} handleHover={handleHover}/>
  ));
  const prevMthDays = eachDay(startOfWeek(prevMonthIdx), prevMonthIdx).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={`prev-day-${idx}`} date={d} isPrev={true} handleClick={handleClick} handleHover={handleHover}/>
  ));
  const nextMthDays = eachDay(nextMonthIdx, endOfWeek(nextMonthIdx)).map((d, idx) => (
    <HymnSchedulerDay today={today} index={index} idx={`next-day-${idx}`} date={d} isNext={true} handleClick={handleClick} handleHover={handleHover}/>
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
            ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][getMonth(index)]
          }
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
