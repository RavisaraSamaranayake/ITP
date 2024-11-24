const express = require("express");
const connectDB = require("./config/db");

const cors = require("cors");

const app = express();

const employees = require("./routes/api/employee");
const auth = require("./routes/api/auth");

// Connect Database
connectDB();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

app.use("/auth", auth);
app.use("/api/employees", employees);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
