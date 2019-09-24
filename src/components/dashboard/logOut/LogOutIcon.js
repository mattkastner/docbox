import React from 'react';
import {withRouter} from 'react-router-dom'

import {ClickAwayListener, Grow, IconButton, Paper, Popper, MenuItem, MenuList} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import axios from 'axios'

import {clearUser} from '../../../redux/reducers/mainReducer'
import {connect} from 'react-redux'

import './logout.css'

function LogOutIcon(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function logOut(event) {
    axios.delete('/auth/logout').then(() => {
      props.clearUser()
      props.history.push('/sign_in')
      handleClose(event)
    })
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    
    setOpen(false);
  }

  return (
    <div>
        <IconButton color="inherit"
          ref={anchorRef}
          aria-controls="menu-list-grow"
          aria-haspopup="true"
          onClick={handleToggle}>
          <AccountCircle fontSize="large"/>
        </IconButton>
        <Popper className={open ? "do-nothing" : "menu-closed"} open={open} anchorEl={anchorRef.current} keepMounted transition disablePortal>
            {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
                <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <MenuItem onClick={logOut}>Logout</MenuItem>
                    </MenuList>
                </ClickAwayListener>
                </Paper>
            </Grow>
            )}
        </Popper>
    </div>
  );
}


function mapStateToProps(state){
  return state
}

export default withRouter(connect(mapStateToProps, {clearUser})(LogOutIcon))