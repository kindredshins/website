import React from 'react';
import PropTypes from 'prop-types';
import { Page, PageSidebar, PageBody } from '@/components/Page';
import { LyricsLinks } from '@/components/LyricsLinks';

export const LyricsPage = ({ children, title }) => (
  <Page>
    <PageSidebar title="Lyrics" pageTitle={`${title} Lyrics`.trim()}>
      <LyricsLinks />
    </PageSidebar>
    <PageBody>{children}</PageBody>
  </Page>
);

LyricsPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

LyricsPage.defaultProps = {
  title: '',
};
