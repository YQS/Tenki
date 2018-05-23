import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class InterestList extends Component {
  constructor() {
    super();
    this.state = {
      userId: 'def',
      boardId: 'def',
      boardName: 'def',
      interestList: []
    };
  };

  componentDidMount() {
    //console.log('PROPS FROM BOARD');
    //console.log(this.props);
    this.setState({boardName: this.props.boardName})
  };

  componentWillReceiveProps(nextProps) {
    console.log('WILL RECIVE INTERESTS');
    this.setState({
      userId: nextProps.userId,
      boardId: nextProps.boardId,
      boardName: nextProps.boardName
    });
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


  render() {
    return (
      <div className="interests">
        <p> Interests with boardId: {this.state.boardId} </p>
        <ul>
          {this.state.interestList.map((interest) =>
            <p key={interest.id}> {interest.name} - {interest.place.name} </p>
          )}
        </ul>
      </div>
    );
  };
};
