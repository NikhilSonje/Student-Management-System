import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createStudent } from '../api/studentApi';

const AddStudentForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email_id: '',
        mobile_no: '',
        city: '',
        dob: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createStudent(formData);
            
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message || 'Student added successfully!'
            });

           // Reset form
            setFormData({
                first_name: '',
                last_name: '',
                email_id: '',
                mobile_no: '',
                city: '',
                dob: ''
            });
        } catch (error) {
            console.error("Error while adding student:", error);

            // extract backend message
            const backendMessage = error.response?.data?.message;

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendMessage || 'Failed to add student. Please try again.'
            });
        }
    };

    return (
        <div className="card p-3 mb-3">
            <h4>Add Student</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-2">
                        <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-2">
                        <input
                            type="email"
                            name="email_id"
                            className="form-control"
                            placeholder="Email"
                            value={formData.email_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-2">
                        <input
                            type="text"
                            name="mobile_no"
                            className="form-control"
                            placeholder="Mobile No"
                            value={formData.mobile_no}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-2">
                        <input
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 mb-2">
                        <input
                            type="date"
                            name="dob"
                            className="form-control"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudentForm;
