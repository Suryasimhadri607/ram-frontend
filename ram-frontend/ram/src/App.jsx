// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentRegister from "./pages/StudentRegister";
import AdminRegister from "./pages/AdminRegister";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ForgotEmail from "./pages/ForgotEmail";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/auth/register" element={<AdminRegister />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/auth/login" element={<AdminLogin />} />
        <Route path="/auth/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/forgot-email" element={<ForgotEmail />} />
        <Route path="/student/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
