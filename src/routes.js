import React from 'react'
import {Switch, Route} from 'react-router-dom'

//Import components
import SignUp from './components/doc-sign-up/SignUp'
import SignIn from './components/sign-in/SignIn'
import Dashboard from './components/dashboard/Dashboard'

//Router
export default (
    <Switch>
        <Route path="/sign_up/:id" component={SignUp}/>
        <Route path="/sign_in" component={SignIn}/>
        <Route path="/" component={Dashboard}/>
    </Switch>
)