import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../home/Api";
import ReactPaginate from "react-paginate";
import { FaPlus, FaPlusCircle, FaSearch, FaSync } from "react-icons/fa";
import { MdOutlineRefresh, MdRefresh, MdSearch } from "react-icons/md";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  let limit = 10;

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
    <div
      className="m-0 p-2 rounded border vh-100"
      style={{ backgroundColor: "#E5E7E9" }}
    >
      <div class="card">
        <div
          className="card-header text-dark d-flex justify-content-between p-2"
          style={{
            backgroundColor: "#D4E6F1",
          }}
        >
          <h5>All Patients</h5>
          <div className="ml-auto">
            <button
              onClick={() => fetchPatients(currentPage)} // Assuming currentPage is maintained in the component's state or props
              className="btn btn-sm btn-warning float-right"
              style={{ marginRight: "8px" }}
            >
              <FaSync /> Refresh
            </button>
            <Link
              to="/pages/addpatient"
              className="btn btn-sm btn-primary float-right"
            >
              <FaPlus /> Add New
            </Link>
          </div>
        </div>
        <div class="card-body">
          <div className="m-0">
            <form className="g-0" onSubmit={handleSearch}>
              <div className="row">
                <div className="col-md-6 col-lg-4 mb-2">
                  <label htmlFor="inputUhId">UH Id</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-0"
                    id="inputUhId"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setPatient({ ...patient, uhId: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 col-lg-4 mb-2">
                  <label htmlFor="inputFirstName">First Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-0"
                    id="inputFirstName"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setPatient({ ...patient, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 col-lg-4 mb-2">
                  <label htmlFor="inputLastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-0"
                    id="inputLastName"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setPatient({ ...patient, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 col-lg-4 mb-2">
                  <label htmlFor="inputLocation">Location</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-0"
                    id="inputLocation"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setPatient({ ...patient, location: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 col-lg-4 mb-2">
                  <label htmlFor="inputMobile">Mobile</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-0"
                    id="inputMobile"
                    autoComplete="off"
                    pattern="[0-9]{10}"
                    onChange={(e) =>
                      setPatient({ ...patient, mobile: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 col-lg-4 mt-4 mb-2 required d-flex align-items-center"></div>
              </div>
            </form>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end p-2">
          <button type="submit" className="btn btn-primary btn-sm">
            <FaSearch /> Search
          </button>
        </div>
      </div>

      <div className="mt-3 bg-light rounded">
        <table
          className="table table-hover table-striped table-sm table-light rounded-3 overflow-hidden"
          style={{
            backgroundColor: "#CACFD2",
            borderColor: "#CACFD2", // Example border color
            borderWidth: "1px", // Example border width
            borderStyle: "solid", // Required to make the border visible
          }}
        >
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
          <tbody className="m-0 p-0">
            {patients?.map((e) => (
              <tr key={e.uhId}>
                <td className="py-2 p-2">
                  <Link
                    to={`/pages/viewpatient/` + e.id}
                    title={e.uhId}
                    className="link-primary me-2 text-decoration-none"
                  >
                    {e.uhId}
                  </Link>
                </td>
                <td className="py-2">
                  {e.firstName} {e.lastName}
                </td>
                <td className="py-2">{e.gender}</td>
                <td className="py-2">{e.location}</td>
                <td className="py-2">{e.mobile}</td>
                <td className="py-2">{e.emailId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageCount > 0 && (
        <ReactPaginate
          name="idReactPaginate"
          previousLabel="Previous"
          nextLabel="Next"
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
      )}
    </div>
  );
};

export default AllPatients;
