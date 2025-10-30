import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { 
  getStudents, 
  getStudentById,
  deleteStudent, 
  updateStudent, 
  addMarks, 
  getMarks 
} from '../api/studentApi';
// import { data } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Search
  const [searchId, setSearchId] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);

  // Update Modal
  const [editingStudent, setEditingStudent] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    first_name: '',
    last_name: '',
    email_id: '',
    mobile_no: '',
    city: '',
    dob: ''
  });

  // Add Marks Modal
  const [marksStudent, setMarksStudent] = useState(null);
  const [marksForm, setMarksForm] = useState({
    math: '',
    science: '',
    gk: '',
    marathi: '',
    english: '',
    hindi: ''
  });

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await getStudents(page, limit);
    
      setStudents(res.data.data);
      setTotalPages(res.data.totalPages);
      setSearchedStudent(null);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to fetch students', 'error');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  // Search Student by ID
  const handleSearch = async () => {
    if (!searchId) {
      fetchStudents();
      return;
    }

    try {
      const res = await getStudentById(searchId);
      const student = res.data.data;
      setSearchedStudent(student);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Student not found', 'error');
      setSearchedStudent(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Delete Student
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this student!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await deleteStudent(id);
        Swal.fire('Success', res.data.message || 'Student deleted successfully');
        fetchStudents();
      } catch (err) {
        Swal.fire('Error', err.response?.data?.message || 'Failed to delete student', 'error');
      }
    }
  };

  // Update Student
  const handleEdit = (student) => {
    setEditingStudent(student);
    setUpdateForm({
      first_name: student.first_name,
      last_name: student.last_name,
      email_id: student.email_id,
      mobile_no: student.mobile_no || '',
      city: student.city || '',
      dob: student.dob || ''
    });
  };

  const handleChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateStudent(editingStudent.id, updateForm);
      Swal.fire('Success', res.data.message || 'Student updated successfully');
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to update student', 'error');
    }
  };

  // Add Marks
  const handleAddMarks = (student) => {
    setMarksStudent(student);
    setMarksForm({
      math: '',
      science: '',
      gk: '',
      marathi: '',
      english: '',
      hindi: ''
    });
  };

  const handleMarksChange = (e) => {
    setMarksForm({ ...marksForm, [e.target.name]: e.target.value });
  };

  const handleMarksSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addMarks(marksStudent.id, marksForm);
      Swal.fire('Success', res.data.message || 'Marks added successfully');
      setMarksStudent(null);
      fetchStudents();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to add marks', 'error');
    }
  };

  // Show Marks
  const handleShowMarks = async (studentId) => {
    try {
      const res = await getMarks(studentId);
      const marks = res.data.data || res.data;
      const student = students.find(s => s.id === studentId) || searchedStudent;
      Swal.fire({
        title: `Marks for ${student.first_name} ${student.last_name}`,
        html: `
          Math: ${marks.math || '-'} <br/>
          Science: ${marks.science || '-'} <br/>
          GK: ${marks.gk || '-'} <br/>
          Marathi: ${marks.marathi || '-'} <br/>
          English: ${marks.english || '-'} <br/>
          Hindi: ${marks.hindi || '-'}
        `,
        icon: 'info'
      });
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to fetch marks', 'error');
    }
  };

  const displayedStudents = searchedStudent ? [searchedStudent] : students;

  return (
    <div className="card p-3 mb-3">
      {/* Header + Search */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Student List</h4>
        <div className="d-flex">
          <input
            type="number"
            className="form-control me-2"
            placeholder="Enter Student ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.first_name} {student.last_name}</td>
              <td>{student.email_id}</td>
              <td>{student.mobile_no}</td>
              <td>{student.city}</td>
              <td>{student.dob}</td>
              <td>
                <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(student)}>Update</button>
                <button className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(student.id)}>Delete</button>
                {!student.hasMarks && (
                  <button className="btn btn-sm btn-success me-1" onClick={() => handleAddMarks(student)}>Add Marks</button>
                )}
                {student.hasMarks && (
                  <button className="btn btn-sm btn-info" onClick={() => handleShowMarks(student.id)}>Show Marks</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {!searchedStudent && (
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-secondary me-2" disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>Previous</button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`btn me-1 ${page === idx + 1 ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button className="btn btn-secondary ms-2" disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)}>Next</button>
        </div>
      )}

      {/* Update Modal */}
      {editingStudent && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleUpdateSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Update Student</h5>
                  <button type="button" className="btn-close" onClick={() => setEditingStudent(null)}></button>
                </div>
                <div className="modal-body">
                  {['first_name','last_name','email_id','mobile_no','city','dob'].map(field => (
                    <div className="mb-2" key={field}>
                      <input
                        type={field === 'dob' ? 'date' : 'text'}
                        className="form-control"
                        name={field}
                        placeholder={field.replace('_',' ').toUpperCase()}
                        value={updateForm[field]}
                        onChange={handleChange}
                        required={['first_name','last_name','email_id'].includes(field)}
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingStudent(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Marks Modal */}
      {marksStudent && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleMarksSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Marks for {marksStudent.first_name} {marksStudent.last_name}</h5>
                  <button type="button" className="btn-close" onClick={() => setMarksStudent(null)}></button>
                </div>
                <div className="modal-body">
                  {['math','science','gk','marathi','english','hindi'].map(sub => (
                    <div className="mb-2" key={sub}>
                      <input
                        type="number"
                        className="form-control"
                        name={sub}
                        placeholder={sub.toUpperCase()}
                        value={marksForm[sub]}
                        onChange={handleMarksChange}
                        required
                        min={0}
                        max={100}
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setMarksStudent(null)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Save Marks</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentList;
