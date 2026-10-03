import axios from "axios";

const API_URL = "http://localhost:8080/students";

class StudentServices {

  // GET ALL
  getStudents() {
    return axios.get(API_URL);
  }

  // GET BY ID
  getStudentById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  // ADD
  addStudent(student) {
    return axios.post(API_URL, student);
  }

  // UPDATE
  updateStudent(id, student) {
    return axios.put(`${API_URL}/${id}`, student);
  }

  // DELETE
  deleteStudent(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new StudentServices();