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
import { withRouter } from "../utilities/withRouter";

/* import { Redirect } from "react-router"; */

const Home = withRouter((props) => {
	const AllFestivals = props.allfestivals;
	const useStyles = makeStyles((theme) => ({
		root: {
			width: "100%",
			marginTop: theme.spacing(3),
			overflowX: "auto",
		},
		table: {
			minWidth: 650,
		},
	}));
	const StyledTableCell = withStyles((theme) => ({
		head: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		body: {
			fontSize: 16,
		},
	}))(TableCell);

	const StyledTableRow = withStyles((theme) => ({
		root: {
			"&:nth-of-type(odd)": {
				backgroundColor: theme.palette.background.default,
			},
		},
	}))(TableRow);

	const classes = useStyles();

	function handleChangeSingle(clickedFromTable) {
		const value = {
			value: clickedFromTable,
		};
		props.handleChangeSingle(value);
		props.history.push("/festival/" + value.value.id);
	}

	return (
		<div className="home-table">
			<div>
				{/* {!props.username ? <Redirect to="{props.ifLocalhost}" /> : ""} */}
				{props.username ? (
					<h1>Hi {props.username}!</h1>
				) : (
					<div>
						<p>You must have a Spotify account to use this site</p>
						<a href={props.ifLocalhost}>
							<Button variant="contained" color="default">
								Login
								<PlayArrowIcon />
							</Button>
						</a>
					</div>
				)}
				<h2>Search and listen to bands playing the most popular music festivals around the world</h2>

				<h2>Most popular festivals</h2>
			</div>
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<StyledTableCell>Festival</StyledTableCell>
							<StyledTableCell>Country</StyledTableCell>
							<StyledTableCell>Dates</StyledTableCell>

							<StyledTableCell>Stages</StyledTableCell>
							<StyledTableCell>Attendance</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{AllFestivals.map((festival) => {
							return (
								<StyledTableRow
									hover
									key={festival.SearchName}
									onClick={() => handleChangeSingle(festival.name)}
									className="rowLink"
								>
									<StyledTableCell component="th" scope="row">
										{festival.SearchName}
									</StyledTableCell>
									<StyledTableCell>{festival.Country}</StyledTableCell>
									<StyledTableCell>
										<Moment format="DD/MM">{festival.start}</Moment> -{" "}
										<Moment format="DD/MM/YYYY">{festival.end}</Moment>
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
});

export default Home;
