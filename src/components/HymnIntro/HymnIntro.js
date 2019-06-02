import React from "react";
import {withRouter} from 'react-router-dom'
import "./styles/HymnIntro.scss"

const HymnIntro = withRouter(({history}) => {
  return (
    <div className={`hymn-intro`}>
      <div className="hymn-intro--logo"></div>
      <div className="hymn-intro--greetings">
        <h1>환영합니다!</h1>
        <div>
          HYMN과 함께 신바람 나는 병영생활을 즐겨볼까요?
        </div>
      </div>
      <div className="hymn-intro--next" onClick={() => {history.push("/tutorial")}}>
        시작하기
      </div>
    </div>
  );
});

export default HymnIntro