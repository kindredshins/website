import React, { useState } from 'react';
import styled from 'styled-components';
import { Page, PageSidebar, PageBody } from '@/components/Page';
import { Loader } from '@/components/Loader';
import videos from '@/data/videos.json';

const Videos = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Page>
      <PageSidebar title="Videos" />
      <PageBody>
        {isLoading && <Loader>Loading&hellip;</Loader>}
        {videos.ids.map(id => (
          <Video key={id}>
            <VideoEmbed
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setIsLoading(false)}
            />
          </Video>
        ))}
      </PageBody>
    </Page>
  );
};

const Video = styled.div`
  width: 640px;
  height: 358px;
  position: relative;

  & + & {
    margin-top: 20px;
  }
`;

const VideoEmbed = styled.iframe.attrs({
  frameBorder: 0,
  allowFullScreen: true,
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default Videos;
