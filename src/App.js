import React, { Component } from "react";
import SearchBands from "./methods/SearchBand";
import "./App.css";

//variables for the api calls
const parsed = new URLSearchParams(window.location.search).get("access_token");
const headersAPI = {
  headers: { Authorization: "Bearer " + parsed }
};

//https://api.spotify.com/v1/artists/{id}/top-tracks
//make call to above, get all the top track id's, put into audio player, easy!

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
            <h1>{this.state.userName.split(" ")[0]}'s search result</h1>
            <SearchBands
              onSubmitValue={this.handleSubmit}
              value={this.state.value}
              onChangeValue={this.handleChange}
            />
            <p>{this.state.artistName.name}</p>
            <p>{this.state.artistName.id}</p>
            <p>{this.state.image}</p>
            <img src={this.state.image} alt="group" width="200" />

            <audio controls>
              <source
                src="https://open.spotify.com/track/08nqNn2aPDjIEHeiMZ39hH"
                type="audio/ogg"
              />
              Your browser does not support the audio element.
            </audio>
            <audio controls>
              <source
                src="https://open.spotify.com/track/08nqNn2aPDjIEHeiMZ39hH"
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
            <iframe
              title="spotify player"
              //https://open.spotify.com/track/79RUMZfMNMpqZnswovvTqv
              //https://open.spotify.com/artist/2DaxqgrOhkeH0fpeiQq2f4
              //src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
              //src="https://open.spotify.com/artist/"{this.state.artistName.id}

              src="https://open.spotify.com/embed/track/08nqNn2aPDjIEHeiMZ39hH"
              //src="https://api.spotify.com/v1/artists/2DaxqgrOhkeH0fpeiQq2f4/top-tracks"
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

export default App;
