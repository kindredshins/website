import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { rem, rgba } from 'polished';
import Router from 'next/router';
import { resetList } from '@/styles/mixins';
import { theme } from '@/styles/theme';

const NAV_HORIZONTAL_BREAKPOINT = '830px';
const LINK_STYLES = css`
  color: ${theme.foreground};
  text-decoration: none;
  cursor: ${props => (props.isActive ? 'default' : 'pointer')};
`;

export const Navigation = styled.nav`
  padding: 15px;
  position: relative;
  font-size: ${rem(18)};

  @media (min-width: ${NAV_HORIZONTAL_BREAKPOINT}) {
    display: flex;
    justify-content: center;
    margin-left: -20px;
  }
`;

export const NavigationToggleLabel = styled.label`
  ${LINK_STYLES};
  background: url('/static/icons/hamburger.svg') no-repeat left center;
  background-size: 26px;
  padding-left: 32px;

  @media (min-width: ${NAV_HORIZONTAL_BREAKPOINT}) {
    display: none;
  }
`;

const NavigationToggleCheckboxBase = props => {
  const [isChecked, setIsChecked] = useState(false);

  function handleRouteChange() {
    setIsChecked(false);
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChange);
    return function cleanup() {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  });

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={event => setIsChecked(event.target.checked)}
      hidden
      {...props}
    />
  );
};

export const NavigationToggleCheckbox = styled(NavigationToggleCheckboxBase)``;

export const NavigationItems = styled.ul`
  ${resetList};

  @media (max-width: ${NAV_HORIZONTAL_BREAKPOINT}) {
    background-color: ${theme.background};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    box-shadow: 0 2px 5px ${rgba(theme.background, 0.5)};
    margin-top: -10px;
    padding-bottom: 10px;

    /* prettier-ignore */
    ${NavigationToggleCheckbox}:not(:checked) + & {
      display: none;
    }
  }

  @media (min-width: ${NAV_HORIZONTAL_BREAKPOINT}) {
    display: flex;
  }
`;

export const NavigationItem = styled.li`
  ${props =>
    props.isPushed &&
    css`
      @media (min-width: ${NAV_HORIZONTAL_BREAKPOINT}) {
        margin-right: 170px;
      }
    `}
`;

export const NavigationLink = styled.a`
  ${LINK_STYLES};
  display: block;
  margin: 0 20px;
  padding: 5px 0;
  color: ${props => props.isActive && theme.primary};
  transition: color 200ms;
  cursor: ${props => (props.isActive ? 'default' : 'pointer')};

  &:hover,
  &:focus {
    color: ${theme.primary};
  }

  @media (min-width: ${NAV_HORIZONTAL_BREAKPOINT}) {
    padding: 0;
    margin: 0 30px;
  }
`;
