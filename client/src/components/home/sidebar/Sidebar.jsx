import React from "react";
import {
  faHouse,
  faFileCirclePlus,
  faBookBookmark,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar() {
  const navigate = useNavigate();
  // Function to navigate to different routes based on button clicks
  const handleButtonClick = (route) => {
    navigate(`/main/home/${route}`);
  };

  return (
    <div className="container-fluid h-100  p-md-0 ">
      <div className="d-flex flex-md-column flex-row justify-content-around  p-0 w-100 ">
        <button
          className="btn shadow rounded-2 m-1 bg-light  mt-2 d-flex align-items-center justify-content-center gap-2  w-100"
          title="Home"
          onClick={() => handleButtonClick("WatchTasksAndNotes")}
        >
          <FontAwesomeIcon color="#0d6efd" icon={faHouse} /> <span>Home</span>
        </button>

        <button
          className="btn shadow rounded-2 m-1  bg-light d-flex align-items-center justify-content-center gap-2 w-100"
          title="New notes"
          onClick={() => handleButtonClick("AddNotes")}
        >
          <FontAwesomeIcon color="green" icon={faFileCirclePlus} />
          <span>New Notes</span>
        </button>

        <button
          className="btn shadow rounded-2 m-1  bg-light m d-flex align-items-center justify-content-center gap-2 w-100"
          title="Watch Notes"
          onClick={() => handleButtonClick("WatchNotes")}
        >
          <FontAwesomeIcon color="grey" icon={faBookBookmark} />{" "}
          <span>Watch Notes</span>
        </button>
        <button
          className="btn shadow rounded-2 m-1 bg-light d-flex align-items-center justify-content-center gap-2 w-100"
          title="Add Tasks"
          onClick={() => handleButtonClick("AddTasks")}
        >
          <FontAwesomeIcon color="secondary" icon={faSquareCheck} />
          <span>Add Tasks</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
