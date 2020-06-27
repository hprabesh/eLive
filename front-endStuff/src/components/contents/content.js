import React from 'react';
import Tasks from './tasks';
import Completed from './completed';
import Progress from './progress';
import Input from './input'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



export default function CustomizedInputBase() {
  return (
    <React.Fragment>
      <Grid container spacing={1} >
        <Grid item xs={6} alignContent='center'>
          <Typography>
            <Paper alignContent='center'><Typography variant="h6" id="tableTitle" component="div" align="center">
          To Do List App
        </Typography></Paper>
            <Input/>
          </Typography>
        </Grid>
        <Grid item xs={6} zeroMinWidth>
          <Progress/>
        </Grid>
      </Grid>
      <Grid container spacing={1} zeroMinWidth>
        <Grid item xs={6} zeroMinWidth><Tasks/></Grid>
        <Grid item xs={6} zeroMinWidth><Completed/></Grid>
      </Grid>
    </React.Fragment>
  );
}