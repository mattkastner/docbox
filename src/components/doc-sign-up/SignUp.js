import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline, AppBar, Toolbar, Paper, Stepper, Step, StepLabel, Button, Link, Typography, useScrollTrigger, Slide} from '@material-ui/core'
import WidgetsIcon from '@material-ui/icons/Widgets'

import {connect} from 'react-redux'
import {updateDoctor} from '../../redux/reducers/docReducer'

import AddressForm from './AddressForm';
import EducationForm from './EducationForm';
import CertificationForm from './CertificationForm';
import ReviewForm from './ReviewForm'

import axios from 'axios'
import {withRouter} from 'react-router-dom'

import '../additional.css'

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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['General', 'Education', 'Certifications'];

function getStepContent(step) {
  switch (step) { //change to step
    case 0:
      return <AddressForm />;
    case 1:
      return <EducationForm />;
    case 2:
      return <CertificationForm />;
    default:
      throw new Error('Unknown step');
  }
}

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

function SignUp(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  // useEffect(() => {
  //   //on load make sure to set the doctor from values saved to the database
  //   const {id} = props.match.params
  //   let reloadedDoctor = {}
  //   axios.get(`/api/doctor/${id}`).then(res => {
  //     reloadedDoctor = res.data
  //   })

  //   let reloadedCertifications = {}
  //   axios.get(`/api/doctor/certification/${id}`).then(res => {
  //     reloadedCertifications = res.data
  //   })
    
  //   // Update the doctor and doctor id
  //   // props.updateDoctor({...reloadedDoctor, ...reloadedCertifications})
  // });

  const handleNext = () => {
    //detruct everything from props
    const {id} = props.match.params
    const {
      firstName,
      lastName,
      addressLine, 
      city, 
      state, 
      zip, 
      country,
      email,
      phone,
      undergraduateCollege, 
      undergraduateDegree, 
      graduateCollege, 
      graduateDegree, 
      residencyClinic, 
      boardExam, 
      boardExamID
    } = props.doctor

    switch (activeStep) { //change to step
      case 0:
        const generalInfo = {
          firstName,
          lastName,
          addressLine, 
          city, 
          state, 
          zip, 
          country,
          email,
          phone
        }
        console.log(generalInfo)
        let genPath = `/api/doctor/general/${id}`
        axios.put(genPath, generalInfo).then(res => {
            console.log(res.data)
        })
        return setActiveStep(activeStep + 1);
      case 1:
        const educationInfo = {
          undergraduateCollege, 
          undergraduateDegree, 
          graduateCollege, 
          graduateDegree, 
          residencyClinic,
          boardExam, 
          boardExamID
        }
        console.log(educationInfo)
        let eduPath = `/api/doctor/education/${id}`
        axios.put(eduPath, educationInfo).then(res => {
            console.log(res.data)
        })
        return setActiveStep(activeStep + 1);
      case 2:
        return setActiveStep(activeStep + 1);
      default:
        throw new Error('Unknown step');
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <>
      <CssBaseline />
      <div className='hide-on-scroll-container'>
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <WidgetsIcon /><Typography variant="h5">docbox</Typography>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Sign Up
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <ReviewForm />
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit info' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
        <Copyright />
      </main>
    </>
  );
}

function mapStateToProps(state){
  return state
}

export default withRouter(connect(mapStateToProps, {updateDoctor})(SignUp))