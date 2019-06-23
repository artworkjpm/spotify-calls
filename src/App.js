import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Popular from "./components/Popular";
import Home from "./components/Home";

import "./App.css";

//variables for the api calls
var artistID;
const parsed = new URLSearchParams(window.location.search).get("access_token");
const headersAPI = {
  headers: { Authorization: "Bearer " + parsed }
};

//https://api.spotify.com/v1/artists/{id}/top-tracks
//make call to above, get all the top track id's, put into audio player, easy!
//?access_token=${parsed}

class App extends Component {
  constructor() {
    super();
    this.state = {
      parsed: parsed,
      searchName: "",
      artistName: [],
      artistID: "",
      popularSongID: "",
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
    fetch(
      `https://api.spotify.com/v1/search?q=${searchName}&type=artist`,
      headersAPI
    )
      .then(response => response.json())
      .then(data =>
        this.setState(
          {
            artistName: data.artists.items[0],
            log: console.log(data),
            image: data.artists.items[0].images[0].url,
            artistID: data.artists.items[0].id
          },
          this.getTopTracks
        )
      )
      .catch(error =>
        this.setState({
          log: console.error("Error:", error),
          errorApi: true
        })
      );
  }

  getTopTracks() {
    artistID = this.state.artistID;
    console.log("artistID: " + this.state.artistID);

    fetch(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=GB`,
      headersAPI
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          log: console.log(data),
          popularSongID: data.tracks[0].id
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
    console.log("popular song: " + this.state.popularSongID);
    let popsong = this.state.popularSongID;
    return (
      <div className="App">
        <Router>
          <nav>
            <Link to={`/?access_token=${parsed}`}>Home</Link> /{" "}
            <Link to={`/popular?access_token=${parsed}`}>
              Most Popular Song App
            </Link>
          </nav>

          <Route
            exact
            path="/"
            render={() => (
              <Home
                errorApi={this.state.errorApi}
                username={this.state.userName.split(" ")[0]}
                artistName={this.state.artistName}
                artistImage={this.state.image}
                popularSong={popsong}
                onSubmitValue={this.handleSubmit}
                value={this.state.value}
                onChangeValue={this.handleChange}
              />
            )}
          />
          <Route
            path="/popular"
            render={() => <Redirect to={`/popular?access_token=${parsed}`} />}
          />

          <Route path="/popular" render={() => <Popular token={parsed} />} />
        </Router>
      </div>
    );
  }
}

export default App;
