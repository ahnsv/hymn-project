import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles/HymnLayoutCard.scss";

const HymnLayoutCard = props => {
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
   setInProp(props.in); 
   console.log('props ', props)
  }, [props])
  return (
    <div className="hymn-layout-card">
      <CSSTransition in={inProp} classNames="card-transition" timeout={500}>
        {props.children}
      </CSSTransition>
    </div>
  );
};

export default HymnLayoutCard;
