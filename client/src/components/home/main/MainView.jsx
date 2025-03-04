import React from "react";
import { Routes, Route } from "react-router-dom";
// Importing components for routing
import WatchTasksAndNotes from "../../../components/home/WatchTasksAndNotes";
import AddNotes from "../../../components/home/notes/AddNotes";
import WatchNotes from "../../../components/home/notes/WatchNotes";
import AddTasks from "../../../components/home/tasks/AddTasks";

function MainView() {
  //Main view of the home page
  return (
    <div className="h-100 bg-light ">
      <Routes>
        <Route index element={<WatchTasksAndNotes />} />
        <Route path="AddNotes" element={<AddNotes />} />
        <Route path="WatchNotes" element={<WatchNotes />} />
        <Route path="AddTasks" element={<AddTasks />} />
        <Route path="WatchTasksAndNotes" element={<WatchTasksAndNotes />} />
      </Routes>
    </div>
  );
}

export default MainView;
