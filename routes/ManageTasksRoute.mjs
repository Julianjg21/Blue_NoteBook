import express from "express";
import {
  getTaskController,
  SaveTaskController,
  EditTaskController,
  deleteTaskController,
} from "../controllers/ManageTasksController.mjs";
const router = express.Router();
//Access the controller to save tasks
router.post("/addTasks", SaveTaskController);
//Access the controller to get the registered tasks
router.get("/getTasks", getTaskController);
//Access the controller to edit the specified task
router.put("/editTask/:id", EditTaskController);
//Access the controller to delete the specified task
router.delete("/deleteTask/:id", deleteTaskController);

export default router;
