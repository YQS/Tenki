import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class BoardList extends Component {
  constructor() {
    super();
    this.state = {
      userId: 'def',
      userName: 'def',
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


  render() {
    return (
      <div className="boards">
        <p> Board with userId: {this.state.userId} </p>
        <ul>
          {this.state.boardsList.map((board) =>
            <Link to={"/users/"+this.state.userName+"/b/"+board.name} key={board.id}>{board.name}</Link>)}
        </ul>
      </div>
    );
  }

}
