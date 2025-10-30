import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/studentList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Student Management System</h2>

        {/* Navigation */}
        <nav className="mb-4">
          <Link to="/" className="btn btn-primary me-2">Add New Student</Link>
          <Link to="/students" className="btn btn-secondary">View All Students</Link>
        </nav>

        <Routes>
          {/* Route for Add Student Form */}
          <Route path="/" element={<AddStudentForm />} />

          {/* Route for Student List */}
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
