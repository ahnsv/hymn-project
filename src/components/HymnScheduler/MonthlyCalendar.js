import React, { Component } from 'react'
import { getMonth, getYear, getDate, getDaysInMonth } from 'date-fns'
import { defaultProps } from 'recompose'

class MonthlyCalendar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { selectedDay, selectedMonth, selectedYear } = this.props
        return (
            <div className="monthly-calendar">
                {
                    [...Array(getDaysInMonth(new Date(selectedYear, selectedMonth, selectedDay))).keys()].map(i => i + 1).map((day, key) => <div key={key} className={`monthly-calendar--day${key}`}>{day}</div>)
                }
            </div>
        )
    }
}

const withDefaultProps = defaultProps({
    selectedYear: getYear(new Date()),
    selectedMonth: getMonth(new Date()),
    selectedDay: getDate(new Date())
})

export default withDefaultProps(MonthlyCalendar)