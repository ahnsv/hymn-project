import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import HymnHeader from "./components/HymnHeader/HymnHeader";
import HymnNewLayout from "./components/HymnLayout/HymnNewLayout";
import { Swipeable } from "react-swipeable";
import HymnTodoLayout from "./components/HymnLayout/HymnTodoLayout";
import { HymnSchedulerWithDialog } from "./components/HymnScheduler/HymnSchedulers";
import gauge from "./assets/icons/gauge.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const App = (props) => {
  const imgGauge = (<img src={gauge} alt={`gauge`}/>);
  const [todoToggle, setTodoToggle] = useState(false);
  const [handleElements, setHandleElements] = useState(null);
  const todoLayout = document.querySelector(".todo-layout");
  const todoRef = useRef(todoLayout);
  const dock = document.querySelector(".main-dock");
  const dockRef = useRef(dock);
  // TODO: bring back to initial state when transition happens
  useEffect(() => {
    if (todoToggle) {
      setTimeout(() => {
        setHandleElements({
          theme: "half",
          color: "#f5d908"
        });
        todoRef.current.style.opacity = "1";
        todoRef.current.style.transition = "opacity 500ms linear";
        dockRef.current.style.display = "none";
      }, 300);
      return () => {
        if (todoToggle) {
          setHandleElements(null)
        }
      }
    }
  }, [todoToggle]);
  const Home = ({linkProp}) => {
    return (
      <HymnNewLayout {...handleElements}>
        <HymnHeader linkProp={linkProp}/>
        <Swipeable onSwipedUp={() => setTodoToggle(true)}>
          <div className={`main-dock ${todoToggle ? "toggled" : ""}`} ref={dockRef}/>
        </Swipeable>
        <HymnTodoLayout refProp={todoRef} style={{ opacity: "0" }}/>
      </HymnNewLayout>
    );
  };

  const Scheduler = () => {
    return (
      <HymnNewLayout theme={`half`}>
        <HymnHeader title={`CALENDAR`} right={imgGauge}/>
        <HymnSchedulerWithDialog/>
      </HymnNewLayout>
    );
  };

  return (
    <div className="App">
      <Router>
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition classNames={`page`} key={location.key} timeout={500}>
              <Switch>
                <Route exact path={`/`} render={() => (<Home linkProp={`/scheduler`}/>)}/>
                <Route path={`/scheduler`} component={Scheduler}/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}/>
      </Router>
    </div>
  );

};

export default App;
