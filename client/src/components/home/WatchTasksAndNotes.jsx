import React, { useState, useEffect, useContext } from "react"; // Import necessary hooks and context
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Tab from "react-bootstrap/Tab"; // Import Tab component from Bootstrap
import Tabs from "react-bootstrap/Tabs"; // Import Tabs component from Bootstrap
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button components from Bootstrap
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML
import { AppContextState } from "../../hooks/contexts/AppContextState.mjs"; // Import application context state
import WatchTasksModal from "../../common/modals/tasks/WatchTasksModal"; // Import modal for watching tasks
import CustomAlert from "../../common/Alerts/CustomAlert"; // Import custom alert component
import FetchDeleteNotes from "../../hooks/apis/notesFetch/FetchDeleteNotes.mjs";
import FetchGetTasks from "../../hooks/apis/tasksFetch/FetchGetTasks.mjs";
import FetchGetNotes from "../../hooks/apis/notesFetch/FetchGetNotes.mjs";
function WatchTasksAndNotes() {
  const { getNotes, refreshNotes } = FetchGetNotes(); //We use the hook to obtain the notes
  const { alert, deleteNote, handleCloseAlert } = FetchDeleteNotes(); //We use the hook to obtain the tasks
  const { tasksList, refreshTasks } = FetchGetTasks();
  // State to control the visibility of the note modal
  const [showNote, setShowNote] = useState(false);
  // States to hold note title, description, and ID for editing/deleting
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [id, setId] = useState();

  const navigate = useNavigate(); // Initialize navigate for route changes

  // State to hold tasks list and task data

  const [taskData, setTaskData] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false); // State to control task modal visibility

  // Function to show the task modal with the selected task data
  const handleShowTaskModal = (task) => {
    setTaskData(task);
    setShowTaskModal(true);
  };

  // Function to close the task modal
  const handleCloseShowTaskModal = () => setShowTaskModal(false);

  const { dispatch } = useContext(AppContextState); // Get dispatch function from context

  // Functions to manage note modal visibility
  const handleShowNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setId(note.id);
    setShowNote(true);
  };

  const handleShowNoteClose = () => setShowNote(false);

  // Fetch notes from the server when the component mounts
  useEffect(() => {
    refreshNotes();
    refreshTasks();
  }, [refreshTasks, refreshNotes]); // Dependency array to re-fetch notes when they change

  // Function to handle note editing
  const handleEditeNote = () => {
    navigate("/main/home/WatchNotes"); // Navigate to the watch notes page
    dispatch({
      type: "EDIT_NOTE_STATE",
      payload: {
        editState: false,
        editTitle: { title },
        editDescription: { description },
        id: { id },
        editNoteFromHome: true,
      },
    });
  };

  //delete note
  const handleDeleteNote = async () => {
    await deleteNote(id);
    handleShowNoteClose(); // Close note modal after deletion
  };

  return (
    <div className="container-fluid ">
      <div className="container ">
        <div className="row ">
          <div className="col-12">
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3  border border-0"
            >
              <Tab eventKey="home" title="Notes" className="">
                <CustomAlert
                  title={alert.title} //Pass the title
                  message={alert.message}
                  variant={alert.variant}
                  show={alert.show}
                  onClose={handleCloseAlert}
                />
                <h2>Notes</h2>
                <div className="row ">
                  <div className="col-12 ">
                    <div className="container">
                      <div className="row ">
                        {getNotes?.length > 0 ? (
                          getNotes.map((note, index) => (
                            <React.Fragment key={index}>
                              <div
                                className="col-4 col-sm-2 shadow pointer mt-2 boxx bg-light rounded bg-danger"
                                onClick={() => handleShowNote(note)}
                              >
                                <div className="row">
                                  <div className="col-12">
                                    <p className="text-center fw-semibold fs-6">
                                      {note.title}
                                    </p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <div
                                      className="note-description"
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                          note.description
                                        ),
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-1 border-0 align-content-center hide-colum">
                                <p className="text-center">Nota {index + 1} </p>
                              </div>
                            </React.Fragment>
                          ))
                        ) : (
                          <p>No hay notas disponibles.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab eventKey="profile" title="Tasks" className="">
                <WatchTasksModal
                  stateShowTaskModal={showTaskModal}
                  handleCloseShowTaskModal={handleCloseShowTaskModal}
                  taskData={taskData}
                />

                <div className="row mt-3 border-bottom border-2 ">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-2">
                        <p className=" fw-semibold">Estado</p>
                      </div>
                      <div className="col-3 col-sm-2">
                        <p className=" fw-semibold">Título</p>
                      </div>
                      <div className="col-1 col-sm-3 d-none d-sm-block">
                        <p className=" fw-semibold">Descripción</p>
                      </div>
                      <div className="col-3 col-sm-2">
                        <p className=" fw-semibold">Fecha creación</p>
                      </div>
                      <div className="col-2 col-sm-2 d-none d-sm-block">
                        <p className=" fw-semibold">Fecha Vencimiento</p>
                      </div>
                      <div className="col-2 col-sm-1 ">
                        <p className=" fw-semibold">Prioridad</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {tasksList?.length > 0 ? (
                    tasksList.map((task, index) => (
                      <React.Fragment key={index}>
                        <div className="col-12">
                          <div
                            className="row mt-3 border border-1 pointer shadow rounded-5 border-success bg-light"
                            onClick={() => handleShowTaskModal(task)}
                          >
                            <div className="col-12 ">
                              <div className="row  mt-3">
                                <div className="col-2 ">
                                  <div className="form-check ">
                                    <input
                                      className="form-check-input custom-checkbox border  border-dark rounded-circle"
                                      type="checkbox"
                                      value=""
                                      id={index}
                                      label="task status"
                                      title="task status"
                                    />
                                  </div>
                                </div>
                                <div className="col-3 col-sm-2 ">
                                  <p className=" text-truncate w-75">
                                    {task.title}
                                  </p>
                                </div>
                                <div className="col-1 col-sm-3 d-none d-sm-block">
                                  <p className=" text-truncate w-75">
                                    {task.description}
                                  </p>
                                </div>
                                <div className="col-4 col-sm-2">
                                  <p className="  text-truncate w-75">
                                    {task.created_at}
                                  </p>
                                </div>
                                <div className="col-2 col-sm-2 d-none d-sm-block">
                                  <p className=" ">{task.due_date}</p>
                                </div>
                                <div className="col-2 col-sm-1">
                                  <p className="fw-semibold text-danger">
                                    {task.status}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <p>No hay notas disponibles.</p>
                  )}
                </div>

                <>
                  <Modal show={showNote} onHide={handleShowNoteClose} centered>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-secondary">Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container mt-3">
                        <div className="row  ">
                          <div className="col-12">
                            <div className="row ">
                              <div className="col-12 text-center mb-3">
                                <p className=" fw-semibold  text-secondary">
                                  Titulo:
                                </p>
                              </div>
                              <div className="col-12   fw-semibold text-center">
                                {title}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-12">
                            <div className="row ">
                              <div className="col-12 align-content-center text-center mb-3">
                                <p className=" fw-semibold text-secondary">
                                  Descripción:
                                </p>
                              </div>
                              <div
                                className="col-12 border border-2"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(description),
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        title="delete"
                        variant="secondary"
                        className="bg-danger text-white"
                        onClick={handleDeleteNote}
                      >
                        Eliminar
                      </Button>
                      <Button
                        title="edit"
                        variant="primary"
                        className="bg-success text-white"
                        onClick={handleEditeNote}
                      >
                        Editar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchTasksAndNotes;
