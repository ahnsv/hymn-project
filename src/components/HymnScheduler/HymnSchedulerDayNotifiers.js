import React from "react";
import { notifiersColorScheme } from "./HymnSchedulerDay";
import {isSameDay} from 'date-fns';

/**
 * @description Input current selected date and schedule data from db
 * @description returns notifiers in jsx
 * @param {Object, Object} {dateData, scheduleData}
 * @returns {*}
 * @constructor
 */
export function HymnSchedulerDayNotifiers({ stored_data, date }) {
  const colorMap = {
    "military": notifiersColorScheme.$militaryColor,
    "goal": notifiersColorScheme.$goalsColor,
    "break": notifiersColorScheme.$breaksColor,
    "anniversary": notifiersColorScheme.$anniversariesColor
  };
  return (
    <div className={`day-schedule-notifiers`}>
      {
        stored_data && stored_data.filter(s => isSameDay(s.date, date)).map((q, idx) => {
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