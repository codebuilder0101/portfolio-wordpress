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
  gap: 6px;
  padding: 8px 12px;
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--green-tint);
  }

  .globe {
    width: 16px;
    height: 16px;
  }
`;

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: var(--light-navy);
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  padding: 10px 0;
  min-width: 150px;
  box-shadow: 0 10px 30px -15px var(--navy-shadow);
  z-index: 100;
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
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background-color: var(--lightest-navy);
    color: var(--green);
  }

  .flag {
    font-size: 14px;
    margin-right: 8px;
  }

  .code {
    color: var(--slate);
    font-size: 10px;
  }
`;

const languages = [
  { code: 'pt', name: 'Português', flag: 'BR' },
  { code: 'en', name: 'English', flag: 'US' },
  { code: 'es', name: 'Español', flag: 'ES' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find(l => l.code === language) || languages[1];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <StyledLanguageSwitcher ref={dropdownRef}>
      <StyledButton onClick={() => setIsOpen(!isOpen)} aria-label="Select language">
        <svg className="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {currentLang.flag} {currentLang.code.toUpperCase()}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </StyledButton>

      <StyledDropdown isOpen={isOpen}>
        {languages.map(({ code, name, flag }) => (
          <StyledOption
            key={code}
            isActive={language === code}
            onClick={() => handleSelect(code)}
          >
            <span>
              <span className="flag">{flag}</span>
              {name}
            </span>
            <span className="code">{code.toUpperCase()}</span>
          </StyledOption>
        ))}
      </StyledDropdown>
    </StyledLanguageSwitcher>
  );
};

export default LanguageSwitcher;
