import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { useLanguage } from '../../context/LanguageContext';

// Figures, brand names and sources are language-independent; the label and
// description for each card come from the translation file, keyed by `id`.
const proofData = [
  {
    id: 'lavishChic',
    name: 'Lavish & Chic',
    amount: '$96K',
    source: 'Google Analytics (GA4)',
    image: '/proof/sales_proof.png',
    featured: true,
  },
  {
    id: 'lumiereSkin',
    name: 'Lumière Skin Co.',
    amount: '$72,846',
    source: 'Shopify Analytics',
    image: '/proof/shopify_app_ales_2.png',
  },
  {
    id: 'beautyGlow',
    name: 'BeautyGlow Skincare',
    amount: '$61,762',
    source: 'Google Analytics',
    image: '/proof/beauty_skin_care_analytics.png',
  },
];

const StyledProofSection = styled.section`
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

  .proof-title {
    margin: 0;
    max-width: 700px;
    color: var(--lightest-slate);
    font-size: clamp(28px, 5vw, 48px);
    line-height: 1.1;
  }

  .proof-subtitle {
    margin: 20px 0 50px;
    max-width: 600px;
    color: var(--slate);
    font-size: var(--fz-lg);
  }

  .proof-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  background-color: var(--light-navy);
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);

  /* The first card carries the widest dashboard, so it spans both columns. */
  grid-column: ${({ featured }) => (featured ? '1 / -1' : 'auto')};

  &:hover,
  &:focus-within {
    transform: translateY(-5px);
    border-color: var(--green);
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }

  .shot {
    position: relative;
    background-color: var(--navy);
    border-bottom: 1px solid var(--lightest-navy);
    line-height: 0;
  }

  .shot img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* Shown until the real dashboard screenshot is dropped into static/proof/. */
  .shot-placeholder {
    ${({ theme }) => theme.mixins.flexCenter};
    flex-direction: column;
    gap: 8px;
    padding: 40px 20px;
    min-height: ${({ featured }) => (featured ? '320px' : '240px')};
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    text-align: center;
    line-height: 1.6;
  }

  .body {
    padding: 25px;
  }

  .amount-row {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 12px;
  }

  .amount {
    color: var(--white);
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 700;
    line-height: 1;
  }

  .label {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .name {
    margin: 15px 0 0;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
  }

  .description {
    margin: 10px 0 0;
    color: var(--slate);
    font-size: var(--fz-md);
  }

  .source {
    margin: 20px 0 0;
    color: var(--dark-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`;

const ProofCard = ({ card, copy, sourceLabel }) => {
  const [hasImage, setHasImage] = useState(true);

  return (
    <StyledCard featured={card.featured}>
      <div className="shot">
        {hasImage ? (
          <img
            src={card.image}
            alt={`${card.name} dashboard showing ${card.amount}`}
            loading="lazy"
            onError={() => setHasImage(false)}
          />
        ) : (
          <div className="shot-placeholder">
            <span>{card.source}</span>
            <span>{card.image}</span>
          </div>
        )}
      </div>

      <div className="body">
        <div className="amount-row">
          <span className="amount">{card.amount}</span>
          <span className="label">↗ {copy.label}</span>
        </div>

        <h3 className="name">{card.name}</h3>
        <p className="description">{copy.description}</p>
        <p className="source">
          {sourceLabel}: {card.source}
        </p>
      </div>
    </StyledCard>
  );
};

ProofCard.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  copy: PropTypes.shape({
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  sourceLabel: PropTypes.string.isRequired,
};

const Proof = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t, translations: copy } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const cards = copy.proofCards || {};

  return (
    <StyledProofSection id="proof" ref={revealContainer}>
      <p className="eyebrow">{t('proofEyebrow')}</p>
      <h2 className="proof-title">{t('proofTitle')}</h2>
      <p className="proof-subtitle">{t('proofSubtitle')}</p>

      <div className="proof-grid">
        {proofData
          .filter(card => cards[card.id])
          .map(card => (
            <ProofCard
              key={card.id}
              card={card}
              copy={cards[card.id]}
              sourceLabel={t('proofSource')}
            />
          ))}
      </div>
    </StyledProofSection>
  );
};

export default Proof;
