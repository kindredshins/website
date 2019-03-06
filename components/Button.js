import styled from 'styled-components';

export const Button = styled.button`
  border: 1px solid #363636;
  text-transform: uppercase;
  color: inherit;
  padding: 0.3125em 0.8em;
  font-size: 0.875em;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  background: linear-gradient(to bottom, #555, #000);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #555;
  }

  &:enabled:active {
    background: linear-gradient(to bottom, #000, #555);
  }
`;
