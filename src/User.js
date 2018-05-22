import React, {Component} from 'react';
import Fuse from 'fuse.js';
import BoardList from './BoardList.js'


export default class User extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      id: '',
      createdAt: '',
      updatedAt: '',
      test: ''
    };

  };

  componentDidMount() {
    //console.log(this.props);
    this.getUser(this.props.match.params.username);
    this.setState({user: this.props.match.params.username});
    console.log(this.state.user);

    //get user, or create it

  };

  getUser(name) {
    fetch('http://localhost:8000/api/users', {
      method: 'GET',
      mode: 'cors'
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((usersList) => {
      //console.log(usersList);
      var searchUser = new Fuse(usersList, {
        keys: ['name'],
        threshold: 0.0,
        id: 'id'
      });
      //console.log(searchUser.search(name));
      var myId;
      if (searchUser.search(name)[0]) {
        console.log('found name');
        myId = searchUser.search(name)[0];
      } else {
        console.log('name not found');
        myId = name;
      };
      return myId
    }).then((myId) => {
      return fetch('http://localhost:8000/api/users/'+myId, {
        method: 'GET',
        mode: 'cors'
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((foundUser) => {
      //console.log('UPDATING STATES');
      console.log(foundUser);
      this.setState({
        user: foundUser.name,
        id: foundUser.id,
        createdAt: foundUser.createdAt,
        updatedAt: foundUser.updatedAt,
        test: 'ESTOY CARGADO'
      });
    })


    })
  };


  render(){
    return (
      <div className="user">
        <h1>{this.state.user}</h1>
        <p>id: {this.state.id}</p>
        <p>creado: {this.state.createdAt}</p>
        <p>actuazliado: {this.state.updatedAt}</p>
        <p>TEST: {this.state.test} </p>
        <br/>
        <BoardList
          userId={this.state.id}
          userName={this.state.user}
        />
      </div>
    );
  };
};
