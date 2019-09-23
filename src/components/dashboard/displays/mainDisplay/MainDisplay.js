/* eslint-disable no-script-url */

import React, {useState, useEffect} from 'react';
import {Table, TableCell, TableHead, TableRow, TableBody} from '@material-ui/core';
import Title from '../../Title';

import {connect} from 'react-redux'

import axios from 'axios'
import {withRouter} from 'react-router-dom'
import './mainDisplay.css'

import moment from 'moment'

function MainDisplay(props) {
  
  //make a variable to hold which ever data is the current screen
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    console.log('mainDisplay')
    axios.get('/api/all/doctor/certification').then(res => {
      setRows(res.data)
    })
  },[rows[0] && rows[0].certification_name])
  return (
    <>
      <Title>Expiring Certifications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Exp. Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Days Left</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} className="cert-link" onClick={() => props.history.push(`certifications/${row.id}`)}>
              <TableCell>{moment(row.certification_exp).format('MMMM Do YYYY')}</TableCell>
              <TableCell>{row.certification_name}</TableCell>
              <TableCell>{row.certification_desc}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="right" className="backdrop" id={row.days_left > 30 ? "black" : row.days_left > 7 ? "orange" : "red"}>{ row.days_left > 1 ? row.days_left : "Expired"}</TableCell>
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

export default withRouter(connect(mapStateToProps)(MainDisplay))