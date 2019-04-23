import React, { useState, useEffect } from 'react';
import './styles/HymnLayoutRow.scss';
import { CSSTransition } from 'react-transition-group';

const HymnLayoutRow = (props) => {
  const [state, setState] = useState(0);
  const [inProp, setInProps] = useState(false);
  useEffect(() => {
    setState(props.stage);
    setInProps(props.in);
    console.log('props ', props);
  }, [props]);
  const indicator = props.children.map((c, i) => {
    if (i === state) return <div className="indicator current" key={i}>*</div>;
    return <div className="indicator" key={i}>.</div>;
  });
  return (
    <div className="hymn-layout-row">
      <CSSTransition classNames="row-transition" in={inProp} timeout={500}>
        {props.children[state]}
      </CSSTransition>
      <div className="indicator--wrapper">{indicator}</div>
    </div>
  );
};

export default HymnLayoutRow;
