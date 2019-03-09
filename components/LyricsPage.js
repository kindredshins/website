import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { IconButton } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { PlayerContext } from '@/components/Player';
import { Page, PageSidebar, PageBody } from '@/components/Page';
import { LyricsLinks } from '@/components/LyricsLinks';
import MediaQuery from 'react-responsive';

const LyricsPage = ({ children, title }) => (
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

const LyricsPageTitle = ({ children, trackId }) => {
  const {
    player,
    playlist,
    activeTrackIndex,
    onActiveTrackIndexChange,
  } = useContext(PlayerContext);
  const trackIndex =
    playlist &&
    playlist.tracks.findIndex(track => {
      const regex = new RegExp(`${trackId}$`);
      return regex.test(track.permalink_url);
    });

  return (
    <h2>
      {children}
      {player && (
        <Play style={{ marginLeft: 10 }}>
          {activeTrackIndex === trackIndex ? (
            <MusicBars />
          ) : (
            <PlayButton onClick={() => onActiveTrackIndexChange(trackIndex)}>
              <Icon type="play" style={{ marginLeft: 3 }} />
            </PlayButton>
          )}
        </Play>
      )}
    </h2>
  );
};

LyricsPageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  trackId: PropTypes.string.isRequired,
};

const Play = styled.div`
  display: inline-flex;
  margin-left: 20px;
`;

const PlayButton = styled(IconButton)`
  width: 30px;
  height: 30px;
`;

const MusicBars = () => (
  <MusicBarsContainer>
    <Bar duration={474} />
    <Bar duration={433} />
    <Bar duration={407} />
    <Bar duration={458} />
    <Bar duration={400} />
    <Bar duration={427} />
    <Bar duration={441} />
    <Bar duration={419} />
  </MusicBarsContainer>
);

const MusicBarsContainer = styled.div`
  display: inline-flex;
  height: 15px;
  align-items: flex-end;
`;

const sound = keyframes`
  0% {
    opacity: 0.35;
    height: 2%;
  }
  100% {
    opacity: 1;
    height: 100%;
  }
`;

const Bar = styled.div`
  background: #666;
  height: 3px;
  width: 3px;
  animation: ${sound} 0ms -800ms linear infinite alternate;
  animation-duration: ${props => props.duration}ms;
`;

export { LyricsPage, LyricsPageTitle };
