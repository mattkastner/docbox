
//create the initial state
const initialState = {}

//action types
const ADD_USER = 'ADD_USER'

//actions builder {dispatchers}
export function addUser(user){
    return {
        type: ADD_USER,
        payload: user
    }
}

//reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        case ADD_USER:
            return {...state}
        default:
            console.log('default')
            return state
    }
}

