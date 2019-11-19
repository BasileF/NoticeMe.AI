import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Paper, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'fit-content',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function VerticalTabs(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={props.searchType}
        aria-label="Vertical tabs example"
        onChange={props.searchChange}
        className={classes.tabs}
      >
        <Tab label="By Username" {...a11yProps(0)} />
        <Tab label="By Hashtag" {...a11yProps(1)} />
        <Tab label="By Keyword" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={props.searchType} index={0} style={{width: '60%'}}>
        <SearchContent 
          name='Username' 
          val={props.val[0]} 
          change={props.searchContentChange}
          remember={props.remember}
          submitSearch={props.submitSearch}
        />
      </TabPanel>
      <TabPanel value={props.searchType} index={1} style={{width: '60%'}}>
        <SearchContent 
          name='Hashtag' 
          val={props.val[1]} 
          change={props.searchContentChange}
          remember={props.remember}
          submitSearch={props.submitSearch}
        />
      </TabPanel>
      <TabPanel value={props.searchType} index={2} style={{width: '60%'}}>
        <SearchContent
          name='Keyword'
          val={props.val[2]}
          change={props.searchContentChange}
          remember={props.remember}
          submitSearch={props.submitSearch}
        />
      </TabPanel>
    </div>
  );
}

function SearchContent(props) {
  return (
    <div>
      <TextField
        name={props.name}
        value={props.val}
        onChange={props.change}
        fullWidth
        label={props.name}
        autoFocus
        variant='standard'
      />
      <FormControlLabel
        control={<Checkbox color="primary" onClick={props.remember}/>}
        label="Pin Result"
      />
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={props.submitSearch}
      >
        Search
      </Button>
    </div>
  )
}

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 0,
      content: ['','',''],
      remember: [false,false,false]
    }

    this.searchChange = this.searchChange.bind(this);
    this.searchContentChange = this.searchContentChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.remember = this.remember.bind(this);
  }

  searchChange(e, newVal) {
    this.setState({
      type: newVal
    })
  }

  searchContentChange(e) {
    const cont = this.state.content.slice();
    cont[this.state.type] = e.target.value;
    this.setState({
      content: cont
    });
  }

  remember() {
    const curArray = this.state.remember.slice();
    const cur = curArray[this.state.type];
    curArray[this.state.type] = !cur;
    this.setState({
      remember: curArray
    });
  }

  submitSearch() {
    const types = ['username', 'hashtag', 'keyword'];
    const reqBody = {
      content: this.state.content[this.state.type],
      type: types[this.state.type]
    };
    this.props.sendRequest(reqBody, this.state.remember[this.state.type], this.state.remember[this.state.type]);
  }

  render() {
    return (
      <Grid item xs>
        <Paper
          style={{
            padding: '10px'
          }}
        >
          <VerticalTabs 
            searchType={this.state.type} 
            searchChange={this.searchChange}
            searchContentChange={this.searchContentChange}
            submitSearch={this.submitSearch}
            remember={this.remember}
            val={this.state.content}
          />
        </Paper>
      </Grid>
    );
  }
}