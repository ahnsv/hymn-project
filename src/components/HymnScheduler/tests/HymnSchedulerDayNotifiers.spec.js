import React from "react";
import HymnSchedulerDayNotifiers from '../HymnSchedulerDayNotifiers'

const testDateData = new Date(2019, 4, 16);

const testScheduleData = [
  {
    title: "밥먹기",
    date: new Date(2019, 4, 16),
    important: true,
    category: 'military'
  },
  {
    title: "밥먹기2",
    date: new Date(2019, 4, 16),
    important: true,
    category: 'military'
  },
  {
    title: "담배 각?",
    date: new Date(2019, 4, 17),
    important: false,
    category: 'military'
  },
  {
    title: "데이트",
    date: [new Date(2019, 5, 16), new Date(2019, 5, 20)],
    important: true,
    category: 'goal'
  }
];

it('Should return two dots', () => {

})