import React, { Component } from "react";
import "./App.scss";
import { HymnSchedulerWithDialog } from "./components/HymnScheduler/HymnScheduler";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HymnSchedulerWithDialog/>
      </div>
    );
  }
}

export default App;
