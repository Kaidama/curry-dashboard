import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/authUserAction";
import Avatar from "@material-ui/core/Avatar";

import "./Nav.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    margin: theme.spacing(2.5),
    fontSize: 28
  }
});

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ffa726" };
  else return { color: "#ffffff" };
};

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class Nav extends Component {
  render() {
    const { classes } = this.props;

    let navigation = null;

    if (this.props.authUser.isAuthenticated) {
      console.log(this.props.authUser.user.photos);
      navigation = (
        <>
          <NavLink
            to="/user-profile"
            className="class-nav-link"
            activeClassName="class-active-nav-lin"
          >
            <Avatar
              alt="Cindy Baker"
              src="https://media.licdn.com/dms/image/C5603AQHrnJjaX7E8Sw/profile-displayphoto-shrink_800_800/0?e=1583971200&v=beta&t=rJLkIVdvlWAKmpk3q4VtaiTujX2fGtwpVz_4i3_-6so"
            />
          </NavLink>
          <NavLink
            to="/logout"
            className="class-nav-link"
            activeClassName="class-active-nav-lin"
            onClick={this.props.logout}
          >
            Logout
          </NavLink>
          <NavLink
            to="/sign-in"
            className="class-nav-link"
            activeClassName="class-active-nav-lin"
          >
            Settings
          </NavLink>
        </>
      );
    } else {
      navigation = (
        <>
          <NavLink
            to="/sign-up"
            className="class-nav-link"
            activeClassName="class-active-nav-lin"
          >
            Sign up
          </NavLink>
          <NavLink
            to="/sign-in"
            className="class-nav-link"
            activeClassName="class-active-nav-lin"
          >
            Sign in
          </NavLink>
        </>
      );
    }

    let activeHistoryStyleFunc;

    if (this.props.history.location.pathname === "/") {
      activeHistoryStyleFunc = isActive(this.props.history, "/");
    } else {
      activeHistoryStyleFunc = isActive(this.props.history, "/auth-home");
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Admin Data Club
              <NavLink to="/" className="class-nav-link">
                {" "}
                <HomeIcon
                  className={classes.icon}
                  style={activeHistoryStyleFunc}
                />{" "}
              </NavLink>
            </Typography>
            {navigation}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, { logout })(
  withRouter(withStyles(styles)(Nav))
);
