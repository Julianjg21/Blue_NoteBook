import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import notebook_removebg from "../../../assets/notebook_removebg.png";
import Cookies from "js-cookie";

function MainNavbar() {
  // Retrieving user data from cookies
  const userDataCookie = Cookies.get("userData");
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;

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
    </div>
  );
}

export default MainNavbar;
