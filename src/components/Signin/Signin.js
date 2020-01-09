import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import { red } from "@material-ui/core/colors";
import { connect } from 'react-redux';
import { signin } from '../../redux/actions/authUserAction';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

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

class Signin extends Component {
  state = {
    password: "",
    email: "",
    error: ""
  };

  componentDidMount() {

    if (this.props.authUser.isAuthenticated) {
      this.props.history.push('/auth-home');
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
    //console.log(name, event.target.value)
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
  
    const user = {
      email: this.state.email,
      password: this.state.password
    };

 
    this.props.signin(user)
        .then(() => {
          this.setState({
            error: "",
            email: "",
            password: ""
          });
    
          this.props.history.push('/auth-home');
        })
        .catch(e => {
          const { message } = e.response.data
          this.setState({ error: message });
        })    
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
                Sign in via LinkedIn
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
                Sign in
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
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <br />{" "}
              {this.state.error && (
                <Typography component="p" color="error" style={{fontSize: 15}}>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser
  }
}

export default connect(mapStateToProps, { signin })(withStyles(styles)(Signin));

