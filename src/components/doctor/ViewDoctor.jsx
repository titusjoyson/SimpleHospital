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
import DoctorConfirmModal from "./DoctorConfirmModal";

const ViewDoctor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [doctor, setDoctor] = useState({
    docNo: "",
    firstName: "",
    lastName: "",
    gender: "",
    localtion: "",
    mobile: "",
    emailId: "",
    dob: "",
  });

  useEffect(() => {
    const getDoctor = async () => {
      nProgress.start();
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
        },
      })
        .then(function (res) {
          nProgress.done();
          setDoctor(res.data);
        })
        .catch((err) => {
          nProgress.done();
          console.log(err);
        });
    };
    getDoctor();
  }, []);

  const requestDelete = (id) => {
    setIsModalOpen(true);
    setCurrentId(id);
  };

  const handleDelete = () => {
    nProgress.start();
    Api.delete("/doctor/" + currentId)
      .then(function (res) {
        toast.success("Doctor deleted!", {
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
        navigate("/pages/doctors");
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
    navigate("/pages/editdoctor/" + id);
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
          <h5>Doctor Details</h5>
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
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Dcotor No</strong>
                </label>
                <label className="d-block">{doctor.docNo}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>First Name</strong>
                </label>
                <label className="d-block">{doctor.firstName}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Last Name</strong>
                </label>
                <label className="d-block">{doctor.lastName}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Gender</strong>
                </label>
                <label className="d-block">{doctor.gender}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Location</strong>
                </label>
                <label className="d-block">{doctor.location}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Mobile</strong>
                </label>
                <label className="d-block">{doctor.mobile}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Email Id</strong>
                </label>
                <label className="d-block">{doctor.emailId}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Specialization</strong>
                </label>
                <label className="d-block">{doctor.specialization}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end p-2">
          <button
            className="btn btn-danger btn-sm"
            style={{ marginRight: "8px" }}
            title="Delete"
            onClick={() => requestDelete(doctor.id)}
          >
            <FaTrash /> Delete
          </button>
          <button
            className="btn btn-primary btn-sm"
            title="Edit"
            onClick={() => handleEdit(doctor.id)}
          >
            <FaEdit /> Edit
          </button>
        </div>
        <DoctorConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ViewDoctor;
