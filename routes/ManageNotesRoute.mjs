import express from "express";
import {
  GetNotesController,
  SaveNoteController,
  DeleteNoteController,
  UpdateNoteController,
} from "../controllers/ManageNotesController.mjs";

const router = express.Router();
//Access the controller to save the note
router.post("/saveNote", SaveNoteController);
//Access controller to get saved notes
router.get("/getNotes", GetNotesController);
//Access the controller to delete the specified note
router.delete("/deleteNote/:id", DeleteNoteController);
//Access the controller to update the specified note
router.put("/updateNote/:id", UpdateNoteController);

export default router;
