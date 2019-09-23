import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

//import the built reducer
import empReducer from './reducers/empReducer'
import certReducer from './reducers/certReducer'
import docReducer from './reducers/docReducer'
import hosReducer from './reducers/hosReducer'
import mainReducer from './reducers/mainReducer'

const rootReducer = combineReducers({
    employee: empReducer,
    certification: certReducer,
    doctor: docReducer,
    hospital: hosReducer,
    main: mainReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))