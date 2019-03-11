import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import SoundCloudAudio from 'soundcloud-audio';

const { publicRuntimeConfig: config } = getConfig();
const { SOUNDCLOUD_CLIENT_ID } = config;
const PlayerContext = React.createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ playlistUrl, isAutoPlay, children }) => {
  const [player, setPlayer] = useState();
  const [playlist, setPlaylist] = useState();
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const player = new SoundCloudAudio(SOUNDCLOUD_CLIENT_ID);

    player.resolve(playlistUrl, playlist => {
      setPlaylist(playlist);
      setPlayer(player);
      setIsLoading(false);
    });

    return function cleanup() {
      player.stop();
    };
  }, [setPlaylist, setPlayer, setIsLoading]);

  useEffect(() => {
    if (!player) return;
    // when user pauses from phone controls outside of website
    player.audio.addEventListener('pause', handlePause);
    return function cleanup() {
      player.audio.removeEventListener('pause', handlePause);
    };
  }, [player, handlePause]);

  useEffect(() => {
    if (!isLoading && isAutoPlay) {
      const isSmallDevice = window.matchMedia('(max-width: 768px)');

      if (isSmallDevice.matches) {
        setIsBlocked(true);
      } else {
        handlePlay();
      }
    }
  }, [isLoading, isAutoPlay, setIsBlocked, handlePlay]);

  const handlePlay = useCallback(
    (playlistIndex = activeTrackIndex) => {
      const lastTrackIndex = playlist.track_count - 1;

      if (playlistIndex > lastTrackIndex) {
        playlistIndex = 0;
      }

      if (playlistIndex < 0) {
        playlistIndex = lastTrackIndex;
      }

      player
        .play({ playlistIndex })
        .then(() => {
          setIsPlaying(true);
          setActiveTrackIndex(playlistIndex);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsBlocked(true);
        });
    },
    [
      player,
      playlist,
      activeTrackIndex,
      setIsPlaying,
      setActiveTrackIndex,
      setIsBlocked,
    ]
  );

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    player.pause();
  }, [player, setIsPlaying]);

  const handleNext = useCallback(() => {
    handlePlay(activeTrackIndex + 1);
  }, [activeTrackIndex, handlePlay]);

  const handlePrevious = useCallback(() => {
    handlePlay(activeTrackIndex - 1);
  }, [activeTrackIndex, handlePlay]);

  const context = useMemo(
    () => ({
      player,
      playlist,
      activeTrackIndex,
      isPlaying,
      isBlocked,
      isLoading,
      onPlay: handlePlay,
      onPause: handlePause,
      onNext: handleNext,
      onPrevious: handlePrevious,
    }),
    [
      player,
      playlist,
      activeTrackIndex,
      isPlaying,
      isBlocked,
      isLoading,
      handlePlay,
      handlePause,
      handleNext,
      handlePrevious,
    ]
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
