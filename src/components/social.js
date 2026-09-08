import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ownerName } from '@config';
import { Side } from '@components';

const StyledNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
  }

  .name {
    margin: 20px auto;
    padding: 10px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: var(--fz-lg);
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    color: var(--light-slate);
  }
`;

const Social = ({ isHome }) => (
  <Side isHome={isHome} orientation="left">
    <StyledNameWrapper>
      <span className="name">{ownerName}</span>
    </StyledNameWrapper>
  </Side>
);

Social.propTypes = {
  isHome: PropTypes.bool,
};

export default Social;
