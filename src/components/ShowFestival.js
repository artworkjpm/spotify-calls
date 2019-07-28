import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FestivalTable from "./FestivalTable";
import ImageComponent from "./imageComponent";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    position: "relative",
    top: -20,
    left: 20
  }
}));

const ShowFestivals = props => {
  const [open, setOpen] = React.useState(false);
  const [spinner, setLoading] = React.useState(true);

  const handleOpen = e => {
    props.handleClickGroup(e);
  };

  useEffect(() => {
    setOpen(props.setOpen);
  }, [props.setOpen]);

  const classes = useStyles();

  const HandleSpinner = () => {
    setLoading(false);
  };

  return (
    <div className="Home">
      <div className="player-wrap">
        <div className="Modal-new">
          {/* <ImageComponent artistImage={props.artistImage} /> */}

          {spinner ? <CircularProgress className={classes.progress} /> : null}

          <iframe
            className="iframe-style"
            title="spotify player"
            src={`https://open.spotify.com/embed/track/${props.popularSong}`}
            //src={`https://open.spotify.com/embed/artist/${artistID}/top-tracks?country=SE`}
            width="300"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            onLoad={HandleSpinner}
          />
          <div className="popular-songs">
            <p>
              <b>{props.artistName.name}'s</b> most popular songs:
            </p>
            <ol className="popular-songs-list">
              {props.popularSongsArray.map((song, i) => (
                <li key={i}>
                  <button value={song.id} onClick={props.handleClickSong}>
                    {song.name}
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="genres">
            {props.genres.map(genre => genre + ", ")}
          </div>
          <div onClick={props.onHandleClose}>Close</div>
        </div>
      </div>

      <FestivalTable handleOpen={handleOpen} />
    </div>
  );
};

export default ShowFestivals;
