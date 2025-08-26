import axios from "axios";

// ⿡ إعداد الـAxios instance
const api = axios.create({
  // baseURL: "http://localhost/copstone4-mvc3/public", 
  baseURL: "http://localhost/copstone4-mvc3/public", 
});

// ===================== Employee 
export async function fetchEmployees() {
  const res = await api.get("/api/v1/employees");
  return res.data;
}

export async function fetchEmployee(id) {
  const res = await api.get(`/api/v1/employees/${id}`);
  return res.data;
}

export async function createEmployee(data) {
  const res = await api.post("/api/v1/employees", data);
  return res.data;
}

export async function updateEmployee(id, data) {
  const res = await api.put(`/api/v1/employees/${id}`, data);
  return res.data;
}

export async function deleteEmployee(id) {
  const res = await api.delete(`/api/v1/employees/${id}`);
  return res.data;
}

// ===================== Salary API
export async function fetchSalaries() {
  const res = await api.get("/api/v1/salaries");
  return res.data;
}

export async function fetchSalary(id) {
  const res = await api.get(`/api/v1/salaries/${id}`);
  return res.data;
}

export async function createSalary(data) {
  const res = await api.post("/api/v1/salaries", data);
  return res.data;
}

export async function updateSalary(id, data) {
  const res = await api.put(`/api/v1/salaries/${id}`, data);
  return res.data;
}

export async function deleteSalary(id) {
  const res = await api.delete(`/api/v1/salaries/${id}`);
  return res.data;
}

export async function calculateSalary(data) {
  const res = await api.post("/api/v1/salaries/calculate", data);
  return res.data;
}

// ===================== Leave API
export async function fetchLeaves() {
  const res = await api.get("/api/v1/leaves");
  return res.data;
}

export async function fetchLeave(id) {
  const res = await api.get(`/api/v1/leaves/${id}`);
  return res.data;
}

export async function createLeave(data) {
  const res = await api.post("/api/v1/leaves", data);
  return res.data;
}

export async function updateLeave(id, data) {
  const res = await api.put(`/api/v1/leaves/${id}`, data);
  return res.data;
}

export async function deleteLeave(id) {
  const res = await api.delete(`/api/v1/leaves/${id}`);
  return res.data;
}

export default api;
// ============================== 
// import axios from "axios";

// // إعداد Axios instance
// const api = axios.create({
//   baseURL: "http://localhost/copstone4-mvc3/public/api/v1",
//   headers: { "Content-Type": "application/json" },
// });

// // ===================== Employee API =====================
// export const fetchEmployees = () => api.get("/employees").then(res => res.data);
// export const fetchEmployee  = (id) => api.get(`/employees/${id}`).then(res => res.data);
// export const createEmployee = (data) => api.post("/employees", data).then(res => res.data);
// export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data).then(res => res.data);
// export const deleteEmployee = (id) => api.delete(`/employees/${id}`).then(res => res.data);

// // ===================== Salary API =====================
// export const fetchSalaries = () => api.get("/salaries").then(res => res.data);
// export const fetchSalary   = (id) => api.get(`/salaries/${id}`).then(res => res.data);
// export const createSalary  = (data) => api.post("/salaries", data).then(res => res.data);
// export const updateSalary  = (id, data) => api.put(`/salaries/${id}`, data).then(res => res.data);
// export const deleteSalary  = (id) => api.delete(`/salaries/${id}`).then(res => res.data);
// export const calculateSalary = (data) => api.post("/salaries/calculate", data).then(res => res.data);

// // ===================== Leave API =====================
// export const fetchLeaves = () => api.get("/leaves").then(res => res.data);
// export const fetchLeave  = (id) => api.get(`/leaves/${id}`).then(res => res.data);
// export const createLeave = (data) => api.post("/leaves", data).then(res => res.data);
// export const updateLeave = (id, data) => api.put(`/leaves/${id}`, data).then(res => res.data);
// export const deleteLeave = (id) => api.delete(`/leaves/${id}`).then(res => res.data);

// export default api;
