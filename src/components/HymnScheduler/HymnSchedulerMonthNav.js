import React, { useState } from "react";
import { getYear, getMonth } from "date-fns";
import { ReactComponent as Left} from '../../assets/icons/left.svg';
import { ReactComponent as Right} from '../../assets/icons/right.svg';

const HymnSchedulerMonthNav = ({ index, handlePrev, handleNext, isShortVersion }) => {
  /**
   * There are three stages: month, year, decade
   */
  const [mode, setMode] = useState("month");
  return (
    <div className={`scheduler-month-nav ${isShortVersion ? "short" : ""}`}>
      {
        mode === "month" && (
          <>
            <div className={`scheduler-nav--prev`} onClick={handlePrev}>
              <Left className={`left`}/>
            </div>
            <div className="scheduler-indicator">
              <div className={`scheduler-month-year`}>
                {getYear(index)}
              </div>
              <div className={`scheduler-month-month`}>
                {getMonth(index) + 1}
              </div>
            </div>
            <div className={`scheduler-nav--next`} onClick={handleNext}>
              <Right className={`right`}/>
            </div>
          </>
        )
      }
      {
        mode === 'year' && (
          <>

          </>
        )
      }
    </div>
  );
};

export default HymnSchedulerMonthNav;