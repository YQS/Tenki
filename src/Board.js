import React, {Component} from 'react';


export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      boardName: 'None'
    }
  };

  componentDidMount() {
    console.log('mounting board');
    this.setState({boardName: this.props.match.params.board})
  };
  //componentWillReceiveProps

  render() {
    const boardExists = false;


    /*return (
      <h1>AAAAAAAAA</h1>
    )*/
    return (
      boardExists ? (
        <div className="board">
          <h2>this is a board </h2>
          <p>{this.state.boardName}</p>
        </div>
      ) : (
        <h2>board not found ({this.state.boardName})</h2>
      )

    );
  };


};
