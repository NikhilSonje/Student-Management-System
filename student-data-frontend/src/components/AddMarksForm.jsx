import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { createMarks, getStudents } from '../api/studentApi';

const AddMarksForm = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        student_id: '',
        math: '',
        science: '',
        gk: '',
        marathi: '',
        english: '',
        hindi: ''
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await getStudents(1, 100);
                setStudents(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // negative marks not added
        if (e.target.type === 'number' && value < 0) return;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createMarks(formData);
            Swal.fire('Success', res.data?.message || 'Marks added successfully', 'success');
            setFormData({
                student_id: '',
                math: '',
                science: '',
                gk: '',
                marathi: '',
                english: '',
                hindi: ''
            });
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failed to add marks', 'error');
        }
    };

    return (
        <div className="card p-3 mb-3">
            <h4>Add Marks</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <select
                            className="form-control"
                            name="student_id"
                            value={formData.student_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Student</option>
                            {students.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.first_name} {s.last_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {['math', 'science', 'gk', 'marathi', 'english', 'hindi'].map((subject) => (
                        <div className="col-md-4 mb-2" key={subject}>
                            <input
                                type="number"
                                name={subject}
                                className="form-control"
                                placeholder={subject.toUpperCase()}
                                value={formData[subject] ?? ''}
                                onChange={handleChange}
                                min="0"
                                max="100"
                            />
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn btn-success mt-2">
                    Add Marks
                </button>
            </form>
        </div>
    );
};

export default AddMarksForm;
