import React, { Component } from "react";
import "./App.css";

//variables for the api calls
const parsed = new URLSearchParams(window.location.search).get("access_token");
const headersAPI = {
  headers: { Authorization: "Bearer " + parsed }
};

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
    event.preventDefault();
    this.searchBands(this.state.searchName);
  }
  componentDidMount() {
    this.getUserProfile();
    this.searchBands();
  }

  getUserProfile() {
    fetch(`https://api.spotify.com/v1/me`, headersAPI)
      .then(response => response.json())
      .then(data =>
        this.setState({
          userName: data.display_name,
          log: console.log(data)
        })
      )
      .catch(error =>
        this.setState({
          log: console.error("Error:", error),
          errorApi: true
        })
      );
  }

  searchBands(name) {
    let searchName = this.state.searchName === "" ? "The Cure" : name;

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
