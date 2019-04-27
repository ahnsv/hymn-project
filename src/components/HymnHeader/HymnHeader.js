import React from "react";
import "./styles/HymnHeader.scss";
import hamburger from "../../assets/icons/hamburger.svg";

const HymnHeader = ({ title, left, right, setTitle }) => {
  return (
    <div className={`hymn-header`}>
      {/* make img to svg */}
      <div className={`header-left`}>
        {left}
      </div>
      <div className={`header--title`}>
        {title}
      </div>
      <div className={`header-right`}>
        {right}
      </div>
    </div>
  );
};

HymnHeader.defaultProps = {
  left: (<img src={hamburger} alt={`hamburger`}/>)
};

export default HymnHeader;