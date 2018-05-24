import React, {Component} from 'react';
import {SimpleSelect} from 'react-selectize';


const mainOptions = [
    {
      label:"test",
      value:"test"
    },
    {
      label:"test2",
      value:"test2"
    },
    {
      label:"test3",
      value:"test3"
    }
]

export default class SearchableDropdown extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      options: []
    }
  };

  componentDidMount() {
    //console.log(this.props);
    this.setState({
      //options: mainOptions
      options: [],
      updateNewPlace: this.props.updateNewPlace
    })
  }
  //componentWillReceiveProps


  render() {
    var self = this;
    return (
      <div>
        <SimpleSelect
          placeholder="Elija un lugar"
          ref = "select"
          options = {this.state.options}
          search = {this.state.search}

          onSearchChange = {function(search) {
            self.setState({
              search: search,
              options: []
            });

            if (search.length > 0) {
              if (!!self.req) {
                //self.req.abort();
                delete self.req;
                console.log('SELF.REQ.ABORT');
              }
              var url = new URL("https://query.yahooapis.com/v1/public/yql"),
                params = {
                  q: 'select name, woeid, country, placeTypeName from geo.places where text ="'+search+'"',
                  format: 'json'
                };
              Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

              self.req = fetch(url)
                .then((response) => {
                  if (response.status >= 400) {
                    throw new Error('Bad response from server');
                  }
                  return response.json();
                }).then((responseJSON) => {
                  console.log(responseJSON);
                  if (responseJSON.query.results) {
                    self.setState(
                      {options: responseJSON.query.results.place},
                      () => {
                        self.refs.select.highlightFirstSelectableOption();
                      });
                  } else {
                    self.setState({options: []});
                  };

                  delete self.req;
                })


            }
          }}

          filterOptions = {function(options, search){
              return options;
          }}

          uid = {function(item){
              //return item.name;
              if (item) {
                return item.woeid
              }
          }}

          renderOption = {function(item){
              return <div className="simple-option" style={{fontSize: 12}}>
                  <div>
                      <span style={{fontWeight: "bold"}}>{item.name} ({item.placeTypeName.content}), {item.country.content}</span>

                  </div>
              </div>
          }}

          renderValue = {function(item){
              return <div className="simple-value">
                  <span style={{fontWeight: "bold"}}>{item.name}, {item.country.code}</span>
              </div>
          }}

          /*renderNoResultsFound = {function(value, search){
              return <div className="no-results-found" style={{fontSize: 13}}>
                  {typeof this.req == "undefined" && this.state.search.length == 0 ?
                  "type a few characters to kick off remote search":"No results found"}
              </div>
          }}/>*/

          renderNoResultsFound = {function(value, search){
              return <div className="no-results-found" style={{fontSize: 13}}>
                  {typeof this.req == "undefined" ?
                  "Comience a escribir para disparar la búsqueda...":"No se hallaron resultados"}
              </div>
          }}

          /*onValueChange= {function(value) {
            console.log('VALUE CHANGE');
            console.log(value);
            self.state.updateNewPlace(value);
          }}*/
          onValueChange = {function(value) {
            //console.log(self.props);
            self.props.updateNewPlace(value.name);
          }}
        />
      </div>
    );
  };



}
