import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Other from './Other.js';

function Another (props) {
	return <p>Im another</p>
};

function Content (props) {
  return (<div>
    <p>CONTENTS d:</p>
    <div className="places">
      {this.state.places.map(place =>
        <p>a {place.ROWID} {place.NAME}</p>
      )}
    </div>
    </div>
  );
};


class App extends Component {
  constructor() {
    super()
    this.state = {
      places: [],
	    selection: '',
	    title: '',
      user: '',
    };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  this.getUser = this.getUser.bind(this);
  };

  //getUsersFromAPI() {
  componentDidMount() {
    fetch('http://localhost:8000/api/users', {
      method: 'GET',
      mode: 'cors',
    }).then((response) => {
      console.log('hello :D');
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      this.setState({places: data})
    }).catch(err => {
      console.log('hello :D');
      console.log('caught it!', err);
    })

  };

  getUser(id) {
    fetch('http://localhost:8000/api/users/'+id, {
      method: 'GET',
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      };
      return response.json();
    }).then((user) => {
      console.log(user);
      this.setState({user: JSON.stringify(user)});
    }).catch(err => {
      console.log('caught it!', err);
    })
  }

  showUsers() {
    return this.state.users
  };

  contents = () =>  {
  return (  <div>
      <p>CONTENTS d:</p>
      <div className="places">
        {this.state.places.map(place =>
          <p>a {place.ROWID} {place.NAME}</p>
        )}
      </div>
      </div>);
};

  handleChange(event) {
	  this.setState({selection: event.target.value});
  };

  handleSubmit(event) {
	  console.log('change Selection ' + this.state.selection);
	  this.setState({title: this.state.selection});
    this.setState({user: this.getUser('38')})
    console.log(this.state.user);
	  event.preventDefault();
  };

  render() {
    return (
    	<div>
    		<h1>hola</h1>
        <nav>
          <p><Link to="/content">Content</Link></p>
          <p><Link to="/another">another</Link></p>
        </nav>
    		<div className="content">
      		<Route path="/another" component={Other} />
          <Route path="/content" component={this.contents} />
    		</div>
    	</div>
    );
  };


  /*render() {
    return (
<div className="main">
  <h1>Holla dolla</h1>
  <h1>{this.state.user}</h1>
  <div className="input">
    <h2>{this.state.title}</h2>
    <form onSubmit={this.handleSubmit}>
      <label>
        Place:
        <input type="text" value={this.state.selection} onChange={this.handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </div>
  <div className="places">
    {this.state.places.map(place =>
    <p>a {place.ROWID} {place.NAME}</p>
    )}
  </div>
</div>
    );
  };
*/

};



//=====================================================================

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);
