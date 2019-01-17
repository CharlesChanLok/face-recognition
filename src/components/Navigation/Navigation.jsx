import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import ProfileIcon from "../Profile/ProfileIcon";
import "./Navigation.css";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const Navigation = (props) => {
  const { classes, handleRouteChange, isSignedIn, toggleModal } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className="Navigation_topbar_background_color">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <p className="FontFace_moonhouse">Face Recognition</p>
          </Typography>
          {isSignedIn ? (
            <div>
              <ProfileIcon
                handleRouteChange={handleRouteChange}
                toggleModal={toggleModal}
              />
            </div>
          ) : (
            <div>
              <Button
                onClick={() => handleRouteChange("signin")}
                color="inherit"
              >
                Sign In
              </Button>
              <Button
                onClick={() => handleRouteChange("signup")}
                color="inherit"
              >
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
