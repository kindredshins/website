import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { rgba } from 'polished';
import { theme } from '@/styles/theme';
import { scrollbar } from '@/styles/mixins';

const Page = ({ children, title }) => {
  return (
    <PageContainer>
      <Head>
        <title>{title} - Kindred Shins</title>
      </Head>
      <Inner>
        <Sidebar>
          <Logo
            src="/static/images/logo-invert.png"
            width="100"
            height="100"
            title="Kindred Shins"
          />
          <h1>{title}</h1>
        </Sidebar>
        <Body>{children}</Body>
      </Inner>
    </PageContainer>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

const PageContainer = styled.div`
  background: ${rgba(theme.background, 0.65)};
  flex: 1 1 auto;
  position: relative;
  display: flex;
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Logo = styled.img`
  margin: 0 auto 20px auto;
`;

const Sidebar = styled.div`
  flex: 0 0 auto;
  border: 1px solid ${theme.divider};
  border-right-width: 0;
  border-left-width: 0;
  border-top-width: 0;
  text-align: center;
  margin: 30px 20px 0;
  z-index: 1;

  @media (min-width: 768px) {
    border-bottom-width: 0;
    border-right-width: 1px;
    flex-direction: row;
    width: 280px;
    padding: 0 40px;
    margin: 40px 0;
    display: flex;
    flex-direction: column;
  }
`;

const Body = styled.div`
  ${scrollbar};
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

export { Page };
