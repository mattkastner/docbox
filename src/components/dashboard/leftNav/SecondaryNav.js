import React, {useState, useEffect} from 'react';
import {ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

const SecondaryListItems = (props) => {
  const [isAdmin, setIsAdmin] = useState('');

  useEffect(() => {
    axios.get('/auth/verify').then(res => {
      console.log(res.data)
      setIsAdmin(res.data)
    })
  })

  return (
    <>
    {isAdmin === 'manager' ?
      <div>
        <ListItem button onClick={() => props.history.push('/employees')}>
          <ListItemIcon >
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Admins" />
        </ListItem>
      </div>
      :
      null}
    </>)
}

function mapStateToProps(state){
  return state
}

export default withRouter(connect(mapStateToProps)(SecondaryListItems))