//create the initial state
const initialState = {
    displayArray: []
}

//action types
const UPDATE_DISPLAY = 'UPDATE_DISPLAY'

//actions builder {dispatchers}
export function updateDisplay(data){
    return {
        type: UPDATE_DISPLAY,
        payload: data
    }
}

//reducer
export default function mainReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_DISPLAY:
            return {...state, ...action.payload}
        default:
            console.log('default')
            return state
    }
}
