import React from "react";
import MainNavbar from "../components/home/navbar/MainNavbar";
import MainFooter from "../components/home/footer/MainFooter";
import Sidebar from "../components/home/sidebar/Sidebar";
import MainView from "../components/home/main/MainView";

function HomePage() {
  return (
    <div className="container-fluid  p-0">
      <MainNavbar />
      {/* Main content area */}
      <div className="row bg-ligth p-1  shadow ">
        {/* Sidebar for navigation buttons */}
        <div className="col-md-1 col-12  p-0 bg-light  ">
          <Sidebar />
        </div>

        {/* Routes for main content */}
        <div className="col-md-11 col-12  main-view">
          <MainView />
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default HomePage;
