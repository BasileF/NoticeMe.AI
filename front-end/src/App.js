import React from 'react';
import FirebaseContext from './Firebase/context';
import SignIn from './Components/SignIn';
import Home from './Components/Home';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null
    }

    this.getUser = this.getUser.bind(this);
  }

  getUser(authUser) {
    this.setState({
      userID: authUser
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <div>
          { 
            !this.state.userID &&
            <FirebaseContext.Consumer>
              {firebase => <SignIn firebase={firebase} getUser={this.getUser}/>}
            </FirebaseContext.Consumer>
          }
          { 
            this.state.userID &&
            <FirebaseContext.Consumer>
              {firebase => <Home firebase={firebase} uid={this.state.userID}>Logged In</Home>}
            </FirebaseContext.Consumer>
          }
        </div>
      </div>
    );
  }
}

export default App;
