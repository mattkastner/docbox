import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './redux/store'
import {HashRouter} from 'react-router-dom'
// import * as firebase from 'firebase'

// firebase.initializeApp(config)
const dailyChecker = setTimeout(() => {
    console.log('This will run after 1 second!')
}, 86400000);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            {() => dailyChecker()}
            <App />
        </HashRouter>
    </Provider>
    , document.getElementById('root'));