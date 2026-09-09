import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext';

const StyledLanguageSwitcher = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 15px;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 12px;
  background-color: var(--navy);
  border: 1px solid var(--lightest-navy);
  border-radius: 999px;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  line-height: 1;
  cursor: pointer;
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    background-color: var(--light-navy);
    border-color: var(--slate);
  }

  /* Explicit sizing is required: GlobalStyle sets svg { width: 100%; height: 100% } */
  .globe {
    flex: none;
    width: 15px;
    height: 15px;
    color: var(--lightest-slate);
  }

  .region {
    color: var(--slate);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .code {
    color: var(--white);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .chevron {
    flex: none;
    width: 10px;
    height: 6px;
    color: var(--slate);
    transition: var(--transition);
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--light-navy);
  border: 1px solid var(--lightest-navy);
  border-radius: 8px;
  padding: 6px 0;
  min-width: 180px;
  box-shadow: 0 10px 30px -10px var(--navy-shadow);
  z-index: 100;
  overflow: hidden;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: var(--transition);
`;

const StyledOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--light-slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  text-align: left;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--lightest-navy);
    color: var(--green);
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: var(--lightest-navy);

    .checkmark {
      opacity: 1;
    }
  `}

  .left-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .right-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .region {
    color: var(--slate);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .checkmark {
    opacity: 0;
    color: var(--green);
    font-size: 14px;
  }
`;

const languages = [
  { code: 'pt', name: 'Português', region: 'BR' },
  { code: 'en', name: 'English', region: 'US' },
  { code: 'es', name: 'Español', region: 'ES' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find(l => l.code === language) || languages[2];

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = code => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <StyledLanguageSwitcher ref={dropdownRef}>
      <StyledButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}>
        <svg
          className="globe"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="region">{currentLang.region}</span>
        <span className="code">{currentLang.code.toUpperCase()}</span>
        <svg className="chevron" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </StyledButton>

      <StyledDropdown isOpen={isOpen} role="listbox">
        {languages.map(({ code, name, region }) => (
          <StyledOption
            key={code}
            isActive={language === code}
            role="option"
            aria-selected={language === code}
            onClick={() => handleSelect(code)}>
            <div className="left-content">
              <span>{name}</span>
            </div>
            <div className="right-content">
              <span className="region">{region}</span>
              <span className="checkmark">✓</span>
            </div>
          </StyledOption>
        ))}
      </StyledDropdown>
    </StyledLanguageSwitcher>
  );
};

export default LanguageSwitcher;
