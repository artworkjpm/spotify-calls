import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Moment from "react-moment";

const Home = props => {
  const AllFestivals = props.allfestivals;
  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    }
  }));
  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  }))(TableRow);

  const classes = useStyles();

  /*   AllFestivals.map(item => {
    return console.log(item.name.timezone);
  });
 */

  return (
    <div className="home-table">
      <div className="container">
        <h2>Search and listen to bands playing the most popular music festivals around the world</h2>
        <p>You must have a Spotify account to use this site</p>{" "}
        <a href="https://clipify-backend.herokuapp.com/login">
          <Button variant="contained" color="default" className={classes.button}>
            Login
            <PlayArrowIcon className={classes.rightIcon} />
          </Button>
        </a>
        <h2>Most popular festivals</h2>
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Festival</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>Dates</StyledTableCell>

              <StyledTableCell>Number of stages</StyledTableCell>
              <StyledTableCell>Estimated attendance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllFestivals.map(festival => {
              return (
                <StyledTableRow hover key={festival.SearchName}>
                  <StyledTableCell component="th" scope="row">
                    {festival.SearchName}
                  </StyledTableCell>
                  <StyledTableCell>{festival.Country}</StyledTableCell>
                  <StyledTableCell>
                    <Moment format="DD/MM/YYYY">{festival.start}</Moment> - <Moment format="DD/MM/YYYY">{festival.end}</Moment>
                  </StyledTableCell>
                  <StyledTableCell>{festival.name.locations.length}</StyledTableCell>
                  <StyledTableCell>{festival.attendance.toLocaleString()}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Home;
