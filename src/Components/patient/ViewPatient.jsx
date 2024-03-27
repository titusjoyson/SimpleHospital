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
import ConfirmationModal from "./ConfirmationModal";
import { toast } from "react-toastify";
import nProgress from "nprogress";

const ViewPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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
      nProgress.start();
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
          nProgress.done();
          setPatient(res.data);
        })
        .catch((err) => {
          nProgress.done();
          console.log(err);
        });
    };
    getPatient();
  }, []);

  const requestDelete = (id) => {
    setIsModalOpen(true);
    setCurrentId(id);
  };

  const handleDelete = () => {
    nProgress.start();
    Api.delete("/patient/" + currentId)
      .then(function (res) {
        toast.success("Patient deleted!", {
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
        navigate("/pages/patients");
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
    navigate("/pages/editpatient/" + id);
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
          <h5>Patient Details</h5>
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
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>UH Id</strong>
                </label>
                <label className="d-block">{patient.uhId}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>First Name</strong>
                </label>
                <label className="d-block">{patient.firstName}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Last Name</strong>
                </label>
                <label className="d-block">{patient.lastName}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Gender</strong>
                </label>
                <label className="d-block">{patient.gender}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Location</strong>
                </label>
                <label className="d-block">{patient.location}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Mobile</strong>
                </label>
                <label className="d-block">{patient.mobile}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Email Id</strong>
                </label>
                <label className="d-block">{patient.emailId}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end p-2">
          <button
            className="btn btn-danger btn-sm"
            style={{ marginRight: "8px" }}
            title="Delete"
            onClick={() => requestDelete(patient.id)}
          >
            <FaTrash /> Delete
          </button>
          <button
            className="btn btn-primary btn-sm"
            title="Edit"
            onClick={() => handleEdit(patient.id)}
          >
            <FaEdit /> Edit
          </button>
        </div>
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ViewPatient;
