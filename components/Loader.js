import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';

const load = keyframes`
  0% { transform: rotate(0deg); }
  100% {  transform: rotate(360deg); }
`;

export const Loader = styled.div`
  display: inline-block;
  margin: auto;
  font-size: 10px;
  position: absolute;
  text-indent: -9999em;
  border-top: 5px solid rgba(255, 255, 255, 0.2);
  border-right: 5px solid rgba(255, 255, 255, 0.2);
  border-bottom: 5px solid rgba(255, 255, 255, 0.2);
  border-left: 5px solid ${theme.foregorund};
  transform: translateZ(0);
  animation: ${load} 1.1s infinite linear;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &,
  &:after {
    border-radius: 100%;
    width: 30px;
    height: 30px;
  }
`;
