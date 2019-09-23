import React from 'react';
import {ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ApartmentIcon from '@material-ui/icons/Apartment'; 
import PeopleIcon from '@material-ui/icons/People';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const mainListItems = (props) => {
  return (
    <div>
      <ListItem button onClick={() => props.history.push('/')}>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => props.history.push('/hospitals')}>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Hospitals" />
      </ListItem>
      <ListItem button onClick={() => props.history.push('/doctors')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Doctors" />
      </ListItem>
      <ListItem button onClick={() => props.history.push('/certifications')}>
        <ListItemIcon>
          <SubtitlesIcon />
        </ListItemIcon>
        <ListItemText primary="Certifications" />
      </ListItem>
    </div>
  )
}

function mapStateToProps(state){
  return state
}

export default withRouter(connect(mapStateToProps)(mainListItems))