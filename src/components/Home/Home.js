import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";

class Home extends Component {
  componentDidMount() {
    if (this.props.authUser.isAuthenticated) {
      this.props.history.push("/auth-home");
    }
  }

  render() {
    return (
      <h1 className="class-home-h1">
        If you are not the Administrator,
        <br />
        then these are not the droids you are looking for.
      </h1>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, null)(Home);
