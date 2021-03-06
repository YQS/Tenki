import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css'

import Landing from './Landing.js';
import User from './User.js';
import Board from './Board.js';
import NotFound from './NotFound.js';
import StorageTest from './StorageTest.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      title: ''
    };

  };

  updateTitle = (newTilte) => {
    this.setState({title: newTilte});
  };

  callbackHistoryPush = (route) => {
    console.log(this.props);
    this.props.history.push(route);
  };

  //this hack is to pass params through Route
  LandingComponent = (props) => {
    return (
      <Landing
        updateTitle={this.updateTitle.bind(this)}
        callbackHistoryPush={this.callbackHistoryPush.bind(this)}
        hola='hola'
      />
    );
  };

  render() {
    return(
      <div className="main">
        <h1>Tenki</h1>
        <h1>{this.state.title}</h1>

        <div className="content">
          <Switch>
            <Route exact path="/" render={() => {
              return(<Redirect to="/login" />)
            }}/>
            <Route path="/test" component={StorageTest}  />
            <Route path="/login" component={Landing}  />
            <Route path="/users/:username/b/:board" component={Board} />
            <Route exact path="/users/:username" component={User} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  };
};
//
//<Route path="/login" render={this.LandingComponent}  />
//<Route path="/login" component={Landing}  />
//=========
ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ,
  document.getElementById('root')
);
