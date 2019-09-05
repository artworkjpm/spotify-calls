import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import SearchReact from "./SearchReact";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.65),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.45)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

export default function NavBar(props) {
  const parsed = props.parsed;

  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: "top", horizontal: "right" }} id={mobileMenuId} transformOrigin={{ vertical: "top", horizontal: "right" }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <Link to={`/?access_token=${parsed}`}>
        <MenuItem onClick={handleMenuClose}>Home</MenuItem>
      </Link>
      <Link to={`/popular?access_token=${parsed}`}>
        <MenuItem onClick={handleMenuClose}>PopularSong</MenuItem>
      </Link>
      <Link to={`/festival?access_token=${parsed}`}>
        <MenuItem onClick={handleMenuClose}>Festival</MenuItem>
      </Link>
      <Link to="/about">
        <MenuItem onClick={handleMenuClose}>About</MenuItem>
      </Link>

      <Link to="/contact">
        <MenuItem> Contact</MenuItem>
      </Link>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Hidden smDown>
            <Link to={`/?access_token=${parsed}`}>
              <h1 className="logo">Clipify&nbsp;</h1>
            </Link>
          </Hidden>
          <Hidden smDown>
            <p>
              <i>Listen to groups from music festival listings</i>&nbsp;
            </p>
          </Hidden>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <SearchReact allfestivals={props.allfestivals} />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className={classes.menuButton}>
              <Link to={`/?access_token=${parsed}`}>Home</Link>&nbsp;&nbsp;<Link to={`/popular?access_token=${parsed}`}>PopularSong</Link>&nbsp;&nbsp;<Link to={`/festival?access_token=${parsed}`}>Festival</Link>
              &nbsp;&nbsp;<Link to="/about">About</Link>
              &nbsp;&nbsp;<Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
