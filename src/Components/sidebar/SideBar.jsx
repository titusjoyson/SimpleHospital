import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaBriefcase,
  FaBriefcaseMedical,
  FaCalendar,
  FaCartPlus,
  FaClinicMedical,
  FaHome,
  FaList,
  FaLock,
  FaMoneyBill,
  FaPlus,
  FaUser,
  FaUserAlt,
  FaUserFriends,
  FaUserInjured,
  FaUserMd,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import {
  MdBarChart,
  MdBugReport,
  MdLogout,
  MdMedicalInformation,
  MdMessage,
  MdOutlineReport,
  MdReport,
  MdReportProblem,
} from "react-icons/md";
import {
  BiAnalyse,
  BiCalendar,
  BiLogOut,
  BiLogOutCircle,
  BiPlusMedical,
  BiSearch,
} from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/patient",
    name: "Patient",
    icon: <FaUserInjured />,
    exact: true,
    subRoutes: [
      {
        path: "/pages/patients",
        name: "All Patients",
        icon: <FaList />,
      },
      {
        path: "/pages/addpatient",
        name: "Add Patient",
        icon: <FaPlus />,
      },
    ],
  },
  {
    path: "/department",
    name: "Department",
    icon: <FaBriefcaseMedical />,
    exact: true,
    subRoutes: [
      {
        path: "/pages/departments",
        name: "All Departments",
        icon: <FaList />,
      },
      {
        path: "/pages/adddepartment",
        name: "Add Department",
        icon: <FaPlus />,
      },
    ],
  },
  {
    path: "/doctor",
    name: "Doctor",
    icon: <FaUserMd />,
    exact: true,
    subRoutes: [
      {
        path: "/pages/doctors",
        name: "All Doctors",
        icon: <FaList />,
      },
      {
        path: "/pages/adddoctor",
        name: "Add Doctor",
        icon: <FaPlus />,
      },
    ],
  },
  {
    path: "/appointment",
    name: "Appointment",
    icon: <FaCalendar />,
    exact: true,
    subRoutes: [
      {
        path: "/pages/appointments",
        name: "All Appointments",
        icon: <FaList />,
      },
      {
        path: "/pages/adddoctor",
        name: "Add Appointment",
        icon: <FaPlus />,
      },
    ],
  },
  {
    path: "/treatments",
    name: "Treatments",
    icon: <MdMedicalInformation />,
  },
  {
    path: "/opbills",
    name: "OP Bills",
    icon: <FaMoneyBill />,
  },
  {
    path: "/reports",
    name: "Reports",
    icon: <MdBarChart />,
    exact: true,
    subRoutes: [
      {
        path: "/patientreport",
        name: "Patient Reports",
        icon: <FaUsers />,
      },
      {
        path: "/opbillreport",
        name: "OP Bill Reports",
        icon: <FaMoneyBill />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "50px",
            transition: {
              duration: 0.5,
              type: "spring",
              mass: 0.5,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.0 }}
                  className="top_section1"
                >
                  <img
                    src="/vhp-logo.png"
                    alt="vHospital +"
                    style={{
                      verticalAlign: "middle",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.0, delay: 0.0 }}
                    className="logo"
                  >
                    &nbsp;Hospital&nbsp;+
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    key={index}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
