import React, {useState, useEffect} from 'react';
import {Table, TableCell, TableHead, TableRow, TableBody, Typography} from '@material-ui/core';
import Title from '../../Title';

import {connect} from 'react-redux'

import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


function Search(props) {
  
  //make a variable to hold which ever data is the current screen
  let data = []
  let typeID = 2
  let types = [
    {
        title: 'Exp. Certifications',
        head: ["Exp. Date", "Name", "Desciption", "Email", "Days Left"],

    },
    {
        title: 'Hospitals',
        head: ["Name", "Address", "Contact", "Doctors"]
    }, 
    {
        title: 'Doctors',
        head: ["Name", "Specialty", "Email", "Phone"]
    }, {
        title: 'Certifications',
        head: [""],
        values: ["{row.first_name} {row.last_name}", "{row.board_certification_exam}", "{row.email}", "{row.phone}"]
    }]
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    data = props.main.displayArray
    // typeID = 
  })

  const tableHeadDisplay = () => {
      let mappedHeader = types[typeID].head.map((tableName, i) => {
          return <TableCell>{tableName}</TableCell>
      })
      return (
        <>
            {mappedHeader}
        </>
      )
  }
  return (
    <>
      <div className="title-addhospital">
        <Title>{types[typeID]}</Title>
        <Link className="add-btn" onClick={() => {}}>
          <AddCircleOutlineIcon color="primary" className="add"/><Typography variant="body2" color="primary">add doctor</Typography>
        </Link>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* header */}
            {/* {tableHeadDisplay()} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow className="hospital-link" onClick={() => props.history.push(`hospital/${row.id}`)} key={i}>
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

export default withRouter(connect(mapStateToProps)(Search))