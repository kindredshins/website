import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { rem, rgba } from 'polished';
import getConfig from 'next/config';
import SoundCloudAudio from 'soundcloud-audio';
import slugify from 'slugify';
import ConditionalWrap from 'conditional-wrap';
import { visuallyHidden } from '@/styles/mixins';
import { theme } from '@/styles/theme';
import { get } from '@/utils/get';
import { Link } from '@/components/Link';
import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/Button';
import lyrics from '@/data/lyrics.json';

const { publicRuntimeConfig: config } = getConfig();
const { SOUNDCLOUD_CLIENT_ID } = config;
const slugifyOpts = { lower: true, remove: /[*+~.()'"!:@]/g };

export const PlayerContext = React.createContext();

export const PlayerProvider = ({ playlistUrl, children }) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [context, setContext] = useState({
    onActiveTrackIndexChange: setActiveTrackIndex,
  });

  useEffect(() => {
    if (!context.player) {
      const player = new SoundCloudAudio(SOUNDCLOUD_CLIENT_ID);

      // fiddle volume to get around autoplay issues
      player.resolve(playlistUrl, playlist => {
        player.audio.volume = 0;
        player
          .play()
          .then(() => {
            player.audio.volume = 1;
            player.stop();
            setContext({ ...context, player, playlist });
          })
          .catch(() => {
            // eslint-disable-next-line no-console
            console.warn('Autoplay has been prevented for <Player />');
          });
      });
    }
  });

  useEffect(() => {
    setContext({ ...context, activeTrackIndex });
  }, [activeTrackIndex]);

  return (
    <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  playlistUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Player = ({ isAutoPlay, ...props }) => {
  const {
    player,
    playlist,
    activeTrackIndex,
    onActiveTrackIndexChange,
  } = useContext(PlayerContext);
  const [isPlaying, setIsPlaying] = useState(isAutoPlay);
  const prevActiveTrackIndex = useRef(activeTrackIndex);
  const playButtonRef = useRef();
  const title = get(['tracks', activeTrackIndex, 'title'], playlist);
  const lyricsSlug = title && slugify(title, slugifyOpts);
  const hasLyricsPage = lyrics.tracks.some(track => track.slug === lyricsSlug);
  const isLoading = !player || !playlist || !title;

  useEffect(() => {
    if (isLoading) return;

    if (isAutoPlay) {
      play();
    }

    player.on('ended', handleTrackEnded);
    return function cleanup() {
      player.off('ended', handleTrackEnded);
      stop();
    };
  }, [player, playlist]);

  useEffect(() => {
    if (isLoading) return;

    if (isPlaying && prevActiveTrackIndex.current !== activeTrackIndex) {
      player.play({ playlistIndex: activeTrackIndex }).then(() => {
        prevActiveTrackIndex.current = activeTrackIndex;
      });
    }
  }, [isPlaying, activeTrackIndex]);

  function handlePauseClick() {
    setIsPlaying(false);
    player.pause();
  }

  function handleTrackEnded() {
    play(activeTrackIndex + 1);
  }

  function play(trackIndex = activeTrackIndex) {
    const lastTrackIndex = playlist.track_count - 1;

    if (trackIndex > lastTrackIndex) {
      trackIndex = 0;
    }

    if (trackIndex < 0) {
      trackIndex = lastTrackIndex;
    }

    setIsPlaying(true);
    onActiveTrackIndexChange(trackIndex);
  }

  function stop() {
    player.stop();
    setIsPlaying(false);
    onActiveTrackIndexChange(0);
  }

  return (
    <section {...props}>
      <Title>Now playing</Title>
      {title && (
        <ConditionalWrap
          condition={hasLyricsPage}
          wrap={children => (
            <Link href={`/lyrics/${lyricsSlug}`}>{children}</Link>
          )}
        >
          <Track hasHref={hasLyricsPage}>{title}</Track>
        </ConditionalWrap>
      )}

      <Controls>
        <PlayerButton
          onClick={() => play(activeTrackIndex - 1)}
          disabled={isLoading}
        >
          <Icon type="previous-track" />
        </PlayerButton>
        {isPlaying ? (
          <LargePlayerButton onClick={handlePauseClick} disabled={isLoading}>
            <Icon type="pause" />
          </LargePlayerButton>
        ) : (
          <LargePlayerButton
            onClick={() => play()}
            ref={playButtonRef}
            disabled={isLoading}
          >
            <Icon type="play" style={{ marginLeft: 3 }} />
          </LargePlayerButton>
        )}
        <PlayerButton
          onClick={() => play(activeTrackIndex + 1)}
          disabled={isLoading}
        >
          <Icon type="next-track" />
        </PlayerButton>
      </Controls>
      {/* Necessary iFrame to trigger autoplay in browsers that block autoplay */}
      <iframe
        src="/static/silence.mp3"
        allow="autoplay"
        style={{ display: 'none' }}
      />
    </section>
  );
};

Player.propTypes = {
  isAutoPlay: PropTypes.bool,
};

Player.defaultProps = {
  isAutoPlay: true,
};

const Title = styled.div`
  ${visuallyHidden};
`;

const Track = styled.span`
  margin: 0;
  position: absolute;
  white-space: nowrap;
  font-size: ${rem(14)};
  color: ${rgba(theme.foreground, 0.5)};

  ${props =>
    props.hasHref &&
    css`
      cursor: pointer;
      transition: color 200ms;

      &:hover,
      &:focus {
        color: ${theme.foreground};
      }
    `};

  @media (max-width: 684px) {
    display: none;
  }

  @media (min-width: 685px) {
    top: -0.5em;
    left: 50%;
    right: auto;
    transform: translate(-50%, -100%);
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const PlayerButton = styled(IconButton)`
  &:disabled {
    background: ${theme.background};
    cursor: wait;

    ${Icon} {
      display: none;
    }
  }
`;

const LargePlayerButton = styled(PlayerButton)`
  margin: 0 5px;

  @media (min-width: 685px) {
    width: 62px;
    height: 62px;

    ${Icon} {
      width: 26px;
      height: 26px;
    }
  }
`;

export { Player };
