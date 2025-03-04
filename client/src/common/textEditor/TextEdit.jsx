import React, { useState } from "react";
import ReactQuill from "react-quill"; //Import the Quill editor
import "react-quill/dist/quill.snow.css"; //Quill Styles
import Cookies from "js-cookie"; // Para manejar cookies
import CustomAlert from "../Alerts/CustomAlert"; // Componente de alerta personalizada
import FetchAddNotes from "../../hooks/apis/notesFetch/FetchAddNotes.mjs";
function TextEdit() {
  const { alert, addNote, handleCloseAlert } = FetchAddNotes(); // We use the hook
  //State to store the note title and description
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  //Function to send the data to the server
  const handleSendData = async (e) => {
    e.preventDefault(); //Prevent the page from reloading
    const { id } = JSON.parse(Cookies.get("userData")); //Get the user ID from cookies
    const data = { title, description, id }; //Create the object with the note data
    //Clear the form after the success of the function call
    setTitle("");
    setDescription("");
    await addNote(data);
  };

  return (
    <div className="text-editor  container-fluid bg-light ">
      {/* Custom alert component */}
      <CustomAlert
        title={alert.title} //Pass the alert title
        message={alert.message} //Pass the alert message
        variant={alert.variant} //Alert variants such as success or danger
        show={alert.show} //Show or not the alert
        onClose={handleCloseAlert} //Function to close the alert
      />
      <div className="row w-100  ">
        <div className="col-md-10 col-11">
          <label htmlFor="textEditTitle">Título:</label>
          <input
            id="textEditTitle"
            type="text"
            placeholder="Agrega un título a tu nota"
            className=" mx-1 mx-md-1   mx-lg-5 w-75 border-0 mt-2 mb-2 "
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            required
          />
        </div>
        <div className="col-1 col-md-2">
          {/*Button to save the note */}
          <button
            title="save note"
            className="btn btn-success float-end"
            onClick={handleSendData}
          >
            Guardar
          </button>
        </div>
      </div>

      <div className="container">
        {/*Quill text editor for note description */}
        <ReactQuill
          theme="snow" //Editor theme
          value={description} //Editor content value
          onChange={(content) => setDescription(content)} //Update the description in the state
          modules={TextEdit.modules} //Editor configuration modules
          formats={TextEdit.formats} //Formats allowed in the editor
          required
        />
      </div>
    </div>
  );
}

//Setting up modules for the Quill editor
TextEdit.modules = {
  toolbar: [
    [{ header: [1, 2, false] }], //Header size
    ["bold", "italic", "underline"], //Text styles
    [{ color: [] }], //Color picker
    [{ list: "ordered" }, { list: "bullet" }], //Ordered and unordered lists
    ["link"], //Options to add links (image removed)
  ],
};
//Formats allowed in the Quill editor
TextEdit.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "color",
  "list",
  "bullet",
  "link", //Removed image formatting
];

export default TextEdit;
