const express = require("express");
const router = express.Router();

// Load Employee model
const Employee = require("../../models/Employee");

// @route GET api/employees/test
// @description tests employees route
// @access Public
router.get("/test", (req, res) => res.send("employee route testing!"));

// @route GET api/employees
// @description Get all employees
// @access Public
router.get("/", (req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) =>
      res.status(404).json({ noemployeesfound: "No employees found" })
    );
});

// @route GET api/employees/:id
// @description Get single employee by id
// @access Public
router.get("/:id", (req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => res.json(employee))
    .catch((err) =>
      res.status(404).json({ noemployeefound: "No employee found" })
    );
});

// @route GET api/employees
// @description add/save employee
// @access Public
router.post("/", (req, res) => {
  Employee.create(req.body)
    .then((employee) => res.json({ msg: "employee added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this employee" })
    );
});

// @route GET api/employees/:id
// @description Update employee
// @access Public
router.put("/:id", (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, req.body)
    .then((employee) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/employees/:id
// @description Delete employee by id
// @access Public
router.delete("/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, req.body)
    .then((employee) =>
      res.json({ mgs: "employee entry deleted successfully" })
    )
    .catch((err) => res.status(404).json({ error: "No such a employee" }));
});

module.exports = router;
