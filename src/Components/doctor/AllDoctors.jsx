import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../home/Api";
import ReactPaginate from "react-paginate";
import { FaPlus, FaPlusCircle, FaSearch, FaSync } from "react-icons/fa";
import { MdOutlineRefresh, MdRefresh, MdSearch } from "react-icons/md";
import nProgress from "nprogress";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  let limit = 10;

  useEffect(() => {
    const getDoctors = async () => {
      Api.get("/doctor/list/0/" + limit, {
        params: {
          docNo: doctor.docNo,
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          location: doctor.location,
          mobile: doctor.mobile,
        },
      })
        .then(function (res) {
          const total = res.data.totalElements;
          setpageCount(Math.ceil(total / limit));
          setDoctors(res.data.content);
          setCurrentPage(0);
        })
        .catch((err) => console.log(err));
    };
    getDoctors();
  }, [limit]);

  const fetchDoctors = async (currentPage) => {
    nProgress.start();
    const result = Api.get("/doctor/list/" + currentPage + "/" + limit, {
      params: {
        docNo: doctor.docNo,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        location: doctor.location,
        mobile: doctor.mobile,
      },
    })
      .then(function (res) {
        nProgress.done();
        const total = res.data.totalElements;
        setpageCount(Math.ceil(total / limit));
        return res.data.content;
      })
      .catch((err) => {
        nProgress.done();
        console.log(err);
      });
    return result;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    setCurrentPage(data.selected);
    const doctorsFromServer = await fetchDoctors(currentPage);
    setDoctors(doctorsFromServer);
    setCurrentPage(currentPage);
    // scroll to the top
    window.scrollTo(0, 0);
  };

  const [doctor, setDoctor] = useState({
    docNo: "",
    firstName: "",
    lastName: "",
    location: "",
    mobile: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    nProgress.start();
    const result = Api.get("/doctor/list/0/" + limit, {
      params: {
        docNo: doctor.docNo,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        location: doctor.location,
        mobile: doctor.mobile,
      },
    })
      .then(function (res) {
        nProgress.done();
        const total = res.data.totalElements;
        setpageCount(Math.ceil(total / limit));
        setDoctors(res.data.content);
        setCurrentPage(0);
        return res.data.content;
      })
      .catch((err) => {
        nProgress.done();
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
          <h5>All Doctors</h5>
          <div className="ml-auto">
            <button
              onClick={() => fetchDoctors(currentPage)} // Assuming currentPage is maintained in the component's state or props
              className="btn btn-sm btn-warning float-right"
              style={{ marginRight: "8px" }}
            >
              <FaSync /> Refresh
            </button>
            <Link
              to="/pages/adddoctor"
              className="btn btn-sm btn-primary float-right"
            >
              <FaPlus /> Add New
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="m-0">
            <form className="g-0" onSubmit={handleSearch}>
              <div className="row">
                <div className="col-md-6 col-lg-4 mb-2">
                  <label htmlFor="inputDocNo">Doctor No</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-0"
                    id="inputDocNo"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setDoctor({ ...doctor, docNo: e.target.value })
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
                      setDoctor({ ...doctor, firstName: e.target.value })
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
                      setDoctor({ ...doctor, lastName: e.target.value })
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
                      setDoctor({ ...doctor, location: e.target.value })
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
                      setDoctor({ ...doctor, mobile: e.target.value })
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
              <th>Doctor No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Location</th>
              <th>Mobile</th>
              <th>Specialization</th>
            </tr>
          </thead>
          <tbody className="m-0 p-0">
            {doctors?.map((e) => (
              <tr key={e.docNo}>
                <td className="py-2 p-2">
                  <Link
                    to={`/pages/viewdoctor/` + e.id}
                    title={e.docNo}
                    className="link-primary me-2 text-decoration-none"
                  >
                    {e.docNo}
                  </Link>
                </td>
                <td className="py-2">
                  {e.firstName} {e.lastName}
                </td>
                <td className="py-2">{e.gender}</td>
                <td className="py-2">{e.location}</td>
                <td className="py-2">{e.mobile}</td>
                <td className="py-2">{e.specialization}</td>
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

export default AllDoctors;
