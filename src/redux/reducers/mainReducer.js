//create the initial state
const initialState = {
    userTitle: '',
    displayArray: []
}

//action types
const UPDATE_DISPLAY = 'UPDATE_DISPLAY'
const UPDATE_USER = 'UPDATE_USER'
const CLEAR = 'CLEAR'

//actions builder {dispatchers}
export function updateDisplay(data){
    return {
        type: UPDATE_DISPLAY,
        payload: data
    }
}

//update the userTitle on state
export function updateUser(data){
    console.log(data)
    return {
        type: UPDATE_USER,
        payload: data
    }
}

export function clearUser(){
    return {
        type: CLEAR
    }
}

//reducer
export default function mainReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_DISPLAY:
            return {...state, ...action.payload}
        case UPDATE_USER:
            console.log("in update user")
            return {...state, userTitle: action.payload}
        case CLEAR:
            return {...state, userTitle: '', displayArray: []}
        default:
            console.log('default')
            return state
    }
}
