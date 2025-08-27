import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/copstone4-mvc3/public/api/v1",
  headers: { "Content-Type": "application/json" },
});

// ===================== Employee API =====================



export const createEmployee = (employee) => {
  return api.post("/employees", employee).then(res => res.data);
};


export const fetchEmployees = () => api.get("/employees").then(res => res.data);
export const fetchEmployee  = (id) => api.get(`/employees/${id}`).then(res => res.data);
// export const createEmployee = (data) => api.post("/employees", data).then(res => res.data);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data).then(res => res.data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`).then(res => res.data);

// ===================== Salary API =====================
export const fetchSalaries = () => api.get("/salaries").then(res => res.data);
export const fetchSalary   = (id) => api.get(`/salaries/${id}`).then(res => res.data);
export const createSalary  = (data) => api.post("/salaries", data).then(res => res.data);
export const updateSalary  = (id, data) => api.put(`/salaries/${id}`, data).then(res => res.data);
export const deleteSalary  = (id) => api.delete(`/salaries/${id}`).then(res => res.data);
export const calculateSalary = (data) => api.post("/salaries/calculate", data).then(res => res.data);

// ===================== Leave API =====================
export const fetchLeaves = () => api.get("/leaves").then(res => res.data);
export const fetchLeave  = (id) => api.get(`/leaves/${id}`).then(res => res.data);
export const createLeave = (data) => api.post("/leaves", data).then(res => res.data);
export const updateLeave = (id, data) => api.put(`/leaves/${id}`, data).then(res => res.data);
export const deleteLeave = (id) => api.delete(`/leaves/${id}`).then(res => res.data);

export default api;
