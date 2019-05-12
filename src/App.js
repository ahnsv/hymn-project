import React, { Component } from "react";
import "./App.scss";
import { HymnSchedulerWithDialog } from "./components/HymnScheduler/HymnScheduler";
import HymnHeader from "./components/HymnHeader/HymnHeader";
import HymnNewLayout from "./components/HymnLayout/HymnNewLayout";

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
        <HymnNewLayout>
          <HymnHeader/>
          <div className={`main-dock`} style={{}}/>
        </HymnNewLayout>
      </div>
    );
  }
}

export default App;
