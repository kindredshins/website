import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Icon } from '@/components/Icon';

export const Button = styled.button`
  border: 1px solid #363636;
  text-transform: uppercase;
  color: ${theme.foreground};
  padding: 0.3125em 0.8em;
  font-size: 0.875em;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  background: #000 linear-gradient(to bottom, #555, #000);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #555;
  }

  &:not(:disabled):active {
    background: #000 linear-gradient(to bottom, #000, #555);
  }

  & + & {
    margin-left: 10px;
  }
`;

export const IconButton = styled(Button)`
  padding: 0;
  border-color: ${theme.background};
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;

  ${Icon} {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
  }
`;
