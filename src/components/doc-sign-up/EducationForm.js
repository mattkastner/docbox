import React from 'react';
import {Typography, Grid, TextField} from '@material-ui/core';

import {connect} from 'react-redux'
import {updateDoctor} from '../../redux/reducers/docReducer'


function EducationForm(props) {
  let doctor = props.doctor

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Education details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="undergrad_college"
            name="undergrad_college"
            label="Undergraduate college"
            fullWidth
            value={doctor.undergraduateCollege}
            onChange={event => props.updateDoctor({undergraduateCollege: event.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="undergrad_degree"
            name="undergrad_degree"
            label="Undergraduate degree"
            fullWidth
            value={doctor.undergraduateDegree}
            onChange={event => props.updateDoctor({undergraduateDegree: event.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="grad_college"
            name="grad_college"
            label="Graduate college"
            fullWidth
            value={doctor.graduateCollege}
            onChange={event => props.updateDoctor({graduateCollege: event.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="grad_degree"
            name="grad_degree"
            label="Graduate degree"
            fullWidth
            value={doctor.graduateDegree}
            onChange={event => props.updateDoctor({graduateDegree: event.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            required
            id="clinic" 
            name="clinic" 
            label="Residency clinic" 
            fullWidth
            value={doctor.residencyClinic}
            onChange={event => props.updateDoctor({residencyClinic: event.target.value})}  
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            required
            id="board_exam" 
            name="board exam" 
            label="Board exam name" 
            fullWidth
            value={doctor.boardExam}
            onChange={event => props.updateDoctor({boardExam: event.target.value})} 
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            required
            id="board_exam" 
            name="board exam id" 
            label="Board exam certification ID" 
            fullWidth
            value={doctor.boardExamID}
            onChange={event => props.updateDoctor({boardExamID: event.target.value})}/>
        </Grid>
      </Grid>
    </>
  );
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps, {updateDoctor})(EducationForm)