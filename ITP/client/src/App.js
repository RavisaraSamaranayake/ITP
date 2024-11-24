import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import CreateEmployee from "./components/Admin/CreateEmployee";
import UpdateEmployeeInfo from "./components/Admin/UpdateEmployeeInfo";
import ShowEmployeeDetails from "./components/Admin/ShowEmployeeDetails";
import ShowEmployeeList from "./components/Admin/ShowEmployeeList";

import Register from "./components/Employee/Register";
import Login from "./components/Employee/Login";
import EmployeeProfile from "./components/Employee/EmployeeProfile";
import EditProfile from "./components/Employee/EditProfile";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<ShowEmployeeList />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/edit-employee/:id" element={<UpdateEmployeeInfo />} />
          <Route path="/show-employee/:id" element={<ShowEmployeeDetails />} />

          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/employee-profile/:id" element={<EmployeeProfile />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
