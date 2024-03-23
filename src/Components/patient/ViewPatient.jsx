import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../home/Api";

const ViewPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  const handleDelete = (id) => {
    Api.delete("/patient/" + id)
      .then(function (res) {
        navigate("/pages/patients");
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    navigate("/pages/editpatient/" + id);
  };

  return (
    <div className="d-flex m-3">
      <div className="p-0 rounded w-100 border">
        <div className="bg-primary bg-gradient bg-opacity-100 d-flex justify-content-between p-2 border">
          <h4 className="text-light">Patient Details</h4>
          <Link
            to="/pages/patients"
            className="btn btn-md btn-outline-light float-right me-2"
          >
            Back
          </Link>
        </div>
        <div className="p-1 bg-white rounded">
          <div className="container">
            <div className="row pt-3">
              <div className="col-6 form-group">
                <label htmlFor="inputFirstName" className="form-label">
                  First Name:
                </label>
                <h5>{patient.firstName}</h5>
              </div>
              <div className="col-6 form-group">
                <label htmlFor="inputLastName" className="form-label">
                  Last Name:
                </label>
                <h5>{patient.lastName}</h5>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6 form-group">
                <label htmlFor="gender" className="form-label">
                  Gender:
                </label>
                <h5>{patient.gender}</h5>
              </div>
              <div className="col-6 form-group">
                <label htmlFor="inputLocation" className="form-label">
                  Location:
                </label>
                <h5>{patient.location}</h5>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6 form-group">
                <label htmlFor="inputMobile" className="form-label">
                  Mobile:
                </label>
                <h5>{patient.mobile}</h5>
              </div>
              <div className="col-6">
                <label htmlFor="inputEmailId" className="form-label">
                  Email Id:
                </label>
                <h5>{patient.emailId}</h5>
              </div>
            </div>
            <div className="col-12 text-end pt-3 pb-2">
              <button
                className="btn btn-danger btn-md m-2"
                title="Delete"
                onClick={() => handleDelete(patient.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary btn-md"
                title="Edit"
                onClick={() => handleEdit(patient.id)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
