import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from '@/hooks/useRouter';
import NextLink from 'next/link';

export const Link = ({ children, ...props }) => {
  const router = useRouter();
  const child = Children.only(children);
  const regex = new RegExp(`^${props.href}`);
  const isActive = regex.test(router.pathname);

  return (
    <NextLink {...props}>{React.cloneElement(child, { isActive })}</NextLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
