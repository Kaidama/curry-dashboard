import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, withRouter } from "react-router-dom";
import UsersTable from "../Table/UsersTable";
import UsersCard from "../Cards/UsersCard";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";

class AuthHome extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <UsersTable />
            </Col>
          </Row>
          <br />
          <Col xs="auto">
            <UsersCard />
          </Col>
        </Container>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, null)(withRouter(AuthHome));
