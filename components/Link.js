import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from '@/hooks/useRouter';
import NextLink from 'next/link';

export const Link = ({ children, ...props }) => {
  const router = useRouter();
  const child = Children.only(children);
  const regex = new RegExp(`^${props.href}`);
  const isActive = regex.test(router.pathname);
  let childProps = { isActive };

  if (child.type.target === 'a') {
    childProps = {
      ...childProps,
      href: props.href,
    };
  }

  return (
    <NextLink {...props}>{React.cloneElement(child, childProps)}</NextLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};
