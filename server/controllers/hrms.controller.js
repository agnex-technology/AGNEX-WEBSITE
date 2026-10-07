const WorkflowService = require('../services/workflow.service');

exports.getAllJobs = async (req, res, next) => {
    try {
        const mockJobs = [
            { id: 'job-1', title: 'Senior Frontend Engineer', department: 'Engineering', status: 'OPEN' },
            { id: 'job-2', title: 'Product Manager', department: 'Product', status: 'OPEN' }
        ];

        res.status(200).json({
            status: 'success',
            results: mockJobs.length,
            data: {
                jobs: mockJobs
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.createJob = async (req, res, next) => {
    try {
        const { title, department, description } = req.body;
        
        const newJob = { id: 'generated-job-uuid', title, department, description, status: 'OPEN' };
        
        res.status(201).json({
            status: 'success',
            data: {
                job: newJob
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.applyForJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        const { resume_url, cover_letter } = req.body;
        
        const newApplication = { 
            id: 'generated-app-uuid', 
            job_id: jobId, 
            candidate_id: req.user.id, 
            status: 'SUBMITTED',
            resume_url,
            cover_letter
        };

        // Mock fetching job details from DB
        const jobData = { id: jobId, title: 'Software Engineer', description: 'Requires 5+ years experience in full-stack web development.' };

        // Trigger Workflow
        await WorkflowService.handleJobApplication(newApplication, jobData);

        res.status(201).json({
            status: 'success',
            data: {
                application: newApplication
            }
        });
    } catch (err) {
        next(err);
    }
};
