import React, { Component } from "react";
import "./App.css";
import { HymnScheduler } from "./components/HymnScheduler/HymnScheduler";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HymnScheduler/>
      </div>
    );
  }
}

export default App;
