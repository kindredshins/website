import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { visuallyHidden } from '@/styles/mixins';
import { theme } from '@/styles/theme';
import { Link } from '@/components/Link';
import {
  Navigation,
  NavigationToggleLabel,
  NavigationToggleCheckbox,
  NavigationItems,
  NavigationItem,
  NavigationLink,
} from './Navigation';

const HeaderBase = ({ router }) => (
  <HeaderContainer>
    <Logo as={router.pathname === '/' && 'h1'}>Kindred Shins</Logo>

    <Navigation>
      <NavigationToggleLabel htmlFor="ks-navigation__toggle">
        Menu
      </NavigationToggleLabel>
      <NavigationToggleCheckbox id="ks-navigation__toggle" />

      <NavigationItems>
        <NavigationItem>
          <Link href="/about">
            <NavigationLink>About</NavigationLink>
          </Link>
        </NavigationItem>
        <NavigationItem>
          <Link href="/videos">
            <NavigationLink>Videos</NavigationLink>
          </Link>
        </NavigationItem>
        <NavigationItem isPushed>
          <Link href="/photos">
            <NavigationLink>Photos</NavigationLink>
          </Link>
        </NavigationItem>
        <NavigationItem>
          <Link href="/gigs">
            <NavigationLink>Gigs</NavigationLink>
          </Link>
        </NavigationItem>
        <NavigationItem>
          <Link href="/lyrics">
            <NavigationLink>Lyrics</NavigationLink>
          </Link>
        </NavigationItem>
        <NavigationItem>
          <Link href="/contact">
            <NavigationLink>Contact</NavigationLink>
          </Link>
        </NavigationItem>
      </NavigationItems>
    </Navigation>
  </HeaderContainer>
);

HeaderBase.propTypes = {
  router: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

const HeaderContainer = styled.header`
  flex: 0 0 auto;
  background: ${theme.background};
  position: relative;
  z-index: 5;

  @media (min-width: 685px) {
    padding-top: 20px;
  }
`;

const Logo = styled.span`
  ${visuallyHidden};
`;

export const Header = withRouter(HeaderBase);
