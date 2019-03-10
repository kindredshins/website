import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
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
import { Button, IconButton } from '@/components/Button';
import lyrics from '@/data/lyrics.json';

const { publicRuntimeConfig: config } = getConfig();
const { SOUNDCLOUD_CLIENT_ID } = config;
const slugifyOpts = { lower: true, remove: /[*+~.()'"!:@]/g };

export const PlayerContext = React.createContext();

export const PlayerProvider = ({ playlistUrl, children }) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [context, setContext] = useState({
    isLoading: true,
    activeTrackIndex: 0,
    onActiveTrackIndexChange: setActiveTrackIndex,
  });

  useEffect(() => {
    const player = new SoundCloudAudio(SOUNDCLOUD_CLIENT_ID);

    player.resolve(playlistUrl, playlist => {
      setContext({ ...context, player, playlist, isLoading: false });
    });

    return function cleanup() {
      player.stop();
    };
  }, [false]);

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
    isLoading,
    player,
    playlist,
    activeTrackIndex,
    onActiveTrackIndexChange,
  } = useContext(PlayerContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const prevActiveTrackIndex = useRef(activeTrackIndex);
  const playButtonRef = useRef();
  const title = get(['tracks', activeTrackIndex, 'title'], playlist);
  const lyricsSlug = title && slugify(title, slugifyOpts);
  const hasLyricsPage = lyrics.tracks.some(track => track.slug === lyricsSlug);

  useEffect(() => {
    if (isLoading) return;

    if (isAutoPlay) {
      play();
    }

    player.on('ended', handleTrackEnded);
    // when user pauses from phone controls outside of website
    player.audio.addEventListener('pause', pause);
    return function cleanup() {
      player.off('ended', handleTrackEnded);
      player.audio.removeEventListener('pause', pause);
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && prevActiveTrackIndex.current !== activeTrackIndex) {
      play();
    }
  }, [activeTrackIndex]);

  function play(trackIndex = activeTrackIndex) {
    const lastTrackIndex = playlist.track_count - 1;

    if (trackIndex > lastTrackIndex) {
      trackIndex = 0;
    }

    if (trackIndex < 0) {
      trackIndex = lastTrackIndex;
    }

    player
      .play({ playlistIndex: activeTrackIndex })
      .then(() => {
        setIsPlaying(true);
        prevActiveTrackIndex.current = activeTrackIndex;
        onActiveTrackIndexChange(trackIndex);
      })
      .catch(() => {
        setIsPermissionModalOpen(true);
        setIsPlaying(false);
      });
  }

  function pause() {
    setIsPlaying(false);
    player.pause();
  }

  function handlePermissionGranted() {
    play();
    setIsPermissionModalOpen(false);
  }

  function handleTrackEnded() {
    play(activeTrackIndex + 1);
  }

  return (
    <>
      <section {...props}>
        <Title>Now playing</Title>
        <ConditionalWrap
          condition={hasLyricsPage}
          wrap={children => (
            <Link href={`/lyrics/${lyricsSlug}`}>{children}</Link>
          )}
        >
          <Track hasHref={hasLyricsPage}>{title}</Track>
        </ConditionalWrap>

        <Controls>
          <PlayerButton
            onClick={() => play(activeTrackIndex - 1)}
            disabled={isLoading}
          >
            <Icon type="previous-track" />
          </PlayerButton>
          {isPlaying ? (
            <LargePlayerButton onClick={pause} disabled={isLoading}>
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
        {/* Necessary iFrame to trigger autoplay in Chrome */}
        <iframe
          src="/static/silence.mp3"
          allow="autoplay"
          style={{ display: 'none' }}
        />
      </section>
      {isPermissionModalOpen && (
        <AutoPlayPermission>
          <AutoPlayPermissionModal>
            <h2 style={{ marginBottom: 5 }}>
              Can we autoplay our music for you?
            </h2>
            <p>
              Your browser has prevented us from doing this so we need your
              permission to give you the full Kindred Shins experience. You can
              play it manually later if you prefer.
            </p>
            <Button onClick={handlePermissionGranted}>Sure, go ahead</Button>
            <Button hasMargin onClick={() => setIsPermissionModalOpen(false)}>
              No thanks
            </Button>
          </AutoPlayPermissionModal>
        </AutoPlayPermission>
      )}
    </>
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
    right: 100%;
    top: 3px;
    margin-right: 10px;
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
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

const fadeIn = keyframes`
  0% {opacity: 0 }
  100% { opacity: 1 }
`;

const AutoPlayPermission = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${rgba(theme.background, 0.9)};
  animation: ${fadeIn} 200ms;
`;

const AutoPlayPermissionModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.foreground};
  color: ${theme.background};
  padding: 20px;
  border-radius: 3px;
  max-width: 500px;
  min-width: 300px;
`;

export { Player };
