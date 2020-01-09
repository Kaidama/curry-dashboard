import React, { Component } from 'react'
import queryString from 'query-string';
import { connect } from 'react-redux';
import { setAuthSuccessUser } from '../../redux/actions/authUserAction'

class LinkedInAuth extends Component {

  componentDidMount() {
  
    let query = queryString.parse(this.props.location.search);
    let token = query.token;
    if (token) {
      this.props.setAuthSuccessUser(token)
      // window.localStorage.setItem("jwt", query.token);
      // this.props.history.push("/");
  
      window.opener.location.href = `http://localhost:3000/`;
      // console.log(query)
      window.close();
   } else {
     this.props.history.push('/');
   }
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default connect(null, { setAuthSuccessUser })(LinkedInAuth)
