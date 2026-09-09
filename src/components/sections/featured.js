import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { useLanguage } from '../../context/LanguageContext';

const StyledFeaturedSection = styled.section`
  width: 100%;
  max-width: 1200px;

  .section-heading {
    margin: 0 0 50px;
    color: var(--green);
    font-size: clamp(28px, 5vw, 42px);
    text-align: center;
  }
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.li`
  display: flex;
  flex-direction: column;
  background-color: var(--light-navy);
  border: 1px solid var(--lightest-navy);
  border-radius: 10px;
  overflow: hidden;
  transition: var(--transition);

  &:hover,
  &:focus-within {
    transform: translateY(-5px);
    border-color: var(--green);
    box-shadow: 0 20px 30px -15px var(--navy-shadow);
  }

  .card-media {
    display: block;
    position: relative;
    height: 190px;
    background-color: var(--navy);
    border-bottom: 1px solid var(--lightest-navy);
    overflow: hidden;

    &:hover,
    &:focus {
      background-color: var(--navy);
    }

    .img {
      width: 100%;
      height: 100%;
    }
  }

  /* Shown while a project has no cover image in its frontmatter. */
  .media-placeholder {
    ${({ theme }) => theme.mixins.flexCenter};
    width: 100%;
    height: 100%;
    color: var(--dark-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
    text-align: center;
    padding: 0 20px;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 25px;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 15px;
  }

  .card-title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: var(--fz-heading);
    line-height: 1.2;

    a {
      color: inherit;

      &:hover,
      &:focus {
        color: var(--green);
      }
    }
  }

  .card-links {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: -10px;

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 8px;
      color: var(--light-slate);

      &:hover,
      &:focus {
        color: var(--green);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .card-type {
    margin: 8px 0 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .card-description {
    margin: 15px 0 0;
    color: var(--slate);
    font-size: var(--fz-md);
    line-height: 1.6;

    p {
      margin: 0 0 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .tech-list {
    ${({ theme }) => theme.mixins.resetList};
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
    padding-top: 0;

    li {
      padding: 5px 12px;
      background-color: var(--green-tint);
      border-radius: 999px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.4;
      white-space: nowrap;
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              type
              slug
              description
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
              cta
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const { t } = useLanguage();
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledFeaturedSection id="projects">
      <h2 className="section-heading" ref={revealTitle}>
        {t('featuredTitle')}
      </h2>

      <StyledGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, type, slug, description, tech, github, cover, cta } =
              frontmatter;
            const image = getImage(cover);
            // Full-page screenshots are far taller than the 190px media slot, so anchor
            // them to the top instead of cropping out the middle of the page.
            const isTall = image && image.height / image.width > 1.5;
            // A case study page wins over an outbound link when both exist.
            const link = slug || external || cta || github;

            return (
              <StyledCard key={i} ref={el => (revealProjects.current[i] = el)}>
                <a className="card-media" href={link} tabIndex="-1" aria-hidden="true">
                  {image ? (
                    <GatsbyImage
                      image={image}
                      alt={title}
                      className="img"
                      objectFit="cover"
                      objectPosition={isTall ? '50% 0%' : '50% 50%'}
                    />
                  ) : (
                    <div className="media-placeholder">
                      <span>{title}</span>
                    </div>
                  )}
                </a>

                <div className="card-body">
                  <div className="card-header">
                    <h3 className="card-title">
                      <a href={link}>{title}</a>
                    </h3>

                    {github && (
                      <div className="card-links">
                        <a href={github} aria-label={`${title} GitHub repository`}>
                          <Icon name="GitHub" />
                        </a>
                      </div>
                    )}
                  </div>

                  {type && <p className="card-type">{type}</p>}

                  {description ? (
                    <p className="card-description">{description}</p>
                  ) : (
                    <div className="card-description" dangerouslySetInnerHTML={{ __html: html }} />
                  )}

                  {tech && tech.length > 0 && (
                    <ul className="tech-list">
                      {tech.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </StyledCard>
            );
          })}
      </StyledGrid>
    </StyledFeaturedSection>
  );
};

export default Featured;
