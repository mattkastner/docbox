import React, {useState, useEffect} from 'react'
import {Grid, Avatar, Container, Button, CssBaseline, TextField, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ApartmentIcon from '@material-ui/icons/Apartment'

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


function CreateHosp(props) {
    const classes = useStyles();
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')

    const submitForm = (event) => {
      event.preventDefault()
      let createInfo = {name, address, city, state, zip, country, email}
      let createPath = `/api/hospital`
      axios.post(createPath, createInfo).then(res => {
        //create a new hospital
        console.log(res.data)
        setName('')
        setAddress('')
        setCity('')
        setState('')
        setZip('')
        setCountry('')
        setEmail('')
      })
    }

    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ApartmentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Add Hospital
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="zip"
                      label="Zip"
                      name="zip"
                      onChange={(e) => setZip(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="state"
                      label="State"
                      name="state"
                      onChange={(e) => setState(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="country"
                      label="Country"
                      name="country"
                      onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="contact"
                    label="Email Contact"
                    name="email"
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
                  onClick={submitForm}
              >
                  Add Hospital
              </Button>
            </div>
          </form>
      </div>
      </Container>
  );
}

export default withRouter(CreateHosp)