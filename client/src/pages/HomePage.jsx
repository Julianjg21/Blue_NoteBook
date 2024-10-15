import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFileCirclePlus,
  faBookBookmark,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

// Importing components for routing
import WatchTasksAndNotes from "../components/home/WatchTasksAndNotes";
import AddNotes from "../components/home/notes/AddNotes";
import WatchNotes from "../components/home/notes/WatchNotes";
import AddTasks from "../components/home/tasks/AddTasks";

import notebook_removebg from "../Images/notebook_removebg.png";

function HomePage() {
  // Retrieving user data from cookies
  const userDataCookie = Cookies.get("userData");
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
  const navigate = useNavigate();

  //Function to handle user logout
  const handleLogOut = () => {
    Cookies.remove("authToken", {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
    Cookies.remove("userData", { path: "/", secure: true, sameSite: "strict" });
    window.location.reload(); // Reload the page after logout
  };

  // Function to navigate to different routes based on button clicks
  const handleButtonClick = (route) => {
    navigate(`/main/home/${route}`);
  };

  return (
    <div className="container-fluid h-100 p-0">
      <Navbar expand="md" className="blue-custom-color ">
        <Container fluid>
          <Navbar.Brand
            href="#home"
            className="fw-bolder text-light d-flex align-items-center "
          >
            <img
              src={notebook_removebg}
              alt="notebook-removebg"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />
            Blue NoteBook
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Navbar.Text className="text-warning fw-semibold me-3">
                <p>{userData?.name || "user"}</p> {/* Displaying user name */}
              </Navbar.Text>
              <Nav.Link
                href="#login"
                className="text-light"
                onClick={handleLogOut}
              >
                Cerrar Sesión {/* Logout button */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content area */}
      <div className="row bg-white p-1 shadow">
        {/* Sidebar for navigation buttons */}
        <div className="col-md-1 border border-grey col-12 rounded-2 mb-3 mb-md-0 h-columns">
          <div className="d-flex flex-md-column flex-row justify-content-around py-2 mt-md-5 mt-0">
            <button
              className="btn btn-secondary rounded-2 m-1 shadow"
              title="Home"
              onClick={() => handleButtonClick("WatchTasksAndNotes")}
            >
              <FontAwesomeIcon icon={faHouse} />
            </button>
            <button
              className="btn btn-success rounded-2 m-1 shadow"
              title="New notes"
              onClick={() => handleButtonClick("AddNotes")}
            >
              <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
            <button
              className="btn btn-secondary rounded-2 m-1 shadow"
              title="Watch Notes"
              onClick={() => handleButtonClick("WatchNotes")}
            >
              <FontAwesomeIcon icon={faBookBookmark} />
            </button>
            <button
              className="btn btn-secondary rounded-2 m-1 shadow"
              title="Add Tasks"
              onClick={() => handleButtonClick("AddTasks")}
            >
              <FontAwesomeIcon icon={faSquareCheck} />
            </button>
          </div>
        </div>

        {/* Routes for main content */}
        <div className="col-md-11 col-12 border border-2 rounded-2 grey-color p-0">
          <Routes>
            <Route index element={<WatchTasksAndNotes />} />
            <Route path="AddNotes" element={<AddNotes />} />
            <Route path="WatchNotes" element={<WatchNotes />} />
            <Route path="AddTasks" element={<AddTasks />} />
            <Route path="WatchTasksAndNotes" element={<WatchTasksAndNotes />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
