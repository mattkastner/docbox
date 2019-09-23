import React from 'react'
import {Switch, Route} from 'react-router-dom'

//Import components
import MainDisplay from './displays/mainDisplay/MainDisplay'
import CreateHosp from './displays/hospitals/CreateHosp'
import Hospitals from './displays/hospitals/Hospitals'
import Hospital from './displays/hospitals/Hospital'
import Doctors from './displays/doctors/Doctors'
import Doctor from './displays/doctors/Doctor'
import CreateDoc from './displays/doctors/CreateDoc'
import Certifications from './displays/certifications/Certifications'
import Certification from './displays/certifications/Certification'
import CreateEmp from './displays/employees/CreateEmp'
import Employees from './displays/employees/Employees'
import Employee from './displays/employees/Employee'

//Router
export default (
    <Switch>
        <Route exact path="/" component={MainDisplay}/>
        <Route path="/hospitals/create" component={CreateHosp}/>
        <Route path="/hospitals/:id" component={Hospital}/>
        <Route path="/hospitals" component={Hospitals}/>
        <Route path="/doctors/create" component={CreateDoc}/>
        <Route path="/doctors/:id" component={Doctor}/>
        <Route path="/doctors" component={Doctors}/>
        <Route path="/certifications/:id" component={Certification}/>
        <Route path="/certifications" component={Certifications}/>
        <Route path="/employees/create" component={CreateEmp}/>
        <Route path="/employees/:id" component={Employee}/>
        <Route path="/employees" component={Employees}/>
        {/* <Route path="/search" component={Search}/> */}
    </Switch>
)