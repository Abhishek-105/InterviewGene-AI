# 🎯 InterviewGen-AI

> AI-powered interview preparation platform that analyzes your resume, self-description, and target job description to generate a personalized interview strategy — technical questions, behavioral questions, skill gap analysis, and a day-wise preparation plan.

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/Gemini-AI-blue?style=for-the-badge" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge" alt="Status" />
</p>

<p align="center">
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a>
</p>

---

## 📖 Overview

**InterviewGene AI** helps job seekers walk into interviews prepared, not anxious. Upload your resume, describe yourself, paste the job description — and the app uses Google's Gemini AI to generate a tailored interview report: likely technical and behavioral questions (with the *intent* behind each question and how to answer it), identified skill gaps, and a structured day-by-day preparation plan.

Built as a full-stack MERN application with secure authentication, PDF parsing, and AI-powered content generation — deployed end-to-end on Vercel (frontend) and Render (backend).

## 🔗 Live Demo

- **App:** [interview-gene-ai-beta.vercel.app](https://interview-gene-ai-beta.vercel.app)
- **API:** `https://interviewgene-ai-backend.onrender.com/api`

> ⚠️ Backend is hosted on Render's free tier — the first request after inactivity may take 20–30s to spin up.

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based auth with HTTP-only cookies and a server-side token blacklist for logout
- 📄 **Resume Parsing** — Upload a PDF resume; text is extracted and analyzed server-side
- 🤖 **AI-Generated Interview Reports** — Powered by Gemini AI, using structured JSON schema output for consistent, reliable results
- 🎯 **Match Score** — Instant score showing how well your profile fits the target job description
- 💬 **Technical + Behavioral Questions** — Each question comes with the interviewer's likely intent and a model answer approach
- 📊 **Skill Gap Analysis** — Flags missing skills by severity (low / medium / high)
- 🗓️ **Day-Wise Preparation Plan** — A structured, actionable prep schedule instead of generic advice
- 📥 **AI-Tailored Resume Export** — Generates a job-tailored resume as a downloadable PDF (via Puppeteer)
- 📚 **Report History** — View all previously generated interview reports for a logged-in user

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- React Router
- Axios
- CSS3

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken) + bcryptjs
- Multer (file uploads, in-memory storage)
- pdf-parse (resume text extraction)
- Puppeteer (HTML → PDF generation)

**AI**
- Google Gemini API (`@google/genai`) with structured JSON schema responses

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

## 🏗️ Architecture

```
Client (React + Vite)
   │  Axios (withCredentials)
   ▼
Express API (Node.js)
   │
   ├── Auth Routes ──────► JWT + HTTP-only Cookies + MongoDB
   ├── Interview Routes ─► Multer (PDF) ─► pdf-parse ─► Gemini AI
   │                                                       │
   │                                                       ▼
   │                                          Structured JSON Report
   ▼
MongoDB (Users, Interview Reports, Token Blacklist)
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- A Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/interview-gene-ai.git
cd interview-gene-ai
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:3000/api
```

Run the frontend:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 📡 API Reference

| Method | Endpoint                              | Description                              | Auth |
|--------|----------------------------------------|-------------------------------------------|------|
| POST   | `/api/auth/register`                  | Register a new user                        | ❌ |
| POST   | `/api/auth/login`                     | Log in a user                              | ❌ |
| GET    | `/api/auth/logout`                    | Log out and blacklist token                | ✅ |
| GET    | `/api/auth/get-me`                    | Get current user details                   | ✅ |
| POST   | `/api/interview`                      | Generate an interview report (resume + JD) | ✅ |
| GET    | `/api/interview`                      | Get all interview reports for the user     | ✅ |
| GET    | `/api/interview/report/:interviewId`  | Get a specific interview report            | ✅ |
| POST   | `/api/interview/resume/pdf/:reportId` | Generate a tailored resume PDF             | ✅ |

## 📂 Project Structure

```
interview-gene-ai/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── services/       # Gemini AI + PDF generation logic
│   │   ├── config/
│   │   └── app.js
│   └── server.js
└── frontend/
    └── src/
        ├── features/
        │   ├── auth/
        │   └── interview/
        ├── app.routes.jsx
        └── main.jsx
```

## 🗺️ Roadmap

- [ ] Mock interview mode with real-time AI feedback
- [ ] Multi-language support for questions
- [ ] Export interview report as PDF
- [ ] Progress tracking across multiple prep sessions

## 👤 Author

**Abhishek Kumar**
B.Tech CSE, Chandigarh Group of Colleges (Landran)

---

<p align="center">Built with ❤️ using the MERN stack and Gemini AI</p>

