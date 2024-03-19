import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Api";
import { toast } from "react-toastify";

const AddPatient = () => {
  const [patient, setPatient] = useState({
    uhId: "",
    firstName: "",
    lastName: "",
    gender: "",
    location: "",
    mobile: "",
    emailId: "",
    dob: "",
  });
  const navigate = useNavigate();
  const genders = ["Male", "Female", "Others"];

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
    const formData = new FormData();
    formData.append("firstName", patient.firstName);
    formData.append("lastName", patient.lastName);
    formData.append("gender", patient.gender);
    formData.append("location", patient.location);
    formData.append("mobile", Number(patient.mobile));
    formData.append("emailId", patient.emailId);
    formData.append("dob", "2023-11-01");

    Api.post("/patient/create", formData)
      .then(function (res) {
        toast.success("Patient created ! UH Id: " + res.data.uhId, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/dashboard/patient");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex m-3">
      <div className="p-0 rounded w-100 border">
        <div className="bg-primary bg-gradient bg-opacity-100 d-flex justify-content-between p-2 border">
          <h4 className="text-light">Create Patient</h4>
          <Link
            to="/pages/patients"
            className="btn btn-md btn-outline-light float-right me-2"
          >
            Back
          </Link>
        </div>
        <div className="p-1 bg-white rounded">
          <form className="g-1" onSubmit={handleSubmit}>
            <div className="container">
              <div className="row pt-3">
                <div className="col-6 form-group required">
                  <label htmlFor="inputFirstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputFirstName"
                    placeholder=""
                    onChange={(e) =>
                      setPatient({ ...patient, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="col-6 form-group required">
                  <label htmlFor="inputLastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputLastName"
                    placeholder=""
                    onChange={(e) =>
                      setPatient({ ...patient, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6 form-group required">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="form-select"
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
                <div className="col-6 form-group required">
                  <label htmlFor="inputLocation" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputLocation"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setPatient({ ...patient, location: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6 form-group required">
                  <label htmlFor="inputMobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputMobile"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setPatient({ ...patient, mobile: e.target.value })
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="inputEmailId" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="inputEmailId"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setPatient({ ...patient, emailId: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-12 text-end pt-3 pb-2">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
