import React, { Component } from "react";
import "./App.scss";
import { HymnSchedulerWithDialog } from "./components/HymnScheduler/HymnScheduler";
import HymnHeader from "./components/HymnHeader/HymnHeader";

class App extends Component {
  state = {
    title: ""
  };
  setTitle = (title) => {
    this.setState({
      title: title
    });
  };

  render() {
    return (
      <div className="App">
        <HymnHeader title={this.state.title}/>
        <HymnSchedulerWithDialog setTitle={this.setTitle}/>
      </div>
    );
  }
}

export default App;
