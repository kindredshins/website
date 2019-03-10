import React from 'react';
import App, { Container as NextContainer } from 'next/app';
import { RouterContextProvider } from '@/hooks/useRouter';
import { PlayerProvider } from '@/hooks/usePlayer';
import { Layout } from '@/components/Layout';

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
        <RouterContextProvider>
          <PlayerProvider playlistUrl="http://soundcloud.com/kindredshins/sets/website">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PlayerProvider>
        </RouterContextProvider>
      </NextContainer>
    );
  }
}

export default KindredShins;
