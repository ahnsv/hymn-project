import React, { useState, useEffect, useRef } from "react";
import "./App.scss";
import HymnHeader from "./components/HymnHeader/HymnHeader";
import HymnNewLayout from "./components/HymnLayout/HymnNewLayout";
import { Swipeable } from "react-swipeable";
import HymnTodoLayout from "./components/HymnLayout/HymnTodoLayout";
import { HymnSchedulerWithDialog } from "./components/HymnScheduler/HymnScheduler";
import gauge from './assets/icons/gauge.svg'

const App = (props) => {
  const imgGauge = (<img src={gauge} alt={`gauge`}/>);
  const [todoToggle, setTodoToggle] = useState(false);
  const [handleElements, setHandleElements] = useState(null);
  const todoLayout = document.querySelector('.todo-layout');
  const todoRef = useRef(todoLayout);
  useEffect(() => {
    if (todoToggle) {
      setTimeout(()=> {
        setHandleElements({
          theme: 'half',
          color: '#f5d908',
        });
        setTodoToggle(false);
        todoRef.current.style.display = 'block';
      }, 1000)
    }
  }, [todoToggle]);

  return (
    <div className="App">
      <HymnNewLayout {...handleElements}>
        <HymnHeader />
        <Swipeable onSwipedUp={() => setTodoToggle(true)}>
          <div className={`main-dock ${todoToggle ? 'toggled' : ''}`}/>
        </Swipeable>
        <HymnTodoLayout refProp={todoRef} style={{display: 'none'}}/>
      </HymnNewLayout>
    </div>
  );

};

export default App;
