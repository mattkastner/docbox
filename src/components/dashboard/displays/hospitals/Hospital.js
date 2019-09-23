import React, {useState, useEffect} from 'react';
import {CardContent, Table, TableCell, TableHead, TableRow, TableBody, IconButton, Typography} from '@material-ui/core';
import Title from '../../Title';

import {connect} from 'react-redux'

import {updateDisplay} from '../../../../redux/reducers/mainReducer'

import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import './hospital.css'


function Hospital(props) {
  
  //make a variable to hold which ever data is the current screen
  const [rows, setRows] = useState([])
  const [data, setData] = useState('')
  
  useEffect(() => {
    const {id} = props.match.params
    axios.get(`/api/doctor/hospital/${id}`).then(res => {
      console.log(res.data)
      if(res.data.length > 0){
        setRows(res.data)
        setData(res.data[0])
        props.updateDisplay(res.data)
      } else {
        alert('That hospital has not yet set up any doctors.')
        props.history.push(`/hospitals`)
      }
    })
  },[rows[0] && rows[0].name])
  return (
    <>
      <div className="title-addhospital">
        <CardContent>
          <div className="edit-title">
            <Title className="title">{data.name}</Title>
            <div className="edit">
              <IconButton >
                <EditIcon fontSize="small"/>
              </IconButton>
              <IconButton >
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </div>
          </div>
          <Typography color="textSecondary">
            Contact
          </Typography>
          <Typography variant="body2" component="h2" gutterBottom>
            {console.log("data.contact:", data)}
            {data.contact ? data.contact : "(000) - 000 - 0000"}
          </Typography>
          <Typography color="textSecondary">
            Address
          </Typography>
          <Typography variant="body2" component="p">
            {data.hospital_address}, {data.hospital_city} {data.hospital_state}, {data.hospital_zip}
          </Typography>
        </CardContent>
        <div className="add-btn" >
          <Link className="add-link" onClick={() => props.history.push(`/doctors/create`)}>
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
            <TableRow className="doctor-link" onClick={() => {
              console.log(row)
              props.history.push(`/doctors/${row.id}`)}
              } key={i}>
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

export default withRouter(connect(mapStateToProps, {updateDisplay})(Hospital))