import React from "react";
import "./styles/HymnHeader.scss";
import hamburger from "../../assets/icons/hamburger.svg";
import calendar from "../../assets/icons/calendar.svg";
import { Link } from "react-router-dom";

const HymnHeader = ({ title, left, right, linkProp, background, leftProp, rightProp }) => {
  return (
    <div className={`hymn-header`} style={{backgroundColor: background}}>
      {/* make img to svg */}
      <div className={`header--left`} onClick={leftProp}>
        {left}
      </div>
      <div className={`header--title`}>
        <Link to={`/`}>
          {title}
        </Link>
      </div>
      <div className={`header--right`}>
        <Link to={linkProp}>
          {right}
        </Link>
      </div>
    </div>
  );
};

HymnHeader.defaultProps = {
  left: (<img src={hamburger} alt={`hamburger`}/>),
  title: "HYMN",
  right: (<img src={calendar} alt={`calendar`}/>),
  linkProp: "/",
  background: 'transparent'
};

export default HymnHeader;