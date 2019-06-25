import React from "react";
import SearchBands from "./SearchBand";

const Home = props => {
  return (
    <div className="Home">
      {props.errorApi ? (
        <h1>Problem with the Spotify API backend</h1>
      ) : (
        <>
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
          <img src={props.artistImage} alt="group" width="200" />

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
                <li key={i}>{song.name}</li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
