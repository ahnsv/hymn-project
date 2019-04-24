import React from "react";

const HymnSchedulerDailyTodo = (props) => {
  const todoData = [
    {
      date: "2019-04-18", title: "밥 먹기", important: true, due: ""
    },
    {
      date: "2019-04-19", title: "밥 먹기", important: false, due: ""
    }
  ];
  // TODO: query todos from mobx
  return (
    <div className="hymn-scheduler-daily-todo-wrapper">
      {todoData.map((t, idx) => (
        <div className="hymn-scheduler-daily-todo" key={idx}>
          <div className="daily-todo-title">{t.title}</div>
          <div className="daily-todo-importance">
            {t.important ? "important, bitch" : "meh"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HymnSchedulerDailyTodo;
