import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../home/Api";
import {
  FaEdit,
  FaList,
  FaRemoveFormat,
  FaSave,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import nProgress from "nprogress";
import AppointmentConfirmModal from "./AppointmentConfirmModal";

const ViewAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [appointment, setAppointment] = useState({
    patientId: "",
    doctorId: "",
    patientRegNo: "",
    doctorRegNo: "",
    aptNo: "",
    aptDt: "",
    aptTime: "",
  });

  useEffect(() => {
    const getAppointment = async () => {
      nProgress.start();
      Api.get("/appointment/" + id, {
        params: {
          patientRegNo: appointment.patientRegNo,
          doctorRegNo: appointment.doctorRegNo,
          aptNo: appointment.aptNo,
          aptDt: appointment.aptDt,
          aptTime: appointment.aptTime,
        },
      })
        .then(function (res) {
          nProgress.done();
          setAppointment(res.data);
        })
        .catch((err) => {
          nProgress.done();
          console.log(err);
        });
    };
    getAppointment();
  }, []);

  const requestDelete = (id) => {
    setIsModalOpen(true);
    setCurrentId(id);
  };

  const handleDelete = () => {
    nProgress.start();
    Api.delete("/appointment/" + currentId)
      .then(function (res) {
        toast.success("Appointment deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        nProgress.done();
        navigate("/pages/appointments");
      })
      .catch((err) => {
        nProgress.done();
        console.log(err);
      })
      .finally(() => {
        nProgress.done();
        setIsModalOpen(false); // Close modal in any case
      });
  };

  const handleEdit = (id) => {
    navigate("/pages/editappointment/" + id);
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
          <h5>Appointment Details</h5>
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
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Appointment No</strong>
                </label>
                <label className="d-block">{appointment.aptNo}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Patient Reg No</strong>
                </label>
                <label className="d-block">{appointment.patientRegNo}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Doctor Reg No</strong>
                </label>
                <label className="d-block">{appointment.doctorRegNo}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Date</strong>
                </label>
                <label className="d-block">{appointment.aptDt}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Time</strong>
                </label>
                <label className="d-block">{appointment.aptTime}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end p-2">
          <button
            className="btn btn-danger btn-sm"
            style={{ marginRight: "8px" }}
            title="Delete"
            onClick={() => requestDelete(appointment.id)}
          >
            <FaTrash /> Delete
          </button>
          <button
            className="btn btn-primary btn-sm"
            title="Edit"
            onClick={() => handleEdit(appointment.id)}
          >
            <FaEdit /> Edit
          </button>
        </div>
        <AppointmentConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ViewAppointment;
