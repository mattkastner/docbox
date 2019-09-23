import React, {useState, useEffect} from 'react';
import {MenuItem, Select, FormControl, InputLabel, Button, TextField, IconButton, Typography, CardContent} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Title from '../../Title';

import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {updateDisplay} from '../../../../redux/reducers/mainReducer'

import axios from 'axios'
import {withRouter} from 'react-router-dom'

import './employee.css'


function Employee(props) {
  
  // const [labelWidth, setLabelWidth] = React.useState(0);
  //make a variable to hold which ever data is t he current screen
  const [rows, setRows] = useState(null)
  const [data, setData] = useState([])
  const [edit, setEdit] = useState(false)

  const [id, setID] = useState(-1)
  const [firstName, setFirst] = useState('')
  const [lastName, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  
  const setValues = (data) => {
    console.log(data)
    setFirst(data.first_name)
    setLast(data.last_name)
    setEmail(data.email)
    console.log(email)
    setTitle(data.title)
  }
  
  useEffect(() => {
    // setLabelWidth(inputLabel.current.offsetWidth);
    const {id} = props.match.params
    console.log(id)
    setID(id)
    axios.get(`/api/employee/${id}`).then(res => {
      console.log("res.data:", res.data)
        setRows(res.data)
        setData(res.data)
        setValues(res.data)
        props.updateDisplay(res.data)
        console.log(res.data)
    })
  },[])

  const pullData = () => {
    axios.get(`/api/employee/${id}`).then(res => {
      console.log("res.data:", res.data)
      setRows(res.data)
      setData(res.data)
      setValues(res.data)
      props.updateDisplay(res.data)
    })
  }

  const onSubmit = () => {
    console.log('submit')
    const body = {firstName, lastName, email, title}
    axios.put(`/api/employee/${id}`, body).then(() => {

      //update all the data
      pullData()
      setEdit(false)
    })
  }

  const deleteDoctor = () => {
    axios.delete(`/api/employee/${props.match.params.id}`).then(res => {
      props.history.push('/employees')
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
  const inputLabel = React.useRef(null);
  const classes = useStyles();
  
  return (
    <>
      {console.log(data)}
      <div className="title-addhospital">
        <CardContent>
          <div className="edit-title">
            <Title className="title">
            {edit ? 
            <>
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
            </> 
            : 
              (data.first_name + " " + data.last_name)
            }
            </Title>
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
            Title
          </Typography>
          <Typography variant="body2" component="h2" gutterBottom>
            {edit ? 
              <FormControl variant="outlined" className={classes.formControl}>
                {/* <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                  Title
                </InputLabel> */}
                <Select
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  margin="normal"
                  // labelWidth={labelWidth}
                  inputProps={{
                    name: 'title',
                    id: 'outlined-age-simple',
                  }}
                >
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            : (data.title)}
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
      </div>
    </>
  );
}

function mapStateToProps(state){
  return state
}

export default withRouter(connect(mapStateToProps, {updateDisplay})(Employee))