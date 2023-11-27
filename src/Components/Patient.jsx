import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "./Api";
import ReactPaginate from "react-paginate";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  let limit = 5;

  useEffect(() => {
    const getPatients = async () => {
      Api.get("/patient/list/0/" + limit, {
        params: {
          uhId: patient.uhId,
          firstName: patient.firstName,
          lastName: patient.lastName,
          location: patient.location,
          mobile: patient.mobile,
        },
      })
        .then(function (res) {
          const total = res.data.totalElements;
          setpageCount(Math.ceil(total / limit));
          setPatients(res.data.content);
          setCurrentPage(0);
        })
        .catch((err) => console.log(err));
    };
    getPatients();
  }, [limit]);

  const fetchPatients = async (currentPage) => {
    const result = Api.get("/patient/list/" + currentPage + "/" + limit, {
      params: {
        uhId: patient.uhId,
        firstName: patient.firstName,
        lastName: patient.lastName,
        location: patient.location,
        mobile: patient.mobile,
      },
    })
      .then(function (res) {
        const total = res.data.totalElements;
        setpageCount(Math.ceil(total / limit));
        return res.data.content;
      })
      .catch((err) => console.log(err));
    return result;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    setCurrentPage(data.selected);
    const patientsFromServer = await fetchPatients(currentPage);
    setPatients(patientsFromServer);
    setCurrentPage(currentPage);
    // scroll to the top
    window.scrollTo(0, 0);
  };

  const [patient, setPatient] = useState({
    uhId: "",
    firstName: "",
    lastName: "",
    location: "",
    mobile: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = Api.get("/patient/list/0/" + limit, {
      params: {
        uhId: patient.uhId,
        firstName: patient.firstName,
        lastName: patient.lastName,
        location: patient.location,
        mobile: patient.mobile,
      },
    })
      .then(function (res) {
        const total = res.data.totalElements;
        setpageCount(Math.ceil(total / limit));
        setPatients(res.data.content);
        setCurrentPage(0);
        return res.data.content;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="m-3 p-0 rounded border">
      <div className="bg-primary bg-gradient bg-opacity-100 d-flex justify-content-between p-2 border">
        <h4 className="text-light">Patients</h4>
        <Link
          to="/dashboard/add_patient"
          className="btn btn-md btn-outline-light float-right"
        >
          + Create
        </Link>
      </div>
      <div className="m-2 bg-light rounded">
        <form className="g-1" onSubmit={handleSearch}>
          <div className="container">
            <div className="row pt-3">
              <div className="col-6 form-group">
                <label htmlFor="inputUhId" className="form-label">
                  UH Id
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputUhId"
                  placeholder=""
                  onChange={(e) =>
                    setPatient({ ...patient, uhId: e.target.value })
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="inputFirstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputFirstName"
                  placeholder=""
                  onChange={(e) =>
                    setPatient({ ...patient, firstName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6 form-group">
                <label htmlFor="inputLastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputLastName"
                  placeholder=""
                  onChange={(e) =>
                    setPatient({ ...patient, lastName: e.target.value })
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="inputLocation" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputLocation"
                  placeholder=""
                  autoComplete="off"
                  onChange={(e) =>
                    setPatient({ ...patient, location: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6 form-group">
                <label htmlFor="inputMobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  id="inputMobile"
                  placeholder=""
                  autoComplete="off"
                  onChange={(e) =>
                    setPatient({ ...patient, mobile: e.target.value })
                  }
                />
              </div>
              <div className="col-6 form-group required">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="m-2 bg-light rounded">
        <table className="table table-sm table-hover table-striped table-light">
          <thead>
            <tr>
              <th>UH Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Mobile</th>
              <th>Email Id</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {patients?.map((e) => (
              <tr key={e.uhId}>
                <td className="ps-2">
                  <Link
                    to={`/dashboard/patient_view/` + e.id}
                    title="Edit"
                    className="link-primary me-2 text-decoration-none"
                  >
                    {e.uhId}
                  </Link>
                </td>
                <td>
                  {e.firstName} {e.lastName}
                </td>
                <td>{e.gender}</td>
                <td>{e.location}</td>
                <td>{e.mobile}</td>
                <td>{e.emailId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        name="idReactPaginate"
        previousLabel="< Previous"
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        containerClassName={"pagination justify-content-center"}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
    </div>
  );
};

export default Patient;
