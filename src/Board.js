import React, {Component} from 'react';
import InterestList  from './InterestList.js';

function getInitialState(dataName) {
  var data = localStorage.getItem( dataName );
  console.log('return initial state of '+dataName+': '+data);
  return data;
};

function setStorageState(dataName, data) {
  localStorage.setItem(dataName, JSON.stringify(data));
  console.log('storing '+dataName+': '+data);
}

export default class Board extends Component {
  constructor() {
    super();
    /*var oldState = getInitialState('state');
    if (oldState) {
      this.state = oldState
    } else {*/
      this.state = {
        userId: getInitialState('userId'),
        userName: getInitialState('userName'),
        //boardId: '',
        boardId: getInitialState('boardId'),
        boardName: getInitialState('boardName')
      }
    //}
    /*this.state = {
      userId: getInitialState('userId'),
      userName: getInitialState('userName'),
      boardId: getInitialState('boardId'),
      boardName: getInitialState('boardName')
    }*/
  };

  componentDidMount() {
    console.log('mounting board');
    console.log(this.props);
    this.setState({
      boardName: this.props.match.params.board,
      username: this.props.match.params.username
    });
    if (this.props.location.state) {
      setStorageState('userId', this.props.location.state.userId);
      setStorageState('userName', this.props.location.state.userName);
      setStorageState('boardId', this.props.location.state.boardId);
      setStorageState('boardName', this.props.location.state.boardName);
      this.setState({
        //from Link
        //historyState: this.props.match.location.state,
        userId: this.props.location.state.userId,
        userName: this.props.location.state.userName,
        boardId: this.props.location.state.boardId,
        boardName: this.props.location.state.boardName
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECIVE IN BOARD');
    this.setState({
      userId: nextProps.userId,
      userName: nextProps.userName,
      boardId: nextProps.boardId,
      boardName: nextProps.boardName
    });
    setStorageState('state', this.state);
  };

  render() {
    const boardExists = true;


    /*return (
      <h1>AAAAAAAAA</h1>
    )*/
    return (
      boardExists ? (
        <div className="board">
          <h2>this is a board </h2>
          <p>with name: {this.state.boardName} ({this.state.boardId})</p>
          <InterestList
            userId={this.state.userId}
            userName={this.state.userName}
            boardId= {this.state.boardId}
            boardName={this.state.boardName}
          />
        </div>
      ) : (
        <h2>board not found ({this.state.boardName})</h2>
      )

    );
  };


};
