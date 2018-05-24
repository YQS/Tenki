import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SearchableDropdown from './SearchableDropdown';

function getInitialState(dataName) {
  return localStorage.getItem( dataName ) || '';
};

function setStorageState(dataName, data) {
  localStorage.setItem(dataName, data);
}

export default class InterestList extends Component {
  constructor() {
    super();
    this.state = {
      /*userId: getInitialState('userId'),
      userName: getInitialState('userName'),
      boardId: getInitialState('boardId'),
      boardName: getInitialState('boardName'),*/
      userId: '',
      userName: '',
      boardId: '',
      boardName: '',
      newInterestName: '',
      newPlaceName: '',
      interestList: []
    };
  };

  componentDidMount() {
    //console.log('PROPS FROM BOARD');
    //console.log(this.props);
    this.setState({boardName: this.props.boardName});
    //setStorageState('boardName', this.state.boardName);
  };

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECIVE INTERESTS');
    this.setState({
      userId: nextProps.userId,
      boardId: nextProps.boardId,
      boardName: nextProps.boardName
    });
    //setStorageState('userId', this.state.userId);
    //setStorageState('boardId', this.state.boardId);
    //setStorageState('boardName', this.state.boardName);
    console.log(nextProps);
    if (nextProps.boardId !== '') {
      this.getInterests(nextProps.userId, nextProps.boardId);
    }
  };

  getInterests(userId, boardId) {
    fetch('http://localhost:8000/api/users/'+userId+'/boards/'+boardId+'/interests', {
      method: 'GET',
      mode: 'cors'
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((interestList) =>{
      console.log(interestList);
      this.setState({interestList: interestList});
    });
  };

  updateNewInterest = (event) => {
    this.setState({newInterestName: event.target.value})
  };

  updateNewPlace = (event) => {
    console.log(event);
    //this.setState({newPlaceName: event.target.value})
    this.setState({newPlaceName: event})
  };

  createNewInterest = (event) => {
    var apiURL = 'http://localhost:8000/api/users/'
    apiURL += this.state.userId
    apiURL += '/boards/'
    apiURL += this.state.boardId
    apiURL += '/interests'
    console.log(apiURL);
    console.log(this.state.newInterestName);
    fetch(apiURL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.newInterestName,
        place: this.state.newPlaceName
      })
    }).then((response) => {
      console.log('SHOWING RESPONSE');
      console.log(response);
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      console.log('finished post fetch');
      return response.json();
    }).catch((err) => {
      console.log('ERROR FOUND WHILE CREATING INTEREST');
      console.log(err);
    })
  };

  render() {
    return (
      <div className="interests">
        <p> Interests with boardId: {this.state.boardId} </p>
        <ul>
          {this.state.interestList.map((interest) =>
            <p key={interest.id}> {interest.name} - {interest.place.name} </p>
          )}
        </ul>

        <form onSubmit={this.createNewInterest}>
          <label>Nuevo interes</label><br/>
          <label>Nombre </label>
          <input type="text" label="hey" onChange={this.updateNewInterest}/><br/>
          <label>Lugar </label>
          <SearchableDropdown updateNewPlace={this.updateNewPlace}/>
          <input type="submit" value="Crear"/>
        </form>


      </div>
    );
  };
};
