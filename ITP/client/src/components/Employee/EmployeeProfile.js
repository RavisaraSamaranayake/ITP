import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EmployeeProfile(props) {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/employees/${id}`)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowEmployeeDetails");
      });
  }, [id]);

  const onDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8082/api/employees/${id}`)
        .then((res) => {
          navigate("/user/register");
        })
        .catch((err) => {
          console.log("Error from ShowEmployeeDetails_deleteClick");
        });
    }
  };

  const PersonalDetailsSection = (
    <div>
      <h2>Personal Details</h2>
      <table className="table table-hover table-dark ">
        <tbody>
          <tr>
            <td>First Name</td>
            <td>{employee.fname}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{employee.lname}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{employee.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{employee.phoneNumber}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{employee.DOB}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{employee.username}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>*****</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const OfficePurposeSection = (
    <div>
      <h2>Employee Information</h2>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <td>Post</td>
            <td>{employee.post}</td>
          </tr>
          <tr>
            <td>Years</td>
            <td>{employee.years}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>{employee.department}</td>
          </tr>
          <tr>
            <td>Division</td>
            <td>{employee.division}</td>
          </tr>
          <tr>
            <td>Office Location</td>
            <td>{employee.officeLocation}</td>
          </tr>
          <tr>
            <td>Remote Location</td>
            <td>{employee.remoteLocation}</td>
          </tr>
          <tr>
            <td>Reports To</td>
            <td>{employee.reportsTo}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const WorkShiftSection = (
    <div>
      <h2>This Month</h2>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <td>Day Shift</td>
            <td>{employee.dayShift}</td>
          </tr>
          <tr>
            <td>Night Shift</td>
            <td>{employee.nightShift}</td>
          </tr>
          <tr>
            <td>Leaves</td>
            <td>{employee.leaves}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="ShowEmployeeDetails">
      <div className="container">
        <div className="row">
          {/* <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Employee List
            </Link>
          </div> */}
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">My Profile</h1>
            <hr /> <br />
          </div>
          <div className="col-md-10 m-auto">
            {PersonalDetailsSection}
            {OfficePurposeSection}
            {WorkShiftSection}
          </div>
          <div className="col-md-6 m-auto">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg btn-block"
              onClick={() => {
                onDeleteClick(employee._id);
              }}
            >
              Delete Profile
            </button>
          </div>
          <div className="col-md-6 m-auto">
            <Link
              to={`/edit-profile/${employee._id}`}
              className="btn btn-outline-info btn-lg btn-block"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
