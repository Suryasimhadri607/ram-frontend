// src/pages/StudentRegister.jsx
import React, { useState } from 'react';
import axios from 'axios';

function StudentRegister() {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    email: '',
    phone: '',
    course: '',
    password: '',
    photo: null, // This will hold the uploaded file
  });

  const [preview, setPreview] = useState(null); // For previewing the uploaded image
  const [message, setMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setStudent({ ...student, photo: file });

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append all fields
      for (const key in student) {
        formData.append(key, student[key]);
      }

      // Send to backend
      const response = await axios.post(
        'http://localhost:8080/student/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage('Registration Successful!');
      setStudent({
        firstName: '',
        lastName: '',
        studentId: '',
        email: '',
        phone: '',
        course: '',
        password: '',
        photo: null,
      });
      setPreview(null);
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration Failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student Registration</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={student.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Student ID</label>
            <input
              type="text"
              className="form-control"
              name="studentId"
              value={student.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Course</label>
            <select
              className="form-select"
              name="course"
              value={student.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option value="JAVA">JAVA</option>
              <option value="PYTHON">PYTHON</option>
              <option value="FRONT_END">FRONT_END</option>
              <option value="BACK_END">BACK_END</option>
              <option value="FULLSTACK">FULLSTACK</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={student.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Upload Photo</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          {preview && (
            <div className="col-12 mb-3">
              <label>Image Preview:</label>
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail"
                width="200"
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Register Student
        </button>
      </form>
    </div>
  );
}

export default StudentRegister;
