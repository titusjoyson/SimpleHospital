import React from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SignInSide from "./components/landing/SignInSide";
import DashboardContainer from "./components/layout/LayoutContaine";
import SearchPatientDetails from "./components/patient/SearchPatientDetails";
import PatientRegistration from "./components/patient/Registration";
import PatientToken from "./components/patient/PatientToken";
import RegistrationSuccess from "./components/patient/RegistrationSuccess";
import PatientDetails from "./components/patient/PatientDetails";
import PatientTokenList from "./components/patient/PatientTokenList";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignInSide />}></Route>
          <Route path="/pages" element={<DashboardContainer />}>
            <Route
              path="/pages/patient-registration"
              element={<PatientRegistration title="Registration" />}
            />
            <Route
              path="/pages/patient-registration-success"
              element={<RegistrationSuccess title="Registration Success" />}
            />
            <Route
              path="/pages/search-patient-details"
              element={<SearchPatientDetails title="Search Patient Details" />}
            />
            <Route
              path="/pages/patient-details"
              element={<PatientDetails title="Patient Details" />}
            />
            <Route
              path="/pages/patient-token"
              element={<PatientToken title="Patient Token" />}
            />
            <Route
              path="/pages/patient-token-list"
              element={<PatientTokenList title="Patient Token List" />}
            />
          </Route>
          <Route path="*" element={<> Not found</>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
