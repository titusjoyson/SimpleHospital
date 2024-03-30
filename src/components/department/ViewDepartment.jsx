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
import DepartmentConfirmModal from "./DepartmentConfirmModal";

const ViewDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [department, setDepartment] = useState({
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
    const getDepartment = async () => {
      nProgress.start();
      Api.get("/department/" + id, {
        params: {
          uhId: department.uhId,
          firstName: department.firstName,
          lastName: department.lastName,
          gender: department.gender,
          location: department.location,
          mobile: department.mobile,
          emailId: department.emailId,
          dob: department.dob,
        },
      })
        .then(function (res) {
          nProgress.done();
          setDepartment(res.data);
        })
        .catch((err) => {
          nProgress.done();
          console.log(err);
        });
    };
    getDepartment();
  }, []);

  const requestDelete = (id) => {
    setIsModalOpen(true);
    setCurrentId(id);
  };

  const handleDelete = () => {
    nProgress.start();
    Api.delete("/department/" + currentId)
      .then(function (res) {
        toast.success("Department deleted!", {
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
        navigate("/pages/departments");
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
    navigate("/pages/editdepartment/" + id);
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
          <h5>Department Details</h5>
          <div className="ml-auto">
            <Link
              to="/pages/departments"
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
                <label className="d-block">{department.uhId}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>First Name</strong>
                </label>
                <label className="d-block">{department.firstName}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Last Name</strong>
                </label>
                <label className="d-block">{department.lastName}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Gender</strong>
                </label>
                <label className="d-block">{department.gender}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Location</strong>
                </label>
                <label className="d-block">{department.location}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Mobile</strong>
                </label>
                <label className="d-block">{department.mobile}</label>
              </div>
              <div className="col-md-6 col-lg-4 mb-3">
                <label className="d-block">
                  <strong>Email Id</strong>
                </label>
                <label className="d-block">{department.emailId}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end p-2">
          <button
            className="btn btn-danger btn-sm"
            style={{ marginRight: "8px" }}
            title="Delete"
            onClick={() => requestDelete(department.id)}
          >
            <FaTrash /> Delete
          </button>
          <button
            className="btn btn-primary btn-sm"
            title="Edit"
            onClick={() => handleEdit(department.id)}
          >
            <FaEdit /> Edit
          </button>
        </div>
        <DepartmentConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ViewDepartment;
