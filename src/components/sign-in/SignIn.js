import React, {useState} from 'react';
import {useScrollTrigger, Toolbar, Slide, AppBar, Avatar, Button, CssBaseline, TextField, Link, Box, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import WidgetsIcon from '@material-ui/icons/Widgets'

import {connect} from 'react-redux'

import axios from 'axios'
import {withRouter} from 'react-router-dom'

import '../additional.css'

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        docbox
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignIn(props) {
  const classes = useStyles();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleEmail = (value) => {
    setEmail(value)
  }
  
  const handlePassword = (value) => {
    setPassword(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submit')
    axios.post('/auth/login', {email, password}).then(res => {
      console.log(props.history)
      console.log('push to "/"')
      props.history.push('/')
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className='hide-on-scroll-container'>
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <WidgetsIcon /><Typography variant="h5">docbox</Typography>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={event => handleEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => handlePassword(event.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            onClick={() => setCheckbox(!checkbox)}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function mapStateToProps(state){
  return state
}

export default withRouter(connect(mapStateToProps)(SignIn))