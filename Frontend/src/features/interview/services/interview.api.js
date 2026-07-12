import axios from "axios";

// 1. Custom axios instance with baseURL and credentials enabled
const api = axios.create({
  baseURL: "https://interviewgene-ai-backend.onrender.com/api",
  withCredentials: true, 
});

// 2. Token interceptor for Bearer token authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. API Actions
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
  let requestData;
  let headers = {};

  // Agar user ne file upload ki hai, toh FormData banao aur multipart bhejo
  if (resumeFile) {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resumeFile", resumeFile); // ⚠️ Ensure "resumeFile" matches backend multer configuration string exactly (e.g., upload.single('resumeFile'))
    
    requestData = formData;
    headers["Content-Type"] = "multipart/form-data";
  } else {
    // Agar sirf text data hai, toh plain object aur application/json automatic manage hoga
    requestData = { jobDescription, selfDescription };
    headers["Content-Type"] = "application/json";
  }

  const response = await api.post("/interview", requestData, { headers });
  return response.data;
};

export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/interview/${interviewId}`);
  return response.data;
};

export const getAllInterviewReports = async () => {
  const response = await api.get("/interview");
  return response.data;
};

export const generateResumePdf = async ({ interviewReportId }) => {
  const response = await api.post(`/interview/resume/pdf/${interviewReportId}`, {}, {
    responseType: "blob" 
  });
  return response.data;
};