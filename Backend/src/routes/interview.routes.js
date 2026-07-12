const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

// Safety Checks: Agar koi function undefined hai toh fallback function run hoga taaki server crash na ho
const generateReport = interviewController.generateInterViewReportController || ((req, res) => res.status(500).send("Handler missing"));
const getReportById = interviewController.getInterviewReportByIdController || ((req, res) => res.status(500).send("Handler missing"));
const getAllReports = interviewController.getAllInterviewReportsController || ((req, res) => res.status(500).send("Handler missing"));
const generatePdf = interviewController.generateResumePdfController || ((req, res) => res.status(500).send("Handler missing"));

/**
 * @route POST /api/interview/
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), generateReport);

/**
 * @route GET /api/interview/report/:interviewId
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, getReportById);

/**
 * @route GET /api/interview/
 */
interviewRouter.get("/", authMiddleware.authUser, getAllReports);

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, generatePdf);

module.exports = interviewRouter;