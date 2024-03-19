import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaClinicMedical,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaUserAlt,
  FaUserFriends,
  FaUserMd,
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
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
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
    path: "/pages/patients",
    name: "Patients",
    icon: <FaUsers />,
  },
  {
    path: "/appointments",
    name: "Appointments",
    icon: <BiCalendar />,
  },
  {
    path: "/doctors",
    name: "Doctors",
    icon: <FaUserMd />,
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
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  vHospital&nbsp;+
                </motion.h1>
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
