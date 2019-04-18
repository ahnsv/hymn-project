import React, { useReducer, useEffect } from "react";
import { Swipeable } from "react-swipeable";

const HymnLayout = props => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "Up":
        if (state.row === props.children.length - 1)
          return { row: state.row, stage: state.stage };
        return { row: state.row + 1, stage: state.stage };
      case "Down":
        if (state.row === 0) return { row: state.row, stage: state.stage };
        return { row: state.row - 1, stage: state.stage };
      case "Left":
        // TODO: figure out how to get length of children's children
        return { stage: state.stage + 1, row: state.row };
      case "Right":
        if (state.row === 0) return { row: state.row, stage: state.stage };
        return { stage: state.stage - 1, row: state.row };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, { row: 0, stage: 0 });
  useEffect(() => {
    console.log(`state got changed to row: ${state.row} stage: ${state.stage}`)
  }, [state]);
  return (
    <div className="hymn-layout">
      <Swipeable
        onSwipedRight={() => dispatch({ type: "Right" })}
        onSwipedLeft={() => dispatch({ type: "Left" })}
        onSwipedUp={() => dispatch({ type: "Up" })}
        onSwipedDown={() => dispatch({ type: "Down" })}
      >
        {props.children[state.row] &&
          React.cloneElement(props.children[state.row], {
            in: true,
            stage: state.stage
          })}
      </Swipeable>
    </div>
  );
};

export default HymnLayout;
