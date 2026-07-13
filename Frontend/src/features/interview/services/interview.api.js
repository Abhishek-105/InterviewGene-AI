import axios from "axios";

const api = axios.create({
  baseURL: "https://interviewgene-ai-backend.onrender.com/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
  let requestData;
  let headers = {};

  if (resumeFile) {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile); // matches backend's upload.single("resume")

    requestData = formData;
    headers["Content-Type"] = "multipart/form-data";
  } else {
    requestData = { jobDescription, selfDescription };
    headers["Content-Type"] = "application/json";
  }

  const response = await api.post("/interview", requestData, { headers });
  return response.data;
};

export const getInterviewReportById = async (interviewId) => {
  // FIX: backend route is /api/interview/report/:interviewId — "/report" was missing
  const response = await api.get(`/interview/report/${interviewId}`);
  return response.data;
};

export const getAllInterviewReports = async () => {
  const response = await api.get("/interview");
  return response.data;
};

export const generateResumePdf = async (interviewReportId) => {
  // FIX: was destructuring { interviewReportId } from an object,
  // but callers pass a plain string id — that made it always undefined.
  const response = await api.post(`/interview/resume/pdf/${interviewReportId}`, {}, {
    responseType: "blob"
  });
  return response.data;
};