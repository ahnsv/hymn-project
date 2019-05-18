import React, {useState} from 'react'
import HymnHeader from "../HymnHeader/HymnHeader";
import "./styles/HymnSchedulerDialog.scss";
import {format} from 'date-fns'
import HymnSchedulerCalendar from "./HymnSchedulerCalendar";

function HymnSchedulerDialog({title, background, start, index, dialogProp}) {
  const [select, setSelect] = useState(null);
  const [important, setImportant] = useState(false);
  const [currentTab, setCurrentTab] = useState(null);
  return (
    <div className={`hymn-scheduler-dialog`}>
      <HymnHeader title={title} background={background} right={``} left={`<`} leftProp={dialogProp}/>
      <div className="dialog-content">
        <div className={`wrapper`}>
        <div className="form--title">
          <input type="text" className="title" placeholder={`일정 제목`}/>
          <div className="toggle-star" style={{width: '50px'}}>

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

          </div>
        </div>
        <div className="date-picker--input">
          <div className="input--start">
            <div className="start--title">
              시작일
            </div>
            <div className="start--content">
              {format(start, "YYYY.MM.DD")}
            </div>
          </div>
          <div className="input--end">
            <div className="end--title">
              종료일
            </div>
            <div className="end--content">
              {format(start, "YYYY.MM.DD")}
            </div>
          </div>
        </div>
        {/*<div className="date-picker--calendar">*/}
        {/*    <HymnSchedulerCalendar mode={`mini`} index={index}/>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default HymnSchedulerDialog