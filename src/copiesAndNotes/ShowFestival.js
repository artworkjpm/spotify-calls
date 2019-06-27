import React from "react";

var bands = require("../festivals/bands.json");
const ShowFestivals = props => {
  return (
    <div className="Home">
      <div className="player-wrap">
        <iframe
          title="spotify player"
          src={`https://open.spotify.com/embed/track/${props.popularSong}`}
          //src={`https://open.spotify.com/embed/artist/${artistID}/top-tracks?country=SE`}
          width="300"
          height="80"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
        <div className="center-div popular-songs">
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
      <div className="main-wrap lineup">
        <div className="center-div">
          <h2>
            {bands.festival}: {bands.name}
          </h2>
          <table className="center-list">
            <tbody>
              <tr>
                <th>Day</th>
                <th>Date & Time</th>
                <th>Artist</th>
              </tr>

              {bands.events
                .sort((a, b) => new Date(b.start) - new Date(a.start))
                .map((group, i) => (
                  <tr key={i}>
                    <td>{props.findDay(new Date(group.start))}</td>
                    <td>{group.start}</td>
                    <td>
                      {" "}
                      <button
                        value={group.name}
                        onClick={props.handleClickGroup}
                      >
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

export default ShowFestivals;
