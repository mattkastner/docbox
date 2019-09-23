//create the initial state
const initialState = {
    certifications: [],
    firstName: '',
    lastName: '', 
    addressLine: '', 
    city: '', 
    state: '', 
    zip: '', 
    country: '',
    email: '',
    phone: '',
    textNotifications: false,
    undergraduateCollege: '', 
    undergraduateDegree: '', 
    graduateCollege: '', 
    graduateDegree: '', 
    residencyClinic: '', 
    boardExam: '', 
    boardExamID: '',
}

//action types
const UPDATE_DOCTOR = 'UPDATE_DOCTOR'
const UPDATE_CERTIFICATIONS = 'UPDATE_CERTIFICATIONS'

//actions builder {dispatchers}
export function updateDoctor(data){
    return {
        type: UPDATE_DOCTOR,
        payload: data
    }
}

export function updateDocCerts(data){
    console.log("updateDocCerts:", data)
    return {
        type: UPDATE_CERTIFICATIONS,
        payload: data
    }
}

//reducer
export default function docReducer(state = initialState, action){
    switch(action.type){
        case UPDATE_DOCTOR:
            return {...state, ...action.payload}
        case UPDATE_CERTIFICATIONS:
            const newCerts = [...action.payload]
            return {...state, certifications: newCerts}
        default:
            console.log('default')
            return state
    }
}
