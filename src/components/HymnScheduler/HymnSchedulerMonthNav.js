import React, { useState } from "react";
import { getYear, getMonth } from "date-fns";

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
              {`<`}
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
              {`>`}
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