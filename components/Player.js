import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getConfig from 'next/config';
import { rem, em } from 'polished';
import { visuallyHidden } from '@/styles/mixins';
import { theme } from '@/styles/theme';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import SoundCloudAudio from 'soundcloud-audio';

const { publicRuntimeConfig: config } = getConfig();

const Player = ({ playlistUrl, isAutoPlay, ...props }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [playlist, setPlaylist] = useState(undefined);
  const [player, setPlayer] = useState(undefined);
  const playButtonRef = useRef(undefined);
  const isLoading = !player || !playlist;

  useEffect(function() {
    if (!player) {
      const scPlayer = new SoundCloudAudio(config.soundCloudClientId);

      scPlayer.resolve(playlistUrl, scPlaylist => {
        setPlaylist(scPlaylist);
        setPlayer(scPlayer);
      });
    }
  });

  useEffect(() => {
    if (isLoading) return;

    if (isAutoPlay) {
      play().catch(() => {
        // no auto play allowed
      });
    }

    player.on('ended', handleTrackEnded);
    return function cleanup() {
      player.off('ended', handleTrackEnded);
      stop();
    };
  }, [player, playlist]);

  return (
    <section {...props}>
      <Title>Now playing</Title>
      {!isLoading && <Track>{playlist.tracks[activeTrackIndex].title}</Track>}
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

    return player.play({ playlistIndex: trackIndex }).then(() => {
      setIsPlaying(true);
      setActiveTrackIndex(trackIndex);
    });
  }

  function stop() {
    player.stop();
    setIsPlaying(false);
    setActiveTrackIndex(0);
  }
};

Player.propTypes = {
  playlistUrl: PropTypes.string.isRequired,
  isAutoPlay: PropTypes.bool,
};

Player.defaultProps = {
  isAutoPlay: true,
};

const Title = styled.div`
  ${visuallyHidden};
`;

const Track = styled.p`
  margin: 0;
  position: absolute;
  white-space: nowrap;
  opacity: 0.5;
  font-size: ${rem(14)};

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

const PlayerButton = styled(Button)`
  border-color: ${theme.background};
  padding: ${em(5)} ${em(7)};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;

  ${Icon} {
    width: 14px;
    height: 14px;
  }

  &:disabled {
    cursor: wait;
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
