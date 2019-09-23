import React, {useState, useEffect} from 'react';
import {Table, TableCell, TableHead, TableRow, TableBody, Typography} from '@material-ui/core';
import Title from '../../Title';

import {connect} from 'react-redux'

import {updateDisplay} from '../../../../redux/reducers/mainReducer'

import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import './hospital.css'


function Hospitals(props) {
  
  //make a variable to hold which ever data is the current screen
  const [rows, setRows] = useState([])
  console.log('here1')
  useEffect(() => {

    axios.get('/api/hospital/view').then(res => {
      console.log("res.data:", res)
      setRows(res.data)
      props.updateDisplay(res.data)
    })
  },[])
  return ( 
      <>
        <div className="title-addhospital">
          <Title>Hospitals</Title>
          <div className="add-btn" >
            <Link className="add-link" to="/hospitals/create">
              <AddCircleOutlineIcon color="primary" className="add"/><Typography variant="body2" color="primary">add hospitals</Typography>
            </Link>
          </div>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Doctors</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow className="hospital-link" onClick={() => props.history.push(`hospitals/${row.id}`)} key={i}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address_line}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.doctor_count}</TableCell>
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

export default withRouter(connect(mapStateToProps, {updateDisplay})(Hospitals))