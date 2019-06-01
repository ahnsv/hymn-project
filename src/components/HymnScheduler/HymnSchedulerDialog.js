import React, { useState, useEffect } from "react";
import HymnHeader from "../HymnHeader/HymnHeader";
import "./styles/HymnSchedulerDialog.scss";
import { format } from "date-fns";
import { ReactComponent as Left } from "../../assets/icons/left.svg";
import HymnSchedulerCalendar from "./HymnSchedulerCalendar";
import { addMonths } from "date-fns";
import { CSSTransition } from "react-transition-group";

function HymnSchedulerDialog({ title, background, start, index, dialogProp }) {
  const [select, setSelect] = useState(null);
  const [toggleCalendar, setToggleCalendar] = useState(true);
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
  // TODO: figure out how to toggle with CSS/Transitions
  return (
    <div className={`hymn-scheduler-dialog`}>
      <HymnHeader title={title} background={background} right={``} left={<Left className={`left`} width={`12`}/>}
                  leftProp={dialogProp}/>
      <div className="dialog-content">
        <div className={`wrapper`}>
          <div className="form--title">
            <input type="text" className="title" placeholder={`일정 제목`}/>
            <div className="toggle-star" style={{ width: "50px" }}>

            </div>
          </div>
          <div className="form--content">
            <div className="form--content__category">
              <div className="form--content__category--tab goal">목표</div>
              <div className="form--content__category--tab military">병영</div>
              <div className="form--content__category--tab break">휴가</div>
              <div className="form--content__category--tab anniversary">기념일</div>
            </div>
          </div>
          <div className="form--content__details">
            <div className="form--content__detail active">운동/체중감량</div>
            <div className="form--content__detail">금연/금주</div>
            <div className="form--content__detail">시험</div>
            <div className="form--content__detail">취미</div>
          </div>
        </div>
        <div className={`date-picker--input ${select && select.length === 2 ? "active" : ""}`}>
          <div className="input--start">
            <div className="start--title">
              시작일
            </div>
            <div className="start--content">
              {!select ? format(start, "YYYY.MM.DD") : select.length < 2 ? format(start, "YYYY.MM.DD") : format(select[0].date, "YYYY.MM.DD")}
            </div>
          </div>
          <div className="input--end active">
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
        {
          select && select.length === 2 &&
          <div className="date-picker--next"
               onClick={() => setToggleCalendar(false)}>
            <div className="date-picker--next__button">
              다음
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default HymnSchedulerDialog;