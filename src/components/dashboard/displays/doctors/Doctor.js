import React, {useState, useEffect} from 'react';
import {Button, TextField, IconButton, Typography, CardContent, Table, TableCell, TableHead, TableRow, TableBody} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Title from '../../Title';

import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {updateDisplay} from '../../../../redux/reducers/mainReducer'

import axios from 'axios'
import {withRouter, Link} from 'react-router-dom'

import './doctor.css'
import moment from 'moment'


function Doctor(props) {
  
  //make a variable to hold which ever data is the current screen
  const [rows, setRows] = useState(null)
  const [data, setData] = useState([])
  const [edit, setEdit] = useState(false)

  const [id, setID] = useState(-1)
  const [firstName, setFirst] = useState('')
  const [lastName, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [addressLine, setAddress] = useState('--Empty--')
  const [city, setCity] = useState('--Empty--')
  const [state, setState] = useState('--Empty--')
  const [zip, setZip] = useState('--Empty--')
  
  const setValues = (data) => {
    console.log(data)
    setID(data.doctor_id)
    setFirst(data.first_name)
    setLast(data.last_name)
    setEmail(data.email)
    setPhone(data.phone)
    setAddress(data.address_line)
    setCity(data.city)
    setState(data.state)
    setZip(data.zip)
  }
  
  useEffect(() => {
    const {id} = props.match.params
    console.log(id)
    axios.get(`/api/doctor/certification/${id}`).then(res => {
      console.log("res.data:", res.data)
      if(res.data.certifications.length > 0){
        setRows(res.data.certifications)
        setData(res.data.certifications[0])
        setValues(res.data.certifications[0])
        props.updateDisplay(res.data.certifications)
      } else {
        console.log(id)
        axios.get(`/api/get/doctor/${id}`).then((res) => {
          setData(res.data)
        })
      }
    })
  },[])

  const pullData = () => {
    axios.get(`/api/doctor/certification/${id}`).then(res => {
      console.log("res.data:", res.data)
      if(res.data.certifications.length > 0){
        setRows(res.data.certifications)
        setData(res.data.certifications[0])
        setValues(res.data.certifications[0])
        props.updateDisplay(res.data.certifications)
      } else {
        console.log(id)
        axios.get(`/api/get/doctor/${id}`).then((res) => {
          setData(res.data)
        })
      }
    })
  }

  const onSubmit = () => {
    console.log('submit')
    const body = {firstName, lastName, email, phone, addressLine, city, state, zip}
    axios.put(`/api/doctor/general/${id}`, body).then(() => {
      setFirst('')
      setLast('')
      setEmail('')
      setPhone('')
      setAddress('--Empty--')
      setCity('--Empty--')
      setState('--Empty--')
      setZip('--Empty--')

      //update all the data
      pullData()
      setEdit(!edit)
    })
  }

  const deleteDoctor = () => {
    axios.delete(`/api/doctor/${props.match.params.id}`).then(res => {
      props.history.push('/doctors')
    })
  }
  
  const useStyles = makeStyles(theme => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(1)
    }
  }));

  const classes = useStyles();
  
  return (
    <>
      {console.log(data)}
      <div className="title-addhospital">
        <CardContent>
          <div className="edit-title">
            <Title className="title">{edit ? <>
            <Typography color="textSecondary">
              Name
            </Typography>
            <TextField
              id="outlined-name"
              label="First name"
              className={classes.textField}
              value={firstName}
              onChange={(e)=>setFirst(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Last name"
              className={classes.textField}
              value={lastName}
              onChange={(e)=>setLast(e.target.value)}
              margin="normal"
              variant="outlined"
            /> 
            </> : (data.first_name + " " + data.last_name)}</Title>
            {edit ? 
              null
              :
              <div className="edit">
                <IconButton onClick={() => setEdit(!edit)}>
                  <EditIcon fontSize="small"/>
                </IconButton>
                <IconButton >
                  <DeleteIcon onClick={deleteDoctor} fontSize="small"/>
                </IconButton>
              </div>
            }
          </div>
          <Typography color="textSecondary">
            Email
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {edit ? <TextField
              id="outlined-name"
              label="Email"
              className={classes.textField}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
            /> : data.email}
          </Typography>
          <Typography color="textSecondary">
            Phone
          </Typography>
          <Typography variant="body2" component="h2" gutterBottom>
            {edit ? 
              <TextField
                id="outlined-name"
                label="Phone"
                className={classes.textField}
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            : (data.phone ? data.phone : "--Add Phone--")}
          </Typography>
          <Typography color="textSecondary">
            Address
          </Typography>
          <Typography variant="body2" component="p">
            {edit ? 
            <>
              <TextField
              id="outlined-name"
              label="Address"
              className={classes.textField}
              value={addressLine}
              onChange={(e)=>setAddress(e.target.value)}
              margin="normal"
              variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="City"
                className={classes.textField}
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="State"
                className={classes.textField}
                value={state}
                onChange={(e)=>setState(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField 
                id="outlined-name"
                label="Zip"
                className={classes.textField}
                value={zip}
                // onChange={('name')}
                margin="normal"
                variant="outlined"
              />
            </>
            : (data.address_line + ", " + data.city + " " + data.state + ", " + data.zip)}
          </Typography>
          {edit ? 
            <>
              <Button variant="contained" color="default" className={classes.button} onClick={(e) => setEdit(!edit)}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" className={classes.button} onClick={onSubmit}>
                Submit Changes
              </Button>
            </>
            : null}
        </CardContent>
        {edit ?
          null
          :
          <div className="add-btn" >
            <Link className="add-link" onClick={() => props.history.push(`/certifications/create`)}>
              <AddCircleOutlineIcon color="primary" className="add"/><Typography variant="body2" color="primary">add certifications</Typography>
            </Link>
          </div>
        }
      </div>
      {edit ? 
      null
      :
      (rows ?
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Expiration Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{false ? 
                  (<TextField
                    id="outlined-name"
                    label="First"
                    className={classes.textField}
                    // value={values.name}
                    // onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                  />) 
                  : row.certification_id}</TableCell>
                <TableCell>{false ? 
                  (<TextField
                    id="outlined-name"
                    label="Last"
                    className={classes.textField}
                    // value={values.name}
                    // onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                  />)
                  : row.certification_name}</TableCell>
                <TableCell>{false ? 
                  (<TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    // value={values.name}
                    // onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                  />)
                  : row.certification_desc}</TableCell>
                <TableCell>{false ? 
                  (<MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        fullWidth
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        // value={certification.certificationExp === '' ? selectedDate : certification.certificationExp}
                        // onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>)
                  : moment(row.certification_exp).format('MMMM Do YYYY')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        :
        null)
      }
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

export default withRouter(connect(mapStateToProps, {updateDisplay})(Doctor))