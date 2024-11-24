import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile(props) {
  const [employee, setEmployee] = useState({
    // Personal Details
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    username: "",
    password: "",

    // Office Purpose
    post: "",
    years: "",
    department: "",
    division: "",
    officeLocation: "",
    remoteLocation: "",
    reportsTo: "",

    // Work Shift
    dayShift: "",
    nightShift: "",
    leaves: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/employees/${id}`)
      .then((res) => {
        setEmployee({
          fname: res.data.fname,
          lname: res.data.lname,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          DOB: res.data.DOB,
          username: res.data.username,
          password: res.data.password,
          post: res.data.post,
          years: res.data.years,
          department: res.data.department,
          division: res.data.division,
          officeLocation: res.data.officeLocation,
          remoteLocation: res.data.remoteLocation,
          reportsTo: res.data.reportsTo,
          dayShift: res.data.dayShift,
          nightShift: res.data.nightShift,
          leaves: res.data.leaves,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateEmployeeInfo");
      });
  }, [id]);

  const onChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to save changes?"
    );
    if (!isConfirmed) {
      return;
    }

    axios
      .put(`http://localhost:8082/api/employees/${id}`, employee)
      .then((res) => {
        navigate(`/employee-profile/${id}`);
      })
      .catch((err) => {
        console.log("Error in UpdateEmployeeInfo!");
      });
  };

  return (
    <div className="UpdateEmployeeInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit My Profile</h1>
            <p className="lead text-center">Update Personal Info</p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            {/* Personal Details */}
            <h2>Personal Details</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                name="fname"
                className="form-control"
                value={employee.fname}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                name="lname"
                className="form-control"
                value={employee.lname}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="form-control"
                value={employee.email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                className="form-control"
                value={employee.phoneNumber}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Date of Birth"
                name="DOB"
                className="form-control"
                value={employee.DOB}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="form-control"
                value={employee.username}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="form-control"
                value={employee.password}
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
            >
              Update My Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
