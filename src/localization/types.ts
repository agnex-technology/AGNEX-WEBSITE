export type CountryCode = 'IN' | 'US' | 'GB' | 'AE' | 'SG' | 'AU' | 'CA' | 'DE' | 'GLOBAL';

export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'AED' | 'SGD' | 'AUD' | 'CAD' | 'EUR';

export interface BudgetTier {
  id: string;
  label: string;
  range: string;
}

export interface CountryConfig {
  code: CountryCode;
  name: string;
  currency: CurrencyCode;
  currencySymbol: string;
  dialCode: string;
  phoneFormat: string;
  timeZone: string;
  timeZoneLabel: string;
  dateFormat: string;
  locale: string;
  marketLabel: string;
  heroTagline: string;
  supportingMessage: string;
  budgetTiers: BudgetTier[];
  typicalEngagements: string[];
  businessContext: {
    invoicingLabel: string;
    taxLabel: string;
    workflowContext: string;
    turnaround: string;
  };
  contactCta: string;
  secondaryCta: string;
  showWhatsApp: boolean;
  priorityIndustries: string[];
}
