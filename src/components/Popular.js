import React, { Component } from "react";

import SearchBands from "./SearchBand";

//variables for the api calls
var artistID;
const parsed = new URLSearchParams(window.location.search).get("access_token");
const headersAPI = {
  headers: { Authorization: "Bearer " + parsed }
};

//https://api.spotify.com/v1/artists/{id}/top-tracks
//make call to above, get all the top track id's, put into audio player, easy!

class Popular extends Component {
  constructor() {
    super();
    this.state = {
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
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=SE`,
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
        {this.state.errorApi ? (
          <h1>Problem with the Spotify API backend</h1>
        ) : (
          <>
            <h1>Hi {this.state.userName.split(" ")[0]}! POPULAR PAGE</h1>
            <h2>Most popular Artist's songs on Spotify</h2>
            <SearchBands
              onSubmitValue={this.handleSubmit}
              value={this.state.value}
              onChangeValue={this.handleChange}
            />
            <p>
              {this.state.artistName.name}, artist id:{" "}
              {this.state.artistName.id}
            </p>
            <img src={this.state.image} alt="group" width="200" />

            <iframe
              title="spotify player"
              src={`https://open.spotify.com/embed/track/${popsong}`}
              //src={`https://open.spotify.com/embed/artist/${artistID}/top-tracks?country=SE`}
              width="300"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          </>
        )}
      </div>
    );
  }
}

export default Popular;
