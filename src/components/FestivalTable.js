import React from "react";
import Moment from "react-moment";
//import festival from "../festivals/festivalnbury2019.json";
//import festival from "../festivals/read2019.json";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
/* import AllFestivals from "../festivals/AllFestivals";

console.log(" AllFestivals[0].name", AllFestivals[0].name); */

const FestivalTable = props => {
  const festival = props.festival.value;
  //console.log("festival: ", festival);
  const [currentIndex, setIndex] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const getArray = e => {
    setIndex(e.target.value);
    handleClose();
    window.scrollTo(0, 0);
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function findDay(d) {
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return weekday[d.getDay()];
  }

  function changeClassDay(d) {
    if (d === "Sun") {
      return "sunday";
    } else if (d === "Sat") {
      return "saturday";
    } else if (d === "Fri") {
      return "friday";
    } else if (d === "Thu") {
      return "thursday";
    } else if (d === "Wed") {
      return "wednesday";
    } else if (d === "Tue") {
      return "tuesday";
    } else if (d === "Mon") {
      return "monday";
    }
  }

  /*   console.log(festival.locations); */

  return festival != null ? (
    <div className="main-wrap lineup">
      <div className="center-div">
        <div className="alignLeft">
          <Chip label={festival.name}></Chip>
          <ChevronRightIcon className="rightArrow" />
          <Chip label={festival.locations[currentIndex].name}></Chip>
        </div>

        <div className="hide-on-desktop stage-button">
          <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Stage
          </Button>
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {festival.locations.map((stage, i) => (
              <MenuItem key={i} value={i} onClick={getArray}>
                {stage.name}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <Grid container style={{ width: "800px" }}>
          <Grid item className="hide-on-mobile" style={{ float: "left" }}>
            <div className="desktop-menu">
              <p>
                <b>Stage</b>
              </p>
              {festival.locations.map((stage, i) => (
                <MenuItem key={i} value={i} onClick={getArray}>
                  {stage.name}
                </MenuItem>
              ))}
            </div>
          </Grid>

          <Grid item style={{ float: "left", width: "300px" }}>
            <table className="center-list">
              <tbody>
                <tr>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Artist</th>
                </tr>

                {festival.locations[currentIndex].events
                  .sort((a, b) => new Date(b.start) - new Date(a.start))
                  .map((group, i) => (
                    <tr key={i} className={changeClassDay(findDay(new Date(group.start)))}>
                      <td>{findDay(new Date(group.start))}</td>
                      <td>
                        <Moment format="DD/MM">{group.start}</Moment>
                      </td>
                      <td>
                        <Moment format="LT">{group.start}</Moment>
                      </td>
                      <td>
                        {" "}
                        <button
                          value={group.name}
                          onClick={e => {
                            props.handleOpen(e);
                          }}
                        >
                          {group.name}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Grid>
        </Grid>
      </div>
    </div>
  ) : (
    ""
  );
};

export default FestivalTable;
