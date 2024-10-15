import React, { useState, useEffect } from "react";
import { Modal, ModalHeader } from "react-bootstrap";
import CustomAlert from "../../Alerts/CustomAlert";
import FetchUpdateTasks from "../../../hooks/apis/tasksFetch/FetchUpdateTasks.mjs";

function EditTaskModal({
  taskData,
  stateEditTaskModal,
  handleCloseEditTaskModal,
}) {
  //States to handle task values
  const [id, setId] = useState(""); //Store the task id
  const [title, setTitle] = useState(""); //Store the task title
  const [description, setDescription] = useState(""); //Store the description of the task
  const [due_date, setDue_date] = useState(""); //Store the expiration date
  const [priority, setPriority] = useState(""); //Store the priority of the task
  const [selectedDateButton, setSelectedDateButton] = useState(); //Store the selected button for the date
  const [selectedPriorityButton, setSelectedPriorityButton] = useState(""); //Store the selected button for priority

  const { alert, updateTask, handleCloseAlert } = FetchUpdateTasks();

  //useEffect is executed every time the task data (taskData) changes
  useEffect(() => {
    if (taskData) {
      //Load the values ​​of the selected task into the corresponding states
      setId(taskData.id);
      setTitle(taskData.title);
      setDescription(taskData.description);
      setDue_date(taskData.due_date);
      setPriority(taskData.status);
      setSelectedPriorityButton(taskData.status);
    }
  }, [taskData]);

  //Handles button selection for date
  const handleButtonDate = (event, buttonId) => {
    event.preventDefault();
    setSelectedDateButton(buttonId);

    if (buttonId === "hoy") {
      const today = new Date().toISOString().split("T")[0]; //Format today's date
      setDue_date(today);
    } else if (buttonId === "mañana") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1); //Increment one day to the current date
      const formattedTomorrow = tomorrow.toISOString().split("T")[0];
      setDue_date(formattedTomorrow);
    }
  };

  //Handles button selection for priority
  const handleButtonPriority = (event, buttonId) => {
    event.preventDefault();
    setSelectedPriorityButton(buttonId);
    setPriority(buttonId); // Actualiza el valor de la prioridad
  };

  //Handles the change in the manually selected due date
  const handleEditDate = (event) => {
    setDue_date(event.target.value);
    setSelectedDateButton("inputDate");
  };

  //Handles editing and sending the task to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      due_date,
      priority, //Data to send
    };
    await updateTask(id, data);
    handleCloseEditTaskModal();
  };

  return (
    <Modal show={stateEditTaskModal} onHide={handleCloseEditTaskModal} centered>
      <ModalHeader closeButton>
        <Modal.Title className="fs-5 text-secondary">Edit Task</Modal.Title>
      </ModalHeader>
      <CustomAlert
        title={alert.title} //Pass the title
        message={alert.message}
        variant={alert.variant}
        show={alert.show}
        onClose={handleCloseAlert} //Handle alert closure
      />
      <Modal.Body>
        <div className="container mt-3">
          <form className="form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-4 col-md-3">
                    <label className="fw-semibold" htmlFor="titleEditModal">
                      Título
                    </label>
                  </div>
                  <div className="col-8 col-md-9">
                    <input
                      id="titleEditModal"
                      type="text"
                      className="w-100"
                      onChange={(event) => setTitle(event.target.value)}
                      value={title}
                      required
                      maxLength="40"
                      placeholder="title"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div className="row">
                  <div className="col-4 col-md-3">
                    <label className="fw-semibold" htmlFor="description">
                      Descripción
                    </label>
                  </div>
                  <div className="col-8 col-md-9">
                    <textarea
                      id="description"
                      className="w-100 p-3"
                      onChange={(event) => setDescription(event.target.value)}
                      value={description}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="row">
                  <div className="col-4 col-md-3">
                    <p className="fw-semibold">Fecha de Vencimiento</p>
                  </div>
                  <div className="col-2">
                    <button
                      title="today"
                      className={`mt-3 border-0 btn ${
                        selectedDateButton === "hoy"
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      onClick={(event) => handleButtonDate(event, "hoy")}
                    >
                      Hoy
                    </button>
                  </div>
                  <div className="col-4 col-md-3">
                    <button
                      title="tomorrow"
                      className={`mt-3 border-0 btn ${
                        selectedDateButton === "mañana"
                          ? "btn-primary"
                          : "btn-secondary"
                      }`}
                      onClick={(event) => handleButtonDate(event, "mañana")}
                    >
                      Mañana
                    </button>
                  </div>
                  <div className="col-1 col-md-4 p-0">
                    <input
                      label="select date"
                      type="date"
                      className="mt-3 w-75"
                      value={due_date}
                      onChange={handleEditDate}
                      required
                    />
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
                  <div className="col-2">
                    <button
                      title="low priority"
                      className={`border-0 btn ${
                        selectedPriorityButton === "Low"
                          ? "btn-success"
                          : "btn-secondary"
                      }`}
                      onClick={(event) => handleButtonPriority(event, "Low")}
                    >
                      Baja
                    </button>
                  </div>
                  <div className="col-3">
                    <button
                      title="medium priority"
                      className={`border-0 btn ${
                        selectedPriorityButton === "Medium"
                          ? "btn-warning"
                          : "btn-secondary"
                      }`}
                      onClick={(event) => handleButtonPriority(event, "Medium")}
                    >
                      Media
                    </button>
                  </div>
                  <div className="col-3 p-0">
                    <button
                      title="high priority"
                      className={`border-0 btn ${
                        selectedPriorityButton === "Hard"
                          ? "btn-danger"
                          : "btn-secondary"
                      }`}
                      onClick={(event) => handleButtonPriority(event, "Hard")}
                    >
                      Alta
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <button
                  title="save changes"
                  type="submit"
                  className="btn btn-outline-primary w-100"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditTaskModal;
