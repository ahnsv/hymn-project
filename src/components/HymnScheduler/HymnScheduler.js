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

/**
 * @description Highest Component of HymnScheduler
 * @description Passes down today information
 */
const HymnScheduler = () => {
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

const HymnSchedulerWithDialog = () => {
  const today = new Date();
  const [dialog, setDialog] = useState(false);
  const [datesPicked, pickDates] = useState([]);
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerMonth today={today} setDialog={setDialog} pickDates={pickDates}/>
      <button onClick={() => setDialog(true)}>추가</button>
      {
        dialog && <HymnSchedulerRegisterForm start={datesPicked[0]} end={datesPicked[1]}/>
      }
    </div>
  );
};

const HymnSchedulerWeek = ({ today }) => {
  const [index, setIndex] = useState(today);
  const weekIndex = eachDay(subDays(index, 3), addDays(index, 3));
  const handleSwipe = (e) => {
    if (e.dir === "Left") {
      setIndex(addDays(index, 1));
    } else if (e.dir === "Right") {
      setIndex(subDays(index, 1));
    } else {
    }
  };
  return (
    <div className="hymn-scheduler-week">
      <div className="week--scroller">
        {weekIndex.map((w, i) => (
          <Swipeable onSwiped={e => handleSwipe(e)} key={i}>
            <div key={i} className={(i === 3) ? "today" : ""}>{getDate(w)}</div>
          </Swipeable>
        ))}
      </div>
      <HymnSchedulerDailyTodo index={index}/>
    </div>
  );
};

const HymnSchedulerDailyTodo = (props) => {
  const todoData = [
    {
      date: "2019-04-18", title: "밥 먹기", important: true, due: ""
    },
    {
      date: "2019-04-19", title: "밥 먹기", important: false, due: ""
    }
  ];
  // TODO: query todos from mobx
  return (
    <div className="hymn-scheduler-daily-todo-wrapper">
      {todoData.map((t, idx) => (
        <div className="hymn-scheduler-daily-todo" key={idx}>
          <div className="daily-todo-title">{t.title}</div>
          <div className="daily-todo-importance">
            {t.important ? "important, bitch" : "meh"}
          </div>
        </div>
      ))}
    </div>
  );
};

const HymnFormRow = ({ label, placeholder }) => {
  const [formData, setFormData] = useState("");
  return (
    <div className="hymn-form-row">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        className="hymn-form-input"
        onChange={e => setFormData(e.target.value)}
      />
    </div>
  );
};

const HymnSchedulerRegisterForm = ({ start, end }) => (
  <div className="hymn-schedule-register-form">
    <form>
      <div className={`scheduler-start`}>{start}</div>
      <div className={`scheduler-end`}>{end}</div>
      <HymnFormRow label="제목" placeholder="스케줄 제목을 입력해주세요"/>
      <HymnFormRow label="내용" placeholder="스케줄 내용을 입력해주세요"/>
    </form>
  </div>
);

/**
 * @description Hymn Scheduler Monthly Calendar
 * @param today Date
 * @param setDialog
 * @constructor
 */
const HymnSchedulerMonth = ({ today, setDialog, pickDates }) => {
  const [index, setIndex] = useState(today);
  const [range, setRange] = useState([]);
  const [focusedNode, setFocusedNode] = useState(null);

  const formatDate = (idx) => format(new Date(getYear(index), getMonth(index), parseInt(idx)), "YYYY-MM-DD");

  function handleClick(e) {
    // In order to target persist through range state change
    e.persist();
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
    setDialog(true);
    pickDates([formatDate(range[0].innerText), formatDate(e.target.innerText)]);
  }

  function handleHover(e) {
    if (range.length === 0) {
      return;
    }
    setFocusedNode(e.target);
  }

  useEffect(() => {
    const wrapper = Array.from(document.querySelector(".scheduler-month-wrapper").childNodes);
    for (let i = wrapper.indexOf(range[0]) + 1; i < wrapper.indexOf(focusedNode); i++) {
      wrapper[i].classList.add("in_range");
    }
    return () => {
      wrapper.forEach(c => {
        c.classList.remove("in_range");
      }, [focusedNode]);
    };
  });
  useEffect(() => () => {
    setRange([]);
    setFocusedNode(null);
  }, [index]);
  useEffect(() => {
    range.forEach(r => r.classList.add("selected"));
    return () => {
      range.forEach(r => r.classList.remove("selected"));
    };
  }, [range]);

  // For prev and next month days
  const startDate = startOfMonth(index);
  const endDate = endOfMonth(index);
  const prevMonthIdx = subDays(startDate, 1);
  const nextMonthIdx = addDays(endDate, 1);
  const daysInMonth = eachDay(startDate, endDate).map((d, idx) => (
    <div
      className={`current-mth-days ${(index === today) ? (idx === getDate(today) - 1) ? "today" : "" : ""}`}
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
      <Swipeable onSwipedRight={handlePrev} onSwipedLeft={handleNext}>
        {prevMthDays}
        {daysInMonth}
        {nextMthDays}
      </Swipeable>
    </div>
  );
};

export { HymnScheduler, HymnSchedulerWithDialog, HymnSchedulerWithWeekly };
