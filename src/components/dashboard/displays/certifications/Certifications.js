import React, {useState, useEffect} from 'react';
import {Table, TableCell, TableHead, TableRow, TableBody} from '@material-ui/core';
import Title from '../../Title';

import {connect} from 'react-redux'
import {updateDisplay} from '../../../../redux/reducers/mainReducer'

import axios from 'axios'
import {withRouter} from 'react-router-dom'

import './certification.css'
import moment from 'moment'


function Certifications(props) {
  
  //make a variable to hold which ever data is the current screen
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    axios.get('/api/certification/view').then(res => {
      console.log("res.data:", res.data)
      setRows(res.data)
      props.updateDisplay(res.data)
    })
  },[])
  return (
    <>
      <div className="title-addcertification">
        <Title>Certifications</Title>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Expiration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow className="cert-link" onClick={() => props.history.push(`certifications/${row.id}`)} key={i}>
              <TableCell>{row.certification_name}</TableCell>
              <TableCell>{row.certification_desc}</TableCell>
              <TableCell>{row.first_name} {row.last_name}</TableCell>
              <TableCell>{moment(row.certification_exp).format('MMMM Do YYYY')}</TableCell>
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

export default withRouter(connect(mapStateToProps, {updateDisplay})(Certifications))