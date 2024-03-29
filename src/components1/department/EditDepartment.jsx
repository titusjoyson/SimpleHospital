import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../home/Api";
import { FaBackward, FaList, FaSave } from "react-icons/fa";

const EditDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const genders = ["Male", "Female", "Others"];
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
          setDepartment(res.data);
        })
        .catch((err) => console.log(err));
    };
    getDepartment();
  }, []);

  const handleUpdate = (e) => {
    alert(department.uhId);
    nProgress.start();
    const formData = new FormData();
    formData.append("uhId", department.uhId);
    formData.append("firstName", department.firstName);
    formData.append("lastName", department.lastName);
    formData.append("gender", department.gender);
    formData.append("location", department.location);
    formData.append("mobile", Number(department.mobile));
    formData.append("emailId", department.emailId);
    formData.append("dob", "2023-11-01");

    Api.putForm("/department/" + department.id, formData)
      .then(function (res) {
        nProgress.done();
        toast.success("Department updated! UH Id: " + res.data.uhId, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/pages/viewdepartment/" + res.data.id);
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
          <h5>Edit Department</h5>
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
                  value={department.uhId}
                  onChange={(e) =>
                    setDepartment({ ...department, uhId: e.target.value })
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
                  value={department.firstName}
                  onChange={(e) =>
                    setDepartment({ ...department, firstName: e.target.value })
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
                  value={department.lastName}
                  onChange={(e) =>
                    setDepartment({ ...department, lastName: e.target.value })
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
                  value={department.gender}
                  onChange={(e) =>
                    setDepartment({ ...department, gender: e.target.value })
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
                  value={department.location}
                  onChange={(e) =>
                    setDepartment({ ...department, location: e.target.value })
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
                  value={department.mobile}
                  onChange={(e) =>
                    setDepartment({ ...department, mobile: e.target.value })
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
                  value={department.emailId}
                  onChange={(e) =>
                    setDepartment({ ...department, emailId: e.target.value })
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
            onClick={() => handleUpdate(department.id)}
          >
            <FaSave /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;
