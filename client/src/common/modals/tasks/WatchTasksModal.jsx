import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import EditTaskModal from "./EditTaskModal";
import CustomAlert from "../../Alerts/CustomAlert";
import FetchDeleteTasks from "../../../hooks/apis/tasksFetch/FetchDeleteTasks.mjs";
function WatchTasksModal({
  stateShowTaskModal, //State to show or hide the task modal
  handleCloseShowTaskModal, //Function to close the task modal
  taskData, //Data of the selected task (title, description, etc.)
}) {
  const { alert, deleteTask, handleCloseAlert } = FetchDeleteTasks();

  //State to handle the visibility of the task editing modal
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  //Function to show the task editing modal and close the current modal
  const handleShowEditTaskModal = () => {
    handleCloseShowTaskModal(); //Close the current modal
    setShowEditTaskModal(true); //Show the editing modal
    handleCloseShowTaskModal(); //Function to close the task modal
  };

  //Function to delete the selected task
  const handleDeleteNote = async () => {
    await deleteTask(taskData.id);
    handleCloseShowTaskModal();
  };

  //Function to close the task editing modal
  const handleCloseEditTaskModal = () => setShowEditTaskModal(false);

  return (
    <div>
      {/*Custom alert component*/}
      <CustomAlert
        title={alert.title} //Alert title
        message={alert.message} //Alert message
        variant={alert.variant} //Alert type (success, danger, etc.)
        show={alert.show} // Estado para mostrar u ocultar la alerta
        onClose={handleCloseAlert} //Function to close the alert
      />
      <>
        {/* Modal to show the selected task*/}
        <Modal
          show={stateShowTaskModal} //State to control the visibility of the modal
          onHide={handleCloseShowTaskModal} //Function to close the modal
          centered //Center the modal on the screen
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-secondary">Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container mt-3">
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <p className="fw-semibold">Título</p>
                    </div>
                    <div className="col-8 col-md-9 border border-2">
                      <p className="text-break">{taskData.title}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <p className="fw-semibold">Descripción</p>
                    </div>
                    <div className="col-8 col-md-9 border border-2">
                      <p className="text-break">{taskData.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <p className="fw-semibold">Fecha Vencimiento</p>
                    </div>
                    <div className="col-8 col-md-9 border border-2">
                      <p>{taskData.due_date}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-5 mb-3">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <p className="fw-semibold">Prioridad</p>
                    </div>
                    <div className="col-8 col-md-9">
                      <p className="text-danger fw-semibold border border-2">
                        {taskData.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

          {/*Modal buttons (delete and edit task) */}
          <Modal.Footer>
            <Button
              title="delete"
              variant="btn btn-outline-danger"
              onClick={handleDeleteNote} //Delete task on click
            >
              Eliminar
            </Button>
            <Button
              title="edit"
              variant="btn btn-outline-primary"
              onClick={handleShowEditTaskModal} //Show task edit modal
            >
              Editar
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/*Modal to edit the selected task */}
      <EditTaskModal
        taskData={taskData} //Pass the task data to the edit modal
        stateEditTaskModal={showEditTaskModal} //Controls whether or not the edit modal is shown
        handleCloseEditTaskModal={handleCloseEditTaskModal} //Function to close the editing modal
      />
    </div>
  );
}

export default WatchTasksModal;
