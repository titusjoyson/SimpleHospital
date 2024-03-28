import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../home/Api";
import { toast } from "react-toastify";
import { FaList, FaSave } from "react-icons/fa";
import nProgress from "nprogress";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    uhId: "",
    firstName: "",
    lastName: "",
    gender: "",
    location: "",
    mobile: "",
    emailId: "",
    dob: "",
    specialization: "",
  });
  const navigate = useNavigate();
  const genders = ["Male", "Female", "Others"];

  const handleSubmit = (e) => {
    nProgress.start();
    const formData = new FormData();
    formData.append("firstName", doctor.firstName);
    formData.append("lastName", doctor.lastName);
    formData.append("gender", doctor.gender);
    formData.append("location", doctor.location);
    formData.append("mobile", Number(doctor.mobile));
    formData.append("emailId", doctor.emailId);
    formData.append("dob", "2023-11-01");
    formData.append("specialization", doctor.specialization);

    Api.post("/doctor/create", formData)
      .then(function (res) {
        nProgress.done();
        toast.success("Doctor created! Doctor No: " + res.data.docNo, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/pages/doctors");
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
          <h5>New Doctor</h5>
          <div className="ml-auto">
            <Link
              to="/pages/doctors"
              className="btn btn-sm btn-primary float-right"
            >
              <FaList /> View All
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="m-0">
            <div className="row">
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
                  onChange={(e) =>
                    setDoctor({ ...doctor, firstName: e.target.value })
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
                  onChange={(e) =>
                    setDoctor({ ...doctor, lastName: e.target.value })
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
                  onChange={(e) =>
                    setDoctor({ ...doctor, gender: e.target.value })
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
                  onChange={(e) =>
                    setDoctor({ ...doctor, location: e.target.value })
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
                  onChange={(e) =>
                    setDoctor({ ...doctor, mobile: e.target.value })
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
                  onChange={(e) =>
                    setDoctor({ ...doctor, emailId: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputSpecialization" className="form-label">
                  Specialization
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputSpecialization"
                  autoComplete="off"
                  onChange={(e) =>
                    setDoctor({ ...doctor, specialization: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-end p-2">
          <button
            onClick={() => handleSubmit()} // Assuming currentPage is maintained in the component's state or props
            className="btn btn-sm btn-primary float-right"
          >
            <FaSave /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
