import React from "react";
import SearchBands from "./SearchBand";
var bands = require("../festivals/bands.json");

const Home = props => {
  return (
    <div className="Home">
      <h1>Hi {props.username}!</h1>
      <h2>Most popular Artist's songs on Spotify</h2>
      <SearchBands
        onSubmitValue={props.onSubmitValue}
        value={props.value}
        onChangeValue={props.onChangeValue}
      />
      <p>
        {props.artistName.name}, artist id: {props.artistName.id}
      </p>

      <div className="player-wrap">
        <img src={props.artistImage} alt="group" width="200" height="200" />
        <iframe
          title="spotify player"
          src={`https://open.spotify.com/embed/track/${props.popularSong}`}
          //src={`https://open.spotify.com/embed/artist/${artistID}/top-tracks?country=SE`}
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
        <div className="center-div">
          <h2>{props.artistName.name}'s most popular songs:</h2>
          <ol className="center-list">
            {props.popularSongsArray.map((song, i) => (
              <li key={i}>
                <button value={song.id} onClick={props.handleClickSong}>
                  {song.name}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="main-wrap">
        <div className="center-div">
          <h2>
            {bands.festival}: {bands.name}
          </h2>
          <table className="center-list">
            <tbody>
              {bands.events.map((group, i) => (
                <tr key={i}>
                  <td>{group.start}</td>
                  <td>
                    {" "}
                    <button value={group.name} onClick={props.handleClickGroup}>
                      {group.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
