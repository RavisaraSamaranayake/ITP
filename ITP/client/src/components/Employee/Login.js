import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8082/auth/login", {
        email,
        password,
      });
      if (response.data.employee) {
        // Successful login, you can redirect the employee to another page or perform other actions
        console.log("Login successful");
        const id = response.data.employee._id;
        navigate(`/employee-profile/${id}`);
      } else {
        setError("Email and password do not match");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="CreateEmployee">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Login </h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-warning btn-block mt-4"
              >
                Login
              </button>
            </form>
            <div className="error">{error && <p>{error}</p>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
