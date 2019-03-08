import React from 'react';
import { TypographyStyle, GoogleFont } from 'react-typography';
import App, { Container as NextContainer } from 'next/app';
import Head from 'next/head';
import styled from 'styled-components';
import { GlobalStyle } from '@/components/GlobalStyle';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Background } from '@/components/Background';
import { typography } from '@/styles/typography';

class KindredShins extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <NextContainer>
        <Wrapper>
          <Head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="description" content="" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Kindred Shins</title>
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="robots" content="noindex, nofollow" />
            <TypographyStyle typography={typography} />
            <GoogleFont typography={typography} />
          </Head>
          <GlobalStyle />
          <Header />
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer />
        </Wrapper>
        <AppBackground role="presentation" />
      </NextContainer>
    );
  }
}

const Wrapper = styled.div`
  min-width: 320px;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
`;

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 0;
  background: url('/static/images/lads.png') no-repeat center bottom;
  background-size: auto 55%;
  position: relative;
  z-index: 0;

  &::before {
    content: '';
    background: url('/static/images/logo-large.png') no-repeat top center;
    background-size: auto 45%;
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 0;
    z-index: -1;

    @media (min-height: 925px) and (min-width: 765px) {
      top: 55px;
    }
  }

  @media (min-height: 785px) {
    flex: 1 1 0px;
  }
`;

const AppBackground = styled(Background)`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
`;

export default KindredShins;
