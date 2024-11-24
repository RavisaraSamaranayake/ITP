import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import googleImage from "../images/pdf.jpg";

function ShowEmployeeDetails(props) {
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
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8082/api/employees/${id}`)
        .then((res) => {
          navigate("/");
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
      <h2>Office Purpose</h2>
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
      <h2>Work Shift</h2>
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

  const generatePDF = () => {
    const doc = new jsPDF();

    // Define the coordinates and size for the image on the left
    const imageX = 10;
    const imageY = 30;
    const imageWidth = 80; // Adjust the width as needed
    const imageHeight = 80; // Adjust the height as needed

    // Add the image to the left side of the PDF
    doc.addImage(googleImage, "JPEG", imageX, imageY, imageWidth, imageHeight);

    // Define the coordinates for the content on the right
    const contentX = 100; // Adjust the X position as needed
    const contentY = 40; // Adjust the Y position as needed

    // Define the content for the PDF (without the image)
    const content = `
      ${employee.fname} ${employee.lname}'s Information:
      Personal Details:
      First Name: ${employee.fname}
      Last Name: ${employee.lname}
      Email: ${employee.email}
      Phone Number: ${employee.phoneNumber}
      Date of Birth: ${employee.DOB}
      Username: ${employee.username}
      
      Office Purpose:
      Post: ${employee.post}
      Years: ${employee.years}
      Department: ${employee.department}
      Division: ${employee.division}
      Office Location: ${employee.officeLocation}
      Remote Location: ${employee.remoteLocation}
      Reports To: ${employee.reportsTo}
      
      Work Shift:
      Day Shift: ${employee.dayShift}
      Night Shift: ${employee.nightShift}
      Leaves: ${employee.leaves}
    `;

    // Add the title and content to the right side of the PDF
    doc.setFontSize(14); // Set font size for the title
    doc.text(
      `${employee.fname} ${employee.lname}'s Information`,
      contentX,
      contentY
    );
    doc.setFontSize(12); // Reset font size for the content
    doc.text(content, contentX, contentY + 20); // Adjust Y position for content

    // Save the PDF
    doc.save("EmployeeInformation.pdf");
  };

  return (
    <div className="ShowEmployeeDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Employee List
            </Link>
            <Link
              onClick={generatePDF}
              className="btn btn-outline-danger float-right"
            >
              <span style={{ marginRight: "8px" }}>📄</span> Generate PDF
            </Link>
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Employee's Info</h1>
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
              Delete Employee
            </button>
          </div>
          <div className="col-md-6 m-auto">
            <Link
              to={`/edit-employee/${employee._id}`}
              className="btn btn-outline-info btn-lg btn-block"
            >
              Edit Employee
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowEmployeeDetails;
