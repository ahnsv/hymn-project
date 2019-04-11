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
import { defaultProps } from "recompose";
import {
  Transition,
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import "./styles/MonthlyCalendar.scss";

const YearsDialog = props => {
  const current = props.current.year;
  const clickHandler = props.passedClick;
  /**
   * Get decade range
   * @example
   * 2019 -> range -> [2010,2019]
   * @param {number} i
   * @returns {number[]}
   */
  const range = i => {
    const [rangeIdx, rangeEndIdx] = [i - (i % 10), i - (i % 10) + 9];
    const result = [];
    for (let j = rangeIdx; j <= rangeEndIdx; j++) {
      result.push(j);
    }
    return result;
  };
  return (
    <div className="year-dialog">
      {range(current).map((yr, idx) => {
        if (yr === current) {
          return (
            <div className="current-year" key={idx} onClick={clickHandler}>
              {yr}
            </div>
          );
        }
        return (
          <div className="year-button" key={idx} onClick={clickHandler}>
            {yr}
          </div>
        );
      })}
    </div>
  );
};

const MonthsDialog = props => {
  const current = props.current.month;
  const clickHandler = props.passedClick;
  return (
    <div className="months-dialog">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((mth, idx) => {
        if (mth === current + 1) {
          return (
            <div className="current-month" key={idx} onClick={clickHandler}>
              {mth}
            </div>
          );
        }
        return (
          <div className="month-button" key={idx} onClick={clickHandler}>
            {mth}
          </div>
        );
      })}
    </div>
  );
};

class MonthlyCalendar extends Component {
  state = {
    monthIdx: {
      year: this.props.current.year,
      month: this.props.current.month,
      date: this.props.current.date
    },
    inProp: false,
    isYearsDialogOpen: false,
    isMonthsDialogOpen: false,
    // TODO: manage select state with MobX?
    select: [],
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
      },
      inProp: !this.state.inProp
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
      },
      inProp: !this.state.inProp
    });
  };

  handleYearClick = () => {
    this.setState({
      isYearsDialogOpen: true
    });
  };

  handleMonthClick = () => {
    this.setState({
      isMonthsDialogOpen: true
    });
  };

  handleDayClick = e => {
    // TODO: Make range work
    // Hypothesis 1: first -> single, second -> range (done)
    // Hypothesis 2: nth click check
    e.currentTarget.classList.add("selected");
    const index = parseInt(e.currentTarget.innerText);
    const selections = this.state.select;
    const res = []
    for (let i = 0; i < selections.length; i += 2) {
      res.push(selections.slice(i, i+2))
    }
    res.forEach(s => {
      if (s.length !== 2) {
        
      }
    })
  };

  setIndex = e => {
    e.preventDefault();
    if (
      e.currentTarget.className === "year-button" ||
      e.currentTarget.className === "current-year"
    ) {
      // when it is year button, set year and move on to months
      this.setState({
        monthIdx: {
          ...this.state.monthIdx,
          year: parseInt(e.currentTarget.innerText)
        },
        isMonthsDialogOpen: true,
        isYearsDialogOpen: false
      });
    } else {
      this.setState({
        monthIdx: {
          ...this.state.monthIdx,
          month: parseInt(e.currentTarget.innerText) - 1
        },
        isMonthsDialogOpen: false
      });
    }
  };

  render() {
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
      const monthInfo = (
        <div className="monthly-calendar--month">
          <div
            className="monthly-calendar--month__year"
            onClick={this.handleYearClick}
          >
            {data.year}
          </div>
          <div
            className="monthly-calendar--month__month-num"
            onClick={this.handleMonthClick}
          >
            {data.month + 1}
          </div>
          <div
            className="monthly-calendar--month__month-str"
            onClick={this.handleMonthClick}
          >
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
      );
      return (
        <>
          <div className="monthly-calendar--navigation">
            <div
              className="monthly-calendar--navigation__prev"
              onClick={this.handlePrev}
            >
              이전
            </div>
            <div
              className="monthly-calendar--navigation__next"
              onClick={this.handleNext}
            >
              다음
            </div>
          </div>
          <CSSTransition
            in={this.state.inProp}
            timeout={200}
            classNames="calendar-content"
          >
            <div className="monthly-calendar--content">
              {monthInfo}
              <div className="monthly-calendar--dates">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                  (day, idx) => (
                    <div className="monthly-calendar--dates__days" key={idx}>
                      {day}
                    </div>
                  )
                )}
                {head_days
                  .concat(
                    [
                      ...Array(
                        getDaysInMonth(
                          new Date(data.year, data.month, data.date)
                        )
                      ).keys()
                    ].map(i => i + 1)
                  )
                  .concat(tail_days)
                  .map((day, key) => (
                    <div
                      key={key}
                      className={`monthly-calendar--dates__day${key} ${
                        key == day ? "today" : ""
                      }`}
                      onClick={this.handleDayClick.bind(this)}
                    >
                      {day}
                    </div>
                  ))}
              </div>
            </div>
          </CSSTransition>
        </>
      );
    };

    return (
      <div className="monthly-calendar">
        {this.state.isYearsDialogOpen && (
          <CSSTransition
            in={this.state.isYearsDialogOpen}
            timeout={300}
            classNames="monthly-dialog"
          >
            <YearsDialog
              current={this.state.monthIdx}
              passedClick={this.setIndex}
            />
          </CSSTransition>
        )}
        {this.state.isMonthsDialogOpen && (
          <MonthsDialog
            current={this.state.monthIdx}
            passedClick={this.setIndex}
          />
        )}
        {this.state.monthIdx.year === this.props.current.year &&
        this.state.monthIdx.month === this.props.current.month
          ? renderMonth(this.props.current)
          : renderMonth(this.state.monthIdx)}
        {this.state.select && this.state.select.length === 1 && (
          <div className="daily-schedule">Hi</div>
        )}
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
