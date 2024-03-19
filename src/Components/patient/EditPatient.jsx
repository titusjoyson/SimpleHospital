import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../Api";

const EditPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const genders = ["Male", "Female", "Others"];
  const [patient, setPatient] = useState({
    uhId: "",
    firstName: "",
    lastName: "",
    gender: "",
    localtion: "",
    mobile: "",
    emailId: "",
    dob: "",
  });

  useEffect(() => {
    const getPatient = async () => {
      Api.get("/patient/" + id, {
        params: {
          uhId: patient.uhId,
          firstName: patient.firstName,
          lastName: patient.lastName,
          gender: patient.gender,
          location: patient.location,
          mobile: patient.mobile,
          emailId: patient.emailId,
          dob: patient.dob,
        },
      })
        .then(function (res) {
          setPatient(res.data);
        })
        .catch((err) => console.log(err));
    };
    getPatient();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(patient.uhId);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Patient</h3>
        <Link
          to="/pages/patients"
          className="btn btn-md btn-outline-light float-right me-2"
        >
          Back
        </Link>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Firstname
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Firstname"
              value={patient.firstName}
              onChange={(e) =>
                setPatient({ ...patient, firstName: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={patient.emailId}
              onChange={(e) =>
                setPatient({ ...patient, emailId: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputLocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLocation"
              placeholder="Enter Location"
              autoComplete="off"
              value={patient.location}
              onChange={(e) =>
                setPatient({ ...patient, location: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputLastname" className="form-label">
              Lastname
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLastname"
              placeholder="1234 Main St"
              autoComplete="off"
              value={patient.lastName}
              onChange={(e) =>
                setPatient({ ...patient, lastName: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="gender" className="form-label">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="form-select"
              value={patient.gender}
              onChange={(e) =>
                setPatient({ ...patient, gender: e.target.value })
              }
            >
              <option value="0">--Select--</option>
              {genders.map((g) => {
                return <option value={g}>{g}</option>;
              })}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Save
            </button>
            <Link
              to="/pages/patients"
              className="btn btn-outline-secondary w-100 float-right mt-3"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
