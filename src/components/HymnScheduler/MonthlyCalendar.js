import React, { Component } from "react";
import {
  getMonth,
  getYear,
  getDate,
  getDaysInMonth,
  getDay,
  startOfWeek,
  subDays,
  startOfMonth,
  endOfMonth,
  eachDay,
  addDays,
  endOfWeek
} from "date-fns";
import posed, { PoseGroup } from "react-pose";
import { defaultProps } from "recompose";
import "./styles/MonthlyCalendar.scss";

class MonthlyCalendar extends Component {
  state = {
    monthIdx: {
      year: this.props.current.year,
      month: this.props.current.month,
      date: this.props.current.date
    }
  };

  handleNext = () => {
    this.setState({
      monthIdx: {
        year:
          this.state.monthIdx.month >= 11
            ? this.state.monthIdx.year + 1
            : this.state.monthIdx.year,
        month:
          this.state.monthIdx.month >= 11 ? 0 : this.state.monthIdx.month + 1,
        date: 1
      }
    });
  };

  handlePrev = () => {
    this.setState({
      monthIdx: {
        year:
          this.state.monthIdx.month <= 0
            ? this.state.monthIdx.year - 1
            : this.state.monthIdx.year,
        month:
          this.state.monthIdx.month <= 0 ? 11 : this.state.monthIdx.month - 1,
        date: 1
      }
    });
  };

  render() {
    const Box = posed.div({
      pressable: true,
      init: { scale: 1 },
      press: { scale: 0.8 }
    });
    const renderMonth = data => {
      const index = new Date(data.year, data.month, data.date);
      const start_day = startOfMonth(index);
      const end_day = endOfMonth(index);
      const [head, tail] = [
        [startOfWeek(subDays(start_day, 1)), subDays(start_day, 1)],
        [addDays(end_day, 1), endOfWeek(addDays(end_day, 1))]
      ];
      const [head_days, tail_days] = [
        eachDay(head[0], head[1]).map(d => getDate(d)),
        eachDay(tail[0], tail[1]).map(d => getDate(d))
      ];
      return (
        <>
          <div className="monthly-calendar--navigation">
            <Box
              className="monthly-calendar--navigation__prev"
              onClick={this.handlePrev}
            >
              이전
            </Box>
            <Box
              className="monthly-calendar--navigation__next"
              onClick={this.handleNext}
            >
              다음
            </Box>
          </div>
          <div className="monthly-calendar--content">
            <div className="monthly-calendar--month">
              <div className="monthly-calendar--month__year">{data.year}</div>
              <div className="monthly-calendar--month__month-num">
                {data.month + 1}
              </div>
              <div className="monthly-calendar--month__month-str">
                {
                  [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC"
                  ][data.month]
                }
              </div>
            </div>
            <div className="monthly-calendar--dates">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                (day, idx) => (
                  <div className="monthly-calendar--dates__days" key={idx}>
                    {day}
                  </div>
                )
              )}
              {[
                ...head_days,
                ...Array(
                  getDaysInMonth(new Date(data.year, data.month, data.date))
                ).keys(),
                ...tail_days
              ]
                .map(i => i + 1)
                .map((day, key) => (
                  <div
                    key={key}
                    className={`monthly-calendar--dates__day${key} ${
                      key == day ? "today" : ""
                    }`}
                  >
                    {day}
                  </div>
                ))}
            </div>
          </div>
        </>
      );
    };

    return (
      <div className="monthly-calendar">
        {this.state.monthIdx.year === this.props.current.year &&
        this.state.monthIdx.month === this.props.current.month
          ? renderMonth(this.props.current)
          : renderMonth(this.state.monthIdx)}
      </div>
    );
  }
}
const today = new Date();
const withDefaultProps = defaultProps({
  current: {
    year: getYear(today),
    month: getMonth(today),
    date: getDate(today),
    day: getDay(today)
  }
});

export default withDefaultProps(MonthlyCalendar);
