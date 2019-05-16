import React, { useEffect, useState } from "react";
import { addMonths, format } from "date-fns";
import "./styles/HymnScheduler.scss";
import "./styles/HymnSchedulerInput.scss";
import HymnSchedulerWeek from "./HymnSchedulerWeek";
import HymnSchedulerMonth from "./HymnSchedulerMonth";
/*
* Hymn Scheduler Routes w/ components
* */

const HymnSchedulerOriginal = (props) => {
  const today = new Date();
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerMonth today={today}/>
    </div>
  );
};

const HymnSchedulerVertical = (props) => {
  const today = new Date();
  const { setSelect } = props;
  const [numOfMonths, setNumOfMonths] = useState(2);
  const range = (num) => {
    let res = [];
    for (let i = 0; i <= num; i++) {
      res.push(
        <HymnSchedulerMonth
          isShortVersion={true}
          indexDate={addMonths(today, i)}
          today={today}
          key={i}
          setSelectProp={setSelect}
        />);
    }
    return res;
  };
  return (
    <div className={`hymn-scheduler-vertical`}>
      {range(numOfMonths)}
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

const HymnSchedulerWithDialog = (props) => {
  const today = new Date();
  return (
    <div className="hymn-scheduler">
      <HymnSchedulerMonth
        today={today}
      />
      <button className={`add-schedule`}>+</button>
    </div>
  );
};


const HymnSchedulerCalendarWithInput = (props) => {
  // TODO: Pass start date with pros, input to div
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [select, setSelect] = useState(null);
  const dateHandled = (possibleDate) => (possibleDate instanceof Date)
    ? format(possibleDate, "YYYY-MM-DD")
    : "날짜를 입력해주세요";
  useEffect(() => {
    if (!select) {

    } else if (select.length <= 1) {
      setStartDate(select[0]);
    } else if (select.length === 2) {
      console.log(select);
      setEndDate(select[1]);
    } else {
      setStartDate(select[3]);
      setEndDate(null);
      setSelect(null);
    }
    console.log(select, startDate, endDate);
  }, [select]);

  return (
    <div className={`hymn-scheduler hymn-scheduler-calendar-with-input`}>
      <div className="inputs">
        <div className="start-date">
          <label htmlFor={`input--start-date`}>시작일</label>
          <div
            id={`start-date`}
          >{dateHandled(startDate)}</div>
        </div>
        <div className="end-date">
          <label htmlFor={`input--end-date`}>종료일</label>
          <div id={`input--end-date`}>{dateHandled(endDate)}</div>
        </div>
      </div>
      <HymnSchedulerVertical setSelect={setSelect}/>
    </div>
  );
};

export { HymnSchedulerOriginal, HymnSchedulerWithDialog, HymnSchedulerWithWeekly, HymnSchedulerCalendarWithInput };
