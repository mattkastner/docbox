import React, {useState, useEffect} from 'react';
import {Table, TableCell, TableHead, TableRow, TableBody, Typography} from '@material-ui/core';
import Title from '../../Title';

import {connect} from 'react-redux'

import {updateDisplay} from '../../../../redux/reducers/mainReducer'

import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import './doctor.css'


function Doctors(props) {
  
  //make a variable to hold which ever data is the current screen
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    axios.get('/api/doctor/view').then(res => {
      console.log("res.data:", res.data[0].name)
      setRows(res.data)
      props.updateDisplay(res.data)
    })
  },[rows[0] && rows[0].first_name])
  return (
    <>
      <div className="title-addhospital">
        <Title>Doctors</Title>
        <div className="add-btn" >
          <Link className="add-link" to="/doctors/create">
            <AddCircleOutlineIcon color="primary" className="add"/><Typography variant="body2" color="primary">add doctor</Typography>
          </Link>
        </div>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Specialty</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow className="doctor-link" onClick={() => props.history.push(`/doctors/${row.id}`)} key={i}>
              <TableCell>{row.first_name} {row.last_name}</TableCell>
              <TableCell>{row.board_certification_exam}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
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