import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import Result from './Result';

export default class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Grid item xs={6} style={{padding: '5px'}}>
                <Paper style={{backgroundColor: 'rgb(63, 81, 181)'}}>
                    <Typography variant='h5' style={{textAlign: 'center', color: 'white'}}>
                        Results
                    </Typography>
                </Paper>
                <Grid container style={{overflowY: 'auto', maxHeight: '540px'}}>
                    {this.props.results.map( result => <Result result={result} />)}
                </Grid>
            </Grid>
        );
    }
}