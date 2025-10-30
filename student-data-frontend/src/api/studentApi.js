import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/studentData'; // Change port if needed

// Student APIs
export const getStudents = (page, limit) => {
    return axios.get(`${API_BASE}/getAllStudent?page=${page}&limit=${limit}`);
};

export const getStudentById = (id) => {
    return axios.get(`${API_BASE}/getStudentById/${id}`);
};

export const createStudent = async (studentData) => {
    return await axios.post(`${API_BASE}/createNewStudent`, studentData);
};

export const updateStudent = (id, studentData) => {
    return axios.put(`${API_BASE}/updateStudentData/${id}`, studentData);
};

export const deleteStudent = (id) => {
    return axios.delete(`${API_BASE}/deleteStudentData/${id}`);
};

// Add Marks
export const addMarks = (studentId, marksData) => {
  return axios.post(`${API_BASE}/addStudentMarks/${studentId}`, marksData);
};

// Get Marks
export const getMarks = (studentId) => {
  return axios.get(`${API_BASE}/getStudentMarks/${studentId}`);
};

