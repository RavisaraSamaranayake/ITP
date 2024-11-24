// auth.js
// Load Employee model
const Employee = require("./Employee");

async function register(
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  username,
  DOB
) {
  try {
    const newEmployee = new Employee({
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      DOB: DOB,
      username: username,
      // You can optionally set default values for other fields here
    });

    const savedEmployee = await newEmployee.save();
    return savedEmployee;
  } catch (error) {
    throw error;
  }
}

async function login(email, password) {
  try {
    const employee = await Employee.findOne({ email, password });
    return employee; // Returns the employee object if found, or null if not found
  } catch (error) {
    throw error;
  }
}

module.exports = { register, login };
