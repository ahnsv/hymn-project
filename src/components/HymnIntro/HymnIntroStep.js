import React, { useState } from "react";
import { withRouter } from "react-router";
import "./styles/HymnIntroStep.scss";
import { CSSTransition } from "react-transition-group";
import { HymnInputWithLabel } from "./HymnInput";
import { HymnPicker } from "./HymnPicker";

const HymnStepper = ({ history, steps, contents }) => {
  const { title, body, content } = contents;
  const [currStep, setCurrStep] = useState(1);
  return (
    <div className={`hymn-intro-step hymn-stepper`}>
      <div className={`hymn-stepper--fixed-wrapper`}>
        <div className="hymn-stepper--indicator">
          {
            Array(steps).fill(1).map((s, idx) => (
              <div key={idx}
                   className={`hymn-stepper--indicator__step ${idx === currStep - 1 ? "active" : ""}`}
                   onClick={() => setCurrStep(idx + 1)}
              />
            ))
          }
        </div>
        <div className="hymn-stepper--logo"/>
      </div>
      <CSSTransition
        in={currStep}
        classNames={`page`}
        timeout={0}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <div className="hymn-stepper--content">
          <div className="hymn-stepper--content__title">
            <h1>{title[currStep - 1]}</h1>
            <h3>{body[currStep - 1]}</h3>
          </div>
          <div className="hymn-stepper--content__content">
            {content[currStep - 1]}
          </div>
        </div>
      </CSSTransition>
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
             onClick={() => {
               history.push("/");
             }}
        >제출
        </div>
      </CSSTransition>
    </div>);
};


const HymnIntroStep = withRouter(({ history }) => {
  const rokafEnlist = Array(24).fill().map((d, idx) => (
    <div>
      <h1></h1>
    </div>
  ))
  return (
    <HymnStepper
      history={history}
      steps={3}
      contents={{
        title: [`반갑습니다!`, `안녕하세요. 김신병님!`, `훈련병 김신병님!`],
        body: [`먼저 사용자 본인의 이름을 알려주시겠어요?`, `안녕하세요. 김신병님!`, `마지막으로 가장 최근에 다녀온 휴가를 알려주세요.`],
        content: [
          (<HymnInputWithLabel label={`이름`} placeholder={`본인의 실명을 입력하세요.`} id={`name`} classProp={`name`}/>),
          (<HymnPicker />)
        ]
      }}
    />
  );
});
export default React.memo(HymnIntroStep);