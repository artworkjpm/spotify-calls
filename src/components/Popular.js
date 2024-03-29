import React, { Component } from "react";
import SearchBands from "./SearchBand";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { withRouter } from "../utilities/withRouter";
//get local json bands list
var bands = require("../festivals/bands.json");

//variables for the api calls
var artistID;
const parsed = new URLSearchParams(window.location.search).get("access_token");
const headersAPI = {
	headers: { Authorization: "Bearer " + parsed },
};

//https://api.spotify.com/v1/artists/{id}/top-tracks
//make call to above, get all the top track id's, put into audio player, easy!

class Popular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parsed: parsed,
			searchName: "",
			artistName: [],
			artistID: "",
			popularSongID: "",
			popularSongs: [],
			image: [],
			errorApi: false,
			userName: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClickSong = this.handleClickSong.bind(this);
		this.handleClickGroup = this.handleClickGroup.bind(this);
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
	}

	componentDidMount() {
		this.getUserProfile();
		this.searchBands("Oasis");
	}
	/* componentWillUpdate() {
    this.searchBands(name);
  } */

	getUserProfile() {
		fetch(`https://api.spotify.com/v1/me`, headersAPI)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					userName: data.display_name.split(" ")[0],
					log: console.log(data),
				})
			)
			.catch((error) =>
				this.setState({
					log: console.error("Error:", error),
					errorApi: true,
					logError: console.log(this.state.errorApi),
				})
			);
	}

	searchBands(name) {
		console.log("seachBands RAN");
		fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, headersAPI)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("searchBands found no band in spotify");
				}
			})
			.then((data) =>
				this.setState(
					{
						artistName: data.artists.items[0],
						log: console.log(data, "DATA SETSTATE RAN INSIDE SEARCH"),
						image: data.artists.items[0].images[0].url,
						artistID: data.artists.items[0].id,
					},
					this.getTopTracks
				)
			)
			.catch((error) =>
				this.setState(
					{
						log: console.error("Error:", error),
						errorApi: true,
					},
					alert("oops, Spotify could find no artists with this name")
				)
			);
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
				})
			)
			.catch((error) =>
				this.setState({
					log: console.error("Error:", error),
					errorApi: true,
				})
			);
	}

	render() {
		let popsong = this.state.popularSongID;
		if (popsong !== "") {
			console.log("popular song: " + this.state.popularSongID);
		}
		return (
			<div className="App">
				<>
					{this.state.userName ? (
						<h1>Hi {this.state.userName}!</h1>
					) : (
						<div>
							<p>You must have a Spotify account to use this site</p>
							<a href={this.props.ifLocalhost}>
								<Button variant="contained" color="default">
									Login
									<PlayArrowIcon />
								</Button>
							</a>
						</div>
					)}

					<h2>Find out the most popular songs for your favourite artists</h2>
					<SearchBands onSubmitValue={this.handleSubmit} value={this.state.value} onChangeValue={this.handleChange} />
					<p>
						{this.state.artistName.name}, artist id: {this.state.artistName.id}
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
					<div className="main-wrap">
						<div className="center-div-pop">
							<h2>
								{bands.festival}: {bands.name}
							</h2>
							<ul className="center-list">
								{bands.events.map((group, i) => (
									<li key={i}>
										<button value={group.name} onClick={this.handleClickGroup}>
											{group.name}
										</button>
									</li>
								))}
							</ul>
						</div>
						<div className="center-div-pop">
							<h2>{this.state.artistName.name}'s most popular songs:</h2>
							<ol className="center-list">
								{this.state.popularSongs.map((song, i) => (
									<li key={i}>
										<button value={song.id} onClick={this.handleClickSong}>
											{song.name}
										</button>
									</li>
								))}
							</ol>
						</div>
					</div>
				</>
			</div>
		);
	}
}

export default withRouter(Popular);
