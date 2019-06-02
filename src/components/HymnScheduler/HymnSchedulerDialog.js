import React, { useState, useEffect } from "react";
import HymnHeader from "../HymnHeader/HymnHeader";
import "./styles/HymnSchedulerDialog.scss";
import { format } from "date-fns";
import { ReactComponent as Left } from "../../assets/icons/left.svg";
import HymnSchedulerCalendar from "./HymnSchedulerCalendar";
import { addMonths } from "date-fns";
import { CSSTransition } from "react-transition-group";
import HymnSchedulerCategoryTab from "./HymnSchedulerCategoryTab";
import { scheduleDb } from "../../db";

function HymnSchedulerDialog({ title, background, start, index, dialogProp }) {
  const [select, setSelect] = useState(null);
  const [toggleCalendar, setToggleCalendar] = useState(true);
  const [rangeActive, setRangeActive] = useState([]);
  const [payload, setPayload] = useState({});
  useEffect(() => {
    select && function() {
      for (const a of select) {
        document.querySelector(`.hymn-scheduler-dialog #${a.id}`).classList.add("selected");
      }
      if (select.length === 2) {
        const [start, end] = select;
        for (let i = parseInt(start.id.split("-")[1]) + 1; i < parseInt(end.id.split("-")[1]); i++) {
          document.querySelector(`.hymn-scheduler-dialog #day-${i}`).classList.add("selected", "range");
        }
      }
    }();
    return () => {
      select && function() {
        for (const a of Array.from(document.querySelectorAll(".hymn-scheduler-dialog .scheduler-month-wrapper > div"))) {
          a.classList.remove("selected", "range");
        }
      }();
    };
  }, [select]);

  /**
   * When user clicks Next after selecting range,
   * toggle calendar and push the range to payload
   */
  function handleNext() {
    setToggleCalendar(false);
    setPayload(p => {
      p['start'] = select[0];
      p['end'] = select[1];
      return p;
    });
    console.log(payload);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    setPayload(p => {
      p['title'] = value;
      return p;
    });
    console.log(payload);
  }

  function handleSubmit() {
    scheduleDb.table('schedules').add(payload).then(console.log)
  }

  return (
    <div className={`hymn-scheduler-dialog`}>
      <HymnHeader title={title} background={background} right={``} left={<Left className={`left`} width={`12`}/>}
                  leftProp={dialogProp}/>
      <div className="dialog-content">
        <CSSTransition
          in={!toggleCalendar}
          mountOnEnter={true}
          unmountOnExit={true}
          classNames={`page`}
          timeout={500}
        >
          <div className={`wrapper`}>
            <div className="form--title">
              <input
                type="text"
                className="title"
                placeholder={`일정 제목`}
                onKeyUp={handleInputChange}
              />
              <div className="toggle-star" style={{ width: "50px" }}>

              </div>
            </div>
            <HymnSchedulerCategoryTab payload={setPayload}/>
          </div>
        </CSSTransition>
        <div className={`date-picker--input ${select && select.length === 2 ? "active" : ""}`}>
          <div className={`input--start ${rangeActive.includes("start") ? "active" : ""}`}>
            <div className="start--title">
              시작일
            </div>
            <div className="start--content">
              {!select ? format(start, "YYYY.MM.DD") : select.length < 2 ? format(start, "YYYY.MM.DD") : format(select[0].date, "YYYY.MM.DD")}
            </div>
          </div>
          <div className={`input--end ${rangeActive.includes("end") ? "active" : ""}`}>
            <div className="end--title">
              종료일
            </div>
            <div className="end--content">
              {!select ?
                format(start, "YYYY.MM.DD")
                : select.length < 2
                  ? format(start, "YYYY.MM.DD")
                  : format(select[1].date, "YYYY.MM.DD")
              }
            </div>
          </div>
        </div>
        <CSSTransition
          in={toggleCalendar}
          classNames={`page`}
          timeout={500}
          onEnter={() => setToggleCalendar(true)}
          onExit={() => setToggleCalendar(false)}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div className="date-picker--calendar">
            <HymnSchedulerCalendar
              mode={`mini`}
              index={index}
              start={start}
              setSelect={setSelect}/>
            <HymnSchedulerCalendar mode={`mini`} index={addMonths(index, 1)} setSelect={setSelect}/>
          </div>
        </CSSTransition>
        {/* TODO: figure out why this is not working */}
        <CSSTransition
          in={select && Object.keys(payload).length < 3}
          timeout={500}
          mountOnEnter={true}
          unmountOnExit={true}
          classNames={`page`}
        >
          <div className="date-picker--next" onClick={handleNext}>
            <div className="date-picker--next__button">
              다음
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={Object.keys(payload).length >= 3}
          timeout={500}
          classNames={`page`}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div className="dialog--next__button">
            제출
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default HymnSchedulerDialog;