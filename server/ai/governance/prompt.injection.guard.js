/**
 * Phase 128 — Enterprise AI Governance
 * Prompt Injection Guard — detects adversarial prompt injection attempts
 * 
 * Defends against: system prompt override, role-play jailbreaks,
 * instruction injection via user inputs, context poisoning.
 */

// Injection patterns — ordered by severity
const INJECTION_PATTERNS = [
  // Direct system prompt overrides
  { name: 'system_override',     pattern: /ignore (all )?(previous|prior|above|system|your) (instructions?|prompts?|constraints?)/i },
  { name: 'new_instructions',    pattern: /your new instructions? (are|is)/i },
  { name: 'disregard',           pattern: /disregard (everything|all|your) (above|previous|prior)/i },
  
  // Role-play jailbreaks
  { name: 'jailbreak_dan',       pattern: /do anything now|DAN mode|jailbreak/i },
  { name: 'roleplay_injection',  pattern: /pretend (you are|to be) (an? )?(ai|assistant|system) (without|that (has no|ignores))/i },
  { name: 'developer_mode',      pattern: /developer mode|god mode|unrestricted mode/i },

  // Data extraction attempts  
  { name: 'system_prompt_leak',  pattern: /repeat (your|the) (system|initial|first) (prompt|instructions?|message)/i },
  { name: 'context_leak',        pattern: /(print|show|reveal|output|display) (your |the )?(system|full|complete|actual) (prompt|instructions?|context)/i },

  // Code/Shell injection into prompts
  { name: 'code_injection',      pattern: /(\$\(|`|<\?php|<script|eval\(|exec\(|system\(|subprocess)/i },
];

const SEVERITY = {
  system_override:    'critical',
  new_instructions:   'critical',
  disregard:          'critical',
  jailbreak_dan:      'critical',
  roleplay_injection: 'high',
  developer_mode:     'high',
  system_prompt_leak: 'medium',
  context_leak:       'medium',
  code_injection:     'critical',
};

class PromptInjectionGuard {
  /**
   * Scan input for prompt injection attempts
   * @param {string} text
   * @returns {{ blocked: boolean, detections: Array, message?: string }}
   */
  scan(text) {
    const detections = [];

    for (const { name, pattern } of INJECTION_PATTERNS) {
      if (pattern.test(text)) {
        detections.push({ name, severity: SEVERITY[name] || 'medium' });
      }
    }

    const hasCritical = detections.some(d => d.severity === 'critical');
    const hasHigh     = detections.some(d => d.severity === 'high');

    if (hasCritical || hasHigh) {
      return {
        blocked: true,
        detections,
        message: "I'm unable to process this request as it appears to contain instructions that attempt to override my guidelines. Please rephrase your question.",
      };
    }

    if (detections.length > 0) {
      // Log medium-severity detections but don't block
      console.warn(JSON.stringify({ level: 'warn', message: '[AIGovernance] Potential injection detected (not blocked)', detections }));
    }

    return { blocked: false, detections };
  }
}

const promptInjectionGuard = new PromptInjectionGuard();
module.exports = { promptInjectionGuard, PromptInjectionGuard };
