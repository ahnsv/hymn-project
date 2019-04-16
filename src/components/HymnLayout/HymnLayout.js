import React, { useReducer, useEffect } from 'react'
import { Swipeable } from 'react-swipeable'

const reducer = (state, action) => {
    switch (action.type) {
        case 'Up':
            return { row: state.row + 1, stage: state.stage }

        case 'Down':
            return { row: state.row - 1, stage: state.stage}

        case 'Left':
            return { stage: state.stage + 1, row: state.row}

        case 'Right':
            return { stage: state.stage - 1, row: state.row}
        default:
            return state
    }
}
const HymnLayout = (props) => {
    const [state, dispatch] = useReducer(reducer, { row: 0, stage: 0 })
    useEffect(() => {
        console.log('rendered!')
    })
    return (
        <div className="hymn-layout">
            <Swipeable onSwipedRight={() => dispatch({ type: 'Right' })} onSwipedLeft={() => dispatch({ type: 'Left' })} onSwipedUp={() => dispatch({ type: 'Up' })} onSwipedDown={() => dispatch({ type: 'Down' })}>
                {props.children[state.stage]}
                Stage : {state.stage}
                Row : {state.row}
            </Swipeable>
        </div>
    )
}

export default HymnLayout