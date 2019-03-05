import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { resetList } from '@/styles/mixins';
import { Icon } from '@/components/Icon';

const Footer = () => (
  <FooterContainer>
    <FooterNav>
      <FooterItem>
        <FooterLink href="https://www.instagram.com/kindredshins/">
          <Icon type="instagram" />
        </FooterLink>
      </FooterItem>
      <FooterItem>
        <FooterLink href="https://www.facebook.com/kindred.shins.1/">
          <Icon type="facebook" />
        </FooterLink>
      </FooterItem>
      <FooterItem>
        <FooterLink href="https://twitter.com/kindredshins">
          <Icon type="twitter" />
        </FooterLink>
      </FooterItem>
      <FooterItem>
        <FooterLink href="https://soundcloud.com/kindredshins">
          <Icon type="soundcloud" />
        </FooterLink>
      </FooterItem>
      <FooterItem>
        <FooterLink href="https://www.youtube.com/channel/UCB7dC0WRwZL9HqUdmZGHP3A">
          <Icon type="youtube" />
        </FooterLink>
      </FooterItem>
    </FooterNav>
  </FooterContainer>
);

export const FooterContainer = styled.footer`
  flex: 0 0 auto;
  background: ${theme.background};
  border-bottom: 1px solid ${theme.divider};
`;

export const FooterNav = styled.ul`
  ${resetList};
  max-width: 900px;
  min-height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterItem = styled.li`
  flex: 0 0 auto;
`;

export const FooterLink = styled.a`
  color: ${theme.foreground};
  fill: ${theme.background};
  text-decoration: none;
  display: block;
  margin: 0 8px;
  color: ${props => props.isActive && theme.primary};
  transition: color 200ms;
  cursor: ${props => (props.isActive ? 'default' : 'pointer')};

  ${Icon} {
    width: 26px;
    height: 26px;
  }

  &:hover,
  &:focus {
    color: ${theme.primary};
  }
`;

export { Footer };
