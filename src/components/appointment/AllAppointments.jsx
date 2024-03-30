import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../home/Api";
import ReactPaginate from "react-paginate";
import { FaPlus, FaPlusCircle, FaSearch, FaSync } from "react-icons/fa";
import { MdOutlineRefresh, MdRefresh, MdSearch } from "react-icons/md";
import nProgress from "nprogress";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  let limit = 10;

  useEffect(() => {
    const getAppointments = async () => {
      Api.get("/appointment/list/0/" + limit, {
        params: {
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          patientRegNo: appointment.patientRegNo,
          doctorRegNo: appointment.doctorRegNo,
          aptNo: appointment.aptNo,
          aptDt: appointment.aptDt,
          aptTime: appointment.aptTime,
        },
      })
        .then(function (res) {
          const total = res.data.totalElements;
          setpageCount(Math.ceil(total / limit));
          setAppointments(res.data.content);
          setCurrentPage(0);
        })
        .catch((err) => console.log(err));
    };
    getAppointments();
  }, [limit]);

  const fetchAppointments = async (currentPage) => {
    nProgress.start();
    const result = Api.get("/appointment/list/" + currentPage + "/" + limit, {
      params: {
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        patientRegNo: appointment.patientRegNo,
        doctorRegNo: appointment.doctorRegNo,
        aptNo: appointment.aptNo,
        aptDt: appointment.aptDt,
        aptTime: appointment.aptTime,
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
    const appointmentsFromServer = await fetchAppointments(currentPage);
    setAppointments(appointmentsFromServer);
    setCurrentPage(currentPage);
    // scroll to the top
    window.scrollTo(0, 0);
  };

  const [appointment, setAppointment] = useState({
    patientId: "",
    doctorId: "",
    patientRegNo: "",
    doctorRegNo: "",
    aptNo: "",
    aptDt: "",
    aptTime: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    nProgress.start();
    const result = Api.get("/appointment/list/0/" + limit, {
      params: {
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        patientRegNo: appointment.patientRegNo,
        doctorRegNo: appointment.doctorRegNo,
        aptNo: appointment.aptNo,
        aptDt: appointment.aptDt,
        aptTime: appointment.aptTime,
      },
    })
      .then(function (res) {
        nProgress.done();
        const total = res.data.totalElements;
        setpageCount(Math.ceil(total / limit));
        setAppointments(res.data.content);
        setCurrentPage(0);
        return res.data.content;
      })
      .catch((err) => {
        nProgress.done();
        console.log(err);
      });
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
          <h5>All Appointments</h5>
          <div className="ml-auto">
            <button
              onClick={() => fetchAppointments(currentPage)} // Assuming currentPage is maintained in the component's state or props
              className="btn btn-sm btn-warning float-right"
              style={{ marginRight: "8px" }}
            >
              <FaSync /> Refresh
            </button>
            <Link
              to="/pages/addappointment"
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
                  <label htmlFor="inputAptNo">Appointment No</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-0"
                    id="inputAptNo"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setAppointment({ ...appointment, aptNo: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6 col-lg-4 mb-2">
                  <label htmlFor="inputUhId">UH Id</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-0"
                    id="inputUhId"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        patientRegNo: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6 col-lg-4 mb-2">
                  <label htmlFor="inputDoctorId">Doctor Id</label>
                  <input
                    type="text"
                    className="form-control form-control-sm rounded-0"
                    id="inputDoctorId"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        doctorRegNo: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-6 col-lg-4 mb-2">
                  <label htmlFor="inputAptDt">Appointment Date</label>
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
              <th>Appointment No</th>
              <th>UH Id</th>
              <th>Doctor Id</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody className="m-0 p-0">
            {appointments?.map((e) => (
              <tr key={e.aptNo}>
                <td className="py-2 p-2">
                  <Link
                    to={`/pages/viewappointment/` + e.id}
                    title={e.aptNo}
                    className="link-primary me-2 text-decoration-none"
                  >
                    {e.aptNo}
                  </Link>
                </td>
                <td className="py-2">
                  {e.patientRegNo}
                </td>
                <td className="py-2">{e.doctorRegNo}</td>
                <td className="py-2">{e.aptDt}</td>
                <td className="py-2">{e.aptTime}</td>
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

export default AllAppointments;
