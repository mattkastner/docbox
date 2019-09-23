import React, {useState} from 'react';
import {Grid, Typography, TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import {connect} from 'react-redux'
import {updateDoctor} from '../../redux/reducers/docReducer'
import {withRouter} from 'react-router-dom'

function AddressForm(props) {
  const [textNotifications, setText] = useState(false);

  let doctor = props.doctor

  return (
    <>
      <Typography variant="h6" gutterBottom>
        General info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={doctor.firstName}
            autoComplete="given-name"
            onChange={event => props.updateDoctor({firstName: event.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            value={doctor.lastName}
            autoComplete="family-name"
            onChange={event => props.updateDoctor({lastName: event.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            value={doctor.addressLine}
            autoComplete="address-line1"
            onChange={event => props.updateDoctor({addressLine: event.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={doctor.city}
            onChange={event => props.updateDoctor({city: event.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="state" 
            name="state" 
            label="State/Province/Region" 
            fullWidth 
            value={doctor.state}
            onChange={event => props.updateDoctor({state: event.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            value={doctor.zip}
            autoComplete="postal-code"
            onChange={event => props.updateDoctor({zip: event.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            value={doctor.country}
            autoComplete="country"
            onChange={event => props.updateDoctor({country: event.target.value})}
          />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            type="email"
            label="Email"
            fullWidth
            value={doctor.email}
            autoComplete="email"
            onChange={event => props.updateDoctor({email: event.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={true} color="secondary" name="useEmail" value="yes" />}
            label="You will receive an email when certifications expire"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phone_number"
            name="mobile"
            type="tel"
            label="Phone number (optional)"
            fullWidth
            value={doctor.phone}
            onChange={event => props.updateDoctor({phone: event.target.value})}
          />
        </Grid>
      </Grid>
    </>
  );
}

function mapStateToProps(state){
  return state
}

export default withRouter(connect(mapStateToProps, {updateDoctor})(AddressForm))