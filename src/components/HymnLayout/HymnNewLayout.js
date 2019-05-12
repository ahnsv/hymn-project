import React from "react";
import "./styles/HymnNewLayout.scss"

/**
 * @description toggle schedules with scroll
 * @constructor
 * @param theme ['full', 'half']
 * @param color {string}
 */
const HymnNewLayout = ({ theme, color, children }) => {
  return (
    <div className={`hymn-new-layout`}>
      <div className={`background-clip ${theme}`} style={{backgroundColor: color}}/>
      {
        children
      }
    </div>
  );
};

HymnNewLayout.defaultProps = {
  color: "#00A3EE",
  theme: "full"
};

export default HymnNewLayout