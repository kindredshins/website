import styled from 'styled-components';

export const Input = styled.input`
  border: 1px solid #363636;
  color: inherit;
  padding: 5px 8px;
  background: linear-gradient(to bottom, #000, #1e1e1e);
  flex: 1 1 auto;

  &:focus {
    outline: none;
    border-color: #555;
  }

  &::-webkit-input-placeholder {
    color: #555;
  }

  &::-moz-placeholder {
    color: #555;
  }

  &:-ms-input-placeholder {
    color: #555;
  }
`;
