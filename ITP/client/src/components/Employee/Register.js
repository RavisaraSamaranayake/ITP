import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    username: "",
    password: "",
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
          });

          navigate("/user/login");
        })
        .catch((err) => {
          console.log("Error in Register!");
        });
    }
  };

  return (
    <div className="CreateEmployee">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Register </h1>

            <form noValidate onSubmit={onSubmit}>
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

              <input
                type="submit"
                value="Register"
                className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
