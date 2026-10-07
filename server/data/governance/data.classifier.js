/**
 * Phase 135 — Enterprise Data Governance
 * Data Classifier — classifies assets with sensitivity, PII flags, and retention.
 * 
 * Classification levels:
 *   PUBLIC       → No restrictions
 *   INTERNAL     → Employees only
 *   CONFIDENTIAL → Role-based access
 *   PII          → Personal Identifiable Information — GDPR/CCPA scope
 *   PHI          → Protected Health Information — HIPAA scope
 *   RESTRICTED   → Highest sensitivity — exec only
 */

const CLASSIFICATION_RULES = [
  // Fields containing these patterns → PII
  {
    classification: 'PII',
    fieldPatterns:  [/email/i, /phone/i, /first_name/i, /last_name/i, /address/i, /ssn/i, /dob/i, /birth/i, /passport/i],
    retention_days: 2555,
    encryption_required: true,
    access_roles: ['admin', 'data_steward'],
  },
  // Fields containing these patterns → CONFIDENTIAL
  {
    classification: 'CONFIDENTIAL',
    fieldPatterns:  [/password/i, /secret/i, /token/i, /api_key/i, /salary/i, /budget/i, /revenue/i, /credit_card/i],
    retention_days: 1825,
    encryption_required: true,
    access_roles: ['admin'],
  },
  // Fields containing these patterns → INTERNAL
  {
    classification: 'INTERNAL',
    fieldPatterns:  [/status/i, /created_at/i, /updated_at/i, /metadata/i, /notes/i],
    retention_days: 1095,
    encryption_required: false,
    access_roles: ['admin', 'manager', 'analyst'],
  },
];

class DataClassifier {
  /**
   * Classify a database column or field
   * @param {string} fieldName
   * @param {string} tableName
   * @returns {{ classification: string, retention_days: number, encryption_required: boolean, access_roles: string[] }}
   */
  classifyField(fieldName, tableName = '') {
    for (const rule of CLASSIFICATION_RULES) {
      if (rule.fieldPatterns.some(p => p.test(fieldName))) {
        return {
          classification: rule.classification,
          retention_days: rule.retention_days,
          encryption_required: rule.encryption_required,
          access_roles: rule.access_roles,
          field: fieldName,
          table: tableName,
          classifiedAt: new Date().toISOString(),
        };
      }
    }
    return {
      classification: 'INTERNAL',
      retention_days: 1095,
      encryption_required: false,
      access_roles: ['admin', 'manager', 'analyst', 'developer'],
      field: fieldName,
      table: tableName,
    };
  }

  /**
   * Classify all fields in a table definition
   * @param {string} tableName
   * @param {string[]} fieldNames
   */
  classifyTable(tableName, fieldNames) {
    const classifications = fieldNames.map(f => this.classifyField(f, tableName));
    const highestLevel = this._highestClassification(classifications.map(c => c.classification));
    return {
      table: tableName,
      overallClassification: highestLevel,
      fields: classifications,
      piiFields: classifications.filter(c => c.classification === 'PII').map(c => c.field),
      requiresEncryption: classifications.some(c => c.encryption_required),
    };
  }

  /**
   * Check if a user role has access to a classified resource
   * @param {string} userRole
   * @param {string} classification
   */
  hasAccess(userRole, classification) {
    const acl = { PUBLIC: ['*'], INTERNAL: ['admin','manager','analyst','developer'], CONFIDENTIAL: ['admin'], PII: ['admin','data_steward'], PHI: ['admin'], RESTRICTED: ['admin'] };
    const allowed = acl[classification] || acl.INTERNAL;
    return allowed.includes('*') || allowed.includes(userRole);
  }

  _highestClassification(levels) {
    const order = ['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'PII', 'PHI', 'RESTRICTED'];
    return levels.reduce((max, level) => order.indexOf(level) > order.indexOf(max) ? level : max, 'PUBLIC');
  }

  /**
   * GDPR Subject Access Request — identify all PII fields for a userId
   */
  getSARScope() {
    return [
      { table: 'users',        fields: ['email', 'first_name', 'last_name', 'password_hash'] },
      { table: 'leads',        fields: ['contact_email', 'contact_phone', 'contact_name'] },
      { table: 'applications', fields: ['resume_url', 'cover_letter'] },
      { table: 'ai.memory',    fields: ['content'] },
    ];
  }
}

module.exports = new DataClassifier();
