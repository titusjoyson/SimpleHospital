import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import AllPatients from "./components/patient/AllPatients";
import AddPatient from "./components/patient/AddPatient";
import PrivateRoute from "./components/PrivateRoute";
import ViewPatient from "./components/patient/ViewPatient";
import EditPatient from "./components/patient/EditPatient";
import Dashboard from "./Components/Dashboard";
import SideBar from "./Components/Sidebar/SideBar";
import NavBar from "./components/navbar/NavBar";

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
            <Route path="" element={<Home />}></Route>
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
          </Route>
          <Route path="*" element={<> Not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
