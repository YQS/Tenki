import React, {Component} from 'react';


export default class User extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      id: '',
      createdAt: '',
      updatedAt: ''
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
    fetch('http://localhost:8000/api/users/'+name, {
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
  };


  render(){
    return (
      <div className="user">
        <h1>{this.state.user}</h1>
        <p>id: {this.state.id}</p>
        <p>creado: {this.state.createdAt}</p>
        <p>actuazliado: {this.state.updatedAt}</p>
      </div>
    );
  };
};
