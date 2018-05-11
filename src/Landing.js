import React, {Component} from 'react';


export default class Landing extends Component {
  constructor() {
    super()
    this.state = {
      user: '',
    };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    console.log(this.props);
  };


  handleSubmit = (event) => {
    //console.log(event.target.value);
    //this.props.updateTitle(this.state.user);
    console.log(this.props);
    this.props.history.push("/user/"+this.state.user);
  };

  handleChange = (event) => {
    this.setState({user: event.target.value});
  };


  render(){
    return (
      <div className="select-user">
        <form onSubmit={this.handleSubmit}>
          <label>Elija usuario</label><br/>
          <input type="text" onChange={this.handleChange}/>
        </form>
      </div>
    );
  };
};
