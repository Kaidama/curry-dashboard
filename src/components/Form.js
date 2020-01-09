import React, { Component } from "react";
import Notifications, { notify } from "react-notify-toast";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import axios from 'axios';

const toastColor = {
  background: "#505050",
  text: "#fff"
};

export default class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      dob: '',
      age: 0,
      email: "",
      phone: "",
      educationLevel: "",
      schoolName: "",
      tags: [],
      linkedInStrategy: false,
      pictureUploaded: false,
      pictureName: ''
    };


  }


  componentDidMount() {
    this.toast = notify.createShowQueue();
    this.formData = new FormData()
  }


  handleOnSubmit = event => {
    event.preventDefault(); 

    //this.formData.set('data', this.state)
    let stateObj = this.state;
    for(let key in stateObj) {
      this.formData.set(key, stateObj[key])
    }
   
    axios.post('http://localhost:3001/users/create-user', this.formData, {
      header: { 'Accept': 'application/json'}
    })
         .then( success => {
            console.log(success);
         })
         .catch( error => {
           console.log(error)
         })


  };

  handleFileUpload = event => {
  
    const errs = [];
    const files = Array.from(event.target.files);

    if (files.length > 2) {
      const msg = "Only 1 image is allowed";
      return this.toast(msg, "custom", 4000, toastColor);
    }

    //const formData = new FormData();

    const types = ["image/png", "image/jpeg", "image/jpg"];

    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
        return;
      }

      if (file.size > 150000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
        return;
      }

      //this.formData.append(i, file);

    });

    if (errs.length) {
      return errs.forEach(err => this.toast(err, "custom", 2000, toastColor));
    } else {
      
      this.formData.set('photo', event.target.files[0])
  
      this.setState({
        pictureUploaded: true,
        pictureName: files[0].name
      })
    }
  };

  handleOnChangeTags = tags => {
    this.setState({ tags });
  };

  handleOnChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <Notifications />
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
          <form onSubmit={this.handleOnSubmit}>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="id-firstName"
                  placeholder="Enter First Name"
                  onChange={this.handleOnChangeInput}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  id="id-lastName"
                  placeholder="Enter Last Name"
                  onChange={this.handleOnChangeInput}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="id-password"
                  placeholder="Password"
                  onChange={this.handleOnChangeInput}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="id-email"
                  placeholder="Enter email"
                  onChange={this.handleOnChangeInput}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  id="id-phone"
                  placeholder="Enter Phone Number"
                  onChange={this.handleOnChangeInput}
                />
              </div>

              <div className="form-group">
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  id="id-dob"
                  onChange={this.handleOnChangeInput}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="educationLevel"
                  className="form-control"
                  id="id-education-level"
                  placeholder="Enter Education Level"
                  onChange={this.handleOnChangeInput}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="schoolName"
                  className="form-control"
                  id="id-school-name"
                  placeholder="School Name"
                  onChange={this.handleOnChangeInput}
                />
              </div>

              <div className="form-group">
                <TagsInput
                  value={this.state.tags}
                  onChange={this.handleOnChangeTags}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload
                  </span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    name="photo"
                    onChange={this.handleFileUpload}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                    style={{ paddingRight: "80px" }}
                  >
                    Choose file
                  </label>
                </div>
              </div>
              { this.state.pictureUploaded ? <span className="form-text text-muted">{this.state.pictureName} uploaded</span> : ''}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary pull-right">
                Submit
              </button>
            </div>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </form>
        </div>
      </div>
    );
  }
}
