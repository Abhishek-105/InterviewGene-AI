const pdfParse = require("pdf-parse");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

// 1. Generate Interview Report
async function generateInterViewReportController(req, res) {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file ? "Uploaded" : "No File");
    console.log("USER:", req.user);

    const { selfDescription, jobDescription } = req.body;
    let resumeText = "";

    if (req.file) {
      console.log("Reading PDF...");
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text;
      console.log("PDF Read Successfully");
    }

    console.log("Calling Gemini...");
    const aiReport = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    console.log("Gemini Response:", aiReport);

    const userId = req.user ? (req.user._id || req.user.id) : null;

    const interviewReport = await interviewReportModel.create({
      user: userId,
      resume: resumeText,
      selfDescription,
      jobDescription,
      ...aiReport,
    });

    return res.status(201).json({
      interviewReport,
    });

  } catch (err) {
    console.error("FULL ERROR:", err);
    return res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
}

// 2. Get Interview Report By ID
async function getInterviewReportByIdController(req, res) {
  try {
    const { interviewId } = req.params;
    const report = await interviewReportModel.findById(interviewId);
    
    if (!report) {
      return res.status(404).json({ message: "Interview report not found" });
    }

    return res.status(200).json({ report });
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
}

// 3. ✅ ADDED: Get All Interview Reports for Logged-in User
async function getAllInterviewReportsController(req, res) {
  try {
    const userId = req.user ? (req.user._id || req.user.id) : null;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const reports = await interviewReportModel.find({ user: userId });
    return res.status(200).json({ reports });
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
}

// 4. ✅ ADDED: Generate Resume PDF Controller
async function generateResumePdfController(req, res) {
  try {
    const { interviewReportId } = req.params;
    const report = await interviewReportModel.findById(interviewReportId);

    if (!report) {
      return res.status(404).json({ message: "Interview report not found" });
    }

    console.log("Generating Resume PDF from AI Service...");
    const pdfBuffer = await generateResumePdf({
      resume: report.resume,
      selfDescription: report.selfDescription,
      jobDescription: report.jobDescription
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=resume-${interviewReportId}.pdf`);
    
    return res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error("PDF GEN ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
}

// Chaaro functions ko properly export kar rahe hain
module.exports = { 
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController
};