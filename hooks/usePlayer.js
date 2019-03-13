import React, { useEffect, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import SoundCloudAudio from 'soundcloud-audio';

const { publicRuntimeConfig: config } = getConfig();
const { SOUNDCLOUD_CLIENT_ID } = config;
const PlayerContext = React.createContext();
const usePlayer = () => useContext(PlayerContext);
const initialState = {
  player: undefined,
  playlist: undefined,
  activeTrackIndex: 0,
  isLoading: true,
  isPlaying: false,
  isBlocked: false,
};

function reducer(state, action) {
  const { payload } = action;
  const { activeTrackIndex } = state;

  switch (action.type) {
    case 'loaded':
      return { ...state, ...payload, isLoading: false };
    case 'block':
      return { ...state, isBlocked: true, isPlaying: false };
    case 'play':
      return playAction(state, payload);
    case 'next':
      return playAction(state, activeTrackIndex + 1);
    case 'previous':
      return playAction(state, activeTrackIndex - 1);
    case 'pause':
      return { ...state, isPlaying: false };
    default:
      throw new Error(`Missing action for type \`${action.type}\`.`);
  }
}

function playAction(state, trackIndex) {
  const lastTrackIndex = state.playlist.track_count - 1;
  const { activeTrackIndex } = state;

  if (trackIndex == null) {
    trackIndex = activeTrackIndex;
  } else if (trackIndex > lastTrackIndex) {
    trackIndex = 0;
  } else if (trackIndex < 0) {
    trackIndex = lastTrackIndex;
  }

  return {
    ...state,
    isPlaying: true,
    isBlocked: false,
    activeTrackIndex: trackIndex,
  };
}

const PlayerProvider = ({ playlistUrl, isAutoPlay, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { player, activeTrackIndex, isLoading, isPlaying, isBlocked } = state;
  const onPlay = trackIndex => dispatch({ type: 'play', payload: trackIndex });
  const onPause = () => dispatch({ type: 'pause' });
  const onNext = () => dispatch({ type: 'next' });
  const onPrevious = () => dispatch({ type: 'previous' });
  const onBlock = () => dispatch({ type: 'block' });

  useEffect(() => {
    const player = new SoundCloudAudio(SOUNDCLOUD_CLIENT_ID);

    player.audio.addEventListener('pause', onPause);
    player.resolve(playlistUrl, playlist => {
      dispatch({ type: 'loaded', payload: { player, playlist } });
    });

    return function cleanup() {
      player.audio.removeEventListener('pause', onPause);
      player.stop();
    };
  }, [dispatch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onPause();
      } else if (isAutoPlay && !isBlocked) {
        onPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return function cleanup() {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onPause, onPlay]);

  useEffect(() => {
    if (!isLoading && isAutoPlay) {
      const isSmallDevice = window.matchMedia('(max-width: 768px)');

      if (isSmallDevice.matches) {
        onBlock();
      } else {
        onPlay();
      }
    }
  }, [isLoading, isAutoPlay]);

  useEffect(() => {
    if (!player) return;

    if (isPlaying) {
      player.play({ playlistIndex: activeTrackIndex }).catch(onBlock);
    } else {
      player.pause();
    }
  }, [player, isPlaying, activeTrackIndex]);

  const context = useMemo(
    () => ({ ...state, onPlay, onPause, onNext, onPrevious }),
    [state]
  );

  return (
    <PlayerContext.Provider value={context}>
      {children}
      {/* Necessary iFrame to allow autoplay in Chrome */}
      {isAutoPlay && (
        <iframe
          src="/static/silence.mp3"
          allow="autoplay"
          style={{ display: 'none' }}
        />
      )}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  playlistUrl: PropTypes.string.isRequired,
  isAutoPlay: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

PlayerProvider.defaultProps = {
  isAutoPlay: true,
};

export { usePlayer, PlayerProvider };
