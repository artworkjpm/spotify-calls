import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
var bands = require("../festivals/bands.json");

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 380,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 0,
    outline: "none"
  }
}));

const ShowFestivals = props => {
  const [open, setOpen] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div className="Home">
      <div className="player-wrap">
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <img src={props.artistImage} alt="group" width="80" height="80" />
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
            <div className="popular-songs">
              <h2>{props.artistName.name}'s most popular songs:</h2>
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
          </div>
        </Modal>
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
                        onClick={e => {
                          handleOpen();
                          props.handleClickGroup(e);
                        }}
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
