import React from "react";
import "./styles/HymnTodoLayout.scss";
import star from "../../assets/icons/star.svg";
import move from "../../assets/icons/move.svg";

const HymnTodoLayout = (props) => {
  const list = props.list;
  return (
    <div className={`hymn-todo-layout`} style={props.style} ref={props.refProp}>
      {
        list.map((l, idx) => (
          <div className={`hymn-todo-list`} key={idx}>
            <img src={star} alt={`star`}/>
            <div className={`todo-date`}>0512</div>
            <div className={`todo-content`}>{l}</div>
            <img src={move} alt={`move`}/>
          </div>
        ))
      }
    </div>
  );
};

HymnTodoLayout.defaultProps = {
  list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

export default HymnTodoLayout;