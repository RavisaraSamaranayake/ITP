const express = require("express");
const router = express.Router();
const auth = require("../../models/auth");

// Registration route
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, username, DOB } =
    req.body;

  try {
    const savedEmployee = await auth.register(
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      DOB,
      username
    );
    res.json(savedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await auth.login(email, password);
    if (employee) {
      res.json({ message: "Login successful", employee: employee });
    } else {
      res
        .status(401)
        .json({ error: "Login failed: Email and password do not match" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const employee = await auth.login(email, password);
//     if (employee) {
//       // Login successful; redirect to employee details route
//       res.json({ message: "Login successful", user: employee });

//       // Replace "employeeId" with the actual ID of the logged-in employee
//       const employeeId = employee._id; // Assuming "_id" is the employee ID field

//       // Redirect the user to the employee details route
//       res.redirect(`/employee/${employeeId}`);
//     } else {
//       res
//         .status(401)
//         .json({ error: "Login failed: Email and password do not match" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });

module.exports = router;
