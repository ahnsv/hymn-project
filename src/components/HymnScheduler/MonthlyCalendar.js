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
import _ from 'lodash'
import { get } from "http";

export const decadeRange = i => {
  const [rangeIdx, rangeEndIdx] = [i - (i % 10), i - (i % 10) + 9];
  const result = [];
  for (let j = rangeIdx; j <= rangeEndIdx; j++) {
    result.push(j);
  }
  return result;
};

function cleanDOM() {
  if (document.querySelector('.in-range') || document.querySelector('.selected') || document.querySelectorAll('.today')) {
    document.querySelectorAll('.in-range').forEach(e => e.classList.remove('in-range'))
    document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'))
    document.querySelectorAll('.unfocused').forEach(e => e.classList.remove('unfocused'))
    document.querySelectorAll('.today').forEach(e => e.classList.remove('today'))
    return;
  }
}

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
  return (
    <div className="year-dialog">
      {decadeRange(current).map((yr, idx) => {
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

class DaysDialog extends React.Component {
  state = {
    index: this.props.current.date
  }

  render() {
    const {year, month, date} = this.props.current
    const days = Array.apply(null, {length: getDaysInMonth(new Date(year, month, date))}).map(Number.call, Number)
    return (
      <div className="days-dialog">
        <div className="days-scroll">
          { days.map((d, idx) => <div key={idx}>{d+1}</div>)}
        </div>
        <div className="days-schedule">
          TODOs
        </div>
      </div>
    )
  }
}

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
    selected: {},
  };
  // refs
  dates = []
  datesWrapper = ''

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
      inProp: !this.state.inProp,
      selected: {}
    });
    cleanDOM()
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
      inProp: !this.state.inProp,
      selected: {}
    });
    cleanDOM()
  };

  handleYearClick = () => {
    cleanDOM()
    this.setState({
      isYearsDialogOpen: true
    });
    this.findToday()
  };
  
  handleMonthClick = () => {
    cleanDOM()
    this.setState({
      isMonthsDialogOpen: true
    });
    this.findToday()
  };

  handleDayClick = e => {
    // TODO: Make range work
    if (document.querySelector('.in-range')) {
      document.querySelectorAll('.in-range').forEach(e => e.classList.remove('in-range'))
      document.querySelectorAll('.unfocused').forEach(e => e.classList.remove('unfocused'))
      return;
    }
    const selected = JSON.stringify(this.state.selected)
    const payload = {
      year: this.state.monthIdx.year,
      month: this.state.monthIdx.month,
      day: parseInt(e.currentTarget.innerText)
    }
    
    if (selected === JSON.stringify({})) {
      this.setState({
        selected: payload
      })
      e.currentTarget.classList.toggle("selected");
      return;
    }
    if (selected === JSON.stringify(payload)) {
      this.setState({
        selected: {}
      })
      document.querySelector('.selected').classList.remove('selected')

      return;
    }
    // toggle range
    const range = [this.state.selected, payload]
    this.dates.filter(d => d !== null)
    .filter(d => ( d.classList && !d.classList.contains('prev')
     && !d.classList.contains('next')) 
     && range[0].day <= parseInt(d.innerText) 
     && range[1].day >= parseInt(d.innerText))
    .forEach(d => {
      if (d.classList.contains('selected')) {
        d.classList.remove('selected')
        d.classList.add('in-range')
      }
      d.classList.add('in-range')
    })
    this.handleFocus(payload)
  };
  
  findToday = () => {
    const today = this.props.today
    if (document.querySelector('.monthly-calendar--month__year').innerText === getYear(today).toString() && document.querySelector('.monthly-calendar--month__month-num').innerText === String(getMonth(today) + 1)) {
      const dom = document.querySelector(`.monthly-calendar--dates__day${getDate(today)}`)
      dom.classList.add('today')

    }
  }

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

  handleFocus(payload) {
    const rows = _.chunk(this.dates.filter(d => d !== null), 7)
    const selected = this.state.selected
    if (JSON.stringify(selected) === JSON.stringify({})) {
      return;
    }
    const range = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx)
    const cellRange = (selected > payload) ? range(payload.day, selected.day) : range(selected.day, payload.day)
    const filtered = rows.filter(r => !r.some(el => cellRange.includes(parseInt(el.innerText))))
    filtered.forEach(d => d.forEach(element => element.classList.toggle('unfocused')))
    this.setState({
      selected: {}
    })
  }

  handleUnFocus() {

  }

  copyCells() {
    
  }

  componentDidMount() {
    this.findToday()
  }

  componentDidUpdate() {
    this.findToday()
  }

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
                {
                    [
                      ...head_days,
                      ...[...Array(
                        getDaysInMonth(
                          new Date(data.year, data.month, data.date)
                        )
                      ).keys()].map(d => d+1),
                      ...tail_days
                    ].map((day, key) => (
                      <div
                        className={`monthly-calendar--dates__day${key}`}
                        key={key}
                        ref={(ref) => this.dates[key] = ref}
                        onClick={this.handleDayClick.bind(this)}
                      >
                        {day}
                      </div>
                    ))
                  }
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
        {/* {this.state.selected.day  && (
          <DaysDialog current={this.state.monthIdx}/>
        )} */}
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
  },
  today: new Date()
});

export default withDefaultProps(MonthlyCalendar);
