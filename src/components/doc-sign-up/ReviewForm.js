import React from 'react';
import {Typography} from '@material-ui/core' 
// import {makeStyles, List, ListItem, ListItemText, Grid } from '@material-ui/core';

import {connect} from 'react-redux'

// const useStyles = makeStyles(theme => ({
//   listItem: {
//     padding: theme.spacing(1, 0),
//   },
//   total: {
//     fontWeight: '700',
//   },
//   title: {
//     marginTop: theme.spacing(2),
//   },
// }));

function ReviewForm(props) {
  // const classes = useStyles();

  // const {certifications, addressLine, city, state, zip, country} = props.doctor

  // const payments = [
  //   { name: 'Card type', detail: 'Visa' },
  //   { name: 'Card holder', detail: 'Mr John Smith' },
  //   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  //   { name: 'Expiry date', detail: '04/2024' },
  // ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        You have completed registration! If you missed a certification look in the email for a link to add additional certifications.
      </Typography>
      {/* <List disablePadding>
        {certifications.map(cert => (
          <ListItem className={classes.listItem} key={cert.certificationName}>
            <ListItemText primary={cert.certificationName} secondary={cert.certificationDesc} />
            <Typography variant="body2">{cert.certificationExp}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{[addressLine, city, state, zip, country].join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
    </>
  );
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(ReviewForm)