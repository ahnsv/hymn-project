import React from "react";
import { defaultProps } from "recompose";
import { getDate, getDay, getMonth, getYear } from "date-fns";

export default class WeeklyCalendar extends React.Component {
  render() {
    return (
      <div className="week-calendar" />
    );
  }
}

const withDefaultProps = defaultProps({
  current: {
    year: getYear(today),
    month: getMonth(today),
    date: getDate(today),
    day: getDay(today),
  },
  focused: false,
});
