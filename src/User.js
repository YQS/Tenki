import React, {Component} from 'react';
import Fuse from 'fuse.js';


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
      console.log(usersList);
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
      console.log('UPDATING STATES');
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
      /*var foundUsers = response.json().filter(function(item) {
          return item.name === name;
      });
      console.log('list of users found with name ' + name);
      console.log(foundUsers);
      */
      /*
      fetch('http://localhost:8000/api/users/'+foundUsers[0].id, {
        method: 'GET',
        mode: 'cors',

      }).then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        //console.log(response.json());
        return response.json();
      }).then((data) => {
        //data es un array con dos datos
        //  0 es el objeto
        //  1 es un boolean que indica si tuvo que crear o no el objeto
        console.log(data[0]);;
        this.setState({
          user: data[0].name,
          id: data[0].id,
          createdAt: data[0].createdAt,
          updatedAt: data[0].updatedAt
        });
      })
      */
    //})
  };


  render(){
    return (
      <div className="user">
        <h1>{this.state.user}</h1>
        <p>id: {this.state.id}</p>
        <p>creado: {this.state.createdAt}</p>
        <p>actuazliado: {this.state.updatedAt}</p>
        <p>TEST: {this.state.test} </p>
      </div>
    );
  };
};
