import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { Layout } from '@components';
import { useLanguage } from '../context/LanguageContext';

const StyledCaseStudyContainer = styled.main`
  max-width: 1000px;
`;

const StyledHeader = styled.header`
  margin-bottom: 50px;

  .breadcrumb {
    ${({ theme }) => theme.mixins.inlineLink};
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .type {
    margin: 20px 0 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    color: var(--lightest-slate);
    font-size: clamp(32px, 6vw, 60px);
    line-height: 1.1;
  }

  .description {
    margin: 20px 0 0;
    max-width: 700px;
    color: var(--slate);
    font-size: var(--fz-lg);
  }
`;

const StyledMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  margin-bottom: 50px;
  padding: 30px;
  background-color: var(--light-navy);
  border-radius: var(--border-radius);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-gap: 25px;
  }

  h2 {
    margin: 0 0 15px;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  ul {
    ${({ theme }) => theme.mixins.resetList};

    li {
      position: relative;
      margin-bottom: 8px;
      padding-left: 20px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        line-height: 12px;
      }
    }
  }
`;

const StyledBody = styled.div`
  color: var(--light-slate);

  h2 {
    margin: 50px 0 15px;
    color: var(--lightest-slate);
    font-size: var(--fz-heading);
    line-height: 1.2;

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    margin: 0 0 15px;
    font-size: var(--fz-lg);
  }

  ul {
    ${({ theme }) => theme.mixins.resetList};
    margin-bottom: 15px;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 30px;
      font-size: var(--fz-lg);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }
`;

// Split out so the language hook runs *inside* the provider that Layout renders.
const CaseStudyContent = ({ data }) => {
  const { t } = useLanguage();
  const { frontmatter, html } = data.markdownRemark;
  const { title, type, description, services, tech } = frontmatter;

  return (
    <StyledCaseStudyContainer>
      <StyledHeader>
        <Link className="breadcrumb" to="/#projects">
          &larr; {t('allProjects')}
        </Link>
        {type && <p className="type">{type}</p>}
        <h1>{title}</h1>
        {description && <p className="description">{description}</p>}
      </StyledHeader>

      {(services || tech) && (
        <StyledMeta>
          {services && (
            <div>
              <h2>Services</h2>
              <ul>
                {services.map((service, i) => (
                  <li key={i}>{service}</li>
                ))}
              </ul>
            </div>
          )}
          {tech && (
            <div>
              <h2>Technology</h2>
              <ul>
                {tech.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </StyledMeta>
      )}

      <StyledBody dangerouslySetInnerHTML={{ __html: html }} />
    </StyledCaseStudyContainer>
  );
};

CaseStudyContent.propTypes = {
  data: PropTypes.object.isRequired,
};

const CaseStudyTemplate = ({ data, location }) => (
  <Layout location={location}>
    <CaseStudyContent data={data} />
  </Layout>
);

CaseStudyTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default CaseStudyTemplate;

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        type
        description
        services
        tech
      }
    }
  }
`;
