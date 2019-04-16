import React, { useState } from "react";

const HymnLayoutRow = props => {
  const [state, setState] = useState(0);
  return <div className="hymn-layout-row">{props.children[state]}</div>;
};

export default HymnLayoutRow;
