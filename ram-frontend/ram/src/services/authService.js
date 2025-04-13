import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Your Spring Boot backend URL

export const registerStudent = (studentData) => axios.post(`${BASE_URL}/student/register`, studentData);
export const registerAdmin = (adminData) => axios.post(`${BASE_URL}/admin/register`, adminData);
export const loginStudent = (credentials) => axios.post(`${BASE_URL}/auth/student/login`, credentials);
export const loginAdmin = (credentials) => axios.post(`${BASE_URL}/auth/admin/login`, credentials);
