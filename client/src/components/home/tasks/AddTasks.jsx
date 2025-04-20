import React, { useState, useEffect } from "react";
import NewTaskModal from "../../../common/modals/tasks/NewTaskModal"; // Modal para agregar nuevas tareas
import FetchGetTasks from "../../../hooks/apis/tasksFetch/FetchGetTasks.mjs";
import WatchTasksModal from "../../../common/modals/tasks/WatchTasksModal"; // Modal para visualizar tareas

function AddTasks() {
  const { tasksList, refreshTasks } = FetchGetTasks();

  //State to store the data of the selected task
  const [taskData, setTaskData] = useState([]);

  //State to store the text written in the search engine
  const [searchQuery, setSearchQuery] = useState("");

    //If the count changes, the list of tasks and tasks will be updated.
  const [updateTasks, setUpdateTasks] = useState(0);

  //State that controls whether the create new task modal is visible
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  //State that controls whether the task view modal is visible
  const [showTaskModal, setShowTaskModal] = useState(false);

  //Function to activate the new task creation modal
  const handleShowNewTaskModal = () => setShowNewTaskModal(true);

  //Function to disable the new task creation modal
  const handleCloseNewTaskModal = () => {
    setUpdateTasks((prev) => prev + 1); //update the list of tasks
    setShowNewTaskModal(false);
}
  //Function to activate the task view modal with the data of a selected task
  const handleShowTaskModal = (task) => {
    setTaskData(task); //Save the data of the selected task
    setShowTaskModal(true); //Show the modal
  };
  //Function to disable the task view modal
  const handleCloseShowTaskModal = () => {
    setUpdateTasks((prev) => prev + 1);//update the list of tasks
    setShowTaskModal(false);
  }

  //useEffect to bring in the task list when the component is mounted or updated
  useEffect(() => {
    refreshTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTasks]); //UseEffect dependency: updates when tasksList changes

  //Filter the list of tasks based on the search performed
  const filteredTasks = tasksList.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid ">
      <div className="container overflow-auto"
                style={{ maxHeight: "100vh" }}>
        <div className="row  border-bottom border-2">
          <div className="col-12 mb-3">
            <div className="row mt-4">
              <div className="col-6">
                <h1 className="fs-4">Tasks</h1>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6 bg-light">
                    {/*Button to add a new task */}
                    <button
                      title="New Task"
                      className="float-end border-0 mt-1 text-primary fw-semibold  bg-light "
                      onClick={handleShowNewTaskModal}
                    >
                      + Nueva Tarea
                    </button>
                  </div>
                  <div className="col-6">
                    {/*Task search input */}
                    <form className="form-inline my-2 my-lg-0">
                      <input
                        label="search task"
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} //Update the search
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Modal para crear nueva tarea */}
        <NewTaskModal
          stateNewTaskModal={showNewTaskModal}
          handleNewTaskModalClose={handleCloseNewTaskModal}
        />

        {/*Modal para ver tarea seleccionada */}
        <WatchTasksModal
          stateShowTaskModal={showTaskModal}
          handleCloseShowTaskModal={handleCloseShowTaskModal}
          taskData={taskData}
        />

        {/*Rendering of the filtered task list */}
        <div className="row mt-3 border-bottom border-2">
          <div className="col-12">
            <div className="row">
              <div className="col-2">
                <p className="fw-semibold">Estado</p>
              </div>
              <div className="col-3 col-sm-2">
                <p className="fw-semibold">Título</p>
              </div>
              <div className="col-1 col-sm-3 d-none d-sm-block">
                <p className="fw-semibold">Descripción</p>
              </div>
              <div className="col-3 col-sm-2">
                <p className="fw-semibold">Fecha creación</p>
              </div>
              <div className="col-2 col-sm-2 d-none d-sm-block">
                <p className="fw-semibold">Fecha Vencimiento</p>
              </div>
              <div className="col-2 col-sm-1">
                <p className="fw-semibold">Prioridad</p>
              </div>
            </div>
          </div>
        </div>

        {/*Check for filtered tasks and render them */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <React.Fragment key={index}>
              <div
                className="row mt-3 border border-1 pointer shadow rounded-5 border-success bg-light"
                onClick={() => handleShowTaskModal(task)}
              >
                <div className="col-12">
                  <div className="row mt-3">
                    <div className="col-2">
                      <div className="form-check">
                        <input
                          label="task status"
                          className="form-check-input custom-checkbox border border-dark rounded-circle"
                          type="checkbox"
                          value=""
                          id={index}
                        />
                      </div>
                    </div>
                    <div className="col-3 col-sm-2">
                      <p className="text-truncate w-75">{task.title}</p>
                    </div>
                    <div className="col-1 col-sm-3 d-none d-sm-block">
                      <p className="text-truncate w-75">{task.description}</p>
                    </div>
                    <div className="col-4 col-sm-2">
                      <p className="text-truncate w-75">{task.created_at}</p>
                    </div>
                    <div className="col-2 col-sm-2 d-none d-sm-block">
                      <p>{task.due_date}</p>
                    </div>
                    <div className="col-2 col-sm-1">
                      <p className="fw-semibold text-danger">{task.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <p>No hay tareas disponibles.</p> //Message if there are no tasks
        )}
      </div>
    </div>
  );
}

export default AddTasks;
