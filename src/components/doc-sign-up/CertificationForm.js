import 'date-fns';
import React, {useState} from 'react';
import {Typography, Grid, TextField, Button, Chip, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateCertification} from '../../redux/reducers/certReducer'
import {updateDocCerts} from '../../redux/reducers/docReducer'

import axios from 'axios'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

function CertificationForm(props) {
    //set the state for date picker
    let certification = props.certification

    // useEffect(() => {
    //     //load all the original certs
    //     const {id} = props.match.params
    //     const certPath = `/api/doctor/certification/${id}`
    //     axios.get(certPath).then(res => {
    //         props.updateDocCerts(res.data.certifications)
    //     })
    // });

    //setting functional component state
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [image, setImage] = useState("")
    const [displayCerts, setDisplayCerts] = useState("certifications go here")
    // const [pictures, setPictures] = useState([])

    const classes = useStyles();


    function handleDateChange(date) {
        setSelectedDate(date);
    }

    // const onDrop = (picture) => {
    //     setPictures(pictures.concat(picture));
    // }

    const isImagedUploaded = () => {
        return image === '' ? 
            <div>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button type='file' onClick={loadImage} variant="contained" color="primary" component="span" className={classes.button}>
                        <AddAPhotoIcon fontSize='small'/><span style={{marginLeft: 1 + 'em'}}>Upload image</span>
                    </Button>
                </label>
            </div>
        :
            <Button onClick={handlePost} variant="contained" color="primary" component="span" className={classes.button} >
                Post certification
            </Button>
    }

    const loadImage = () => {
        return ''
    }

    function handleDelete(id) {
            let certPath = `/api/doctor/${id}`
            axios.delete(certPath).then(res => {
                certPath = `/api/doctor/certification/${id}`
                axios.get(certPath).then(certsResponse => {
                    props.updateDocCerts(certsResponse.data.certifications)
                })
        })
    }

    function handlePost() {

        const {id} = props.match.params
        //update the database
        let {
            certificationName, 
            certificationDesc, 
            certificationID, 
            certificationExp, 
            certificationImg
            }  = props.certification

        if(certificationExp === ''){
            certificationExp = selectedDate
        }

        if(certificationImg === ''){
            certificationImg = image
        }

        const certInfo = {
            certificationName, 
            certificationDesc, 
            certificationID,
            certificationExp, 
            certificationImg
            }
        
        let boardPath = `/api/certification/${id}`
        axios.post(boardPath, certInfo).then(res => {
            console.log("axios:",res.data)
            props.updateDocCerts(res.data)
        })
        listCerts()
        props.updateCertification({certificationName: ''})
        props.updateCertification({certificationDesc: ''})
        props.updateCertification({certificationID: ''})
        props.updateCertification({certificationExp: ''})
        props.updateCertification({certificationImg: ''})
        
        alert('You have create a certification, you may create as many as needed.');
    }

    const listCerts = () => {
        const {id} = props.match.params
        let certPath = `/api/doctor/certification/${id}`
        axios.get(certPath).then(res => {
            const mappedCerts = res.data.certifications.map((cert, i) => {
                console.log(cert)
                return (
                    <div style={{display: 'block', margin: 5 + 'px'}}>
                        <Chip
                            avatar={
                                <Avatar>
                                    <AddPhotoAlternateIcon />
                                </Avatar>
                                }
                            label={cert.certification_name}
                            onDelete={() => handleDelete(cert.id)}
                            className={classes.chip}
                            variant="outlined"
                        />
                    </div>)
            })
            setDisplayCerts(mappedCerts)
        })


        
    }

    const displayImage = () => {
        if(image){
            return (<Grid item xs={12}>
                    <Typography><AddPhotoAlternateIcon /><span style={{marginLeft: .5 + 'em'}}>{image}</span></Typography>
            </Grid>)
        }
    }
    console.log(props)
    console.log('certifications', displayCerts)
    return (
        <>
        <Typography variant="h6" gutterBottom>
            Upload certifications
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="cert_name"
                name="certification name"
                label="Certification name"
                fullWidth
                value={certification.certificationName}
                onChange={event => props.updateCertification({certificationName: event.target.value})}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="cert_desc"
                name="certification desc"
                label="Certification description"
                fullWidth
                value={certification.certificationDesc}
                onChange={event => props.updateCertification({certificationDesc: event.target.value})}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="cert_id"
                name="certification id"
                label="Certification ID"
                fullWidth
                value={certification.certificationID}
                onChange={event => props.updateCertification({certificationID: event.target.value})}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        fullWidth
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={certification.certificationExp === '' ? selectedDate : certification.certificationExp}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            {displayImage()}
            <input 
                type='text'
                value={certification.certificationImg}
                onChange={event => {
                        props.updateCertification({certificationImg: event.target.value})
                        setImage(event.target.value)
                    }}/>
            <Grid item xs={12} sm={6}>
                {isImagedUploaded()}
            </Grid>
            <Grid item xs={12}>
                {displayCerts}
            </Grid>
            <Grid item xs={12}>
            </Grid>
        </Grid>
        </>
    );
}

function mapStateToProps(state){
    return state
  }
  
  export default withRouter(connect(mapStateToProps, {updateCertification, updateDocCerts})(CertificationForm))