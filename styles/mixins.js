import { css } from 'styled-components';

export const visuallyHidden = css`
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  height: 1px;
  width: 1px;
`;

export const resetList = css`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const scrollbar = css`
  -ms-overflow-style: -ms-autohiding-scrollbar;
  scrollbar-base-color: #000;
  scrollbar-arrow-color: #000;
  scrollbar-shadow-color: #000;
`;
