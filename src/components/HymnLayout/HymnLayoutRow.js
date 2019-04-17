import React, { useState, useEffect } from "react";
import "./styles/HymnLayoutRow.scss";
const HymnLayoutRow = props => {
  const [state, setState] = useState(0);
  useEffect(() => {
    setState(props.stage);
  });
  const indicator = props.children.map((c, i) => {
    if (i === state) return <div className="indicator current">*</div>;
    return <div className="indicator">.</div>;
  });
  return (
    <div className="hymn-layout-row">
      {props.children[state]}
      <div className="indicator--wrapper">{indicator}</div>
    </div>
  );
};

export default HymnLayoutRow;
