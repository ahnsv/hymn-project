import React from "react";
import "./styles/HymnHeader.scss";
import hamburger from "../../assets/icons/hamburger.svg";
import calendar from "../../assets/icons/calendar.svg";

const HymnHeader = ({ title, left, right }) => {
  return (
    <div className={`hymn-header`}>
      {/* make img to svg */}
      <div className={`header--left`}>
        {left}
      </div>
      <div className={`header--title`}>
        {title}
      </div>
      <div className={`header--right`}>
        {right}
      </div>
    </div>
  );
};

HymnHeader.defaultProps = {
  left: (<img src={hamburger} alt={`hamburger`}/>),
  title: "HYMN",
  right: (<img src={calendar} alt={`calendar`}/>)
};

export default HymnHeader;