import React, {useState, useEffect} from 'react'
import {Grid, Link, Avatar, Container, Button, CssBaseline, TextField, Typography} from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';

import {InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

import axios from 'axios'

import {withRouter} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: '100%'
  },
}));


function CreateDoc(props) {
    const classes = useStyles();

    const [hospitalName, setHospitalName] = useState("");
    const [hospitalID, setHospitalID] = useState(-1);
  
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
  
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [hospitals, setHospitals] =useState([])
    
    const handleChange = (event) => {
      console.log(event.target.value)
      setHospitalName(event.target.value)
      setHospitalID(event.target.value)
    }

    useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
      axios.get('/api/hospital/view').then(res => {
        setHospitals(res.data)
      })
    }, []);

    const sendForm = (event) => {
      event.preventDefault()
      console.log(firstName, lastName, email, hospitalID)
      let createInfo = {firstName, lastName, email}
      let createPath = `/api/doctor/${hospitalID}`
      axios.post(createPath, createInfo).then(res => {
        //nodemailer path
        //send an email to the doctor
        console.log(res.data[0].id)
        const nodePath = `mail/${res.data[0].id}`
          axios.post(nodePath, {firstName, lastName, email}).then(response => {
            console.log(response.data)
          }).catch(error => {
            return alert('The email was unsuccessfully sent. Please verify the email.')
          })
        props.history.push('/doctors')
      })
    }
    console.log(hospitalID)
    console.log(hospitalName)
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Add Doctor
            </Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Hospital
                  </InputLabel>
                  {hospitalName !== '' ? console.log("here", hospitalName) : console.log('empty string')}
                  <Select
                    value={hospitalName}
                    // onChange={e => handleChange(e)}
                    labelWidth={labelWidth}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    inputProps={{
                      name: 'hospitalName',
                      id: 'outlined-age-simple',
                    }}
                  >
                    {
                      hospitals.map((hospital, i) => (<MenuItem key={i} value={hospital.id}>{hospital.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e) => setLastName(e.target.value)}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
              />
              </Grid>
            </Grid>
            <div className={classes.crap}>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={sendForm}
              >
                  Send Form
              </Button>
            </div>
            </form>
        </div>
        </Container>
    );
}

export default withRouter(CreateDoc)