const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3080";
const API_ROUTES = {
  //LOGIN
  sendKeysLogin: `${API_BASE_URL}/auth/login`,
  sendKeysRegister: `${API_BASE_URL}/createUser/register`,
  verifyToken: `${API_BASE_URL}/auth/AuthMiddleware`,

  //RESET-PASSWORD

  resetPassword: `${API_BASE_URL}/resetPassword/request-reset`,
  verifyCode: `${API_BASE_URL}/resetPassword/Verify-code`,
  changePassword: `${API_BASE_URL}/resetPassword/change-password`,

  //Notes
  getNotes: `${API_BASE_URL}/manageNotes/getNotes`,
  deleteNotes: `${API_BASE_URL}/manageNotes/deleteNote`,
  updateNotes: `${API_BASE_URL}/manageNotes/updateNote`,
  addNotes: `${API_BASE_URL}/manageNotes/saveNote`,

  //Tasks
  getTasks: `${API_BASE_URL}/manageTasks/getTasks`,
  deleteTasks: `${API_BASE_URL}/manageTasks/deleteTask`,
  editTasks: `${API_BASE_URL}/manageTasks/editTask`,
  addTasks: `${API_BASE_URL}/manageTasks/addTasks`,
};

export default API_ROUTES;
