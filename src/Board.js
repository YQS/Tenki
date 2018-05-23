import React, {Component} from 'react';
import InterestList  from './InterestList.js';


export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      boardName: 'None',
      boardId: 1,
      userId: 1

    }
  };

  componentDidMount() {
    console.log('mounting board');
    this.setState({boardName: this.props.match.params.board})
  };
  //componentWillReceiveProps

  render() {
    const boardExists = true;


    /*return (
      <h1>AAAAAAAAA</h1>
    )*/
    return (
      boardExists ? (
        <div className="board">
          <h2>this is a board </h2>
          <p>{this.state.boardName}</p>
          <InterestList
            userId={this.state.userId}
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
