import React, { Component } from "react";
import "./App.css";
import axios from "axios";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      queryOutput: ""
    };
    this.onOperatorClick = this.onOperatorClick.bind(this);
    this.onEqualsClick = this.onEqualsClick.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  componentWillMount() {
    this.setState({
      query: "",
      queryOutput: ""
    });
  }

  onOperatorClick(operator) {
    console.log(operator);
    var newQuery = this.state.query + operator;
    this.setState({
      query: newQuery
    });
    console.log(this.state.query);
  }

  updateQuery(e) {
    console.log("on typing..:", e.target.value);
    this.setState({
      query: e.target.value
    });
  }

  onEqualsClick() {
    console.log(this.state);
    var re = new RegExp("[0-9]{10}");
    if(re.test(this.state.query)) {
      alert("Cannot be empty")
    }else{
      console.log("Did not Matched");
    }
    axios
      .post("http://localhost:3001/calculate", { query: this.state.query })
      .then(res => {
        console.log("Response Code: ", res.status);
        console.log(res.data);
        if (res.status == "200") {
          this.setState({
            queryOutput: res.data.queryOutput
          });
        }
      });
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          <label>Input</label>
          <br />
          <input
            type="text"
            id="query"
            onChange={this.updateQuery}
            value={this.state.query}
            required
          />
          <br />
          <label>Ouput</label>
          <br />
          <input
            type="text"
            id="query"
            value={this.state.queryOutput}
            readOnly
          />
          <br /> <br />
          <div>
            <button
              id="+"
              value="+"
              type="button"
              class="btn btn-danger"
              onClick={e => this.onOperatorClick(e.target.id)}
            >
              +
            </button>
            <button
              id="-"
              type="button"
              class="btn btn-danger"
              onClick={e => this.onOperatorClick(e.target.id)}
            >
              -
            </button>
            <button
              id="/"
              type="button"
              class="btn btn-danger"
              onClick={e => this.onOperatorClick(e.target.id)}
            >
              /
            </button>
            <button
              id="*"
              type="button"
              class="btn btn-danger"
              onClick={e => this.onOperatorClick(e.target.id)}
            >
              *
            </button>
            <button
              id="="
              type="submit"
              class="btn btn-danger"
              onClick={this.onEqualsClick}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
