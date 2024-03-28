import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import AddPatient from "./components/patient/AddPatient";
import PrivateRoute from "./components/home/PrivateRoute";
import ViewPatient from "./components/patient/ViewPatient";
import EditPatient from "./components/patient/EditPatient";
import Dashboard from "./components/home/Dashboard";
import SideBar from "./components/Sidebar/SideBar";
import NavBar from "./components/navbar/NavBar";
import Login from "./components/home/Login";
import AllPatients from "./components/patient/AllPatients";
import EditDepartment from "./components/department/EditDepartment";
import ViewDepartment from "./components/department/ViewDepartment";
import AddDepartment from "./components/department/AddDepartment";
import AllDepartments from "./components/department/AllDepartments";
import AllDoctors from "./components/doctor/AllDoctors";
import AddDoctor from "./components/doctor/AddDoctor";
import ViewDoctor from "./components/doctor/ViewDoctor";
import EditDoctor from "./components/doctor/EditDoctor";
import AllAppointments from "./components/appointment/AllAppointments";
import AddAppointment from "./components/appointment/AddAppointment";
import ViewAppointment from "./components/appointment/ViewAppointment";
import EditAppointment from "./components/appointment/EditAppointment";

function App() {
  return (
    <Router>
      <SideBar>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/pages"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/pages/patients" element={<AllPatients />}></Route>
            <Route path="/pages/addpatient" element={<AddPatient />}></Route>
            <Route
              path="/pages/viewpatient/:id"
              element={<ViewPatient />}
            ></Route>
            <Route
              path="/pages/editpatient/:id"
              element={<EditPatient />}
            ></Route>
            <Route
              path="/pages/departments"
              element={<AllDepartments />}
            ></Route>
            <Route
              path="/pages/adddepartment"
              element={<AddDepartment />}
            ></Route>
            <Route
              path="/pages/viewdepartment/:id"
              element={<ViewDepartment />}
            ></Route>
            <Route
              path="/pages/editdepartment/:id"
              element={<EditDepartment />}
            ></Route>
            <Route path="/pages/doctors" element={<AllDoctors />}></Route>
            <Route path="/pages/adddoctor" element={<AddDoctor />}></Route>
            <Route
              path="/pages/viewdoctor/:id"
              element={<ViewDoctor />}
            ></Route>
            <Route
              path="/pages/editdoctor/:id"
              element={<EditDoctor />}
            ></Route>
            <Route
              path="/pages/appointments"
              element={<AllAppointments />}
            ></Route>
            <Route
              path="/pages/addappointment"
              element={<AddAppointment />}
            ></Route>
            <Route
              path="/pages/viewappointment/:id"
              element={<ViewAppointment />}
            ></Route>
            <Route
              path="/pages/editappointment/:id"
              element={<EditAppointment />}
            ></Route>
          </Route>
          <Route path="*" element={<> Not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
