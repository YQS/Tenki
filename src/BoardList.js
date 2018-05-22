import React, {Component} from 'react';

export default class BoardList extends Component {
  constructor() {
    super();
    this.state = {
      userId: 'def',
      boardsList: []
    };
  };

  componentDidMount() {
    //console.log('PROPS FROM BOARD');
    //console.log(this.props);
    //this.setState({userId: this.props.userId})
  };

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECIVE');
    this.setState({ userId: nextProps.userId });
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
            <p key={board.id}>{board.name}</p>)}
        </ul>
      </div>
    );
  }

}
