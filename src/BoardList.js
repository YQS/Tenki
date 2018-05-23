import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class BoardList extends Component {
  constructor() {
    super();
    this.state = {
      userId: 'def',
      userName: 'def',
      newBoardName: '',
      boardsList: []
    };
  };

  componentDidMount() {
    //console.log('PROPS FROM BOARD');
    //console.log(this.props);
    this.setState({userName: this.props.userName})
  };

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECIVE');
    this.setState({
      userId: nextProps.userId,
      userName: nextProps.userName
    });
    console.log(nextProps.userId);
    if (nextProps.userId !== '') {
      this.getBoards(nextProps.userId);
    }
  };

  getBoards(userId) {
    fetch('http://localhost:8000/api/users/'+userId+'/boards', {
      method: 'GET',
      mode: 'cors'
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    }).then((boardsList) =>{
      console.log(boardsList);
      this.setState({boardsList: boardsList});
    });
  };

  updateNewBoard = (event) => {
    this.setState({newBoardName: event.target.value})
  };

  createNewBoard = (event) => {
    console.log('creating new board');
    console.log(this.state.newBoardName);
    console.log(this.state.userId);
    var apiURL = 'http://localhost:8000/api/users/'+this.state.userId+'/boards'
    console.log(apiURL);
    fetch(apiURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.newBoardName
      })
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
  };

  render() {
    return (
      <div className="boards">
        <p> Board with userId: {this.state.userId} </p>
        <ul>
          {this.state.boardsList.map((board) =>
            <div key={board.id} className="boardList">
              <Link
                to={{
                    pathname: "/users/"+this.state.userName+"/b/"+board.name,
                    state: {
                      userId: this.state.userId,
                      userName: this.state.userName,
                      boardId: board.id,
                      boardName: board.name
                    }
                  }}                
              >{board.name}</Link>
              <br />
            </div>
          )}
        </ul>
        <br />

        <form onSubmit={this.createNewBoard}>
          <label>Nuevo tablero</label>
          <input type="text" onChange={this.updateNewBoard}/>
        </form>
      </div>
    );
  }

}
