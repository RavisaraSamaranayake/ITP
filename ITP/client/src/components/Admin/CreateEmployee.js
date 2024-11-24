import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEmployee = (props) => {
  const navigate = useNavigate();
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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!employee.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = "Invalid email address";
    }

    // Phone number validation
    if (!/^\d{10}$/.test(employee.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
    }

    // Password validation
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(employee.password)) {
      errors.password =
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post("http://localhost:8082/api/employees", employee)
        .then((res) => {
          setEmployee({
            // Clear form fields
            fname: "",
            lname: "",
            email: "",
            phoneNumber: "",
            DOB: "",
            username: "",
            password: "",
            post: "",
            years: "",
            department: "",
            division: "",
            officeLocation: "",
            remoteLocation: "",
            reportsTo: "",
            dayShift: "",
            nightShift: "",
            leaves: "",
          });

          // Push to /
          navigate("/");
        })
        .catch((err) => {
          console.log("Error in CreateEmployee!");
        });
    }
  };

  return (
    <div className="CreateEmployee">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Employee List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Employee</h1>
            <p className="lead text-center">Create new Employee</p>

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
                {errors.fname && <div className="error">{errors.fname}</div>}
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
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                  value={employee.email}
                  onChange={onChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  className="form-control"
                  value={employee.phoneNumber}
                  onChange={onChange}
                />
                {errors.phoneNumber && (
                  <div className="error">{errors.phoneNumber}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="DOB">Date of Birth</label>
                <input
                  type="date"
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
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
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

              <input
                type="submit"
                className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
