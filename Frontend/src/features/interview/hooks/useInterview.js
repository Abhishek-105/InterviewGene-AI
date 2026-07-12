import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"

export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    try {
        // 1. API hit karein (yeh directly backend ka payload return karega)
        const responseData = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
        
        // 2. Extract report checking both levels (pehle flat check karein kyunki api.js 'response.data' de raha hai)
        const reportData = responseData?.interviewReport || responseData?.data?.interviewReport || responseData;
        
        if (reportData && (reportData._id || reportData.id)) {
            setReport(reportData);
            return reportData; // Success: Return valid report object to Home.jsx
        } else {
            console.error("Report data received but missing standard ID properties:", responseData);
        }
    } catch (error) {
        console.error("Error in generateReport hook execution:", error);
    } finally {
        setLoading(false);
    }

    return null; // Fallback so that Home.jsx doesn't read property of undefined
};

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            const reportData = response?.interviewReport || response?.data?.interviewReport;
            
            if (reportData) {
                setReport(reportData)
                return reportData
            }
        } catch (error) {
            console.error("Error in getReportById:", error)
        } finally {
            setLoading(false)
        }
        return null
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            const reportsData = response?.interviewReports || response?.data?.interviewReports;
            
            if (reportsData) {
                setReports(reportsData)
                return reportsData
            }
        } catch (error) {
            console.error("Error in getReports:", error)
        } finally {
            setLoading(false)
        }

        return []
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        try {
            const response = await generateResumePdf({ interviewReportId })
            // Ensure response has the data blob (axios handles blobs in response.data)
            const blobData = response?.data ? response.data : response;
            
            const url = window.URL.createObjectURL(new Blob([ blobData ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            
            // Clean up the URL object
            window.URL.revokeObjectURL(url)
            document.body.removeChild(link)
        }
        catch (error) {
            console.error("Error downloading PDF:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}