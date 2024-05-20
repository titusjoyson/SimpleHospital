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
import FormPropsTextFields from "./components/baseForm/BaseForm";
import PatientRegistration from "./components/patient/Registration";
import CustomizedTables from "./components/baseForm/BaseTable";

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
              element={<PatientRegistration title="Registration"/>}
            ></Route>
            <Route
              path="/pages/table"
              element={<CustomizedTables />}
            ></Route>
          </Route>
          <Route path="*" element={<> Not found</>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
