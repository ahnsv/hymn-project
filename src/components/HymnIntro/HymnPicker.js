import React from "react";
import "./styles/HymnPicker.scss";

const HymnPicker = ({ contents }) => {
  return (
    <div className={`hymn-picker`}>
      <div className="hymn-picker--content">
        {contents}
      </div>
    </div>
  );
};

const HymnTwoStepsPicker = ({ first, second }) => {
  return (
    <div className={`hymn-two-steps-picker`}>
      <div className="hymn-picker--content__first">
        {first}
      </div>
      <div className="hymn-picker--content__second">
        {second}
      </div>
    </div>
  );
};

export {
  HymnPicker,
  HymnTwoStepsPicker
};