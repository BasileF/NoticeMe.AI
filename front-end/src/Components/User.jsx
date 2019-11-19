import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

export default function User(props) {
  return (
    <Grid item xs style={{width: '100%'}}>
      <Paper
        style={{
          padding: '10px',
          backgroundColor: 'rgb(63, 81, 181)'
        }}
      >
        <Typography variant='h5' style={{textAlign: 'center', color: 'white'}}>
          Welcome {props.name}!
        </Typography>
        <Typography variant='h6' style={{color: 'white'}}>
          Pinned searches:
        </Typography>
        <ul>
          {props.pinned.map( pin => <li style={{color: 'white'}}>{pin.content}</li>)}
        </ul>
      </Paper>
    </Grid>
  );
}