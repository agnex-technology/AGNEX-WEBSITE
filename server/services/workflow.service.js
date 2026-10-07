const NotificationService = require('./notification.service');
const { RecruitmentAgent, CrmAgent } = require('../ai/agents/specialist.agents');

/**
 * Enterprise Workflow Automation Service
 * Background job processor for event-driven architecture.
 */

class WorkflowService {
    /**
     * Triggered when a new CRM lead is created
     */
    static async handleNewLead(leadData) {
        console.log(`[WorkflowService] Processing New Lead Workflow for ${leadData.contact_name}`);
        
        let aiInsight = '';
        try {
            // Let CRM Agent score the lead and draft outreach
            const aiResult = await CrmAgent.scoreLead({
                company: leadData.contact_name,
                stage: leadData.status,
                value: leadData.budget
            });
            aiInsight = `<p><strong>AI Lead Score & Insights:</strong><br/>${aiResult.output}</p>`;
        } catch (err) {
            console.error('[WorkflowService] CRM Agent error:', err.message);
        }

        // 1. Send confirmation email to the lead
        await NotificationService.sendEmail(
            'lead@example.com', 
            'Thank you for contacting AGNEX Technology',
            `<p>Hi ${leadData.contact_name}, we have received your inquiry and will be in touch shortly.</p>`
        );

        // 2. Alert the sales team in-app with AI insights
        await NotificationService.sendInAppNotification(
            'admin_user_id', 
            `New Lead Received: ${leadData.contact_name}. ${aiInsight ? 'AI Insights generated.' : ''}`
        );
    }

    /**
     * Triggered when a candidate submits a job application
     */
    static async handleJobApplication(applicationData, jobData) {
        console.log(`[WorkflowService] Processing Application for candidate ID ${applicationData.candidate_id}`);
        
        let aiScore = '';
        try {
            // Mock extracting resume text from URL
            const mockResumeText = `Candidate has 5 years of experience in relevant field. Applied for: ${jobData?.title || 'Job'}. Background includes Node.js and React.`;
            const mockJobDesc = jobData?.description || `Looking for a strong candidate for ${jobData?.title || 'Open Role'}.`;

            // Let Recruitment Agent score the resume
            const aiResult = await RecruitmentAgent.scoreResume(mockResumeText, mockJobDesc);
            aiScore = `<p><strong>AI Resume Score:</strong><br/>${aiResult.rawOutput}</p>`;
        } catch (err) {
            console.error('[WorkflowService] Recruitment Agent error:', err.message);
        }

        // 1. Send email to HR with AI Score
        await NotificationService.sendEmail(
            'hr@agnex.tech',
            `New Application received for ${jobData?.title || 'Job'}`,
            `<p>Review the resume here: ${applicationData.resume_url}</p>${aiScore}`
        );
    }
}

module.exports = WorkflowService;

