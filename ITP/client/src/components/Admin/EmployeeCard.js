import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const EmployeeCard = (props) => {
  const employee = props.employee;

  return (
    <div className="card-container">
      <img
        src="https://clipart-library.com/2023/133-1335107_staff-clipart-png-government-employee-clipart.png"
        alt="Employees"
        height={200}
        width={250}
      />
      <div className="desc">
        <h2>
          <Link to={`/show-employee/${employee._id}`}>
            {employee.fname} {employee.lname}
          </Link>
        </h2>
        <p>{employee.department}</p>
        <p>{employee.post}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
