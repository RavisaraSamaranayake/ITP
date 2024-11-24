import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";

function ShowEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/employees")
      .then((res) => {
        setEmployees(res.data);
        setFilteredEmployees(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowEmployeeList");
      });
  }, []);

  const handleSearch = () => {
    const filtered = employees.filter((employee) => {
      const fullName = employee.fname + " " + employee.lname;
      return (
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredEmployees(filtered);
    setShowAll(false);
  };

  const handleViewAll = () => {
    setFilteredEmployees(employees);
    setSearchTerm("");
    setShowAll(true);
  };

  return (
    <div className="ShowEmployeeList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Employees List</h2>
          </div>

          <div className="col-md-11">
            <Link
              to="/create-employee"
              className="btn btn-outline-warning float-right"
            >
              + Add New Employee
            </Link>
            <br />
            <br />
            <div className="input-group input-group-sm mb-3">
              <input
                type="text"
                placeholder="Search by Name/Dept"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              {!showAll && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleViewAll}
                >
                  View All Employees
                </button>
              )}
            </div>
            <hr />
          </div>
        </div>

        <div className="list">
          {filteredEmployees.length === 0
            ? "No matching employees found."
            : filteredEmployees.map((employee, k) => (
                <EmployeeCard employee={employee} key={k} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default ShowEmployeeList;
