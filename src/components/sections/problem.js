import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { useLanguage } from '../../context/LanguageContext';

// Card order is fixed here; the copy for each is keyed by id in the translations.
const problemIds = ['storeExperience', 'lowConversion', 'brandPresentation', 'technicalFriction'];

const StyledProblemSection = styled.section`
  width: 100%;
  max-width: 1200px;

  .eyebrow {
    margin: 0 0 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .problem-title {
    margin: 0;
    max-width: 700px;
    color: var(--lightest-slate);
    font-size: clamp(28px, 5vw, 48px);
    line-height: 1.1;
  }

  .problem-subtitle {
    margin: 20px 0 50px;
    max-width: 640px;
    color: var(--slate);
    font-size: var(--fz-lg);
  }

  .problem-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledCard = styled.div`
  padding: 25px;
  background-color: var(--light-navy);
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--green);
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }

  .accent {
    display: block;
    width: 28px;
    height: 4px;
    margin-bottom: 20px;
    background-color: var(--green);
    border-radius: 2px;
  }

  h3 {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
  }

  p {
    margin: 0;
    color: var(--slate);
    font-size: var(--fz-md);
    line-height: 1.5;
  }
`;

const Problem = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t, translations: copy } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const cards = copy.problemCards || {};

  return (
    <StyledProblemSection id="problem" ref={revealContainer}>
      <p className="eyebrow">{t('problemEyebrow')}</p>
      <h2 className="problem-title">{t('problemTitle')}</h2>
      <p className="problem-subtitle">{t('problemSubtitle')}</p>

      <div className="problem-grid">
        {problemIds
          .filter(id => cards[id])
          .map(id => (
            <StyledCard key={id}>
              <span className="accent" />
              <h3>{cards[id].title}</h3>
              <p>{cards[id].description}</p>
            </StyledCard>
          ))}
      </div>
    </StyledProblemSection>
  );
};

export default Problem;
