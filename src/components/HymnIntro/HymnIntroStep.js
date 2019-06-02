import React, { useState } from "react";
import {withRouter} from "react-router";
import "./styles/HymnIntroStep.scss";
import { CSSTransition } from "react-transition-group";

const HymnIntroStep = withRouter(({history}) => {
  // for this page only, probabily have to change it with props
  const TOTAL_STEPS = 3;
  const [currStep, setCurrStep] = useState(1);
  return (
    <div className={`hymn-intro-step hymn-stepper`}>
      <div className={`hymn-stepper--fixed-wrapper`}>
        <div className="hymn-stepper--indicator">
          {
            Array(TOTAL_STEPS).fill(1).map((s, idx) => (
              <div key={idx}
                   className={`hymn-stepper--indicator__step ${idx === currStep - 1 ? "active" : ""}`}
                   onClick={() => setCurrStep(idx + 1)}
              />
            ))
          }
        </div>
        <div className="hymn-stepper--logo"/>
      </div>
      <div className="hymn-stepper--content">
        안녕하세요 감사해요~
      </div>
      <CSSTransition
        in={currStep !== 3}
        classNames={`page`}
        timeout={0}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <div className="hymn-stepper--next" onClick={() => setCurrStep(s => ++s)}>다음</div>
      </CSSTransition>
      <CSSTransition
        in={currStep === 3}
        timeout={0}
        classNames={`page`}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <div className={`hymn-stepper--submit`}
             onClick={() => {history.push('/')}}
        >제출</div>
      </CSSTransition>
    </div>
  );
});
export default HymnIntroStep;