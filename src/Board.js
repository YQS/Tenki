import React, {Component} from 'react';


export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      boardName: 'None'
    }
  };

  componentDidMount() {
    this.setState({boardName: this.props.match.params.board})
  };
  //componentWillReceiveProps

  render() {
    return (
      <div className="board">
        <h2>this is a board </h2>
        <p>{this.state.boardName}</p>
      </div>
    );
  };


};
