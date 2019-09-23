//create the initial state
const initialState = {
    certificationName: '', 
    certificationDesc: '', 
    certificationID: '', 
    certificationExp: '', 
    certificationImg: ''
}

//action types
const UPDATE_CERTIFICATION = 'UPDATE_CERTIFICATION'

//actions builder {dispatchers}
export function updateCertification(data){
    return {
        type: UPDATE_CERTIFICATION,
        payload: data
    }
}

//reducer
export default function certReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_CERTIFICATION:
            return {...state, ...action.payload}
        default:
            console.log('default')
            return state
    }
}
