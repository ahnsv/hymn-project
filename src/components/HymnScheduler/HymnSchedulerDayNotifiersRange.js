import React from "react";
import { notifiersColorScheme } from "./HymnSchedulerDay";
import { isSameDay, isWithinRange } from "date-fns";

/**
 * @description Get monthly schedule,
 * @description Return
 * Case 1: the day has only one schedule -> start, end, middle
 * Case 2: the day has 2+ schedules
 * @param index ['start', 'middle', 'end']
 * @constructor
 */
export function HymnSchedulerDayNotifiersRange({ stored_data, date }) {
  const colorMap = {
    "military": notifiersColorScheme.$militaryColor,
    "goal": notifiersColorScheme.$goalsColor,
    "break": notifiersColorScheme.$breaksColor,
    "anniversary": notifiersColorScheme.$anniversariesColor
  };
  const notifierSvg = ({color, key}) => {
    return {
      "start": (
        <line x1="10" y1="3" x2="40" y2="3" stroke={color} strokeWidth={`4`}
              strokeLinecap={`round`} key={key}/>
      ),
      "end": (
        <line x1="0" y1="3" x2="30" y2="3" stroke={color} strokeWidth={`4`}
              strokeLinecap={`round`} key={key}/>
      ),
      "middle": (
        <line x1="0" y1="3" x2="40" y2="3" stroke={color} strokeWidth={`4`}
              strokeLinecap={`round`} key={key} />
      )
    };
  };
  return (
    <div className={`day-schedule-notifiers-range`}>
      <svg width={`50`} widths={`50`}>
      </svg>
    </div>
  );
}

export default HymnSchedulerDayNotifiersRange;