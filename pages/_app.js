import React from 'react';
import PropTypes from 'prop-types';
import { TypographyStyle, GoogleFont } from 'react-typography';
import App, { Container as NextContainer } from 'next/app';
import Head from 'next/head';
import styled from 'styled-components';
import { typography } from '@/styles/typography';
import { RouterContextProvider, useRouter } from '@/hooks/useRouter';
import { GlobalStyle } from '@/components/GlobalStyle';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Background } from '@/components/Background';
import { PlayerProvider } from '@/hooks/usePlayer';

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
            <link
              rel="apple-touch-icon"
              sizes="57x57"
              href="/static/apple-icon-57x57.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="60x60"
              href="/static/apple-icon-60x60.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="72x72"
              href="/static/apple-icon-72x72.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="76x76"
              href="/static/apple-icon-76x76.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="114x114"
              href="/static/apple-icon-114x114.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="120x120"
              href="/static/apple-icon-120x120.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="144x144"
              href="/static/apple-icon-144x144.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="152x152"
              href="/static/apple-icon-152x152.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/static/apple-icon-180x180.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="192x192"
              href="/static/android-icon-192x192.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/static/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="96x96"
              href="/static/favicon-96x96.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/static/favicon-16x16.png"
            />
            <link rel="manifest" href="/static/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
              name="msapplication-TileImage"
              content="/ms-icon-144x144.png"
            />
            <meta name="theme-color" content="#ffffff" />
            <TypographyStyle typography={typography} />
            <GoogleFont typography={typography} />
          </Head>
          <RouterContextProvider>
            <PlayerProvider playlistUrl="http://soundcloud.com/kindredshins/sets/website">
              <GlobalStyle />
              <Header />
              <Main>
                <Component {...pageProps} />
              </Main>
              <Footer />
            </PlayerProvider>
          </RouterContextProvider>
        </Wrapper>
        <AppBackground role="presentation" />
      </NextContainer>
    );
  }
}

const Wrapper = styled.div`
  min-width: 320px;
  min-height: 100%;
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
  background-size: auto 40%;
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

  @media (min-width: 768px) {
    background-size: auto 55%;
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
