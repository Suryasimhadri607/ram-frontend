// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentDashboard() {
  const token = localStorage.getItem('token');
  const [student, setStudent] = useState(null);
  const [interview, setInterview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchStudentDetails();
    fetchInterviewDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const res = await axios.get('http://localhost:8080/student/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudent(res.data);
      setForm(res.data); // Set default form values
    } catch (err) {
      console.error('Error fetching student data', err);
    }
  };

  const fetchInterviewDetails = async () => {
    try {
      const res = await axios.get('http://localhost:8080/student/interview', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInterview(res.data);
    } catch (err) {
      console.error('Error fetching interview data', err);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`http://localhost:8080/student/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Your profile has been deleted');
      localStorage.clear();
      window.location.href = '/student/login';
    } catch (err) {
      console.error('Error deleting profile', err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/student/update`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
      setEditMode(false);
      fetchStudentDetails();
    } catch (err) {
      console.error('Error updating profile', err);
    }
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Student Dashboard</h2>

      {!editMode ? (
        <div>
          <h4 className="mt-4">Profile</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Student ID</th>
                <td>{student.studentId}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{student.firstName} {student.lastName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{student.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{student.phoneNumber}</td>
              </tr>
              <tr>
                <th>Course</th>
                <td>{student.course}</td>
              </tr>
              <tr>
                <th>Photo</th>
                <td>
                  {student.photo && (
                    <img src={student.photo} alt="Student" width="100" />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-warning me-2" onClick={() => setEditMode(true)}>
            Update Profile
          </button>
          <button className="btn btn-danger" onClick={handleDeleteProfile}>
            Delete Profile
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <h4>Update Profile</h4>
          <form onSubmit={handleUpdateSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>First Name</label>
                <input
                  className="form-control"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Last Name</label>
                <input
                  className="form-control"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input
                  className="form-control"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Course</label>
                <input
                  className="form-control"
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Photo (URL or Base64)</label>
                <input
                  className="form-control"
                  value={form.photo}
                  onChange={(e) => setForm({ ...form, photo: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success me-2">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        </div>
      )}

      {interview && (
        <div className="mt-5">
          <h4>Interview Details</h4>
          <table className="table table-bordered">
            <tbody>
              <tr><th>Company</th><td>{interview.company}</td></tr>
              <tr><th>Interviewer</th><td>{interview.interviewer}</td></tr>
              <tr><th>Date</th><td>{interview.interviewDate}</td></tr>
              <tr><th>Start Time</th><td>{interview.interviewStartTime}</td></tr>
              <tr><th>End Time</th><td>{interview.interviewEndTime}</td></tr>
              <tr><th>Status</th><td>{interview.interviewStatus}</td></tr>
              <tr><th>Offer Letter</th><td>{interview.offerLetter}</td></tr>
              <tr><th>Comments</th><td>{interview.interviewComments}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
