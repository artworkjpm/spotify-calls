import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchName: "",
      artistName: [],
      image: [],
      errorApi: false,
      userName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchName: event.target.value });
  }

  handleSubmit(event) {
    alert(this.state.searchName);
    console.log(this.state.searchName);

    event.preventDefault();
  }
  componentDidMount() {
    this.searchBands();
  }

  searchBands() {
    let parsed = new URLSearchParams(window.location.search).get(
      "access_token"
    );
    parsed = { token: parsed };
    console.log(parsed.token);
    let searchName = "nick cave";
    let headersAPI = {
      headers: { Authorization: "Bearer " + parsed.token }
    };

    //search band
    fetch(
      `https://api.spotify.com/v1/search?q=${searchName}&type=artist`,
      headersAPI
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          artistName: data.artists.items[0],
          log: console.log(data),
          image: data.artists.items[0].images[0].url
        })
      )
      .catch(error =>
        this.setState({
          log: console.error("Error:", error),
          errorApi: true
        })
      );
  }

  render() {
    return (
      <div className="App">
        {this.state.errorApi ? (
          <h1>Problem with the Spotify API backend</h1>
        ) : (
          <>
            <h1>{this.state.userName}'s search result</h1>
            <form onSubmit={this.handleSubmit}>
              <label>
                Search artist:
                <input
                  type="text"
                  value={this.state.searchName}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <p>{this.state.artistName.name}</p>
            <p>{this.state.artistName.id}</p>
            <p>{this.state.image}</p>
            <img src={this.state.image} alt="group" width="200" />
          </>
        )}
      </div>
    );
  }
}

export default App;
