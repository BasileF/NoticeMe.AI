import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import Search from './Search';
import Results from './Results';
import Pinned from './Pinned';
import User from './User';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      pinned: [],
      search: null,
      results: [],
      pinnedResults: []
    }

    this.loadData(this.props.uid);
    this.sendRequest = this.sendRequest.bind(this);
  }

  loadData(uid) {
    const data = this.props.firebase.database.ref("/users/" + uid);
    data.child('/name/').once('value').then(snapshot => {
      this.setState({
        name: snapshot.val()
      });
    });
    data.child('/pinned/').once('value').then(snapshot => {
      const pinned = this.state.pinned.slice();
      snapshot.forEach(child => {
        let pinnedInfo = {
          content: '',
          type: ''
        };
        child.forEach(nextChild => {
          switch (nextChild.key) {
            case 'content':
              pinnedInfo.content = nextChild.val();
              break;
            case 'type':
              pinnedInfo.type = nextChild.val();
          }
        })
        pinned.push(pinnedInfo);
      });
      this.setState({
        pinned: pinned
      });
      pinned.forEach(x => this.sendRequest(x, false, true))
    });
  }

  sendRequest(body, remember, pinned) {
    if (remember) {
      const newKey = this.props.firebase.database.ref("/users/" + this.props.uid + "/pinned/").push().key;
      this.props.firebase.database.ref("/users/" + this.props.uid + "/pinned/").child(newKey).set(body);
      const pinned = this.state.pinned.slice();
      pinned.push(body);
      this.setState({
        pinned: pinned
      });
    }

    const xhr = new XMLHttpRequest()
    const data = new FormData()

    data.append('content', body.content);
    data.append('type', body.type);
    xhr.responseType = 'json'
    xhr.onreadystatechange = function () {
      let res = [];
      if (xhr.readyState == XMLHttpRequest.DONE) {
        xhr.response.forEach(x => res.push(x))
      }
      if (pinned) {
        res=res.concat(this.state.pinnedResults);
        this.setState({
          pinnedResults: res
        })
      } else {
        this.setState({
          results: res
        })
      }
    }.bind(this);
    xhr.open('POST', 'http://167.172.254.177:5000/')
    xhr.send(data)
  }

  render() {
    return (
      <Grid container spacing={0} collapse>
        <Grid
          spacing={1}
          container
          direction="column"
          justify="center"
          alignItems="center"
          xs={4}
        >
          <User
            name={this.state.name}
            pinned={this.state.pinned}
          />
          <Search
            sendRequest={this.sendRequest}
          />
          <Grid item>
            <img src='../logo.png' style={{height: '240px'}}/>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Paper style={{ padding: '10px', marginLeft: '6px' }}>
            <Grid container>
              <Results results={this.state.results} />
              <Pinned pinned={this.state.pinnedResults} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}