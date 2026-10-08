import React, { createContext, useContext, useState, useEffect } from 'react';
import { CountryCode, CountryConfig } from './types';
import { COUNTRIES, SUPPORTED_COUNTRY_CODES } from './countries';
import { detectInitialCountry, saveCountryPreference, formatCurrencyAmount } from './detector';

interface LocalizationContextType {
  country: CountryConfig;
  setCountry: (code: CountryCode) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date | string) => string;
  isIndia: boolean;
  allCountries: CountryConfig[];
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronous initial state to avoid any Layout Shift (CLS)
  const [countryCode, setCountryCode] = useState<CountryCode>(() => detectInitialCountry());

  const country = COUNTRIES[countryCode] || COUNTRIES.IN;
  const isIndia = countryCode === 'IN';

  const handleSetCountry = (code: CountryCode) => {
    if (SUPPORTED_COUNTRY_CODES.includes(code)) {
      setCountryCode(code);
      saveCountryPreference(code);
    }
  };

  // Re-check on mount to ensure hydration consistency
  useEffect(() => {
    const detected = detectInitialCountry();
    if (detected !== countryCode) {
      setCountryCode(detected);
    }
  }, []);

  const formatCurrency = (amount: number): string => {
    return formatCurrencyAmount(amount, countryCode);
  };

  const formatDate = (dateInput: Date | string): string => {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    try {
      return new Intl.DateTimeFormat(country.locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(d);
    } catch {
      return d.toISOString().split('T')[0];
    }
  };

  const allCountries = SUPPORTED_COUNTRY_CODES.map((code) => COUNTRIES[code]);

  return (
    <LocalizationContext.Provider
      value={{
        country,
        setCountry: handleSetCountry,
        formatCurrency,
        formatDate,
        isIndia,
        allCountries
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export function useLocalization(): LocalizationContextType {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}
