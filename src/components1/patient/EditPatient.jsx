import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../home/Api";
import { FaBackward, FaList, FaSave } from "react-icons/fa";

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

  const handleUpdate = (e) => {
    alert(patient.uhId);
    nProgress.start();
    const formData = new FormData();
    formData.append("uhId", patient.uhId);
    formData.append("firstName", patient.firstName);
    formData.append("lastName", patient.lastName);
    formData.append("gender", patient.gender);
    formData.append("location", patient.location);
    formData.append("mobile", Number(patient.mobile));
    formData.append("emailId", patient.emailId);
    formData.append("dob", "2023-11-01");

    Api.putForm("/patient/" + patient.id, formData)
      .then(function (res) {
        nProgress.done();
        toast.success("Patient updated! UH Id: " + res.data.uhId, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/pages/viewpatient/" + res.data.id);
      })
      .catch((err) => {
        nProgress.done(); // Stop the progress bar also on failure
        console.log(err);
      });
  };

  return (
    <div
      className="m-0 p-2 rounded border vh-100"
      style={{ backgroundColor: "#E5E7E9" }}
    >
      <div className="card">
        <div
          className="card-header text-dark d-flex justify-content-between p-2"
          style={{
            backgroundColor: "#D4E6F1",
          }}
        >
          <h5>Edit Patient</h5>
          <div className="ml-auto">
            <Link
              to="/pages/patients"
              className="btn btn-sm btn-primary float-right"
              title="View All"
            >
              <FaList /> View All
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="m-0">
            <div className="row">
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputUhId" className="form-label">
                  UH Id
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputUhId"
                  placeholder=""
                  autoComplete="off"
                  value={patient.uhId}
                  onChange={(e) =>
                    setPatient({ ...patient, uhId: e.target.value })
                  }
                  readOnly
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputFirstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputFirstName"
                  placeholder=""
                  autoComplete="off"
                  value={patient.firstName}
                  onChange={(e) =>
                    setPatient({ ...patient, firstName: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputLastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputLastName"
                  placeholder=""
                  autoComplete="off"
                  value={patient.lastName}
                  onChange={(e) =>
                    setPatient({ ...patient, lastName: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="gender" className="form-label">
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
                  <option key="0" value="0">
                    --Select--
                  </option>
                  {genders.map((g) => {
                    return (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputLocation" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputLocation"
                  placeholder=""
                  autoComplete="off"
                  value={patient.location}
                  onChange={(e) =>
                    setPatient({ ...patient, location: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputMobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputMobile"
                  autoComplete="off"
                  pattern="[0-9]{10}"
                  value={patient.mobile}
                  onChange={(e) =>
                    setPatient({ ...patient, mobile: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2">
                <label htmlFor="inputEmailId" className="form-label">
                  Email Id
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputEmailId"
                  autoComplete="off"
                  value={patient.emailId}
                  onChange={(e) =>
                    setPatient({ ...patient, emailId: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end p-2">
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginRight: "8px" }}
            title="Back"
            onClick={() => navigate(-1)}
          >
            <FaBackward /> Back
          </button>
          <button
            className="btn btn-primary btn-sm"
            title="Save"
            onClick={() => handleUpdate(patient.id)}
          >
            <FaSave /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPatient;
