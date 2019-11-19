import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        NoticeMe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://wallpaperaccess.com/full/859076.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignInSide(props) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <img src="/logoDark.png" style={{width: '100px', height: '100px'}}/>
          <Typography component="h1" variant="h5">
            {props.signIn ? 'Sign In' : 'Sign Up'}
          </Typography>
          <form className={classes.form} noValidate>
            {
              !props.signIn &&
              <TextField
                onChange={props.handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
            }
            <TextField
              onChange={props.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={props.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={props.onSubmit}
            >
              {props.signIn ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container>
              {
                props.signIn &&
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              }
              <Grid item>
                <Link href="#" variant="body2" onClick={props.formType}>
                  {props.signIn ? "Don't have an account? Sign Up" : 'Have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      signIn: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formType = this.formType.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit() {
    if (this.state.signIn) {
      this.props.firebase.doSignInWithEmailAndPassword(this.state.email, this.state.password)
        .then(authUser => {
          const uid = authUser.user.uid;
          this.props.getUser(uid)
        })
        .catch();
    } else {
      this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(authUser => {
          const uid = authUser.user.uid;
          this.props.getUser(uid)
          this.props.firebase.database.ref('users').child(uid).set({ name: this.state.name })
        });
    }
  }

  formType() {
    const cur = this.state.signIn;
    this.setState({
      signIn: !cur
    });
  }

  render() {
    return (
      <SignInSide
        email={this.state.email}
        password={this.state.password}
        handleChange={this.handleChange}
        onSubmit={this.onSubmit}
        formType={this.formType}
        signIn={this.state.signIn}
      />
    )
  }
}