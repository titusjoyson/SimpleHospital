import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../home/Api";
import { toast } from "react-toastify";
import { FaList, FaSave } from "react-icons/fa";
import nProgress from "nprogress";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    deptCode: "",
    deptName: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    nProgress.start();
    const formData = new FormData();
    formData.append("deptCode", department.deptCode);
    formData.append("deptName", department.deptName);
    formData.append("description", department.description);

    Api.post("/department/create", formData)
      .then(function (res) {
        nProgress.done();
        toast.success(
          "Department created! Department Code: " + res.data.deptName,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        navigate("/pages/departments");
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
          <h5>New Department</h5>
          <div className="ml-auto">
            <Link
              to="/pages/departments"
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
                <label htmlFor="inputDeptCode" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputDeptCode"
                  placeholder=""
                  autoComplete="off"
                  onChange={(e) =>
                    setDepartment({ ...department, deptCode: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputDeptName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputDeptName"
                  placeholder=""
                  autoComplete="off"
                  onChange={(e) =>
                    setDepartment({ ...department, deptName: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6 col-lg-4 mb-2 form-group required">
                <label htmlFor="inputDescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-0"
                  id="inputDescription"
                  placeholder=""
                  autoComplete="off"
                  onChange={(e) =>
                    setDepartment({
                      ...department,
                      description: e.target.value,
                    })
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

export default AddDepartment;
