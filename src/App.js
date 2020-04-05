import React, { Component } from "react";
//import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Popular from "./components/Popular";
import Home from "./components/Home";
import ShowFestivals from "./components/ShowFestival";
import NavBar from "./components/NavBar";
import AllFestivals from "./festivals/AllFestivals";

import "./App.scss";

//variables for the api calls
var artistID;
const parsed = new URLSearchParams(window.location.search).get("access_token");
const headersAPI = {
  headers: { Authorization: "Bearer " + parsed },
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
      popularSongs: [],
      image: [],
      genres: [],
      userName: "",
      setOpen: false,
      festivalSelected: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickSong = this.handleClickSong.bind(this);
    this.handleClickGroup = this.handleClickGroup.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeSingle = this.handleChangeSingle.bind(this);
  }

  handleChange(event) {
    this.setState({ searchName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.searchBands(this.state.searchName);
  }

  handleClickSong(e) {
    this.setState({ popularSongID: e.target.value });
  }

  handleClickGroup(e) {
    //alert("name: " + e.target.value);
    this.searchBands(e.target.value);
    this.setState({
      setOpen: false,
    });
  }

  //use url to show festival
  getURLFestival(festival) {
    const festivalURL = festival.split("festival/")[1];
    const result = AllFestivals.filter((name) => name.name.id === festivalURL);
    // console.log(result[0].name);
    this.handleChangeSingle({ value: result[0].name });
  }

  getUserProfile() {
    fetch(`https://api.spotify.com/v1/me`, headersAPI)
      .then((response) => {
        if (!response.ok) {
          if (window.location.href.indexOf("festival") > -1) {
            this.getURLFestival(window.location.toString());
          }
        } else {
          response.json().then((data) =>
            this.setState({
              userName: data.display_name.split(" ")[0],
              /* log: console.log(data) */
            })
          );
        }
      })
      .catch((error) =>
        this.setState({
          log: console.error("Error:", error),
          errorApi: true,
        })
      );
  }

  ifLocalhost() {
    if (window.location.href.includes("localhost")) {
      return "http://localhost:8888/login";
    } else {
      return "https://clipify-backend.herokuapp.com/login";
    }
  }

  searchBands(name) {
    fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, headersAPI)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return new Error(alert("reconnecting you to Spotify"), (window.location.href = this.ifLocalhost()));
        }
      })
      .then((data) => {
        if (data.artists.items.length > 0) {
          this.setState(
            {
              artistName: data.artists.items[0],
              image: data.artists.items[0],
              artistID: data.artists.items[0].id,
              genres: data.artists.items[0].genres,
            },
            this.getTopTracks
          );
        } else {
          alert("Sorry, there are no artists with that name on Spotify");
        }
      });
    /*  .catch(error =>
        this.setState(
          {
            log: console.error("Error:", error),
            errorApi: true,
            setOpen: false
          },
          alert("Sorry, there are no artists with that name on Spotify")
        )
      ); */
  }

  getTopTracks() {
    artistID = this.state.artistID;
    console.log("artistID: " + this.state.artistID);

    fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=GB`, headersAPI)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          log: console.log(data),
          popularSongID: data.tracks[0].id,
          popularSongs: data.tracks,
          setOpen: true,
        })
      )
      .catch((error) =>
        this.setState({
          log: console.error("Error:", error),
          errorApi: true,
        })
      );
  }

  handleClose() {
    this.setState({
      setOpen: false,
    });
  }

  handleChangeSingle(value) {
    console.log("handleChangeSingle: ", value);
    //setState is asynchronous, put the log in a callback of the setState() method
    this.setState({ festivalSelected: value }, () => {
      console.log("handleChangeSingle2: ", this.state.festivalSelected);
    });
    //this.props.history.push("/festival/" + value.value.id);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  render() {
    let popsong = this.state.popularSongID;
    let festivalSelected = this.state.festivalSelected;
    //console.log("popular song: " + this.state.popularSongID);
    //console.log("images: " + this.state.image);
    //console.log(window.location.href);

    return (
      <div className="App">
        <BrowserRouter>
          <NavBar parsed={this.state.parsed} allfestivals={AllFestivals} handleChangeSingle={this.handleChangeSingle} />
          <div>
            <Switch>
              <Route exact path="/" render={() => <Home allfestivals={AllFestivals} ifLocalhost={this.ifLocalhost()} username={this.state.userName.split(" ")[0]} handleChangeSingle={this.handleChangeSingle} />} />
              <Route
                exact
                path="/festival/:festivalName"
                render={() => (
                  <ShowFestivals
                    festival={festivalSelected}
                    errorApi={this.state.errorApi}
                    username={this.state.userName.split(" ")[0]}
                    artistName={this.state.artistName}
                    artistImage={this.state.image}
                    popularSong={popsong}
                    popularSongsArray={this.state.popularSongs}
                    onSubmitValue={this.handleSubmit}
                    value={this.state.value}
                    onChangeValue={this.handleChange}
                    handleClickSong={this.handleClickSong}
                    handleClickGroup={this.handleClickGroup}
                    setOpen={this.state.setOpen}
                    onHandleClose={this.handleClose}
                    genres={this.state.genres}
                  />
                )}
              />
              <Route path="/popular" component={Popular} ifLocalhost={this.ifLocalhost()} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
