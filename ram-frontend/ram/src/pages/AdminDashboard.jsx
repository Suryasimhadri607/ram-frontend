// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Unauthorized! Please log in.');
      window.location.href = '/admin/login';
      return;
    }
    fetchStudents();
    fetchInterviews();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (err) {
      console.error('Failed to load students', err);
      if (err.response && err.response.status === 403) {
        localStorage.clear();
        window.location.href = '/admin/login';
      }
    }
  };

  const fetchInterviews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/interviews', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInterviews(response.data);
    } catch (err) {
      console.error('Failed to load interviews', err);
    }
  };

  const deleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await axios.delete(`http://localhost:8080/admin/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Student deleted successfully');
      fetchStudents(); // Refresh after delete
    } catch (err) {
      console.error('Error deleting student', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <h4 className="mt-4">Student List</h4>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.phoneNumber}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => alert('Update feature coming soon!')}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteStudent(student.studentId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-5">Interview Records</h4>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Student ID</th>
            <th>Company</th>
            <th>Interviewer</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Offer Letter</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview, index) => (
            <tr key={index}>
              <td>{interview.studentId}</td>
              <td>{interview.company}</td>
              <td>{interview.interviewer}</td>
              <td>{interview.interviewDate}</td>
              <td>{interview.interviewStartTime}</td>
              <td>{interview.interviewEndTime}</td>
              <td>{interview.interviewStatus}</td>
              <td>{interview.offerLetter}</td>
              <td>{interview.interviewComments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
