// Import necessary dependencies and components
import React, { useState, useEffect, useContext, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextEdit from "../../../common/textEditor/TextEdit";
import { Button } from "react-bootstrap";
import { AppContextState } from "../../../hooks/contexts/AppContextState.mjs";
import CustomAlert from "../../../common/Alerts/CustomAlert";
import FetchGetNotes from "../../../hooks/apis/notesFetch/FetchGetNotes.mjs";
import FetchUpdateNotes from "../../../hooks/apis/notesFetch/FetchUpdateNotes.mjs";
function WatchNotes() {
  //If the count changes, the list of notes will be updated.
  const [updateNotes, setUpdateNotes] = useState(0);

  const { getNotes, refreshNotes } = FetchGetNotes(); // We use the hook
  const { alert, updateNote, handleCloseAlert } = FetchUpdateNotes(); // We use the hook

  // Access the global state and dispatch function
  const { state, dispatch } = useContext(AppContextState);

  // State for the current note being edited
  const [noteData, setNoteData] = useState({
    description: "",
    title: "",
    id: null,
  });

  // State to toggle between viewing all notes and editing a single note
  const [showSaveData, setShowSaveData] = useState(true);

  // Fetch notes from the server when the component mounts
  useEffect(() => {
    refreshNotes();
  }, [updateNotes]); // Dependency array to re-fetch notes when they change

  // Handle editing a note from the home page
  useEffect(() => {
    if (state.editNoteState.editNoteFromHome) {
      setNoteData({
        description: state.editNoteState.editDescription.description,
        title: state.editNoteState.editTitle.title,
        id: state.editNoteState.id.id,
      });
      setShowSaveData(state.editNoteState.editState);

      // Reset the edit state
      dispatch({
        type: "EDIT_NOTE_STATE",
        payload: { editNoteFromHome: false },
      });
    }
  }, [state.editNoteState, dispatch]);

  const updateList = () =>    setUpdateNotes(prev => prev + 1); //update the list of notes

  // Function to display a selected note for editing
  const handleShowNote = useCallback((note) => {
    setNoteData(note);
    setShowSaveData(false);
  }, []);

  const handleUpdateData = async (e) => {
    const data = noteData;
    e.preventDefault();
    await updateNote(noteData.id, data);
    updateList();// update de list of notes
  };

  return (
    <div className="container-fluid h-100 bg-light w-100">
      <div className="row  grey-color  bg-light">
        {/* Sidebar with note list */}
        <div className="col-12 col-md-2  watch-notes-sidebar p-4 p-md-2 border border-bottom-4 rounded ">
          <h1>Notes:</h1>
          <Button
            title="new note"
            className="w-100"
            onClick={() => setShowSaveData(true)}
          >
            Nueva Nota
          </Button>
          <div className="">
            {getNotes?.length > 0 ? (
              getNotes.map((note) => (
                <div key={note.id} className="list-group">
                  <button
                    title="show note"
                    type="button"
                    className="btn btn-outline-secondary btn-light mt-2 text-truncate"
                    onClick={() => handleShowNote(note)}
                    aria-current="true"
                  >
                    {note.title}
                  </button>
                </div>
              ))
            ) : (
              <p>No hay notas disponibles.</p>
            )}
          </div>
        </div>

        {/* Main content area */}

        <div className="col-12 col-md-10  bg-light h-100 p-4 p-md-4">
          {showSaveData ? (
            <TextEdit updateList={updateList} />
          ) : (
            <div className="text-editor ">
              {/*Customize alert according to the data sent by the server*/}
              <CustomAlert
                title={alert.title}
                message={alert.message}
                variant={alert.variant}
                show={alert.show}
                onClose={handleCloseAlert}
              />
              <div className="mb-1 ">
                <label className="" htmlFor="noteDataTitle">
                  Título:
                </label>
                <input
                  id="noteDataTitle"
                  type="text"
                  placeholder="Agrega un título a tu nota"
                  className="mx-5 w-75 border-0 mt-2 mb-2 "
                  value={noteData.title}
                  onChange={(e) =>
                    setNoteData({ ...noteData, title: e.target.value })
                  }
                />
                <button
                  title="Edit Note"
                  className="btn btn-warning"
                  onClick={handleUpdateData}
                >
                  Editar
                </button>
              </div>

              <ReactQuill
                theme="snow"
                value={noteData.description}
                onChange={(content) =>
                  setNoteData({ ...noteData, description: content })
                }
                modules={WatchNotes.modules}
                formats={WatchNotes.formats}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Configuration for ReactQuill editor
WatchNotes.modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

WatchNotes.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "color",
  "list",
  "bullet",
  "link",
];

export default WatchNotes;
