import React from 'react';
import PropTypes from 'prop-types';
import { Page, PageSidebar, PageBody } from '@/components/Page';
import { LyricsLinks } from '@/components/LyricsLinks';
import MediaQuery from 'react-responsive';

export const LyricsPage = ({ children, title }) => (
  <Page>
    <PageSidebar title="Lyrics" pageTitle={`${title} Lyrics`.trim()}>
      <MediaQuery minWidth={768}>
        <LyricsLinks />
      </MediaQuery>
    </PageSidebar>
    <PageBody>
      {children}
      <MediaQuery maxWidth={767}>
        <h2>More Lyrics</h2>
        <LyricsLinks />
      </MediaQuery>
    </PageBody>
  </Page>
);

LyricsPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

LyricsPage.defaultProps = {
  title: '',
};
