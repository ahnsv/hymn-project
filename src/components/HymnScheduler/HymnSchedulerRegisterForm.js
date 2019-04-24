import React from "react";
import HymnFormRow from "./HymnFormRow";

// TODO: overlay background close make it work
const HymnSchedulerRegisterForm = ({ start, end, isToggled, toggle }) => (
  <div className={`hymn-schedule-register-form ${isToggled}`} onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(false);
  }}
  >
    <form>
      <div className={`scheduler-start`}>{start}</div>
      <div className={`scheduler-end`}>{end}</div>
      <HymnFormRow label="제목" placeholder="스케줄 제목을 입력해주세요"/>
      <HymnFormRow label="내용" placeholder="스케줄 내용을 입력해주세요"/>
    </form>
  </div>
);

export default HymnSchedulerRegisterForm;
