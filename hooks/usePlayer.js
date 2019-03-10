import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import SoundCloudAudio from 'soundcloud-audio';

const { publicRuntimeConfig: config } = getConfig();
const { SOUNDCLOUD_CLIENT_ID } = config;
const PlayerContext = React.createContext();

export const usePlayer = () => useContext(PlayerContext);

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
