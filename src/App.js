import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      artistName: [],
      image: [],
      errorApi: false
    };
  }
  componentDidMount() {
    let parsed = new URLSearchParams(window.location.search).get(
      "access_token"
    );
    parsed = { token: parsed };
    console.log(parsed.token);

    fetch("https://api.spotify.com/v1/search?q=oasis&type=artist", {
      headers: { Authorization: "Bearer " + parsed.token }
    })
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
            <h1>Johns latest songs xxx</h1>
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
