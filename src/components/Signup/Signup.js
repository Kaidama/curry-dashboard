import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import { red } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { signup } from "../../redux/actions/authUserAction";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: "middle"
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2)
  }
});

class Signup extends Component {
  state = {
    password: "",
    confirmPassword: "",
    email: "",
    open: false,
    error: ""
  };

  componentDidMount() {
    if (this.props.authUser.isAuthenticated) {
      this.props.history.push("/auth-home");
    }
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props
      .signup(user)
      .then(() => {
        this.setState({
          error: "",
          open: true,
          email: "",
          password: "",
          confirmPassword: ""
        });
      })
      .catch(e => {
        const { message } = e.response.data;
        this.setState({ error: message });
      });
  };

  onLinkedInClick = () => {
    let linkedInUri =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/api/users/linkedin/auth"
        : "";

    const options = `width=${500},height=${600},left=${0},top=${0}`;
    window.open(linkedInUri, "Authorization", options);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Card className={classes.card}>
          <CardContent>
            <button
              style={{
                backgroundColor: "rgba(0,0,0,0.0)",
                borderStyle: "none"
              }}
            >
              <Typography
                type="headline"
                component="h2"
                className={classes.title}
                onClick={this.onLinkedInClick}
              >
                Sign up via LinkedIn
                <br />
                <LinkedInIcon style={{ fontSize: 35 }} />
              </Typography>
            </button>
          </CardContent>
        </Card>

        <ValidatorForm onSubmit={this.handleSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                type="headline"
                component="h2"
                className={classes.title}
              >
                Sign up
              </Typography>
              <TextValidator
                id="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
              <br />
              <TextValidator
                id="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange("password")} //eYrw%C0JQZ4z
                margin="normal"
                validators={[
                  "minStringLength:12",
                  "maxStringLength:20",
                  "matchRegexp:(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&])"
                ]}
                errorMessages={[
                  "minimum of 12 characters",
                  "cannot be longer than 20 characters",
                  "password must contain one uppercase, one lowercase, a number, and a special character"
                ]}
              />
              <br />
              <TextValidator
                id="confirm-password"
                type="password"
                label="Confirm Password"
                className={classes.textField}
                value={this.state.confirmPassword}
                onChange={this.handleChange("confirmPassword")}
                margin="normal"
                validators={[
                  "minStringLength:12",
                  "maxStringLength:20",
                  "isPasswordMatch"
                ]}
                errorMessages={[
                  "minimum of 12 characters",
                  "cannot be longer than 20 characters",
                  "password mismatch"
                ]}
              />
              <br />{" "}
              {this.state.error && (
                <Typography component="p" color="error">
                  <ErrorIcon
                    style={{ color: red[500] }}
                    className={classes.error}
                  />
                  {this.state.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={this.clickSubmit}
                className={classes.submit}
                type="submit"
              >
                Submit
              </Button>
            </CardActions>
            <span style={{ fontSize: 11 }}>
              We'll never share your email with anyone else.
            </span>
          </Card>
        </ValidatorForm>

        <Dialog open={this.state.open} disableBackdropClick={true}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New account successfully created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/sign-in">
              <Button color="primary" autoFocus="autoFocus" variant="contained">
                Sign In
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, { signup })(withStyles(styles)(Signup));

/*

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import { red } from "@material-ui/core/colors";
import Axios from "../Api/Axios/Axios";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: "middle"
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2)
  }
});

class Signup extends Component {
  state = {
    password: "",
    confirmPassword: "",
    email: "",
    open: false,
    error: ""
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleChange = name => event => {
    //console.log(name, event.target.value)
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    // console.log(this.state)
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    try {
      let success = await Axios.post("/api/users/create-user", user);

      this.setState({
        error: "",
        open: true,
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (e) {
      this.setState({ error: e.error });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Card className={classes.card}>
          <CardContent>
            <button
              style={{
                backgroundColor: "rgba(0,0,0,0.0)",
                borderStyle: "none"
              }}
            >
              <Typography
                type="headline"
                component="h2"
                className={classes.title}
              >
                Sign up via LinkedIn
                <br />
                <LinkedInIcon style={{ fontSize: 35 }} />
              </Typography>
            </button>
          </CardContent>
        </Card>

        <ValidatorForm onSubmit={this.handleSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                type="headline"
                component="h2"
                className={classes.title}
              >
                Sign up
              </Typography>
              <TextValidator
                id="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
              <br />
              <TextValidator
                id="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange("password")} //eYrw%C0JQZ4z
                margin="normal"
                validators={[
                  "minStringLength:12",
                  "maxStringLength:20",
                  "matchRegexp:(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&])"
                ]}
                errorMessages={[
                  "minimum of 12 characters",
                  "cannot be longer than 20 characters",
                  "password must contain one uppercase, one lowercase, a number, and a special character"
                ]}
              />
              <br />
              <TextValidator
                id="confirm-password"
                type="password"
                label="Confirm Password"
                className={classes.textField}
                value={this.state.confirmPassword}
                onChange={this.handleChange("confirmPassword")}
                margin="normal"
                validators={[
                  "minStringLength:12",
                  "maxStringLength:20",
                  "isPasswordMatch"
                ]}
                errorMessages={[
                  "minimum of 12 characters",
                  "cannot be longer than 20 characters",
                  "password mismatch"
                ]}
              />
              <br />{" "}
              {this.state.error && (
                <Typography component="p" color="error">
                  <ErrorIcon
                    style={{ color: red[500] }}
                    className={classes.error}
                  />
                  {this.state.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={this.clickSubmit}
                className={classes.submit}
                type="submit"
              >
                Submit
              </Button>
            </CardActions>
            <span style={{ fontSize: 11 }}>
              We'll never share your email with anyone else.
            </span>
          </Card>
        </ValidatorForm>

        <Dialog open={this.state.open} disableBackdropClick={true}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New account successfully created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/signin">
              <Button color="primary" autoFocus="autoFocus" variant="contained">
                Sign In
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Signup);

*/
