import React, { useState } from "react";
import "./styles/HymnSchedulerCategoryTab.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const HymnSchedulerCategoryTab = ({ payload }) => {
  const [current, setCurrent] = useState("goal");
  const [task, setTask] = useState(null);
  const categories = {
    "goal": ["운동·체중감량", "금연·금주", "시험", "취미"],
    "military": ["1", "2", "3", "4"],
    "break": ["정기외박", "연가", "포상휴가", "위로휴가"],
    "anniversary": ["1", "2", "3", "4"]
  };

  function handleClick(e, d) {
    const value = e.target.innerText;
    setTask(d)
    payload(p => {
      p['category'] = value;
      return p;
    });
  }
  return (
    <div className={`category-tab`}>
      <div className="form--content">
        <div className="form--content__category">
          <div
            className={`form--content__category--tab goal ${current === "goal" ? "active" : ""}`}
            onClick={() => {
              setCurrent("goal");
            }}
          >목표
          </div>
          <div
            className={`form--content__category--tab military ${current === "military" ? "active" : ""}`}
            onClick={() => {
              setCurrent("military");
            }}
          >병영
          </div>
          <div
            className={`form--content__category--tab break ${current === "break" ? "active" : ""}`}
            onClick={() => {
              setCurrent("break");
            }}
          >휴가
          </div>
          <div
            className={`form--content__category--tab anniversary ${current === "anniversary" ? "active" : ""}`}
            onClick={() => {
              setCurrent("anniversary");
            }}
          >기념일
          </div>
        </div>
      </div>
      <div className="form--content__details">
        <TransitionGroup>
          {
            ["goal", "break", "anniversary", "military"].map((c, idx) => (
              <div key={idx} className={`form--content__details--wrapper ${current === c ? 'active' : ''}`}>
                {
                  categories[c].map((d, idx) => (
                    <CSSTransition
                      mountOnEnter={true}
                      unmountOnExit={true}
                      in={current === c}
                      timeout={500}
                      key={idx}
                      classNames={`page`}
                    >
                      <div
                        className={`form--content__detail ${c} ${task === d ? "active" : ""}`}
                        key={idx}
                        onClick={(e) => handleClick(e, d)}>
                        {d}
                      </div>
                    </CSSTransition>
                  ))
                }
              </div>
            ))
          }
        </TransitionGroup>
      </div>
    </div>
  );
};

export default HymnSchedulerCategoryTab;