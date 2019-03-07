import React from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Link } from '@/components/Link';
import { theme } from '@/styles/theme';

export const LyricsLinks = () => (
  <LinkList>
    <LinkListItem>
      <Link href="/lyrics/hang-me-out-to-dry">
        <LinkListAnchor>Hang Me Out To Dry</LinkListAnchor>
      </Link>
    </LinkListItem>
    <LinkListItem>
      <Link href="/lyrics/shes-a-crowd">
        <LinkListAnchor>She&apos;s A Crowd</LinkListAnchor>
      </Link>
    </LinkListItem>
  </LinkList>
);

const LinkList = styled.ul`
  list-style: decimal-leading-zero;
  text-align: left;
`;

const LinkListItem = styled.li`
  padding-left: 10px;
`;

const LinkListAnchor = styled.a`
  color: ${props => (props.isActive ? theme.foreground : theme.primary)};
  text-decoration: none;

  ${props =>
    !props.isActive &&
    css`
      border-bottom: 1px solid ${rgba(theme.primary, 0.2)};
      transition: border-color 200ms;
      cursor: pointer;

      &:hover,
      &:focus {
        border-color: ${theme.primary};
      }
    `};
`;
