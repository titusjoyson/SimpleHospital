import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../home/Api";
import { FaBackward, FaList, FaSave } from "react-icons/fa";

const EditAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const genders = ["Male", "Female", "Others"];
  const [appointment, setAppointment] = useState({
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
    const getAppointment = async () => {
      Api.get("/appointment/" + id, {
        params: {
          uhId: appointment.uhId,
          firstName: appointment.firstName,
          lastName: appointment.lastName,
          gender: appointment.gender,
          location: appointment.location,
          mobile: appointment.mobile,
          emailId: appointment.emailId,
          dob: appointment.dob,
        },
      })
        .then(function (res) {
          setAppointment(res.data);
        })
        .catch((err) => console.log(err));
    };
    getAppointment();
  }, []);

  const handleUpdate = (e) => {
    alert(appointment.uhId);
    nProgress.start();
    const formData = new FormData();
    formData.append("uhId", appointment.uhId);
    formData.append("firstName", appointment.firstName);
    formData.append("lastName", appointment.lastName);
    formData.append("gender", appointment.gender);
    formData.append("location", appointment.location);
    formData.append("mobile", Number(appointment.mobile));
    formData.append("emailId", appointment.emailId);
    formData.append("dob", "2023-11-01");

    Api.putForm("/appointment/" + appointment.id, formData)
      .then(function (res) {
        nProgress.done();
        toast.success("Appointment updated! UH Id: " + res.data.uhId, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/pages/viewappointment/" + res.data.id);
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
          <h5>Edit Appointment</h5>
          <div className="ml-auto">
            <Link
              to="/pages/appointments"
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
                  value={appointment.uhId}
                  onChange={(e) =>
                    setAppointment({ ...appointment, uhId: e.target.value })
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
                  value={appointment.firstName}
                  onChange={(e) =>
                    setAppointment({
                      ...appointment,
                      firstName: e.target.value,
                    })
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
                  value={appointment.lastName}
                  onChange={(e) =>
                    setAppointment({ ...appointment, lastName: e.target.value })
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
                  value={appointment.gender}
                  onChange={(e) =>
                    setAppointment({ ...appointment, gender: e.target.value })
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
                  value={appointment.location}
                  onChange={(e) =>
                    setAppointment({ ...appointment, location: e.target.value })
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
                  value={appointment.mobile}
                  onChange={(e) =>
                    setAppointment({ ...appointment, mobile: e.target.value })
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
                  value={appointment.emailId}
                  onChange={(e) =>
                    setAppointment({ ...appointment, emailId: e.target.value })
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
            onClick={() => handleUpdate(appointment.id)}
          >
            <FaSave /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAppointment;
