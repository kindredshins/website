import styled, { css } from 'styled-components';
import { rem, rgba } from 'polished';
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

export const NavigationToggleCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
`;

export const NavigationItems = styled.ul`
  ${resetList};

  @media (max-width: ${NAV_HORIZONTAL_BREAKPOINT}) {
    background-color: ${theme.background};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    box-shadow: 0 2px 5px ${rgba(theme.background, 0.5)};

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
  margin: 15px 20px;
  color: ${props => props.isActive && theme.primary};
  transition: color 200ms;
  cursor: ${props => (props.isActive ? 'default' : 'pointer')};

  &:hover,
  &:focus {
    color: ${theme.primary};
  }

  @media (min-width: ${NAV_HORIZONTAL_BREAKPOINT}) {
    margin: 0 30px;
  }
`;
