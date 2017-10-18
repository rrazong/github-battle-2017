import React from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Battle from './Battle';
import Home from './Home';
import Nav from './Nav';
import Popular from './Popular';
import Results from './Results';
import classnames from 'classnames';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav/>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/battle" exact={true} component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route render={() => <h1>404! Whoops!</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
