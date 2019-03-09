import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

const IconBase = ({ type, ...props }) => (
  <ReactSVG {...props} src={`/static/icons/${type}.svg`} />
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
  position: relative;

  svg {
    vertical-align: middle;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
