/**
 * Phase 126 — Enterprise Multi-Agent Platform
 * Recruitment Agent — specialized for ATS and talent acquisition tasks
 */

const BaseAgent  = require('./base.agent');
const retriever  = require('../rag/retriever');
const aiGateway  = require('../gateway/ai.gateway');
const promptService = require('../prompts/prompt.service');

class RecruitmentAgent extends BaseAgent {
  constructor() {
    super({
      name: 'recruitment-agent',
      promptKey: 'agent.recruitment.v1',
      task: 'reasoning',
      tools: ['resume_scorer', 'job_description_writer', 'interview_question_generator'],
    });
  }

  /**
   * Score a resume against a job description
   * @param {string} resumeText
   * @param {string} jobDescription
   * @returns {Promise<{score: number, feedback: string, strengths: string[], gaps: string[]}>}
   */
  async scoreResume(resumeText, jobDescription) {
    const input = `Score this resume against the job description.

**Job Description**:
${jobDescription}

**Resume**:
${resumeText}

Provide a structured evaluation with:
1. Overall match score (0-100)
2. Top 3 strengths
3. Top 3 skill gaps
4. Recommendation: STRONG_FIT | GOOD_FIT | WEAK_FIT | REJECT
Format response as JSON.`;

    const result = await this.run({ input, variables: { jobTitle: 'Position', companyName: 'AGNEX Technology', hiringStage: 'Initial Screening' } });
    return { rawOutput: result.output, agentName: this.name };
  }

  /**
   * Draft a job description from a role brief
   */
  async draftJobDescription(roleBrief) {
    const result = await this.run({
      input: `Write a complete, compelling job description for: ${roleBrief}. Include: title, summary, responsibilities (8-10), requirements (must-have vs nice-to-have), benefits.`,
      variables: { jobTitle: roleBrief, companyName: 'AGNEX Technology', hiringStage: 'JD Creation' },
    });
    return result;
  }
}

/**
 * CRM Agent — specialized for sales pipeline and lead management
 */
class CrmAgent extends BaseAgent {
  constructor() {
    super({
      name: 'crm-agent',
      promptKey: 'agent.crm.v1',
      task: 'reasoning',
      tools: ['lead_scorer', 'email_drafter', 'pipeline_analyzer'],
    });
  }

  async scoreLead(leadData) {
    const input = `Score this lead's conversion probability and provide recommendations.

**Lead Profile**: ${JSON.stringify(leadData, null, 2)}

Provide: conversion score (0-100), key signals, recommended next action, and draft outreach message.`;

    return this.run({ input, variables: { accountName: leadData.company || 'Unknown', dealStage: leadData.stage || 'New', dealValue: leadData.value || 'TBD' } });
  }
}

module.exports = { RecruitmentAgent: new RecruitmentAgent(), CrmAgent: new CrmAgent() };
