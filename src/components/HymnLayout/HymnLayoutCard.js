import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles/HymnLayoutCard.scss";

const HymnLayoutCard = props => {
  const [inProp, setInProp] = useState(false);
  return (
    <div className="hymn-layout-card">
      <CSSTransition in={inProp} classNames="card-transition">
        {props.children}
      </CSSTransition>
    </div>
  );
};

export default HymnLayoutCard;