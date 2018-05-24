import React, {Component} from 'react';


function getInitialState(dataName) {
  var data = localStorage.getItem( dataName );
  console.log('return initial state of '+dataName+': '+data);
  return data;
};

function setStorageState(dataName, data) {
  localStorage.setItem(dataName, JSON.stringify(data));
  console.log('storing '+dataName+': '+data);
}


export default class StorageTest extends Component {
  constructor() {
    super();
    this.state = {
      data: getInitialState('data')
    }
  };

  componentDidMount() {
    setStorageState('data', 'bla')
  }



  render() {
    return (
      <div>
        <h2>{this.state.data}</h2>
      </div>
    )
  }
}
