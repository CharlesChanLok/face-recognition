import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import "./Profile.css";

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false
    };
  }

  handleToggle = () => {
    this.setState((state) => ({ dropdownActive: !state.dropdownActive }));
  };

  handleClose = () => {
    this.setState({ dropdownActive: false });
  };

  render() {
    const { dropdownActive } = this.state;

    return (
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
          aria-owns={dropdownActive ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://png.pngtree.com/svg/20161217/avatar__181424.png"
            className="profile-big-avatar"
          />
        </Grid>

        <Popper open={dropdownActive} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        this.props.toggleModal();
                        this.handleClose();
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        this.props.handleRouteChange("signout");
                        this.handleClose();
                      }}
                    >
                      Signout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default ProfileIcon;
