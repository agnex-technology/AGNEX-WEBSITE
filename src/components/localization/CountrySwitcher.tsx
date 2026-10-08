import React, { useState, useRef, useEffect } from 'react';
import { useLocalization } from '../../localization/LocalizationContext';
import { CountryCode } from '../../localization/types';

interface CountrySwitcherProps {
  variant?: 'navbar' | 'footer';
}

export const CountrySwitcher: React.FC<CountrySwitcherProps> = ({ variant = 'navbar' }) => {
  const { country, setCountry, allCountries } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: CountryCode) => {
    setCountry(code);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const isNav = variant === 'navbar';

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Select region and currency. Currently selected: ${country.name}, currency: ${country.currency}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: isNav ? '0.35rem 0.65rem' : '0.4rem 0.75rem',
          fontSize: 'var(--text-2xs)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: isNav ? 'var(--agnex-navy)' : 'var(--text-secondary)',
          backgroundColor: isNav ? 'rgba(1, 122, 239, 0.05)' : 'var(--agnex-canvas-subtle)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          lineHeight: 1
        }}
        className="country-switcher-trigger"
      >
        <span style={{ color: 'var(--agnex-blue)', fontWeight: 700 }}>●</span>
        <span>{country.marketLabel}</span>
        <span
          style={{
            fontSize: '9px',
            color: 'var(--text-muted)',
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Regional & Currency Preferences"
          style={{
            position: 'absolute',
            bottom: isNav ? 'auto' : 'calc(100% + 8px)',
            top: isNav ? 'calc(100% + 8px)' : 'auto',
            right: 0,
            width: '280px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-float)',
            padding: '0.75rem',
            zIndex: 1000,
            animation: 'fadeIn 0.15s ease'
          }}
        >
          <div
            style={{
              padding: '0.25rem 0.5rem 0.5rem 0.5rem',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              REGIONAL SPECIFICATION
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--agnex-blue)', fontWeight: 700 }}>
              INDIA-FIRST
            </span>
          </div>

          <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {allCountries.map((c) => {
              const isSelected = c.code === country.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleSelect(c.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.5rem 0.65rem',
                    textAlign: 'left',
                    background: isSelected ? 'var(--agnex-canvas-subtle)' : 'none',
                    border: isSelected ? '1px solid var(--agnex-blue)' : '1px solid transparent',
                    borderRadius: 'var(--radius-xs)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  className="country-item"
                >
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--agnex-navy)', fontFamily: 'var(--font-sans)' }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {c.timeZoneLabel}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: isSelected ? 'var(--agnex-blue)' : 'var(--text-secondary)'
                      }}
                    >
                      {c.currency} ({c.currencySymbol.trim()})
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              paddingTop: '0.5rem',
              marginTop: '0.5rem',
              borderTop: '1px solid var(--border-color)',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              lineHeight: 1.4
            }}
          >
            Adapts currency, local phone formatting, and business context.
          </div>
        </div>
      )}

      <style>{`
        .country-switcher-trigger:hover {
          border-color: var(--agnex-blue) !important;
          color: var(--agnex-blue) !important;
        }
        .country-item:hover {
          background-color: var(--agnex-canvas-subtle) !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
