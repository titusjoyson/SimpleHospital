import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../home/Api";
import { toast } from "react-toastify";
import { FaList, FaSave } from "react-icons/fa";
import nProgress from "nprogress";

const AddAppointment = () => {
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [appointment, setAppointment] = useState({
    patientId: "",
    doctorId: "",
    aptNo: "",
    aptDt: getCurrentDate(),
    aptTime: getCurrentTime(),
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    nProgress.start();
    const formData = new FormData();
    formData.append("patientId", appointment.patientId);
    formData.append("doctorId", appointment.doctorId);
    formData.append("aptNo", appointment.aptNo);
    formData.append("aptDt", appointment.aptDt);
    formData.append("aptTime", appointment.aptTime);

    Api.post("/appointment/create", formData)
      .then(function (res) {
        nProgress.done();
        toast.success("Appointment created! Appointment No: " + res.data.aptNo, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/pages/appointments");
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
          <h5>New Appointment</h5>
          <div className="ml-auto">
            <Link
              to="/pages/appointments"
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
                <label htmlFor="inputPatientId" className="form-label">
                  Patient Id
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputPatientId"
                  placeholder=""
                  autoComplete="off"
                  onChange={(e) =>
                    setAppointment({
                      ...appointment,
                      patientId: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputDoctorId" className="form-label">
                  Doctor Id
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputDoctorId"
                  placeholder=""
                  autoComplete="off"
                  onChange={(e) =>
                    setAppointment({ ...appointment, doctorId: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputAptDt" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control form-control-sm rounded-0"
                  id="inputAptDt"
                  placeholder=""
                  autoComplete="off"
                  value={appointment.aptDt}
                  onChange={(e) =>
                    setAppointment({ ...appointment, aptDt: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputAptTime" className="form-label">
                  Time
                </label>
                <input
                  type="time"
                  className="form-control form-control-sm rounded-0"
                  id="inputAptTime"
                  autoComplete="off"
                  value={appointment.aptTime}
                  onChange={(e) =>
                    setAppointment({ ...appointment, aptTime: e.target.value })
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

export default AddAppointment;
