import React from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Link } from '@/components/Link';
import { theme } from '@/styles/theme';
import lyrics from '@/data/lyrics.json';

export const LyricsLinks = () => (
  <LinkList>
    {lyrics.tracks.map(track => (
      <LinkListItem key={track.slug}>
        <Link href={`/lyrics/${track.slug}`}>
          <LinkListAnchor>{track.title}</LinkListAnchor>
        </Link>
      </LinkListItem>
    ))}
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
