import React, {useState, useEffect} from 'react';
import {Table, TableCell, TableHead, TableRow, TableBody, Typography} from '@material-ui/core';
import Title from '../../Title';

import {connect} from 'react-redux'

import {updateDisplay} from '../../../../redux/reducers/mainReducer'

import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import './employee.css'


function Doctors(props) {
  
  //make a variable to hold which ever data is the current screen
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    axios.get('/api/employee/view').then(res => {
      console.log("res.data:", res.data.employees)
      setRows(res.data.employees)
      props.updateDisplay(res.data.employees)
    })
  },[rows[0] && rows[0].email])
  return (
    <>
      <div className="title-addhospital">
        <Title>Employees</Title>
        <div className="add-btn" >
          <Link className="add-link" to="/employees/create">
            <AddCircleOutlineIcon color="primary" className="add"/><Typography variant="body2" color="primary">add employee</Typography>
          </Link>
        </div>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow className="doctor-link" onClick={() => props.history.push(`/employees/${row.id}`)} key={i}>
              <TableCell>{row.first_name} {row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div> */}
    </>
  );
}

function mapStateToProps(state){
  return state
}

export default withRouter(connect(mapStateToProps, {updateDisplay})(Doctors))