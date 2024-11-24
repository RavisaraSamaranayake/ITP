import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateEmployeeInfo(props) {
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
        navigate(`/show-employee/${id}`);
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
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Employee List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Employee</h1>
            <p className="lead text-center">Update Employee's Info</p>
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
              />
            </div>

            {/* Office Purpose */}
            <h2>Office Purpose</h2>
            <div className="form-group">
              <select
                name="post"
                className="form-control"
                value={employee.post}
                onChange={onChange}
              >
                <option value="">Select Position</option>
                <option value="Manager">Manager</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Accountant">Accountant</option>
                <option value="Worker">Worker</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Years"
                name="years"
                className="form-control"
                value={employee.years}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Department"
                name="department"
                className="form-control"
                value={employee.department}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Division"
                name="division"
                className="form-control"
                value={employee.division}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Office Location"
                name="officeLocation"
                className="form-control"
                value={employee.officeLocation}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Remote Location"
                name="remoteLocation"
                className="form-control"
                value={employee.remoteLocation}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Reports To"
                name="reportsTo"
                className="form-control"
                value={employee.reportsTo}
                onChange={onChange}
              />
            </div>

            {/* Work Shift */}
            <h2>Work Shift</h2>
            <div className="form-group">
              <select
                name="dayShift"
                className="form-control"
                value={employee.dayShift}
                onChange={onChange}
              >
                <option value="">Select Day Shift</option>
                <option value="8am to 4pm">8am to 4pm</option>
                <option value="9am to 5pm">9am to 5pm</option>
              </select>
            </div>
            <div className="form-group">
              <select
                name="nightShift"
                className="form-control"
                value={employee.nightShift}
                onChange={onChange}
              >
                <option value="">Select Night Shift</option>
                <option value="4pm to 12am">4pm to 12am</option>
                <option value="5pm to 1am">5pm to 1am</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Leaves"
                name="leaves"
                className="form-control"
                value={employee.leaves}
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
            >
              Update Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployeeInfo;
