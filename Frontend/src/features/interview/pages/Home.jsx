import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview' // Path theek kiya (.js hataya aur hooks kiya)
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='home'>
            <div className='home-container'>
                
                {/* Page Header */}
                <header className='header-section'>
                    <h1 className='title'>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                    <p className='subtitle'>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </header>

                {/* Main Content Grid */}
                <div className='interview-input-group'>
                    
                    {/* Left Section - Job Description */}
                    <div className='left-section'>
                        <div className='section-header'>
                            <span className='icon'>💼</span>
                            <h2>Target Job Description</h2>
                            <span className='badge'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            className='job-textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-count'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Right Section - Profile */}
                    <div className='right-section'>
                        <div className='section-header'>
                            <span className='icon'>👤</span>
                            <h2>Your Profile</h2>
                        </div>

                        <div className='profile-content'>
                            {/* Upload Resume */}
                            <div className='resume-section'>
                                <div className='upload-header'>
                                    <label>Upload Resume</label>
                                    <span className='badge'>Best Results</span>
                                </div>
                                <label className='file-upload-area' htmlFor='resume'>
                                    <span className='upload-icon'>📁</span>
                                    <p className='upload-text'>Click to upload or drag &amp; drop</p>
                                    <p className='upload-hint'>PDF or DOCX (Max 5MB)</p>
                                    <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                                </label>
                            </div>

                            {/* OR Divider */}
                            <div className='divider'></div>

                            {/* Quick Self-Description */}
                            <div className='description-section'>
                                <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                                <textarea
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='description-textarea'
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />
                            </div>

                            {/* Info Box */}
                            <div className='info-box'>
                                <span className='info-icon'>ℹ️</span>
                                <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Button */}
                <div className='action-section'>
                    <span className='processing-info'>AI-Powered Strategy Generation • Approx 30s</span>
                    <button onClick={handleGenerateReport} className='primary-button'>
                        Generate My Interview Strategy
                    </button>
                </div>

                {/* Recent Reports List */}
                {reports && reports.length > 0 && (
                    <section className='recent-reports' style={{ marginTop: '2rem' }}>
                        <h2>My Recent Interview Plans</h2>
                        <ul className='reports-list' style={{ listStyle: 'none', padding: 0 }}>
                            {reports.map(report => (
                                <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)} style={{ cursor: 'pointer', padding: '1rem', background: '#1a1f27', borderRadius: '0.75rem', marginBottom: '1rem', border: '1px solid #2a3039' }}>
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <p style={{ color: '#6b7280', margin: '0.5rem 0' }}>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p style={{ color: '#ff1493', fontWeight: 'bold' }}>Match Score: {report.matchScore}%</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Page Footer */}
                <footer className='footer'>
                    <a href='#'>Privacy Policy</a>
                    <a href='#'>Terms of Service</a>
                    <a href='#'>Help Center</a>
                </footer>
            </div>
        </div>
    )
}

export default Home  