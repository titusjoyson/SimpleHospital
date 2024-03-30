import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../home/Api";
import { FaBackward, FaList, FaSave } from "react-icons/fa";

const EditDoctor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const genders = ["Male", "Female", "Others"];
  const [doctor, setDoctor] = useState({
    docNo: "",
    firstName: "",
    lastName: "",
    gender: "",
    localtion: "",
    mobile: "",
    emailId: "",
    dob: "",
    specialization: "",
  });

  useEffect(() => {
    const getDoctor = async () => {
      Api.get("/doctor/" + id, {
        params: {
          docNo: doctor.docNo,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          gender: doctor.gender,
          location: doctor.location,
          mobile: doctor.mobile,
          emailId: doctor.emailId,
          dob: doctor.dob,
          specialization: doctor.specialization,
        },
      })
        .then(function (res) {
          setDoctor(res.data);
        })
        .catch((err) => console.log(err));
    };
    getDoctor();
  }, []);

  const handleUpdate = (e) => {
    alert(doctor.docNo);
    nProgress.start();
    const formData = new FormData();
    formData.append("docNo", doctor.docNo);
    formData.append("firstName", doctor.firstName);
    formData.append("lastName", doctor.lastName);
    formData.append("gender", doctor.gender);
    formData.append("location", doctor.location);
    formData.append("mobile", Number(doctor.mobile));
    formData.append("emailId", doctor.emailId);
    formData.append("dob", "2023-11-01");
    formData.append("specialization", doctor.specialization);

    Api.putForm("/doctor/" + doctor.id, formData)
      .then(function (res) {
        nProgress.done();
        toast.success("Doctor updated! UH Id: " + res.data.docNo, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/pages/viewdoctor/" + res.data.id);
      })
      .catch((err) => {
        nProgress.done(); // Stop the progress bar also on failure
        console.log(err);
      });
  };

  return (
    <div className="m-0 p-2 rounded border body-content">
      <div className="card">
        <div
          className="card-header text-dark d-flex justify-content-between p-2"
          style={{
            backgroundColor: "#D4E6F1",
          }}
        >
          <h5>Edit Doctor</h5>
          <div className="ml-auto">
            <Link
              to="/pages/doctors"
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
                  value={doctor.docNo}
                  onChange={(e) =>
                    setDoctor({ ...doctor, docNo: e.target.value })
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
                  value={doctor.firstName}
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
                  value={doctor.lastName}
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
                  value={doctor.gender}
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
                  value={doctor.location}
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
                  value={doctor.mobile}
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
                  value={doctor.emailId}
                  onChange={(e) =>
                    setDoctor({ ...doctor, emailId: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2">
                <label htmlFor="inputSpecialization" className="form-label">
                  Specialization
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputSpecialization"
                  autoComplete="off"
                  value={doctor.specialization}
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
            onClick={() => handleUpdate(doctor.id)}
          >
            <FaSave /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;
