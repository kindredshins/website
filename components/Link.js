import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import NextLink from 'next/link';

const LinkBase = ({ router, children, ...props }) => {
  const child = Children.only(children);
  const isActive = router.pathname === props.href;

  return (
    <NextLink {...props}>{React.cloneElement(child, { isActive })}</NextLink>
  );
};

LinkBase.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  href: PropTypes.string.isRequired,
};

export const Link = withRouter(LinkBase);
