import React, { Component } from 'react';
import './App.css';
import homepage from './views/home'
import uploadPage from './views/uploadPage'
import quiz from './views/quiz'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

      <Router basename={process.env.PUBLIC_URL}>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/home"/>
                )}/>
                 <Route exact path='/home' component={homepage} />
                 <Route exact path='/upload' component={uploadPage} />
                 <Route exact path='/quiz' component={quiz} />
          </Switch>
    </Router>
    );
  }
}

export default App;
