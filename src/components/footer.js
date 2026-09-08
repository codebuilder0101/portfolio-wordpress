import React from 'react';
import styled from 'styled-components';
import { ownerName } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledCredit tabindex="-1">
        <div>{ownerName}</div>
      </StyledCredit>
    </StyledFooter>
  );
};

export default Footer;
