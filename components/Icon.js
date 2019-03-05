import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconBase = ({ type, ...props }) => (
  <svg {...props}>
    <use xlinkHref={`/static/icons/icons.svg#${type}`} />
  </svg>
);

IconBase.propTypes = {
  type: PropTypes.string.isRequired,
};

export const Icon = styled(IconBase)`
  width: 36px;
  height: 36px;
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
`;
