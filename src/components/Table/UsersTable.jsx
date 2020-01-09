import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  table: {
    minWidth: 500
  }
});

const createData = (firstName, lastName, gender, age, email, linkedIn) => {
  return { firstName, lastName, gender, age, email, linkedIn };
};

const rows = [
  createData("Gaylord", "Focker", "M", 50, "gaylord.focker@mail.com", "yes"),
  createData("Martha", "Focker", "F", 23, "martha.focker@mail.com", "no"),
  createData("Steve", "Jobs", "M", 25, "steve.jobs@apple.com", "yes")
];

class UsersTable extends Component {
  render() {
    const { classes } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <caption>list of users</caption>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Email</TableCell>

              <TableCell align="right">Linked-In Account </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.firstName}>
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.linkedIn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default withStyles(styles)(UsersTable);
