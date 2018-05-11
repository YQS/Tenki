import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Landing from './Landing.js'
import User from './User.js'


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
          <Route exact path="/" render={() => {
            return(<Redirect to="/login" />)
          }}/>
          <Route path="/login" component={Landing}  />
          <Route path="/user/:username" component={User} />
        </div>
      </div>
    );
  };
};
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
