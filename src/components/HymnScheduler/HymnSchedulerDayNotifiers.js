import React from "react";
import { notifiersColorScheme } from "./HymnSchedulerDay";

/**
 * @description Input current selected date and schedule data from db
 * @description returns notifiers in jsx
 * @param {Object, Object} {dateData, scheduleData}
 * @returns {*}
 * @constructor
 */
export function HymnSchedulerDayNotifiers({ dateData, scheduleData }) {
  // Need to be shared with to-do layer
  const queried = [
    {
      title: "밥먹기",
      date: new Date(2019, 4, 16),
      important: true,
      category: "military"
    },
    {
      title: "밥먹기2",
      date: new Date(2019, 4, 16),
      important: true,
      category: "goal"
    },
    // {
    //   title: "밥먹기2",
    //   date: new Date(2019, 4, 16),
    //   important: true,
    //   category: "anniversary"
    // }
  ];
  const colorMap = {
    "military": notifiersColorScheme.$militaryColor,
    "goal": notifiersColorScheme.$goalsColor,
    "break": notifiersColorScheme.$breaksColor,
    "anniversary": notifiersColorScheme.$anniversariesColor
  };
  return (
    <div className={`day-schedule-notifiers`}>
      {
        queried && queried.map((q, idx) => {
            return (
              <svg height="6" width="6" key={idx}>
                <circle cx={`3`} cy={`3`} r="2" strokeWidth="1" fill={colorMap[q.category]}/>
              </svg>
            );
          }
        )
      }
    </div>
  );
}

export default HymnSchedulerDayNotifiers;