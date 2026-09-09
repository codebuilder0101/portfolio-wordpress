import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { useLanguage } from '../../context/LanguageContext';

const StyledHeroSection = styled.section`
  display: flex;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  /* Overrides the global section max-width of 1000px so the hero
     spans the full width of its main container. */
  width: 100%;
  max-width: 100%;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  @media (max-width: 900px) {
    height: auto;
    min-height: auto;
    padding-top: var(--nav-height);
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 3fr 7fr;
    grid-gap: 50px;
    align-items: center;
    width: 100%;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      grid-gap: 40px;
    }
  }
`;

const StyledContent = styled.div`
  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 2.5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 1.1;
  }

  /* The 3fr column is narrower than the full-width hero, so the headings
     are scaled down from the global .big-heading clamp to avoid overflow. */
  .big-heading {
    font-size: clamp(28px, 3vw, 42px);
  }

  p {
    margin: 25px 0 0;
    max-width: 100%;
    font-size: var(--fz-md);
    line-height: 1.5;
  }

  .cta-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 40px;
    font-size: var(--fz-sm);
    padding: 1rem 1.5rem;
  }

  @media (max-width: 900px) {
    .big-heading {
      font-size: clamp(40px, 8vw, 80px);
    }

    p {
      max-width: 650px;
      font-size: clamp(var(--fz-md), 2.5vw, var(--fz-lg));
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  width: 100%;

  @media (max-width: 900px) {
    margin: 0 auto;
    max-width: 600px;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      display: block;
      width: 100%;
      max-height: 70vh;
      object-fit: cover;
      border-radius: var(--border-radius);
      transition: var(--transition);

      @media (max-width: 900px) {
        max-height: none;
      }
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>{t('hello')}</h1>;
  const two = <h2 className="big-heading">{t('name')}</h2>;
  const three = <h3 className="big-heading">{t('title')}</h3>;
  const four = (
    <>
      <p>{t('intro')}</p>
    </>
  );
  const five = (
    <a className="cta-link" href="/#about">
      {t('learnMore')}
    </a>
  );

  const items = [one, two, three, four, five];

  const picture = (
    <div className="wrapper">
      <img className="img" src="/service.png" alt="WordPress and Shopify development service" />
    </div>
  );

  return (
    <StyledHeroSection>
      <div className="hero-inner">
        <StyledContent>
          {prefersReducedMotion ? (
            <>
              {items.map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </>
          ) : (
            <TransitionGroup component={null}>
              {isMounted &&
                items.map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          )}
        </StyledContent>

        <StyledPic>
          {prefersReducedMotion ? (
            picture
          ) : (
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: '600ms' }}>{picture}</div>
                </CSSTransition>
              )}
            </TransitionGroup>
          )}
        </StyledPic>
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
