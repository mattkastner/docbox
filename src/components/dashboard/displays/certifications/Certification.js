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

import './certification.css'
import moment from 'moment'


function Doctor(props) {
  
  //make a variable to hold which ever data is the current screen
  // const [rows, setRows] = useState(null)
  const [data, setData] = useState([])
  const [edit, setEdit] = useState(false)

  const [id, setID] = useState(-1)
  const [docID, setDocID] = useState(-1)
  const [certification_name, setName] = useState('')
  const [certification_desc, setDesc] = useState('')
  const [certification_id, setCertID] = useState('')
  const [certification_exp, setExp] = useState('')
  const [certification_img, setImg] = useState('')
  
  const setValues = (data) => {
    console.log(data)
    setID(data.id)
    setDocID(data.doctor_id)
  }
  
  useEffect(() => {
    const {id} = props.match.params
    console.log(id)
    axios.get(`/api/certification/${id}`).then(res => {
      console.log("res.data:", res.data)
      setData(res.data)
      setValues(res.data)
      props.updateDisplay(res.data)
    })
  },[])

  const pullData = () => {
    axios.get(`/api/certification/${id}`).then(res => {
      console.log("res.data:", res.data)
      setData(res.data)
      setValues(res.data)
      props.updateDisplay(res.data)
    })
  }

  const onSubmit = () => {
    console.log('submit')
    const body = {id, docID, certification_name, certification_desc, certification_id, certification_exp, certification_img}
    axios.put(`/api/doctor/general/${id}`, body).then(() => {
      setName('')
      setDesc('')
      setCertID('')
      setExp('')
      setImg('')

      //update all the data
      pullData()
      setEdit(!edit)
    })
  }

  const deleteCert = () => {
    axios.delete(`/api/certification/${props.match.params.id}`).then(res => {
      props.history.push('/certifications')
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
              {data.certification_name}
            </Typography>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={certification_name}
              onChange={(e)=>setName(e.target.value)}
              margin="normal"
              variant="outlined"
            /> 
            </> : data.certification_name}</Title>
            {edit ? 
              null
              :
              <div className="edit">
                <IconButton onClick={() => setEdit(!edit)}>
                  <EditIcon fontSize="small"/>
                </IconButton>
                <IconButton >
                  <DeleteIcon onClick={deleteCert} fontSize="small"/>
                </IconButton>
              </div>
            }
          </div>
          <Typography color="textSecondary">
            Description
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {edit ? <TextField
              id="outlined-name"
              label="Description"
              className={classes.textField}
              value={certification_desc}
              onChange={(e)=>setDesc(e.target.value)}
              margin="normal"
              variant="outlined"
            /> : data.certification_desc}
          </Typography>
          <Typography color="textSecondary">
            Certification ID
          </Typography>
          <Typography variant="body2" component="h2" gutterBottom>
            {edit ? 
              <TextField
                id="outlined-name"
                label="Certification ID"
                className={classes.textField}
                value={certification_id}
                onChange={(e)=>setCertID(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            : (data.certification_id)}
          </Typography>
          <Typography color="textSecondary">
            Expire date
          </Typography>
          <Typography variant="body2" component="h2" gutterBottom>
            {edit ? 
              <TextField
                id="outlined-name"
                label="Certification ID"
                className={classes.textField}
                value={certification_id}
                onChange={(e)=>setCertID(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            : moment(data.certification_exp).format('MMMM Do YYYY')}
          </Typography>
          <Typography color="textSecondary">
            Certification image
          </Typography>
          <Typography variant="body2" component="h2" gutterBottom>
            {edit ? 
              <TextField
                id="outlined-name"
                label="Certification ID"
                className={classes.textField}
                value={certification_img}
                onChange={(e)=>setImg(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            : (data.certification_desc)}
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

export default withRouter(connect(mapStateToProps, {updateDisplay})(Doctor))