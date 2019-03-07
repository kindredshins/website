import React from 'react';
import { Page, PageSidebar, PageBody } from '@/components/Page';
import { LyricsLinks } from '@/components/LyricsLinks';

const Lyrics = () => (
  <Page>
    <PageSidebar title="Lyrics" />
    <PageBody>
      <p>
        If you&apos;re struggling to understand the mumblings of a homeless man,
        fear not. We&apos;ve got you covered so please feel free to have a
        peruse at your leisure.
      </p>
      <LyricsLinks />
    </PageBody>
  </Page>
);

export default Lyrics;
