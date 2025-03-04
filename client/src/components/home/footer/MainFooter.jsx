import React from "react";

function MainFooter() {
  return (
    <div>
      <footer className="bg-primary text-white">
        <div className="container py-2">
          <div className="text-center py-2">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Julian Jiménez.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainFooter;